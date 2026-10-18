# GitHub issue drafts — FR-02, FR-08, FR-13, FR-15

Các issue dưới đây được tổng hợp theo báo cáo/test run hiện có và gom các test case cùng nguyên nhân gốc. FR-08, FR-13 và FR-15 chủ yếu là kết quả rà soát mã nguồn; cần xác nhận lại trên runtime trước khi ghi nhận như lỗi đã tái hiện. FR-02 lấy kết quả từ báo cáo kiểm thử hiện có.

## [BUG][FR-02] Bộ đếm đăng nhập sai tăng 2 thay vì 1

**Mức độ:** Major  
**Test case:** TC-FR-02-LOGIN-007, 009, 011, 012, 013

### Các bước tái hiện
1. Đặt `login_attempts = 0` cho tài khoản kiểm thử và bảo đảm tài khoản không bị khóa.
2. Gửi một lần đăng nhập với mật khẩu sai.
3. Kiểm tra lại `login_attempts` trong SQLite.

### Kết quả thực tế
Sau một lần đăng nhập sai, bộ đếm tăng từ `0` lên `2`; tài khoản bị khóa sau hai lần sai.

### Kết quả mong đợi
Bộ đếm tăng đúng một đơn vị cho mỗi lần sai và tài khoản chỉ bị khóa khi đạt ngưỡng ba lần sai liên tiếp.

### Bằng chứng
Theo `BUG-FR02-all.md`, backend tính `user.login_attempts + 2`.

### Đề xuất sửa
Tăng bộ đếm một đơn vị và kiểm tra lại các mốc 1, 2, 3 lần sai.

---

## [BUG][FR-02] Tài khoản vẫn bị khóa sau khi hết 30 giây

**Mức độ:** Major  
**Test case:** TC-FR-02-LOGIN-016, 017

### Các bước tái hiện
1. Đưa tài khoản vào trạng thái bị khóa.
2. Chờ 30 giây rồi đăng nhập bằng mật khẩu đúng.
3. Nếu vẫn bị từ chối, thử lại sau hơn 31 giây.

### Kết quả thực tế
Tài khoản vẫn bị khóa ở cả hai thời điểm.

### Kết quả mong đợi
Tài khoản được phép thử đăng nhập lại sau khi hết thời gian khóa 30 giây.

### Bằng chứng
`BUG-FR02-all.md` ghi backend đặt `lockedUntil` bằng `Date.now() + 180000` (180 giây).

### Đề xuất sửa
Đặt thời gian khóa theo yêu cầu FR-02 là 30 giây; kiểm tra trước, đúng và sau mốc hết hạn.

---

## [BUG][FR-02] Trường email không dùng HTML5 `type="email"`

**Mức độ:** Medium  
**Test case:** TC-FR-02-LOGIN-029, 031

### Các bước tái hiện
1. Mở trang đăng nhập.
2. Kiểm tra thuộc tính `type` của ô email trong DevTools, hoặc nhập `abc` rồi gửi form.

### Kết quả thực tế
Ô email có `type="text"`; form gửi request đăng nhập dù email sai định dạng.

### Kết quả mong đợi
Ô email dùng `type="email"`; trình duyệt chặn giá trị sai định dạng trước khi gửi request.

### Bằng chứng
Theo báo cáo, `frontend-web/src/pages/Login.jsx` khai báo input với `type="text"`.

### Đề xuất sửa
Đổi sang `type="email"` và xác nhận email sai định dạng bị chặn phía form.

---

## [BUG][FR-02] Client chấp nhận response đăng nhập thiếu token hoặc token rỗng

**Mức độ:** Major  
**Test case:** TC-FR-02-LOGIN-034, 035

### Các bước tái hiện
1. Mô phỏng response đăng nhập thành công không có `token`, hoặc có `token: ""`.
2. Gửi form đăng nhập và quan sát trạng thái giao diện cùng Local Storage.

