from flask import Flask, render_template
import os
from dotenv import load_dotenv
from waitress import serve
from flask_httpauth import HTTPDigestAuth

app = Flask(__name__)

# .envファイルの読み込み
load_dotenv()
# Google Maps APIキーの取得
api_key = os.environ.get('GOOGLE_MAPS_API_KEY')
app.config['SECRET_KEY'] = 'secret key here'
auth = HTTPDigestAuth()
id_list = {
    'nene': os.environ.get('NENEpass'),
    'tosiki': os.environ.get('TOSIKIpass'),
    'user': os.environ.get('USERpass')
}

#入力されたidに該当するパスワードを比較のために取得する
@auth.get_password
def get_pw(id):
    if id in id_list:
        return id_list.get(id)
    return None

@app.route('/')
@auth.login_required
def index():
    return render_template('index.html') 

@app.route('/map1')
def map1():
    return render_template('map1.html', api_key=api_key)

@app.route('/islands')
def islands():
    return render_template('islands.html')

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=8080)
