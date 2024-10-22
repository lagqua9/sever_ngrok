# run-ngrok
'''cách chạy ngrok
cài thư viện:
+"pip install Flask"
b1 tải về:
+ "wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-arm.zip"
b2 giải nén file zip vừa tải:
+ unzip ngrok-v3-stable-linux-arm.zip
b3 cấp quyền:
+ chmod +x ngrok
b4 chạy ngrok để mở cổng 5000:
+ ./ngrok http 5000 (đi tới đường dẫn để đăng ký tài khoản và lấy token)
+ sau khi có token nhập lệnh "./ngrok config add-authtoken <your-authtoken>" thay<your-authtoken>
rồi chạy lại lệnh: + ./ngrok http 5000
nhấn CTR + C để dung chương trình'''
