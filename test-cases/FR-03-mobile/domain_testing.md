# TC-MOB-FORGOT-001: Điều hướng từ màn hình Đăng nhập sang màn hình Quên mật khẩu

## Preconditions

- Ứng dụng EShop Mobile đang mở và người dùng đang ở màn hình Đăng nhập (`view === "login"`).
- Người dùng chưa đăng nhập tài khoản.

## Input Data

| Trường / Thao tác  | Giá trị                                                  |
| ------------------ | -------------------------------------------------------- |
| Màn hình hiện tại  | `login`                                                  |
| Thao tác tương tác | Nhấn vào liên kết "Quên mật khẩu?" (`styles.forgotLink`) |

## Test Steps

1. Mở ứng dụng EShop Mobile và điều hướng đến màn hình Đăng nhập.
2. Quan sát liên kết "Quên mật khẩu?" bên dưới trường nhập Mật khẩu.
3. Nhấn vào liên kết "Quên mật khẩu?".
4. Quan sát sự thay đổi giao diện và trạng thái màn hình.

## Expected Result

- Ứng dụng chuyển đổi trạng thái điều hướng từ `login` sang `forgotPassword`.
- Giao diện hiển thị tiêu đề màn hình "Quên Mật Khẩu" (`styles.headerCenter`).
- Giao diện hiển thị ô nhập email với nhãn "Nhập Email của bạn" và nút bấm "Lấy mã OTP".

## Coverage Rationale

Kiểm thử phân hoạch hợp lệ cho luồng điều hướng khởi tạo (Entry Navigation) dẫn vào tính năng Quên mật khẩu từ màn hình Đăng nhập của ứng dụng di động.

---

# TC-MOB-FORGOT-002: Kiểm tra sự hiện diện của Chỉ báo bước (Step Indicator) tại Bước 1 theo đặc tả FR-03

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu tại Bước 1 (`forgotStep === 1`).

## Input Data

| Trường / Thao tác   | Giá trị                       |
| ------------------- | ----------------------------- |
| Màn hình            | Quên mật khẩu (Bước 1)        |
| Thành phần kiểm tra | Chỉ báo bước (Step Indicator) |

## Test Steps

1. Điều hướng đến màn hình Quên mật khẩu (Bước 1).
2. Quan sát toàn bộ giao diện từ tiêu đề đến nút "Lấy mã OTP".
3. Kiểm tra sự xuất hiện của thông tin chỉ báo tiến trình bước (ví dụ: "Bước 1 / 2" hoặc "Step 1/2").

## Expected Result

- Theo đặc tả FR-03: Giao diện phải hiển thị rõ ràng chỉ báo bước "Bước 1 / 2" (hoặc "Step 1/2") giúp người dùng nhận biết tiến trình 2 bước.
- Các thành phần giao diện không bị che khuất hoặc lỗi hiển thị layout.

## Coverage Rationale

Kiểm thử tuân thủ yêu cầu giao diện (GUI Requirement Compliance) đối với thành phần chỉ báo bước quy định bắt buộc tại FR-03 và FR-22.

---

# TC-MOB-FORGOT-003: Kiểm tra sự hiện diện của nút "Quay lại đăng nhập" tại Bước 1 theo đặc tả FR-03

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu tại Bước 1 (`forgotStep === 1`).

## Input Data

| Trường / Thao tác   | Giá trị                             |
| ------------------- | ----------------------------------- |
| Màn hình            | Quên mật khẩu (Bước 1)              |
| Thành phần kiểm tra | Nút / Liên kết "Quay lại đăng nhập" |

## Test Steps

1. Mở màn hình Quên mật khẩu tại Bước 1.
2. Kiểm tra các nút điều hướng bên trong khung biểu mẫu (`styles.formContainer`).
3. Tìm kiếm nút hoặc liên kết có nhãn "Quay lại đăng nhập" (hoặc tương đương).

## Expected Result

- Theo đặc tả FR-03: Giao diện Bước 1 phải có nút "Quay lại đăng nhập" cho phép người dùng hủy thao tác và quay về màn hình Đăng nhập thuận tiện.
- Khi nhấn nút này, ứng dụng phải chuyển ngay về `view === "login"`.

## Coverage Rationale

Kiểm thử yêu cầu điều hướng quay lui (Exit / Cancellation Navigation) theo tiêu chuẩn quy định tại FR-03.

---

# TC-MOB-FORGOT-004: Yêu cầu mã OTP thành công với email đã đăng ký hợp lệ (Phân hoạch hợp lệ cơ bản)

## Preconditions

- Tài khoản `test@eshop.com` đã đăng ký hợp lệ và tồn tại trong cơ sở dữ liệu.
- Người dùng đang ở màn hình Quên mật khẩu Bước 1 trên ứng dụng di động.

## Input Data

| Trường / Tham số | Giá trị                       |
| ---------------- | ----------------------------- |
| `forgotEmail`    | `"test@eshop.com"`            |
| Endpoint API     | `POST /api/forgot-password`   |
| Payload gửi đi   | `{"email": "test@eshop.com"}` |

