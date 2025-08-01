from flask import Flask, render_template, request, flash, redirect, url_for
# from flask_mail import Mail, Message   ← 더 이상 필요 없으면 삭제
import os
import requests      # ← 추가

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY","T5vKVcG0vc46FoHnTSnmaTL_8CV66RhjIDcyM2p_0so")


from dotenv import load_dotenv
load_dotenv() 


TELEGRAM_TOKEN   = os.environ.get("TELEGRAM_TOKEN")
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID")

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        print("▶ TELEGRAM_TOKEN:", TELEGRAM_TOKEN)
        print("▶ CHAT_ID       :", TELEGRAM_CHAT_ID)

        name     = request.form['name']
        email    = request.form['email']
        phone    = request.form['phone']
        company  = request.form.get('company', '—')
        position = request.form.get('position', '—')
        body     = request.form['message']
        attachment = request.files.get('attachment')

        # 텔레그램으로 보낼 메시지 조립
        text = (
            f"<b>📩 New Inquiry Received!</b>\n"
            f"────────────────────\n"
            f"👤 <b>Name</b>: {name}\n"
            f"📧 <b>Email</b>: {email}\n"
            f"📞 <b>Phone</b>: {phone}\n"
            f"🏢 <b>Company</b>: {company}\n"
            f"💼 <b>Position</b>: {position}\n"
            f"────────────────────\n"
            f"<i>Message:</i>\n{body}"
        )

        # sendMessage API 호출
        url_msg = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
        resp = requests.post(url_msg, data={
            'chat_id': TELEGRAM_CHAT_ID,
            'text': text,
            'parse_mode': 'HTML'
        })
        
        print("▶ STATUS:", resp.status_code)
        print("▶ RESPONSE BODY:", resp.text)
        
        # 3) 첨부파일이 있으면 sendDocument 로 전송
        if attachment and attachment.filename:
            file_bytes = attachment.read()
            url_doc = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendDocument"
            files = {
                'document': (attachment.filename, file_bytes)
            }
            data = {'chat_id': TELEGRAM_CHAT_ID}
            resp2 = requests.post(url_doc, data=data, files=files)

        if resp.status_code == 200:
            flash('Your message has been sent to Chloe! 👍', 'success')
        else:
            flash('Failed to send Telegram notification. 🚨', 'danger')

        return redirect(url_for('contact'))

    return render_template('contact.html')


# 홈 페이지
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/resume')
def resume():
    return render_template('resume.html')

@app.route('/projects/<slug>')
def project_detail(slug):
    # slug에 맞는 템플릿이 templates/projects/{slug}.html 여야 함
    return render_template(f'projects/{slug}.html')


if __name__ == '__main__':
    # 실제 배포 때는 debug=False
    app.run(debug=True, host='0.0.0.0', port=5000)