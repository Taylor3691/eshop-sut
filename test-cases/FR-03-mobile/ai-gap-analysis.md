# TC-GAP-MOB-001: Không hiển thị mã OTP trực tiếp trên màn hình trong môi trường demo trên Mobile

## Missing Scenario
Kiểm tra khả năng hiển thị mã OTP trực tiếp trên giao diện ứng dụng di động trong môi trường demo/thực hành kiểm thử theo quy định đặc tả FR-03, giúp người kiểm thử hoặc người dùng demo nhận được mã mà không cần cấu hình hạ tầng gửi email thực tế.

## Preconditions
- Tài khoản `test@eshop.com` tồn tại trong cơ sở dữ liệu hệ thống.
- Hệ thống đang chạy trong môi trường demo/testing.
- Người dùng đang ở màn hình Quên mật khẩu Bước 1 trên Mobile App.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| `forgotEmail` | `"test@eshop.com"` |
| Endpoint API | `POST /api/forgot-password` |

## Test Steps
1. Nhập `"test@eshop.com"` vào ô "Nhập Email của bạn" tại Bước 1.
2. Nhấn nút "Lấy mã OTP".
3. Chờ ứng dụng chuyển sang Bước 2.
4. Quan sát toàn bộ nội dung và hộp thông báo hiển thị tại Bước 2 (`styles.messageBox`).

## Expected Result
- Theo đặc tả FR-03: *"trong môi trường demo: hiển thị trực tiếp trên màn hình"*.
- Ứng dụng phải lấy thuộc tính `data.resetToken` từ phản hồi của API và hiển thị mã OTP trực tiếp trên màn hình (tương tự như banner trên web).
- Người dùng có thể đọc được mã OTP để điền vào ô xác thực ở Bước 2.

## Gap Rationale
Bộ kiểm thử web ban đầu (`TC-FORGOT-001`) chỉ xác minh giao diện web (nơi mã OTP được render ở banner màu xanh). AI bỏ sót việc kiểm tra mã nguồn mobile trong `frontend-mobile/App.js:251-253`, nơi ứng dụng gán cứng chuỗi `setForgotMessage("Nếu email tồn tại trong hệ thống, mã OTP đã được gửi đến email của bạn.")` và bỏ qua hoàn toàn `data.resetToken`, khiến người dùng trên mobile không thể biết được mã OTP trong môi trường demo.

---

# TC-GAP-MOB-002: Thiếu trường "Xác nhận mật khẩu mới" (Confirm New Password) trên giao diện Mobile

## Missing Scenario
Kiểm tra sự hiện diện của trường nhập xác nhận mật khẩu mới và cơ chế so khớp độ lệch mật khẩu (levenshtein distance check) trên giao diện Mobile App.

## Preconditions
- Người dùng đã hoàn thành Bước 1 và đang ở màn hình Quên mật khẩu Bước 2 (`forgotStep === 2`) trên Mobile App.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Màn hình | Quên mật khẩu (Bước 2) |
| Thành phần kiểm tra | Trường nhập "Xác nhận mật khẩu mới" (`confirmPassword`) |

## Test Steps
1. Điều hướng đến màn hình Bước 2 trên Mobile App.
2. Kiểm tra cấu trúc các thẻ `TextInput` và nhãn `Text` trong hàm `renderForgotPassword()`.
3. Tìm kiếm trường nhập "Xác nhận mật khẩu mới" và logic kiểm tra so khớp hai mật khẩu.

## Expected Result
- Theo đặc tả FR-03 và FR-01: *"Người dùng nhập OTP, Mật khẩu mới, và Xác nhận mật khẩu mới. Hai trường mật khẩu phải khớp nhau."*
- Giao diện Bước 2 trên Mobile phải cung cấp trường nhập "Xác nhận mật khẩu mới" và từ chối nếu hai mật khẩu không khớp.

