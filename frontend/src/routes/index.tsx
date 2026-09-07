import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import LeadEnquiryPage from "@/pages/LeadEnquiry";
import AdminLoginPage from "@/pages/admin/Login";
import AdminReportsPage from "@/pages/admin/Reports";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/lead-enquiries" element={<LeadEnquiryPage />} />

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminReportsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
