"""
Create an admin user for the admin panel login.

Usage (from the backend/ folder):
    uv run python scripts/create_admin.py
"""
import getpass
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.core.database import SessionLocal
from app.core.security import hash_password
from app.crud.admin_user import get_admin_by_username
from app.models.admin_user import AdminUser


def main():
    username = input("Admin username: ").strip()
    if not username:
        print("Username cannot be empty.")
        return

    password = getpass.getpass("Admin password: ")
    if len(password) < 8:
        print("Password should be at least 8 characters.")
        return

    db = SessionLocal()
    try:
        if get_admin_by_username(db, username):
            print(f"An admin with username '{username}' already exists.")
            return

        admin = AdminUser(username=username, hashed_password=hash_password(password))
        db.add(admin)
        db.commit()
        print(f"Admin user '{username}' created.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
