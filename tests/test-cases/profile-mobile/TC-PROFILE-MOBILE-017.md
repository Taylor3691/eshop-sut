# TC-PROFILE-MOBILE-017: Native — logout không giữ quyền sửa hồ sơ A

## Requirement ID
FR-04; FR-20

## Module / Test Type / Technique
PROFILE-MOBILE / Functional / Equivalence Partitioning

## Preconditions
- Fixture A/B và snapshot API theo [README bộ cases](README.md) đã xác minh; API client và Mobile dùng cùng backend/database.
- Mỗi case độc lập, baseline được khôi phục; không restart backend giữa thao tác và readback.
- Mobile đã login A (mobile.a@example.com / MobileA123!); chạm lời chào trên header để mở “Hồ sơ của bạn”.

## Test Data
| Field | Value |
|---|---|
| Trước thao tác | A đang login; profile baseline |
| Hành động | Thoát → chạm Đăng nhập trên header |

## Test Steps
1. Mở hồ sơ A; ghi snapshot trước logout.
2. Chạm “Thoát”; quan sát header/session và điều hướng tài khoản thông thường.
3. Chạm liên kết tài khoản; kiểm tra không thể mở lại form A có quyền cập nhật khi chưa login.
4. Dùng API client GET /api/users/me với Bearer TOKEN_A và TOKEN_B; so sánh theo ID với snapshot trước case.

## Expected Result
- Phiên Mobile đã logout, phải login lại để sửa profile; không phục hồi form có quyền cập nhật A bằng điều hướng thông thường.
- A/B server không đổi do logout. Không yêu cầu revoke TOKEN_A cũ trên server hoặc kiểm cold restart (AS-PM-04).

## Status / Related Bugs
Not Run / None
