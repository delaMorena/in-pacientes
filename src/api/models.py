from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from sqlalchemy.sql import func

db = SQLAlchemy()

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
        return '{}:{}' .format(self.nickname, self.email)
    

    def serialize(self):
        return {
            "id": self.id,
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
            "title": self.title,
            "slug": self.slug,
            "owner_nickname": self.owner.nickname,
            "donations": self.donations.amount,
            "currency": self.donations.currency,
            "description": self.description
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
            "publisher": self.publisher.nickname,
            "publisher_email": self.publisher.nickname,
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
        return '{}: {}' .format(self.post.text, self.text)
    

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.nickname,
            "user_email": self.user.nickname,
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


class Follows(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    disease_id = db.Column(db.Integer, ForeignKey('diseases.id'))
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())
    deleted_at = db.Column(db.DateTime) 

    user = db.relationship("Users")
    disease = db.relationship("Diseases")


class Relationships(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    disease_id = db.Column(db.Integer, ForeignKey('diseases.id'))
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())
    deleted_at = db.Column(db.DateTime)
    role = db.Column(db.String(80), nullable=False)

    user = db.relationship("Users")
    disease = db.relationship("Diseases")
