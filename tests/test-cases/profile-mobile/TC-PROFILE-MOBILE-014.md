# TC-PROFILE-MOBILE-014: Native — email không sửa bằng gõ hoặc dán

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
| Tài khoản / quyền | A / user |
| name | Nguyễn Văn An |
| phone | 0987654321 |
| shipping_address / ô Địa chỉ | 12 Lê Lợi, Phường Bến Nghé, TP.HCM |
| Email hiện tại | mobile.a@example.com |
| Email thử thay | mobile.changed@example.com |

## Test Steps
1. Mở hồ sơ A; kiểm tra email hiện tại.
2. Chạm ô email, thử chọn/xóa/gõ và dán mobile.changed@example.com bằng thao tác native thông thường. Không sửa state/code/request.
3. Giữ name/phone/address baseline, chạm “Cập nhật”; ghi giá trị email trên màn hình.
4. Dùng API client GET /api/users/me với Bearer TOKEN_A và TOKEN_B; so sánh theo ID với snapshot trước case.
5. Trong Mobile chạm “Thoát”, login lại A bằng email/password fixture; mở hồ sơ và đối chiếu name/phone/address/email với GET sau thao tác.

## Expected Result
- UI không cho thay email; hiển thị vẫn là mobile.a@example.com. GET và login mới xác nhận email A không đổi, B không đổi.
- Không yêu cầu HTML type=email hoặc keyboard cụ thể. Case không kết luận API có cấm email mutation hay không.
- Nếu form update bị chặn bởi phone đúng requirement, vẫn ghi email readonly checkpoint riêng; không suy ra các bước update đã Pass.

## Status / Related Bugs
Not Run / None
