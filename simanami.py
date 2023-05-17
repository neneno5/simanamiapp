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

@app.route('/overview')
def overview():
    return render_template('overview.html')


@app.route('/islands1')
def islands1():
    return render_template('islands1.html')

# 目次2のページの表示
@app.route('/islands2')
def islands2():
    return render_template('islands2.html')

# 目次3のページの表示
@app.route('/islands3')
def islands3():
    return render_template('islands3.html')

# 目次4のページの表示
@app.route('/islands4')
def islands4():
    return render_template('islands4.html')

# 目次5のページの表示
@app.route('/islands5')
def islands5():
    return render_template('islands5.html')

# 目次6のページの表示
@app.route('/islands6')
def islands6():
    return render_template('islands6.html')

@app.route('/islands')
def islands():
    return render_template('islands.html')

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=8080)
