from sqlalchemy import Column, Integer, String, DateTime, func

from app.core.database import Base


class AdminUser(Base):
    __tablename__ = "admin_user"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False, unique=True, index=True)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
