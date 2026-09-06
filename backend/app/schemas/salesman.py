from pydantic import BaseModel, ConfigDict


class SalesmanBase(BaseModel):
    salesman_code: str
    salesman_name: str


class SalesmanCreate(SalesmanBase):
    pass


class SalesmanOut(SalesmanBase):
    model_config = ConfigDict(from_attributes=True)

    salesman_id: int
