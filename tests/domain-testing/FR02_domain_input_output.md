# Domain Input / Output Analysis - FR-02

## 1. Phạm vi

- **Requirement:** FR-02 - Đăng nhập và Khóa tài khoản
- **Module:** Quản lý tài khoản / Authentication & Authorization
- **Nguồn yêu cầu:** `README.md`
- **Mục đích:** Xác định loại yêu cầu, input, output, miền dữ liệu và các biên cần xem xét trước khi thiết kế test case.

## 2. Phân loại yêu cầu

| Mã | Nội dung yêu cầu | Loại | Chức năng / khía cạnh kiểm thử |
|---|---|---|---|
| FR02-01 | Người dùng nhập Email và Mật khẩu | Functional | Tiếp nhận và xác thực thông tin đăng nhập |
| FR02-02 | Mỗi lần đăng nhập sai tăng bộ đếm đúng 1 đơn vị | Functional | Cập nhật bộ đếm lần đăng nhập sai |
| FR02-03 | Sai từ 3 lần liên tiếp thì khóa tài khoản 30 giây | Functional | Chuyển trạng thái tài khoản sang tạm khóa và mở khóa theo thời gian |
| FR02-04 | Đăng nhập thành công trả về JWT Token | Functional | Phát hành token sau khi xác thực thành công |
| FR02-05 | Client lưu JWT và gửi qua `Authorization: Bearer <token>` | Functional | Quản lý phiên và xác thực các request tiếp theo |
| FR02-06 | Trường email dùng `type="email"` và validate HTML5 | Functional | Kiểm tra định dạng input ở giao diện |
| FR02 (error response) | Khi đăng nhập thất bại, hệ thống trả lỗi phù hợp và không để lộ chi tiết nguyên nhân | Functional | Kiểm tra mã lỗi, thông báo lỗi và thông tin nhạy cảm trong phản hồi |
| FR02-P01 | Thời gian phản hồi, throughput, số người dùng đồng thời | Performance | Chưa được quy định trong FR-02 |

**Kết luận về performance:** FR-02 không cung cấp yêu cầu định lượng về hiệu năng. Không được tự suy diễn giới hạn thời gian phản hồi, số request/giây hoặc số người dùng đồng thời. Các kiểm thử performance chỉ có thể được thiết kế sau khi chủ sở hữu yêu cầu bổ sung các ngưỡng này.

## 3. Phân tích yêu cầu và input

| Requirement | Input / biến kiểm thử | Kiểu dữ liệu | Miền hợp lệ | Miền không hợp lệ | Ghi chú |
|---|---|---|---|---|---|
| FR02-01 | `email` | Chuỗi | Email có định dạng hợp lệ và thuộc tài khoản đã đăng ký | Rỗng, sai định dạng, không tồn tại, email không khớp tài khoản | FR-02 yêu cầu validate email; không quy định độ dài tối đa |
| FR02-01 | `password` | Chuỗi | Mật khẩu khớp với tài khoản tương ứng | Rỗng hoặc không khớp với tài khoản | FR-02 không quy định độ dài hay độ mạnh của mật khẩu |
| FR02-02 | Số lần đăng nhập sai liên tiếp | Số nguyên / trạng thái | Bộ đếm tăng từng 1 đơn vị sau mỗi lần sai | Tăng khác 1, giảm, giữ nguyên hoặc bị reset sai thời điểm | Giá trị khởi tạo và cách xử lý sau khi hết khóa chưa được mô tả đầy đủ |
| FR02-03 | Số lần sai liên tiếp | Số nguyên | Nhỏ hơn 3: chưa khóa; từ 3 trở lên: bị khóa | Trạng thái không phù hợp với số lần sai | Đây là miền có ngưỡng rõ ràng để áp dụng BVA |
| FR02-03 | Thời gian kể từ lúc khóa | Thời gian / trạng thái | Trong 30 giây: bị khóa; sau 30 giây: được phép thử lại | Mở khóa sớm hoặc vẫn khóa sau thời điểm 30 giây | Mốc được tính từ thời điểm khóa |
| FR02-04 | Kết quả xác thực | Trạng thái | Email và mật khẩu hợp lệ | Email không tồn tại, mật khẩu sai hoặc tài khoản đang khóa | Chỉ trạng thái đăng nhập thành công mới tạo JWT |
| FR02-05 | JWT token | Chuỗi token | Token tồn tại, hợp lệ và được gửi đúng dạng Bearer | Thiếu token, token rỗng, sai cấu trúc, token không hợp lệ hoặc hết hạn | FR-02 không nêu thời hạn JWT cụ thể |
| FR02-06 | Giá trị email trên form | Chuỗi / HTML input | Giá trị thỏa định dạng email HTML5 | Giá trị không thỏa định dạng email HTML5 | Đây là input giao diện, không phải ngưỡng hiệu năng |
| FR02 (error response) | Nội dung phản hồi khi đăng nhập thất bại | Mã lỗi / thông báo / dữ liệu phản hồi | Lỗi phù hợp, thông báo không chứa số lần sai, truy vấn hoặc stack trace | Phản hồi làm lộ email có tồn tại, số lần sai, dữ liệu nội bộ hoặc nguyên nhân chi tiết | Đây là output cần kiểm tra sau mỗi lần đăng nhập thất bại |