### Kết quả thực tế
Client xử lý đăng nhập thành công, có thể chuyển trang và lưu `undefined` hoặc token rỗng.

### Kết quả mong đợi
Client từ chối response không có token hợp lệ, không lưu token và không chuyển sang trạng thái đã đăng nhập.

### Bằng chứng
Theo báo cáo, `frontend-web/src/context/AuthContext.jsx` lưu `res.data.token` mà không xác thực giá trị trước.

### Đề xuất sửa
Kiểm tra token tồn tại và hợp lệ trước khi cập nhật auth state hoặc Local Storage.

---

## [BUG][FR-02] Response đăng nhập làm lộ mật khẩu plaintext

**Mức độ:** Critical  
**Test case:** TC-FR-02-LOGIN-036

### Các bước tái hiện
1. Đăng nhập bằng tài khoản hợp lệ.
2. Mở DevTools → Network → response của `/api/login`.
3. Kiểm tra object `user` trong response.

### Kết quả thực tế
Response chứa trường `password` với mật khẩu dạng plaintext.

### Kết quả mong đợi
Response không chứa mật khẩu hoặc secret; chỉ trả các trường user cần thiết cho client.

### Bằng chứng
Theo báo cáo, backend trả toàn bộ `user` lấy từ `SELECT *` trong response đăng nhập.

### Đề xuất sửa
Tạo object user an toàn với các trường được phép như `id`, `name`, `email`, `role` trước khi trả response.

---

## [BUG][FR-02] Giao diện không thông báo tài khoản đang bị khóa

**Mức độ:** Medium  
**Test case:** TC-FR-02-LOGIN-038

### Các bước tái hiện
1. Đưa tài khoản đến trạng thái bị khóa.
2. Thử đăng nhập lại, kể cả khi dùng mật khẩu đúng.
3. Quan sát thông báo trên giao diện.

### Kết quả thực tế
- Backend trả lỗi tài khoản bị khóa.
- Giao diện chỉ hiển thị: `Đăng nhập thất bại. Vui lòng kiểm tra lại.`
- Người dùng không biết tài khoản đang bị khóa hoặc cần thử lại sau.

### Kết quả mong đợi
Giao diện hiển thị thông báo phù hợp, ví dụ `Tài khoản đang bị khóa. Vui lòng thử lại sau.` Thông báo không nêu số lần đăng nhập sai hoặc thông tin nội bộ.

### Bằng chứng
Theo báo cáo, `frontend-web/src/pages/Login.jsx` thay mọi lỗi login bằng cùng một thông báo trong `catch`.

### Đề xuất sửa
Phân biệt lỗi tài khoản bị khóa (chẳng hạn theo HTTP status `403`) và hiển thị thông báo an toàn cho người dùng.

---

## [BUG][FR-08] Checkout tin tổng tiền do client gửi lên

**Mức độ:** Major  
**Test case:** TC-FR-08-CHECKOUT-001, 003, 004, 009

### Các bước tái hiện
1. Đăng nhập và tạo giỏ hàng có sản phẩm với tổng tiền đã biết.
2. Gửi request checkout với `total_amount` thấp hơn hoặc cao hơn tổng tiền của giỏ.
3. Kiểm tra tổng tiền được lưu cho đơn hàng.

### Kết quả thực tế
Theo rà soát mã nguồn trong test run, handler dùng trực tiếp tổng tiền client gửi lên và không tính lại từ giỏ hàng hiện tại.

### Kết quả mong đợi
Backend tự tính tổng tiền từ dữ liệu giỏ hàng hiện tại; không chấp nhận `total_amount` do client quyết định.

### Bằng chứng
Test run FR-08 ghi nhận API lưu `total_amount` trong request; TC-003, 004 và 009 cùng chỉ ra nguyên nhân này. Chưa có bằng chứng runtime trong đợt rà soát.

### Đề xuất sửa
Tính lại tổng ở backend từ giỏ hàng và giá sản phẩm có thẩm quyền, bỏ qua hoặc từ chối tổng do client gửi.

