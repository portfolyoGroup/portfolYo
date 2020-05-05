from flask import Flask
from auth.auth import auth_blueprint
from sign_in_up.register import register_blueprint

app = Flask(__name__,)
app.register_blueprint(register_blueprint)
app.register_blueprint(auth_blueprint)


if __name__ == '__main__':
    app.run(debug=True)
