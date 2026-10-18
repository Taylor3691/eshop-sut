# FR-08 — Pool Checkout

**8 cases: 0 BVA + 7 EP/state checks, including 1 exploratory ambiguity.** Test theo từng file TC; nguồn yêu cầu là `README.md` ở thư mục gốc dự án, mục FR-08. FR-09 coupon không thuộc pool này.

## Tham chiếu

- [Phân tích requirement, domain, equivalence partitions và coverage](FR08-checkout-test-cases.md)
- [Test run 001](../../test-runs/FR-08/FR08-checkout-test-run-001.md)
- [Test summary 001](../../test-summary/FR-08/FR08-checkout-test-summary-001.md)
- Mẫu trình bày: [TC-FR-08-CHECKOUT-001](TC-FR-08-CHECKOUT-001.md)

## Tài khoản và dữ liệu

- Dùng tài khoản khách hàng thử nghiệm đã được cấp; không dùng tài khoản/người mua thật.
- Chọn sản phẩm thử có giá dễ tính. Ghi tên, giá và số lượng trước khi checkout.
- Với API case, dùng token của chính tài khoản thử nghiệm và một client HTTP được phép. Không chia sẻ token trong bằng chứng.
- Backend startup có thể reset/reseed SQLite. Chỉ chạy trên môi trường test cô lập, không dùng DB có dữ liệu cần giữ.
- Endpoint checkout tham chiếu: `POST /api/checkout`.

## Danh sách Test Cases

| ID | Mục tiêu | Technique | Requirement |
|---|---|---|---|
| [TC-FR-08-CHECKOUT-001](TC-FR-08-CHECKOUT-001.md) | Checkout thành công và tính tổng từ giỏ hàng | Equivalence Partitioning | FR-08.1, 08.2, 08.4, 08.5 |
| [TC-FR-08-CHECKOUT-002](TC-FR-08-CHECKOUT-002.md) | Chặn checkout khi chưa đăng nhập | Equivalence Partitioning | FR-08.1 |
| [TC-FR-08-CHECKOUT-003](TC-FR-08-CHECKOUT-003.md) | Bỏ qua client total nhỏ hơn tổng giỏ hàng | Equivalence Partitioning | FR-08.4 |
| [TC-FR-08-CHECKOUT-004](TC-FR-08-CHECKOUT-004.md) | Bỏ qua client total lớn hơn tổng giỏ hàng | Equivalence Partitioning | FR-08.4 |
| [TC-FR-08-CHECKOUT-005](TC-FR-08-CHECKOUT-005.md) | Tổng tiền không thể chỉnh trực tiếp trên UI | Equivalence Partitioning | FR-08.2 |
| [TC-FR-08-CHECKOUT-006](TC-FR-08-CHECKOUT-006.md) | Hiển thị đầy đủ sản phẩm trong checkout | Equivalence Partitioning | FR-08.3 |
| [TC-FR-08-CHECKOUT-007](TC-FR-08-CHECKOUT-007.md) | Giỏ hàng được xóa sau checkout thành công | State transition | FR-08.5 |
| [TC-FR-08-CHECKOUT-008](TC-FR-08-CHECKOUT-008.md) | Thăm dò checkout với giỏ hàng rỗng | Exploratory / State partition | Ambiguity in FR-08 |

## Cách thực hiện và ghi kết quả

1. Mỗi case bắt đầu với đúng trạng thái đăng nhập và giỏ hàng nêu trong Preconditions.
2. Ghi lại actual result, mã đơn nếu có, tổng đơn, trạng thái giỏ hàng và bằng chứng cần thiết.
3. Chỉ ghi Pass khi đã kiểm tra đầy đủ Expected Result; nếu dữ liệu/môi trường không chuẩn bị được, ghi Blocked cùng lý do.
4. TC-003 và TC-004 cần gửi request checkout đã sửa `total_amount`; thao tác UI thông thường không đủ để kết luận backend có bỏ qua giá trị client hay không.
5. FR-08 không định nghĩa expected cho giỏ rỗng; TC-008 là exploratory, cần chủ yêu cầu chốt expected trước khi tính kết quả Pass/Fail.

## Phạm vi và giới hạn

- Pool này kiểm tra FR-08 checkout. Không bao gồm áp dụng coupon FR-09, thay đổi trạng thái đơn FR-10/FR-18, kiểm thử tải hoặc các quy tắc địa chỉ chưa có trong FR-08.
- FR-08 không chỉ rõ cách lưu chi tiết item/giá trong order, xử lý lỗi checkout hoặc trạng thái giỏ sau checkout thất bại; cần làm rõ nếu muốn thêm case.
- Không có ngưỡng số học được đặc tả nên BVA không áp dụng.
