# TC-PRODUCT-CRUD-041: UI — xem đúng dữ liệu sản phẩm và form Sửa không tự lưu

## Requirement ID

FR-15; FR-12; SEC-02; SEC-03

## Module / Test Type / Technique

PRODUCT-CRUD / Functional / Equivalence Partitioning

## Preconditions

- Tester chuẩn bị fixture theo [README](README.md), admin M/user A, CAT_A_ID/CAT_B_ID tồn tại và P/Q/R có snapshot.
- ID/JWT lấy từ môi trường thật; TOKEN_M hợp lệ có role admin. Không giả định ID cố định hoặc category_id>=1 là hợp lệ.
- Case bắt đầu độc lập, baseline P: name PC-P Bàn phím, price 100000, description Mô tả kiểm tra sản phẩm, imageUrl http://localhost:5174/favicon.svg, category CAT_A_ID.
- Không restart backend giữa thao tác và đọc lại; nếu đường setup bị lỗi dùng fixture có kiểm soát do tester chuẩn bị.
- M đăng nhập http://localhost:5174, mở tab Sản phẩm. Có API client để kiểm tra catalog độc lập.

## Test Data

| Field | Value |
|---|---|
| Product | `P_ID` |
| Danh sách | `P/Q/R baseline` |
| name | `PC-P Bàn phím` |
| price | `100000` |
| description | `Mô tả kiểm tra sản phẩm` |
| imageUrl | `http://localhost:5174/favicon.svg` |
| category_id | `CAT_A_ID` |

## Test Steps

1. Đọc GET http://localhost:3000/api/products (không search); đối chiếu snapshot theo ID, không theo vị trí hàng. Nếu P còn tồn tại, đọc GET /api/products/P_ID; so price theo giá trị số.
2. M đăng nhập Admin, mở tab Sản phẩm; tìm P/Q/R theo ID/dữ liệu fixture, không theo thứ tự.
3. Đối chiếu tên/giá/ảnh của P, bấm Sửa P để xem các trường description/image/category và giá trị đã nạp; không bấm Lưu.
4. Đọc API và kiểm tra catalog chưa đổi sau thao tác xem.

## Expected Result

- Danh sách hiển thị đúng fixture; form Sửa nạp đúng dữ liệu của P, không nhầm Q/R.
- Giá trị năm field tương ứng snapshot theo giá trị nghiệp vụ; việc xem/mở Sửa không tự gây mutation.
- Q/R, các sản phẩm khác và danh sách category giữ snapshot; không có mutation ngoài mục tiêu.

## Status / Related Bugs

Not Run / None
