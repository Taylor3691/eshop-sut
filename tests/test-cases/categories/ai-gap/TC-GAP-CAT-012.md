# TC-GAP-CAT-012: Thêm danh mục để trống tên trực tiếp qua biểu mẫu UI Admin

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / AI Gap Analysis

## Preconditions

- Admin đã đăng nhập vào `frontend-admin` trên trình duyệt và mở tab "Quản lý Danh mục".

## Test Data

| Trường / Thao tác | Giá trị |
|---|---|
| Ô input "Tên danh mục mới" | Để trống (`""`) |
| Thao tác | Nhấn nút "Thêm mới" |

## Test Steps

1. Truy cập tab "Quản lý Danh mục" trên `frontend-admin`.
2. Không nhập ký tự nào vào ô "Tên danh mục mới".
3. Nhấn nút "Thêm mới".
4. Quan sát mạng (Network tab) và bảng danh mục bên dưới.

## Expected Result

- Form HTML phải có thuộc tính `required` hoặc hàm submit kiểm tra `!categoryName.trim()`.
- Chặn không cho gửi request và hiển thị thông báo lỗi yêu cầu nhập tên.
- Không xuất hiện dòng danh mục rỗng nào trên bảng giao diện.

## Actual Result

Form gửi `{ name: "" }` lên API; thêm dòng trống

## Missing Scenario

Kiểm tra việc biểu mẫu thêm danh mục trong giao diện Admin (`frontend-admin`) không có kiểm tra hợp lệ phía client (client-side validation), cho phép submit form rỗng lên server.

## Gap Rationale

Trong `frontend-admin/src/App.jsx:297-308`, thẻ input không có thuộc tính `required` và `handleCategorySubmit` (dòng 142) gửi thẳng `{ name: categoryName }` lên API, khiến giao diện tạo ra các dòng danh mục rỗng không tên.

## Status / Related Bugs

FAIL / DEF-FR14-04 — see [execution report](../../../test-summary/FR-14-ai-gap-analysis.md).
