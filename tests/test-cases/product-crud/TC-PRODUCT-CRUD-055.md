# TC-PRODUCT-CRUD-055: API thêm — từ chối category_id thiếu

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
| Authorization | `Bearer TOKEN_M` |
| Body JSON | `{"name":"PC sản phẩm mới","price":100000,"description":"Mô tả kiểm tra sản phẩm","imageUrl":"http://localhost:5174/favicon.svg"}` |

## Test Steps

1. Đọc GET http://localhost:3000/api/products (không search); đối chiếu snapshot theo ID, không theo vị trí hàng. Nếu P còn tồn tại, đọc GET /api/products/P_ID; so price theo giá trị số.
2. Xác nhận token admin hợp lệ, P tồn tại nếu PUT và chỉ trường đang thử sai requirement.
3. Gửi request đúng body trong Test Data; không tự thêm field bị thiếu hoặc đổi null để server chấp nhận.
4. Ghi response/error; đọc lại catalog và categories.

## Expected Result

- Không tạo sản phẩm invalid; catalog không tăng và không xuất hiện bản ghi với field sai/thiếu.
- Request không thành công về nghiệp vụ; không ấn định mã HTTP/wording lỗi hoặc numeric-string coercion.
- Q/R, các sản phẩm khác và danh sách category giữ snapshot; không có mutation ngoài mục tiêu.

## Status / Related Bugs

Not Run / None