## 3.1. Phân tích output

| Requirement | Output / biến kiểm thử | Kiểu dữ liệu | Miền hợp lệ | Miền không hợp lệ | Ghi chú |
|---|---|---|---|---|---|
| FR02-04 | Phản hồi đăng nhập thành công | HTTP response / JSON | Phản hồi thành công chứa JWT hợp lệ và thông tin cần thiết | Thành công nhưng thiếu JWT, JWT rỗng hoặc trả dữ liệu nhạy cảm | Mã HTTP cụ thể cần đối chiếu với API thực tế |
| FR02-03, FR02 (error response) | Phản hồi khi tài khoản bị khóa | HTTP response / JSON | Từ chối đăng nhập và thông báo phù hợp, không chứa chi tiết nội bộ | Cho phép đăng nhập, không trả lỗi, hoặc tiết lộ bộ đếm/thời điểm nội bộ | Cần xác nhận mức độ chi tiết cho phép trong thông báo khóa |
| FR02-02, FR02 (error response) | Phản hồi sau lần đăng nhập sai | HTTP response / JSON | Từ chối đăng nhập, thông báo chung, không trả JWT | Nêu rõ email tồn tại, mật khẩu sai, số lần sai hoặc lý do nội bộ | Phải kiểm tra cả body và status code |
| FR02-05 | Header xác thực của request sau đăng nhập | HTTP header | Có dạng `Authorization: Bearer <valid-token>` | Thiếu header, sai scheme hoặc chứa token không hợp lệ | Đây là output phía client khi gọi API cần xác thực |
| FR02-04 | Dữ liệu nhạy cảm trong phản hồi thành công | JSON fields | Không trả mật khẩu hoặc thông tin bí mật không cần thiết | Trả plaintext password, secret hoặc dữ liệu nội bộ | Kiểm tra cùng với JWT response |

## 4. Equivalence Partitions

| Partition ID | Input | Phân loại | Điều kiện | Giá trị đại diện | Requirement |
|---|---|---|---|---|---|
| EP-01 | Email | VALID | Email hợp lệ và đã đăng ký | `test@eshop.com` | FR02-01 |
| EP-02 | Email | INVALID | Email rỗng hoặc sai định dạng | `test` | FR02-01, FR02-06 |
| EP-03 | Email | INVALID | Email đúng định dạng nhưng chưa đăng ký | `unknown@example.com` | FR02-01 |
| EP-04 | Password | VALID | Mật khẩu khớp tài khoản | Mật khẩu đúng của tài khoản test | FR02-01 |
| EP-05 | Password | INVALID | Mật khẩu không khớp | Một mật khẩu khác | FR02-01 |
| EP-06 | Failed attempts | VALID | Bộ đếm tăng đúng 1 sau một lần sai | `0 -> 1` | FR02-02 |
| EP-07 | Failed attempts | INVALID | Bộ đếm tăng khác 1 hoặc không tăng | `0 -> 2` hoặc `0 -> 0` | FR02-02 |
| EP-08 | Lock threshold | VALID | Số lần sai nhỏ hơn 3, chưa khóa | `2` lần sai | FR02-03 |
| EP-09 | Lock threshold | VALID | Số lần sai từ 3 trở lên, bị khóa | `3` lần sai | FR02-03 |
| EP-10 | Lock duration | VALID | Đang trong 30 giây khóa | `29` giây sau khi khóa | FR02-03 |
| EP-11 | Lock duration | VALID | Đã qua 30 giây khóa | `31` giây sau khi khóa | FR02-03 |
| EP-12 | JWT | VALID | Token được tạo và gửi đúng cấu trúc | `Bearer <valid-token>` | FR02-04, FR02-05 |
| EP-13 | JWT | INVALID | Token thiếu, sai hoặc không hợp lệ | Header không có token | FR02-05 |

