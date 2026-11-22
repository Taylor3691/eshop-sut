# Review test plan — 23120175_SearchLoad_20261122

Soát `23120175_SearchLoad_20261122.jmx` theo toàn bộ mục A và B của `references/pitfalls.md`, trước lần chạy thử. Plan là Load ngắn, nhóm read-only, không login.

## Việc đã sửa

| Vấn đề | Sửa | Vì sao dễ bỏ sót |
|---|---|---|
| `reset_sut.sh` gán `SEED_CMD="${SEED_CMD:-...}"`. Chuỗi rỗng vẫn bị coi là chưa gán, nên `SEED_CMD=` vẫn chạy `create_users.sh` (lần gọi đầu tạo 200 user vào `data/users.csv` ở gốc repo; file đó đã xóa). | Đổi thành `${SEED_CMD-...}`. `SEED_CMD=` bỏ qua seed. Lần reset sau chỉ còn 2 user seed (`admin`, `test`). | Dòng `if [[ -n "$SEED_CMD" ]]` nhìn như đã xử lý chuỗi rỗng, nhưng phép `:-` chạy trước và lấp lại giá trị mặc định. |

Plan không phải sửa thêm sau checklist. Các mục dưới là kết quả soát, không phải lỗi còn mở.

## A. Thiết kế

| # | Kết quả |
|---|---|
| A1 | Không chỉ kiểm tra HTTP 200. `01_Categories`: `$[0].id = 1`, `$[0].name = Điện thoại`, `$[2].name = Phụ kiện`. `02_Search`: response là mảng JSON; `expect_hit=1` thì có ít nhất một phần tử và mọi `name` chứa từ khóa (so sau `toLowerCase`); `expect_hit=0` thì mảng rỗng. `03_ProductDetail`: `$.id` khớp `product_id`. Id không tồn tại trả 200 `{}` sẽ fail assertion này; CSV chỉ có id 1–5 nên lỗi đó không lẫn vào số hiệu năng. |
| A2 | If Controller sau `01` và sau `02`: sample trước fail thì `TestAction` action `3` (`RESTART_NEXT_LOOP` trong JMeter 5.6.3) bắt đầu vòng mới. Bước sau không dùng giá trị trích từ bước trước. |
| A3 | Không có JSON extractor. `product_id` lấy từ CSV, không lấy `$[0].id` của search. Search rỗng không có id để trích; default kiểu `NOT_FOUND` sẽ bị gắn vào URL. |
| A4 | Không có setUp lockout và không có login. Nhóm này không đụng `login_attempts`. Giữ setUp sẽ đo nhầm một bug auth vào bài read-only. |
| A5 | Đặc tả (`api_specification.md` mục 3.1) nói search theo tên. Code search `name` bằng `LIKE`, không search `description`. `Điện thoại`, `Laptop`, `Phụ kiện` nằm ở category hoặc mô tả nên `expect_hit=0` là đúng đặc tả, không phải bug. Ba lệch code/đặc tả ghi ở `ANALYSIS.md`: id lạ trả 200 `{}`; id chẵn đổi `price` thành chuỗi; `search` được nối thẳng vào SQL. |
| A6 | `data/keywords_negative.csv` để ngoài plan: `'` (HTTP 500, body HTML lộ `SQLITE_ERROR`), `%` và `_` (wildcard của `LIKE`, khớp mọi tên). Assertion `name.contains(keyword)` sẽ fail với `%` dù server trả cả 5 sản phẩm. Không đưa ba từ này vào tải chính. Không assert kiểu của `price`: id 2 và 4 luôn trả chuỗi, gắn assertion đó sẽ biến bug chức năng thành khoảng 40% lỗi hiệu năng. |
| A7 | 3 request/vòng, 2 timer Uniform Random (offset 0 ms, range 50 ms) trước bước 02 và 03. Think trung bình một vòng ≈ 2 × 25 ms = 50 ms. Chưa đo thời gian xử lý của nhóm này trước khi chạy; giả thuyết vài ms/request. Ước lượng ≈ 3 / 0,056 s ≈ 50 request/s mỗi thread, 30 thread ≈ 1.500 request/s. Luồng 5 bước ngày 21/11 (khác nhóm endpoint) bão hòa khoảng 11.400 request/s khi bỏ think-time. 1.500 request/s nằm dưới mức đó. Không tăng thread: đề chốt 30 thread cho một Load demo. |
| A8 | Không có kịch bản Spike. |
| A9 | Thread Group thường, scheduler. `duration` 120 s tính từ lúc bắt đầu, gồm 10 s ramp-up. Không dùng công thức bậc của Stepping Thread Group. |

## B. Môi trường

| # | Kết quả |
|---|---|
| B1 | Think-time 0–50 ms. Lệnh chạy có `-Jhttpclient.reset_state_on_thread_group_iteration=false`. Keep-alive bật. |
| B2 | Trước mỗi lần chạy: dừng process cổng 3000, `node server.js` mới (`initDatabase()` DROP và seed lại), chờ `GET /api/products/1` trả 2xx, không gọi `create_users.sh`. Script `reset_sut.sh` tự thoát sau health check; process con bị hủy khi shell lệnh kết thúc (kể cả `setsid`/`nohup`). Cách giữ SUT sống trong phiên này: `node server.js` là lệnh nền không thoát. |
| B3 | Xóa file `.jtl` và thư mục report trước lần chạy thật. |
| B4 | JMeter và Node cùng máy (MacBook Air M5, 10 nhân, 16 GB). Ghi RSS của Node trong lúc chạy. Không coi throughput là năng lực của riêng backend. |
| B5 | Bài 120 s, có `caffeinate -d -i -u`. Không phải Soak. Hạ xung nhiệt là giả thuyết chưa có việc cần loại trừ, trừ khi p95 trượt theo thời gian. |
| B6 | Ước lượng từ lần chạy thử: khoảng 4.400 sample / 30 s / 3 thread. Nhân 10 lần thread và 4 lần thời lượng ≈ 1,8×10⁵ sample, cỡ vài chục MB. Nén nếu file vượt 100 MB. |

Listener của plan: Aggregate Report (cùng loại với Load đã nộp). Một kịch bản, không có yêu cầu listener khác.

Đường dẫn CSV là `${__P(...,data/*.csv)}`. `shrink_plan.py` không đổi đường dẫn bắt đầu bằng `$`. JMeter chạy với thư mục làm việc `hw05/skill-demo/search`.
