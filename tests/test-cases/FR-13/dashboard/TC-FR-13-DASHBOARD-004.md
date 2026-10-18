# TC-FR-13-DASHBOARD-004: Chỉ admin truy cập phân hệ Dashboard

## Requirement ID

FR-12; FR-13

## Module / Test Type / Technique

ADMIN DASHBOARD / Access Control / Equivalence Partitioning

## Preconditions

- Có tài khoản admin và tài khoản khách hàng thử nghiệm.
- Ghi nhận trạng thái đăng nhập ban đầu của từng tài khoản.

## Test Data

| Field | Value |
|---|---|
| Admin account | Tài khoản có role `admin` |
| Customer account | Tài khoản có role khách hàng |
| Dashboard | `http://localhost:5174` |

## Test Steps

1. Đăng nhập vào trang admin bằng tài khoản admin.
2. Xác nhận Dashboard hiển thị.
3. Đăng xuất, sau đó thử đăng nhập vào trang admin bằng tài khoản khách hàng.
4. Ghi nhận quyền truy cập và dữ liệu Dashboard có được hiển thị hay không.

## Expected Result

- Tài khoản admin truy cập được Dashboard.
- Tài khoản khách hàng bị từ chối vào phân hệ admin và không xem được dữ liệu Dashboard.

## Status / Related Bugs

Not Run / None
