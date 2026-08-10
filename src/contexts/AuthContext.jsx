import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { supabase } from "../lib/supabase.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profileError, setProfileError] = useState(null);
  const [profileStatus, setProfileStatus] = useState("idle");
  const [sessionLoading, setSessionLoading] = useState(true);

  // Fungsi untuk mengambil data profil
  const fetchProfile = useCallback(async (userId, signal) => {
    // Jika tidak ada userId (misal: user logout), reset state profil
    if (!userId) {
      setProfile(null);
      setProfileError(null);
      setProfileStatus("idle");
      return;
    }

    setProfileStatus("loading");
    setProfileError(null);

    try {
      let query = supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      // Gunakan abort signal jika didukung
      if (signal) query = query.abortSignal(signal);

      const { data, error } = await query;

      // Hentikan proses jika request ini sudah dibatalkan (misal: user ganti akun dengan cepat)
      if (signal?.aborted) return;

      if (error) {
        console.error("Gagal mengambil profile:", error);
        setProfile(null);
        setProfileError(error.message);
        setProfileStatus("error");
        return;
      }

      if (!data) {
        setProfile(null);
        setProfileStatus("not_found");
        return;
      }

      setProfile(data);
      setProfileStatus("success");
    } catch (err) {
      if (signal?.aborted) return;
      console.error("Error tidak terduga:", err);
      setProfileStatus("error");
    }
  }, []);

  // Handle inisialisasi Session dan Auth Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setSessionLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle Profile Fetching yang reaktif terhadap perubahan Session
  useEffect(() => {
    const controller = new AbortController();
    const userId = session?.user?.id;

    // Menunda pemanggilan fetchProfile agar state update terjadi di luar body effect,
    // sehingga aman untuk lint react-hooks/set-state-in-effect.
    Promise.resolve().then(() => {
      fetchProfile(userId, controller.signal);
    });

    return () => {
      controller.abort(); // Batalkan request jika id berubah sebelum selesai
    };
  }, [session?.user?.id, fetchProfile]);

  // Fungsi Autentikasi (di-memoize dengan useCallback)
  const signIn = useCallback(async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  }, []);

  const signUp = useCallback(async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) throw error;
    return data;
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  const refreshProfile = useCallback(() => {
    const userId = session?.user?.id;
    if (userId) {
      return fetchProfile(userId);
    }
  }, [session, fetchProfile]);

  // Context value di-memoize untuk mencegah render ulang komponen yang tidak perlu
  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      session,
      profile,
      profileError,
      profileStatus,
      isAdmin: profile?.role === "admin",
      loading:
        sessionLoading ||
        Boolean(
          session?.user &&
          (profileStatus === "idle" || profileStatus === "loading"),
        ),
      signIn,
      signUp,
      signOut,
      refreshProfile,
    }),
    [
      session,
      profile,
      profileError,
      profileStatus,
      sessionLoading,
      signIn,
      signUp,
      signOut,
      refreshProfile,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook kustom untuk kemudahan akses Context dengan proteksi error
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth harus digunakan di dalam komponen <AuthProvider>");
  }
  return context;
}
