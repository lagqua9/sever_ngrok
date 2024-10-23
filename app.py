from flask import Flask, render_template

app = Flask(__name__, template_folder='templates') # "web" đi tới thư mục này

@app.route('/')
def home():
    return render_template('index.html')#tìm file index.html để chạy

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)