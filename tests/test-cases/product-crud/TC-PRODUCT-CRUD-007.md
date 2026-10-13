# TC-PRODUCT-CRUD-007: API thêm — từ chối name 0 ký tự

## Requirement ID

FR-15; FR-12; SEC-02; SEC-03

## Module / Test Type / Technique

PRODUCT-CRUD / Functional / BVA

## Preconditions

- Tester chuẩn bị fixture theo [README](README.md), admin M/user A, CAT_A_ID/CAT_B_ID tồn tại và P/Q/R có snapshot.
- ID/JWT lấy từ môi trường thật; TOKEN_M hợp lệ có role admin. Không giả định ID cố định hoặc category_id>=1 là hợp lệ.
- Case bắt đầu độc lập, baseline P: name PC-P Bàn phím, price 100000, description Mô tả kiểm tra sản phẩm, imageUrl http://localhost:5174/favicon.svg, category CAT_A_ID.
- Không restart backend giữa thao tác và đọc lại; nếu đường setup bị lỗi dùng fixture có kiểm soát do tester chuẩn bị.
- Tester dùng API client tại http://localhost:3000, Content-Type application/json. Tắt auth/cookie kế thừa khi thử thiếu/sai token.

## Test Data

| Field | Value |
|---|---|
| Method | `POST` |
| Endpoint | `http://localhost:3000/api/products` |
| Authorization | `Bearer TOKEN_M` |
| Body JSON | `{"name":"","price":100000,"description":"Mô tả kiểm tra sản phẩm","imageUrl":"http://localhost:5174/favicon.svg","category_id":CAT_A_ID}` |
| Độ dài name | `0` |

## Test Steps

1. Đọc GET http://localhost:3000/api/products (không search), so catalog theo ID với snapshot; đọc GET /api/products/P_ID khi P còn tồn tại. So price theo giá trị số theo AS-PC-06.
2. Xác nhận mọi field khác hợp lệ và category CAT_A_ID vẫn có sẵn.
3. Gửi POST đúng endpoint/token/body trong Test Data; không đi qua form UI.
4. Ghi nhận response/error và ID sản phẩm tạo mới nếu request thành công.
5. Đọc GET http://localhost:3000/api/products (không search), so catalog theo ID với snapshot; đọc GET /api/products/P_ID khi P còn tồn tại. So price theo giá trị số theo AS-PC-06.

## Expected Result

- Không tạo sản phẩm mang dữ liệu invalid; catalog không tăng và giữ snapshot.
- UI có thể chặn trước request; API trực tiếp phải từ chối dữ liệu invalid. Không chốt wording hay mã HTTP chưa được đặc tả.
- Các sản phẩm khác (đặc biệt Q/R) và danh sách categories giữ snapshot; không sửa nhầm sản phẩm.

## Status / Related Bugs

Not Run / None