## Gap Rationale
Trong thiết kế kiểm thử hộp đen ban đầu, AI suy diễn ca kiểm thử dựa trên giả định rằng giao diện đã có sẵn trường xác nhận mật khẩu. Trên thực tế, component `renderForgotPassword()` trong `frontend-mobile/App.js:860-889` chỉ render trường `newPassword` và bỏ quên hoàn toàn trường `confirmPassword`.

---

# TC-GAP-MOB-003: Thiếu Chỉ báo bước ("Bước 1 / 2" và "Bước 2 / 2") trên giao diện Mobile

## Missing Scenario
Kiểm tra sự hiện diện của thành phần Chỉ báo bước (Step Indicator) trực quan trên cả hai bước của giao diện Quên mật khẩu trên ứng dụng di động.

## Preconditions
- Người dùng mở màn hình Quên mật khẩu trên Mobile App (`view === "forgotPassword"`).

## Input Data
| Trường / Thao tác | Giá trị |
|---|---|
| Màn hình Bước 1 | `forgotStep === 1` |
| Màn hình Bước 2 | `forgotStep === 2` |

## Test Steps
1. Mở màn hình Quên mật khẩu tại Bước 1 và quan sát vùng tiêu đề/nội dung.
2. Nhập email hợp lệ để chuyển sang Bước 2 và quan sát tiếp.
3. Kiểm tra xem có hiển thị văn bản hoặc thanh chỉ báo bước nào không (ví dụ: "Bước 1 / 2", "Bước 2 / 2").

## Expected Result
- Theo đặc tả FR-03 và FR-22: *"Giao diện phải hiển thị chỉ báo bước (Step Indicator) — ví dụ: 'Bước 1 / 2'"*.
- Giao diện phải cung cấp chỉ báo rõ ràng để người dùng biết quy trình gồm 2 bước và vị trí hiện tại.

## Gap Rationale
AI tập trung chủ yếu vào các kịch bản kiểm thử dữ liệu nghiệp vụ (Data Validation) mà bỏ sót kiểm thử thành phần giao diện tĩnh (GUI Indicator) theo yêu cầu bắt buộc của tài liệu SRS.

---

# TC-GAP-MOB-004: Thiếu nút "Quay lại đăng nhập" trong biểu mẫu Bước 1 trên Mobile

## Missing Scenario
Kiểm tra sự hiện diện của nút điều hướng quay về màn hình Đăng nhập ngay trong biểu mẫu của Bước 1.

## Preconditions
- Người dùng đang ở màn hình Quên mật khẩu Bước 1 trên Mobile App.

## Input Data
| Trường / Thao tác | Giá trị |
|---|---|
| Màn hình | Quên mật khẩu (Bước 1) |
| Thành phần kiểm tra | Nút bấm "Quay lại đăng nhập" |

## Test Steps
1. Quan sát toàn bộ khung biểu mẫu (`styles.formContainer`) tại Bước 1.
2. Tìm nút hoặc liên kết có chức năng đưa người dùng quay lại màn hình Đăng nhập.

## Expected Result
- Theo đặc tả FR-03: *"Có nút Quay lại đăng nhập"*.
- Biểu mẫu Bước 1 phải có nút cho phép người dùng quay lại `view === "login"` thuận tiện.

## Gap Rationale
Trong mã nguồn `frontend-mobile/App.js:843-858`, Bước 1 chỉ có duy nhất ô nhập email và nút "Lấy mã OTP". Nút "← Quay lại" chỉ tồn tại ở Bước 2 và chỉ quay lại Bước 1, khiến người dùng ở Bước 1 không có lối thoát trực tiếp trên form để trở về Đăng nhập.

---

# TC-GAP-MOB-005: Backend API bỏ qua kiểm tra độ mạnh mật khẩu khi đặt lại mật khẩu trực tiếp qua API

## Missing Scenario
Kiểm tra tính phòng thủ của tầng Backend API khi nhận yêu cầu đặt lại mật khẩu với mật khẩu yếu (ví dụ `"123"` hoặc `"weak"`), bỏ qua lớp kiểm tra phía client.

