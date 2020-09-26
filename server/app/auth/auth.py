
from flask import Blueprint

auth_blueprint = Blueprint('auth_blueprint', __name__)

CLIENT_ID = "clientid"


@auth_blueprint.route('/auth', methods=['POST'])
def validate_user():
    return True
