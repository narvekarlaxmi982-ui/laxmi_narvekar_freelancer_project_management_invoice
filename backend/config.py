import os

SQLALCHEMY_DATABASE_URI = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres.sxwrwtppccxvxvwrbebu:laxmi8767750@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"
)

SQLALCHEMY_TRACK_MODIFICATIONS = False