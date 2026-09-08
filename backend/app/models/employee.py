import enum

from sqlalchemy import Column, Integer, String, Enum, DateTime, func

from app.core.database import Base


class HonorificEnum(str, enum.Enum):
    mr = "mr."
    mrs = "mrs."
    ms = "ms."
    dr = "dr."
    prof = "prof."


class EmployeeStatusEnum(str, enum.Enum):
    active = "active"
    inactive = "inactive"
    on_leave = "on_leave"


class Employee(Base):
    __tablename__ = "employee"

    employee_id = Column(Integer, primary_key=True, index=True)
    employee_code = Column(String, nullable=True, unique=True, index=True)
    honorifics = Column(Enum(HonorificEnum, name="honorific_enum"), nullable=True)
    employee_name = Column(String, nullable=False)
    employee_phone = Column(String, nullable=True)
    employee_phone_personal = Column(String, nullable=True)
    employee_email = Column(String, nullable=True, unique=True)
    employee_designation = Column(String, nullable=True)
    employee_department = Column(String, nullable=True)
    employee_location = Column(String, nullable=True)
    employee_status = Column(
        Enum(EmployeeStatusEnum, name="employee_status_enum"),
        nullable=False,
        server_default=EmployeeStatusEnum.active.value,
    )
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())