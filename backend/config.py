import os

SQLALCHEMY_DATABASE_URI = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:laxmi%4026040@db.sxwrwtppccxvxvwrbebu.supabase.co:5432/postgres?sslmode=require"
)

SQLALCHEMY_TRACK_MODIFICATIONS = False