## Test Steps

1. Nhập `"test@eshop.com"` vào ô nhập "Nhập Email của bạn".
2. Nhấn nút "Lấy mã OTP".
3. Quan sát phản hồi từ hệ thống và sự chuyển đổi giao diện.

## Expected Result

- Ứng dụng gửi request POST đến `/api/forgot-password` kèm email hợp lệ.
- Server xử lý thành công và phản hồi mã HTTP 200 OK cùng mã đặt lại mật khẩu trong CSDL.
- Ứng dụng cập nhật thông báo `forgotMessage`: "Nếu email tồn tại trong hệ thống, mã OTP đã được gửi đến email của bạn.".
- Giao diện tự động chuyển sang Bước 2 (`forgotStep = 2`), hiển thị form nhập mã OTP và mật khẩu mới.

## Coverage Rationale

Kiểm thử phân hoạch tương đương hợp lệ cơ bản (Standard Valid Equivalence Partition) cho chức năng gửi yêu cầu OTP với tài khoản người dùng đã kích hoạt.

---

# TC-MOB-FORGOT-005: Kiểm tra hiển thị mã OTP trực tiếp trên màn hình trong môi trường demo theo đặc tả FR-03

## Preconditions

- Người dùng thực hiện yêu cầu OTP thành công cho email `test@eshop.com` trên ứng dụng mobile.
- Hệ thống hoạt động trong môi trường học tập / demo.

## Input Data

| Trường / Tham số | Giá trị            |
| ---------------- | ------------------ |
| `forgotEmail`    | `"test@eshop.com"` |
| Môi trường       | Demo / Testing     |

## Test Steps

1. Nhập `test@eshop.com` và nhấn "Lấy mã OTP".
2. Ứng dụng chuyển sang Bước 2.
3. Quan sát nội dung thông báo và các vùng hiển thị trên màn hình Bước 2.

## Expected Result

- Theo đặc tả FR-03: "trong môi trường demo: hiển thị trực tiếp trên màn hình" (nhằm phục vụ việc kiểm thử mà không cần máy chủ SMTP gửi mail thực tế).
- Mã OTP tạo ra phải được hiển thị trực tiếp trên giao diện để người dùng/tester có thể lấy và nhập vào ô OTP ở Bước 2.

## Coverage Rationale

Kiểm thử sự tuân thủ đặc tả nghiệp vụ môi trường demo (Demo Environment Specification Oracle) giữa yêu cầu hiển thị OTP và thông báo thực tế của ứng dụng di động.

---

# TC-MOB-FORGOT-006: Yêu cầu mã OTP với địa chỉ email chưa từng đăng ký trong hệ thống

## Preconditions

- Địa chỉ email `unregistered_mobile@eshop.com` chưa từng được đăng ký và không tồn tại trong CSDL.
- Người dùng đang ở màn hình Quên mật khẩu Bước 1.

## Input Data

| Trường / Tham số | Giá trị                           |
| ---------------- | --------------------------------- |
| `forgotEmail`    | `"unregistered_mobile@eshop.com"` |
| Endpoint API     | `POST /api/forgot-password`       |

## Test Steps

1. Nhập `"unregistered_mobile@eshop.com"` vào ô nhập email.
2. Nhấn nút "Lấy mã OTP".
3. Quan sát hộp thoại cảnh báo và trạng thái màn hình.

## Expected Result

- Server phản hồi mã trạng thái HTTP 404 với body `{"error": "User not found"}`.
- Ứng dụng kích hoạt hộp thoại `Alert.alert("Lỗi", "User not found")`.
- Ứng dụng không tạo mã OTP, không chuyển sang Bước 2 (`forgotStep` vẫn là 1).

## Coverage Rationale

Kiểm thử phân hoạch không hợp lệ (Invalid Equivalence Partition): Tài khoản email không tồn tại trong hệ thống.

---

# TC-MOB-FORGOT-007: Yêu cầu mã OTP khi để trống ô nhập email (Chuỗi rỗng "")

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu Bước 1 trên ứng dụng di động.

## Input Data

| Trường / Tham số | Giá trị                                 |
| ---------------- | --------------------------------------- |
| `forgotEmail`    | `""` (chuỗi rỗng, không nhập ký tự nào) |

## Test Steps

1. Để trống ô nhập "Nhập Email của bạn" (hoặc xóa sạch nội dung).
2. Nhấn nút "Lấy mã OTP".
3. Quan sát phản hồi của ứng dụng di động.

## Expected Result

- Ứng dụng hiển thị thông báo lỗi yêu cầu nhập email trước khi gửi hoặc server từ chối yêu cầu (HTTP 404 User not found).
- Ứng dụng không chuyển sang Bước 2 và không làm ứng dụng bị treo (crash).

## Coverage Rationale

Kiểm thử giá trị rỗng / biên dưới (Empty Input Boundary / Missing Required Field) của trường email đầu vào.

---

