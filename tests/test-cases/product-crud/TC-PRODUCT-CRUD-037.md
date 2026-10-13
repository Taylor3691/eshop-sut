# TC-PRODUCT-CRUD-037: UI — thêm mới sản phẩm hợp lệ

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
| name | `PC sản phẩm mới` |
| price | `100000` |
| description | `Mô tả kiểm tra sản phẩm` |
| imageUrl | `http://localhost:5174/favicon.svg` |
| category_id | `CAT_A_ID` |

## Test Steps

1. Đọc GET http://localhost:3000/api/products (không search); đối chiếu snapshot theo ID, không theo vị trí hàng. Nếu P còn tồn tại, đọc GET /api/products/P_ID; so price theo giá trị số.
2. Mở tab Sản phẩm, đưa form về Thêm sản phẩm mới.
3. Nhập đủ năm trường Test Data; chọn category đúng ID/nhãn từ danh sách có sẵn.
4. Bấm Lưu sản phẩm, ghi phản hồi và ID mới nếu thêm.
5. Quan sát danh sách UI ngay sau thao tác, ghi tên/giá P/Q/R trước reload; reload tab Sản phẩm và kiểm tra lại. Đối chiếu API riêng để không che lỗi local UI.
6. Đọc GET http://localhost:3000/api/products (không search); đối chiếu snapshot theo ID, không theo vị trí hàng. Nếu P còn tồn tại, đọc GET /api/products/P_ID; so price theo giá trị số.

## Expected Result

- Tạo đúng một sản phẩm mới với năm trường Test Data; đọc lại đúng ID mới.
- Q/R, các sản phẩm khác và danh sách category giữ snapshot; không có mutation ngoài mục tiêu.
- UI ngay sau lưu và sau reload phản ánh đúng dữ liệu; Q/R không bị đổi tên tạm thời.

## Status / Related Bugs

Not Run / None
