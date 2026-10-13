# Pool D — Bộ test cases hồ sơ Mobile

Thiết kế theo [phân tích Domain/BVA](../../test-summary/profile-mobile-analysis.md), module `PROFILE-MOBILE`; khác `PROFILE-WEB` của Pool A. **30 cases = 4 BVA + 26 EP**; toàn bộ **Not Run / None**, chờ human review. Agent chỉ thiết kế; người dùng tự execute.

## Fixture dùng chung

| Tài khoản | Email | Mật khẩu test | Role | Name | Phone | shipping_address |
|---|---|---|---|---|---|---|
| A | mobile.a@example.com | MobileA123! | user | Nguyễn Văn An | 0987654321 | 12 Lê Lợi, Phường Bến Nghé, TP.HCM |
| B | mobile.b@example.com | MobileB123! | user | Trần Thị Bình | 0976543210 | 20 Hai Bà Trưng, Phường Bến Nghé, TP.HCM |

Đây là tài khoản test đề xuất, không phải seed có sẵn. Tester tạo fixture và khôi phục mỗi case trong môi trường local.

1. Chuẩn bị backend và Expo Go/emulator/thiết bị. Ghi OS/version, thiết bị/emulator, Expo/app version. Không tuyên bố đã bao phủ Android/iOS chỉ từ việc có thiết kế.
2. Kiểm tra `API_URL` tại [App.js](../../../frontend-mobile/App.js): hiện dùng LAN và có hậu tố `/api`. Tester đặt địa chỉ backend thực sự reachable từ thiết bị khi chuẩn bị môi trường. Không dùng `localhost` của điện thoại để chỉ máy backend. API client và Mobile phải dùng cùng server/database.
3. Có thể tạo A/B bằng POST `/api/register` với name/email/password tương ứng; nếu đã có, dùng tài khoản fixture đúng. Login bằng POST `/api/login` để ghi A_ID/B_ID và TOKEN_A/TOKEN_B runtime; không hardcode ID. Login Mobile bằng chính credentials tương ứng.
4. Thiết lập name/phone/shipping_address baseline qua fixture/database local có kiểm soát hoặc API đã xác minh. Không phụ thuộc native update đang kiểm thử để tạo precondition, và không dùng phone sai requirement để vượt validation.
5. GET `/api/users/me` với từng token xác nhận ID, name, phone, shipping_address, email, role; lưu snapshot trước case. Không dùng admin làm B.
6. Mỗi case bắt đầu baseline độc lập. Khôi phục sau mutation; role/ownership/markup cases trên SUT lỗi có thể làm thay đổi dữ liệu. Nếu môi trường/fixture không chuẩn bị được, tester ghi Blocked có lý do trong test run.
7. **Không restart backend giữa thao tác/readback:** startup reset/reseed database. Dùng GET và logout/login mới để kiểm persistence, không dựa cold restart app/token storage.

## Quy tắc thực thi dành cho tester

- Endpoint trong case là đường dẫn đầy đủ, ví dụ `/api/users/me`, nối với origin backend đã xác minh. `API_URL` của Mobile có sẵn `/api`; không nối thành `/api/api`.
- API JSON luôn gửi `Content-Type: application/json`. Auth hợp lệ là `Authorization: Bearer TOKEN_A` hoặc B; case negative ghi rõ header riêng. Tắt auth kế thừa/cookie cho không-token cases.
- TOKEN_A/TOKEN_B/A_ID/B_ID là runtime placeholders. Body có B_ID là **template**, thay bằng JSON number ID thật trước gửi; token tampering dùng công cụ local và giữ chữ ký cũ.
- Native login: chạm “Đăng nhập” ở header; sau login chạm lời chào để mở “Hồ sơ của bạn”. Chạm “Cập nhật” để gửi; “Thoát” tại hồ sơ là thao tác logout hiện có.
- Native cases dùng gõ/dán và request thật app phát ra. Không sửa code, state hoặc tên field trong request để khiến case Pass. Không bypass phone validation bằng phone sai.
- Negative phone-format có 10 ký tự, prefix 0 (trừ case prefix), letter/space/hyphen nằm trong chuỗi. Nếu control lọc/chặn trước submit, ghi giá trị thực tế và điểm chặn; không tự coi backend đã được exercise.
- Positive update chỉ Pass khi dữ liệu đúng qua server GET **và** form sau login mới. Toast, local user state hoặc ra/vào profile trong phiên chưa đủ. Nếu bị chặn dù phone hợp lệ, ghi failure tại đó cùng giới hạn coverage downstream.
- Cases 020–027 là API companions riêng: không giả làm thao tác native hoặc tính là native form/network-error coverage. Cases 028–029 kiểm native renderer sau fixture; 030 kiểm server → native load sau login mới.
- Markup probes dùng dữ liệu vô hại và fixture có kiểm soát; không yêu cầu acceptance markup. Nếu dữ liệu không tới điểm hiển thị thì không đánh Pass SEC-04; ghi limitation/Blocked theo execution thực tế.
- So sánh snapshot theo ID. Không ấn định mã HTTP/wording, auto-refresh realtime, token persistence, revoke JWT, timeout hoặc lỗi dưới field nếu requirement không định nghĩa.
- Nhập dữ liệu/số điện thoại dưới dạng chuỗi để giữ 0 đầu. Chỉ sửa field được case chỉ định; các field khác giữ baseline.
- Actual Result/evidence/Pass-Fail thuộc test run riêng trong `tests/test-runs/` do người dùng tạo khi execute; giai đoạn này chưa có run/confirmed bugs.

