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
| TC-FR02-001 | Kiểm tra email rỗng | Email: `""`<br>Password: `Test1234!` | Hệ thống từ chối input email và không đăng nhập | Hệ thống không cho đăng nhập và hiện thông báo bắt buộc nhập | PASS|
| TC-FR02-002 | Kiểm tra email sai định dạng | Email: `test`<br>Password: `Test1234!` | Email bị validate từ chối, không tạo JWT |Hệ thống trả HTTP 401 Unauthorized với thông báo lỗi chung, không trả trường token và Local Storage không chứa JWT.| PASS|
| TC-FR02-003 | Kiểm tra email thiếu domain | Email: `user@`<br>Password: `Test1234!` | Email bị validate từ chối, không tạo JWT | Hệ thống trả HTTP 401 Unauthorized với thông báo lỗi chung, không trả trường token và Local Storage không chứa JWT. | PASS |
| TC-FR02-004 | Kiểm tra email hợp lệ nhưng chưa đăng ký | Email: `unknown@example.com`<br>Password: `Test1234!` | Đăng nhập thất bại, không tạo JWT, không tiết lộ chi tiết tài khoản | Hệ thống trả 401 với lỗi chung “Invalid email or password”, không trả JWT và không tiết lộ thông tin tài khoản. | PASS |
| TC-FR02-005 | Kiểm tra email hợp lệ đã đăng ký | Email: `test@eshop.com`<br>Password: `Test1234!` | Đăng nhập thành công và trả JWT | Đăng nhập thành công, có JWT trong local storage | PASS|
| TC-FR02-006 | Kiểm tra mật khẩu rỗng | Email: `test@eshop.com`<br>Password: `""` | Đăng nhập thất bại và không tạo JWT | Hệ thống thông báo bắt buộc nhập trường và không tạo JWT trong local storage | PASS|

| TC-FR02-007 | Kiểm tra mật khẩu không khớp | Email: `test@eshop.com`<br>Password: `WrongPass123!` | Đăng nhập thất bại, bộ đếm tăng đúng 1, thông báo không lộ chi tiết | Hiện thông báo đăng nhập thất bại, bộ đếm tăng 2, không làm lộ chi tiết | FAILED |
| TC-FR02-009 | Kiểm tra bộ đếm tăng đúng 1 | Thực hiện một lần đăng nhập sai với email hợp lệ và mật khẩu sai | Bộ đếm chuyển từ `0` thành `1` | Giống TC-007 | FAILED |
| TC-FR02-010 | Kiểm tra bộ đếm không được giữ nguyên | Trạng thái ban đầu: `login_attempts = 0`<br>Thực hiện một lần đăng nhập sai | Bộ đếm không được giữ nguyên ở `0` | Bộ đếm tăng thành 2, không phải số 0 | PASS|
| TC-FR02-011 | Kiểm tra bộ đếm không tăng nhiều hơn 1 | Trạng thái ban đầu: `login_attempts = 0`<br>Thực hiện một lần đăng nhập sai | Bộ đếm không được tăng thành `2` hoặc giá trị lớn hơn | Giống TC-007, TC-008 (đã kiểm tra) | FAILED |

| TC-FR02-012 | Kiểm tra chưa đạt ngưỡng khóa | Tài khoản có `2` lần sai liên tiếp<br>Đăng nhập lần tiếp theo với mật khẩu đúng | Tài khoản chưa bị khóa trước khi đạt ngưỡng; đăng nhập đúng được chấp nhận | Tài khoản đăng nhập đúng ở lần 3 sau 2 lần đănh nhập sai, thất bại thì bị khóa | FAILED |
| TC-FR02-013 | Kiểm tra đúng ngưỡng khóa | Tài khoản có `3` lần sai liên tiếp<br>Thử đăng nhập lại | Tài khoản bị khóa tạm thời và đăng nhập bị từ chối | Đăng nhập sai 2 lần liên tiếp đã bị khóa | FAILED |
| TC-FR02-014 | Kiểm tra vượt ngưỡng khóa | Tài khoản có `4` lần sai liên tiếp<br>Thử đăng nhập lại | Tài khoản vẫn bị khóa trong thời gian quy định | Tài khoản đăng nhập sai 2 lần đã bị khóa, thử đăng nhập lại vẫn bị khóa trong thời gian quy định | PASS|
| TC-FR02-015 | Kiểm tra tài khoản còn khóa ở giây 29 | Tài khoản vừa bị khóa<br>Thời gian đã qua: `29 giây` | Đăng nhập bị từ chối vì tài khoản vẫn đang khóa | Tài khoản vẫn bị khóa ở giây 29 | PASS |
| TC-FR02-016 | Kiểm tra tại đúng mốc 30 giây | Tài khoản vừa bị khóa<br>Thời gian đã qua: `30 giây` | Hệ thống xử lý đúng theo quy định tại mốc 30 giây; cần xác nhận mốc bao gồm hay không bao gồm | Kiểm tra thì tại mốc 30 giây hệ thống vẫn khóa | PASS |
| TC-FR02-017 | Kiểm tra sau khi hết thời gian khóa | Tài khoản vừa bị khóa<br>Thời gian đã qua: `31 giây`<br>Password đúng | Tài khoản được phép thử đăng nhập lại | Qua trên 31s và hệ thống vẫn khóa | FAILED |
| TC-FR02-021 | Kiểm tra tài khoản đang bị khóa | Tài khoản có trạng thái khóa<br>Email và password đúng | Phản hồi lỗi phù hợp, không đăng nhập và không tạo JWT | Tài khoản bị khóa không cho đăng nhập và không tạo JWT | PASS |

