
from flask import Blueprint, render_template
project_blueprint = Blueprint('project_blueprint', __name__)
headers = {"Content-Type": "application/json"}


@project_blueprint.route('/project', methods=['POST'])
def register():
    body = json.loads(request.data)
    encoded_project = body.get("encodedProject")
    project_name = body.get("projectName")
    project_type = body.get("projectType")
    project_root = body.get("projectRoot")


    # response = dict()
    # try:
    #     user_name = body.get('userName')
    #     email = body.get('email')
    #     user_password = body.get('password')
    #     description = body.get('description')
    #     pic = body.get('pic')

    #     user = User(user_name=user_name, email=email, description=description, pic=pic, password=user_password)
    #     mongo_client.post_user(user)

    #     response = make_response("user created successfully!", 200)
    #     response.headers.update(headers)

    # except Exception as e:
    #     response = make_response("Error accrued while creating user: " + str(e), 500)
    #     response.headers.update(headers)

    # return response
