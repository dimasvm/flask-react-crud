from flask import Flask, request, Response, jsonify
from flask_sqlalchemy import SQLAlchemy

from flask_cors import CORS

# creating an instance of the flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost:3306/football_school'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app, support_credentials=True)
