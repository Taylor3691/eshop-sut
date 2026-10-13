# Pool A — Bộ test cases hồ sơ Web/API

Thiết kế theo [phân tích Domain/BVA](../../test-summary/profile-web-analysis.md). Module `PROFILE-WEB` gồm UI và API phục vụ storefront; Pool D sẽ có module riêng. Tất cả cases là **Not Run / None**. Người dùng tự execute; tài liệu này không phải test run.

## Fixture dùng chung

| Tài khoản | Email | Mật khẩu test | Role | Name | Phone | shipping_address |
|---|---|---|---|---|---|---|
| A | profile.a@example.com | ProfileA123! | user | Nguyễn Văn An | 0987654321 | 12 Lê Lợi, Phường Bến Nghé, TP.HCM |
| B | profile.b@example.com | ProfileB123! | user | Trần Thị Bình | 0976543210 | 20 Hai Bà Trưng, Phường Bến Nghé, TP.HCM |

Đây là dữ liệu test đề xuất do tester tạo, không phải tài khoản seed có sẵn. Không dùng tài khoản admin thay cho B vì cần kiểm tra hai chủ thể có cùng role.

1. Tester chuẩn bị SUT và hai tài khoản trong môi trường local. Có thể đăng ký bằng `POST /api/register` với `name/email/password` tương ứng. Nếu email đã có, dùng đúng tài khoản test đã tạo; không đăng ký trùng.
2. Thiết lập baseline bằng fixture/database local có kiểm soát hoặc API nếu đã xác minh API chấp nhận; không phụ thuộc UI cập nhật đang bị kiểm thử để tạo dữ liệu tiên quyết. Không tự đổi phone sang giá trị sai requirement để vượt UI.
3. Đăng nhập từng tài khoản bằng `POST /api/login`, body `{"email":"profile.a@example.com","password":"ProfileA123!"}` cho A và tương tự B. Ghi nhận ID thực và token: `A_ID`, `B_ID`, `TOKEN_A`, `TOKEN_B`. Không giả định ID cố định.
4. Đọc GET `/api/users/me` với từng token; xác nhận name/phone/address/email/role đúng baseline, A_ID khác B_ID. Lưu snapshot trước case.
5. Mỗi case bắt đầu với baseline đã xác minh. Khôi phục sau case, đặc biệt case role/HTML/ownership có thể làm thay đổi trạng thái trên SUT lỗi. Nếu baseline hoặc đăng nhập không chuẩn bị được, ghi lý do Blocked trong test run khi thực thi; không sửa Expected Result.
6. Không restart backend giữa thao tác và readback: startup xóa và seed lại database. Reload trang và GET lại dùng để kiểm tra dữ liệu đã lưu.

## Quy tắc thực thi dành cho tester

- Base API: `http://localhost:3000`; storefront: `http://localhost:5173`. JSON gửi `Content-Type: application/json`. Token/ID là các giá trị runtime duy nhất phải thay.
- Case UI dùng form như người dùng; case API gửi trực tiếp để kiểm tra server. Không gộp kết luận giữa hai lớp.
- Với API client, tắt auth kế thừa/cookie khi thử không token; request đọc lại dùng đúng token hợp lệ A/B.
- Chỉ thay trường được chỉ định; giữ các trường khác như Test Data. PUT luôn đủ `name`, `phone`, `shipping_address`, trừ các trường bổ sung được case chỉ rõ.
- Response thành công không đủ: đối chiếu GET và reload được nêu trong từng case. Không yêu cầu đúng nguyên văn thông báo hoặc một mã HTTP chưa được đặc tả.
- Lưu Actual Result/evidence riêng trong `tests/test-runs/` khi người dùng execute, theo template lớp học. Chưa có test run, bug report hay bằng chứng execution được tạo trong giai đoạn thiết kế.
- Case 025–026 có điều kiện exercise điểm hiển thị; nếu dữ liệu bị chặn trước đó, ghi hạn chế/Blocked có lý do thay vì coi là đã chứng minh an toàn render.

## Generated Test Cases

