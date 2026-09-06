from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.salesman import Salesman
from app.schemas.salesman import SalesmanCreate


def search_salesmen(db: Session, q: str = "", limit: int = 10) -> list[Salesman]:
    query = db.query(Salesman)
    if q:
        pattern = f"%{q}%"
        query = query.filter(
            or_(Salesman.salesman_code.ilike(pattern), Salesman.salesman_name.ilike(pattern))
        )
    return query.order_by(Salesman.salesman_code).limit(limit).all()


def create_salesman(db: Session, data: SalesmanCreate) -> Salesman:
    salesman = Salesman(**data.model_dump())
    db.add(salesman)
    db.commit()
    db.refresh(salesman)
    return salesman