# TC-MOB-FORGOT-008: Yêu cầu mã OTP với email sai định dạng (Thiếu ký tự @ hoặc tên miền)

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu Bước 1.

## Input Data

| Trường / Tham số | Giá trị                             |
| ---------------- | ----------------------------------- |
| `forgotEmail`    | `"testeshop.com"` (thiếu ký tự `@`) |

## Test Steps

1. Nhập chuỗi `"testeshop.com"` vào ô nhập email.
2. Nhấn nút "Lấy mã OTP".
3. Quan sát phản ứng xác thực từ ứng dụng và backend.

## Expected Result

- Hệ thống từ chối xử lý email sai định dạng cú pháp (theo chuẩn `user@domain.com` định nghĩa tại FR-01 và FR-03).
- Ứng dụng hiển thị cảnh báo định dạng email không hợp lệ, không chuyển tiếp sang Bước 2.

## Coverage Rationale

Kiểm thử phân hoạch tương đương không hợp lệ (Invalid Syntax Partition): Email không đúng định dạng chuẩn RFC / System Specification.

---

# TC-MOB-FORGOT-009: Yêu cầu mã OTP với email chứa khoảng trắng ở đầu hoặc cuối (" test@eshop.com ")

## Preconditions

- Tài khoản `test@eshop.com` đã đăng ký hợp lệ trong CSDL.
- Người dùng đang ở màn hình Quên mật khẩu Bước 1.

## Input Data

| Trường / Tham số | Giá trị                                          |
| ---------------- | ------------------------------------------------ |
| `forgotEmail`    | `" test@eshop.com "` (có dấu cách ở đầu và cuối) |

## Test Steps

1. Nhập `" test@eshop.com "` vào ô nhập email.
2. Nhấn nút "Lấy mã OTP".
3. Quan sát cách xử lý chuỗi ký tự của ứng dụng.

## Expected Result

- Ứng dụng hoặc server tự động cắt tỉa khoảng trắng (trim) để tìm thấy người dùng `test@eshop.com` và gửi OTP thành công; hoặc nếu không trim, hệ thống từ chối an toàn mà không làm crash ứng dụng.

## Coverage Rationale

Kiểm thử khả năng xử lý dữ liệu đầu vào chứa ký tự khoảng trắng dư thừa (Untrimmed Whitespace Robustness).

---

# TC-MOB-FORGOT-010: Yêu cầu mã OTP với email dạng chữ hoa toàn bộ ("TEST@ESHOP.COM")

## Preconditions

- Tài khoản được đăng ký trong hệ thống dưới dạng `test@eshop.com`.
- Người dùng đang ở màn hình Quên mật khẩu Bước 1.

## Input Data

| Trường / Tham số | Giá trị            |
| ---------------- | ------------------ |
| `forgotEmail`    | `"TEST@ESHOP.COM"` |

## Test Steps

1. Nhập `"TEST@ESHOP.COM"` vào ô nhập email.
2. Nhấn nút "Lấy mã OTP".
3. Kiểm tra phản hồi từ ứng dụng và API.

## Expected Result

- Theo chuẩn xử lý địa chỉ thư điện tử (Case-insensitive matching), hệ thống nhận diện đúng tài khoản `test@eshop.com`, phản hồi thành công và chuyển sang Bước 2.

## Coverage Rationale

Kiểm thử tính không phân biệt chữ hoa/chữ thường (Case-insensitivity) của trường định danh tài khoản email.

---

# TC-MOB-FORGOT-011: Chuyển đổi trạng thái từ Bước 1 sang Bước 2 và hiển thị các trường nhập liệu

## Preconditions

- Người dùng nhập email hợp lệ `test@eshop.com` tại Bước 1 và nhấn "Lấy mã OTP".
- Server phản hồi thành công (HTTP 200).

## Input Data

| Trường / Thao tác | Giá trị            |
| ----------------- | ------------------ |
| Trạng thái trước  | `forgotStep === 1` |
| Hành động         | Nhấn "Lấy mã OTP"  |
| Trạng thái sau    | `forgotStep === 2` |

## Test Steps

1. Nhập `test@eshop.com` và nhấn "Lấy mã OTP".
2. Quan sát quá trình re-render của component trên màn hình thiết bị.
3. Kiểm tra các thành phần giao diện mới xuất hiện.

## Expected Result

- Giao diện chuyển sang Bước 2: Ẩn ô nhập email Bước 1.
- Hiển thị thông báo hướng dẫn (`styles.messageBox`).
- Hiển thị ô nhập mã OTP có nhãn "Mã OTP (4 số)".
- Hiển thị ô nhập mật khẩu mới với nhãn "Mật khẩu mới" (`secureTextEntry`).
- Hiển thị nút "Đặt lại mật khẩu" (`styles.greenButton`) và nút "← Quay lại".

## Coverage Rationale

Kiểm thử chuyển đổi trạng thái biểu mẫu nhiều bước (Multi-step Form State Transition) trên nền tảng React Native.

---

