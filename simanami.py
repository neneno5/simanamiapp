from flask import Flask, render_template
import os
from dotenv import load_dotenv

app = Flask(__name__)

# .envファイルの読み込み
load_dotenv()
# Google Maps APIキーの取得
api_key = os.environ.get('GOOGLE_MAPS_API_KEY')

app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/map1')
def map1():
    return render_template('map1.html', api_key=api_key)

@app.route('/map2')
def map2():
    return render_template('map2.html', api_key=api_key)

if __name__ == '__main__':
    app.run(port=8080)
