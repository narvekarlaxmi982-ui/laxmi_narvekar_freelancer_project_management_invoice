from flask_cors import CORS
from flask import Flask, request, jsonify, send_file
from extensions import db
from models import User, Project, TimeLog, Milestones, Invoice
from invoices.invoice_generator import generate_invoice_pdf
from reportlab.pdfgen import canvas
from flask import jsonify
from models import Invoice
import os
from config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS

app = Flask(__name__)
CORS(app)

# DATABASE CONFIGURATION
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = SQLALCHEMY_TRACK_MODIFICATIONS

# INITIALIZE DATABASE
db.init_app(app)

# HOME ROUTE
@app.route("/")
def home():
    return "Freelancer Project Management Backend Running"


# REGISTER USER API
@app.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    new_user = User(
        name=data["name"],
        email=data["email"],
        password=data["password"]
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully"
    })


# GET ALL USERS API
@app.route("/users", methods=["GET"])
def get_users():

    users = User.query.all()

    user_list = []

    for user in users:
        user_list.append({
            "id": user.id,
            "name": user.name,
            "email": user.email
        })

    return jsonify(user_list)


# LOGIN USER API
@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data["email"]
    password = data["password"]

    user = User.query.filter_by(
        email=email,
        password=password
    ).first()

    if user:
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email
            }
        })

    return jsonify({
        "message": "Invalid email or password"
    }), 401


# CREATE PROJECT API

@app.route("/create-project", methods=["POST"])
def create_project():

    data = request.get_json()

    new_project = Project(
        title=data["title"],
        description=data["description"],
        status=data.get("status","Pending")
    )

    db.session.add(new_project)
    db.session.commit()

    return jsonify({
        "message": "Project created successfully",
        "project": {
            "id": new_project.id,
            "title": new_project.title,
            "description": new_project.description,
            "status": new_project.status
        }
    })
    # GET ALL PROJECTS API
@app.route("/projects", methods=["GET"])
def get_projects():

    projects = Project.query.all()

    project_list = []

    for project in projects:
        project_list.append({
            "id": project.id,
            "title": project.title,
            "description": project.description,
            "status":project.status
        })

    return jsonify(project_list)
# DELETE PROJECT API
@app.route("/delete-project/<int:id>", methods=["DELETE"])
def delete_project(id):

    project = Project.query.get(id)

    if not project:
        return jsonify({
            "message": "Project not found"
        }), 404

    db.session.delete(project)
    db.session.commit()

    return jsonify({
        "message": "Project deleted successfully"
    })
    # UPDATE PROJECT API
@app.route("/update-project/<int:id>", methods=["PUT"])
def update_project(id):
    try:
        print("UPDATE ROUTE HIT")

        project = Project.query.get(id)

        if project is None:
            return jsonify({
                "message": "Project not found"
            }), 404

        data = request.get_json()

        print("Received JSON:", data)

        project.title = data.get("title")
        project.description = data.get("description")
        project.status = data.get("status")

        db.session.commit()

        print("PROJECT UPDATED SUCCESSFULLY")

        return jsonify({
            "message": "Project updated successfully",
            "project": {
                "id": project.id,
                "title": project.title,
                "description": project.description,
                "status": project.status
            }
        })

    except Exception as e:
        db.session.rollback()
        import traceback
        traceback.print_exc()

        return jsonify({
            "error": str(e)
        }), 500
    # UPDATE PROJECT STATUS API
@app.route("/update-status/<int:id>", methods=["PUT"])
def update_status(id):

    project = Project.query.get(id)

    if not project:
        return jsonify({
            "message": "Project not found"
        }), 404

    data = request.get_json()

    project.status = data["status"]

    db.session.commit()

    return jsonify({
        "message": "Project status updated successfully",
        "project": {
            "id": project.id,
            "title": project.title,
            "status": project.status
        }
    })
    # ADD TIME LOG API
@app.route("/time-log", methods=["POST"])
def add_time_log():

    data = request.get_json()

    new_time_log = TimeLog(
        project_id=data["project_id"],
        hours=data["hours"],
        work_description=data["work_description"]
    )

    db.session.add(new_time_log)
    db.session.commit()

    return jsonify({
    "message": "Time log added successfully",
    "time_log": {
        "id": new_time_log.id,
        "project_id": new_time_log.project_id,
        "hours": new_time_log.hours,
        "work_description": new_time_log.work_description
    }
})


@app.route("/time-logs", methods=["GET"])
def get_time_logs():

    time_logs = TimeLog.query.all()

    result = []

    for log in time_logs:
        result.append({
            "id": log.id,
            "project_id": log.project_id,
            "hours": log.hours,
            "work_description": log.work_description
        })

    return jsonify(result)


