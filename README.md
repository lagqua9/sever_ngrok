# run-ngrok
# Hướng dẫn chạy Ngrok với Flask

## Cài đặt thư viện

Trước tiên, bạn cần cài đặt Flask bằng lệnh sau:

```bash
pip install Flask
//Bước 1: Tải về Ngrok
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-arm.zip
Bước 2: Giải nén file zip vừa tải
unzip ngrok-v3-stable-linux-arm.zip
Bước 3: Cấp quyền thực thi cho file Ngrok
chmod +x ngrok
Bước 4: Chạy Ngrok để mở cổng 5000
./ngrok http 5000 (đi tới đường dẫn để đăng ký tài khoản và lấy token)
Bước 5: Cấu hình Authtoken cho Ngrok
./ngrok config add-authtoken <your-authtoken>
Sau đó, chạy lại lệnh:
./ngrok http 5000
Để dừng chương trình, nhấn tổ hợp phím Ctrl + C
