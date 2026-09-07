from datetime import datetime
from io import BytesIO

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from openpyxl import Workbook
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin, get_db
from app.models.lead_enquiry import LeadEnquiry

router = APIRouter()

COLUMNS = [
    ("id", "ID"),
    ("product_code", "Product Code"),
    ("product_name", "Product Name"),
    ("product_description", "Product Description"),
    ("customer_name", "Customer Name"),
    ("customer_phone", "Customer Phone"),
    ("salesman_code", "Salesman Code"),
    ("salesman_name", "Salesman Name"),
    ("location_code", "Location Code"),
    ("location_name", "Location Name"),
    ("priority", "Priority"),
    ("created_at", "Created At"),
]


@router.get("/lead-enquiries/export")
def export_lead_enquiries(
    db: Session = Depends(get_db),
    _admin=Depends(get_current_admin),
):
    rows = db.query(LeadEnquiry).order_by(LeadEnquiry.id).all()

    wb = Workbook()
    ws = wb.active
    ws.title = "Lead Enquiries"

    ws.append([header for _, header in COLUMNS])

    for row in rows:
        values = []
        for field, _ in COLUMNS:
            value = getattr(row, field)
            if field == "priority":
                value = value.value if value else value
            if field == "created_at" and value is not None:
                value = value.replace(tzinfo=None)
            values.append(value)
        ws.append(values)

    for column_cells in ws.columns:
        length = max(len(str(cell.value)) if cell.value is not None else 0 for cell in column_cells)
        ws.column_dimensions[column_cells[0].column_letter].width = min(length + 4, 40)

    buffer = BytesIO()
    wb.save(buffer)
    buffer.seek(0)

    filename = f"lead_enquiries_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.xlsx"
    return StreamingResponse(
        buffer,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
