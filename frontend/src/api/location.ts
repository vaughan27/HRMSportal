import { apiClient } from "./client";
import type { LookupOption } from "@/types/lookup";

interface LocationApiRecord {
  location_id: number;
  location_code: string;
  location_name: string;
}

export async function searchLocations(query: string): Promise<LookupOption[]> {
  const { data } = await apiClient.get<LocationApiRecord[]>("/locations/", {
    params: { q: query, limit: 10 },
  });
  return data.map((r) => ({ id: r.location_id, code: r.location_code, name: r.location_name }));
}
