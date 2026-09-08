import { Routes, Route } from "react-router-dom";

import Dashboard from "@/pages/Dashboard";
import LeadEnquiryPage from "@/pages/LeadEnquiry";

import StaffDirectory from "@/pages/StaffDirectory";
import EmployeeDetails from "@/pages/EmployeeDetails";

import AdminLoginPage from "@/pages/admin/Login";
import AdminReportsPage from "@/pages/admin/Reports";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Main pages */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/lead-enquiries" element={<LeadEnquiryPage />} />

      {/* Staff */}
      <Route path="/staff" element={<StaffDirectory />} />
      <Route path="/staff/:employeeId" element={<EmployeeDetails />} />

      {/* Admin */}
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