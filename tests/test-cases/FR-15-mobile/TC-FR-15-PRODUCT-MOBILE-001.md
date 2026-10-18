# TC-FR-15-PRODUCT-MOBILE-001: Sản phẩm mới tạo xuất hiện trên catalog mobile

## Requirement ID

FR-15 (Create / View)

## Module / Test Type / Technique

PRODUCT-MOBILE / Functional / Equivalence Partitioning

## Preconditions

- Backend và ứng dụng mobile đang chạy, mobile kết nối được backend.
- Admin có quyền truy cập giao diện quản lý sản phẩm.
- Sản phẩm thử chưa tồn tại; ghi nhận danh sách hiện tại để đối chiếu.

## Test Data

| Field | Value |
|---|---|
| Name | `Mobile FR15 Test Product A` |
| Price | `125000` |
| Category | Một danh mục đang tồn tại |
| Description | `Sản phẩm dùng kiểm tra hiển thị mobile` |

## Test Steps

1. Trên giao diện Admin, tạo sản phẩm với dữ liệu hợp lệ ở trên.
2. Trên mobile, tải lại catalog hoặc mở lại ứng dụng để tải danh sách mới.
3. Tìm sản phẩm theo tên, mở chi tiết và đối chiếu tên/giá.

## Expected Result

- Sản phẩm mới xuất hiện trong catalog mobile sau khi tải dữ liệu lại.
- Tên và giá hiển thị trên mobile khớp dữ liệu đã tạo.

## Status / Related Bugs

Not Run / None
