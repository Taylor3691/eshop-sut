# TC-PRODUCT-CRUD-073: Khách hàng không được quản lý sản phẩm

## Requirement ID

FR-12; SEC-03

## Module / Test Type / Technique

PRODUCT-CRUD / Functional / Equivalence Partitioning

## Preconditions

- Chuẩn bị tài khoản và dữ liệu theo [hướng dẫn của pool](README.md).
- Ghi lại hoặc chụp màn hình dữ liệu trước khi thử. Mỗi case bắt đầu từ dữ liệu đã kiểm tra; không khởi động lại hệ thống giữa lúc thử và kiểm tra kết quả.
- Có tài khoản khách hàng A đăng nhập được ở trang mua hàng và tài khoản quản trị M để đối chiếu; mở cửa sổ riêng tư mới khi thử đăng nhập A vào trang quản trị.

## Test Data

| Field | Value |
|---|---|
| Tài khoản | `A — khách hàng` |

## Test Steps

1. Mở http://localhost:5174 trong một cửa sổ riêng tư mới.
2. Thử đăng nhập bằng email/mật khẩu A, không dùng tài khoản M.
3. Nếu đăng nhập được, tìm mục Sản phẩm; ghi lại có thể mở/chỉnh sửa/thêm/xóa hay không.
4. Ở cửa sổ của M, tải lại mục Sản phẩm và kiểm tra P/Q/R vẫn như trước.

## Expected Result

- Tài khoản khách hàng bị từ chối quyền quản lý sản phẩm; không được thêm/sửa/xóa bằng quyền quản trị.
- P/Q/R giữ nguyên.

## Status / Related Bugs

Not Run / None
