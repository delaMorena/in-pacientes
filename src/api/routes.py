"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Diseases, Posts, Comments, Donations, Follows, Relationships
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

####################################### USERS #######################################

@api.route("/users", methods=["GET"])
def handle_list_all_users():
    users = []

    for user in Users.query.all():
        users.append(user.serialize())
    return jsonify(users), 200

@api.route("/users/<int:id>", methods= ["GET"])
def handle_get_user(id):
    user = Users.query.get(id)

    if not user:
        return "User not found", 404

    return jsonify(user.serialize())

@api.route("/users", methods= ["POST"])
def handle_create_user():
    payload= request.get_json()

    user = Users(**payload)

    db.session.add(user)
    db.session.commit()
    print(payload, user)
    
    return jsonify(user.serialize()), 201


@api.route("/users/<int:id>", methods= ["PUT"])
def handle_update_user(id):
    """ Update existing user """
    response = {'message': 'success'}
    return jsonify(response)


@api.route("/users/<int:id>", methods=["DELETE"])
def handle_delete_user(id):
    """Delete user"""
    response = {'message': 'success'}
    return jsonify(response)


######################################## Diseases #######################################

@api.route("/diseases", methods=["GET"])
def handle_list_all_diseases():
    diseases = []

    for disease in Diseases.query.all():
        diseases.append(disease.serialize())
    return jsonify(diseases), 200

@api.route("/diseases/<int:id>", methods=["GET"])
def handle_get_disease(id):
    """ Return one single disease """
    return "Get #{} disease.".format(id)

@api.route("/diseases", methods= ["POST"])
def handle_create_disease():
    """ Create disease """
    payload= request.get_json()
    print(payload)
    return "Disease created"


@api.route("/diseases/<int:id>", methods=["PUT"])
def handle_update_disease(id):
    """ Update existing disease """
    response = {'message': 'success'}
    return jsonify(response)


@api.route("/diseases/<int:id>", methods=["DELETE"])
def handle_delete_disease(id):
    """Delete disease"""
    response = {'message': 'success'}
    return jsonify(response)

######################################## Posts  #######################################

@api.route("/posts", methods=["GET"])
def handle_list_all_posts():
    """ Return List of posts"""
    return "List all posts"

@api.route("/posts/<int:id>", methods= ["GET"])
def handle_get_post(id):
    """ Return one single post """
    return "Get #{} post.".format(id)

@api.route("/posts", methods= ["POST"])
def handle_create_post():
    """ Create post """
    payload= request.get_json()
    print(payload)
    return "Post created"


@api.route("/posts/<int:id>", methods= ["PUT"])
def handle_update_post(id):
    """ Update existing post """
    response = {'message': 'success'}
    return jsonify(response)


@api.route("/posts/<int:id>", methods = ["DELETE"])
def handle_delete_post(id):
    """Delete post"""
    response = {'message': 'success'}
    return jsonify(response)

######################################## Donations #######################################


@api.route("/donations", methods=["GET"])
def handle_list_all_donations():
    """ Return List of donations"""
    return "List all donations"

@api.route("/diseases/<int:disease_id>/donations", methods= ["GET"])
def handle_get_donation_by_disease(disease_id):
    """ Return the list of donations selected by disease """
    return "Get donation for #{} .".format(disease_id)

@api.route("/users/<int:user_id>/donations", methods= ["GET"])
def handle_get_donation_by_user(user_id):
    """ Return the list of donations selected by user"""
    return "Get donation made by #{} user.".format(user_id)

@api.route("/donations", methods= ["POST"])
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


@api.route("/diseases/<int:disease_id>/follows", methods= ["GET"])
def handle_get_follow_by_disease(disease_id):
    """ Return the list of follows of one disease """
    return "Get the follows of disease #{} .".format(disease_id)


@api.route("/users/<int:user_id>/follows", methods= ["GET"])
def handle_get_follow_by_user(user_id):
    """ Return the list of follows of one user """
    return "Get the follows of disease #{} .".format(disease_id)


@api.route("/follows", methods= ["POST"])
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


@api.route("/diseases/<int:disease_id>/follows", methods = ["DELETE"])
def handle_delete_follow(disease_id):
    """Delete follow"""
    response = {'message': 'success'}
    return jsonify(response)


######################################## Relationships #######################################

@api.route("/relationships", methods=["GET"])
def handle_list_all_roles():
    """ Return List of follows"""
    return "List all follows"

@api.route("/users/<int:user_id>/relationships", methods= ["GET"])
def handle_get_user_roles(user_id):
    """ Return the amount of roles of an user"""
    return "Get roles of #{} user.".format(user_id)


@api.route("/diseases/<int:disease_id>/relationships", methods= ["GET"])
def handle_get_disease_roles(disease_id):
    """ Return the amount of roles of a disease"""
    return "Get roles of #{} disease.".format(disease_id)


@api.route("/diseases/<int:disease_id>/relationships", methods= ["POST"])
def handle_create_role_for_disease():
    """ Create role for disease """
    payload= request.get_json()
    print(payload)
    return "Role created"


@api.route("/diseases/<int:disease_id>/relationships", methods= ["PUT"])
def handle_update_role(disease_id):
    """ Update existing role """
    response = {'message': 'success'}
    return jsonify(response)


# @api.route("/diseases/<int:disease_id>/relationships", methods = ["DELETE"])
# def handle_delete_role(id):
#     """Delete Role"""
#     response = {'message': 'success'}
#     return jsonify(response)