from flask import Flask
from app.auth.auth import auth_blueprint
# from auth import auth_blueprint
from app.sign_in_up.register import register_blueprint
# from  import register_blueprint
from app.project.project import project_blueprint
# from user.user import user_blueprint

app = Flask(__name__,)
app.register_blueprint(register_blueprint)
app.register_blueprint(auth_blueprint)
app.register_blueprint(project_blueprint)
# app.register_blueprint(user_blueprint)


if __name__ == '__main__':
    app.run(debug=True)
