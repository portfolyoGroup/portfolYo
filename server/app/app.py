from app.profile.profile import profile_blueprint
from flask import Flask, request, jsonify
from app.auth.auth import auth_blueprint
# from auth import auth_blueprint
from app.sign_in_up.register import register_blueprint
# from  import register_blueprint
from app.project.project import project_blueprint
from app.user.user import user_blueprint
from flask_cors import CORS
from werkzeug.exceptions import HTTPException

app = Flask(__name__)
CORS(app)
app.register_blueprint(register_blueprint)
app.register_blueprint(auth_blueprint)
app.register_blueprint(project_blueprint)
app.register_blueprint(user_blueprint)
app.register_blueprint(profile_blueprint)


@app.errorhandler(Exception)
def handle_exception(error):
    message = [str(x) for x in error.args]
    status_code = 500
    success = False
    response = {
        'success': success,
        'error': {
            'type': error.__class__.__name__,
            'message': message
        }
    }

    return jsonify(response), status_code


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
