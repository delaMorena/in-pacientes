"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

""" empiezo a definir los endpoint """

@api.route("/users", methods=["GET"])
def handle_list_all_users():
    """ Return List of user"""
    print('List all users')
    return "List all users"

@api.route("/users/<int:id>", methods= ["GET"])
def handle_get_user(id):
    """ Return one single user """
    return "Get #{} user.".format(id)

@api.route("/users", methods= ["POST"])
def handle_create_user():
    """ Create user """
    payload= request.get_json()
    print(payload)
    return "User created"


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


# Diseases

@api.route("/diseases", methods=["GET"])
def handle_list_all_diseases():
    """ Return List of diseases"""
    return "List all diseases"

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

# Posts 

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

# Donations


@api.route("/donations", methods=["GET"])
def handle_list_all_donations():
    """ Return List of donations"""
    return "List all donations"

@api.route("/diseases/<int:disease_id>/donations", methods= ["GET"])
def handle_get_donation(disease_id):
    """ Return the list of donations selected by disease """
    return "Get donation for #{} .".format(disease_id)

@api.route("/users/<int:user_id>/donations", methods= ["GET"])
def handle_get_donation(user_id):
    """ Return the list of donations selected by user"""
    return "Get donation made by #{} user.".format(user_id)

@api.route("/donations", methods= ["POST"])
def handle_create_donation():
    """ Create Donation """
    payload= request.get_json()
    print(payload)
    return "Donation created"

# Follows


@api.route("/follows", methods=["GET"])
def handle_list_all_follows():
    """ Return List of follows"""
    return "List all follows"


@api.route("/diseases/<int:disease_id>/follows", methods= ["GET"])
def handle_get_follow(id):
    """ Return the list of follows of one disease """
    return "Get the follows of disease #{} .".format(disease_id)


@api.route("/users/<int:user_id>/follows", methods= ["GET"])
def handle_get_follow(id):
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


# Relationships

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


@api.route("/relationships", methods= ["POST"])
def handle_create_follow():
    """ Create relationships """
    payload= request.get_json()
    print(payload)
    return "follow created"


@api.route("/users/<int:user_id/int:disease_id>", methods= ["PUT"])
def handle_update_follow(id):
    """ Update existing follow """
    response = {'message': 'success'}
    return jsonify(response)


@api.route("/follow/<int:user_id/int:disease_id>", methods = ["DELETE"])
def handle_delete_follow(id):
    """Delete follow"""
    response = {'message': 'success'}
    return jsonify(response)