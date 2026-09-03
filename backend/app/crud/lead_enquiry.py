from sqlalchemy.orm import Session

from app.models.lead_enquiry import LeadEnquiry
from app.schemas.lead_enquiry import LeadEnquiryCreate, LeadEnquiryUpdate


def create_lead_enquiry(db: Session, data: LeadEnquiryCreate) -> LeadEnquiry:
    lead = LeadEnquiry(**data.model_dump())
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead


def get_lead_enquiry(db: Session, lead_id: int) -> LeadEnquiry | None:
    return db.query(LeadEnquiry).filter(LeadEnquiry.id == lead_id).first()


def get_lead_enquiries(db: Session, skip: int = 0, limit: int = 100) -> list[LeadEnquiry]:
    return db.query(LeadEnquiry).order_by(LeadEnquiry.id.desc()).offset(skip).limit(limit).all()


def update_lead_enquiry(db: Session, lead_id: int, data: LeadEnquiryUpdate) -> LeadEnquiry | None:
    lead = get_lead_enquiry(db, lead_id)
    if not lead:
        return None
    for field, value in data.model_dump().items():
        setattr(lead, field, value)
    db.commit()
    db.refresh(lead)
    return lead


def delete_lead_enquiry(db: Session, lead_id: int) -> bool:
    lead = get_lead_enquiry(db, lead_id)
    if not lead:
        return False
    db.delete(lead)
    db.commit()
    return True
