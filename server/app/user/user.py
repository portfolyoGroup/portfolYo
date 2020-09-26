from flask import Blueprint, request, jsonify
import json

from service.dal import dal

user_blueprint = Blueprint('user_blueprint', __name__, static_folder='../static')
headers = {"Content-Type": "application/json"}


@user_blueprint.route('/user', methods=['POST'])
def create_user():
    body = json.loads(request.data)
    email = body.get('email')
    password = body.get('password')
    uid = dal.create_user(email, password)

    return jsonify({"id": uid, "success": True}), 200


@user_blueprint.route('/login', methods=['POST'])
def get_user():
    body = json.loads(request.data)
    email = body.get('email')
    password = body.get('password')
    uid = dal.get_user_uid(email, password)

    return jsonify({"id": uid, "success": True}), 200