## Preconditions
- Tài khoản `test@eshop.com` đã tạo mã OTP hợp lệ trong cơ sở dữ liệu.
- Kẻ tấn công hoặc client gửi trực tiếp HTTP POST đến endpoint API.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Endpoint API | `POST /api/reset-password` |
| `email` | `"test@eshop.com"` |
| `resetToken` | Mã OTP hợp lệ |
| `newPassword` | `"123"` (mật khẩu quá ngắn, không thỏa mãn FR-01) |

## Test Steps
1. Yêu cầu mã OTP hợp lệ cho `test@eshop.com`.
2. Gửi request `POST /api/reset-password` trực tiếp với payload `{"email": "test@eshop.com", "resetToken": "<OTP>", "newPassword": "123"}`.
3. Kiểm tra mã phản hồi HTTP từ server.
4. Thử đăng nhập lại tài khoản `test@eshop.com` với mật khẩu `"123"`.

## Expected Result
- Theo yêu cầu bảo mật SEC-02 và FR-03: Backend API bắt buộc phải thẩm định độ mạnh của mật khẩu mới trước khi cập nhật vào CSDL.
- Backend phải từ chối mật khẩu yếu và trả về mã lỗi HTTP 400 Bad Request.

## Gap Rationale
Bộ test client-side chỉ thực thi qua form mobile (nơi có regex chặn). AI mắc lỗi "Giả định đồng bộ đa tầng" (Tier Symmetry Assumption), mặc định tin rằng backend cũng kiểm tra độ mạnh mật khẩu giống client. Thực tế trong `backend/server.js:87-98`, backend không hề có bất kỳ câu lệnh validate nào và lưu thẳng chuỗi mật khẩu yếu vào CSDL.

---

# TC-GAP-MOB-006: Regex kiểm tra mật khẩu trên Mobile chấp nhận ký tự đặc biệt ngoài danh mục chuẩn FR-01

## Missing Scenario
Kiểm tra việc biểu thức chính quy trên Mobile App chấp nhận các ký tự đặc biệt ngoài tập hợp quy định tại FR-01 (như `#`, `_`, `-`, `~`).

## Preconditions
- Người dùng đang ở màn hình Quên mật khẩu Bước 2 với mã OTP hợp lệ.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| `resetToken` | Mã OTP hợp lệ |
| `newPassword` | `"Pass1234#"` (chứa ký tự `#` không thuộc tập `{@, $, !, %, *, ?, &}`) |

## Test Steps
1. Nhập mã OTP hợp lệ vào ô OTP.
2. Nhập `"Pass1234#"` vào ô "Mật khẩu mới".
3. Nhấn "Đặt lại mật khẩu".
4. Quan sát phản ứng của client regex.

## Expected Result
- Theo đặc tả FR-01 và FR-03: Ký tự đặc biệt hợp lệ được giới hạn nghiêm ngặt trong tập hợp `{@, $, !, %, *, ?, &}`.
- Hệ thống cần từ chối hoặc cảnh báo nếu ký tự đặc biệt không thuộc danh mục cho phép.

## Gap Rationale
Trong `frontend-mobile/App.js:261-262`, lập trình viên triển khai regex `(?=.*[^A-Za-z\d])`. Regex này chấp nhận bất kỳ ký tự nào không phải chữ cái và số, dẫn đến việc các ký tự như `#`, `_`, `-` đều được client coi là hợp lệ dù nằm ngoài danh mục đặc tả.

---

# TC-GAP-MOB-007: Kiểm tra tính dùng một lần của mã OTP (Ngăn chặn Tấn công phát lại / Replay Attack)

## Missing Scenario
Kiểm tra việc vô hiệu hóa mã OTP ngay sau khi đã sử dụng để đặt lại mật khẩu thành công, ngăn chặn kẻ tấn công sử dụng lại cùng một mã OTP.

