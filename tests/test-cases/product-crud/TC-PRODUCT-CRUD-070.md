# TC-PRODUCT-CRUD-070: API POST — JWT user sửa role nhưng giữ chữ ký cũ bị từ chối

## Requirement ID

FR-15; FR-12; SEC-02; SEC-03

## Module / Test Type / Technique

PRODUCT-CRUD / Functional / Equivalence Partitioning

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
| Authorization | `Bearer TOKEN_A_TAMPERED` |
| Body JSON | `{"name":"PC sản phẩm mới","price":100000,"description":"Mô tả kiểm tra sản phẩm","imageUrl":"http://localhost:5174/favicon.svg","category_id":CAT_A_ID}` |
| TOKEN_A_TAMPERED | `Token A đổi claim role thành admin, giữ header/signature cũ` |

## Test Steps

1. Đọc GET http://localhost:3000/api/products không search; so toàn bộ catalog theo ID với snapshot, bao gồm P/Q/R. Kiểm tra GET /api/categories riêng.
2. Trong công cụ local, giải mã payload JWT A bằng Base64URL, đổi duy nhất role user thành admin và mã hóa lại payload.
3. Ghép header.payload.signature với header/chữ ký cũ; không ký lại token.
4. Gửi request với token đã sửa và payload hợp lệ trong bảng.
5. Ghi response.
6. Đọc GET http://localhost:3000/api/products không search; so toàn bộ catalog theo ID với snapshot, bao gồm P/Q/R. Kiểm tra GET /api/categories riêng.

## Expected Result

- JWT không có chữ ký tương ứng bị từ chối; sửa role không cấp quyền mutation.
- Catalog/category giữ snapshot; không tạo/sửa/xóa P hoặc sản phẩm khác.

## Status / Related Bugs

Not Run / None