# TC-MOB-FORGOT-012: Kiểm tra sự hiện diện của Chỉ báo bước (Step Indicator) tại Bước 2 theo đặc tả FR-03

## Preconditions

- Người dùng đã hoàn thành Bước 1 và đang ở màn hình Quên mật khẩu Bước 2 (`forgotStep === 2`).

## Input Data

| Trường / Thao tác   | Giá trị                   |
| ------------------- | ------------------------- |
| Màn hình            | Quên mật khẩu (Bước 2)    |
| Thành phần kiểm tra | Chỉ báo bước "Bước 2 / 2" |

## Test Steps

1. Điều hướng đến màn hình Bước 2 sau khi lấy OTP.
2. Quan sát toàn bộ giao diện từ tiêu đề đến các nút hành động.
3. Kiểm tra sự xuất hiện của nhãn chỉ báo "Bước 2 / 2" (hoặc "Step 2/2").

## Expected Result

- Theo đặc tả FR-03 và FR-22: Giao diện Bước 2 phải hiển thị chỉ báo bước rõ ràng "Bước 2 / 2" nhằm đồng bộ trải nghiệm người dùng trên biểu mẫu 2 bước.

## Coverage Rationale

Kiểm thử tuân thủ đặc tả giao diện (GUI Step Indicator Compliance) tại giai đoạn xác nhận mật khẩu mới.

---

# TC-MOB-FORGOT-013: Kiểm tra sự hiện diện của trường "Xác nhận mật khẩu mới" tại Bước 2 theo đặc tả FR-03 & FR-01

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu Bước 2 (`forgotStep === 2`).

## Input Data

| Trường / Thao tác   | Giá trị                                               |
| ------------------- | ----------------------------------------------------- |
| Màn hình            | Quên mật khẩu (Bước 2)                                |
| Thành phần kiểm tra | Ô nhập "Xác nhận mật khẩu mới" (Confirm New Password) |

## Test Steps

1. Mở màn hình Quên mật khẩu Bước 2.
2. Kiểm tra danh sách các ô nhập liệu (`TextInput`) trên màn hình.
3. Tìm kiếm trường nhập có nhãn "Xác nhận mật khẩu mới" và logic so khớp mật khẩu.

## Expected Result

- Theo đặc tả FR-03: "Người dùng nhập OTP, Mật khẩu mới, và Xác nhận mật khẩu mới. Hai trường mật khẩu phải khớp nhau."
- Giao diện phải cung cấp ô nhập "Xác nhận mật khẩu mới" và từ chối nếu hai mật khẩu không trùng khớp.

## Coverage Rationale

Kiểm thử sự đầy đủ của miền đầu vào biểu mẫu (Form Input Completeness & Password Confirmation) đối chiếu với đặc tả nghiệp vụ FR-03 và FR-01.

---

# TC-MOB-FORGOT-014: Kiểm tra nhãn và quy cách mã OTP tại Bước 2 giữa đặc tả (6 chữ số) và ứng dụng di động (4 chữ số)

## Preconditions

- Người dùng đang ở màn hình Quên mật khẩu Bước 2 trên Mobile App.

## Input Data

| Trường / Thao tác            | Giá trị             |
| ---------------------------- | ------------------- |
| Nhãn trường OTP trên UI      | "Mã OTP (4 số)"     |
| Độ dài OTP theo đặc tả FR-03 | 6 chữ số ngẫu nhiên |

## Test Steps

1. Quan sát nhãn của trường nhập mã OTP tại Bước 2 trên ứng dụng di động.
2. Kiểm tra thuộc tính bàn phím (`keyboardType="numeric"`).
3. So sánh quy cách số lượng ký tự OTP được yêu cầu giữa UI thực tế và tài liệu `README.md`.

## Expected Result

- Theo đặc tả FR-03: Hệ thống sinh mã OTP 6 chữ số ngẫu nhiên.
- Quan sát và ghi nhận sự sai lệch nếu giao diện hiển thị nhãn "Mã OTP (4 số)" và backend chỉ sinh mã 4 chữ số.

## Coverage Rationale

Kiểm thử đối chiếu đặc tả (Specification vs Implementation Oracle) về định dạng và độ dài của mã OTP xác thực.

---

# TC-MOB-FORGOT-015: Đặt lại mật khẩu thành công với mã OTP hợp lệ và mật khẩu mới mạnh hợp lệ

## Preconditions

- Đã yêu cầu OTP thành công cho `test@eshop.com` và lấy được mã OTP hợp lệ trong CSDL (ví dụ: `"5984"`).
- Người dùng đang ở màn hình Bước 2 trên ứng dụng mobile.

## Input Data

| Trường / Tham số | Giá trị                                                     |
| ---------------- | ----------------------------------------------------------- |
| `resetToken`     | Mã OTP hợp lệ sinh ra trong CSDL                            |
| `newPassword`    | `"Pass123@!"` (8 ký tự, có hoa, thường, số, ký tự đặc biệt) |
| Endpoint API     | `POST /api/reset-password`                                  |