| ID | Mục tiêu | Technique |
|---|---|---|
| [TC-PROFILE-WEB-001](TC-PROFILE-WEB-001.md) | UI — chấp nhận phone 10 chữ số | BVA |
| [TC-PROFILE-WEB-002](TC-PROFILE-WEB-002.md) | UI — chấp nhận phone 11 chữ số | BVA |
| [TC-PROFILE-WEB-003](TC-PROFILE-WEB-003.md) | UI — từ chối phone 9 chữ số | BVA |
| [TC-PROFILE-WEB-004](TC-PROFILE-WEB-004.md) | UI — từ chối phone 12 chữ số | BVA |
| [TC-PROFILE-WEB-005](TC-PROFILE-WEB-005.md) | API — chấp nhận phone 10 chữ số | BVA |
| [TC-PROFILE-WEB-006](TC-PROFILE-WEB-006.md) | API — chấp nhận phone 11 chữ số | BVA |
| [TC-PROFILE-WEB-007](TC-PROFILE-WEB-007.md) | API — từ chối phone 9 chữ số | BVA |
| [TC-PROFILE-WEB-008](TC-PROFILE-WEB-008.md) | API — từ chối phone 12 chữ số | BVA |
| [TC-PROFILE-WEB-009](TC-PROFILE-WEB-009.md) | UI — từ chối phone không bắt đầu bằng 0 | Equivalence Partitioning |
| [TC-PROFILE-WEB-010](TC-PROFILE-WEB-010.md) | API — từ chối phone không bắt đầu bằng 0 | Equivalence Partitioning |
| [TC-PROFILE-WEB-011](TC-PROFILE-WEB-011.md) | UI — từ chối phone chứa chữ cái | Equivalence Partitioning |
| [TC-PROFILE-WEB-012](TC-PROFILE-WEB-012.md) | API — từ chối phone chứa chữ cái | Equivalence Partitioning |
| [TC-PROFILE-WEB-013](TC-PROFILE-WEB-013.md) | UI — chỉ cập nhật Họ Tên | Equivalence Partitioning |
| [TC-PROFILE-WEB-014](TC-PROFILE-WEB-014.md) | UI — chỉ cập nhật Địa chỉ | Equivalence Partitioning |
| [TC-PROFILE-WEB-015](TC-PROFILE-WEB-015.md) | UI — email chỉ đọc và đúng loại trường | Equivalence Partitioning |
| [TC-PROFILE-WEB-016](TC-PROFILE-WEB-016.md) | UI — truy cập hồ sơ khi chưa đăng nhập | Equivalence Partitioning |
| [TC-PROFILE-WEB-017](TC-PROFILE-WEB-017.md) | API — GET hồ sơ không có token | Equivalence Partitioning |
| [TC-PROFILE-WEB-018](TC-PROFILE-WEB-018.md) | API — PUT hồ sơ không có token | Equivalence Partitioning |
| [TC-PROFILE-WEB-019](TC-PROFILE-WEB-019.md) | API — GET hồ sơ với token sai định dạng | Equivalence Partitioning |
| [TC-PROFILE-WEB-020](TC-PROFILE-WEB-020.md) | API — PUT hồ sơ với token sai định dạng | Equivalence Partitioning |
| [TC-PROFILE-WEB-021](TC-PROFILE-WEB-021.md) | API — token A không được chọn hồ sơ B qua body | Equivalence Partitioning |
| [TC-PROFILE-WEB-022](TC-PROFILE-WEB-022.md) | API — token A không được chọn hồ sơ B qua query | Equivalence Partitioning |
| [TC-PROFILE-WEB-023](TC-PROFILE-WEB-023.md) | API — người dùng không thể tự nâng role thành admin | Equivalence Partitioning |
| [TC-PROFILE-WEB-024](TC-PROFILE-WEB-024.md) | API — JWT sửa danh tính nhưng giữ chữ ký cũ bị từ chối | Equivalence Partitioning |
| [TC-PROFILE-WEB-025](TC-PROFILE-WEB-025.md) | API → UI — tên giống HTML được hiển thị an toàn | Equivalence Partitioning |
| [TC-PROFILE-WEB-026](TC-PROFILE-WEB-026.md) | API → UI — địa chỉ giống HTML được hiển thị an toàn | Equivalence Partitioning |
| [TC-PROFILE-WEB-027](TC-PROFILE-WEB-027.md) | API — cập nhật đồng thời ba trường hợp lệ | Equivalence Partitioning |
| [TC-PROFILE-WEB-028](TC-PROFILE-WEB-028.md) | UI — cập nhật đồng thời ba trường hợp lệ | Equivalence Partitioning |
