// URL xuất bản của Google Sheets dưới dạng CSV
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS7MCRutPWh1Pq2KeZbr8HRJqzsT5MtlIr3aCDm_ZwCkcKpGnGAFzFiqJSTnIE1ybWJhYaapMwQPVj5/pub?output=csv';

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

let myChart, myHumidityChart, myLuxChart, myPressureChart, myPieChart; // Biến để lưu các biểu đồ

// Hàm lấy dữ liệu từ CSV và hiển thị biểu đồ
async function fetchWeatherData() {
    try {
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        const data = csvToJSON(csvText);

        if (data.length > 0) {
            // Chỉ lấy 10 giá trị cuối
            const last10Rows = data.slice(-10);

            // Tạo mảng nhãn (Ngày và Thời gian)
            const labels = last10Rows.map(row => row['Time']);

            // Tạo mảng dữ liệu nhiệt độ
            const temperatureData = last10Rows.map(row => {
                const temp = parseFloat(row['Tempurature']); // Đảm bảo tên cột đúng
                return isNaN(temp) ? null : temp;
            });

            const humidityData = last10Rows.map(row => parseFloat(row['Humidity']));
            const luxData = last10Rows.map(row => parseFloat(row['Lux']));
            const pressureData = last10Rows.map(row => parseFloat(row['Pressure']));

            // Cập nhật hoặc tạo biểu đồ nhiệt độ
            const ctx = document.getElementById('myChart').getContext('2d');
            if (myChart) {
                myChart.data.labels = labels;
                myChart.data.datasets[0].data = temperatureData;
                myChart.update();
            } else {
                myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Nhiệt độ (°C)',
                            data: temperatureData,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Ngày và Thời gian'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Nhiệt độ (°C)'
                                },
                                beginAtZero: false
                            }
                        }
                    }
                });
            }

            // Cập nhật hoặc tạo biểu đồ độ ẩm
            const ctxHumidity = document.getElementById('myHumidityChart').getContext('2d');
            if (myHumidityChart) {
                myHumidityChart.data.labels = labels;
                myHumidityChart.data.datasets[0].data = humidityData;
                myHumidityChart.update();
            } else {
                myHumidityChart = new Chart(ctxHumidity, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Độ ẩm (%)',
                            data: humidityData,
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Ngày và Thời gian'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Độ ẩm (%)'
                                },
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            // Cập nhật hoặc tạo biểu đồ độ sáng (Lux)
            const ctxLux = document.getElementById('myLuxChart').getContext('2d');
            if (myLuxChart) {
                myLuxChart.data.labels = labels;
                myLuxChart.data.datasets[0].data = luxData;
                myLuxChart.update();
            } else {
                myLuxChart = new Chart(ctxLux, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Độ sáng (Lux)',
                            data: luxData,
                            backgroundColor: 'rgba(255, 206, 86, 0.2)',
                            borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Ngày và Thời gian'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Độ sáng (Lux)'
                                },
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            // Cập nhật hoặc tạo biểu đồ áp suất
            const ctxPressure = document.getElementById('myPressureChart').getContext('2d');
            if (myPressureChart) {
                myPressureChart.data.labels = labels;
                myPressureChart.data.datasets[0].data = pressureData;
                myPressureChart.update();
            } else {
                myPressureChart = new Chart(ctxPressure, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Áp suất (hPa)',
                            data: pressureData,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Ngày và Thời gian'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Áp suất (hPa)'
                                },
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            // ================== Biểu đồ tròn cho cột "rain" ==================
            const rainData = data.map(row => parseInt(row['rain']));

            // Đếm số lần xuất hiện của giá trị 0 và 1
            const rainCount = {
                zero: rainData.filter(value => value === 0).length,
                one: rainData.filter(value => value === 1).length
            };

            // Tính tổng số bản ghi
            const total = rainCount.zero + rainCount.one;

            // Tính phần trăm cho 0 và 1
            const zeroPercentage = (rainCount.zero / total) * 100;
            const onePercentage = (rainCount.one / total) * 100;

            // Dữ liệu cho biểu đồ tròn
            const pieData = [zeroPercentage, onePercentage];

            // Vẽ biểu đồ tròn bằng Chart.js
            const ctxPie = document.getElementById('myPieChart').getContext('2d');
            if (myPieChart) {
                // Cập nhật biểu đồ nếu đã tồn tại
                myPieChart.data.datasets[0].data = pieData;
                myPieChart.update();
            } else {
                // Tạo mới biểu đồ tròn
                myPieChart = new Chart(ctxPie, {
                    type: 'pie',
                    data: {
                        labels: ['Không có mưa (0)', 'Có mưa (1)'],
                        datasets: [{
                            data: pieData,
                            backgroundColor: ['#36A2EB', '#FF6384'], // Màu sắc cho 0 và 1
                            hoverBackgroundColor: ['#36A2EB', '#FF6384']
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(tooltipItem) {
                                        return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + '%';
                                    }
                                }
                            }
                        }
                    }
                });
            }
            // ===============================================================
        } else {
            document.getElementById('weather-data').innerHTML = '<p>Không có dữ liệu.</p>';
        }
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu từ Google Sheets:', error);
        document.getElementById('weather-data').innerHTML = '<p>Có lỗi xảy ra khi tải dữ liệu.</p>';
    }
    
}

// Gọi hàm để tải dữ liệu khi trang được load
window.onload = () => {
    fetchWeatherData();
    // Lặp lại việc lấy dữ liệu mỗi 5 giây (5000 ms)
    setInterval(fetchWeatherData, 5000); // Cập nhật mỗi 5 giây
};
