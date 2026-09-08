import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEmployee } from "@/api/employee";
import type { Employee } from "@/types/employee";
import "./EmployeeDetails.css";

export default function EmployeeDetails() {
  const { employeeId } = useParams<{ employeeId: string }>();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!employeeId) {
      setError("Employee not found.");
      setLoading(false);
      return;
    }

    loadEmployee(Number(employeeId));
  }, [employeeId]);

  async function loadEmployee(id: number) {
    setLoading(true);
    setError(null);

    try {
      const data = await getEmployee(id);
      setEmployee(data);
    } catch (err) {
      setError("Couldn't load the employee details.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="employee-details-page">
        <div className="employee-details-state">
          Loading employee details...
        </div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="employee-details-page">
        <Link to="/staff" className="employee-back-link">
          ← Staff Directory
        </Link>

        <div className="employee-details-state employee-details-state--error">
          <h2>Employee not found</h2>
          <p>{error || "The requested employee could not be found."}</p>
        </div>
      </div>
    );
  }

  const statusClass = employee.employee_status
    .toLowerCase()
    .replace(" ", "-");

  return (
    <div className="employee-details-page">
      <Link to="/staff" className="employee-back-link">
        ← Staff Directory
      </Link>

      <div className="employee-details-header">
        <div>
          <p className="employee-details-eyebrow">
            Employee details
          </p>

          <h1>
            {employee.honorifics && `${employee.honorifics.charAt(0).toUpperCase() + employee.honorifics.slice(1)} `}
            {employee.employee_name}
          </h1>

          {employee.employee_designation && (
            <p className="employee-details-designation">
              {employee.employee_designation}
            </p>
          )}
        </div>

        <span
          className={`employee-status employee-status--${statusClass}`}
        >
          <span className="employee-status__dot" />
          {employee.employee_status}
        </span>
      </div>

      <div className="employee-details-grid">
        <section className="employee-details-card">
          <h2>Contact</h2>

          <dl>
            <div className="employee-detail-row">
              <dt>Work phone</dt>
              <dd>
                {employee.employee_phone || "—"}
              </dd>
            </div>

            <div className="employee-detail-row">
              <dt>Personal phone</dt>
              <dd>
                {employee.employee_phone_personal || "—"}
              </dd>
            </div>

            <div className="employee-detail-row">
              <dt>Email</dt>
              <dd>
                {employee.employee_email ? (
                  <a href={`mailto:${employee.employee_email}`}>
                    {employee.employee_email}
                  </a>
                ) : (
                  "—"
                )}
              </dd>
            </div>
          </dl>
        </section>

        <section className="employee-details-card">
          <h2>Employment</h2>

          <dl>
            <div className="employee-detail-row">
              <dt>Designation</dt>
              <dd>
                {employee.employee_designation || "—"}
              </dd>
            </div>

            <div className="employee-detail-row">
              <dt>Department</dt>
              <dd>
                {employee.employee_department || "—"}
              </dd>
            </div>

            <div className="employee-detail-row">
              <dt>Location</dt>
              <dd>
                {employee.employee_location || "—"}
              </dd>
            </div>

            <div className="employee-detail-row">
              <dt>Status</dt>
              <dd>
                <span
                  className={`employee-status employee-status--${statusClass}`}
                >
                  <span className="employee-status__dot" />
                  {employee.employee_status}
                </span>
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}