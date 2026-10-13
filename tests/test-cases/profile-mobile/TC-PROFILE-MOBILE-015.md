# TC-PROFILE-MOBILE-015: Native — không có thao tác tự đổi role

## Requirement ID
FR-04; FR-20; SEC-06

## Module / Test Type / Technique
PROFILE-MOBILE / Functional / Equivalence Partitioning

## Preconditions
- Fixture A/B và snapshot API theo [README bộ cases](README.md) đã xác minh; API client và Mobile dùng cùng backend/database.
- Mỗi case độc lập, baseline được khôi phục; không restart backend giữa thao tác và readback.
- Mobile đã login A (mobile.a@example.com / MobileA123!); chạm lời chào trên header để mở “Hồ sơ của bạn”.

## Test Data
| Field | Value |
|---|---|
| Tài khoản | A / role=user |
| Hành động | Kiểm tra control của hồ sơ; không can thiệp request |

## Test Steps
1. Mở hồ sơ A; duyệt các field/control có thể thao tác, kể cả khi cuộn.
2. Kiểm tra có control/action nào cho user tự đổi quyền không; chỉ dùng UI thông thường, không giả định phải có field role.
3. Dùng API client GET /api/users/me với Bearer TOKEN_A và TOKEN_B; so sánh theo ID với snapshot trước case.
4. Logout/login lại A; đối chiếu role server/login mới với baseline.

## Expected Result
- Không có thao tác native cho user tự nâng/chuyển role; role A giữ user, B giữ nguyên.
- Nếu có text role chỉ đọc thì không tự coi là lỗi. API role enforcement được kiểm riêng ở case 024.

## Status / Related Bugs
Not Run / None
