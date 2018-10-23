from flask import Flask, jsonify, request
from flask_cors import CORS
import flask_sqlalchemy as sqlalchemy

import datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sqlalchemy-demo.db'

db = sqlalchemy.SQLAlchemy(app)

class Student(db.Model):
	id = db.Column(db.Integer, nullable=False, primary_key=True)
	studentId = db.Column(db.Integer, nullable=False)
	firstName = db.Column(db.String(128), nullable=False)
	lastName = db.Column(db.String(128), nullable=False)
	email = db.Column(db.String(128), nullable=False)
	major = db.Column(db.String(128), nullable=False)
	gpa = db.Column(db.String(128), nullable=False)
	graduationDate = db.Column(db.String(128), nullable=False)
	password = db.Column(db.String(128), nullable=False)

class Instructor(db.Model):
	id = db.Column(db.Integer, nullable=False, primary_key=True)
	facultyId = db.Column(db.Integer, nullable=False)
	firstName = db.Column(db.String(128), nullable=False)
	lastName = db.Column(db.String(128), nullable=False)
	email = db.Column(db.String(128), nullable=False)
	phone = db.Column(db.String(128), nullable=False)
	office = db.Column(db.String(128), nullable=False)
	password = db.Column(db.String(128), nullable=False)


@app.route('/api/student', methods=['POST'])
def createStudent():
	student = Student(**request.json)
	db.session.add(student);
	db.session.commit();

	db.session.refresh(student);

	return jsonify({"status": 1, "student": row_to_obj_student(student)}), 200





@app.route('/api/student', methods=["OPTIONS"])
def optionsStudent():
	return 200




@app.route('/api/instructor', methods=['POST'])
def createInstructor():
	instructor = Instructor(**request.json)
	db.session.add(instructor);
	db.session.commit();

	db.session.refresh(instructor);

	return jsonify({"status": 1, "instructor": row_to_obj_instructor(instructor)}), 200



@app.route('/api/instructor', methods=["OPTIONS"])
def optionsInstructor():
	return 200

def row_to_obj_student(row):
    row = {
            "id": row.id,
            "first_name": row.firstName,
            "last_name": row.lastName,
            "email": row.email,
            "major": row.major,
            "gpa": row.gpa,
            "graduationDate": row.graduationDate,
            "studentId": row.studentId,
            "password": row.password
        }

    return row

def row_to_obj_instructor(row):
    row = {
            "id": row.id,
            "first_name": row.firstName,
            "last_name": row.lastName,
            "email": row.email,
            "phone": row.phone,
            "office": row.office,
            "password": row.password
        }

    return row

def main():
    db.create_all() # creates the tables you've provided
    app.run()       # runs the Flask application  

if __name__ == '__main__':
    main()