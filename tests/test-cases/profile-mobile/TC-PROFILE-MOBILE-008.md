# TC-PROFILE-MOBILE-008: Native — dán phone có dấu gạch nối

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
| phone | 09123-5678 |
| shipping_address / ô Địa chỉ | 12 Lê Lợi, Phường Bến Nghé, TP.HCM |
| Cách nhập | Dán chính xác nội dung từ clipboard native |

## Test Steps
1. Xác nhận form đúng baseline A, email mobile.a@example.com; lưu snapshot A/B.
2. Chuẩn bị clipboard chứa chính xác 09123-5678; xóa phone hiện tại rồi dán vào ô “Số điện thoại”. Kiểm tra chuỗi thực tế trong ô.
3. Chạm “Cập nhật”; ghi nhận validation/response. Nếu control chặn ký tự trước submit, ghi đúng điểm chặn; không bypass bằng API.
4. Dùng API client GET /api/users/me với Bearer TOKEN_A và TOKEN_B; so sánh theo ID với snapshot trước case.
5. Trong Mobile chạm “Thoát”, login lại A bằng email/password fixture; mở hồ sơ và đối chiếu name/phone/address/email với GET sau thao tác.

## Expected Result
- Phone 09123-5678 không được lưu thành phone hợp lệ; baseline phone A vẫn giữ 0987654321. Form không được báo chấp nhận và lưu thành công giá trị sai.
- Vì chỉ phone thay đổi, name/address/email/role A và toàn bộ B giữ snapshot; form sau login mới phản ánh phone server.
- Input filtering hoặc validation trước network đều có thể thực hiện từ chối; ghi giá trị thật đã submit. Không suy ra server validation đã được exercise nếu request chưa gửi.

## Status / Related Bugs
Not Run / None
