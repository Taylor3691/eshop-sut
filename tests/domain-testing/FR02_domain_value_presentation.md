# Domain Value Presentation - FR-02

Tài liệu này chọn một giá trị đại diện cho từng miền đã xác định trong [FR02_domain_input_output.md](FR02_domain_input_output.md). Các giá trị dưới đây dùng cho bước thiết kế test case, chưa phải kết quả kiểm thử.

## 1. Trường Email đăng nhập

| Miền | Giá trị đại diện | Phân loại | Requirement |
|---|---|---|---|
| Rỗng | `""` | Không hợp lệ | FR02-01, FR02-06 |
| Không đúng định dạng email | `test` | Không hợp lệ | FR02-01, FR02-06 |
| Thiếu domain | `user@` | Không hợp lệ | FR02-01, FR02-06 |
| Email hợp lệ nhưng chưa đăng ký | `unknown@example.com` | Không hợp lệ | FR02-01 |
| Email hợp lệ và đã đăng ký | `test@eshop.com` | Hợp lệ | FR02-01, FR02-06 |

## 2. Trường Mật khẩu đăng nhập

| Miền | Giá trị đại diện | Phân loại | Requirement |
|---|---|---|---|
| Rỗng | `""` | Không hợp lệ | FR02-01 |
| Không khớp với tài khoản | `WrongPass123!` | Không hợp lệ | FR02-01 |
| Khớp với tài khoản đã đăng ký | `Test1234!` | Hợp lệ | FR02-01 |

> FR-02 không quy định độ dài hoặc độ mạnh của mật khẩu. Vì vậy không tạo thêm miền theo độ dài hay ký tự đặc biệt.

## 3. Số lần đăng nhập sai liên tiếp

| Miền | Giá trị đại diện | Phân loại | Requirement |
|---|---:|---|---|
| Chưa có lần đăng nhập sai | `0` | Hợp lệ | FR02-02, FR02-03 |
| Chưa đạt ngưỡng khóa | `2` | Hợp lệ | FR02-03 |
| Đạt ngưỡng khóa | `3` | Hợp lệ | FR02-03 |
| Vượt ngưỡng khóa | `4` | Hợp lệ | FR02-03 |
| Bộ đếm tăng đúng 1 sau một lần sai | `0 -> 1` | Hợp lệ | FR02-02 |
| Bộ đếm không tăng | `0 -> 0` | Không hợp lệ | FR02-02 |
| Bộ đếm tăng nhiều hơn 1 | `0 -> 2` | Không hợp lệ | FR02-02 |

## 4. Trạng thái khóa theo số lần sai

| Miền | Giá trị đại diện | Trạng thái mong đợi | Requirement |
|---|---:|---|---|
| Số lần sai nhỏ hơn 3 | `2` | Tài khoản chưa bị khóa | FR02-03 |
| Số lần sai đúng bằng 3 | `3` | Tài khoản bị khóa | FR02-03 |
| Số lần sai lớn hơn 3 | `4` | Tài khoản vẫn bị khóa | FR02-03 |

## 5. Thời gian kể từ lúc tài khoản bị khóa

| Miền | Giá trị đại diện | Trạng thái mong đợi | Requirement |
|---|---:|---|---|
| Chưa hết thời gian khóa | `29 giây` | Vẫn bị khóa | FR02-03 |
| Đúng mốc thời gian khóa | `30 giây` | Cần xác nhận cách xử lý tại đúng mốc | FR02-03 |
| Đã hết thời gian khóa | `31 giây` | Được phép thử đăng nhập lại | FR02-03 |

## 6. Kết quả xác thực đăng nhập

| Miền | Giá trị đại diện | Kết quả mong đợi | Requirement |
|---|---|---|---|
| Email và mật khẩu hợp lệ | `test@eshop.com` + `Test1234!` | Đăng nhập thành công và tạo JWT | FR02-01, FR02-04 |
| Email không tồn tại | `unknown@example.com` + `AnyPass123!` | Đăng nhập thất bại, không tạo JWT | FR02-01, FR02-04 |
| Mật khẩu không đúng | `test@eshop.com` + `WrongPass123!` | Đăng nhập thất bại và tăng bộ đếm | FR02-01, FR02-02 |
| Tài khoản đang bị khóa | Tài khoản ở trạng thái khóa + mật khẩu đúng | Từ chối đăng nhập trong thời gian khóa | FR02-03, FR02-04 |

