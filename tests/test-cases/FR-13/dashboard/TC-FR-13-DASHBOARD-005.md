# TC-FR-13-DASHBOARD-005: Từ chối truy cập Dashboard khi chưa đăng nhập

## Requirement ID

FR-12; FR-13

## Module / Test Type / Technique

ADMIN DASHBOARD / Access Control / Equivalence Partitioning

## Preconditions

- Đăng xuất khỏi trang admin; không có phiên/token admin đang được sử dụng.
- Có thể mở trang admin trong cửa sổ riêng tư hoặc phiên đã xóa trạng thái đăng nhập.

## Test Data

| Field | Value |
|---|---|
| Authentication | Chưa đăng nhập / không có token |
| Dashboard | `http://localhost:5174` |

## Test Steps

1. Mở trang admin khi chưa đăng nhập.
2. Thử truy cập Dashboard.
3. Ghi nhận nội dung được hiển thị và liệu số liệu Dashboard có bị lộ hay không.

## Expected Result

- Người dùng chưa đăng nhập không truy cập được phân hệ Dashboard.
- Không hiển thị dữ liệu doanh thu hoặc số đơn trước khi xác thực và kiểm tra role admin.

## Status / Related Bugs

Not Run / None
