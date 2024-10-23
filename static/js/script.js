// URL xuất bản của Google Sheets dưới dạng CSV
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS7MCRutPWh1Pq2KeZbr8HRJqzsT5MtlIr3aCDm_ZwCkcKpGnGAFzFiqJSTnIE1ybWJhYaapMwQPVj5/pub?output=csv'; // Thay bằng URL của bạn

// Hàm chuyển đổi CSV thành JSON
function csvToJSON(csv) {
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j];
        }

        result.push(obj);
    }

    return result;
}

// Hàm lấy dữ liệu từ CSV và hiển thị
async function fetchWeatherData() {
    try {
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        const data = csvToJSON(csvText);

        const weatherDataElement = document.getElementById('weather-data');

        if (data.length > 0) {
            // Chỉ lấy 10 giá trị cuối
            const last10Rows = data.slice(-10);

            // Hiển thị dữ liệu lên trang web
            let weatherHTML = '<table border="1"><tr><th>Ngày</th><th>Thời gian</th><th>Nhiệt độ (°C)</th><th>Áp suất (hPa)</th><th>Độ ẩm (%)</th><th>Lux</th><th>Lượng mưa (mm)</th></tr>';

            last10Rows.forEach(row => {
                weatherHTML += `<tr>
                    <td>${row['Date']}</td>
                    <td>${row['Time']}</td>
                    <td>${row['Temperature']}°C</td>
                    <td>${row['Pressure']} hPa</td>
                    <td>${row['Humidity']}%</td>
                    <td>${row['Lux']}</td>
                    <td>${row['Rain']} mm</td>
                </tr>`;
            });

            weatherHTML += '</table>';
            weatherDataElement.innerHTML = weatherHTML;
        } else {
            weatherDataElement.innerHTML = '<p>Không có dữ liệu.</p>';
        }
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu từ Google Sheets:', error);
        document.getElementById('weather-data').innerHTML = '<p>Có lỗi xảy ra khi tải dữ liệu.</p>';
    }
}

// Gọi hàm để tải dữ liệu khi trang được load
window.onload = fetchWeatherData;
