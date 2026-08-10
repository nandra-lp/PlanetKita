import { useEffect, useState, useCallback, useRef } from "react";
import {
  createPlanet,
  deletePlanet,
  getAdminPlanets,
  updatePlanet,
} from "../services/db.js";

const emptyForm = {
  name: "",
  slug: "",
  order_index: 0,
  image_url: "",
  short_description: "",
  description: "",
};

function slugify(text) {
  const base = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  return base || `planet-${Date.now()}`;
}

export default function AdminDashboardPage() {
  // Nilai awal sudah menangani initial render
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadPlanets = useCallback(async () => {
    // setLoading(true) dan setError("") dihapus dari sini untuk
    // mencegah synchronous state update di dalam useEffect.

    try {
      const data = await getAdminPlanets();
      if (isMounted.current) {
        setPlanets(data);
        setError(""); // Clear error HANYA jika fetch berhasil (Asinkronus = Aman dari linter)
      }
    } catch (err) {
      if (isMounted.current) setError(err.message || "Gagal memuat data");
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    const fetchPlanets = async () => {
      try {
        const data = await getAdminPlanets();
        if (!ignore) {
          setPlanets(data);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Gagal memuat data");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void fetchPlanets();

    return () => {
      ignore = true;
    };
  }, []);

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;

      setError("");
      setMessage("");

      setForm((prev) => ({
        ...prev,
        [name]: value,
        ...(name === "name" && !editingId ? { slug: slugify(value) } : {}),
      }));
    },
    [editingId],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    const payload = {
      name: form.name,
      slug: form.slug,
      order_index: Math.max(0, Number(form.order_index || 0)),
      image_url: form.image_url || null,
      short_description: form.short_description || null,
      description: form.description || null,
    };

    try {
      if (editingId) {
        await updatePlanet(editingId, payload);
        if (isMounted.current) setMessage("Planet berhasil diperbarui.");
      } else {
        await createPlanet(payload);
        if (isMounted.current) setMessage("Planet berhasil dibuat.");
      }

      if (isMounted.current) {
        setForm(emptyForm);
        setEditingId(null);
        await loadPlanets(); // Tabel akan terupdate tanpa berkedip menjadi "Memuat..."
      }
    } catch (err) {
      if (isMounted.current) setError(err.message || "Gagal menyimpan planet");
    } finally {
      if (isMounted.current) setSaving(false);
    }
  };

  const startEdit = useCallback((planet) => {
    setError("");
    setMessage("");
    setEditingId(planet.id);
    setForm({
      name: planet.name || "",
      slug: planet.slug || "",
      order_index: planet.order_index ?? 0,
      image_url: planet.image_url || "",
      short_description: planet.short_description || "",
      description: planet.description || "",
    });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus planet ini?")) {
      return;
    }

    try {
      await deletePlanet(id);
      if (isMounted.current) {
        setMessage("Planet berhasil dihapus.");
        await loadPlanets();
      }
    } catch (err) {
      if (isMounted.current) setError(err.message || "Gagal menghapus planet");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setMessage("");
  };

  return (
    <section>
      <h1>Admin PlanetKita</h1>

      {error && (
        <p className="error" style={{ color: "red" }}>
          {error}
        </p>
      )}
      {message && (
        <p className="success" style={{ color: "green" }}>
          {message}
        </p>
      )}

      <div className="card" style={{ marginBottom: 24 }}>
        <h2>{editingId ? "Edit Planet" : "Tambah Planet"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Nama planet"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="slug"
            placeholder="Slug"
            value={form.slug}
            onChange={handleChange}
            required
          />

          <input
            name="order_index"
            type="number"
            min="0"
            placeholder="Urutan"
            value={form.order_index}
            onChange={handleChange}
          />

          <input
            name="image_url"
            placeholder="URL gambar"
            value={form.image_url}
            onChange={handleChange}
          />

          <textarea
            name="short_description"
            placeholder="Deskripsi singkat"
            value={form.short_description}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Deskripsi lengkap"
            value={form.description}
            onChange={handleChange}
          />

          <button type="submit" disabled={saving}>
            {saving ? "Menyimpan..." : "Simpan Planet"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              style={{ marginLeft: 8, background: "#64748b" }}
            >
              Batal Edit
            </button>
          )}
        </form>
      </div>

      {loading ? (
        <p>Memuat data planet...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Urutan</th>
              <th>Nama</th>
              <th>Slug</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {planets.length === 0 ? (
              <tr>
                <td colSpan={4}>Belum ada planet.</td>
              </tr>
            ) : (
              planets.map((planet) => (
                <tr key={planet.id}>
                  <td>{planet.order_index}</td>
                  <td>{planet.name}</td>
                  <td>{planet.slug}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => startEdit(planet)}
                      style={{ marginRight: 8, background: "#0f766e" }}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(planet.id)}
                      style={{ background: "#dc2626" }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </section>
  );
}
