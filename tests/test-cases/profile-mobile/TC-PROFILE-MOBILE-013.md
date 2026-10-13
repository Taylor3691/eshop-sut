# TC-PROFILE-MOBILE-013: Native — lưu đồng thời ba trường hợp lệ

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
| name | Lê Thị Mai |
| phone | 09123456789 |
| shipping_address / ô Địa chỉ | 35 Nguyễn Huệ, Phường Bến Nghé, TP.HCM |

## Test Steps
1. Xác nhận form đúng baseline A và ghi snapshot A/B.
2. Chỉ thay Họ Tên, Số điện thoại, Địa chỉ giao hàng theo Test Data; các trường khác giữ baseline. Không sửa payload do app gửi.
3. Chạm “Cập nhật”; ghi validation và response. Nếu bị chặn trước request dù phone hợp lệ, ghi điểm dừng; không dùng phone sai để vượt lỗi.
4. Dùng API client GET /api/users/me với Bearer TOKEN_A và TOKEN_B; so sánh theo ID với snapshot trước case.
5. Trong Mobile chạm “Thoát”, login lại A bằng email/password fixture; mở hồ sơ và đối chiếu name/phone/address/email với GET sau thao tác.

## Expected Result
- Cập nhật được chấp nhận. GET A lưu name=Lê Thị Mai; phone=09123456789; shipping_address=35 Nguyễn Huệ, Phường Bến Nghé, TP.HCM. Form sau login mới phản ánh cùng dữ liệu.
- Email/role và các field không sửa của A giữ nguyên; profile B không đổi. Local UI/toast không thay readback server.
- Địa chỉ phải vào trường shipping_address của profile. Tester có thể ghi request thật bằng công cụ network nếu sẵn có; không sửa body app để tạo kết quả Pass.

## Status / Related Bugs
Not Run / None
