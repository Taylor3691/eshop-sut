# [BUG][PROFILE-WEB] Giao diện hồ sơ từ chối phone hợp lệ 10–11 chữ số bắt đầu bằng 0

## Found by Test Case

[TC-PROFILE-WEB-001](../test-cases/profile-web/TC-PROFILE-WEB-001.md), [TC-PROFILE-WEB-002](../test-cases/profile-web/TC-PROFILE-WEB-002.md).

## Requirement liên quan

FR-04: phone hợp lệ bắt đầu bằng `0`, có 10–11 chữ số; người dùng đã login có thể cập nhật hồ sơ của chính mình.

## Severity / Priority

Major / P1 — chặn cập nhật hồ sơ với phone hợp lệ theo requirement.

## Environment

- Tester: `vt-toan`; ngày chạy: 2026-10-13, Asia/Saigon.
- Windows 11; Chrome `154.0.8037.98`; Node.js `24.10.0`; Vite `8.0.12`.
- UI: `http://localhost:5173/profile`; API: `http://localhost:3000/api/users/me`.
- Build/commit code ứng dụng: `01d2a68`, branch `feat/TToan-HW2`; không sửa code ứng dụng.
- Fixture A: ID `3`, email `profile.a@example.com`, role `user`, name `Nguyễn Văn An`, phone baseline `0987654321`, shipping_address `12 Lê Lợi, Phường Bến Nghé, TP.HCM`.
- Fixture B: ID `4`, email `profile.b@example.com`, role `user`, name `Trần Thị Bình`, phone `0976543210`, shipping_address `20 Hai Bà Trưng, Phường Bến Nghé, TP.HCM`.

## Steps to reproduce

1. Chuẩn bị độc lập fixture A/B theo [Pool A README](../test-cases/profile-web/README.md); lấy JWT/ID thật qua login và xác minh snapshot bằng GET `/api/users/me` của từng tài khoản.
2. Login storefront bằng A, mở `/profile`, đợi name/phone/address/email đúng baseline.
3. Chỉ thay phone bằng `0912345678` (10 chữ số, giữ `0` đầu); giữ name/address baseline. Biến thể case 002: khôi phục/xác minh baseline độc lập rồi dùng `09123456789` (11 chữ số).
4. Bấm **Cập nhật**.
5. Ghi nhận alert, dùng GET `/api/users/me` với token A để đọc dữ liệu server, reload trang và đối chiếu form; GET bằng token B để kiểm tra tài khoản đối chứng.

## Expected result

- Cập nhật thành công; phone A là chuỗi `0912345678` hoặc `09123456789` tương ứng input của case, trên GET và sau reload.
- Name/address/email/role A và toàn bộ hồ sơ B không đổi.

## Actual result

- Tại 15:39 ngày 2026-10-13 (UTC+07), browser hiển thị alert: **“Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số.”**
- Giá trị thực trong input trước submit được đọc lại là `0912345678`; UI chặn trước network, không phát request PUT.
- GET sau thao tác và form sau reload vẫn có phone baseline `0987654321`, không lưu phone hợp lệ vừa nhập.
- Các trường khác A và hồ sơ B vẫn đúng snapshot.
- Đây là failure ở UI acceptance. Backend acceptance của phone hợp lệ chưa được exercise vì không có PUT; không suy ra lỗi server từ case này.
- Case 002 tại 15:48 UTC+07 xác nhận cùng failure với `09123456789`: input được đọc lại đủ 11 chữ số; dialog thật hiển thị cùng lỗi; GET và form sau reload giữ baseline `0987654321`; các trường khác A và B giữ snapshot. Screenshot input được capture trước submit và screenshot dialog sau một lần click. Không ghi kết luận network riêng cho case 002 vì event log của lần click này không được lưu.

## Evidence

- [Screenshot alert thật](TC-PROFILE-WEB-001-alert.png): dialog của trình duyệt tại URL `/profile`, hiển thị lỗi validation.
- [Screenshot sau reload](TC-PROFILE-WEB-001-after-reload.png): phone A vẫn `0987654321`.
- [Screenshot input 11 chữ số](TC-PROFILE-WEB-002-input.png) và [screenshot alert case 002](TC-PROFILE-WEB-002-alert.png).
- GET A sau thao tác: `id=3`, `phone="0987654321"`; GET B: `id=4`, `phone="0976543210"`, name/address/email/role hai tài khoản giữ snapshot.
- [Test run](../test-runs/pool-a-test-run.md).

## GitHub Issue

Chưa publish; sẽ tạo Issue kèm screenshots trong bước reporting của batch, sau khi kiểm tra duplicate.
