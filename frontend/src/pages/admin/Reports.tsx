import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { downloadLeadEnquiriesExport } from "@/api/adminReports";
import "./Reports.css";

export default function AdminReportsPage() {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();

  async function handleDownload() {
    setDownloading(true);
    setError(null);
    try {
      await downloadLeadEnquiriesExport();
    } catch {
      setError("Couldn't download the export. Try signing in again.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="admin-reports-page">
      <div className="admin-reports-header">
        <h1>Admin</h1>
        <button className="logout-link" onClick={logout}>
          Log out
        </button>
      </div>

      <section className="report-card">
        <h2>Lead enquiries</h2>
        <p>Download every lead enquiry recorded so far as an Excel spreadsheet.</p>

        {error && <div className="form-banner form-banner--error">{error}</div>}

        <button className="submit-button" onClick={handleDownload} disabled={downloading}>
          {downloading ? "Preparing file…" : "Download as Excel"}
        </button>
      </section>
    </div>
  );
}
