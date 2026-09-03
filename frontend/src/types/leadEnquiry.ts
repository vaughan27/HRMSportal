export type Priority = "Low" | "Medium" | "High";

export interface LeadEnquiryFormData {
  product_code: string;
  product_name: string;
  product_description: string;
  customer_name: string;
  customer_phone: string;
  salesman_code: string;
  salesman_name: string;
  location_code: string;
  location_name: string;
  priority: Priority;
}

export interface LeadEnquiry extends LeadEnquiryFormData {
  id: number;
  created_at: string;
}

export const emptyLeadEnquiryForm: LeadEnquiryFormData = {
  product_code: "",
  product_name: "",
  product_description: "",
  customer_name: "",
  customer_phone: "",
  salesman_code: "",
  salesman_name: "",
  location_code: "",
  location_name: "",
  priority: "Low",
};
