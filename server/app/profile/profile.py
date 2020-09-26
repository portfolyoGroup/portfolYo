import json

from flask import request, Blueprint, jsonify
from service.dal import dal

profile_blueprint = Blueprint('profile_blueprint', __name__)


@profile_blueprint.route('/profile', methods=['GET'])
def get_profile():
    uid = request.args.get('id')
    json_profile_result = dal.get_profile_dict(uid)
    json_profile_result["success"] = True

    return jsonify(json_profile_result), 200


@profile_blueprint.route('/profile', methods=['POST'])
def update_profile():
    profile_data = dict()
    profile_data['uid'] = request.args.get('id')
    body = json.loads(request.data)
    profile_data['dataOfAbout'] = body.get('dataOfAbout')
    profile_data['dataOfContact'] = body.get('dataOfContact')
    profile_data['dataOfProfileHome'] = body.get('dataOfProfileHome')
    profile_data['projectsList'] = body.get('projectsList')
    profile_data['profilePic'] = body.get('profilePic')

    dal.update_profile(profile_data)
    json_profile_result = dict()
    json_profile_result["success"] = True
    return jsonify(json_profile_result), 200


