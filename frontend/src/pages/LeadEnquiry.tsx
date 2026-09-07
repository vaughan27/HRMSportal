import { useState } from "react";
import type { FormEvent } from "react";
import PrioritySelect from "@/components/ui/PrioritySelect";
import SearchSelect from "@/components/ui/SearchSelect";
import { createLeadEnquiry } from "@/api/leadEnquiry";
import { searchLocations } from "@/api/location";
import { searchSalesmen } from "@/api/salesman";
import { emptyLeadEnquiryForm } from "@/types/leadEnquiry";
import type { LeadEnquiryFormData, Priority } from "@/types/leadEnquiry";
import "./LeadEnquiry.css";

type FieldName = keyof LeadEnquiryFormData;

const REQUIRED_TEXT_FIELDS: { name: FieldName; label: string }[] = [
  { name: "product_code", label: "Product code" },
  { name: "product_name", label: "Product name" },
];

export default function LeadEnquiryPage() {
  const [form, setForm] = useState<LeadEnquiryFormData>(emptyLeadEnquiryForm);
  const [errors, setErrors] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<number | null>(null);

  function setField(name: FieldName, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  }

  function setLookupPair(codeField: FieldName, nameField: FieldName, code: string, name: string) {
    setForm((prev) => ({ ...prev, [codeField]: code, [nameField]: name }));
    setErrors((prev) => ({ ...prev, [codeField]: false, [nameField]: false }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<FieldName, boolean>> = {};
    (Object.keys(emptyLeadEnquiryForm) as FieldName[]).forEach((key) => {
      if (key === "priority" || key === "product_description") return;
      if (!form[key].trim()) {
        nextErrors[key] = true;
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);
    try {
      const created = await createLeadEnquiry(form);
      setTicketId(created.id);
      setStatus("success");
      setForm(emptyLeadEnquiryForm);
    } catch (err) {
      setStatus("error");
      setErrorMessage("Couldn't submit the enquiry. Check the backend is running and try again.");
    }
  }

  function fieldClass(name: FieldName) {
    return "field__input" + (errors[name] ? " has-error" : "");
  }

  return (
    <div className="lead-enquiry-page">
      <div className="lead-enquiry-form-column">
        <div className="lead-enquiry-heading">
          <h1>Customer Wishlist</h1>
          <p>Log an incoming enquiry so it can be tracked through to a sale.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <section className="form-section">
            <h2>Product</h2>
            <div className="field-row">
              <div className="field">
                <label htmlFor="product_code">Product code</label>
                <input
                  id="product_code"
                  className={fieldClass("product_code")}
                  value={form.product_code}
                  onChange={(e) => setField("product_code", e.target.value)}
                />
                {errors.product_code && <span className="field__error">Required</span>}
              </div>
              <div className="field">
                <label htmlFor="product_name">Product name</label>
                <input
                  id="product_name"
                  className={fieldClass("product_name")}
                  value={form.product_name}
                  onChange={(e) => setField("product_name", e.target.value)}
                />
                {errors.product_name && <span className="field__error">Required</span>}
              </div>
            </div>
            <div className="field">
              <label htmlFor="product_description">
                Product description <span className="field__optional">(optional)</span>
              </label>
              <textarea
                id="product_description"
                className="field__input"
                rows={3}
                value={form.product_description}
                onChange={(e) => setField("product_description", e.target.value)}
              />
            </div>
          </section>

          <section className="form-section">
            <h2>Customer</h2>
            <div className="field-row">
              <div className="field">
                <label htmlFor="customer_name">Customer name</label>
                <input
                  id="customer_name"
                  className={fieldClass("customer_name")}
                  value={form.customer_name}
                  onChange={(e) => setField("customer_name", e.target.value)}
                />
                {errors.customer_name && <span className="field__error">Required</span>}
              </div>
              <div className="field">
                <label htmlFor="customer_phone">Customer phone</label>
                <input
                  id="customer_phone"
                  className={fieldClass("customer_phone")}
                  value={form.customer_phone}
                  onChange={(e) => setField("customer_phone", e.target.value)}
                />
                {errors.customer_phone && <span className="field__error">Required</span>}
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Sales rep</h2>
            <div className="field">
              <label htmlFor="salesman">Salesman</label>
              <SearchSelect
                id="salesman"
                placeholder="Search by salesman code or name…"
                value={{ code: form.salesman_code, name: form.salesman_name }}
                onChange={(code, name) => setLookupPair("salesman_code", "salesman_name", code, name)}
                fetchOptions={searchSalesmen}
                hasError={errors.salesman_code || errors.salesman_name}
              />
              {(errors.salesman_code || errors.salesman_name) && (
                <span className="field__error">Required</span>
              )}
            </div>
          </section>

          <section className="form-section">
            <h2>Location</h2>
            <div className="field">
              <label htmlFor="location">Location</label>
              <SearchSelect
                id="location"
                placeholder="Search by location code or name…"
                value={{ code: form.location_code, name: form.location_name }}
                onChange={(code, name) => setLookupPair("location_code", "location_name", code, name)}
                fetchOptions={searchLocations}
                hasError={errors.location_code || errors.location_name}
              />
              {(errors.location_code || errors.location_name) && (
                <span className="field__error">Required</span>
              )}
            </div>
          </section>

          <section className="form-section">
            <h2>Priority</h2>
            <PrioritySelect
              id="priority"
              value={form.priority}
              onChange={(value: Priority) => setField("priority", value)}
            />
          </section>

          {status === "error" && errorMessage && (
            <div className="form-banner form-banner--error">{errorMessage}</div>
          )}
          {status === "success" && (
            <div className="form-banner form-banner--success">
              Enquiry #{ticketId} submitted.
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="submit-button" disabled={status === "submitting"}>
              {status === "submitting" ? "Submitting…" : "Submit enquiry"}
            </button>
          </div>
        </form>
      </div>

      <aside className="ticket-preview">
        <div className={`ticket-card ticket-card--${form.priority.toLowerCase()}`}>
          <div className="ticket-card__header">
            <span className="ticket-card__eyebrow">Enquiry ticket</span>
            <span className="ticket-card__id">
              {status === "success" && ticketId ? `#${ticketId}` : "pending"}
            </span>
          </div>

          <dl className="ticket-card__rows">
            <div className="ticket-card__row">
              <dt>Product</dt>
              <dd>{form.product_name || "—"}</dd>
            </div>
            <div className="ticket-card__row">
              <dt>Customer</dt>
              <dd>{form.customer_name || "—"}</dd>
            </div>
            <div className="ticket-card__row">
              <dt>Salesman</dt>
              <dd>{form.salesman_name || "—"}</dd>
            </div>
            <div className="ticket-card__row">
              <dt>Location</dt>
              <dd>{form.location_name || "—"}</dd>
            </div>
          </dl>

          <div className="ticket-card__priority">
            <span className={`priority-dot priority-dot--${form.priority.toLowerCase()}`} />
            {form.priority} priority
          </div>
        </div>
      </aside>
    </div>
  );
}
