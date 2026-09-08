from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin, get_db
from app.crud import employee as crud
from app.schemas.employee import EmployeeCreate, EmployeeOut, EmployeeUpdate

router = APIRouter()


@router.post(
    "/",
    response_model=EmployeeOut,
    status_code=201,
    dependencies=[Depends(get_current_admin)],
)
def create_employee(payload: EmployeeCreate, db: Session = Depends(get_db)):
    return crud.create_employee(db, payload)


@router.get("/", response_model=list[EmployeeOut])
def list_employees(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_employees(db, skip=skip, limit=limit)


@router.get("/{employee_id}", response_model=EmployeeOut)
def get_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = crud.get_employee(db, employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee


@router.put(
    "/{employee_id}",
    response_model=EmployeeOut,
    dependencies=[Depends(get_current_admin)],
)
def update_employee(employee_id: int, payload: EmployeeUpdate, db: Session = Depends(get_db)):
    employee = crud.update_employee(db, employee_id, payload)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee


@router.delete(
    "/{employee_id}",
    status_code=204,
    dependencies=[Depends(get_current_admin)],
)
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_employee(db, employee_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Employee not found")