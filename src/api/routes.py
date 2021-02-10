"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import datetime
import hashlib
import hmac
import jwt

from flask import Flask, request, jsonify, url_for, Blueprint, abort
from api.models import db, Users, Diseases, Posts, Comments, Associations, Follows, Favorites
from api.utils import generate_sitemap, APIException


api = Blueprint('api', __name__)

MAC = "QjBWRdMUn8xSenf9xY9bzLemsWqdL28B"
JWT_SECRET = "y4YMFBeBhMMYxGJMpW2L2rpQkJgY7PeW"

def get_one_or_404(model, id):
    row = model.query.filter_by(id=id, deleted_at=None).first()

    if not row:
        abort(404)
        # return "{} not found".format(model), 404 # PENDIENTE DE CONCATENAR EL NOMBRE DE LA TABLA
        
    return jsonify(row.serialize()), 200


def get_all_from_models(model):
    newList = []

    for item in model.query.filter_by(deleted_at=None).all():
        newList.append(item.serialize())

    return jsonify(newList), 200


def authorized_user():
    authorization = request.headers.get('Authorization')

    if not authorization:
        abort(403)

    token = authorization[7:]
    secret = JWT_SECRET.encode('utf-8')
    algo = "HS256"

    payload = jwt.decode(token, secret, algorithms= [algo])
    user = Users.query.filter_by(email=payload["sub"], deleted_at=None).first()

    return user

# def delete_one_from_models(model):
#     row = model.query.filter_by(id=id, deleted_at=None).first()

#     if not row:
#         abort(404)

#     row.deleted_at = datetime.datetime.utcnow()

#     db.session.add(row)
#     db.session.commit()

#     return jsonify(row.serialize()), 200

# NO RECONOCE EL PARAMETRO model COMO UNA CLASE ==> PENDIENTE DE REVISION POR MENTOR

####################################### USERS #######################################

@api.route("/users", methods=["GET"])
def handle_list_all_users():
    
    return get_all_from_models(Users)


@api.route("/users/<int:id>", methods=["GET"])
def handle_get_user(id):
    
    return get_one_or_404(Users, id)

    
@api.route("/users", methods=["POST"])
def handle_create_user():
    payload= request.get_json()

    required = ['email', 'password', 'username']

    types = {
        'email': str, 
        'password': str,
        'username': str
    }

    for key, value in payload.items():
        if key in types and not isinstance(value, types[key]):
            abort(400, f"{key} is not {types[key]}")
    
    for field in required:
        if field not in payload or payload[field] is None:
            abort(400)

    key = MAC.encode('utf-8')
    msg = payload['password'].encode('utf-8')
    algo = hashlib.sha512

    print("password: ", msg)
    payload['password'] = hmac.new(key, msg, algo).hexdigest()
    print("hash: ", payload['password'])

    user = Users(**payload)
    
    db.session.add(user)
    db.session.commit()

    secret = JWT_SECRET.encode('utf-8')
    payload_login = {"sub": payload['email']}
    algo = "HS256"
    token = jwt.encode(payload_login, secret, algorithm=algo)

    # print(payload)
    # print(user.serialize())
    return jsonify({"token": token}), 201

    
    # return jsonify(user.serialize()), 201


@api.route("/test", methods=['GET'])
def test():
    user = authorized_user()

    return jsonify(user.serialize()), 200

@api.route("/login", methods=["POST"]) # no es un GET porque el metodo get no deja pasar nada en el body
def login():
    payload= request.get_json()

    email = payload['email']
    password = payload['password']

    user = Users.query.filter_by(email=email, deleted_at=None).first()

    if not user:
        return "Forbidden", 403

    key = MAC.encode('utf-8')
    msg = payload['password'].encode('utf-8')
    algo = hashlib.sha512

    hashed_password = hmac.new(key, msg, algo).hexdigest()

    if hashed_password != user.password:
        return "Forbidden", 403
    
    secret = JWT_SECRET.encode('utf-8')
    payload = {"sub": user.email}
    algo = "HS256"
    token = jwt.encode(payload, secret, algorithm=algo)

    # print(payload)
    # print(user.serialize())
    return jsonify({"token": token}), 201