## Test Steps

1. Nhập mã OTP hợp lệ vào ô "Mã OTP (4 số)".
2. Nhập `"Pass123@!"` vào ô "Mật khẩu mới".
3. Nhấn nút "Đặt lại mật khẩu".
4. Quan sát hộp thoại thông báo và luồng chuyển trang.

## Expected Result

- Mật khẩu mới vượt qua biểu thức chính quy kiểm tra độ mạnh phía client.
- Ứng dụng gửi request POST `/api/reset-password` thành công (HTTP 200).
- Hệ thống hiển thị hộp thoại: `Alert.alert("Thành công", "Đổi mật khẩu thành công!")`.
- Khi đóng alert, ứng dụng tự động chuyển về màn hình Đăng nhập (`view === "login"`).

## Coverage Rationale

Kiểm thử phân hoạch hợp lệ chính (Happy Path / Primary Valid Equivalence Partition) cho toàn bộ quy trình đặt lại mật khẩu ở Bước 2.

---

# TC-MOB-FORGOT-016: Từ chối đặt lại mật khẩu khi nhập sai giá trị mã OTP

## Preconditions

- Đã tạo mã OTP hợp lệ cho `test@eshop.com`.
- Người dùng đang ở màn hình Bước 2.

## Input Data

| Trường / Tham số | Giá trị                                        |
| ---------------- | ---------------------------------------------- |
| `resetToken`     | `"0000"` (mã OTP không khớp với mã trong CSDL) |
| `newPassword`    | `"Pass123@!"`                                  |

## Test Steps

1. Nhập mã OTP sai `"0000"` vào ô mã OTP.
2. Nhập mật khẩu mới hợp lệ `"Pass123@!"`.
3. Nhấn nút "Đặt lại mật khẩu".

## Expected Result

- Server phản hồi mã lỗi HTTP 400 Bad Request `{"error": "Invalid token or email"}`.
- Ứng dụng hiển thị thông báo: `Alert.alert("Lỗi", "Mã OTP không đúng hoặc có lỗi xảy ra.")`.
- Mật khẩu tài khoản không bị thay đổi trong cơ sở dữ liệu; người dùng vẫn ở lại Bước 2.

## Coverage Rationale

Kiểm thử phân hoạch tương đương không hợp lệ (Invalid OTP Value Partition) khi mã OTP nhập vào không trùng khớp.

---

# TC-MOB-FORGOT-017: Từ chối đặt lại mật khẩu khi để trống mã OTP ("")

## Preconditions

- Người dùng đang ở màn hình Bước 2 sau khi gửi yêu cầu cho `test@eshop.com`.

## Input Data

| Trường / Tham số | Giá trị                    |
| ---------------- | -------------------------- |
| `resetToken`     | `""` (để trống ô nhập OTP) |
| `newPassword`    | `"Pass123@!"`              |

## Test Steps

1. Không nhập gì vào ô mã OTP (để chuỗi rỗng `""`).
2. Nhập mật khẩu mới hợp lệ `"Pass123@!"`.
3. Nhấn nút "Đặt lại mật khẩu".

## Expected Result

- Hệ thống từ chối cập nhật mật khẩu, hiển thị `Alert.alert("Lỗi", "Mã OTP không đúng hoặc có lỗi xảy ra.")`.
- Mật khẩu cũ được giữ nguyên; không phát sinh ngoại lệ không bắt được (uncaught exception).

## Coverage Rationale

Kiểm thử giá trị rỗng / biên dưới của mã OTP (Empty OTP Boundary Partition).

---

# TC-MOB-FORGOT-018: Từ chối đặt lại mật khẩu khi mã OTP chứa chữ cái hoặc ký tự đặc biệt

## Preconditions

- Người dùng đang ở màn hình Bước 2 trên ứng dụng mobile.

## Input Data

| Trường / Tham số | Giá trị                |
| ---------------- | ---------------------- |
| `resetToken`     | `"12AB"` hoặc `"12!@"` |
| `newPassword`    | `"Pass123@!"`          |

## Test Steps

1. Cố tình nhập chuỗi chứa chữ cái hoặc ký tự đặc biệt vào ô OTP (thông qua bàn phím hoặc paste clipboard).
2. Nhập mật khẩu mới hợp lệ `"Pass123@!"`.
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Bàn phím số (`keyboardType="numeric"`) hạn chế người dùng nhập chữ cái; nếu nhập được bằng paste, hệ thống từ chối cập nhật và hiển thị alert báo lỗi OTP không hợp lệ.

## Coverage Rationale

Kiểm thử miền dữ liệu không đúng định dạng số của mã OTP (Non-numeric OTP Format Partition).

---

# TC-MOB-FORGOT-019: Cô lập tài khoản — Từ chối sử dụng mã OTP chéo giữa các tài khoản người dùng

## Preconditions

- User A (`test@eshop.com`) và User B (`admin@eshop.com`) cùng tồn tại trong CSDL.
- Tạo mã OTP hợp lệ cho User A (`test@eshop.com`).

