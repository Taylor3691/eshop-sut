# TC-PROFILE-MOBILE-016: Native — chưa login không thể sửa hồ sơ

## Requirement ID
FR-04; FR-20

## Module / Test Type / Technique
PROFILE-MOBILE / Functional / Equivalence Partitioning

## Preconditions
- Fixture A/B và snapshot API theo [README bộ cases](README.md) đã xác minh; API client và Mobile dùng cùng backend/database.
- Mỗi case độc lập, baseline được khôi phục; không restart backend giữa thao tác và readback.
- App ở phiên chưa login; header hiển thị “Đăng nhập”. API token hợp lệ chỉ dùng cho readback độc lập.

## Test Data
| Field | Value |
|---|---|
| Session Mobile | Không user/token |
| Profile đối chứng | A/B baseline |

## Test Steps
1. Tại màn hình đầu, chạm liên kết tài khoản “Đăng nhập” trên header; quan sát nơi app dẫn tới.
2. Thử truy cập hồ sơ qua các điều hướng tài khoản có sẵn; không inject setView hoặc dùng URL/deep link không được đặc tả.
3. Xác nhận không có form chỉnh hồ sơ hoạt động hoặc nút cập nhật hồ sơ có quyền trong phiên này.
4. Dùng API client GET /api/users/me với Bearer TOKEN_A và TOKEN_B; so sánh theo ID với snapshot trước case.

## Expected Result
- App yêu cầu login trước khi sửa hồ sơ; không cho anonymous ghi profile A/B.
- Đi tới màn hình login là kết quả hợp lệ; không bắt buộc có route profile cho anonymous hoặc nguyên văn thông báo. Snapshot A/B không đổi.

## Status / Related Bugs
Not Run / None
