from flask import Flask
from auth.auth import auth_blueprint
from sign_in_up.register import register_blueprint
# from user.user import user_blueprint

app = Flask(__name__,)
app.register_blueprint(register_blueprint)
app.register_blueprint(auth_blueprint)
# app.register_blueprint(user_blueprint)


if __name__ == '__main__':
    app.run(debug=True)
