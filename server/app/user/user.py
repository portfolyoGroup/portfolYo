from flask import Blueprint, request, render_template, make_response
import json
<<<<<<< HEAD
from service.mongo_db.mongo_client import mongo_save_user
from service.mongo_db.mongo_client import mongo_get_user_by_email
=======
from service.mongo_db.db_client import save_user
from service.mongo_db.db_client import get_user
>>>>>>> 65e960925f24a956915801e543183ca1228b86ad
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
    uid = generate_uid()
    try:
        user = User(email=email, password=password, description=description, pic=pic, uid=uid)
        save_user(user)
        dictionary = dict()
        dictionary["id"] = uid

        return make_response(json.dumps(dictionary), 200)
    except Exception as e:
        return make_response(str(e), 500)


@user_blueprint.route('/user', methods=['GET'])
def get_user():
    body = json.loads(request.data)
    email = body.get('email')
<<<<<<< HEAD
    user_result = mongo_get_user_by_email(email=email)
=======
    userResult = get_user(email=email)
>>>>>>> 65e960925f24a956915801e543183ca1228b86ad
    # TODO: Authentication by email-password is required
#     password = body.get('password')
    result = dict()
    result["id"] = user_result["uid"]

    return make_response(json.dumps(result), 200)


def generate_uid():
    return str(uuid.uuid4())
