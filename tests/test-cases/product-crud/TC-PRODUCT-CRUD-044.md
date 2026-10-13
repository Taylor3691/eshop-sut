# TC-PRODUCT-CRUD-044: API — xóa đúng sản phẩm không có liên kết order/cart

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
| Method | `DELETE` |
| Endpoint | `http://localhost:3000/api/products/P_ID` |
| Authorization | `Bearer TOKEN_M` |

## Test Steps

1. Đọc GET http://localhost:3000/api/products (không search); đối chiếu snapshot theo ID, không theo vị trí hàng. Nếu P còn tồn tại, đọc GET /api/products/P_ID; so price theo giá trị số.
2. Xác minh P_ID tồn tại và không có liên kết order/cart; ghi snapshot Q/R.
3. Gửi DELETE /api/products/P_ID với TOKEN_M; không gửi body.
4. Ghi response, đọc lại danh sách không search.

## Expected Result

- P_ID không còn trong catalog sau xóa; thao tác xóa thành công.
- Q/R, các sản phẩm khác và danh sách category giữ snapshot; không có mutation ngoài mục tiêu.

## Status / Related Bugs

Not Run / None