| TC-FR02-022 | Kiểm tra JWT hợp lệ | Đăng nhập thành công bằng dữ liệu hợp lệ<br>JWT nhận được từ phản hồi | JWT tồn tại, có thể dùng cho request cần xác thực |  Đăng nhập thành công trả về JWT. Dùng JWT với header Authorization: Bearer <token> để gọi GET /api/users/me và nhận HTTP 200 cùng thông tin tài khoản. | PASS|

| TC-FR02-023 | Kiểm tra JWT rỗng | Đăng nhập thành công<br>Kiểm tra trường `token` | Trường token không được rỗng | Đăng nhập thành công, trường token không rỗng | PASS|
| TC-FR02-025 | Kiểm tra header không có token | Gọi API cần xác thực<br>Không gửi `Authorization` | Request bị từ chối xác thực |  Gọi GET /api/users/me không có Authorization header,hệ thống từ chối request với HTTP 401 và không trả dữ liệu người dùng. | PASS |
| TC-FR02-026 | Kiểm tra header sai scheme | Gọi API cần xác thực<br>`Authorization: Token abc123` | Request bị từ chối vì header không có scheme Bearer |Header Authorization dùng sai scheme Token thay vì Bearer. Hệ thống từ chối request và không trả dữ liệu người dùng. | PASS|
| TC-FR02-027 | Kiểm tra header Bearer hợp lệ | Gọi API cần xác thực<br>`Authorization: Bearer <valid-token>` | Request được xác thực nếu token hợp lệ |  Gửi request GET /api/users/me với header Authorization: Bearer <valid-token>. Hệ thống trả HTTP 200 và thông tin tài khoản người dùng. | PASS |
| TC-FR02-028 | Kiểm tra token không hợp lệ | Gọi API cần xác thực<br>`Authorization: Bearer invalid-token` | Request bị từ chối xác thực | Hiển thị lỗi 403 "Forbiden" | PASS|

| TC-FR02-029 | Kiểm tra trường email dùng HTML5 email | Mở form đăng nhập<br>Kiểm tra thuộc tính input email | Trường email có `type="email"` | document.querySelector('form input').type trả về "text". Trường email không sử dụng HTML5 type="email".| FAILED |
| TC-FR02-030 | Kiểm tra HTML5 với email rỗng | Email trên form: `""`<br>Password hợp lệ | Form không cho gửi nếu trường bắt buộc | Thông báo phải nhập và form không cho gửi | PASS |
| TC-FR02-031 | Kiểm tra HTML5 với chuỗi không phải email | Email trên form: `abc`<br>Password hợp lệ | Trình duyệt từ chối định dạng email | hập email "abc", hệ thống vẫn gửi request /api/login.Backend trả HTTP 401 với lỗi "Invalid email or password" và UI hiển thị "Đăng nhập thất bại". Form không chặn email sai định dạng bằng HTML5. | FAILED |

