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

"""" empiezo a definir los endpoint """"

@api.route("/users", method=["GET"])
def handle_list_all_users():
    """" Return List of user"""
    return "List all users"

@api.route("/user/<int:id>", method= ["GET"])
def handle_get_user(id):
    """" Return one single user """"
    return "Get #{} user.".format(id)

@api.route("/user", method= ["POST"])
def handle_create_user():
    """" Create user """"
    payload= request.get_json()
    print(payload)
    return "User created"


@api.route("/users/<int:id>", method= ["PUT"])
def handle_update_user(id):
    """" Update existing user """"
   response = {'message': 'success'}
   return jsonify(response)


@api.route("/user/<int:id>", method = ["DELETE"])
def handle_delete_user(id):
    """Delete user"""
    response = {'message': 'success'}
    return jsonify(response)


# Diseases

@api.route("/diseases", method=["GET"])
def handle_list_all_diseases():
    """" Return List of diseases"""
    return "List all diseases"

@api.route("/disease/<int:id>", method= ["GET"])
def handle_get_disease(id):
    """" Return one single disease """"
    return "Get #{} disease.".format(id)

@api.route("/disease", method= ["POST"])
def handle_create_disease():
    """" Create disease """"
    payload= request.get_json()
    print(payload)
    return "Disease created"


@api.route("/disease/<int:id>", method= ["PUT"])
def handle_update_disease(id):
    """" Update existing disease """"
   response = {'message': 'success'}
   return jsonify(response)


@api.route("/disease/<int:id>", method = ["DELETE"])
def handle_delete_disease(id):
    """Delete disease"""
    response = {'message': 'success'}
    return jsonify(response)

# Posts 

@api.route("/posts", method=["GET"])
def handle_list_all_posts():
    """" Return List of posts"""
    return "List all posts"

@api.route("/post/<int:id>", method= ["GET"])
def handle_get_post(id):
    """" Return one single post """"
    return "Get #{} post.".format(id)

@api.route("/post", method= ["POST"])
def handle_create_post():
    """" Create post """"
    payload= request.get_json()
    print(payload)
    return "Post created"


@api.route("/post/<int:id>", method= ["PUT"])
def handle_update_post(id):
    """" Update existing post """"
   response = {'message': 'success'}
   return jsonify(response)


@api.route("/post/<int:id>", method = ["DELETE"])
def handle_delete_post(id):
    """Delete post"""
    response = {'message': 'success'}
    return jsonify(response)

# Donations


@api.route("/donations", method=["GET"])
def handle_list_all_donations():
    """" Return List of donations"""
    return "List all donations"

@api.route("/donations/<int:user_id/int:disease_id>", method= ["GET"])
def handle_get_donation(id):
    """" Return one single donation """"
    return "Get #{} donation.".format(id)

@api.route("/donations/<int:user_id/int:disease_id>", method= ["POST"])
def handle_create_donation():
    """" Create Donation """"
    payload= request.get_json()
    print(payload)
    return "Donation created"

# Follows


@api.route("/follows", method=["GET"])
def handle_list_all_follows():
    """" Return List of follows"""
    return "List all follows"

@api.route("/follow/<int:user_id/int:disease_id>", method= ["GET"])
def handle_get_follow(id):
    """" Return one single follow """"
    return "Get #{} follow.".format(id)

@api.route("/follow", method= ["POST"])
def handle_create_follow():
    """" Create follow """"
    payload= request.get_json()
    print(payload)
    return "follow created"


@api.route("/follow/<int:user_id/int:disease_id>", method= ["PUT"])
def handle_update_follow(id):
    """" Update existing follow """"
   response = {'message': 'success'}
   return jsonify(response)


@api.route("/follow/<int:user_id/int:disease_id>", method = ["DELETE"])
def handle_delete_follow(id):
    """Delete follow"""
    response = {'message': 'success'}
    return jsonify(response)


# Relationships

@api.route("/follows", method=["GET"])
def handle_list_all_follows():
    """" Return List of follows"""
    return "List all follows"

@api.route("/follow/<int:user_id/int:disease_id>", method= ["GET"])
def handle_get_follow(id):
    """" Return one single follow """"
    return "Get #{} follow.".format(id)

@api.route("/follow", method= ["POST"])
def handle_create_follow():
    """" Create follow """"
    payload= request.get_json()
    print(payload)
    return "follow created"


@api.route("/follow/<int:user_id/int:disease_id>", method= ["PUT"])
def handle_update_follow(id):
    """" Update existing follow """"
   response = {'message': 'success'}
   return jsonify(response)


@api.route("/follow/<int:user_id/int:disease_id>", method = ["DELETE"])
def handle_delete_follow(id):
    """Delete follow"""
    response = {'message': 'success'}
    return jsonify(response)