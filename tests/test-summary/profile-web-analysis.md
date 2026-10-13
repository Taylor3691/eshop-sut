# Pool A — FR-04: Quản lý hồ sơ cá nhân trên Web/API

Trạng thái: thiết kế đang xây dựng; chưa execute. Tài liệu áp dụng skill `domain-testing-bva`. Expected Result lấy từ [README](../../README.md), không lấy từ hành vi code hiện tại.

## Requirement Analysis

### Requirement

- ID: FR-04; liên quan SEC-02, SEC-04, SEC-06 và một phần FR-22.
- Feature: Quản lý hồ sơ cá nhân.
- Module: PROFILE-WEB, gồm storefront `/profile` và API `GET/PUT /api/users/me`.
- Nguồn: [FR-04](../../README.md#fr-04-quản-lý-hồ-sơ-cá-nhân), [API mục 2](../../api_specification.md), template trong `ref/03 - github_testcase_management.pptx.pdf` trang 5–7.
- Ngoài phạm vi: Mobile (Pool D), lịch sử/hủy đơn hàng trong cùng màn hình, thay đổi mật khẩu, toàn bộ kiểm thử giao diện chung và toàn bộ kiểm thử bảo mật hệ thống.

### Functional Rules

Các mã R dưới đây chỉ là nhãn truy vết nội bộ; không thay thế ID requirement gốc.

| Nhãn | Quy tắc | Nguồn |
|---|---|---|
| R1 | Người dùng đã đăng nhập có thể cập nhật Họ Tên, Số điện thoại, Địa chỉ giao hàng mặc định của mình | FR-04 |
| R2 | Số điện thoại bắt đầu bằng `0`, gồm 10–11 chữ số | FR-04 |
| R3 | Email không thể thay đổi qua giao diện | FR-04 |
| R4 | Chỉ cập nhật hồ sơ của chính người dùng đã xác thực | FR-04 |
| R5 | Không cho người dùng tự thay đổi `role` | FR-04, SEC-06 |
| R6 | API hồ sơ yêu cầu JWT hợp lệ | SEC-02; API mục 2 |
| R7 | Dữ liệu do người dùng nhập phải được hiển thị an toàn, không render HTML | SEC-04 |
| R8 | Trường Email dùng `type="email"`; lỗi form xuất hiện trên nút submit | FR-22; chỉ kiểm tra hai điều này trong phạm vi hồ sơ |

### Preconditions

- Khi người dùng execute: backend và storefront do người dùng chuẩn bị, có dữ liệu test độc lập; agent không khởi động hoặc gọi SUT.
- Có hai tài khoản thường A và B khác nhau. Có JWT hợp lệ của từng tài khoản để đọc lại hồ sơ và đối chiếu quyền sở hữu.
- API base URL: `http://localhost:3000`; trang hồ sơ: `http://localhost:5173/profile`.
- Trước từng case ghi nhận snapshot hồ sơ hiện tại. Việc chuẩn bị/khôi phục fixture phải được kiểm tra độc lập, không giả định API cập nhật đang hoạt động đúng.
- Backend khởi động lại sẽ reset/reseed dữ liệu. Không dùng việc restart làm bước xác minh persistence.

### Inputs

| Variable | Type | Description | Constraint |
|---|---|---|---|
| name | Chuỗi | Họ Tên | Cho phép cập nhật; chưa quy định độ dài, tập ký tự, rỗng hoặc whitespace |
| phone | Chuỗi ở UI/JSON mẫu | Số điện thoại | Bắt đầu `0`, 10–11 chữ số; cần giữ số `0` đầu |
| shipping_address | Chuỗi | Địa chỉ mặc định | Cho phép cập nhật; chưa quy định độ dài hoặc định dạng |
| email ở UI | Chuỗi hiển thị | Định danh email | Không cho chỉnh qua UI |
| Authorization | Header | JWT đại diện người gọi | Hợp lệ để đọc/cập nhật API hồ sơ |
| id hoặc user_id do client chèn | Giá trị bổ sung | Thử chọn hồ sơ B với token A | API `/me` không công bố tham số chọn tài khoản; không được sửa B |
| role do client chèn | Chuỗi bổ sung | Thử đổi quyền của A | Không cho tự đổi role |
| nội dung HTML trong name/address | Chuỗi | Dữ liệu tại điểm hiển thị | Phải hiển thị an toàn theo SEC-04 |

### Expected Outputs / Behaviors

- Cập nhật hợp lệ được lưu và đọc lại bằng GET; sau tải lại trang, thông tin đúng của A xuất hiện. Hồ sơ B giữ nguyên.
- Với phone sai quy tắc đã xác định, không lưu phone sai. Chỉ thay phone trong các negative case để không suy diễn quy tắc rollback nhiều trường.
- Không có JWT hợp lệ thì không đọc được dữ liệu hồ sơ và không cập nhật được dữ liệu.
- Token A không cho cập nhật B; role A giữ nguyên khi chèn `role`.
- Email không chỉnh được qua thao tác UI thông thường; hiển thị dữ liệu người dùng không tạo phần tử HTML từ chuỗi.
- Không ấn định mã HTTP, nội dung thông báo chính xác, timeout, toast hoặc cập nhật header ngay lập tức vì requirement chưa quy định.

### Assumptions

- AS-01: Dùng chữ số ASCII `0`–`9` cho bộ dữ liệu đã phân loại. Chữ số Unicode cần làm rõ riêng.
- AS-02: Hai tài khoản thường A/B và baseline là fixture do tester chuẩn bị, không phải cam kết seed có sẵn. ID/JWT lấy từ môi trường thật; không hard-code ID `1/2`.
- AS-03: Tên/địa chỉ tiếng Việt thông thường là dữ liệu đại diện cho chức năng cập nhật; không suy ra mọi chuỗi đều hợp lệ.
- AS-04: Dùng request PUT đủ cả ba trường được API công bố; chỉ thay trường đang kiểm tra. Không giả định PUT hỗ trợ partial update.
- AS-05: “Cập nhật” được kiểm chứng bằng dữ liệu đọc lại, không chỉ thông báo thành công. Không kiểm tra persistence qua restart do cơ chế reseed.

### Ambiguities

| ID | Điểm chưa rõ | Xử lý trong thiết kế |
|---|---|---|
| AM-01 | Name/address thiếu quy tắc rỗng, whitespace, min/max length | Không tự tạo boundary 255 hay Expected Result từ thuộc tính `required` trong code |
| AM-02 | Phone có bắt buộc hay cho phép để trống/null/không gửi? Có trim hoặc chuẩn hóa `+84`, khoảng trắng không? | Chỉ phân loại chuỗi không rỗng với quy tắc rõ ràng; các trường hợp này chờ review |
| AM-03 | Kiểu JSON sai, Unicode digits, full-width zero | Chưa có hợp đồng kiểu/chuẩn hóa đủ chặt để ấn định kết quả; không suy từ SQLite |
| AM-04 | Response code, lỗi, xử lý trường lạ, PUT thiếu trường, atomicity khi nhiều trường sai | Kiểm tra bất biến dữ liệu/quyền; trường lạ được reject hoặc ignore nếu vẫn giữ bất biến |
| AM-05 | FR-04 cấm đổi email qua UI; API chỉ nêu cập nhật thông tin cơ bản | Không tự mở rộng thành chính sách đổi email qua API; cần xác nhận trước khi viết case kết luận |
| AM-06 | JWT expiry/revocation/logout semantics chưa có thời hạn cụ thể | Không tự tạo BVA thời gian hoặc kỳ vọng token cũ bị thu hồi khi logout |
| AM-07 | Chưa định nghĩa validation chuỗi HTML cho name/address | Case SEC-04 kiểm tra an toàn hiển thị nếu dữ liệu được nhận; nếu bị từ chối, điểm hiển thị chưa được exercise |

### Dependencies và quan sát tĩnh

- `frontend-web/src/pages/Profile.jsx` cung cấp form và request cập nhật; `AuthContext.jsx` khôi phục user từ GET `/me`; `App.jsx` có phần chào tên người dùng.
- `backend/server.js` xử lý GET/PUT hồ sơ. UI và API là hai đường vào cần được kiểm tra độc lập: UI chặn một giá trị không chứng minh backend chặn giá trị đó.
- Code giúp xác định thao tác và điểm đọc lại; các nhận xét tĩnh không được dùng làm Actual Result, Pass/Fail hay confirmed bug.

## Domain Analysis

| Variable | Data Type | Valid Domain | Invalid Domain(s) | Constraints / Notes |
|---|---|---|---|---|
| phone | Chuỗi ASCII không rỗng trong miền đã xác định | `0` + 9 hoặc 10 chữ số ASCII | Chuỗi toàn chữ số bắt đầu `0` dài 1–9 hoặc >=12; chuỗi 10–11 chữ số bắt đầu 1–9; chuỗi dài 10–11 bắt đầu `0` chứa chữ cái | D-PHONE; độ dài tính bằng ký tự, không chuyển thành số; blank/null/chuẩn hóa chưa phân loại |
| name | Chuỗi | Tên thông thường có dấu, ví dụ `Nguyễn Thị An`; một tên có dấu nháy làm đại diện bổ sung | Chưa có domain validation INVALID được quy định | D-NAME; không mặc định name dài 256 hay rỗng là sai |
| shipping_address | Chuỗi | Địa chỉ tiếng Việt thông thường | Chưa có domain validation INVALID được quy định | D-ADDRESS; không áp format địa chỉ, độ dài hay quy tắc bắt buộc tự đặt |
| email ở UI | Giá trị hiển thị | Giữ email hiện có; thao tác xem | Hành động đổi email qua form | D-EMAIL; INVALID ở đây là thao tác bị cấm, không phải email sai định dạng |
| Authorization | Header/token | JWT hợp lệ của A hoặc B | Không có token; token không phải JWT; JWT sửa payload nhưng giữ chữ ký cũ | D-AUTH; thiếu token khác token sai; không giả định TTL |
| chủ thể và đích cập nhật | Quan hệ danh tính | Token A → hồ sơ A | Token A → hồ sơ B | D-OWNER; ID tự chèn trong body/query không thay chủ thể xác thực |
| role | Thuộc tính được bảo vệ | Giữ role `user` của A | Thao tác A đổi thành `admin` | D-ROLE; token hợp lệ không có nghĩa được phép sửa mọi thuộc tính |
| dữ liệu tại điểm hiển thị | Chuỗi thông thường/chuỗi giống HTML | Render text an toàn | Hành vi tạo HTML từ dữ liệu người dùng | D-RENDER; chuỗi giống HTML không tự động là input invalid; phân loại hành vi đầu ra |

### Quan hệ giữa các biến

1. Phone hợp lệ khi **đồng thời** đúng độ dài, đúng ký tự, đúng ký tự đầu; kiểm tra một điều kiện trong khi giữ các điều kiện còn lại hợp lệ.
2. JWT hợp lệ là precondition của domain cập nhật. Negative phone cases dùng token hợp lệ để lỗi auth không che lỗi validation.
3. Quyền sở hữu phụ thuộc token đã xác thực, không phụ thuộc `id`/`user_id` do client thêm. Snapshot B giúp phân biệt cập nhật A và sửa nhầm B.
4. Quyền cập nhật name/phone/address không bao gồm quyền cập nhật role. Case role dùng phone hợp lệ để cô lập lỗi quyền.
5. Name/address cần an toàn ở các điểm hiển thị dù được nhập qua API; reload trang để không nhầm React state cũ với dữ liệu lưu.
6. Tách case UI và API dù dùng cùng boundary: chúng kiểm tra hai lớp validation khác nhau. Một case UI bị chặn không được đổi dữ liệu để cố đi tới backend.

## Equivalence Partitions

ID `EP-PW-*` ổn định trong Pool A. VALID/INVALID của auth, ownership, email và role mô tả thao tác/quyền, không áp đặt loại JSON ngoài đặc tả. Các miền AM-01–AM-07 chưa đủ oracle không được gán nhãn tùy ý.

| Partition ID | Variable | Class | Condition | Representative Value | Requirement |
|---|---|---|---|---|---|
| EP-PW-01 | phone | VALID | Bắt đầu `0`, toàn chữ số, dài 10–11 | `0912345678`, `09123456789` | FR-04 R2 |
| EP-PW-02 | phone | INVALID | Bắt đầu `0`, toàn chữ số, không rỗng, dài <10 | `091234567` | FR-04 R2 |
| EP-PW-03 | phone | INVALID | Bắt đầu `0`, toàn chữ số, dài >11 | `091234567890` | FR-04 R2 |
| EP-PW-04 | phone | INVALID | Dài 10–11, toàn chữ số, ký tự đầu khác `0` | `1912345678` | FR-04 R2 |
| EP-PW-05 | phone | INVALID | Dài 10–11, bắt đầu `0`, chứa chữ cái | `09123A5678` | FR-04 R2 |
| EP-PW-06 | name | VALID | Tên người thông thường, không có restriction bổ sung | `Nguyễn O'Neil` | FR-04 R1; AS-03 |
| EP-PW-07 | shipping_address | VALID | Địa chỉ thông thường | `45 Nguyễn Huệ, Phường Bến Nghé, TP.HCM` | FR-04 R1; AS-03 |
| EP-PW-08 | email UI | VALID | Xem email hiện tại | `profile.a@example.com` | FR-04 R3 |
| EP-PW-09 | email UI | INVALID | Thử chỉnh email qua UI | Nhập `changed.a@example.com` vào email của A | FR-04 R3 |
| EP-PW-10 | Authorization | VALID | Token còn hợp lệ do môi trường cấp cho A | `TOKEN_A` lấy sau đăng nhập | SEC-02 R6 |
| EP-PW-11 | Authorization | INVALID | Không có header Authorization | Bỏ hẳn header | SEC-02 R6 |
| EP-PW-12 | Authorization | INVALID | Chuỗi không phải JWT hợp lệ | `Bearer not-a-jwt` | SEC-02 R6 |
| EP-PW-13 | Authorization | INVALID | Payload JWT bị sửa, chữ ký không tương ứng | Token A đổi claim `id` thành B_ID, giữ chữ ký cũ | SEC-02 R6 |
| EP-PW-14 | ownership | VALID | Người gọi A cập nhật chính A | Token A, `/api/users/me`, body ba trường | FR-04 R4 |
| EP-PW-15 | ownership | INVALID | Người gọi A cố chọn B | Body `id=B_ID`; hoặc query `user_id=B_ID` | FR-04 R4 |
| EP-PW-16 | role | VALID | Giữ role hiện tại khi cập nhật trường được phép | A vẫn là `user` | FR-04 R5, SEC-06 |
| EP-PW-17 | role | INVALID | A tự nâng quyền | Body thêm `"role":"admin"` | FR-04 R5, SEC-06 |
| EP-PW-18 | name tại điểm hiển thị | VALID | Chuỗi giống HTML được hiển thị dưới dạng text nếu được lưu | `<b data-profile-probe="name">Tên kiểm tra</b>` | SEC-04 R7; AM-07 |
| EP-PW-19 | address tại điểm hiển thị | VALID | Chuỗi giống HTML được hiển thị dưới dạng text nếu được lưu | `<b data-profile-probe="address">Địa chỉ kiểm tra</b>` | SEC-04 R7; AM-07 |

EP-PW-18/19 là phân hoạch dữ liệu cho oracle an toàn đầu ra, không khẳng định backend bắt buộc nhận HTML. Name và address có điểm hiển thị khác nhau nên cần hai case riêng. Các case ownership/role cho phép request bị reject hoặc trường cấm bị ignore; điều kiện quyết định là không vi phạm quyền và dữ liệu bảo vệ.

## Boundary Analysis

| Variable | Lower Boundary | Upper Boundary | Inclusiveness | Requirement | Notes |
|---|---:|---:|---|---|---|
| Độ dài phone, với toàn chữ số và bắt đầu `0` | 10 | 11 | Inclusive ở cả hai đầu | FR-04 R2 | B-PW-L và B-PW-U; khoảng rất hẹp, không có số nguyên nằm giữa 10 và 11 |
| name/address | Chưa xác định | Chưa xác định | Chưa xác định | FR-04 R1 | AM-01; không kế thừa giới hạn 255 của tên sản phẩm FR-15 |
| JWT validity | Không áp dụng | Không áp dụng | Không áp dụng | SEC-02 | Dùng EP; không có TTL để thiết kế BVA thời gian |
| Tiền tố phone, email-edit, ownership, role, HTML rendering | Không áp dụng | Không áp dụng | Không áp dụng | FR-04, SEC-04, SEC-06 | Thuộc tính categorical; không biến `0`, user ID hoặc role thành khoảng số |

AMBIGUITY: Đặc tả chưa định nghĩa boundary chính xác cho name/address. Chưa thể hoàn thành BVA đáng tin cậy cho hai trường này trước khi làm rõ. Đây không phải kết luận các trường không có giới hạn trong implementation.

Phương pháp: giữ token hợp lệ, name/address baseline và chữ số đầu `0`; thay duy nhất độ dài phone. Chọn `min-1`, `min`, `min+1`, `max-1`, `max`, `max+1`, rồi loại giá trị trùng. Dùng 10 làm nominal; nominal trùng boundary là điều bình thường với miền chỉ có hai độ dài hợp lệ.
