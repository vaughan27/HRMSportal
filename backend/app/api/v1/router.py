from fastapi import APIRouter

from app.api.v1.endpoints import admin_reports, auth, lead_enquiry, location, salesman, employee

api_router = APIRouter()

api_router.include_router(lead_enquiry.router, prefix="/lead-enquiries", tags=["lead-enquiries"])
api_router.include_router(location.router, prefix="/locations", tags=["locations"])
api_router.include_router(salesman.router, prefix="/salesmen", tags=["salesmen"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(admin_reports.router, prefix="/admin", tags=["admin"])
api_router.include_router(employee.router, prefix="/employees", tags=["employees"])

# As more pages are built, register their routers here, e.g.:
# from app.api.v1.endpoints import employees
# api_router.include_router(employees.router, prefix="/employees", tags=["employees"])
