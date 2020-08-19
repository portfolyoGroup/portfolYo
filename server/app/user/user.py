from flask import Blueprint, request, render_template, make_response
import json
from service.mongo_db.mongo_client import mongo_save_user
from service.mongo_db.mongo_client import mongo_get_user
from service.mongo_db.db_entities import User
import uuid

user_blueprint = Blueprint('user_blueprint', __name__, static_folder='../static')
headers = {"Content-Type": "application/json"}

@user_blueprint.route('/user', methods=['POST'])
def create_user():
    # # Todo: debug, build response, exception handling
    body = json.loads(request.data)
    email = body.get('email')
    password = body.get('password')
    description = body.get('description')
    pic = body.get('pic')
    id = generateUID()
    user = User(email=email, password=password, description=description, pic=pic, id=id)
    mongo_save_user(user)
    dictionary = dict()
    dictionary["id"] = id

    return make_response(json.dumps(dictionary), 200)

    # return "user created successfully "

@user_blueprint.route('/user', methods=['GET'])
def get_user():
    body = json.loads(request.data)
    email = body.get('email')
    userResult = mongo_get_user(email=email)
    # TODO: Authentication by email-password is required
#     password = body.get('password')
    result = dict()
    result["id"] = userResult["id"]

    return make_response(json.dumps(result), 200)


def generateUID():
    return str(uuid.uuid4())
