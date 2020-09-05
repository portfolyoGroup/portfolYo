import json

from flask import request, Blueprint, jsonify, make_response
from service.mongo_db.db_client import get_user_by_id

profile_blueprint = Blueprint('profile_blueprint', __name__)


@profile_blueprint.route('/profile', methods=['GET'])
def get_profile():
    uid = request.args.get('id')
    user = get_user_by_id(uid)
    json_profile_result = convert_user_to_dict(user, uid)
    json_profile_result["success"] = True
    return jsonify(json_profile_result), 200


def convert_user_to_dict(user, uid):
    profile_res_dict = dict()
    data_of_about_dict = dict()
    data_of_contact_dict = dict()
    data_of_profile_home_dict = dict()
    profile_pic_dict = dict()
    profile_pic_dict["pic"] = user["pic"]
    profile_pic_dict["picName"] = user["picName"]
    profile_pic_dict["picType"] = user["picType"]
    profile_res_dict["picData"] = user["picData"]
    data_of_about_dict["description"] = user["description"]
    data_of_about_dict["programming_languages"] = user["programming_languages"]
    data_of_about_dict["skills"] = user["skills"]
    data_of_about_dict["experience"] = user["experience"]
    data_of_contact_dict["date_of_birth"] = user["date_of_birth"]
    data_of_contact_dict["address"] = user["address"]
    data_of_contact_dict["phone"] = user["phone"]
    data_of_profile_home_dict["name"] = user["name"]
    data_of_profile_home_dict["title"] = user["title"]
    data_of_profile_home_dict["main_description"] = user["main_description"]
    profile_res_dict["dataOfAbout"] = data_of_about_dict
    profile_res_dict["dataOfContact"] = data_of_contact_dict
    profile_res_dict["dataOfProfileHome"] = data_of_profile_home_dict
    profile_res_dict["profilePic"] = profile_pic_dict

    return profile_res_dict

