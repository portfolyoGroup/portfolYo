import json

from flask import Blueprint, render_template, make_response, request
# from google.oauth2 import id_token
# from google.auth.transport import requests
#

auth_blueprint = Blueprint('auth_blueprint', __name__)

CLIENT_ID = "clientid"


@auth_blueprint.route('/auth', methods=['POST'])
def validate_user():
    # try:
    #     body = json.loads(request.data)
    #     id_token = body.get('idtoken')
    #     idinfo = id_token.verify_oauth2_token(id_token, requests.Request(), CLIENT_ID)
    #     if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
    #         raise ValueError('Wrong issuer.')
    #
    #     userid = idinfo['sub']
    # except ValueError as e:
    #     return make_response("Invalid user: " + str(e), 500)
    return True
