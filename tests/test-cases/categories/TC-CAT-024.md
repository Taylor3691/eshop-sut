# TC-CAT-024: Kiểm tra form Thêm danh mục trên giao diện Admin khi để trống ô nhập tên

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / Domain Testing

## Preconditions

- Admin đã đăng nhập vào trang quản trị (`frontend-admin`) trên trình duyệt.
- Admin đang ở tab "Quản lý Danh mục" (`activeTab === 'categories'`).

## Test Data

| Trường / Thao tác | Giá trị |
|---|---|
| Ô input "Tên danh mục mới" | Để trống (`""`) hoặc chỉ nhập dấu cách |
| Nút bấm | "Thêm mới" |

## Test Steps

1. Mở giao diện Admin tại mục Quản lý Danh mục.
2. Không nhập gì vào ô input `Tên danh mục mới`.
3. Nhấn nút "Thêm mới".
4. Quan sát phản ứng của giao diện và kiểm tra xem có request gửi đi hay danh mục trống nào được thêm vào bảng không.

## Expected Result

- Giao diện người dùng phải ngăn chặn việc submit biểu mẫu (Client-side validation).
- Hiển thị thông báo yêu cầu nhập tên danh mục hợp lệ.
- Không thêm dòng danh mục trống nào vào bảng danh sách danh mục bên dưới.

## Actual Result

Form không có thuộc tính HTML5 required, gửi request POST rỗng thành công và thêm một dòng trống mới vào bảng quản trị mà không có thông báo lỗi hay ngăn chặn.

## Evidence

- [Screenshot evidence](screenshots/TC-CAT-024.png)

## Coverage Rationale

Kiểm thử tương tác người dùng trên giao diện Admin: Xác thực đầu vào phía Client (UI Form validation) ngăn chặn tên danh mục rỗng.

## Status / Related Bugs

FAIL / DEF-FR14-01, DEF-FR14-04 — see [execution report](../../../reports/test-results/FR-14/domain_testing_report.md).