@api.route("/users", methods=["PUT"])
def handle_update_user():

    user = authorized_user()

    user.id

    if not user or user.deleted_at is not None:
        return "User not found", 404

    payload = request.get_json()

    if "first_name" in payload:
        user.first_name = payload["first_name"]

    if "last_name" in payload:
        user.last_name = payload["last_name"]

    if "email" in payload:
        user.email = payload["email"]

    if "username" in payload:
        user.username = payload["username"]

    if "avatar" in payload:
        user.avatar = payload["avatar"]

    db.session.add(user)
    db.session.commit()

    return jsonify(user.serialize()), 200


@api.route("/users/<int:id>", methods=["DELETE"])
def handle_delete_user(id):
    user = Users.query.filter_by(id=id, deleted_at=None).first()

    if not user:
        return "User not found", 404

    user.deleted_at = datetime.datetime.utcnow()

    db.session.add(user)
    db.session.commit()

    return jsonify(user.serialize()), 200
    # return delete_one_from_models(Users) 



######################################## Diseases #######################################

@api.route("/diseases", methods=["GET"])
def handle_list_all_diseases():
    
    # user = authorized_user()

    # if not user:
    #     return "User not found", 404

    return get_all_from_models(Diseases)


@api.route("/diseases/<int:id>", methods=["GET"])
def handle_get_disease(id):

    return get_one_or_404(Diseases, id)


@api.route("/diseases", methods= ["POST"])
def handle_create_disease():

    payload = request.get_json()

    required = ['scientific_name', 'title']
    # owner_id required??

    types = {
        'scientific_name': str, 
        'title': str,
    }

    for key, value in payload.items():
        if key in types and not isinstance(value, types[key]):
            abort(400, f"{key} is not {types[key]}")
    
    for field in required:
        if field not in payload or payload[field] is None:
            abort(400)

    disease = Diseases(**payload)

    db.session.add(disease)
    db.session.commit()

    return jsonify(disease.serialize()), 201


@api.route("/diseases/<int:id>", methods=["PUT"])
def handle_update_disease(id):

    disease = Diseases.query.filter_by(id=id, deleted_at=None).first()
    
    if not disease or disease.deleted_at is not None:
        return "disease not found", 404 

    payload = request.get_json()

    # Añadido un if para cada clave del payload
    if "title" in payload:
        disease.title = payload['title']

    if "scientific_name" in payload:
        disease.scientific_name = payload['scientific_name']

    if "description" in payload:
        disease.description = payload['description']

    db.session.add(disease)
    db.session.commit()

    return jsonify(disease.serialize()), 200
    

@api.route("/diseases/<int:id>", methods=["DELETE"])
def handle_delete_disease(id):

    disease = Diseases.query.filter_by(id=id, deleted_at=None).first()

    if not disease:
        return "Disease not found", 404

    disease.deleted_at = datetime.datetime.utcnow()

    db.session.add(disease)
    db.session.commit()

    return jsonify(disease.serialize()), 200
   

######################################## Posts  #######################################

# OBTENER POST QUE CREA UN USUARIO
@api.route("/users/posts", methods=["GET"])
def handle_list_posts_from_user():

    user = authorized_user()

    if not user:
        return "User not found", 404
 
    posts = []

    for post in user.posts:
        posts.append(post.serialize())
        
    posts.sort(key=lambda x: x.get("updated_at"),reverse=True)

    return jsonify(posts), 200

@api.route("/posts/<int:id>", methods=["GET"])
def handle_get_post(id):

    user = authorized_user()

    if not user:
        return "User not authorized", 403

    post = Posts.query.filter_by(id=id, deleted_at=None).first()

    if not post:
        return "Post not found", 404
        
    return jsonify(post.serialize()), 200

