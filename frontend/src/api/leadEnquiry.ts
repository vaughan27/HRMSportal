import { apiClient } from "./client";
import type { LeadEnquiry, LeadEnquiryFormData } from "@/types/leadEnquiry";

export async function createLeadEnquiry(
  payload: LeadEnquiryFormData
): Promise<LeadEnquiry> {
  const { data } = await apiClient.post<LeadEnquiry>("/lead-enquiries/", payload);
  return data;
}
