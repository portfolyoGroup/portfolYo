from flask import Blueprint, render_template

register_blueprint = Blueprint('register_blueprint', __name__, template_folder="..\\..\\..\\client\\dist")
headers = {"Content-Type": "application/json"}


@register_blueprint.route('/register', methods=['GET'])
def register():
    # body = json.loads(request.data)
    # response = dict()
    # try:
    #     user_name = body.get('userName')
    #     email = body.get('email')
    #     user_password = body.get('password')
    #     description = body.get('description')
    #     pic = body.get('pic')
    #
    #     user = User(user_name=user_name, email=email, description=description, pic=pic, password=user_password)
    #     mongo_client.post_user(user)
    #
    #     response = make_response("user created successfully!", 200)
    #     response.headers.update(headers)
    #
    # except Exception as e:
    #     response = make_response("Error accrued while creating user: " + str(e), 500)
    #     response.headers.update(headers)

    return render_template()
