from flask import Flask, render_template
from app.auth.auth import auth_blueprint
from app.sign_in_up.register import register_blueprint

app = Flask(__name__,)
app.register_blueprint(register_blueprint)
app.register_blueprint(auth_blueprint)


@app.route('/', methods=['GET'])
def start():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()