from typing import Optional

from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeUpdate


def create_employee(db: Session, payload: EmployeeCreate) -> Employee:
    employee = Employee(**payload.model_dump())
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee


# def get_employees(db: Session, skip: int = 0, limit: int = 100):
#     return (
#         db.query(Employee)
#         .order_by(Employee.employee_name)
#         .offset(skip)
#         .limit(limit)
#         .all()
#     )
def get_employees(
    db: Session,
    search: Optional[str] = None,
    designation: Optional[str] = None,
    department: Optional[str] = None,
    location: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
):
    query = db.query(Employee)

    if designation:
        query = query.filter(Employee.employee_designation == designation)

    if department:
        query = query.filter(Employee.employee_department == department)

    if location:
        query = query.filter(Employee.employee_location == location)

    if search:
            # case-insensitive name search (adjust column name if different)
            query = query.filter(
                Employee.employee_name.ilike(f"%{search}%")
            )

    return (
        query
        .order_by(Employee.employee_name)
        .offset(skip)
        .limit(limit)
        .all()
    )

def get_employee(db: Session, employee_id: int) -> Optional[Employee]:
    return db.get(Employee, employee_id)


def update_employee(db: Session, employee_id: int, payload: EmployeeUpdate) -> Optional[Employee]:
    employee = db.get(Employee, employee_id)
    if not employee:
        return None

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(employee, field, value)

    db.commit()
    db.refresh(employee)
    return employee


def delete_employee(db: Session, employee_id: int) -> bool:
    employee = db.get(Employee, employee_id)
    if not employee:
        return False
    db.delete(employee)
    db.commit()
    return True