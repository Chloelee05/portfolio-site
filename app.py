from flask import Flask, render_template

app = Flask(__name__)

# 홈 페이지
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    # 실제 배포 때는 debug=False
    app.run(debug=True, host='0.0.0.0', port=5000)