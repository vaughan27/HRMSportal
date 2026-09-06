from pydantic import BaseModel, ConfigDict


class LocationBase(BaseModel):
    location_code: str
    location_name: str


class LocationCreate(LocationBase):
    pass


class LocationOut(LocationBase):
    model_config = ConfigDict(from_attributes=True)

    location_id: int
