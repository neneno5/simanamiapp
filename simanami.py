from flask import Flask, render_template, request, redirect, url_for, session
import os
from dotenv import load_dotenv
from waitress import serve

app = Flask(__name__)

# .envファイルの読み込み
load_dotenv()
# Google Maps APIキーの取得
api_key = os.environ.get('GOOGLE_MAPS_API_KEY')
# パスワードの設定
password = os.environ.get('PASSWORD')

app.config['TEMPLATES_AUTO_RELOAD'] = True
# セッションの秘密鍵を設定
app.secret_key = os.environ.get('SECRET_KEY')

@app.route('/')
def home():
    # セッションにログイン情報がある場合は、ログイン済みとしてトップページにリダイレクトする
    if session.get('logged_in'):
        return redirect(url_for('index'))
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    # フォームから送信されたパスワードを取得
    password_input = request.form['password']
    # パスワードが正しい場合は、セッションにログイン情報を保存して、トップページにリダイレクトする
    if password_input == password:
        session['logged_in'] = True
        return redirect(url_for('index'))
    # パスワードが正しくない場合は、エラーメッセージを表示する
    else:
        error = 'Invalid password. Please try again.'
        return render_template('login.html', error=error)

@app.route('/logout')
def logout():
    # セッションからログイン情報を削除して、ログアウト画面を表示する
    session.pop('logged_in', None)
    return render_template('logout.html')

@app.route('/index')
def index():
    # セッションにログイン情報がない場合は、ログインページにリダイレクトする
    if not session.get('logged_in'):
        return redirect(url_for('home'))
    return render_template('index.html')

@app.route('/map1')
def map1():
    # セッションにログイン情報がない場合は、ログインページにリダイレクトする
    if not session.get('logged_in'):
        return redirect(url_for('home'))
    return render_template('map1.html', api_key=api_key)

@app.route('/map2')
def map2():
    # セッションにログイン情報がない場合は、ログインページにリダイレクトする
    if not session.get('logged_in'):
        return redirect(url_for('home'))
    return render_template('map2.html', api_key=api_key)

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=8080)
