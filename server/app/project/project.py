from flask import Blueprint, make_response, request, jsonify
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
    encoded_project = bytes(body.get("encodedProject"), 'ascii')
    project_name = body.get("projectName")
    project_type = body.get("projectType")
    user_id = request.args.get("profileId")
    port = body.get("port")
    projects_manager.save_new_project(encoded_zip=encoded_project,
                                      project_name=project_name,
                                      project_type=project_type,
                                      user_id=user_id, port=port)
    if is_user_exist(user_id):
        add_user_project(user_id, project_name)
    return jsonify({"success": True}), 200



"""
run an existing project
query param1: projectName
query param2: userName
"""
@project_blueprint.route('/project', methods=['GET'])
def run():
    project_name = request.args.get("projectName")
    user_id = request.args.get("userId")

    port = projects_manager.run_project(project_name, user_id)
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