| TC-FR02-032 | Kiểm tra HTML5 với email hợp lệ | Email trên form: `abc@example.com`<br>Password hợp lệ | Trình duyệt chấp nhận định dạng email | trình duyệt vẫn chấp nhận định dạng đúng | PASS |
| TC-FR02-034 | Kiểm tra response thành công thiếu JWT | Email và password hợp lệ<br>Kiểm tra response không có `token` | Response không được coi là đăng nhập thành công hợp lệ | Backend trả HTTP 200 với message “Login successful” và thông tin user nhưng không có trường token. Frontend vẫn xử lý đăng nhập thành công,chuyển người dùng về trang chủ và lưu giá trị “undefined” vào Local Storage.Không có JWT hợp lệ được tạo. | FAILED |
| TC-FR02-035 | Kiểm tra response thành công có JWT rỗng | Email và password hợp lệ<br>`token: ""` | Response không được coi là hợp lệ |  Response trả token rỗng nhưng client vẫn xử lý đăng nhập thành công và lưu token rỗng vào Local Storage. | FAILED |
| TC-FR02-036 | Kiểm tra response không chứa mật khẩu | Email và password hợp lệ<br>Kiểm tra JSON response | Response không chứa plaintext password hoặc secret | Response đăng nhập thành công có chứa trường password và mật khẩu dạng plaintext trong dữ liệu user. | FAILED |
| TC-FR02-037 | Kiểm tra thông báo lỗi đăng nhập chung | Email không tồn tại hoặc password sai | Thông báo lỗi chung, không phân biệt email có tồn tại hay không | Thông báo sai chung chung | PASS |
| TC-FR02-038 | Kiểm tra thông báo tài khoản bị khóa | Tài khoản đã đạt ngưỡng khóa | Thông báo tạm thời bị khóa do đăng nhập quá nhiều hoặc tạm thời khóa và thông báo thời gian khóa hoặc thử lại sau; không hiển thị số lần sai hoặc dữ liệu nội bộ | Không thông báo bị khóa, thay vào đó thông báo đăng nhập thất bại | FAILED |
| TC-FR02-039 | Kiểm tra lỗi không làm lộ email | Email không tồn tại<br>Password hợp lệ | Không trả thông báo như `Email này đã tồn tại nhưng mật khẩu sai` | Thông báo ` Đăng nhập thất bại, vui lòng thử lại sau` | PASS|
| TC-FR02-040 | Kiểm tra lỗi không làm lộ số lần sai | Đăng nhập sai đến ngưỡng khóa | Không trả thông báo như `Bạn đã sai 3 lần` | Không thông báo bị khóa, thay vào đó thông báo đăng nhập thất bại | PASS |
| TC-FR02-041 | Kiểm tra lỗi không chứa thông tin kỹ thuật | Gửi request đăng nhập sai | Không trả SQL error, `locked_until`, stack trace hoặc secret | Hệ thống trả HTTP 401 với thông báo lỗi chung “Invalid email or password”, không chứa thông tin kỹ thuật nội bộ. | PASS |
| TC-FR02-042 | Kiểm tra đăng nhập sai luôn có phản hồi lỗi | Email hợp lệ<br>Password sai | Response thể hiện đăng nhập thất bại, không trả `success: true` | Response trả về mỗi trường error:“Invalid email or password"  | PASS|
| TC-FR02-043 | Kiểm tra client gửi Bearer header | Đăng nhập thành công và gọi API cần xác thực | Client gửi `Authorization: Bearer <valid-token>` | Client gửi request GET /api/users/me với header Authorization: Bearer <valid-token>. | PASS|
| TC-FR02-044 | Kiểm tra client không gửi header rỗng | Đăng nhập thành công nhưng token rỗng/không có | Client không gửi header Bearer rỗng; request bị xử lý như chưa xác thực | Request không có Authorization header, Status: 401 Unauthorized,Response: {"error":"Unauthorized"} | PASS|
| TC-FR02-045 | Kiểm tra client từ chối token không hợp lệ | Token đã bị thay bằng `invalid-token` | API từ chối request và không cấp quyền truy cập |Gọi API với Bearer token không hợp lệ, hệ thống trả HTTP 403 và từ chối truy cập.| PASS|

## Tổng kết

| Hạng mục | Số lượng | Chi tiết |
|---|---:|---|
| Tổng số TC ban đầu | 45 | Bao gồm toàn bộ ID từ TC-FR02-001 đến TC-FR02-045 |
| Số nhóm TC trùng | 4 | Các nhóm: `005/008/018/033`, `004/019`, `007/020`, `024/034` |
| Số TC trùng bị loại | 6 | Đã loại các ID: `008`, `018`, `019`, `020`, `024`, `033`; không đánh lại ID còn lại |
| Tổng số TC sau khi loại trùng | 39 | Các TC còn lại được dùng để tính kết quả |
| Đạt (PASS) | 27 | Các TC có Response là `PASS` |
| Không đạt (FAILED) | 12 | Các TC có Response là `FAILED` |
| Trạng thái khác | 0 | Không còn TC `BLOCK`, `Chưa xác định` hoặc `PASS / FAILED` |

## Ghi chú

- Các test case về response cần kiểm tra cả HTTP status, response body và dữ liệu nhạy cảm.
- FR-02 chưa quy định mã HTTP cụ thể cho từng lỗi; khi thực thi cần đối chiếu với API specification.
- Các miền performance chưa tạo test case vì FR-02 chưa quy định SLA, throughput hoặc số người dùng đồng thời.
