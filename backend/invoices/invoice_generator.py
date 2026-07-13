from reportlab.pdfgen import canvas
from datetime import datetime
import os

def generate_invoice_pdf(invoice_data):

    folder = "invoices"

    if not os.path.exists(folder):
        os.makedirs(folder)

    filename = f"{folder}/invoice_{invoice_data['id']}.pdf"

    pdf = canvas.Canvas(filename)

    # Company Name
    pdf.setFont("Helvetica-Bold", 24)
    pdf.drawString(170, 810, "Freelancer CRM")

    # Invoice Title
    pdf.setFont("Helvetica-Bold", 20)
    pdf.drawString(180, 780, "Freelancer Invoice")

    # Date
    pdf.setFont("Helvetica", 12)
    pdf.drawString(100, 740, f"Date : {datetime.now().strftime('%d-%m-%Y')}")

    # Line
    pdf.line(100, 730, 500, 730)

    pdf.setFont("Helvetica", 13)

    pdf.drawString(100, 700, f"Invoice ID : {invoice_data['id']}")
    pdf.drawString(100, 670, f"Client Name : {invoice_data['client_name']}")
    pdf.drawString(100, 640, f"Project Name : {invoice_data['project_name']}")
    pdf.drawString(100, 610, f"Total Hours : {invoice_data['total_hours']}")
    pdf.drawString(100, 580, f"Hourly Rate : Rs {invoice_data['hourly_rate']}")
    pdf.drawString(100, 550, f"Total Amount : Rs {invoice_data['total_amount']}")

    pdf.save()

    return filename