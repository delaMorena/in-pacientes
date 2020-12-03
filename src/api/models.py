from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
# ForeignKey('users.id')

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.timestamp)
    updated_at = db.Column(db.timestamp)
    deteled_at = db.Column(db.timestamp, nullable=True)
    avatar = db.Column(db.string, nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    nick_name = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=True)

class Diseases(db.Model):
    __tablename__ = 'diseases'
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.timestamp)
    updated_at = db.Column(db.timestamp)
    deteled_at = db.Column(db.timestamp, nullable=True) 
    owner_id =  db.Column(db.Integer, ForeignKey('users.id')) 
    scientific_name = db.Column(db.String(320), unique=True, nullable=False) 
    title = db.Column(db.String(220), unique=True, nullable=False)
    description = db.Column(db.String(1000), unique=True, nullable=False)
    slug = db.Column(db.String(320), unique=True, nullable=False)
    diseases = relationship(Users)

class Posts(db.Model): 
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.timestamp)
    updated_at = db.Column(db.timestamp)
    deteled_at = db.Column(db.timestamp, nullable=True)
    publisher_id = db.Column(db.Integer, ForeignKey('users.id'))
    posts = relationship(Users)
    disease_id = db.Column(db.Integer, ForeignKey('diseases.id'))
    posts = relationship(Diseases)
    text = db.Column(db.String(1000), nullable=False) 
    imagen_url = db.Column(db.String(1000), nullable=True)
    # posts = relationship(Users, Diseases)

class Comments(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.timestamp)
    updated_at = db.Column(db.timestamp)
    deteled_at = db.Column(db.timestamp, nullable=True)
    post_id = db.Column(db.Integer,ForeignKey('posts.id'))
    comments = relationship(Posts)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    comments = relationship(Users)
    text = db.Column(db.String(1000), unique=False, nullable=False)

class Donations(db.Model):
    __tablename__ = 'donations'
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    donations = relationship(Users)
    disease_id = db.Column(db.Integer, ForeignKey('diseases.id'))
    donations = relationship(Diseases)
    created_at = db.Column(db.timestamp)
    updated_at = db.Column(db.timestamp)
    deteled_at = db.Column(db.timestamp, nullable=True)
    quantity = db.Column(db.integer, nullable = False)
    currency = db.Column(db.integer, nullable = False)

class Follows(db.Model):
    __tablename__ = 'follows'
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    follows = relationship(Users)
    disease_id = db.Column(db.Integer, ForeignKey('diseases.id'))
    follows = relationship(Diseases)
    created_at = db.Column(db.timestamp)
    updated_at = db.Column(db.timestamp)
    deteled_at = db.Column(db.timestamp, nullable=True)

class Relationships(db.Model):
    __tablename__ = 'relationships'
    created_at = db.Column(db.timestamp)
    updated_at = db.Column(db.timestamp)
    deteled_at = db.Column(db.timestamp, nullable=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    relationships = relationship(Users)
    disease_id = db.Column(db.Integer, ForeignKey('diseases.id'))
    relationships = relationship(Diseases)
    type = db.Column(db.String(80), nullable=False)


    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }