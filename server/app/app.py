from flask import Flask, jsonify
from app.auth.auth import auth_blueprint
from app.sign_in_up.register import register_blueprint
from app.project.project import project_blueprint
from app.user.user import user_blueprint

app = Flask(__name__)
app.register_blueprint(register_blueprint)
app.register_blueprint(auth_blueprint)
app.register_blueprint(project_blueprint)
app.register_blueprint(user_blueprint)


@app.errorhandler(Exception)
def handle_exception(error):
    message = [str(x) for x in error.args]
    status_code = 500
    response = {
        'success': False,
        'error': {
            'type': error.__class__.__name__,
            'message': message
        }
    }

    return jsonify(response), status_code


if __name__ == '__main__':
   app.run(debug=True)