---

## [BUG][FR-08] Tổng tiền checkout có thể chỉnh sửa trực tiếp trên giao diện

**Mức độ:** Major  
**Test case:** TC-FR-08-CHECKOUT-005

### Các bước tái hiện
1. Mở trang checkout với giỏ hàng có sản phẩm.
2. Thử sửa trực tiếp trường tổng tiền.
3. Quan sát giá trị có thể thay đổi hay không.

### Kết quả thực tế
Test run ghi nhận tổng tiền được hiển thị bằng trường nhập số có thể chỉnh sửa.

### Kết quả mong đợi
Tổng tiền được tính và hiển thị như thông tin chỉ đọc; người dùng không thể sửa trực tiếp.

### Bằng chứng
TC-FR-08-CHECKOUT-005 trong test run; kết quả hiện là rà soát luồng/mã nguồn, chưa có xác nhận runtime.

### Đề xuất sửa
Hiển thị tổng tiền dưới dạng văn bản hoặc trường chỉ đọc. Backend vẫn phải tự tính lại tổng.

---

## [BUG][FR-08] Giỏ hàng không được xóa sau checkout thành công

**Mức độ:** Major  
**Test case:** TC-FR-08-CHECKOUT-001, 007

### Các bước tái hiện
1. Đăng nhập và thêm sản phẩm vào giỏ.
2. Hoàn tất checkout thành công.
3. Mở lại giỏ hàng và kiểm tra các mặt hàng.

### Kết quả thực tế
Test run ghi nhận nhánh thành công không gọi `clearCart()`; giỏ không được xóa theo luồng đã rà soát.

### Kết quả mong đợi
Sau khi thanh toán thành công, giỏ hàng được xóa.

### Bằng chứng
TC-FR-08-CHECKOUT-001 và 007 trong test run. Chưa có dữ liệu runtime/bằng chứng quan sát giỏ hàng trong đợt rà soát.

### Đề xuất sửa
Xóa giỏ sau khi backend xác nhận checkout thành công; giữ nguyên giỏ nếu checkout thất bại.

---

## [BUG][FR-13] Doanh thu đơn `delivered` bị cộng gấp đôi trên Dashboard

**Mức độ:** Major  
**Test case:** TC-FR-13-DASHBOARD-001, 006

### Các bước tái hiện
1. Chuẩn bị danh sách đơn có ít nhất một đơn trạng thái `delivered` và biết `total_amount` của từng đơn.
2. Mở Dashboard admin.
3. So sánh doanh thu hiển thị với tổng `total_amount` của các đơn `delivered`.

### Kết quả thực tế
Theo rà soát mã nguồn, phép tính `totalRevenue` cộng `o.total_amount * 2` cho mỗi đơn `delivered`.

### Kết quả mong đợi
Mỗi đơn `delivered` chỉ đóng góp `total_amount` một lần vào tổng doanh thu.

### Bằng chứng
Test run ghi nhận lỗi tại phép tính `totalRevenue`; chưa có số liệu runtime hoặc ảnh chụp trong báo cáo.

### Đề xuất sửa
Cộng `total_amount` đúng một lần cho mỗi đơn phù hợp trạng thái và đối chiếu với dữ liệu mẫu.

---

## [BUG][FR-15 Mobile] API cho phép tạo sản phẩm có tên dài hơn 255 ký tự

**Mức độ:** Medium  
**Test case:** TC-FR-15-PRODUCT-MOBILE-006

### Các bước tái hiện
1. Gửi request tạo sản phẩm với `name` dài hơn 255 ký tự.
2. Kiểm tra response API và bản ghi sản phẩm.
3. Tải danh sách sản phẩm trên mobile.

### Kết quả thực tế
Theo rà soát mã nguồn/schema, API không giới hạn độ dài tên và SQLite `TEXT` chấp nhận giá trị đó.

