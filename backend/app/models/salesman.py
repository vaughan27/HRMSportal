from sqlalchemy import Column, Integer, String

from app.core.database import Base


class Salesman(Base):
    __tablename__ = "salesman"

    salesman_id = Column(Integer, primary_key=True, index=True)
    salesman_code = Column(String, nullable=False, unique=True, index=True)
    salesman_name = Column(String, nullable=False)
