from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.crud import lead_enquiry as crud
from app.schemas.lead_enquiry import LeadEnquiryCreate, LeadEnquiryOut, LeadEnquiryUpdate

router = APIRouter()


@router.post("/", response_model=LeadEnquiryOut, status_code=201)
def create_lead_enquiry(payload: LeadEnquiryCreate, db: Session = Depends(get_db)):
    return crud.create_lead_enquiry(db, payload)


@router.get("/", response_model=list[LeadEnquiryOut])
def list_lead_enquiries(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_lead_enquiries(db, skip=skip, limit=limit)


@router.get("/{lead_id}", response_model=LeadEnquiryOut)
def get_lead_enquiry(lead_id: int, db: Session = Depends(get_db)):
    lead = crud.get_lead_enquiry(db, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead enquiry not found")
    return lead


# @router.put("/{lead_id}", response_model=LeadEnquiryOut)
# def update_lead_enquiry(lead_id: int, payload: LeadEnquiryUpdate, db: Session = Depends(get_db)):
#     lead = crud.update_lead_enquiry(db, lead_id, payload)
#     if not lead:
#         raise HTTPException(status_code=404, detail="Lead enquiry not found")
#     return lead


# @router.delete("/{lead_id}", status_code=204)
# def delete_lead_enquiry(lead_id: int, db: Session = Depends(get_db)):
#     deleted = crud.delete_lead_enquiry(db, lead_id)
#     if not deleted:
#         raise HTTPException(status_code=404, detail="Lead enquiry not found")
