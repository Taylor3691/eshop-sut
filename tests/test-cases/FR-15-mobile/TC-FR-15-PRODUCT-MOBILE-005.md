# TC-FR-15-PRODUCT-MOBILE-005: Chấp nhận tên sản phẩm dài 254 hoặc 255 ký tự

## Requirement ID

FR-15 (name required, maximum length 255); FR-12 (admin access)

## Module / Test Type / Technique

PRODUCT VALIDATION + MOBILE CATALOG / Functional / Boundary Value Analysis

## Preconditions

- Có token admin hợp lệ và một category đang tồn tại.
- Backend và mobile kết nối cùng môi trường test.
- Hai tên test có độ dài chính xác 254 và 255 ký tự; dùng ký tự ASCII `A` để đếm không mơ hồ.

## Test Data

| Field | Value |
|---|---|
| Name below max | 254 characters |
| Name at max | 255 characters |
| Price | 100000 |
| Category | ID của category có sẵn |

## Test Steps

1. Gửi hai request tạo sản phẩm qua giao diện/API Admin với các tên 254 và 255 ký tự, giá dương và category hợp lệ.
2. Ghi nhận response và xác nhận hai sản phẩm được lưu.
3. Tải lại catalog mobile, tìm theo một đoạn đầu tên duy nhất, mở chi tiết để kiểm tra dữ liệu.

## Expected Result

- Cả tên 254 và 255 ký tự đều được chấp nhận vì không vượt giới hạn.
- Cả hai sản phẩm hợp lệ được lưu và có thể tìm/xem trên mobile sau khi tải lại.

## Status / Related Bugs

Not Run / None
