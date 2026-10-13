# TC-PRODUCT-CRUD-043: UI — xóa đúng sản phẩm không có liên kết order/cart

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
| Liên kết order/cart | `Không có` |

## Test Steps

1. Đọc GET http://localhost:3000/api/products (không search); đối chiếu snapshot theo ID, không theo vị trí hàng. Nếu P còn tồn tại, đọc GET /api/products/P_ID; so price theo giá trị số.
2. Tìm đúng P_ID trong tab Sản phẩm, đối chiếu dữ liệu để không nhầm Q.
3. Bấm Xóa P; nếu có dialog thì xác nhận. Không áp requirement dialog bắt buộc.
4. Quan sát danh sách UI ngay sau thao tác, ghi tên/giá P/Q/R trước reload; reload tab Sản phẩm và kiểm tra lại. Đối chiếu API riêng để không che lỗi local UI.
5. Đọc GET http://localhost:3000/api/products (không search); đối chiếu snapshot theo ID, không theo vị trí hàng. Nếu P còn tồn tại, đọc GET /api/products/P_ID; so price theo giá trị số.

## Expected Result

- P_ID không còn trong catalog sau xóa; thao tác xóa thành công.
- Q/R, các sản phẩm khác và danh sách category giữ snapshot; không có mutation ngoài mục tiêu.
- P không còn trong UI ngay sau xóa và sau reload.

## Status / Related Bugs

Not Run / None
