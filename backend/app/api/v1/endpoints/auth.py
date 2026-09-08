from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import create_access_token, verify_password
from app.crud.admin_user import get_admin_by_username
from app.schemas.auth import LoginRequest, TokenResponse

router = APIRouter()


# @router.post("/login", response_model=TokenResponse)
# def login(payload: LoginRequest, db: Session = Depends(get_db)):
#     admin = get_admin_by_username(db, payload.username)
#     if not admin or not verify_password(payload.password, admin.hashed_password):
#         raise HTTPException(status_code=401, detail="Incorrect username or password")

#     access_token = create_access_token(subject=admin.id)
#     return TokenResponse(access_token=access_token)

@router.post("/login", response_model=TokenResponse)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    admin = get_admin_by_username(db, form_data.username)
    if not admin or not verify_password(
        form_data.password,
        admin.hashed_password,
    ):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
        )

    access_token = create_access_token(subject=admin.id)
    return TokenResponse(
        access_token=access_token
    )