## 7. JWT Token

| Miền | Giá trị đại diện | Phân loại | Requirement |
|---|---|---|---|
| Token hợp lệ | `eyJhbGciOiJIUzI1NiJ9.valid.signature` | Hợp lệ | FR02-04, FR02-05 |
| Token rỗng | `""` | Không hợp lệ | FR02-05 |
| Không có token | Không gửi header `Authorization` | Không hợp lệ | FR02-05 |
| Header sai cấu trúc | `Authorization: Token abc123` | Không hợp lệ | FR02-05 |
| Header đúng cấu trúc Bearer | `Authorization: Bearer <valid-token>` | Hợp lệ | FR02-05 |
| Token không hợp lệ | `Authorization: Bearer invalid-token` | Không hợp lệ | FR02-05 |

> Chuỗi JWT trong bảng là giá trị minh họa. FR-02 không quy định thời hạn cụ thể của token.

## 8. Giá trị email trên giao diện HTML

| Miền | Giá trị đại diện | Kết quả validate HTML5 mong đợi | Requirement |
|---|---|---|---|
| Chuỗi rỗng | `""` | Không hợp lệ khi trường bắt buộc | FR02-06 |
| Chuỗi không phải email | `abc` | Bị validate từ chối | FR02-06 |
| Email thiếu domain | `abc@` | Bị validate từ chối | FR02-06 |
| Email hợp lệ | `abc@example.com` | Được validate chấp nhận | FR02-06 |

## 9. Output khi đăng nhập thành công

| Miền output | Giá trị đại diện | Phân loại | Requirement |
|---|---|---|---|
| Có JWT hợp lệ | `{ "token": "<valid-jwt>" }` | Hợp lệ | FR02-04 |
| Thiếu JWT | `{ "message": "Login successful" }` | Không hợp lệ | FR02-04 |
| JWT rỗng | `{ "token": "" }` | Không hợp lệ | FR02-04 |
| Phản hồi chứa mật khẩu | `{ "user": { "password": "Test1234!" } }` | Không hợp lệ | FR02-04 |

## 10. Output khi đăng nhập thất bại

| Miền output | Giá trị đại diện | Phân loại | Requirement |
|---|---|---|---|
| Lỗi thông tin đăng nhập chung | `Email hoặc mật khẩu không chính xác` | Hợp lệ | FR02 (error response) |
| Lỗi tài khoản đang bị khóa | `Tài khoản đang bị khóa tạm thời. Vui lòng thử lại sau.` | Hợp lệ | FR02-03, FR02 (error response) |
| Lỗi làm lộ email có tồn tại | `Email này đã tồn tại nhưng mật khẩu sai` | Không hợp lệ | FR02 (error response) |
| Lỗi làm lộ số lần sai | `Bạn đã sai 3 lần` | Không hợp lệ | FR02 (error response) |
| Lỗi làm lộ thông tin kỹ thuật | `SQL error: locked_until=...` | Không hợp lệ | FR02 (error response) |
| Phản hồi không có lỗi khi đăng nhập sai | `{ "success": true }` | Không hợp lệ | FR02 (error response) |

## 11. Output header xác thực

| Miền output | Giá trị đại diện | Phân loại | Requirement |
|---|---|---|---|
| Header Bearer hợp lệ | `Authorization: Bearer <valid-token>` | Hợp lệ | FR02-05 |
| Thiếu header | Không có `Authorization` | Không hợp lệ | FR02-05 |
| Sai scheme | `Authorization: Token abc123` | Không hợp lệ | FR02-05 |
| Token không hợp lệ | `Authorization: Bearer invalid-token` | Không hợp lệ | FR02-05 |

## 12. Ghi chú

- Các miền performance chưa có giá trị đại diện vì FR-02 không quy định thời gian phản hồi, throughput hoặc số người dùng đồng thời.
- Biên quan trọng cần ưu tiên khi chuyển sang test case là `2/3/4` lần sai và `29/30/31` giây khóa.
- Cần xác nhận với người phụ trách yêu cầu về hành vi chính xác tại mốc `30 giây` và thời điểm reset bộ đếm.
