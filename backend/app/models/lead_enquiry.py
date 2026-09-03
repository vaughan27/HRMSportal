import enum

from sqlalchemy import Column, Integer, String, DateTime, Enum, func

from app.core.database import Base


class PriorityEnum(str, enum.Enum):
    low = "Low"
    medium = "Medium"
    high = "High"


class LeadEnquiry(Base):
    __tablename__ = "lead_enquiry"

    id = Column(Integer, primary_key=True, index=True)

    product_code = Column(String, nullable=False)
    product_name = Column(String, nullable=False)
    product_description = Column(String, nullable=True)

    customer_name = Column(String, nullable=False)
    customer_phone = Column(String, nullable=False)

    salesman_code = Column(String, nullable=False)
    salesman_name = Column(String, nullable=False)

    location_code = Column(String, nullable=False)
    location_name = Column(String, nullable=False)

    priority = Column(Enum(PriorityEnum, name="priority_enum"), nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