## Input Data

| Trường / Tham số           | Giá trị                                         |
| -------------------------- | ----------------------------------------------- |
| `forgotEmail` gửi ở Bước 2 | `"admin@eshop.com"` (User B)                    |
| `resetToken`               | Mã OTP vừa sinh của `"test@eshop.com"` (User A) |
| `newPassword`              | `"NewPass123@!"`                                |

## Test Steps

1. Gửi request đặt lại mật khẩu với email của User B nhưng sử dụng mã OTP của User A.
2. Kiểm tra phản hồi từ API và thông báo trên ứng dụng.

## Expected Result

- Câu lệnh SQL kiểm tra đồng thời cả `email` và `reset_token`: `WHERE email = ? AND reset_token = ?`.
- Do mã OTP của User A không khớp với bản ghi của User B, câu lệnh không cập nhật dòng nào (`changes === 0`).
- Server trả về HTTP 400 và ứng dụng hiển thị alert: "Mã OTP không đúng hoặc có lỗi xảy ra.".
- Tài khoản User B hoàn toàn được bảo vệ, không bị chiếm đoạt mật khẩu chéo.

## Coverage Rationale

Kiểm thử phân hoạch bảo mật cô lập dữ liệu chéo tài khoản (Cross-account Token Isolation / Authorization Boundary).

---

# TC-MOB-FORGOT-020: Đặt lại mật khẩu với mật khẩu mới đạt đúng độ dài tối thiểu 8 ký tự kèm đủ các nhóm ký tự

## Preconditions

- Người dùng đang ở Bước 2 với mã OTP hợp lệ của `test@eshop.com`.

## Input Data

| Trường / Tham số | Giá trị                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------- |
| `newPassword`    | `"Pass123@"` (đúng 8 ký tự: 1 hoa `P`, 3 thường `ass`, 3 số `123`, 1 ký tự đặc biệt `@`) |

## Test Steps

1. Nhập mã OTP hợp lệ vào ô OTP.
2. Nhập `"Pass123@"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Biểu thức chính quy `strongPasswordRegex` phía client thẩm định đạt yêu cầu tối thiểu 8 ký tự.
- Gửi yêu cầu đặt lại mật khẩu lên server thành công; hiển thị Alert thông báo đổi mật khẩu thành công.

## Coverage Rationale

Kiểm thử phân tích giá trị biên tối thiểu (Lower Boundary Value: `min_length = 8`) của trường mật khẩu mới.

---

# TC-MOB-FORGOT-021: Từ chối mật khẩu mới có độ dài dưới 8 ký tự (7 ký tự)

## Preconditions

- Người dùng đang ở Bước 2 với mã OTP hợp lệ.

## Input Data

| Trường / Tham số | Giá trị                                                                    |
| ---------------- | -------------------------------------------------------------------------- |
| `newPassword`    | `"Pas12@!"` (độ dài đúng 7 ký tự: chứa đủ hoa, thường, số, ký tự đặc biệt) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập chuỗi 7 ký tự `"Pas12@!"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Client-side validation chặn ngay lập tức mà không gửi request lên backend.
- Hiển thị thông báo: `Alert.alert("Lỗi", "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT.")`.
- Mật khẩu giữ nguyên, form không bị reset.

## Coverage Rationale

Kiểm thử giá trị ngay dưới biên tối thiểu (`min_length - 1 = 7 ký tự`) của quy tắc độ mạnh mật khẩu.

---

# TC-MOB-FORGOT-022: Từ chối mật khẩu mới để trống ("")

## Preconditions

- Người dùng đang ở Bước 2 với mã OTP hợp lệ.

## Input Data

| Trường / Tham số | Giá trị                     |
| ---------------- | --------------------------- |
| `newPassword`    | `""` (chuỗi rỗng, độ dài 0) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Để trống ô nhập "Mật khẩu mới".
3. Nhấn nút "Đặt lại mật khẩu".

## Expected Result

- Client validation phát hiện chuỗi rỗng không thỏa mãn regex độ mạnh mật khẩu.
- Hiển thị hộp thoại Alert cảnh báo mật khẩu quá yếu.
- Không có request HTTP nào được gửi đến `/api/reset-password`.

## Coverage Rationale

Kiểm thử phân hoạch không hợp lệ cho trường mật khẩu mới để trống (Empty Password Partition).

---

# TC-MOB-FORGOT-023: Từ chối mật khẩu mới thiếu ký tự chữ in hoa (A-Z)

## Preconditions

- Người dùng đang ở Bước 2 với mã OTP hợp lệ.

## Input Data