# OBTENER POST QUE SE CREAN SOBRE UNA ENFERMEDAD
@api.route("/disease/<int:id>", methods=["GET"])
def handle_list_posts_from_disease(id):

    disease = Diseases.query.filter_by(id=id, deleted_at=None).first()
    posts = []

    if not disease:
        return "Disease not found", 404

    for post in disease.posts:
        posts.append(post.serialize())
        
    posts.sort(key=lambda x: x.get("updated_at"),reverse=True)

    return jsonify(posts), 200

# GENERAR UN POST
@api.route("/posts", methods= ["POST"])
def handle_create_post():

    payload = request.get_json()

    user = authorized_user()

    payload['publisher_id'] = user.id
    required = ['text', 'publisher_id', 'disease_id']
   

    types = {
        'text': str,
        'disease_id': int,
        'imagen': str
    }
    
    for key, value in payload.items():
        if key in types and not isinstance(value, types[key]):
            abort(400, f"{key} is not {types[key]}")
    
    for field in required:
        if field not in payload or payload[field] is None:
            abort(400)

    post = Posts(**payload)

    db.session.add(post)
    db.session.commit()

    return jsonify(post.serialize()), 201
    
# EDITA UN POST, PERO EN NINGUNO DE LOS METODOS GET ANTERIORES SE OBTIENE EL ID PROPIO DEL POST
@api.route("/posts/<int:id>", methods=["PUT"])
def handle_update_post(id):

    post = Posts.query.filter_by(id=id, deleted_at=None).first()

    if not post or post.deleted_at is not None:
        return "post not found", 404 

    payload = request.get_json()

    # Añadido un if para cada clave del payload
    if "text" in payload:
        post.text = payload['text']
    
    if "publisher_id" in payload:
        post.publisher_id = payload['publisher_id']

    if "disease_id" in payload:
        post.disease_id = payload['disease_id']

    db.session.add(post)
    db.session.commit()
    
    return jsonify(post.serialize()), 200


# ELIMINA UN POST, PERO EN NINGUNO DE LOS METODOS GET ANTERIORES SE OBTIENE EL ID PROPIO DEL POST,
@api.route("/posts/<int:id>", methods =["DELETE"])
def handle_delete_post(id):

    post = Posts.query.filter_by(id=id, deleted_at=None).first()

    if not post:
        return "Post not found", 404

    post.deleted_at = datetime.datetime.utcnow()

    db.session.add(post)
    db.session.commit()

    return jsonify(post.serialize()), 200

###########################COMMENTS##########################################

@api.route("/comments", methods= ["POST"])
def handle_create_comment():

    payload = request.get_json()

    user = authorized_user()

    payload['user_id'] = user.id
    required = ['text', 'user_id', 'post_id']
   

    types = {
        'text': str,
        'user_id': int,
        'post_id': int
    }
    
    for key, value in payload.items():
        if key in types and not isinstance(value, types[key]):
            abort(400, f"{key} is not {types[key]}")
    
    for field in required:
        if field not in payload or payload[field] is None:
            abort(400)

    comment = Comments(**payload)

    db.session.add(comment)
    db.session.commit()

    return jsonify(comment.serialize()), 201

######################################## Donations #######################################

@api.route("/donations", methods=["GET"])
def handle_list_all_donations():
    
    donations = []

    for donation in Donations.query.all():
        donations.append(donation.serialize())

    return jsonify(donations), 200
    # DEBATIR SOBRE LA NECESIDAD DE OBTENER TODAS LAS DONACIONES

@api.route("/users/<int:id>/donations", methods=["GET"])
def handle_get_donation_by_user(id):
    # """ Return the list of donations selected by user"""
    # return "Get donation made by #{} user.".format(user_id)

    user = Users.query.filter_by(id=id, deleted_at=None).first()
    donations = []

    if not user:
        return "User not found", 404

    for donation in user.donations:
        donations.append(donation.serialize())
        
    return jsonify(donations), 200


