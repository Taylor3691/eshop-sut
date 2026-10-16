# TC-CAT-025: Kiểm tra luồng Thêm và Xóa danh mục hoàn chỉnh trên giao diện Admin

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / Domain Testing

## Preconditions

- Admin đã đăng nhập vào `frontend-admin` và đang mở tab "Quản lý Danh mục".

## Test Data

| Trường / Thao tác | Giá trị |
|---|---|
| Ô input "Tên danh mục mới" | `"Đồng hồ thông minh"` |
| Hành động 1 | Nhấn nút "Thêm mới" |
| Hành động 2 | Nhấn nút "Xóa" tại dòng `"Đồng hồ thông minh"` vừa tạo |

## Test Steps

1. Nhập `"Đồng hồ thông minh"` vào ô "Tên danh mục mới".
2. Nhấn nút "Thêm mới".
3. Kiểm tra: Ô nhập liệu được xóa sạch (`clear input`), bảng danh mục xuất hiện thêm dòng mới `"Đồng hồ thông minh"`.
4. Nhấn nút "Xóa" màu đỏ tại dòng vừa thêm.
5. Kiểm tra: Dòng `"Đồng hồ thông minh"` biến mất khỏi bảng và danh sách được làm mới tự động.

## Expected Result

- Giao diện Admin phản hồi mượt mà: thêm danh mục mới hiển thị ngay lập tức, ô input được reset về rỗng.
- Khi nhấn Xóa, danh mục được xóa thành công và bảng tự động cập nhật đồng bộ với CSDL.

## Actual Result

Thực hiện luồng Thêm và Xóa trên giao diện Admin mượt mà: thêm danh mục mới hiển thị ngay lập tức, ô input được reset; khi nhấn Xóa, dòng biến mất và danh sách cập nhật đồng bộ.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-025.png)

## Coverage Rationale

Kiểm thử luồng tích hợp vòng đời Danh mục (End-to-End Category Lifecycle UI Flow) trên giao diện quản trị Admin.

## Status / Related Bugs

PASS / None — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
