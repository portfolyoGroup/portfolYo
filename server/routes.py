from . import app
from flask import request
from flask import json

@app.route('/home', methods=['GET'])
def home():
    input = request.args.get('full_name')
    response = app.response_class(
        response=json.dumps({'message': f"hello {input}, have a nice day"}),
        status=200,
        mimetype='application/json'
    )
    return response


