from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.lead_enquiry import PriorityEnum


class LeadEnquiryBase(BaseModel):
    product_code: str
    product_name: str
    product_description: str

    customer_name: str
    customer_phone: str

    salesman_code: str
    salesman_name: str

    location_code: str
    location_name: str

    priority: PriorityEnum


class LeadEnquiryCreate(LeadEnquiryBase):
    pass


class LeadEnquiryUpdate(LeadEnquiryBase):
    pass


class LeadEnquiryOut(LeadEnquiryBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
