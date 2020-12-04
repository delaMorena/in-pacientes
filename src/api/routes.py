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

# ''' empiezo a definir los endpoint '''

# @api.route('/users', method=['GET'])
# def handle_list_all_users():
#     ''' Return List of user'''
#     return 'List all users'

# @api.route('/users/<int:id>', method= ['GET'])
# def handle_get_user(id):
#     ''' Return one single user '''
#     return 'Get #{} user.'.format(id)

# @api.route('/users', method= ['POST'])
# def handle_create_user():
#     ''' Create user '''
#     payload= request.get_json()
#     print(payload)
#     return 'User created'