## Preconditions
- Tài khoản `test@eshop.com` đã sử dụng mã OTP hợp lệ để đặt lại mật khẩu thành công lần 1.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Endpoint API | `POST /api/reset-password` |
| `email` | `"test@eshop.com"` |
| `resetToken` | Mã OTP đã dùng thành công ở lần 1 |
| `newPassword` | `"AnotherPass123!"` |

## Test Steps
1. Hoàn tất việc đổi mật khẩu lần 1 bằng mã OTP hợp lệ.
2. Lập tức gửi tiếp một request `POST /api/reset-password` lần 2 với cùng mã OTP đó và mật khẩu mới khác.
3. Kiểm tra mã phản hồi HTTP và dữ liệu trả về từ server.

## Expected Result
- Theo nguyên tắc an toàn bảo mật SEC-07: Mã OTP phải bị hủy ngay sau khi sử dụng (Single-use token).
- Lần gọi thứ 2 phải bị từ chối với mã lỗi HTTP 400 Bad Request `{"error": "Invalid token or email"}`.

## Gap Rationale
AI thiết kế test case thường chỉ kiểm tra luồng thông thường thành công 1 lần mà bỏ sót kiểm thử lỗ hổng bảo mật tấn công phát lại (Replay Attack) và tính dùng một lần của token xác thực.

---

# TC-GAP-MOB-008: Độ dài mã OTP sinh ra trên Backend và nhãn UI là 4 chữ số thay vì 6 chữ số

## Missing Scenario
Kiểm tra độ dài thực tế của mã OTP được sinh ra từ backend và nhãn trường nhập liệu tương ứng trên giao diện Mobile App.

## Preconditions
- Người dùng gửi yêu cầu lấy OTP cho tài khoản `test@eshop.com`.

## Input Data
| Trường / Tham số | Giá trị |
|---|---|
| Endpoint API | `POST /api/forgot-password` |
| `email` | `"test@eshop.com"` |

## Test Steps
1. Gửi yêu cầu `POST /api/forgot-password`.
2. Kiểm tra độ dài và giá trị của chuỗi `resetToken` trong phản hồi API.
3. Quan sát nhãn của trường nhập mã OTP trên màn hình Bước 2 của Mobile App.

## Expected Result
- Theo đặc tả FR-03: *"Hệ thống sinh mã OTP 6 chữ số ngẫu nhiên"*.
- Mã OTP phải gồm đúng 6 chữ số và nhãn giao diện phải ghi "Mã OTP (6 số)".

## Gap Rationale
AI thiết kế ban đầu chỉ phân loại các mã < 6 chữ số vào lớp không hợp lệ, không ngờ rằng mã nguồn thực tế tại `backend/server.js:72` lại dùng công thức `Math.floor(1000 + Math.random() * 9000)` chỉ sinh mã 4 chữ số, và nhãn trên mobile tại `frontend-mobile/App.js:862` ghi thẳng `Mã OTP (4 số)`.

---

# TC-GAP-MOB-009: Thiếu trạng thái Loading và khóa nút bấm chống gửi trùng lặp (Double Submit) trên Mobile

## Missing Scenario
Kiểm tra hành vi của giao diện Mobile khi người dùng nhấn liên tiếp nhiều lần vào nút "Lấy mã OTP" hoặc "Đặt lại mật khẩu" trong khi request đang được xử lý.

## Preconditions
- Người dùng đang ở màn hình Quên mật khẩu trên Mobile App.

## Input Data
| Trường / Thao tác | Giá trị |
|---|---|
| Thao tác tương tác | Nhấn liên tiếp 2-3 lần vào nút "Lấy mã OTP" hoặc "Đặt lại mật khẩu" |

## Test Steps
1. Nhập email hợp lệ tại Bước 1.
2. Nhấn nút "Lấy mã OTP" nhanh 2-3 lần liên tiếp.
3. Kiểm tra số lượng request gửi đi trên mạng và trạng thái nút bấm.

