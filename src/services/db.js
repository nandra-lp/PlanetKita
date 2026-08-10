import { supabase } from "../lib/supabase.js";

const PLANET_DETAIL_SELECT = `
  *,
  planet_stats(*),
  facts(*),
  planet_media(*)
`;

function normalizeOne(statsOrArray) {
  if (!statsOrArray) return null;
  return Array.isArray(statsOrArray) ? (statsOrArray[0] ?? null) : statsOrArray;
}

function normalizePlanet(planet) {
  const facts = [...(planet.facts || [])].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

  const media = [...(planet.planet_media || [])].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
  );

  return {
    ...planet,
    stats: normalizeOne(planet.planet_stats),
    facts,
    media,
  };
}

export function toNumberOrNull(value) {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

// =====================================================
// PUBLIC SUMMARY (untuk guest / LandingPage)
// =====================================================

export async function getPlanetSummaries() {
  const { data, error } = await supabase.rpc("get_planet_summaries");

  if (error) throw error;

  return data ?? [];
}

// =====================================================
// AUTHENTICATED (untuk user login / HomePage)
// =====================================================

export async function getPlanetsWithStats() {
  const { data, error } = await supabase
    .from("planets")
    .select("*, planet_stats(*)")
    .order("order_index", { ascending: true });

  if (error) throw error;

  return data.map((planet) => ({
    ...planet,
    stats: normalizeOne(planet.planet_stats),
  }));
}

// =====================================================
// AUTHENTICATED DETAIL
// =====================================================

export async function getPlanetBySlug(slug) {
  const { data, error } = await supabase
    .from("planets")
    .select(PLANET_DETAIL_SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return normalizePlanet(data);
}

export async function getPlanetById(id) {
  const { data, error } = await supabase
    .from("planets")
    .select(PLANET_DETAIL_SELECT)
    .eq("id", id)
    .single();

  if (error) throw error;

  return normalizePlanet(data);
}

// =====================================================
// ADMIN PLANETS
// =====================================================

export async function getAdminPlanets() {
  return getPlanetsWithStats();
}

export async function createPlanet(payload) {
  const { data, error } = await supabase
    .from("planets")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePlanet(id, payload) {
  const { data, error } = await supabase
    .from("planets")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePlanet(id) {
  const { error } = await supabase.from("planets").delete().eq("id", id);

  if (error) throw error;
}

// =====================================================
// ADMIN PLANET STATS
// =====================================================

export async function upsertPlanetStats(planetId, stats) {
  const payload = {
    ...stats,
    planet_id: planetId,
  };

  const { data, error } = await supabase
    .from("planet_stats")
    .upsert(payload, {
      onConflict: "planet_id",
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// =====================================================
// ADMIN FACTS
// =====================================================

export async function createFact(planetId, fact) {
  const { data, error } = await supabase
    .from("facts")
    .insert({
      ...fact,
      planet_id: planetId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateFact(id, fact) {
  const { data, error } = await supabase
    .from("facts")
    .update(fact)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteFact(id) {
  const { error } = await supabase.from("facts").delete().eq("id", id);

  if (error) throw error;
}

// =====================================================
// ADMIN PLANET MEDIA
// =====================================================

export async function createMedia(planetId, media) {
  const { data, error } = await supabase
    .from("planet_media")
    .insert({
      ...media,
      planet_id: planetId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateMedia(id, media) {
  const { data, error } = await supabase
    .from("planet_media")
    .update(media)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteMedia(id) {
  const { error } = await supabase.from("planet_media").delete().eq("id", id);

  if (error) throw error;
}
