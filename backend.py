from flask import Flask, jsonify, request, session, make_response, render_template, redirect, url_for
from flask_session import Session
from flask_login import LoginManager, UserMixin, login_user, current_user
from flask_cors import CORS, cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
import flask_sqlalchemy as sqlalchemy

import datetime

app = Flask(__name__)
app.secret_key = 'test'
app.config['SECRET_KEY'] = b'_5#y2L"F4Q8z\n\xec]/'
app.config['SESSION_TYPE'] = 'redis'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sqlalchemy-demo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'
db = sqlalchemy.SQLAlchemy(app)

cors = CORS(app)

class Student(db.Model):
	id = db.Column(db.Integer, nullable=False, primary_key=True)
	studentId = db.Column(db.Integer, nullable=False)
	firstName = db.Column(db.String(128), nullable=False)
	lastName = db.Column(db.String(128), nullable=False)
	email = db.Column(db.String(128), nullable=False)
	major = db.Column(db.String(128), nullable=False)
	gpa = db.Column(db.String(128), nullable=False)
	graduationDate = db.Column(db.String(128), nullable=False)
	passwordHash = db.Column(db.String(255), nullable=False)


class Instructor(db.Model):
	id = db.Column(db.Integer, nullable=False, primary_key=True)
	facultyId = db.Column(db.Integer, nullable=False)
	firstName = db.Column(db.String(128), nullable=False)
	lastName = db.Column(db.String(128), nullable=False)
	email = db.Column(db.String(128), nullable=False)
	phone = db.Column(db.String(128), nullable=False)
	office = db.Column(db.String(128), nullable=False)
	passwordHash = db.Column(db.String(255), nullable=False)

class Class(db.Model):
	id = db.Column(db.Integer, nullable=False, primary_key=True)
	courseName = db.Column(db.String(64), nullable=False)
	title = db.Column(db.String(64), nullable=False)
	description = db.Column(db.String(4096), nullable=False)
	instructor = db.Column(db.String(128), nullable=False)

@app.route('/api/student', methods=['POST'])
def createStudent():
	payload = request.get_json()

	student = Student()

	student.studentId = payload['studentId']
	student.firstName = payload['firstName']
	student.lastName = payload['lastName']
	student.email = payload['email']
	student.major = payload['major']
	student.gpa = payload['gpa']
	student.graduationDate = payload['graduationDate']

	student.passwordHash = generate_password_hash(payload['password'])

	print(check_password_hash(student.passwordHash, payload['password']))
	print(student.email)
	print(payload['password'])
	
	db.session.add(student)
	db.session.commit()

	db.session.refresh(student)

	return jsonify({"status": 1, "student": row_to_obj_student(student)}), 200

@app.route('/api/addcourse', methods=['POST'])
def addCourse():
	payload = request.get_json()

	if(session['userType'] != 'instructor'):
		return jsonify({"status": -1}), 401

	course = Class()

	course.courseName = payload['courseName']
	course.title = payload['title']
	course.description = payload['description']
	course.instructor = Instructor.query.filter_by(id=session['userId']).first().lastName
	course.instructor += " ," + Instructor.query.filter_by(id=session['userId']).first().firstName

	db.session.add(course)
	db.session.commit()

	db.session.refresh(course)

	return jsonify({"status": 1, "class": row_to_obj_class(course)}), 200

@app.route('/api/courses', methods=['GET'])
def getCourses():

	query = Class.query.all()

	result = []
	for row in query:
		result.append(
			row_to_obj_class(row)
            )


	return jsonify({"status": 1, "courses": result})

@app.route('/api/logout', methods=['GET'])
def logout():
	session.pop('userId')
	session.pop('userType')
	return jsonify({"status": 1}), 200

@app.route('/api/instructor', methods=['POST'])
def createInstructor():

	payload = request.get_json()

	instructor = Instructor()

	instructor.facultyId = payload['facultyId']
	instructor.firstName = payload['firstName']
	instructor.lastName = payload['lastName']
	instructor.email = payload['email']
	instructor.phone = payload['phone']
	instructor.office = payload['office']
	print(instructor.email)
	
	instructor.passwordHash = generate_password_hash(payload['password'])


	db.session.add(instructor);
	db.session.commit();

	db.session.refresh(instructor);

	return jsonify({"status": 1, "instructor": row_to_obj_instructor(instructor)}), 200


