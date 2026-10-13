# TC-PRODUCT-CRUD-075: UI — đổi lựa chọn Sửa P sang Sửa Q chỉ làm Q thay đổi

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
| Product_before | `P_ID` |
| Product_selected | `Q_ID` |
| name | `PC-Q Cập nhật` |
| price | `210000` |
| description | `Mô tả Q` |
| imageUrl | `http://localhost:5174/favicon.svg` |
| category_id | `CAT_A_ID` |

## Test Steps

1. Đọc GET http://localhost:3000/api/products không search; so toàn bộ catalog theo ID với snapshot, bao gồm P/Q/R. Kiểm tra GET /api/categories riêng.
2. Bấm Sửa P_ID, xác minh baseline P trong form; không lưu P.
3. Bấm Sửa Q_ID; xác minh form đổi đúng baseline Q trước nhập dữ liệu mới.
4. Nhập Test Data của Q, bấm Lưu; ghi response.
5. Kiểm tra UI ngay sau lưu: chỉ Q đổi tên/giá, P/R giữ nguyên. Đọc GET products/details theo ID.
6. Reload tab Sản phẩm và so snapshot từng ID.

## Expected Result

- Lưu đúng Q_ID với Test Data; P/R và các sản phẩm khác không đổi ở UI trước/sau reload và API.
- Category list giữ snapshot; không gửi request với edit ID cũ P.

## Status / Related Bugs

Not Run / None
