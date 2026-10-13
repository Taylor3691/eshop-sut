# TC-PRODUCT-CRUD-042: API — xem danh sách và chi tiết đúng sản phẩm

## Requirement ID

FR-15

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
| Endpoints | `GET /api/products; GET /api/products/P_ID` |
| Product | `P_ID` |
| name | `PC-P Bàn phím` |
| price | `100000` |
| description | `Mô tả kiểm tra sản phẩm` |
| imageUrl | `http://localhost:5174/favicon.svg` |
| category_id | `CAT_A_ID` |

## Test Steps

1. Gửi GET http://localhost:3000/api/products không search; tìm P/Q/R theo ID.
2. Gửi GET http://localhost:3000/api/products/P_ID; đối chiếu năm field và ID với snapshot.
3. Đọc lại danh sách và so catalog, không thực hiện mutation.

## Expected Result

- P/Q/R tồn tại đúng ID, dữ liệu danh sách/chi tiết đúng fixture.
- Không yêu cầu price JSON string phải bị coi là sai nếu số nghiệp vụ tương đương (AS-PC-06); không áp role admin lên API đọc public.
- Q/R, các sản phẩm khác và danh sách category giữ snapshot; không có mutation ngoài mục tiêu.

## Status / Related Bugs

Not Run / None
