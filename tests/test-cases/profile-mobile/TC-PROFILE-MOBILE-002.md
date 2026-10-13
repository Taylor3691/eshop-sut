# TC-PROFILE-MOBILE-002: Native — chấp nhận phone 10 chữ số, giữ số 0 đầu

## Requirement ID
FR-04; FR-20

## Module / Test Type / Technique
PROFILE-MOBILE / Functional / BVA

## Preconditions
- Fixture A/B và snapshot API theo [README bộ cases](README.md) đã xác minh; API client và Mobile dùng cùng backend/database.
- Mỗi case độc lập, baseline được khôi phục; không restart backend giữa thao tác và readback.
- Mobile đã login A (mobile.a@example.com / MobileA123!); chạm lời chào trên header để mở “Hồ sơ của bạn”.

## Test Data
| Field | Value |
|---|---|
| Tài khoản / quyền | A / user |
| name | Nguyễn Văn An |
| phone | 0912345678 |
| shipping_address / ô Địa chỉ | 12 Lê Lợi, Phường Bến Nghé, TP.HCM |
| Cách nhập | Gõ trực tiếp vào ô phone; giữ 0 đầu |

## Test Steps
1. Xác nhận form đúng baseline A, email mobile.a@example.com; lưu snapshot A/B.
2. Xóa phone hiện tại, gõ 0912345678; kiểm tra đủ 10 ký tự và giữ leading zero nếu có.
3. Chạm “Cập nhật”; ghi nhận validation/response. Nếu control chặn ký tự trước submit, ghi đúng điểm chặn; không bypass bằng API.
4. Dùng API client GET /api/users/me với Bearer TOKEN_A và TOKEN_B; so sánh theo ID với snapshot trước case.
5. Trong Mobile chạm “Thoát”, login lại A bằng email/password fixture; mở hồ sơ và đối chiếu name/phone/address/email với GET sau thao tác.

## Expected Result
- Form chấp nhận phone 0912345678 theo FR-04; GET A và form sau login mới cùng trả 0912345678, giữ nguyên 0 đầu.
- Name/address/email/role của A giữ baseline; snapshot B không đổi. Response/local UI đổi đơn thuần chưa đủ chứng minh lưu.

## Status / Related Bugs
Not Run / None
