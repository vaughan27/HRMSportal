from fastapi import APIRouter

from app.api.v1.endpoints import lead_enquiry

api_router = APIRouter()

api_router.include_router(lead_enquiry.router, prefix="/lead-enquiries", tags=["lead-enquiries"])

# As more pages are built, register their routers here, e.g.:
# from app.api.v1.endpoints import employees
# api_router.include_router(employees.router, prefix="/employees", tags=["employees"])
