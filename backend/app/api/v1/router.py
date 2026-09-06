from fastapi import APIRouter

from app.api.v1.endpoints import lead_enquiry, location, salesman

api_router = APIRouter()

api_router.include_router(lead_enquiry.router, prefix="/lead-enquiries", tags=["lead-enquiries"])
api_router.include_router(location.router, prefix="/locations", tags=["locations"])
api_router.include_router(salesman.router, prefix="/salesmen", tags=["salesmen"])

# As more pages are built, register their routers here, e.g.:
# from app.api.v1.endpoints import employees
# api_router.include_router(employees.router, prefix="/employees", tags=["employees"])
