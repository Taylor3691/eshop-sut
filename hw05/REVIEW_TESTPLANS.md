# Review 3 test plan JMeter (bước 7 – human review)

Plan được review:

- `23120175_Load_20261121.jmx` (commit `2abb497`)
- `23120175_Stress_20261121.jmx` (commit `135b3c3`)
- `23120175_Spike_20261121.jmx` (commit `e2e87ba`)

Mức độ: **Cao** = làm sai số liệu hoặc che bug · **Trung bình** = làm yếu kết quả hoặc khó giải thích · **Thấp** = trình bày, đặt tên.

## 1. Kết quả soát theo tiêu chí

### 1.1 Ramp-up / think-time


| #   | Plan          | Vấn đề                                                                                                                                                                                               | Mức độ     |
| --- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| R1  | Stress, Spike | Think-time 200–500 ms giữa các bước, nhanh hơn người thật nhiều. Với Stress thì chấp nhận được (mục tiêu là đẩy tải), nhưng báo cáo phải ghi rõ con số "thread" không tương đương "người dùng thật". | Trung bình |
| R2  | Cả 3          | Không có think-time giữa Checkout và Login của vòng lặp sau. Vừa thanh toán xong, thread đăng nhập lại ngay.                                                                                         | Thấp       |
| R3  | Spike         | Sau spike chỉ còn khoảng 40 giây tải nền (140–180 s). Quá ngắn để kết luận hệ thống đã phục hồi.                                                                                                     | Trung bình |
| R4  | Spike         | Timer đặt tên `Stress think time before 0x` (copy từ plan Stress).                                                                                                                                   | Thấp       |


### 1.2 Số thread


| #   | Plan          | Vấn đề                                                                                                                                                                                                                                                                       | Mức độ |
| --- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| T1  | Load          | 30 thread, ramp-up 60 s, 600 s là hợp lý (khoảng 17 request/giây). Không có vấn đề.                                                                                                                                                                                          | –      |
| T2  | Stress        | Đỉnh 200 thread đúng bằng số user trong `users.csv` (200), nên không còn dư để mở rộng. Nếu cần tăng thêm thì phải tạo thêm user.                                                                                                                                            | Thấp   |
| T3  | Stress, Spike | Dùng Stepping Thread Group và Ultimate Thread Group (plugin `jpgc-casutg`). Máy đã cài plugin (`jmeter-plugins-casutg-3.1.1.jar`), nhưng báo cáo cần ghi rõ yêu cầu này. Stepping Thread Group đã bị plugin đánh dấu deprecated, nên dùng Concurrency Thread Group thay thế. | Thấp   |


### 1.3 Độ chặt của assertion


| #   | Plan | Vấn đề                                                                                                                                                                                                                                                                                                | Mức độ  |
| --- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| A1  | Cả 3 | `04_ApplyCoupon` chỉ kiểm tra `success = true`. **Đã xác minh:** `SAVE10` với `total_amount` 4.000.000 trả `discount_amount = -36000000`, `final_amount = 40000000` (tăng gấp 10 lần), nhưng `success` vẫn là `true`. Assertion để lọt bug và checkout ghi đơn sai tiền trong khoảng 1/3 số vòng lặp. | **Cao** |
| A2  | Cả 3 | Không có Duration Assertion, nên các ngưỡng p95 đã chọn ở bước 3 không được kiểm tra tự động.                                                                                                                                                                                                         | Thấp    |
| A3  | Cả 3 | `02_ProductDetail` kiểm tra đúng `$.id`. Tốt. Riêng sản phẩm id chẵn trả `price` dạng chuỗi (lỗi chức năng): nên log bug, không assert trong perf test.                                                                                                                                               | Thấp    |


### 1.4 Xử lý account lockout


| #   | Plan          | Vấn đề                                                                                                                                                                                                                                             | Mức độ     |
| --- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| L1  | Load          | Không xử lý trường hợp login thất bại. `on_sample_error = continue` và token mặc định là `TOKEN_NOT_FOUND`, nên mỗi lần login lỗi sinh thêm 2 lỗi 403 "Forbidden" ở `03_AddToCart` và `05_Checkout`. Lỗi bị đếm 3 lần và đổ sai cho cart/checkout. | **Cao**    |
| L2  | Stress, Spike | Chỉ bỏ qua vòng lặp khi login trả **403**. Login trả 401, 500 hoặc timeout (có thể xảy ra khi quá tải) vẫn chạy tiếp các bước sau và lỗi bị nhân lên như L1.                                                                                       | **Cao**    |
| L3  | Stress, Spike | Phần xử lý 403 không bao giờ được kích hoạt: mọi user trong CSV dùng đúng mật khẩu, và login đúng sẽ reset `login_attempts`. Plan **không thực sự kiểm thử** hành vi lockout (khóa sau 2 lần sai thay vì 3, mở sau 180 s).                         | Trung bình |
| L4  | Cả 3          | Không có hướng dẫn reset lockout trong plan. Cách reset: khởi động lại backend, rồi chạy lại `scripts/create_users.sh`.                                                                                                                            | Thấp       |


### 1.5 Tham số hóa CSV


| #   | Plan | Vấn đề                                                                                                                                                                                                        | Mức độ     |
| --- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| C1  | Cả 3 | 3 CSV dùng `shareMode.all` và `recycle = true` là đúng, đường dẫn tương đối `data/...` cũng đúng.                                                                                                             | –          |
| C2  | Cả 3 | `coupons.csv` chứa `SAVE10`, mã đang dính bug A1, nên 1/3 số đơn hàng có tổng tiền sai. Cần quyết định: bỏ `SAVE10` khỏi tải chính và log bug riêng, hoặc giữ lại kèm assertion và chấp nhận error rate tăng. | Trung bình |
| C3  | Cả 3 | Tên sản phẩm trong body add-to-cart cố định (`"Load test product"`), không lấy từ CSV. Không ảnh hưởng server (server không kiểm tra), nhưng dữ liệu kém thực tế.                                             | Thấp       |


### 1.6 Correlation token


| #   | Plan | Vấn đề                                                                                                                                                                                                                                                                                   | Mức độ  |
| --- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| K1  | Cả 3 | Trích `$.token` và gắn `Bearer ${token}` cho 03 và 05 là đúng. `apply-coupon` không cần token, đúng với code.                                                                                                                                                                            | –       |
| K2  | Cả 3 | Khi `04_ApplyCoupon` lỗi, `final_amount = FINAL_AMOUNT_NOT_FOUND` khiến body checkout không còn là JSON hợp lệ. **Đã xác minh:** server trả **400 kèm trang HTML stack trace** (lộ đường dẫn thư mục của server). Lỗi bị nhân đôi, và response này là một lỗi bảo mật nên log thành bug. | **Cao** |


### 1.7 Listener


| #   | Plan | Vấn đề                                                                                                                                               | Mức độ |
| --- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| V1  | –    | Load dùng Aggregate Report, Stress dùng Summary Report, Spike dùng View Results Tree (chỉ log lỗi). **Không trùng.**                                 | –      |
| V2  | Cả 3 | Chạy non-GUI (`-n`) thì listener không hiển thị. Muốn chụp ảnh listener, phải mở plan trong GUI và nạp file `.jtl` vào listener tương ứng (Browse…). | Thấp   |


### 1.8 Đặt tên file


| #   | Plan | Vấn đề                                                                                     | Mức độ |
| --- | ---- | ------------------------------------------------------------------------------------------ | ------ |
| N1  | –    | Tên file và `testname` của Test Plan đều đúng mẫu `23120175_{Load,Stress,Spike}_20261121`. | –      |


## 2. Bảng "AI sai/thiếu – sửa – vì sao bỏ sót" (cho báo cáo)

| #   | AI sai/thiếu gì                                                                                                     | Sửa thế nào                                                                                                                                                                                                                                                         | Vì sao AI bỏ sót                                                                                                                                                                                                                                                                |
| --- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Assertion `04_ApplyCoupon` chỉ kiểm tra `success = true`, để lọt bug `SAVE10` (`final_amount` gấp 10 lần tổng tiền) | Thêm JSR223 Assertion (đặt đầu tiên để thông báo lỗi được ghi vào `.jtl` dạng CSV) kiểm tra `discount_amount >= 0` và `final_amount <= total_amount`. Bỏ `SAVE10` khỏi `coupons.csv` cho tải chính, log bug riêng                                                   | **Đặc thù endpoint:** response "trông" thành công (200, `success: true`, message "Giảm 10%"). **Prompt:** chỉ yêu cầu "kiểm tra trường quan trọng", không yêu cầu kiểm tra tính đúng của số tiền. AI dừng ở mức hợp đồng API, không kiểm tra ngữ nghĩa nghiệp vụ                |
| 2   | Load không xử lý login thất bại, nên một lỗi login thành 3 lỗi và đổ sai cho cart/checkout                          | Thêm If Controller ngay sau `01_Login` với điều kiện `${__jexl3("${JMeterThread.last_sample_ok}" == "false",)}`, chứa Flow Control Action "Start Next Thread Loop". Thêm JSR223 PostProcessor đổi nhãn login 403 thành `01_Login_403_Locked`. Áp dụng cho cả 3 plan | **Prompt:** chỉ yêu cầu xử lý lockout ở bước Stress, không yêu cầu ở bước Load, nên AI chỉ thêm khi được nhắc. **Giới hạn model:** sinh từng plan độc lập, không tự đồng bộ cách xử lý giữa các plan                                                                            |
| 3   | Stress/Spike chỉ bỏ qua vòng lặp khi login trả 403, còn 401/500/timeout vẫn chạy tiếp                               | Đổi điều kiện If Controller từ `${login_locked}` sang `last_sample_ok == false` (bao mọi lỗi: sai mã, thiếu token, timeout). Vẫn giữ nhãn riêng cho 403                                                                                                             | **Prompt** nói đúng "khi login trả về 403", AI làm đúng nghĩa đen, không suy rộng sang các lỗi khác khi quá tải                                                                                                                                                                 |
| 4   | Xử lý lockout có nhưng không bao giờ chạy: mọi user đúng mật khẩu nên không kiểm thử được hành vi lockout           | Thêm setUp Thread Group (1 thread, 1 lần) với tài khoản riêng `lockcheck_<time>@eshop.com`: đăng ký, sai mật khẩu 2 lần (assert 401), rồi đúng mật khẩu (assert 200 theo đặc tả FR-02). Kết quả chạy thử: lần 3 trả **403**, tức khóa sau **2** lần sai thay vì 3   | **Đặc thù endpoint:** code dùng `login_attempts + 2` và khóa khi `>= 3`, khác đặc tả "3 lần sai". **Prompt:** ở bước 1 AI đã phân tích đúng bộ đếm, nhưng prompt sinh plan chỉ yêu cầu "xử lý" 403 chứ không yêu cầu "kiểm thử" lockout, nên AI không đưa phát hiện đó vào plan |
| 5   | Khi apply-coupon lỗi, checkout gửi JSON hỏng; server trả 400 kèm stack trace HTML                                   | Thêm If Controller trước `05_Checkout`: nếu `04_ApplyCoupon` thất bại (kể cả assertion số tiền) thì Start Next Thread Loop. Log bug "lộ stack trace"                                                                                                                | **Giới hạn model:** AI dùng giá trị mặc định để tránh lỗi trích xuất nhưng không lần theo hậu quả ở bước sau. **Đặc thù endpoint:** Express trả trang lỗi HTML mặc định, AI không chạy thử nên không thấy                                                                       |
| 6   | Think-time Stress/Spike 200–500 ms, không thực tế với người dùng                                                    | Giữ cho Stress (có chủ đích), ghi rõ trong báo cáo. Spike tăng lên 500–1500 ms để giữ hành vi gần thật                                                                                                                                                              | **Prompt** yêu cầu "tăng đến khi lỗi", AI tối ưu cho việc đẩy tải mà bỏ qua tính thực tế                                                                                                                                                                                        |
| 7   | Spike phục hồi quá ngắn (khoảng 40 s sau spike)                                                                     | Tăng `hold` của dòng nền trong Ultimate Thread Group để có ít nhất 90–120 s sau spike                                                                                                                                                                               | **Giới hạn model:** AI rút ngắn tổng thời lượng để "gọn", không cân nhắc mục đích quan sát phục hồi                                                                                                                                                                             |


## 3. Kiểm chứng sau khi sửa

Chạy thử bản Load (rút gọn 3 thread, 20 giây) và bản Stress (rút gọn 2 thread, cố ý cho 1 user sai mật khẩu) trên backend cổng 3000:

- `LOCK_02`, `LOCK_03` trả 401; `LOCK_04` (đúng mật khẩu) trả **403** và bị đánh failed: xác nhận bug khóa sau 2 lần sai.
- Có `SAVE10` trong CSV thử: `04_ApplyCoupon` failed với thông báo `Sai số tiền: code=SAVE10, total=6000000, discount=-54000000, final=60000000`, và vòng lặp đó **không** gọi checkout (7 lần áp mã, 2 lỗi, 5 checkout).
- Login trả 401: vòng lặp dừng ngay, không phát sinh lỗi 403 ở cart/checkout (11 login thành công, 11 lần xem sản phẩm).
- `coupons.csv` chính chỉ còn `BIGBUY` và `VIP100`; `SAVE10` để dành cho bug report.
- Bản Spike chưa chạy thử (chỉ kiểm tra XML hợp lệ); thay đổi cấu trúc giống hệt Stress.

> Đính chính: trước đó Claude từng khẳng định tài khoản "bị khóa sau 1 lần sai". Chạy thử thực tế cho thấy **khóa sau 2 lần sai** (0 → 2 chưa khóa, 2 → 4 thì khóa). Phân tích ở bước 1 (Cursor) đã nói đúng điều này.