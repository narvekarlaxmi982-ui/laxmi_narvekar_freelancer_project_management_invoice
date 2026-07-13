from extensions import db


# USER MODEL
class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))


# PROJECT MODEL
class Project(db.Model):

    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    description = db.Column(db.Text)
    status = db.Column(db.String(50), default="Pending")

    # TIME LOG MODEL
class TimeLog(db.Model):

    __tablename__ = "time_logs"

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer)
    hours = db.Column(db.Float)
    work_description = db.Column(db.Text)
    
    #MILESTONE MODEL
class Milestones(db.Model):
    __tablename__ = "milestones"

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer)
    title = db.Column(db.String(200))
    status = db.Column(db.String(50), default="Pending")

    # INVOICE MODEL
class Invoice(db.Model):

    __tablename__ = "invoices"

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer)
    total_hours = db.Column(db.Float)
    hourly_rate = db.Column(db.Float)
    total_amount = db.Column(db.Float)