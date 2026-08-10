CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'user_role'
    ) THEN
        CREATE TYPE public.user_role AS ENUM (
            'user',
            'admin'
        );
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'media_type'
    ) THEN
        CREATE TYPE public.media_type AS ENUM (
            'image',
            'video'
        );
    END IF;
END
$$;

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    role public.user_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.planets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    order_index INTEGER NOT NULL DEFAULT 0,
    image_url TEXT,
    short_description TEXT,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT planets_order_index_check CHECK (order_index >= 0)
);

CREATE TABLE IF NOT EXISTS public.planet_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    planet_id UUID NOT NULL UNIQUE REFERENCES public.planets(id) ON DELETE CASCADE,
    diameter NUMERIC,
    mass NUMERIC,
    gravity NUMERIC,
    distance_from_sun NUMERIC,
    orbital_period NUMERIC,
    rotation_period NUMERIC,
    average_temperature NUMERIC,
    number_of_moons INTEGER NOT NULL DEFAULT 0,
    has_rings BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT planet_stats_number_of_moons_check CHECK (number_of_moons >= 0)
);

CREATE TABLE IF NOT EXISTS public.facts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    planet_id UUID NOT NULL REFERENCES public.planets(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    source TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.planet_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    planet_id UUID NOT NULL REFERENCES public.planets(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    media_type public.media_type NOT NULL DEFAULT 'image',
    caption TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT planet_media_sort_order_check CHECK (sort_order >= 0)
);

CREATE INDEX IF NOT EXISTS idx_planets_order_index ON public.planets(order_index);
CREATE INDEX IF NOT EXISTS idx_facts_planet_id ON public.facts(planet_id);
CREATE INDEX IF NOT EXISTS idx_planet_media_planet_id ON public.planet_media(planet_id);
CREATE INDEX IF NOT EXISTS idx_planet_media_sort_order ON public.planet_media(planet_id, sort_order);

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS planets_updated_at ON public.planets;
CREATE TRIGGER planets_updated_at
BEFORE UPDATE ON public.planets
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS planet_stats_updated_at ON public.planet_stats;
CREATE TRIGGER planet_stats_updated_at
BEFORE UPDATE ON public.planet_stats
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS facts_updated_at ON public.facts;
CREATE TRIGGER facts_updated_at
BEFORE UPDATE ON public.facts
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url, role)
    VALUES (NEW.id, NULL, NULL, 'user')
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
$$;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planet_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planet_media ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT TO authenticated USING (id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "Public can view planets" ON public.planets;
CREATE POLICY "Public can view planets" ON public.planets
FOR SELECT TO anon, authenticated USING (TRUE);

DROP POLICY IF EXISTS "Admins can insert planets" ON public.planets;
CREATE POLICY "Admins can insert planets" ON public.planets
FOR INSERT TO authenticated WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update planets" ON public.planets;
CREATE POLICY "Admins can update planets" ON public.planets
FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete planets" ON public.planets;
CREATE POLICY "Admins can delete planets" ON public.planets
FOR DELETE TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Public can view planet stats" ON public.planet_stats;
CREATE POLICY "Public can view planet stats" ON public.planet_stats
FOR SELECT TO anon, authenticated USING (TRUE);

DROP POLICY IF EXISTS "Admins can insert planet stats" ON public.planet_stats;
CREATE POLICY "Admins can insert planet stats" ON public.planet_stats
FOR INSERT TO authenticated WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update planet stats" ON public.planet_stats;
CREATE POLICY "Admins can update planet stats" ON public.planet_stats
FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete planet stats" ON public.planet_stats;
CREATE POLICY "Admins can delete planet stats" ON public.planet_stats
FOR DELETE TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Public can view facts" ON public.facts;
CREATE POLICY "Public can view facts" ON public.facts
FOR SELECT TO anon, authenticated USING (TRUE);

DROP POLICY IF EXISTS "Admins can insert facts" ON public.facts;
CREATE POLICY "Admins can insert facts" ON public.facts
FOR INSERT TO authenticated WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update facts" ON public.facts;
CREATE POLICY "Admins can update facts" ON public.facts
FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete facts" ON public.facts;
CREATE POLICY "Admins can delete facts" ON public.facts
FOR DELETE TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Public can view planet media" ON public.planet_media;
CREATE POLICY "Public can view planet media" ON public.planet_media
FOR SELECT TO anon, authenticated USING (TRUE);

DROP POLICY IF EXISTS "Admins can insert planet media" ON public.planet_media;
CREATE POLICY "Admins can insert planet media" ON public.planet_media
FOR INSERT TO authenticated WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update planet media" ON public.planet_media;
CREATE POLICY "Admins can update planet media" ON public.planet_media
FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete planet media" ON public.planet_media;
CREATE POLICY "Admins can delete planet media" ON public.planet_media
FOR DELETE TO authenticated USING (public.is_admin());