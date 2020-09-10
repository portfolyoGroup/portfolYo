import json
import os

from flask import request, Blueprint, jsonify
from service.mongo_db.db_client import get_user_by_id
from service.projects_manager.zip_handler import base64_encoder
from service.mongo_db.db_entities import User

profile_blueprint = Blueprint('profile_blueprint', __name__)


@profile_blueprint.route('/profile', methods=['GET'])
def get_profile():
    # data = json.loads(request.data)
    uid = request.args.get('id')
    user = get_user_by_id(uid)
    json_profile_result = convert_user_to_dict(user, uid)
    json_profile_result["success"] = True
    return jsonify(json_profile_result), 200


def convert_user_to_dict(user: User, uid: str):
    profile_res_dict = dict()
    data_of_about_dict = dict()
    data_of_contact_dict = dict()
    data_of_profile_home_dict = dict()
    profile_pic_dict = dict()
    projects_list_arr = []
    profile_pic_dict["picName"] = user["picName"]
    profile_pic_dict["picType"] = user["picType"]
    profile_pic_dict["picData"] = user["picData"]
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
    # projects_list_arr = user["projects"]
    profile_res_dict["dataOfAbout"] = data_of_about_dict
    profile_res_dict["dataOfContact"] = data_of_contact_dict
    profile_res_dict["dataOfProfileHome"] = data_of_profile_home_dict
    # profile_res_dict["projectList"] = projects_list_arr
    profile_res_dict["profilePic"] = profile_pic_dict if profile_pic_dict.get('picName') is not None \
        else _get_default_pic_dict()

    return profile_res_dict


def _get_default_pic_dict():
    encoded_pic = "data:image/png;base64,  "  + "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"
        # str(base64_encoder(os.path.join(os.getcwd(),'server', 'app','profile', 'statics', 'defaulticon.png')))
    return {'picData': encoded_pic, 'picName': 'defaulticon', 'picType': 'png'}

