import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Employee } from "@/types/employee";
import { getEmployees } from "@/api/employee";
import "./StaffDirectory.css";

export default function StaffDirectory() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEmployees();
  }, [search, designation, department, location]);

  async function loadEmployees() {
    setLoading(true);
    setError(null);

    try {
      const data = await getEmployees({
        search,
        designation,
        department,
        location,
      });

      setEmployees(data);
    } catch (err) {
      setError(
        "Couldn't load the staff directory. Check the backend is running and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function clearFilters() {
    setSearch("");
    setDesignation("");
    setDepartment("");
    setLocation("");
  }

  const designations = Array.from(
    new Set(
      employees
        .map((employee) => employee.employee_designation)
        .filter(Boolean)
    )
  ).sort();

  const departments = Array.from(
    new Set(
      employees
        .map((employee) => employee.employee_department)
        .filter(Boolean)
    )
  ).sort();

  const locations = Array.from(
    new Set(
      employees
        .map((employee) => employee.employee_location)
        .filter(Boolean)
    )
  ).sort();

  return (
    <div className="staff-directory-page">
      {/* Header */}
      <div className="staff-directory-heading">
        <div>
          <h1>Staff Directory</h1>
          <p>Find a member of the team.</p>
        </div>

        <span className="staff-directory-count">
          {employees.length}{" "}
          {employees.length === 1 ? "employee" : "employees"}
        </span>
      </div>

      {/* Filters */}
      <section className="staff-directory-filters">
        <div className="staff-search">
          <label htmlFor="staff-search">Search</label>

          <input
            id="staff-search"
            type="search"
            placeholder="Search by employee name..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="staff-filter">
          <label htmlFor="designation-filter">Designation</label>

          <select
            id="designation-filter"
            value={designation}
            onChange={(event) => setDesignation(event.target.value)}
          >
            <option value="">All designations</option>

            {designations.map((value) => (
              <option key={value} value={value as string}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="staff-filter">
          <label htmlFor="department-filter">Department</label>

          <select
            id="department-filter"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            <option value="">All departments</option>

            {departments.map((value) => (
              <option key={value} value={value as string}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="staff-filter">
          <label htmlFor="location-filter">Location</label>

          <select
            id="location-filter"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          >
            <option value="">All locations</option>

            {locations.map((value) => (
              <option key={value} value={value as string}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {(search || designation || department || location) && (
          <button
            type="button"
            className="clear-filters-button"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        )}
      </section>

      {/* Error */}
      {error && (
        <div className="staff-directory-banner staff-directory-banner--error">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="staff-directory-state">
          Loading staff directory...
        </div>
      ) : employees.length === 0 ? (
        <div className="staff-directory-state">
          <h2>No employees found</h2>
          <p>Try changing your search or filters.</p>
        </div>
      ) : (
        <>
          {/* Employee count */}
          <div className="staff-results-count">
            Showing {employees.length}{" "}
            {employees.length === 1 ? "employee" : "employees"}
          </div>

          {/* Employee cards */}
          <div className="staff-directory-grid">
            {employees.map((employee) => (
              <article
                key={employee.employee_id}
                className="employee-card"
                onClick={() =>
                  navigate(`/staff/${employee.employee_id}`)
                }
                tabIndex={0}
                role="button"
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    navigate(`/staff/${employee.employee_id}`);
                  }
                }}
              >
                <div className="employee-card-content">
                  {/* Employee name */}
                  <h2 className="employee-card-name">
                    {employee.honorifics && (
                      <span>{employee.honorifics.charAt(0).toUpperCase() + employee.honorifics.slice(1)}{' '}</span>
                    )}
                    {employee.employee_name}
                  </h2>

                  {/* Department */}
                  {employee.employee_department && (
                    <span className="employee-card-department">
                      {employee.employee_department}
                    </span>
                  )}

                  {/* Phone */}
                  {employee.employee_phone && (
                    <div className="employee-card-phone">
                      <svg
                        className="employee-card-phone-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.81 16.44 14.93C17.59 15.31 18.83 15.52 20.11 15.52C20.66 15.52 21.11 15.97 21.11 16.52V20.11C21.11 20.66 20.66 21.11 20.11 21.11C10.65 21.11 3 13.46 3 4C3 3.45 3.45 3 4 3H7.6C8.15 3 8.6 3.45 8.6 4C8.6 5.29 8.81 6.53 9.19 7.67C9.31 8.04 9.22 8.43 8.94 8.71L6.62 10.79Z"
                          fill="currentColor"
                        />
                      </svg>

                      <span>
                        Ext: {employee.employee_phone}
                      </span>
                    </div>
                  )}
                </div>

                {/* Arrow */}
                <div className="employee-card-arrow" aria-hidden="true">
                  →
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}