## Generated Test Cases

| ID | Mục tiêu | Kênh | Technique |
|---|---|---|---|
| [TC-PROFILE-MOBILE-001](TC-PROFILE-MOBILE-001.md) | Native — từ chối phone 9 chữ số | Native UI | BVA |
| [TC-PROFILE-MOBILE-002](TC-PROFILE-MOBILE-002.md) | Native — chấp nhận phone 10 chữ số, giữ số 0 đầu | Native UI | BVA |
| [TC-PROFILE-MOBILE-003](TC-PROFILE-MOBILE-003.md) | Native — chấp nhận phone 11 chữ số | Native UI | BVA |
| [TC-PROFILE-MOBILE-004](TC-PROFILE-MOBILE-004.md) | Native — từ chối phone 12 chữ số | Native UI | BVA |
| [TC-PROFILE-MOBILE-005](TC-PROFILE-MOBILE-005.md) | Native — từ chối phone không bắt đầu bằng 0 | Native UI | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-006](TC-PROFILE-MOBILE-006.md) | Native — dán phone có chữ cái | Native UI | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-007](TC-PROFILE-MOBILE-007.md) | Native — dán phone có khoảng trắng bên trong | Native UI | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-008](TC-PROFILE-MOBILE-008.md) | Native — dán phone có dấu gạch nối | Native UI | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-009](TC-PROFILE-MOBILE-009.md) | Native — không lưu phone rỗng | Native UI | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-010](TC-PROFILE-MOBILE-010.md) | Native — dán phone hợp lệ 11 chữ số | Native UI | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-011](TC-PROFILE-MOBILE-011.md) | Native — chỉ cập nhật Họ Tên | Native UI | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-012](TC-PROFILE-MOBILE-012.md) | Native — chỉ cập nhật địa chỉ và xác minh server lưu đúng trường | Native UI | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-013](TC-PROFILE-MOBILE-013.md) | Native — lưu đồng thời ba trường hợp lệ | Native UI | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-014](TC-PROFILE-MOBILE-014.md) | Native — email không sửa bằng gõ hoặc dán | Native UI | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-015](TC-PROFILE-MOBILE-015.md) | Native — không có thao tác tự đổi role | Native UI | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-016](TC-PROFILE-MOBILE-016.md) | Native — chưa login không thể sửa hồ sơ | Native UI | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-017](TC-PROFILE-MOBILE-017.md) | Native — logout không giữ quyền sửa hồ sơ A | Native UI | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-018](TC-PROFILE-MOBILE-018.md) | Native — đổi từ A sang B rồi lưu đúng hồ sơ B | Native UI | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-019](TC-PROFILE-MOBILE-019.md) | Native — tải đúng hồ sơ server khi login | Native UI | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-020](TC-PROFILE-MOBILE-020.md) | API companion — GET hồ sơ không token | API companion | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-021](TC-PROFILE-MOBILE-021.md) | API companion — PUT hồ sơ không token | API companion | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-022](TC-PROFILE-MOBILE-022.md) | API companion — GET hồ sơ với token sai định dạng | API companion | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-023](TC-PROFILE-MOBILE-023.md) | API companion — PUT hồ sơ với token sai định dạng | API companion | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-024](TC-PROFILE-MOBILE-024.md) | API companion — không thể tự nâng role thành admin | API companion | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-025](TC-PROFILE-MOBILE-025.md) | API companion — token A không chọn B qua body | API companion | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-026](TC-PROFILE-MOBILE-026.md) | API companion — token A không chọn B qua query | API companion | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-027](TC-PROFILE-MOBILE-027.md) | API companion — sửa ID trong JWT nhưng giữ chữ ký cũ | API companion | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-028](TC-PROFILE-MOBILE-028.md) | Fixture → Native — tên giống markup hiển thị như văn bản | Fixture → Native UI | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-029](TC-PROFILE-MOBILE-029.md) | Fixture → Native — địa chỉ giống markup hiển thị an toàn | Fixture → Native UI | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-030](TC-PROFILE-MOBILE-030.md) | API → Native — phiên login mới tải dữ liệu server đã cập nhật | API → Native UI | Equivalence Partitioning |

## Reuse và giới hạn

- [Pool A 005–008](../profile-web/README.md) có API phone BVA trên backend dùng chung; có thể reuse khi regression. Không sao chép/đếm lại chúng là Pool D native tests.
- 19 Native UI + 8 API companion + 2 Fixture → Native UI + 1 API → Native UI = 30 cases. 22 cases có bước quan sát native, trong đó chỉ 19 bắt đầu bằng tương tác native.
- 21/21 partitions có thiết kế; safe-display coverage có điều kiện fixture. Unknown name/address boundaries, Unicode phone, offline/session expiry và device matrix cần human review trong analysis.
