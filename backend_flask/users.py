from settings import *
import json
from flask_marshmallow import Marshmallow
from user_schema import user_schema
from marshmallow import ValidationError

# Initializing our database
db = SQLAlchemy(app)
ma = Marshmallow(app)


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    birth = db.Column(db.String, nullable=False)
    height = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    parent_income = db.Column(db.Integer)

    def json(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'address': self.address,
            'birth': self.birth,
            'height': self.height,
            'weight': self.weight,
            'parent_income': self.parent_income
        }

    def add_user(data):
        new_user = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            address=data['address'],
            birth=data['birth'],
            height=data['height'],
            weight=data['weight'],
            parent_income=data['parent_income']
        )

        db.session.add(new_user)
        db.session.commit()

    def get_all_users():
        return [User.json(user) for user in User.query.all()]

    def get_user(_id):
        return User.json(User.query.filter_by(id=_id).first())

    def update_user(data):
        user_to_update = User.query.filter_by(id=data['id']).first()
        user_to_update.first_name = data['first_name']
        user_to_update.last_name = data['last_name']
        user_to_update.address = data['address']
        user_to_update.birth = data['birth']
        user_to_update.height = data['height']
        user_to_update.weight = data['weight']
        user_to_update.parent_income = data['parent_income']
        db.session.commit()

    def delete_user(_id):
        User.query.filter_by(id=_id).delete()
        db.session.commit()


db.create_all()
