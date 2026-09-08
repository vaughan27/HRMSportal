import { apiClient } from "./client";
import type { Employee, EmployeeFilters } from "@/types/employee";

export async function getEmployees(
  filters: EmployeeFilters = {}
): Promise<Employee[]> {
  const params = new URLSearchParams();

  if (filters.search) {
    params.append("search", filters.search);
  }

  if (filters.designation) {
    params.append("designation", filters.designation);
  }

  if (filters.department) {
    params.append("department", filters.department);
  }

  if (filters.location) {
    params.append("location", filters.location);
  }

  const query = params.toString();

  const { data } = await apiClient.get<Employee[]>(
    `/employees/${query ? `?${query}` : ""}`
  );

  return data;
}

export async function getEmployee(
  employeeId: number
): Promise<Employee> {
  const { data } = await apiClient.get<Employee>(
    `/employees/${employeeId}`
  );

  return data;
}
