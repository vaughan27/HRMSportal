from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.crud import salesman as crud
from app.schemas.salesman import SalesmanCreate, SalesmanOut

router = APIRouter()


@router.get("/", response_model=list[SalesmanOut])
def search_salesmen(
    q: str = Query("", description="Search by salesman code or name"),
    limit: int = Query(10, le=50),
    db: Session = Depends(get_db),
):
    return crud.search_salesmen(db, q=q, limit=limit)


@router.post("/", response_model=SalesmanOut, status_code=201)
def create_salesman(payload: SalesmanCreate, db: Session = Depends(get_db)):
    return crud.create_salesman(db, payload)
