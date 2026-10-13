# TC-PRODUCT-CRUD-074: UI thêm — category đã bị xóa sau khi chọn không được lưu (AS-PC-05)

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
- Mọi P/Q/R đang dùng CAT_A_ID; CAT_B_ID không được tham chiếu để setup không làm orphan fixture. AS-PC-05 về thời điểm category validation cần review.

## Test Data

| Field | Value |
|---|---|
| name | `PC sản phẩm mới` |
| price | `100000` |
| description | `Mô tả kiểm tra sản phẩm` |
| imageUrl | `http://localhost:5174/favicon.svg` |
| category_id | `CAT_B_ID` |
| Category trước chọn | `CAT_B_ID tồn tại` |
| Category tại submit | `CAT_B_ID không còn` |

## Test Steps

1. Đọc GET http://localhost:3000/api/products không search; so toàn bộ catalog theo ID với snapshot, bao gồm P/Q/R. Kiểm tra GET /api/categories riêng.
2. M mở form Thêm mới, nhập đủ dữ liệu và chọn CAT_B_ID; chưa submit.
3. Tester dùng công cụ fixture database có kiểm soát để bỏ riêng CAT_B_ID không được tham chiếu; đây là setup, không phải test Category CRUD.
4. Đọc GET /api/categories xác nhận CAT_B_ID không còn, CAT_A_ID còn; ghi snapshot catalog và categories sau setup.
5. Giữ trang cũ rồi bấm Lưu với category B nếu form còn giữ B. Nếu UI tự refetch/chặn/đổi category, ghi rõ không gửi request với B; không submit CAT_A_ID rồi coi đó là thử category đã mất.
6. Ghi response; đọc catalog/category và đối chiếu snapshot sau setup.

## Expected Result

- Theo AS-PC-05, không tạo sản phẩm liên kết category không còn trong danh sách tại server.
- Nếu request chứa CAT_B_ID tới server, request không được lưu; nếu UI chặn trước đó, ghi giới hạn backend coverage.
- Catalog giữ snapshot sau setup; category list vẫn là list sau xóa B, không so với list trước setup. Không kết luận concurrency safety.

## Status / Related Bugs

Not Run / None
