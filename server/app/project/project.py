import logging

from flask import Blueprint, request, jsonify
import service.projects_manager.projects_manager as projects_manager
import json

from service.dal import dal

project_blueprint = Blueprint('project_blueprint', __name__)

"""
end point for uploading new project:
body structure: 
{
    "projectName": "flask-test",
    "projectType": "python",
    "projectRoot": "pythonWebServer",
    "userId": "Noam",
    "encodedProject": ""
}
"""


@project_blueprint.route('/project', methods=['POST'])
def upload():
    body = json.loads(request.data)
    logging.error("request body: " + str(body))
    user_id = request.args.get("profileId")

    dal.upload_project(body, user_id)
    return jsonify({"success": True}), 200


"""
run an existing project
query param1: projectName
query param2: userName
"""


@project_blueprint.route('/project', methods=['GET'])
def get_project_data():
    project_id = request.args.get("id")
    response = dal.get_project_data(project_id)
    response.update({'success': True})

    return jsonify(response), 200


@project_blueprint.route('/project/run', methods=['GET'])
def run():
    project_id = request.args.get("projectId")

    port = dal.run_project(project_id)
    return jsonify({"success": True, "port": port}), 200


"""
stops a running project:
body structure:
{
    "project": "flask-test",
    "user": "noam"
}
"""


@project_blueprint.route('/project/terminate', methods=['GET'])
def stop():
    project_id = request.args.get("projectId")
    dal.stop_project(project_id)

    return jsonify({"success": True}), 200


@project_blueprint.route('/project', methods=['DELETE'])
def delete():
    body = json.loads(request.data)

    project_name = body.get("project")
    user_name = body.get("user")

    dal.delete_project(project_name, user_name)
    return jsonify({"success": True}), 200
