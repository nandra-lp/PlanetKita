-- =========================================================
-- 1. DETAIL PLANET HANYA UNTUK USER LOGIN
-- =========================================================

DROP POLICY IF EXISTS "Public can view planets"
ON public.planets;

CREATE POLICY "Authenticated users can view planets"
ON public.planets
FOR SELECT
TO authenticated
USING (TRUE);


DROP POLICY IF EXISTS "Public can view planet stats"
ON public.planet_stats;

CREATE POLICY "Authenticated users can view planet stats"
ON public.planet_stats
FOR SELECT
TO authenticated
USING (TRUE);


DROP POLICY IF EXISTS "Public can view facts"
ON public.facts;

CREATE POLICY "Authenticated users can view facts"
ON public.facts
FOR SELECT
TO authenticated
USING (TRUE);


DROP POLICY IF EXISTS "Public can view planet media"
ON public.planet_media;

CREATE POLICY "Authenticated users can view planet media"
ON public.planet_media
FOR SELECT
TO authenticated
USING (TRUE);


-- =========================================================
-- 2. RINGKASAN PLANET UNTUK PUBLIK
-- =========================================================

CREATE OR REPLACE FUNCTION public.get_planet_summaries()
RETURNS TABLE (
    id UUID,
    name TEXT,
    slug TEXT,
    order_index INTEGER,
    image_url TEXT,
    short_description TEXT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT
        p.id,
        p.name,
        p.slug,
        p.order_index,
        p.image_url,
        p.short_description
    FROM public.planets p
    ORDER BY p.order_index;
$$;


GRANT EXECUTE ON FUNCTION public.get_planet_summaries()
TO anon, authenticated;