# UPDATE TIME LOG API
@app.route("/update-time-log/<int:id>", methods=["PUT"])
def update_time_log(id):

    time_log = TimeLog.query.get(id)

    if not time_log:
        return jsonify({
            "message": "Time log not found"
        }), 404

    data = request.get_json()

    time_log.hours = data["hours"]
    time_log.work_description = data["work_description"]

    db.session.commit()

    return jsonify({
        "message": "Time log updated successfully",
        "time_log": {
            "id": time_log.id,
            "project_id": time_log.project_id,
            "hours": time_log.hours,
            "work_description": time_log.work_description
        }
    })

   # CREATE MILESTONE API
@app.route("/create-milestone", methods=["POST"])
def create_milestone():

    data = request.get_json()

    new_milestone = Milestones(
        project_id=data["project_id"],
        title=data["title"],
        status=data.get("status", "Pending")
    )

    db.session.add(new_milestone)
    db.session.commit()

    return jsonify({
        "message": "Milestone created successfully",
        "milestone": {
            "id": new_milestone.id,
            "project_id": new_milestone.project_id,
            "title": new_milestone.title,
            "status": new_milestone.status
        }
    })

# GET ALL MILESTONES API
@app.route("/milestones", methods=["GET"])
def get_milestones():

    milestones = Milestones.query.all()
    result = []

    for milestone in milestones:
        result.append({
            "id": milestone.id,
            "project_id": milestone.project_id,
            "title": milestone.title,
            "status": milestone.status
        })
    print(result)  
    return jsonify(result)
    # UPDATE MILESTONE API
@app.route("/update-milestone/<int:id>", methods=["PUT"])
def update_milestone(id):

    milestone = Milestones.query.get(id)

    if not milestone:
        return jsonify({
            "message": "Milestone not found"
        }), 404

    data = request.get_json()

    milestone.title = data["title"]
    milestone.status = data["status"]

    db.session.commit()

    return jsonify({
        "message": "Milestone updated successfully",
        "milestone": {
            "id": milestone.id,
            "project_id": milestone.project_id,
            "title": milestone.title,
            "status": milestone.status
        }
    })

    # DELETE MILESTONE API
@app.route("/delete-milestone/<int:id>", methods=["DELETE"])
def delete_milestone(id):

    milestone = Milestones.query.get(id)

    if milestone is None:
        return jsonify({
            "message": "Milestone not found"
        }), 404

    db.session.delete(milestone)
    db.session.commit()

    return jsonify({
        "message": "Milestone deleted successfully"
    })
# INVOICE
@app.route("/generate-invoice", methods=["POST"])
def generate_invoice():

    data = request.get_json()
    print(data)

    project_id = int(data["project_id"])
    hourly_rate = float(data["hourly_rate"])

    time_logs = TimeLog.query.filter_by(project_id=project_id).all()

    total_hours = 0

    for log in time_logs:
        total_hours += log.hours

    total_amount = total_hours * hourly_rate

    new_invoice = Invoice(
        project_id=project_id,
        total_hours=total_hours,
        hourly_rate=hourly_rate,
        total_amount=total_amount
    )

    db.session.add(new_invoice)
    db.session.commit()

    project = Project.query.get(project_id)

    invoice_data = {
        "id": new_invoice.id,
        "client_name": data["client_name"],
        "project_name": project.title,
        "total_hours": total_hours,
        "hourly_rate": hourly_rate,
        "total_amount": total_amount
    }

    pdf_file = generate_invoice_pdf(invoice_data)

    return jsonify({
        "message": "Invoice generated successfully",
        "pdf_file": pdf_file,
        "invoice": invoice_data
    })

@app.route("/invoices", methods=["GET"])
def get_invoices():

    invoices = Invoice.query.all()

    invoice_list = []

    for invoice in invoices:
        invoice_list.append({
            "id": invoice.id,
            "project_id": invoice.project_id,
            "total_hours": invoice.total_hours,
            "hourly_rate": invoice.hourly_rate,
            "total_amount": invoice.total_amount,
        })

    return jsonify(invoice_list)

#download
@app.route("/download-invoice/<filename>", methods=["GET"])
def download_invoice(filename):

    file_path = os.path.join("invoices", filename)

    return send_file(file_path, as_attachment=True)

# CREATE TABLES
with app.app_context():
    try:
        db.create_all()
        print("✅ Tables created successfully!")
    except Exception as e:
        print("❌ Database Error:")
        print(e)


# RUN APPLICATION
import os

print("Connected Database:")
print(app.config["SQLALCHEMY_DATABASE_URI"])
import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )

