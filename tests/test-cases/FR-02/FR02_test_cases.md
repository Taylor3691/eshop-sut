# FR02 Test Cases

## Quy ước

- Mỗi test case tập trung vào **một miền**.
- Các trường không phải miền đang kiểm thử sử dụng dữ liệu hợp lệ.
- `Result` ghi kết quả thực tế sau khi chạy.
- `Response` chỉ nhận `PASS` hoặc `FAILED` sau khi thực thi.
- Tài khoản hợp lệ mặc định: `test@eshop.com` / `Test1234!`.

## Test cases

| ID | Mô tả ngắn | Các trường và dữ liệu kiểm thử | Expect | Result | Response |
|---|---|---|---|---|---|
| TC-FR02-001 | Kiểm tra email rỗng | Email: `""`<br>Password: `Test1234!` | Hệ thống từ chối input email và không đăng nhập | Chưa thực hiện | PASS / FAILED |
| TC-FR02-002 | Kiểm tra email sai định dạng | Email: `test`<br>Password: `Test1234!` | Email bị validate từ chối, không tạo JWT | Chưa thực hiện | PASS / FAILED |
| TC-FR02-003 | Kiểm tra email thiếu domain | Email: `user@`<br>Password: `Test1234!` | Email bị validate từ chối, không tạo JWT | Chưa thực hiện | PASS / FAILED |
| TC-FR02-004 | Kiểm tra email hợp lệ nhưng chưa đăng ký | Email: `unknown@example.com`<br>Password: `Test1234!` | Đăng nhập thất bại, không tạo JWT, không tiết lộ chi tiết tài khoản | Chưa thực hiện | PASS / FAILED |
| TC-FR02-005 | Kiểm tra email hợp lệ đã đăng ký | Email: `test@eshop.com`<br>Password: `Test1234!` | Đăng nhập thành công và trả JWT | Chưa thực hiện | PASS / FAILED |
| TC-FR02-006 | Kiểm tra mật khẩu rỗng | Email: `test@eshop.com`<br>Password: `""` | Đăng nhập thất bại và không tạo JWT | Chưa thực hiện | PASS / FAILED |
| TC-FR02-007 | Kiểm tra mật khẩu không khớp | Email: `test@eshop.com`<br>Password: `WrongPass123!` | Đăng nhập thất bại, bộ đếm tăng đúng 1, thông báo không lộ chi tiết | Chưa thực hiện | PASS / FAILED |
| TC-FR02-008 | Kiểm tra mật khẩu đúng | Email: `test@eshop.com`<br>Password: `Test1234!` | Đăng nhập thành công và trả JWT | Chưa thực hiện | PASS / FAILED |
| TC-FR02-009 | Kiểm tra bộ đếm tăng đúng 1 | Thực hiện một lần đăng nhập sai với email hợp lệ và mật khẩu sai | Bộ đếm chuyển từ `0` thành `1` | Chưa thực hiện | PASS / FAILED |
| TC-FR02-010 | Kiểm tra bộ đếm không được giữ nguyên | Trạng thái ban đầu: `login_attempts = 0`<br>Thực hiện một lần đăng nhập sai | Bộ đếm không được giữ nguyên ở `0` | Chưa thực hiện | PASS / FAILED |
| TC-FR02-011 | Kiểm tra bộ đếm không tăng nhiều hơn 1 | Trạng thái ban đầu: `login_attempts = 0`<br>Thực hiện một lần đăng nhập sai | Bộ đếm không được tăng thành `2` hoặc giá trị lớn hơn | Chưa thực hiện | PASS / FAILED |
| TC-FR02-012 | Kiểm tra chưa đạt ngưỡng khóa | Tài khoản có `2` lần sai liên tiếp<br>Đăng nhập lần tiếp theo với mật khẩu đúng | Tài khoản chưa bị khóa trước khi đạt ngưỡng; đăng nhập đúng được chấp nhận | Chưa thực hiện | PASS / FAILED |
| TC-FR02-013 | Kiểm tra đúng ngưỡng khóa | Tài khoản có `3` lần sai liên tiếp<br>Thử đăng nhập lại | Tài khoản bị khóa tạm thời và đăng nhập bị từ chối | Chưa thực hiện | PASS / FAILED |
| TC-FR02-014 | Kiểm tra vượt ngưỡng khóa | Tài khoản có `4` lần sai liên tiếp<br>Thử đăng nhập lại | Tài khoản vẫn bị khóa trong thời gian quy định | Chưa thực hiện | PASS / FAILED |
| TC-FR02-015 | Kiểm tra tài khoản còn khóa ở giây 29 | Tài khoản vừa bị khóa<br>Thời gian đã qua: `29 giây` | Đăng nhập bị từ chối vì tài khoản vẫn đang khóa | Chưa thực hiện | PASS / FAILED |
| TC-FR02-016 | Kiểm tra tại đúng mốc 30 giây | Tài khoản vừa bị khóa<br>Thời gian đã qua: `30 giây` | Hệ thống xử lý đúng theo quy định tại mốc 30 giây; cần xác nhận mốc bao gồm hay không bao gồm | Chưa thực hiện | PASS / FAILED |
| TC-FR02-017 | Kiểm tra sau khi hết thời gian khóa | Tài khoản vừa bị khóa<br>Thời gian đã qua: `31 giây`<br>Password đúng | Tài khoản được phép thử đăng nhập lại | Chưa thực hiện | PASS / FAILED |
| TC-FR02-018 | Kiểm tra đăng nhập thành công | Email: `test@eshop.com`<br>Password: `Test1234!` | Phản hồi thành công chứa JWT hợp lệ | Chưa thực hiện | PASS / FAILED |
| TC-FR02-019 | Kiểm tra email không tồn tại | Email: `unknown@example.com`<br>Password: `Test1234!` | Phản hồi lỗi, không tạo JWT và không tiết lộ email có tồn tại hay không | Chưa thực hiện | PASS / FAILED |
| TC-FR02-020 | Kiểm tra mật khẩu sai | Email: `test@eshop.com`<br>Password: `WrongPass123!` | Phản hồi lỗi, bộ đếm tăng 1, không tạo JWT | Chưa thực hiện | PASS / FAILED |
| TC-FR02-021 | Kiểm tra tài khoản đang bị khóa | Tài khoản có trạng thái khóa<br>Email và password đúng | Phản hồi lỗi phù hợp, không đăng nhập và không tạo JWT | Chưa thực hiện | PASS / FAILED |
| TC-FR02-022 | Kiểm tra JWT hợp lệ | Đăng nhập thành công bằng dữ liệu hợp lệ<br>JWT nhận được từ phản hồi | JWT tồn tại, có thể dùng cho request cần xác thực | Chưa thực hiện | PASS / FAILED |
| TC-FR02-023 | Kiểm tra JWT rỗng | Đăng nhập thành công<br>Kiểm tra trường `token` | Trường token không được rỗng | Chưa thực hiện | PASS / FAILED |
| TC-FR02-024 | Kiểm tra thiếu JWT | Đăng nhập thành công<br>Phản hồi không có trường `token` | Phản hồi bị xem là không hợp lệ đối với yêu cầu đăng nhập thành công | Chưa thực hiện | PASS / FAILED |
| TC-FR02-025 | Kiểm tra header không có token | Gọi API cần xác thực<br>Không gửi `Authorization` | Request bị từ chối xác thực | Chưa thực hiện | PASS / FAILED |
| TC-FR02-026 | Kiểm tra header sai scheme | Gọi API cần xác thực<br>`Authorization: Token abc123` | Request bị từ chối vì header không có scheme Bearer | Chưa thực hiện | PASS / FAILED |
| TC-FR02-027 | Kiểm tra header Bearer hợp lệ | Gọi API cần xác thực<br>`Authorization: Bearer <valid-token>` | Request được xác thực nếu token hợp lệ | Chưa thực hiện | PASS / FAILED |
| TC-FR02-028 | Kiểm tra token không hợp lệ | Gọi API cần xác thực<br>`Authorization: Bearer invalid-token` | Request bị từ chối xác thực | Chưa thực hiện | PASS / FAILED |
| TC-FR02-029 | Kiểm tra trường email dùng HTML5 email | Mở form đăng nhập<br>Kiểm tra thuộc tính input email | Trường email có `type="email"` | Chưa thực hiện | PASS / FAILED |
| TC-FR02-030 | Kiểm tra HTML5 với email rỗng | Email trên form: `""`<br>Password hợp lệ | Form không cho gửi nếu trường bắt buộc | Chưa thực hiện | PASS / FAILED |
| TC-FR02-031 | Kiểm tra HTML5 với chuỗi không phải email | Email trên form: `abc`<br>Password hợp lệ | Trình duyệt từ chối định dạng email | Chưa thực hiện | PASS / FAILED |
| TC-FR02-032 | Kiểm tra HTML5 với email hợp lệ | Email trên form: `abc@example.com`<br>Password hợp lệ | Trình duyệt chấp nhận định dạng email | Chưa thực hiện | PASS / FAILED |
| TC-FR02-033 | Kiểm tra phản hồi thành công có JWT | Email và password hợp lệ | Response có dạng phản hồi thành công và chứa `token` hợp lệ | Chưa thực hiện | PASS / FAILED |
| TC-FR02-034 | Kiểm tra response thành công thiếu JWT | Email và password hợp lệ<br>Kiểm tra response không có `token` | Response không được coi là đăng nhập thành công hợp lệ | Chưa thực hiện | PASS / FAILED |
| TC-FR02-035 | Kiểm tra response thành công có JWT rỗng | Email và password hợp lệ<br>`token: ""` | Response không được coi là hợp lệ | Chưa thực hiện | PASS / FAILED |
| TC-FR02-036 | Kiểm tra response không chứa mật khẩu | Email và password hợp lệ<br>Kiểm tra JSON response | Response không chứa plaintext password hoặc secret | Chưa thực hiện | PASS / FAILED |
| TC-FR02-037 | Kiểm tra thông báo lỗi đăng nhập chung | Email không tồn tại hoặc password sai | Thông báo lỗi chung, không phân biệt email có tồn tại hay không | Chưa thực hiện | PASS / FAILED |
| TC-FR02-038 | Kiểm tra thông báo tài khoản bị khóa | Tài khoản đã đạt ngưỡng khóa | Thông báo phù hợp; không hiển thị số lần sai hoặc dữ liệu nội bộ | Chưa thực hiện | PASS / FAILED |
| TC-FR02-039 | Kiểm tra lỗi không làm lộ email | Email không tồn tại<br>Password hợp lệ | Không trả thông báo như `Email này đã tồn tại nhưng mật khẩu sai` | Chưa thực hiện | PASS / FAILED |
| TC-FR02-040 | Kiểm tra lỗi không làm lộ số lần sai | Đăng nhập sai đến ngưỡng khóa | Không trả thông báo như `Bạn đã sai 3 lần` | Chưa thực hiện | PASS / FAILED |
| TC-FR02-041 | Kiểm tra lỗi không chứa thông tin kỹ thuật | Gửi request đăng nhập sai | Không trả SQL error, `locked_until`, stack trace hoặc secret | Chưa thực hiện | PASS / FAILED |
| TC-FR02-042 | Kiểm tra đăng nhập sai luôn có phản hồi lỗi | Email hợp lệ<br>Password sai | Response thể hiện đăng nhập thất bại, không trả `success: true` | Chưa thực hiện | PASS / FAILED |
| TC-FR02-043 | Kiểm tra client gửi Bearer header | Đăng nhập thành công và gọi API cần xác thực | Client gửi `Authorization: Bearer <valid-token>` | Chưa thực hiện | PASS / FAILED |
| TC-FR02-044 | Kiểm tra client không gửi header rỗng | Đăng nhập thành công nhưng token rỗng/không có | Client không gửi header Bearer rỗng; request bị xử lý như chưa xác thực | Chưa thực hiện | PASS / FAILED |
| TC-FR02-045 | Kiểm tra client từ chối token không hợp lệ | Token đã bị thay bằng `invalid-token` | API từ chối request và không cấp quyền truy cập | Chưa thực hiện | PASS / FAILED |

## Ghi chú

- Các test case về response cần kiểm tra cả HTTP status, response body và dữ liệu nhạy cảm.
- FR-02 chưa quy định mã HTTP cụ thể cho từng lỗi; khi thực thi cần đối chiếu với API specification.
- Các miền performance chưa tạo test case vì FR-02 chưa quy định SLA, throughput hoặc số người dùng đồng thời.