| Trường / Tham số | Giá trị                                                                        |
| ---------------- | ------------------------------------------------------------------------------ |
| `newPassword`    | `"validpass1@"` (độ dài 11 ký tự, có thường, số, đặc biệt nhưng thiếu chữ hoa) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"validpass1@"` vào ô "Mật khẩu mới".
3. Nhấn nút "Đặt lại mật khẩu".

## Expected Result

- Client regex phát hiện thiếu chữ in hoa `(?=.*[A-Z])`.
- Hệ thống hiển thị hộp thoại `Alert.alert("Lỗi", "Mật khẩu quá yếu!...")`.
- Ngăn chặn gửi dữ liệu lên máy chủ.

## Coverage Rationale

Kiểm thử phân hoạch tương đương không hợp lệ: Thiếu phân lớp ký tự chữ hoa (Missing Uppercase Character Class Partition).

---

# TC-MOB-FORGOT-024: Từ chối mật khẩu mới thiếu ký tự chữ in thường (a-z)

## Preconditions

- Người dùng đang ở Bước 2 với mã OTP hợp lệ.

## Input Data

| Trường / Tham số | Giá trị                                                                        |
| ---------------- | ------------------------------------------------------------------------------ |
| `newPassword`    | `"VALIDPASS1@"` (độ dài 11 ký tự, có hoa, số, đặc biệt nhưng thiếu chữ thường) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"VALIDPASS1@"` vào ô "Mật khẩu mới".
3. Nhấn nút "Đặt lại mật khẩu".

## Expected Result

- Client regex phát hiện thiếu chữ in thường `(?=.*[a-z])`.
- Hiển thị `Alert.alert("Lỗi", "Mật khẩu quá yếu!...")`.
- Thao tác đặt lại mật khẩu bị hủy bỏ.

## Coverage Rationale

Kiểm thử phân hoạch tương đương không hợp lệ: Thiếu phân lớp ký tự chữ thường (Missing Lowercase Character Class Partition).

---

# TC-MOB-FORGOT-025: Từ chối mật khẩu mới thiếu ký tự chữ số (0-9)

## Preconditions

- Người dùng đang ở Bước 2 với mã OTP hợp lệ.

## Input Data

| Trường / Tham số | Giá trị                                                                    |
| ---------------- | -------------------------------------------------------------------------- |
| `newPassword`    | `"ValidPass@@"` (độ dài 11 ký tự, có hoa, thường, đặc biệt nhưng thiếu số) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"ValidPass@@"` vào ô "Mật khẩu mới".
3. Nhấn nút "Đặt lại mật khẩu".

## Expected Result

- Client regex phát hiện thiếu chữ số `(?=.*\d)`.
- Hiển thị hộp thoại thông báo mật khẩu quá yếu.

## Coverage Rationale

Kiểm thử phân hoạch tương đương không hợp lệ: Thiếu phân lớp chữ số (Missing Numeric Digit Class Partition).

---

# TC-MOB-FORGOT-026: Từ chối mật khẩu mới thiếu ký tự đặc biệt

## Preconditions

- Người dùng đang ở Bước 2 với mã OTP hợp lệ.

## Input Data

| Trường / Tham số | Giá trị                                                               |
| ---------------- | --------------------------------------------------------------------- |
| `newPassword`    | `"ValidPass123"` (độ dài 12 ký tự, chỉ gồm chữ hoa, chữ thường và số) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"ValidPass123"` vào ô "Mật khẩu mới".
3. Nhấn nút "Đặt lại mật khẩu".

## Expected Result

- Client regex phát hiện thiếu ký tự đặc biệt `(?=.*[^A-Za-z\d])`.
- Hiển thị hộp thoại cảnh báo: `Alert.alert("Lỗi", "Mật khẩu quá yếu!...")`.

## Coverage Rationale

Kiểm thử phân hoạch tương đương không hợp lệ: Thiếu phân lớp ký tự đặc biệt (Missing Special Character Class Partition).

---

# TC-MOB-FORGOT-027: Đặt lại mật khẩu với các ký tự đặc biệt hợp lệ trong tập quy định (@, $, !, %, \*, ?, &)

## Preconditions

- Người dùng đang ở Bước 2 với mã OTP hợp lệ.

## Input Data

| Trường / Tham số         | Giá trị                        |
| ------------------------ | ------------------------------ |
| `newPassword` biến thể 1 | `"Pass$1234"` (dùng ký tự `$`) |
| `newPassword` biến thể 2 | `"Pass!1234"` (dùng ký tự `!`) |
| `newPassword` biến thể 3 | `"Pass%1234"` (dùng ký tự `%`) |
| `newPassword` biến thể 4 | `"Pass*1234"` (dùng ký tự `*`) |
| `newPassword` biến thể 5 | `"Pass?1234"` (dùng ký tự `?`) |
| `newPassword` biến thể 6 | `"Pass&1234"` (dùng ký tự `&`) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Lần lượt thử nghiệm với từng biến thể mật khẩu chứa ký tự đặc biệt thuộc tập hợp chuẩn quy định tại FR-01/FR-03.
3. Nhấn nút "Đặt lại mật khẩu".

## Expected Result

- Tất cả các biến thể ký tự đặc biệt hợp lệ đều được biểu thức chính quy của mobile app chấp nhận.
- Đặt lại mật khẩu thành công và hiển thị Alert thông báo thành công.