@app.after_request
def after_request(response):
	header = response.headers
	header['Access-Control-Allow-Credentials'] = 'true'
	return response

@app.route('/api/login', methods=['GET', 'POST'])
def login():

	payload = request.get_json()

	if(payload['userType'] == 'student'):
		user = Student.query.filter_by(email=payload['username']).first()
	else:
		user = Instructor.query.filter_by(email=payload['username']).first()
	
	if user is None:
		return jsonify({"status": -1}), 401

	if not check_password_hash(user.passwordHash, payload['password']):
		return jsonify({"status": -2}), 401



	session['userId'] = user.id
	session['userType'] = payload['userType']

	return jsonify(1)

@app.route('/api/profile', methods=['GET'])
def getSessionProfile():

	if 'userType' not in session and 'userId' not in session:
		return jsonify({"status": -1}), 200

	if(session['userType'] == 'student'):
		user = Student.query.filter_by(id=session['userId']).first()
		return jsonify({"status": 1, "type": "student", "student": row_to_obj_student(user)}), 200
	else:
		user = Instructor.query.filter_by(id=session['userId']).first()
		return jsonify({"status": 1, "type": "instructor", "instructor": row_to_obj_instructor(user)}), 200

@app.route('/api/change_password', methods=['POST'])
def changePassword():

	payload = request.get_json()

	if(session['userType'] == 'student'):
		user = Student.query.filter_by(id=session['userId']).first()
	else:
		user = Instructor.query.filter_by(id=session['userId']).first()

	if not check_password_hash(user.passwordHash, payload['password']):
		return jsonify({"status": -1, "reason": "incorrect_password"}), 401

	if not payload['newPassword'] == payload['confirmNewPassword']:
		return jsonify({"status": -1, "reason": "passwords_not_match"}), 404

	user.passwordHash = generate_password_hash(payload['newPassword'])

	db.session.commit();
	return jsonify({"status": 1}), 200




@app.route('/api/edit_student', methods=['POST'])
def editStudent():
	row = Student.query.filter_by(id=session['userId']).first()
	payload = request.get_json();


	if(payload['email'] != ""):
		row.email = payload['email']
	if(payload['major'] != ""):
		row.major = payload['major']
	if(payload['gpa'] != ""):
		row.gpa = payload['gpa']
	if(payload['graduationDate'] != ""):
		row.graduationDate = payload['graduationDate']

	db.session.commit()

	return jsonify({"status": 1, "student": row_to_obj_student(row)})

@app.route('/api/edit_instructor', methods=['POST'])
def editInstructor():
	row = Instructor.query.filter_by(id=session['userId']).first()
	payload = request.get_json();

	if(payload['email'] != ""):
		row.email = payload['email']
	if(payload['office'] != ""):
		row.office = payload['office']
	if(payload['phone'] != ""):
		row.phone = payload['phone']

	db.session.commit();

	return jsonify({"status": 1, "instructor": row_to_obj_instructor(row)});




def row_to_obj_class(row):
	row = {
			"id": row.id,
			"course_name": row.courseName,
			"title": row.title,
			"description": row.description,
			"instructor": row.instructor
		}

	return row


def row_to_obj_student(row):
    row = {
            "id": row.id,
            "first_name": row.firstName,
            "last_name": row.lastName,
            "email": row.email,
            "major": row.major,
            "gpa": row.gpa,
            "graduation_date": row.graduationDate,
            "student_id": row.studentId,
            "password_hash": row.passwordHash
        }

    return row

def row_to_obj_instructor(row):
    row = {
            "id": row.id,
            "first_name": row.firstName,
            "faculty_id": row.facultyId,
            "last_name": row.lastName,
            "email": row.email,
            "phone": row.phone,
            "office": row.office,
            "password_hash": row.passwordHash
        }

    return row

def main():
	db.create_all()
	app.run()     

if __name__ == '__main__':
    main()


@app.route('/test', methods=['GET'])
def test():
	session['test'] = "hello"
	return 'session set'

@app.route('/test1', methods=['GET'])
def test1():
	return session['test']