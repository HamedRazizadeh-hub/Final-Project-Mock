// Flat mock city/location reference data for V1 search.
// V1 search uses city/location text because the current job data source does
// not reliably support larger regional filtering.

export const ALL_LOCATIONS = "All locations";

export const LOCATIONS = [
  "Utrecht",
  "Nieuwegein",
  "Amersfoort",
  "Houten",
  "Zeist",
  "Amsterdam",
  "Haarlem",
  "Zaanstad",
  "Alkmaar",
  "Hilversum",
  "Rotterdam",
  "The Hague",
  "Den Haag",
  "Leiden",
  "Delft",
  "Dordrecht",
  "Gouda",
  "Eindhoven",
  "Tilburg",
  "Breda",
  "'s-Hertogenbosch",
  "Helmond",
  "Arnhem",
  "Nijmegen",
  "Apeldoorn",
  "Ede",
  "Zwolle",
  "Enschede",
  "Groningen",
  "Maastricht",
  "Remote",
].sort((a, b) => a.localeCompare(b));

export function normalizeLocation(value) {
  const normalized = (value || "").trim();
  return normalized === "The Hague" ? "Den Haag" : normalized;
}
