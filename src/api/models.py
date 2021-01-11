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
    Professional = 5 
    Association = 6
    

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())
    deleted_at = db.Column(db.DateTime) 
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(120))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    avatar = db.Column(db.String(255))

    diseases = db.relationship("Diseases")
    posts = db.relationship("Posts")
    # donations = db.relationship("Donations")


    def __str__(self):
        return '{} <{}>' .format(self.username, self.email)
    

    def serialize(self):
        return {
            "id": self.id,
            "created_at": self.created_at,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "username": self.username,
            "avatar": self.avatar, 
            # "password": self.password 
            # al probar en insomnia me daba error porque es campo nullable = False
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
    # donations = db.relationship("Donations")


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
            # "owner_nickname": self.owner.username esto da problemas. 
            ## Además, creí que ayer lo cambiamos a:
            ## "owner" : self.owner.serialize()
            ## aunque lo he probado pero tampoco funciono.
        }
    

class Posts(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    publisher_id = db.Column(db.Integer, ForeignKey('users.id')) # cuidado con el tipo de dato que tiene para el cuerpo de la peticion
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
        return '{}: {}' .format(self.publisher.username, self.text)
    

    def serialize(self):
        list_comments = []
        for comment in self.comments:
            list_comments.append(comment.serialize())

        return {
            "id": self.id,
            "created_at": self.created_at,
            "publisher": self.publisher.username,
            "publisher_email": self.publisher.email,
            "text": self.text,
            "imagen": self.imagen,
            "disease_name": self.disease.title,
            "comments": list_comments
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
        return 'Sobre el post {} el usuario {} ha comentado: {}' .format(self.post.text, self.user.username, self.text)
    

    def serialize(self):
        return {
            "id": self.id,
            "created_at": self.created_at,
            "user": self.user.username,
            "user_email": self.user.email,
            "text": self.text,
            # "disease_name": self.post.disease.title,
        }


# class Donations(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
#     disease_id = db.Column(db.Integer, ForeignKey('diseases.id'), nullable=False)
#     created_at = db.Column(db.DateTime, server_default=func.now())
#     updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())
#     deleted_at = db.Column(db.DateTime) 
#     amount = db.Column(db.Integer, nullable=False)
#     currency = db.Column(db.String(3), nullable=False)

#     user = db.relationship("Users")
#     disease = db.relationship("Diseases")

#     def __str__(self):
#         return 'El usuario {} dona a {} la cantidad de {} {}' .format(self.user.username, self.disease.title, self.amount, self.currency)

#     def serialize(self):
#         return {
#             "id": self.id,
#             "created_at": self.created_at,
#             "user": self.user.serialize(),
#             "disease": self.disease.serialize(),
#             "amount": self.amount,
#             "currency": self.currency
#         }

class Associations(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    # disease_id = db.Column(db.Integer, ForeignKey('diseases.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())
    deleted_at = db.Column(db.DateTime) 
    association_name = db.Column(db.String(255))
    location = db.Column(db.String(80))
    description = db.Column(db.Text)
    data_donation_IBAN = db.Column(db.String(255))
    data_donation_bizum = db.Column(db.String(255))

    # user = db.relationship("Users")
    # disease = db.relationship("Diseases")

    def __str__(self):
        return 'Asociacion {}' .format(self.association_name)

    def serialize(self):
        return {
            "id": self.id,
            "created_at": self.created_at,
            "name": self.association_name,
            "location": self.location,
            "description": self.description,
            "IBAN": self.data_donation_IBAN,
            "bizum": self.data_donation_bizum
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
        return 'El usuario {} sigue a la enfermedad {}' .format(self.user.username, self.disease.title)

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
        return 'El usuario {} tiene el rol {} de la enfermedad {}' .format(self.user.username, self.role, self.disease.title)

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.serialize(),
            "disease": self.disease.serialize(),
            "role": self.role
        }
