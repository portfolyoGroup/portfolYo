
from flask import Blueprint, render_template
register_blueprint = Blueprint('register_blueprint', __name__, static_folder='../static')
headers = {"Content-Type": "application/json"}


@register_blueprint.route('/', methods=['GET'])
def register():
    return render_template('index.html')

