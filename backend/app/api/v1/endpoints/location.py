from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.crud import location as crud
from app.schemas.location import LocationCreate, LocationOut

router = APIRouter()


@router.get("/", response_model=list[LocationOut])
def search_locations(
    q: str = Query("", description="Search by location code or name"),
    limit: int = Query(10, le=50),
    db: Session = Depends(get_db),
):
    return crud.search_locations(db, q=q, limit=limit)


@router.post("/", response_model=LocationOut, status_code=201)
def create_location(payload: LocationCreate, db: Session = Depends(get_db)):
    return crud.create_location(db, payload)