## Expected Result
- Nút bấm phải có trạng thái loading, hiển thị biểu tượng quay vòng hoặc đổi nhãn (ví dụ: "Đang gửi...").
- Thuộc tính `disabled` phải được kích hoạt để chặn người dùng nhấn nhiều lần gây gửi trùng request hoặc sinh mã OTP liên tục.

## Gap Rationale
Trong khi màn hình Checkout và Coupon trên Mobile có cờ `checkoutLoading` và `applyingCoupon`, màn hình Quên mật khẩu trong `frontend-mobile/App.js:242-284` hoàn toàn thiếu cơ chế quản lý trạng thái loading và khóa nút bấm.

---

# TC-GAP-MOB-010: Thông báo lỗi mạng sai lệch ở Bước 2 trên Mobile

## Missing Scenario
Kiểm tra thông báo lỗi hiển thị cho người dùng khi xảy ra sự cố mất kết nối mạng (network timeout / offline) lúc thực hiện đặt lại mật khẩu tại Bước 2.

## Preconditions
- Người dùng đã điền mã OTP và mật khẩu mới hợp lệ tại Bước 2.
- Ứng dụng bị mất kết nối mạng hoặc server ngừng hoạt động.

## Input Data
| Trường / Điều kiện | Giá trị |
|---|---|
| Trạng thái mạng | Mất kết nối (Offline / Network Error) |
| Thao tác | Nhấn nút "Đặt lại mật khẩu" |

## Test Steps
1. Nhập mã OTP và mật khẩu mới.
2. Ngắt kết nối mạng của thiết bị hoặc dừng backend server.
3. Nhấn nút "Đặt lại mật khẩu".
4. Quan sát nội dung thông báo hiển thị trên hộp thoại Alert.

## Expected Result
- Ứng dụng phải bắt lỗi mạng và hiển thị thông báo rõ ràng về sự cố kết nối: "Lỗi kết nối mạng" hoặc "Không thể kết nối đến máy chủ".
- Không được quy chụp lỗi mất mạng thành lỗi do người dùng nhập sai mã OTP.

## Gap Rationale
Trong `frontend-mobile/App.js:281-283`, khối `catch (error)` của `handleResetPassword` hiển thị cố định: `Alert.alert("Lỗi", "Mã OTP không đúng hoặc có lỗi xảy ra.")`. Điều này đánh lừa người dùng rằng mã OTP của họ bị sai khi gặp sự cố mạng, gây hoang mang và cản trở trải nghiệm người dùng.

---

## Bảng Kết quả Thực thi Kiểm thử Thực tế (Execution Results Table)

Toàn bộ các ca kiểm thử lỗ hổng dưới đây đã được **thực thi và xác minh trực tiếp** trên Backend EShop đang chạy tại `http://localhost:3000` kết hợp đối chiếu chi tiết mã nguồn phân hệ di động `frontend-mobile/App.js`.

