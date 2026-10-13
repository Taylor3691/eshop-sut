# TC-PRODUCT-CRUD-078: UI sửa — giá để trống không được lưu

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
| name | `PC-P Bàn phím` |
| price | `"" (để trống ô)` |
| description | `Mô tả kiểm tra sản phẩm` |
| imageUrl | `http://localhost:5174/favicon.svg` |
| category_id | `CAT_A_ID` |

## Test Steps

1. Đọc GET http://localhost:3000/api/products không search; so toàn bộ catalog theo ID với snapshot, bao gồm P/Q/R. Kiểm tra GET /api/categories riêng.
2. Bấm Sửa P và xác minh baseline.
3. Nhập các field hợp lệ còn lại theo bảng; xóa toàn bộ giá, kiểm tra ô price thật sự trống.
4. Bấm Lưu nếu UI cho phép; ghi phản hồi hoặc validation chặn, không tự thay giá thành 0/nominal để gửi.
5. Quan sát UI trước reload; đọc API và reload danh sách để so snapshot.

## Expected Result

- Không lưu giá rỗng/null/default làm mất giá P; P giữ baseline.
- UI/server không nhận price trống thành một lần lưu hợp lệ. Không suy mọi numeric string đều bị cấm.
- Q/R, các sản phẩm khác và category list giữ snapshot.

## Status / Related Bugs

Not Run / None