@api.route("/diseases/<int:id>/donations", methods=["GET"])
def handle_get_donation_by_disease(id):
    # """ Return the list of donations selected by disease """
    # return "Get donation for #{} .".format(disease_id)

    disease = Diseases.query.filter_by(id=id, deleted_at=None).first()
    donations = []

    if not disease:
        return "Disease not found", 404

    for donation in disease.donations:
        donations.append(donation.serialize())
        
    return jsonify(donations), 200

# ESTE METODO FALLA ==> pendiente de insertar en el cuerpo de la peticion los id del usuario y de la enfermedad
# REVISAR RUTA PARA PASAR A LA FUNCION VALORES DE ID DESDE LA URL
@api.route("/donations", methods=["POST"])
def handle_create_donation():

    payload = request.get_json()

    required = ['amount', 'currency', 'id_user', 'id_disease']
    # disease_id and user_id is required??

    types = {
        'amount': str, 
        'currency': str, 
        'id_user': int,
        'id_disease': int
    }

    for key, value in payload.items():
        if key in types and not isinstance(value, types[key]):
            abort(400, f"{key} is not {types[key]}")
    
    for field in required:
        if field not in payload or payload[field] is None:
            abort(400)

    donation = Donations(**payload)

    db.session.add(donation)
    db.session.commit()

    return jsonify(donation.serialize()), 201

######################################## Follows #######################################


@api.route("/follows", methods=["GET"])
def handle_follow_by_user():

    user = authorized_user()
    list_diseases_follow = []
    follow_by_user = Follows.query.filter_by(user_id=user.id, deleted_at=None).all()

    for follow in follow_by_user:
        list_diseases_follow.append(follow.serialize())

    return jsonify(list_diseases_follow), 200


@api.route("/feed", methods=["GET"])
def handle_feed():
    user = authorized_user()

    if not user:
        abort(404)

    new_list = []
    
    post_list = Follows.query.filter_by(user_id=user.id, deleted_at=None).all()

    for item in post_list:
        for post in item.disease.posts:
            new_list.append(post.serialize())

    
    new_list.sort(key=lambda x: x.get("updated_at"),reverse=True)
   
   
    return jsonify(new_list), 201

@api.route("/diseases/<int:disease_id>/follows", methods=["GET"])
def handle_get_follow_by_disease(disease_id):
    """ Return the list of follows of one disease """
    return "Get the follows of disease #{} .".format(disease_id)


@api.route("/users/<int:user_id>/follows", methods=["GET"])
def handle_get_follow_by_user(user_id):
    """ Return the list of follows of one user """
    return "Get the follows of disease #{} .".format(disease_id)



@api.route("/follows", methods=["POST"])
def handle_follow_for_disease():

    user = authorized_user()
    if not user:
        return "User not found", 404

    payload = request.get_json()
    payload['user_id'] = user.id

    required = ['user_id', 'disease_id', 'role']

    types = {
        'user_id': int,
        'disease_id': int,
        'role': str
    }

    for key, value in payload.items():
        if key in types and not isinstance(value, types[key]):
            abort(400, f"{key} is not {types[key]}")
    
    for field in required:
        if field not in payload or payload[field] is None:
            abort(400)

    follow = Follows(**payload)

    db.session.add(follow)
    db.session.commit()

    print(follow.serialize())
    return jsonify(follow.serialize()), 201

# Tiene sentido editar un follow? como se marca y se desmarca? es un borrado o un put?:
# @api.route("/follows/<int:user_id>/<int:disease_id>", methods= ["PUT"])
# def handle_update_follow(user_id, disease_id):
#     """ Update existing follow """
#     response = {'message': 'success'}
#     return jsonify(response)


@api.route("/diseases/<int:disease_id>/follows", methods =["DELETE"])
def handle_delete_follow(disease_id):
    """Delete follow"""
    response = {'message': 'success'}
    return jsonify(response)


######################################## Relationships #######################################

@api.route("/relationships", methods=["GET"])
def handle_list_all_roles():
    """ Return List of follows"""
    return "List all follows"


# def handle_list_all_relationships():
#     relationships = []

#     for relationship in Relationships.query.all():
#         relationship.append(user.serialize())
#     return jsonify(relationships), 200