| Mã Kiểm thử (Test ID) | Kịch bản Kiểm thử | Dữ liệu Đầu vào / Thao tác | Kết quả Mong đợi (Oracle) | Kết quả Thực tế (Ghi nhận) | Trạng thái | Minh chứng (Evidence) | Mã Lỗi (Defect ID) |
|---|---|---|---|---|---|---|---|
| **TC-GAP-MOB-001** | Hiển thị mã OTP ở môi trường demo trên Mobile | Nhập email hợp lệ tại Bước 1, nhấn "Lấy mã OTP" | Ứng dụng hiển thị mã OTP trực tiếp trên màn hình demo | `setForgotMessage()` hiển thị chuỗi tĩnh; bỏ qua `data.resetToken`, không hiện OTP | **FAIL** | `frontend-mobile/App.js:251-253` bỏ qua `data.resetToken` từ API | **DEF-FR03-08** |
| **TC-GAP-MOB-002** | Trường "Xác nhận mật khẩu mới" trên Mobile | Kiểm tra các trường nhập liệu tại Bước 2 | Có trường "Xác nhận mật khẩu mới" và so khớp | Biểu mẫu Bước 2 chỉ có `resetToken` và `newPassword`; thiếu hoàn toàn ô xác nhận | **FAIL** | `frontend-mobile/App.js:860-889` không render trường confirmPassword | **DEF-FR03-07** |
| **TC-GAP-MOB-003** | Chỉ báo bước ("Bước 1 / 2") trên Mobile UI | Quan sát giao diện Bước 1 và Bước 2 | Hiển thị chỉ báo "Bước 1 / 2" và "Bước 2 / 2" | Không có bất kỳ chỉ báo bước nào xuất hiện trên cả 2 bước | **FAIL** | `frontend-mobile/App.js:839-891` chỉ có header "Quên Mật Khẩu" | **DEF-FR03-04** |
| **TC-GAP-MOB-004** | Nút "Quay lại đăng nhập" ở Bước 1 | Kiểm tra các nút bấm tại Bước 1 | Có nút "Quay lại đăng nhập" đưa về trang Login | Bước 1 chỉ có nút "Lấy mã OTP", không có nút quay lại đăng nhập | **FAIL** | `frontend-mobile/App.js:843-858` không có nút quay lại | **DEF-FR03-03** |
| **TC-GAP-MOB-005** | Backend API bỏ qua kiểm tra độ mạnh mật khẩu | `POST /api/reset-password` với `newPassword: "123"` | Backend từ chối HTTP 400 do mật khẩu yếu | Backend trả về HTTP 200; đổi thành công MK thành `"123"`; đăng nhập bằng `"123"` OK | **FAIL** | Probe live: HTTP 200; `server.js:87-98` thiếu validation | **DEF-FR03-06** |
| **TC-GAP-MOB-006** | Mobile Regex chấp nhận ký tự ngoài FR-01 | Nhập mật khẩu có ký tự `#` (`"Pass1234#"`) | Từ chối do `#` không thuộc tập `{@,$,!,%,*,?,&}` | Regex `(?=.*[^A-Za-z\d])` chấp nhận `Pass1234#` là mật khẩu mạnh hợp lệ | **FAIL** | `strongPasswordRegex.test("Pass1234#") === true` (`App.js:261`) | **DEF-FR03-09** |
| **TC-GAP-MOB-007** | Kiểm tra tính dùng một lần của OTP (Replay Attack) | Dùng lại cùng một mã OTP để đặt lại MK lần 2 | Từ chối mã đã sử dụng, trả về HTTP 400 | Backend trả về HTTP 400 `{ error: "Invalid token or email" }` do `reset_token = NULL` | **PASS** | Probe live: HTTP 400 khi gửi lại mã OTP đã sử dụng | Không có |
| **TC-GAP-MOB-008** | Độ dài mã OTP sinh ra và nhãn UI trên Mobile | Yêu cầu mã OTP và kiểm tra độ dài token | Mã OTP 6 chữ số; nhãn ghi "Mã OTP (6 số)" | Backend sinh mã 4 chữ số (`"6027"`); nhãn UI ghi `Mã OTP (4 số)` | **FAIL** | `server.js:72` sinh số ngẫu nhiên 1000-9999; `App.js:862` ghi 4 số | **DEF-FR03-01** |
| **TC-GAP-MOB-009** | Trạng thái Loading và khóa nút bấm trên Mobile | Nhấn nút "Lấy mã OTP" liên tiếp | Nút có loading và disabled chặn nhấn nhiều lần | Không có cờ loading, không có disabled; nút nhận nhấn liên tục | **FAIL** | `App.js:853, 876` thiếu thuộc tính `disabled` | **DEF-FR03-10** |
| **TC-GAP-MOB-010** | Thông báo lỗi mạng sai lệch tại Bước 2 | Ngắt kết nối mạng và nhấn "Đặt lại mật khẩu" | Hiển thị lỗi kết nối mạng | Khối catch hiển thị cố định: "Mã OTP không đúng hoặc có lỗi xảy ra." | **FAIL** | `App.js:282` Alert quy chụp mọi ngoại lệ thành lỗi sai OTP | **DEF-FR03-11** |
