# TC-PROFILE-MOBILE-018: Native — đổi từ A sang B rồi lưu đúng hồ sơ B

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
| Tài khoản đầu | A: mobile.a@example.com / MobileA123! |
| Tài khoản sau | B: mobile.b@example.com / MobileB123! |
| B name mới | Phạm Văn Minh |
| B phone mới | 0961234567 |
| B address mới | 50 Pasteur, Phường Bến Nghé, TP.HCM |

## Test Steps
1. Mở hồ sơ A, xác nhận đúng email/name/phone/address A; lưu snapshot A/B.
2. Chạm “Thoát”, login B bằng fixture B rồi chạm lời chào để mở hồ sơ.
3. Trước sửa, đối chiếu email/name/phone/address với snapshot B; kiểm tra không mang field A sang B.
4. Nhập ba giá trị B mới theo Test Data, chạm “Cập nhật”; không thay phone bằng số sai nếu bị chặn.
5. Dùng API client GET /api/users/me với Bearer TOKEN_A và TOKEN_B; so sánh theo ID với snapshot trước case.
6. Logout/login lại B, mở profile đối chiếu với GET B; tiếp tục logout/login A, xác nhận profile A vẫn baseline.

## Expected Result
- Sau chuyển tài khoản form thuộc B ngay trước sửa; email là mobile.b@example.com, không hiển thị/ghi dữ liệu A như của B.
- Chỉ B lưu ba giá trị mới; GET/login B nhất quán. A và role/email cả hai giữ snapshot.
- Nếu native validation chặn phone hợp lệ, ghi lỗi update cùng giới hạn readback; checkpoint account-switch vẫn đánh giá riêng, không tính toàn case đã Pass.

## Status / Related Bugs
Not Run / None
