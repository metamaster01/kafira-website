// ─────────────────────────────────────────────────────
//  Add this helper to your data/trips.ts if not present:
// ─────────────────────────────────────────────────────

export function getTripById(id: string): Trip | undefined {
  return TRIPS.find(t => t.id === id);
}
