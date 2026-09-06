from sqlalchemy import Column, Integer, String

from app.core.database import Base


class Location(Base):
    __tablename__ = "location"

    location_id = Column(Integer, primary_key=True, index=True)
    location_code = Column(String, nullable=False, unique=True, index=True)
    location_name = Column(String, nullable=False)
