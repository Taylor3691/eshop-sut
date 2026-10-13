# TC-PRODUCT-CRUD-026: UI thêm — từ chối price 0

## Requirement ID

FR-15; FR-12; SEC-02; SEC-03

## Module / Test Type / Technique

PRODUCT-CRUD / Functional / BVA

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
| price | `0` |
| description | `Mô tả kiểm tra sản phẩm` |
| imageUrl | `http://localhost:5174/favicon.svg` |
| category_id | `CAT_A_ID` |

## Test Steps

1. Đọc GET http://localhost:3000/api/products (không search), so catalog theo ID với snapshot; đọc GET /api/products/P_ID khi P còn tồn tại. So price theo giá trị số theo AS-PC-06.
2. Đưa form về Thêm sản phẩm mới, bảo đảm không chọn edit ID.
3. Nhập Test Data; chỉ field price khác giá trị nominal/baseline dùng cho thử boundary. Không chỉnh đồng thời field khác.
4. Bấm Lưu sản phẩm khi giá trị kiểm tra biểu diễn được; ghi nhận phản hồi. Nếu UI validation chặn, không dùng DevTools để vượt form.
5. Quan sát danh sách UI ngay sau thao tác, kiểm tra tên/giá của P/Q/R; sau đó reload tab Sản phẩm và đối chiếu lại. Không chỉ kiểm tra sau reload.
6. Đọc GET http://localhost:3000/api/products (không search), so catalog theo ID với snapshot; đọc GET /api/products/P_ID khi P còn tồn tại. So price theo giá trị số theo AS-PC-06.

## Expected Result

- Không tạo sản phẩm mang dữ liệu invalid; catalog không tăng và giữ snapshot.
- UI có thể chặn trước request; API trực tiếp phải từ chối dữ liệu invalid. Không chốt wording hay mã HTTP chưa được đặc tả.
- Các sản phẩm khác (đặc biệt Q/R) và danh sách categories giữ snapshot; không sửa nhầm sản phẩm.

## Status / Related Bugs

Not Run / None