@api.route("/users/<int:user_id>/relationships", methods=["GET"])
def handle_get_user_roles(user_id):
    """ Return the amount of roles of an user"""
    return "Get roles of #{} user.".format(user_id)


# def handle_list_roles_from_user(id):
#     user = Users.query.get(id)
#     relationships = []

#     if not user:
#         return "User not found", 404

#     for relationship in user.relationship:
#         relationships.append(relationship.serialize())
        
#     return jsonify(relationships), 200


@api.route("/diseases/<int:disease_id>/relationships", methods=["GET"])
def handle_get_disease_roles(disease_id):
    """ Return the amount of roles of a disease"""
    return "Get roles of #{} disease.".format(disease_id)
# def handle_list_relationships_from_disease(id):
#     disease = Diseases.query.get(id)
#     relationships = []

#     if not disease:
#         return "Disease not found", 404

#     for relationship in disease.relationships:
#         relationships.append(relationship.serialize())
        
#     return jsonify(relationships), 200

@api.route("/relationships", methods=["POST"])
def handle_create_role_for_disease():

    user = authorized_user()
    if not user:
        return "User not found", 404

    payload = request.get_json()
    payload['user_id'] = user.id

    required = ['user_id', 'disease_id', 'role']

    types = {
        'user_id': int,
        'disease_id': int,
        'role': str
    }

    for key, value in payload.items():
        if key in types and not isinstance(value, types[key]):
            abort(400, f"{key} is not {types[key]}")
    
    for field in required:
        if field not in payload or payload[field] is None:
            abort(400)

    relation = Relationships(**payload)

    db.session.add(relation)
    db.session.commit()
   
    return jsonify(relation.serialize()), 201


@api.route("/diseases/<int:disease_id>/relationships", methods=["PUT"])
def handle_update_role(disease_id):
    """ Update existing role """
    response = {'message': 'success'}
    return jsonify(response)


# @api.route("/diseases/<int:disease_id>/relationships", methods = ["DELETE"])
# def handle_delete_role(id):
#     """Delete Role"""
#     response = {'message': 'success'}
#     return jsonify(response)

########################################### Associations ########################################

@api.route("/associations", methods=["GET"])
def handle_list_all_associations():
    
    # user = authorized_user()

    # if not user:
    #     return "User not found", 404

    return get_all_from_models(Associations)


####################################### Favorites ################################################

@api.route("/favorites", methods=["GET"])
def handle_list_favorites():

    # return get_all_from_models(Favorites)

    user = authorized_user()

    favorite_list = []
    favorite_posts = Favorites.query.filter_by(user_id=user.id, deleted_at=None).all()

    

    for item in favorite_posts:
        favorite_list.append(item.serialize())

    def content_post(item):
        return item["post"]

    new_list = list(map(content_post, favorite_list))

    new_list.sort(key=lambda x: x.get("updated_at"),reverse=True)
    
    return jsonify(new_list), 200


@api.route("/favorites", methods=["POST"])
def handle_add_favorite():

    user = authorized_user()
    if not user:
        return "User not found", 404

    payload = request.get_json()
    payload['user_id'] = user.id

    required = ['post_id']

    types = {
        'post_id': int
    }

    for key, value in payload.items():
        if key in types and not isinstance(value, types[key]):
            abort(400, f"{key} is not {types[key]}")
    
    for field in required:
        if field not in payload or payload[field] is None:
            abort(400)

    favorite = Favorites(**payload)
    
    db.session.add(favorite)
    db.session.commit()
   
    return jsonify(favorite.serialize()), 201


# @api.route("/temppost/<int:id>", methods=["DELETE"])
# def handle_delete_user(id):
#     user = Users.query.filter_by(id=id, deleted_at=None).first()

#     if not user:
#         return "User not found", 404

#     user.deleted_at = datetime.datetime.utcnow()

#     db.session.add(user)
#     db.session.commit()

#     return jsonify(user.serialize()), 200
#     # return delete_one_from_models(Users) 