### Kết quả mong đợi
API từ chối tên vượt giới hạn 255 ký tự theo đặc tả/test case FR-15.

### Bằng chứng
TC-FR-15-PRODUCT-MOBILE-006 trong test run; runtime cần xác nhận.

### Đề xuất sửa
Validate giới hạn độ dài ở API và trả lỗi validation rõ ràng.

---

## [BUG][FR-15 Mobile] API cho phép tạo sản phẩm không có tên hoặc tên rỗng

**Mức độ:** Major  
**Test case:** TC-FR-15-PRODUCT-MOBILE-007

### Các bước tái hiện
1. Gửi request tạo sản phẩm với `name` bị bỏ trống hoặc là chuỗi rỗng.
2. Kiểm tra response và dữ liệu sản phẩm được lưu.

### Kết quả thực tế
Test run ghi nhận API không kiểm tra tên rỗng; schema cho phép `name` null và chuỗi rỗng.

### Kết quả mong đợi
API từ chối sản phẩm thiếu tên hoặc có tên rỗng.

### Bằng chứng
TC-FR-15-PRODUCT-MOBILE-007 trong test run; runtime cần xác nhận.

### Đề xuất sửa
Đánh dấu tên là bắt buộc, trim khoảng trắng và từ chối giá trị sau trim rỗng.

---

## [BUG][FR-15 Mobile] API chấp nhận giá sản phẩm bằng 0 hoặc âm

**Mức độ:** Major  
**Test case:** TC-FR-15-PRODUCT-MOBILE-009

### Các bước tái hiện
1. Gửi request tạo hoặc cập nhật sản phẩm với `price` lần lượt là `0` và `-1`.
2. Kiểm tra response API và giá trị được lưu.

### Kết quả thực tế
Theo rà soát, API không xác thực `price > 0`; schema không có ràng buộc CHECK để chặn giá trị này.

### Kết quả mong đợi
API từ chối giá bằng hoặc nhỏ hơn 0; giá sản phẩm phải là số dương.

### Bằng chứng
TC-FR-15-PRODUCT-MOBILE-009 trong test run; runtime cần xác nhận.

### Đề xuất sửa
Validate kiểu và điều kiện `price > 0` ở API; cân nhắc ràng buộc dữ liệu phù hợp ở schema.

---

## [BUG][FR-15 Mobile] API cho phép tạo sản phẩm thiếu danh mục

**Mức độ:** Major  
**Test case:** TC-FR-15-PRODUCT-MOBILE-010

### Các bước tái hiện
1. Gửi request tạo sản phẩm không có `category_id` hoặc đặt giá trị null.
2. Kiểm tra response API và bản ghi được lưu.

### Kết quả thực tế
Test run ghi nhận API không xác thực danh mục bắt buộc; cột `category_id` cho phép NULL và không khai báo foreign key.

### Kết quả mong đợi
API từ chối sản phẩm thiếu danh mục hoặc có danh mục không tồn tại.

### Bằng chứng
TC-FR-15-PRODUCT-MOBILE-010 trong test run; runtime cần xác nhận.

### Đề xuất sửa
Validate `category_id` bắt buộc và xác nhận danh mục tồn tại trước khi lưu.

---

## Các kết quả không đưa thành issue

- FR-02: các test case PASS về lỗi chung, không tiết lộ email/số lần sai/thông tin kỹ thuật không được ghi thành bug.
- FR-08: checkout giỏ rỗng (TC-008) chưa có expected result trong đặc tả nên chưa đủ cơ sở kết luận lỗi.
- FR-13: kiểm tra Dashboard hiện chưa xác nhận bảo vệ API theo role; đây là khoảng trống kiểm thử liên quan FR-12, chưa phải bug FR-13 đã tái hiện.
- FR-15 Mobile: TC-005 (tên dài 254/255 ký tự) và TC-008 (giá dương) được ghi Pass, không đưa vào danh sách issue.
