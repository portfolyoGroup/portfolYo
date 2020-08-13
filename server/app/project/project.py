from flask import Blueprint, render_template, make_response, request
import service.projects_manager.projects_manager as projects_manager
import service.projects_manager.zip_handler as zip_handler
import json
project_blueprint = Blueprint('project_blueprint', __name__)
headers = {"Content-Type": "application/json"}


"""
end point for uploading new project:
body structure: 
{
    "projectName": "flask-test",
    "projectType": "python",
    "projectRoot": "pythonWebServer",
    "userName": "Noam",
    "encodedProject": ""
}
"""
@project_blueprint.route('/project', methods=['POST'])
def upload():
    body = json.loads(request.data)
    encoded_project = bytes(body.get("encodedProject"), 'ascii')
    project_name = body.get("projectName")
    project_type = body.get("projectType")
    project_root = body.get("projectRoot")
    user_name = body.get("userName")
    try:
        projects_manager.save_new_project(encoded_zip=encoded_project,
                                          project_name=project_name,
                                          project_type=project_type,
                                          project_root=project_root,
                                          user_name=user_name)
        return make_response("project uploaded succesfully!", 200)
    except Exception as e:
        make_response("Error accrued while uploading project: " + str(e), 500)


"""
run an existing project
query param1: projectName
query param2: userName
"""
@project_blueprint.route('/project', methods=['GET'])
def run():
    project_name = request.args.get("projectName")
    user_name = request.args.get("userName")

    try:
        projects_manager.run_project(project_name, user_name, "3000")
        return make_response("project is up and running!", 200)
    except Exception as e:
        make_response("Error accrued while trying to run project: " + str(e), 500)


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
    user_name = body.get("user")

    try:
        projects_manager.kill_container(user_name, project_name)
        return make_response("project has stopped!", 200)
    except Exception as e:
        make_response("Error accrued while trying to stop project: " + str(e), 500)

