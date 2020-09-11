from flask import Blueprint, request, jsonify
import service.projects_manager.projects_manager as projects_manager
import json

from service.mongo_db.db_client import is_user_exist, add_user_project

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
    user_id = request.args.get("profileId")

    projects_manager.handle_upload(project_data=body, user_id=user_id)
    return jsonify({"success": True}), 200


"""
run an existing project
query param1: projectName
query param2: userName
"""


@project_blueprint.route('/project', methods=['GET'])
def get_project_data():
    project_id = request.args.get("id")
    response = projects_manager.get_project_data(project_id)

    return jsonify({'success': True} + response), 200

@project_blueprint.route('/project/run', methods=['GET'])
def run():
    project_id = request.args.get("projectId")

    port = projects_manager.run_project(project_id)
    return jsonify({"success": True, "port": port}), 200


"""
stops a running project:
body structure:
{
    "project": "flask-test",
    "user": "noam"
}
"""


@project_blueprint.route('/project/stop', methods=['POST'])
def stop():
    body = json.loads(request.data)

    project_name = body.get("project")
    user_id = body.get("uId")

    projects_manager.kill_container(user_id, project_name)
    return jsonify({"success": True}), 200


@project_blueprint.route('/project', methods=['DELETE'])
def delete():
    body = json.loads(request.data)

    project_name = body.get("project")
    user_name = body.get("user")

    projects_manager.delete_project(user_name, project_name)
    return jsonify({"success": True}), 200
