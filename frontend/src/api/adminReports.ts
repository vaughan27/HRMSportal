import { apiClient } from "./client";

export async function downloadLeadEnquiriesExport(): Promise<void> {
  const response = await apiClient.get("/admin/lead-enquiries/export", {
    responseType: "blob",
  });

  const disposition = response.headers["content-disposition"] as string | undefined;
  const match = disposition?.match(/filename="?([^"]+)"?/);
  const filename = match?.[1] ?? "lead_enquiries.xlsx";

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}
