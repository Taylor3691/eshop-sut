# TC-PRODUCT-CRUD-073: UI — user thường không được vào Product CRUD Admin

## Requirement ID

FR-15; FR-12

## Module / Test Type / Technique

PRODUCT-CRUD / Functional / Equivalence Partitioning

## Preconditions

- Tester chuẩn bị fixture theo [README](README.md), admin M/user A, CAT_A_ID/CAT_B_ID tồn tại và P/Q/R có snapshot.
- ID/JWT lấy từ môi trường thật; TOKEN_M hợp lệ có role admin. Không giả định ID cố định hoặc category_id>=1 là hợp lệ.
- Case bắt đầu độc lập, baseline P: name PC-P Bàn phím, price 100000, description Mô tả kiểm tra sản phẩm, imageUrl http://localhost:5174/favicon.svg, category CAT_A_ID.
- Không restart backend giữa thao tác và đọc lại; nếu đường setup bị lỗi dùng fixture có kiểm soát do tester chuẩn bị.
- Tester dùng API client tại http://localhost:3000, Content-Type application/json. Tắt auth/cookie kế thừa khi thử thiếu/sai token.
- Cửa sổ riêng không có phiên Admin; A đã được xác minh role user. Không dùng trạng thái đăng nhập M từ uiPre.

## Test Data

| Field | Value |
|---|---|
| URL | `http://localhost:5174` |
| Email | `products.a@example.com` |
| Password | `ProductsA123!` |
| Role | `user` |

## Test Steps

1. Mở cửa sổ trình duyệt riêng chưa có adminToken/phiên M; truy cập Admin.
2. Đăng nhập bằng tài khoản A role user theo Test Data; quan sát phản hồi và khả năng vào tab Sản phẩm.
3. Nếu trang cho truy cập UI, ghi lại trạng thái/controls; không dùng token admin để biến phiên này thành admin.
4. Tải lại trong cùng phiên user, đối chiếu quyền UI; đọc catalog/category bằng API client để xác nhận không có mutation do thao tác truy cập.

## Expected Result

- Tài khoản user không được truy cập/chỉnh Product CRUD Admin; có thể bị từ chối đăng nhập admin hoặc chặn trang/controls.
- Catalog/category giữ snapshot. Case UI không thay kết quả các negative API auth cases.

## Status / Related Bugs

Not Run / None
