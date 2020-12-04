from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
# ForeignKey('users.id')

db = SQLAlchemy()

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    deteled_at = db.Column(db.DateTime)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(120))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    nickname = db.Column(db.String(120), unique=True, nullable=False)
    avatar = db.Column(db.String(255))

    diseases = db.relationship("Diseases")
    posts = db.relationship("Posts")
    donations = db.relationship("Donations")


class Diseases(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    deteled_at = db.Column(db.DateTime)
    owner_id = db.Column(db.Integer, ForeignKey('users.id')) 
    scientific_name = db.Column(db.String(255), nullable=False) 
    slug = db.Column(db.String(255), unique=True, nullable=False)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)

    owner = db.relationship("Users")
    posts = db.relationship("Posts")
    donations = db.relationship("Donations")
    

class Posts(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    publisher_id = db.Column(db.Integer, ForeignKey('users.id'))
    disease_id = db.Column(db.Integer, ForeignKey('diseases.id'))
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    deteled_at = db.Column(db.DateTime)
    text = db.Column(db.Text, nullable=False) 
    imagen = db.Column(db.String(255), nullable=True)

    publisher = db.relationship("Users")
    disease = db.relationship("Diseases")
    comments = db.relationship("Comments")


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer,ForeignKey('posts.id'))
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    deteled_at = db.Column(db.DateTime)
    text = db.Column(db.Text, nullable=False)

    post = db.relationship("Posts")
    user = db.relationship("Users")


class Donations(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    disease_id = db.Column(db.Integer, ForeignKey('diseases.id'))
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    deteled_at = db.Column(db.DateTime)
    amount = db.Column(db.Integer, nullable=False)
    currency = db.Column(db.String(3), nullable=False)

    user = db.relationship("Users")
    disease = db.relationship("Diseases")


class Follows(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    disease_id = db.Column(db.Integer, ForeignKey('diseases.id'))
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    deteled_at = db.Column(db.DateTime)

    user = db.relationship("Users")
    disease = db.relationship("Diseases")


class Relationships(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    disease_id = db.Column(db.Integer, ForeignKey('diseases.id'))
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    deteled_at = db.Column(db.DateTime)
    role = db.Column(db.String(80), nullable=False)

    user = db.relationship("Users")
    disease = db.relationship("Diseases")
