from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from sqlalchemy.sql import func

import enum

db = SQLAlchemy()

class Roles(enum.Enum):
    Pacient = 1
    Researcher = 2
    Doctor = 3
    Relative = 4
    

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())
    deleted_at = db.Column(db.DateTime) 
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(120))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    nickname = db.Column(db.String(120), unique=True, nullable=False)
    avatar = db.Column(db.String(255))

    diseases = db.relationship("Diseases")
    posts = db.relationship("Posts")
    donations = db.relationship("Donations")


    def __str__(self):
        return '{} <{}>' .format(self.nickname, self.email)
    

    def serialize(self):
        return {
            "id": self.id,
            "created_at": self.created_at,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "nickname": self.nickname,
            "avatar": self.avatar   
        }


class Diseases(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())
    deleted_at = db.Column(db.DateTime) 
    owner_id = db.Column(db.Integer, ForeignKey('users.id')) 
    scientific_name = db.Column(db.String(255), nullable=False) 
    slug = db.Column(db.String(255), unique=True, nullable=False)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)

    owner = db.relationship("Users")
    posts = db.relationship("Posts")
    donations = db.relationship("Donations")


    def __str__(self):
            return '{}: {}' .format(self.title, self.description)
        

    def serialize(self):
        return {
            "id": self.id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "title": self.title,
            "scientific_name": self.scientific_name,
            "description": self.description,
            "slug": self.slug,
            # "owner_nickname": self.owner.nickname esto da problemas. 
            ## Además, creí que ayer lo cambiamos a:
            ## "owner" : self.serialize()
            ## aunque lo he probado pero tampoco funciono.
        }
    

class Posts(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    publisher_id = db.Column(db.Integer, ForeignKey('users.id'))
    disease_id = db.Column(db.Integer, ForeignKey('diseases.id'))
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())
    deleted_at = db.Column(db.DateTime) 
    text = db.Column(db.Text, nullable=False) 
    imagen = db.Column(db.String(255), nullable=True)

    publisher = db.relationship("Users")
    disease = db.relationship("Diseases")
    comments = db.relationship("Comments")


    def __str__(self):
        return '{}: {}' .format(self.publisher.nickname, self.text)
    

    def serialize(self):
        return {
            "id": self.id,
            "created_at": self.created_at,
            "publisher": self.publisher.nickname,
            "publisher_email": self.publisher.email,
            "text": self.text,
            "imagen": self.imagen
        }


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer,ForeignKey('posts.id'))
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())
    deleted_at = db.Column(db.DateTime) 
    text = db.Column(db.Text, nullable=False)

    post = db.relationship("Posts")
    user = db.relationship("Users")


    def __str__(self):
        return 'Sobre el post {} el usuario {} ha comentado: {}' .format(self.post.text, self.user.nickname, self.text)
    

    def serialize(self):
        return {
            "id": self.id,
            "created_at": self.created_at,
            "user": self.user.nickname,
            "user_email": self.user.email,
            "text": self.text
        }


class Donations(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    disease_id = db.Column(db.Integer, ForeignKey('diseases.id'))
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())
    deleted_at = db.Column(db.DateTime) 
    amount = db.Column(db.Integer, nullable=False)
    currency = db.Column(db.String(3), nullable=False)

    user = db.relationship("Users")
    disease = db.relationship("Diseases")

    def __str__(self):
        return 'El usuario {} dona a {} la cantidad de {} {}' .format(self.user.nickname, self.disease.title, self.amount, self.currency)

    def serialize(self):
        return {
            "id": self.id,
            "created_at": self.created_at,
            "user": self.user.serialize(),
            "disease": self.disease.serialize(),
            "amount": self.amount,
            "currency": self.currency
        }



class Follows(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    disease_id = db.Column(db.Integer, ForeignKey('diseases.id'))
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())
    deleted_at = db.Column(db.DateTime) 

    user = db.relationship("Users")
    disease = db.relationship("Diseases")

    def __str__(self):
        return 'El usuario {} sigue a la enfermedad {}' .format(self.user.nickname, self.disease.title)

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.serialize(),
            "disease": self.disease.serialize(),
        }


class Relationships(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    disease_id = db.Column(db.Integer, ForeignKey('diseases.id'))
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())
    deleted_at = db.Column(db.DateTime)
    role = db.Column(db.Enum(Roles), nullable=False)

    user = db.relationship("Users")
    disease = db.relationship("Diseases")

    def __str__(self):
        return 'El usuario {} tiene el rol {} de la enfermedad {}' .format(self.user.nickname, self.role, self.disease.title)

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.serialize(),
            "disease": self.disease.serialize(),
            "role": self.role
        }
