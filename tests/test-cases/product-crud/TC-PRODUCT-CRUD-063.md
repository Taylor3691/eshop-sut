# TC-PRODUCT-CRUD-063: API DELETE — từ chối thiếu token

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
| Authorization | `Không gửi header` |

## Test Steps

1. Đọc GET http://localhost:3000/api/products không search; so toàn bộ catalog theo ID với snapshot, bao gồm P/Q/R. Kiểm tra GET /api/categories riêng.
2. Xóa Authorization, tắt auth/cookie tự động kế thừa trong client.
3. Gửi request đúng method/endpoint/body. Payload hợp lệ và P_ID tồn tại để cô lập điều kiện quyền.
4. Ghi nhận response; không dùng TOKEN_M để hoàn thành thao tác đang kiểm tra.
5. Đọc GET http://localhost:3000/api/products không search; so toàn bộ catalog theo ID với snapshot, bao gồm P/Q/R. Kiểm tra GET /api/categories riêng.

## Expected Result

- Request bị từ chối truy cập/quyền; catalog không tạo/sửa/xóa dữ liệu.
- P/Q/R và mọi sản phẩm/category giữ snapshot; không coi message thành công là hợp lệ nếu gate không được thực thi.
- Không ấn định mã HTTP/wording lỗi.

## Status / Related Bugs

Not Run / None
