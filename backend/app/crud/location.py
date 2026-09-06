from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.location import Location
from app.schemas.location import LocationCreate


def search_locations(db: Session, q: str = "", limit: int = 10) -> list[Location]:
    query = db.query(Location)
    if q:
        pattern = f"%{q}%"
        query = query.filter(
            or_(Location.location_code.ilike(pattern), Location.location_name.ilike(pattern))
        )
    return query.order_by(Location.location_code).limit(limit).all()


def create_location(db: Session, data: LocationCreate) -> Location:
    location = Location(**data.model_dump())
    db.add(location)
    db.commit()
    db.refresh(location)
    return location
