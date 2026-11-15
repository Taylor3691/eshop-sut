# Chạy lại luồng Playwright mô phỏng

Chạy từ thư mục gốc repository. Cần backend và storefront ở cổng 3000 và 5173. **Backend khởi động sẽ khởi tạo lại `backend/database.sqlite`;** hãy bảo đảm có bản sao khôi phục trước khi chạy.

```powershell
$runner = Join-Path $env:TEMP 'eshop-playwright'
npm install --prefix $runner --no-save playwright@1.65.1
& (Join-Path $runner 'node_modules/.bin/playwright.cmd') install chromium
$env:PLAYWRIGHT_MODULE = Join-Path $runner 'node_modules/playwright'
node task-2-usability-evaluation/evidence/simulated-runs/run-flow.cjs
```

Runner tạo browser context và tài khoản tổng hợp riêng cho mỗi nhãn, sau đó ghi ảnh, video và `run-results.json`. Chạy lại sẽ thêm đơn hàng vào CSDL đang dùng và thay các tệp bằng chứng cùng tên. Đây là automation, không phải nghiên cứu usability có người.

`generate_vietnamese_research_data.py` tạo hồ sơ persona, câu trả lời phỏng vấn và vector SUS hư cấu. Script này không điều khiển browser và không tạo ảnh/video. Mọi phản hồi đều gắn nhãn **SIMULATED DATA**, không được trình bày như nghiên cứu người dùng.
