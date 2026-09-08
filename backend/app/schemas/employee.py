from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr

from app.models.employee import HonorificEnum, EmployeeStatusEnum


class EmployeeBase(BaseModel):
    honorifics: Optional[HonorificEnum] = None
    employee_name: str
    employee_phone: Optional[str] = None
    employee_phone_personal: Optional[str] = None
    employee_email: Optional[EmailStr] = None
    employee_designation: Optional[str] = None
    employee_department: Optional[str] = None
    employee_location: Optional[str] = None
    employee_status: EmployeeStatusEnum = EmployeeStatusEnum.active


class EmployeeCreate(EmployeeBase):
    employee_code: Optional[str] = None


class EmployeeUpdate(BaseModel):
    honorifics: Optional[HonorificEnum] = None
    employee_name: Optional[str] = None
    employee_phone: Optional[str] = None
    employee_phone_personal: Optional[str] = None
    employee_email: Optional[EmailStr] = None
    employee_designation: Optional[str] = None
    employee_department: Optional[str] = None
    employee_location: Optional[str] = None
    employee_status: Optional[EmployeeStatusEnum] = None


class EmployeeOut(EmployeeBase):
    model_config = ConfigDict(from_attributes=True)

    employee_id: int
    created_at: datetime
    updated_at: datetime
    # employee_code intentionally omitted from output — internal use only for now