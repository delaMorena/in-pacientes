"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Diseases, Posts, Comments, Donations, Follows, Relationships
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

def get_one_or_404(model, id):
    row = model.query.get(id)

    if not row:
        return row.capitalize()+" not found", 404

    return jsonify(row.serialize()), 200


def get_all_from_models(newList, model):
    newList = []

    for item in model.query.all():
        newList.append(item.serialize())

    return jsonify(newList), 200


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

####################################### USERS #######################################

@api.route("/users", methods=["GET"])
def handle_list_all_users():
    # users = []

    # for user in Users.query.all():
    #     users.append(user.serialize())
    # return jsonify(users), 200

    return get_all_from_models(users, Users)

@api.route("/users/<int:id>", methods=["GET"])
def handle_get_user(id):
    # user = Users.query.get(id)

    # if not user:
    #     return "User not found", 404

    # return jsonify(user.serialize())
    return get_one_or_404(Users, id)

    

@api.route("/users", methods=["POST"])
def handle_create_user():
    payload= request.get_json()
    user = Users(**payload)

    db.session.add(user)
    db.session.commit()
    
    return jsonify(user.serialize()), 201


@api.route("/users/<int:id>", methods=["PUT"])
def handle_update_user(id):
    user = Users.query.get(id)

    if not user:
        return "User not found", 404

    payload = request.get_json()

    # Añadir un if para cada clave del payload
    user.first_name = payload["first_name"]
    user.last_name = payload["last_name"]
    user.email = payload["email"]
    # Hay que incluir estas tres claves dentro del dict de la peticion


    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 200


@api.route("/users/<int:id>", methods=["DELETE"])
def handle_delete_user(id):

    user = Users.query.get(id)

    if not user:
        return "User not found", 404

    data = user.serialize()

    db.session.delete(user)
    db.session.commit()

    return jsonify(data), 200


######################################## Diseases #######################################

@api.route("/diseases", methods=["GET"])
def handle_list_all_diseases():

    # diseases = []

    # for disease in Diseases.query.all():
    #     diseases.append(disease.serialize())

    # return jsonify(diseases), 200

    return get_all_from_models(diseases, Diseases)


@api.route("/diseases/<int:id>", methods=["GET"])
def handle_get_disease(id):

    # disease = Diseases.query.get(id)

    # if not disease:
    #     return "User not found", 404

    # return jsonify(disease.serialize())
    return get_one_or_404(Diseases, id)


@api.route("/diseases", methods= ["POST"])
def handle_create_disease():

    payload = request.get_json()
    disease = Diseases(**payload)

    db.session.add(disease)
    db.session.commit()

    return jsonify(disease.serialize()), 201


@api.route("/diseases/<int:id>", methods=["PUT"])
def handle_update_disease(id):

    disease = Diseases.query.get(id)

    if not disease:
        return "User not found", 404
    
    # cuerpo de la peticion
    # "title": self.title,
    # "scientific_name": self.scientific_name,
    # "description": self.description,

    payload = request.get_json()

    # Añadir un if para cada clave del payload
    disease.title = payload['title']
    disease.scientific_name = payload['scientific_name']
    disease.description = payload['description']

    db.session.add(disease)
    db.session.commit()

    return jsonify(disease.serialize()), 200
    

@api.route("/diseases/<int:id>", methods=["DELETE"])
def handle_delete_disease(id):

    disease = Diseases.query.get(id)

    if not disease:
        return "User not found", 404

    data = disease.serialize()

    db.session.delete(disease)
    db.session.commit()

    return jsonify(data), 200
   

######################################## Posts  #######################################

@api.route("/users/<int:id>/posts", methods=["GET"])
def handle_list_posts_from_user(id):
    user = Users.query.get(id)
    posts = []

    if not user:
        return "User not found", 404

    for post in user.posts:
        posts.append(post.serialize())
        
    return jsonify(posts), 200


@api.route("/diseases/<int:id>/posts", methods=["GET"])
def handle_list_posts_from_disease(id):
    disease = Diseases.query.get(id)
    posts = []

    if not disease:
        return "Disease not found", 404

    for post in disease.posts:
        posts.append(post.serialize())
        
    return jsonify(posts), 200


@api.route("/posts", methods= ["POST"])
def handle_create_post():

    payload = request.get_json()
    post = Posts(**payload)

    db.session.add(post)
    db.session.commit()

    return jsonify(post.serialize()), 201
    

@api.route("/posts/<int:id>", methods=["PUT"])
def handle_update_post(id):

    post = Posts.query.get(id)

    if not post:
        return "Post not found", 404

    payload = request.get_json()

    # Añadir un if para cada clave del payload
    post.text = payload['text']
    post.publisher_id = payload['publisher_id']
    post.disease_id = payload['disease_id']

    db.session.add(post)
    db.session.commit()
    return jsonify(post.serialize()), 200


@api.route("/posts/<int:id>", methods =["DELETE"])
def handle_delete_post(id):
    
    post = Posts.query.get(id)

    if not post:
        return "User not found", 404

    data = post.serialize()

    db.session.delete(post)
    db.session.commit()

    return jsonify(data), 200


######################################## Donations #######################################


@api.route("/donations", methods=["GET"])
def handle_list_all_donations():
    
    donations = []

    for donation in Donations.query.all():
        donations.append(donation.serialize())

    return jsonify(donations), 200

@api.route("/diseases/<int:disease_id>/donations", methods=["GET"])
def handle_get_donation_by_disease(disease_id):
    """ Return the list of donations selected by disease """
    return "Get donation for #{} .".format(disease_id)

@api.route("/users/<int:user_id>/donations", methods=["GET"])
def handle_get_donation_by_user(user_id):
    """ Return the list of donations selected by user"""
    return "Get donation made by #{} user.".format(user_id)

@api.route("/donations", methods=["POST"])
def handle_create_donation():
    """ Create Donation """
    payload= request.get_json()
    print(payload)
    return "Donation created"

######################################## Follows #######################################


@api.route("/follows", methods=["GET"])
def handle_list_all_follows():
    """ Return List of follows"""
    return "List all follows"


@api.route("/diseases/<int:disease_id>/follows", methods=["GET"])
def handle_get_follow_by_disease(disease_id):
    """ Return the list of follows of one disease """
    return "Get the follows of disease #{} .".format(disease_id)


@api.route("/users/<int:user_id>/follows", methods=["GET"])
def handle_get_follow_by_user(user_id):
    """ Return the list of follows of one user """
    return "Get the follows of disease #{} .".format(disease_id)


@api.route("/follows", methods=["POST"])
def handle_create_follow():
    """ Create follow """
    payload= request.get_json()
    print(payload)
    return "follow created"


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

@api.route("/users/<int:user_id>/relationships", methods=["GET"])
def handle_get_user_roles(user_id):
    """ Return the amount of roles of an user"""
    return "Get roles of #{} user.".format(user_id)


@api.route("/diseases/<int:disease_id>/relationships", methods=["GET"])
def handle_get_disease_roles(disease_id):
    """ Return the amount of roles of a disease"""
    return "Get roles of #{} disease.".format(disease_id)


@api.route("/diseases/<int:disease_id>/relationships", methods=["POST"])
def handle_create_role_for_disease():
    """ Create role for disease """
    payload= request.get_json()
    print(payload)
    return "Role created"


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