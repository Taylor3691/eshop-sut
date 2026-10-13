# TC-PROFILE-MOBILE-001: Native — từ chối phone 9 chữ số

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
| phone | 091234567 |
| shipping_address / ô Địa chỉ | 12 Lê Lợi, Phường Bến Nghé, TP.HCM |
| Cách nhập | Gõ trực tiếp vào ô phone; giữ 0 đầu |

## Test Steps
1. Xác nhận form đúng baseline A, email mobile.a@example.com; lưu snapshot A/B.
2. Xóa phone hiện tại, gõ 091234567; kiểm tra đủ 9 ký tự và giữ leading zero nếu có.
3. Chạm “Cập nhật”; ghi nhận validation/response. Nếu control chặn ký tự trước submit, ghi đúng điểm chặn; không bypass bằng API.
4. Dùng API client GET /api/users/me với Bearer TOKEN_A và TOKEN_B; so sánh theo ID với snapshot trước case.
5. Trong Mobile chạm “Thoát”, login lại A bằng email/password fixture; mở hồ sơ và đối chiếu name/phone/address/email với GET sau thao tác.

## Expected Result
- Phone 091234567 không được lưu thành phone hợp lệ; baseline phone A vẫn giữ 0987654321. Form không được báo chấp nhận và lưu thành công giá trị sai.
- Vì chỉ phone thay đổi, name/address/email/role A và toàn bộ B giữ snapshot; form sau login mới phản ánh phone server.
- Input filtering hoặc validation trước network đều có thể thực hiện từ chối; ghi giá trị thật đã submit. Không suy ra server validation đã được exercise nếu request chưa gửi.

## Status / Related Bugs
Not Run / None
