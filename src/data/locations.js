// Dutch province + city reference data.
// This is intentionally structured so a future backend/data layer can replace
// it with a real PDOK-backed city -> province lookup without changing the UI.

export const ALL_NETHERLANDS = "All Netherlands";

export const PROVINCES = [
  "All Netherlands",
  "Drenthe",
  "Flevoland",
  "Friesland",
  "Gelderland",
  "Groningen",
  "Limburg",
  "Noord-Brabant",
  "Noord-Holland",
  "Overijssel",
  "Utrecht",
  "Zeeland",
  "Zuid-Holland",
];

// Cities per province (subset, realistic). Used to populate the City filter
// once a Province has been selected at the search level.
export const CITIES_BY_PROVINCE = {
  Drenthe: ["Assen", "Emmen", "Hoogeveen", "Meppel"],
  Flevoland: ["Almere", "Lelystad", "Dronten", "Emmeloord"],
  Friesland: ["Leeuwarden", "Drachten", "Sneek", "Heerenveen"],
  Gelderland: ["Arnhem", "Nijmegen", "Apeldoorn", "Ede", "Doetinchem"],
  Groningen: ["Groningen", "Hoogezand", "Winschoten", "Veendam"],
  Limburg: ["Maastricht", "Venlo", "Sittard", "Roermond", "Heerlen"],
  "Noord-Brabant": ["Eindhoven", "Tilburg", "Breda", "'s-Hertogenbosch", "Helmond"],
  "Noord-Holland": ["Amsterdam", "Haarlem", "Zaanstad", "Alkmaar", "Hilversum"],
  Overijssel: ["Zwolle", "Enschede", "Deventer", "Hengelo"],
  Utrecht: ["Amersfoort", "Houten", "Nieuwegein", "Utrecht", "Zeist"],
  Zeeland: ["Middelburg", "Vlissingen", "Goes", "Terneuzen"],
  "Zuid-Holland": ["Rotterdam", "Den Haag", "Leiden", "Delft", "Dordrecht", "Gouda"],
};

// Flat, alphabetically sorted list of every city, used when the search scope
// is "All Netherlands" and the City filter needs to search nationwide.
export const ALL_CITIES = Object.values(CITIES_BY_PROVINCE)
  .flat()
  .sort((a, b) => a.localeCompare(b));

export function citiesForProvince(province) {
  if (!province || province === ALL_NETHERLANDS) {
    return ALL_CITIES;
  }
  return [...(CITIES_BY_PROVINCE[province] || [])].sort((a, b) => a.localeCompare(b));
}

export function provinceForCity(city) {
  for (const [province, cities] of Object.entries(CITIES_BY_PROVINCE)) {
    if (cities.includes(city)) return province;
  }
  return null;
}
