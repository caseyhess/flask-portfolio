from flask import Flask, render_template, url_for
import json
import os

app = Flask(__name__)

@app.route('/')
def index():
    with open(os.path.join('static', 'data', 'projects.json')) as f:
        projects = json.load(f)
    return render_template('index.html', projects=projects)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
