export type EmployeeStatus = "Active" | "Inactive" | "OnLeave";

export interface Employee {
  employee_id: number;
  employee_name: string;
  honorifics: string | null;
  employee_phone: string | null;
  employee_phone_personal: string | null;
  employee_email: string | null;
  employee_designation: string | null;
  employee_department: string | null;
  employee_location: string | null;
  employee_status: EmployeeStatus;
}

export interface EmployeeFilters {
  search?: string;
  designation?: string;
  department?: string;
  location?: string;
}