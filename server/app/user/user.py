from flask import Blueprint, request, render_template, make_response, jsonify
import json
from service.mongo_db.db_client import save_user, get_user_by_id
from service.mongo_db.db_client import get_user_by_email
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
    user = User(email=email, password=password, description=description, pic=pic, uid=uid)
    save_user(user)

    return jsonify({"id": uid, "success": True}), 200


@user_blueprint.route('/login', methods=['POST'])
def get_user():
    body = json.loads(request.data)
    email = body.get('email')
    user_result = get_user_by_email(email=email)
    # TODO: Authentication by email-password is required
#     password = body.get('password')
    uid = user_result["uid"]

    return jsonify({"id": uid, "success": True}), 200


def generate_uid():
    return str(uuid.uuid4())
