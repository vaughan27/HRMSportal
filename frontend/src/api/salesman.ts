import { apiClient } from "./client";
import type { LookupOption } from "@/types/lookup";

interface SalesmanApiRecord {
  salesman_id: number;
  salesman_code: string;
  salesman_name: string;
}

export async function searchSalesmen(query: string): Promise<LookupOption[]> {
  const { data } = await apiClient.get<SalesmanApiRecord[]>("/salesmen/", {
    params: { q: query, limit: 10 },
  });
  return data.map((r) => ({ id: r.salesman_id, code: r.salesman_code, name: r.salesman_name }));
}
