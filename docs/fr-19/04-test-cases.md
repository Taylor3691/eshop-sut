# FR-19 — Test cases

Chức năng: **FR-19 Quản lý Người dùng (Admin)**, kiểm trên app mobile `frontend-mobile/App.js`.

Nguồn: miền ở `docs/fr-19/02-equivalence-partitioning.md` và biên ở `docs/fr-19/03-boundary-value-analysis.md`.

## Oracle

Expected result bám README FR-19, không bám code.

- Admin xem danh sách tất cả người dùng và không thấy mật khẩu.
- Admin xóa được người dùng khác.
- Admin không xóa được chính tài khoản đang đăng nhập.

## Cách rút số test case

**Hợp lệ — base choice.** Cần một mức chuẩn, rồi mỗi lớp hoặc biên hợp lệ khác là một test, chỉ đổi yếu tố đó.

**Không hợp lệ — một lỗi một test.** Đúng một dữ liệu sai. Phần còn lại ở mức chuẩn.

Bước 2 không có lớp VEC hay IEC. Bước 3 không có biên. Không có mức chuẩn để giữ, và không có yếu tố để đổi. Không bịa test cho id người dùng, mật khẩu, hay role vì bước 1 đã loại chúng khỏi input của app mobile.

## Kết quả

Không có test case. Bảng dưới đây trống.

| TC | Miền / biên | Precondition | Test data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |

Chưa chạy.
