import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import LeadEnquiryPage from "@/pages/LeadEnquiry";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/lead-enquiries" element={<LeadEnquiryPage />} />
    </Routes>
  );
}