## Coverage Rationale

Kiểm thử độ bao phủ toàn diện của tập ký tự đặc biệt hợp lệ theo đặc tả (Special Character Equivalence Set Coverage).

---

# TC-MOB-FORGOT-028: Đặt lại mật khẩu với ký tự đặc biệt ngoài tập quy định tại FR-01 (ví dụ #, ^, \_)

## Preconditions

- Người dùng đang ở Bước 2 với mã OTP hợp lệ.

## Input Data

| Trường / Tham số | Giá trị                                                                  |
| ---------------- | ------------------------------------------------------------------------ |
| `newPassword`    | `"ValidPass1#"` (chứa ký tự `#` không thuộc tập `{@, $, !, %, *, ?, &}`) |

## Test Steps

1. Nhập mã OTP hợp lệ.
2. Nhập `"ValidPass1#"` vào ô "Mật khẩu mới".
3. Nhấn nút "Đặt lại mật khẩu".
4. Quan sát phản hồi của ứng dụng di động.

## Expected Result

- Theo regex triển khai trên Mobile (`(?=.*[^A-Za-z\d])`): Chấp nhận bất kỳ ký tự nào không phải chữ cái và số, bao gồm `#`.
- Theo đặc tả FR-01/FR-03: Ký tự đặc biệt quy định cụ thể gồm `@`, `$`, `!`, `%`, `*`, `?`, `&`.
- Kiểm thử và ghi nhận hành vi chấp nhận ký tự ngoài danh mục chuẩn của regex trên mobile app.

## Coverage Rationale

Kiểm thử miền giá trị ký tự đặc biệt ngoài danh mục cho phép (Out-of-Specification Special Character Boundary Partition).

---

# TC-MOB-FORGOT-029: Điều hướng quay lại Bước 1 từ Bước 2 bằng nút "← Quay lại"

## Preconditions

- Người dùng đã hoàn thành Bước 1 với email `test@eshop.com` và đang ở Bước 2 (`forgotStep === 2`).

## Input Data

| Trường / Thao tác  | Giá trị                                    |
| ------------------ | ------------------------------------------ |
| Màn hình           | Quên mật khẩu (Bước 2)                     |
| Thao tác tương tác | Nhấn nút "← Quay lại" (`setForgotStep(1)`) |

## Test Steps

1. Tại màn hình Bước 2, nhấn vào nút "← Quay lại".
2. Quan sát sự thay đổi của giao diện ứng dụng.
3. Kiểm tra giá trị ô nhập email tại Bước 1.

## Expected Result

- Giao diện chuyển đổi trạng thái trở lại Bước 1 (`forgotStep = 1`).
- Form Bước 2 (ô OTP, mật khẩu mới) được ẩn đi; form Bước 1 (ô email, nút "Lấy mã OTP") hiển thị trở lại.
- Giá trị email đã nhập trước đó (`test@eshop.com`) vẫn được lưu giữ trong state `forgotEmail`, không bị mất trắng.

## Coverage Rationale

Kiểm thử điều hướng quay lại giữa các bước (Step-back Navigation & Form State Retention) trong quy trình Quên mật khẩu.

---

# TC-MOB-FORGOT-030: Xác minh đăng nhập thành công bằng mật khẩu mới sau khi hoàn tất quy trình Quên mật khẩu

## Preconditions

- Tài khoản `test@eshop.com` đã hoàn tất quy trình đặt lại mật khẩu với mật khẩu mới `"BrandNewPass123!"`.
- Ứng dụng đã tự động điều hướng về màn hình Đăng nhập (`view === "login"`).

## Input Data

| Trường / Tham số | Giá trị              |
| ---------------- | -------------------- |
| `email`          | `"test@eshop.com"`   |
| `password` (mới) | `"BrandNewPass123!"` |
| `password` (cũ)  | `"Test1234!"`        |

## Test Steps

1. Thử đăng nhập bằng mật khẩu cũ `"Test1234!"` và nhấn "Sign In".
2. Xác nhận hệ thống từ chối đăng nhập với mật khẩu cũ.
3. Nhập mật khẩu mới `"BrandNewPass123!"` và nhấn "Sign In".
4. Quan sát trạng thái đăng nhập của ứng dụng di động.

## Expected Result

- Đăng nhập với mật khẩu cũ thất bại (báo lỗi đăng nhập).
- Đăng nhập với mật khẩu mới thành công: Server trả về JWT Token và thông tin người dùng.
- Header ứng dụng hiển thị `Chào, <user.name>`.
- Toàn bộ chu trình Quên mật khẩu & Đặt lại mật khẩu đạt tính toàn vẹn nghiệp vụ đầu cuối (End-to-End Integrity).

## Coverage Rationale

Kiểm thử tích hợp luồng nghiệp vụ hoàn chỉnh từ đầu đến cuối (End-to-End Business Flow Integration Verification) xác minh mật khẩu mới có hiệu lực thực tế và mật khẩu cũ bị vô hiệu hóa.
