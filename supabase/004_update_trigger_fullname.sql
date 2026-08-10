-- =========================================================
-- UPDATE TRIGGER FOR FULL NAME
-- File: 004_update_trigger_fullname.sql
-- Description: Mengubah trigger pembuatan profil otomatis agar
--              mengambil full_name dari metadata saat pendaftaran.
-- =========================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url, role)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name', -- Mengambil full_name dari data form register
        NULL,
        'user'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;