## 5. Boundary Analysis

| Biến / điều kiện | Biên | Giá trị lân cận cần xem xét | Phân loại | Requirement |
|---|---:|---|---|---|
| Số lần đăng nhập sai liên tiếp | 3 lần | 2, 3, 4 | 2: chưa khóa; 3 và 4: bị khóa | FR02-03 |
| Tăng bộ đếm sau một lần sai | +1 | +0, +1, +2 | +1 là hợp lệ; các giá trị khác không hợp lệ | FR02-02 |
| Thời gian khóa | 30 giây | 29, 30, 31 giây | 29: còn khóa; 30: mốc cần xác nhận; 31: phải được mở khóa | FR02-03 |
| Định dạng email | Không có một ngưỡng số học | Email hợp lệ, thiếu `@`, thiếu domain, chuỗi rỗng | Phân hoạch theo định dạng, không áp dụng BVA số học | FR02-01, FR02-06 |

## 6. Tổng quan miền của từng yêu cầu

| Requirement | Input chính | Miền hợp lệ tổng quát | Miền không hợp lệ tổng quát | Biên / điểm cần chú ý |
|---|---|---|---|---|
| FR02-01 | Email, mật khẩu | Email hợp lệ đã đăng ký và mật khẩu đúng | Email sai/không tồn tại hoặc mật khẩu sai | Email phải là `type="email"`; FR-02 không quy định độ dài mật khẩu |
| FR02-02 | Bộ đếm lần sai | Mỗi lần sai tăng đúng 1 | Tăng 0, tăng nhiều hơn 1 hoặc reset sai | Biên hành vi là phép tăng `+1` |
| FR02-03 | Số lần sai, thời gian khóa | Dưới 3 lần chưa khóa; từ 3 lần khóa 30 giây | Khóa sai ngưỡng, khóa sai thời lượng, mở khóa sai thời điểm | Các mốc quan trọng: 2/3/4 lần và 29/30/31 giây |
| FR02-04 | Kết quả xác thực | Đăng nhập đúng tạo JWT | Đăng nhập sai hoặc tài khoản khóa không tạo JWT | Kiểm tra token chỉ xuất hiện sau thành công |
| FR02-05 | JWT và Authorization header | Token hợp lệ được gửi dạng Bearer | Thiếu, rỗng, sai cấu trúc hoặc token không hợp lệ | Thời hạn token chưa được FR-02 quy định |
| FR02-06 | Email trên form | Chuỗi đạt chuẩn HTML5 email | Chuỗi không đạt chuẩn HTML5 email | Không áp dụng BVA số học |

## 7. Giả định và điểm chưa rõ

- FR-02 chưa quy định giới hạn độ dài tối thiểu hoặc tối đa của email và mật khẩu.
- FR-02 chưa mô tả rõ bộ đếm có được reset sau khi hết 30 giây hay chỉ reset sau đăng nhập thành công.
- Cần xác nhận cách xử lý tại đúng thời điểm 30 giây: mở khóa tại `30.000` giây hay chỉ sau khi vượt quá 30 giây.
- FR-02 chưa định nghĩa thời hạn JWT.
- Phần performance cần bổ sung SLA cụ thể trước khi có thể phân tích miền và biên hiệu năng.

## 8. Human Review Required

1. Xác nhận các miền input và cách phân loại functional/performance.
2. Xác nhận hành vi tại biên 3 lần sai và đúng 30 giây.
3. Bổ sung các ngưỡng performance nếu FR-02 có yêu cầu hiệu năng riêng.
