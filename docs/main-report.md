# HW02 — Domain Testing và Boundary Value Analysis

Sinh viên: Huỳnh Thái Toàn — MSSV: 23120175.

Bản hiệu chỉnh ngày 18/10/2026. Oracle là README đặc tả EShop. Kết quả hiện hành nằm ở các file `05-execution-results.md`.

## 1. Phạm vi và phương pháp

| Pool | Chức năng | Môi trường | Tài liệu chi tiết |
| --- | --- | --- | --- |
| A | FR-05 tìm kiếm sản phẩm | Web localhost:5173 | fr-05/ |
| B | FR-11 lịch sử đơn hàng | Web localhost:5173/profile | fr-11/ |
| C | FR-16 import CSV | Admin localhost:5174 | fr-16/ |
| D | FR-05 trên app mobile | React Native qua Expo web localhost:8081 | fr-05-mobile/ |

Mỗi chức năng có sáu file: biến đầu vào, phân hoạch, on/off/in/out và BVA, test case, kết quả thực thi, AI gap analysis. Quy trình:

1. **Xác định biến.** Trích yêu cầu FR và điều kiện UI/bảo mật dùng chung; tách ràng buộc đặc tả với cách code đang làm. Gồm cả biến trạng thái dữ liệu (ví dụ số dòng trong bảng).
2. **Phân miền.** Chia miền theo từng đặc tính. VEC/IEC dựa trên điều kiện xác nhận; spec im lặng thì ghi giả định hoặc thăm dò.
3. **Chọn điểm on/off/in/out (domain testing).** Với mỗi biên của biến có thứ tự: on nằm trên biên; off gần biên nhất ở phía bên kia (biên đóng thì off ngoài miền, biên mở thì off trong miền); in/out là giá trị điển hình trong/ngoài miền.
4. **BVA 3 giá trị.** Min-1/Min/Min+1 và Max-1/Max/Max+1 khi spec có biên. Không áp BVA số học cho ID; không bịa Max hoặc phân trang.
5. **Viết test case.** Base choice cho từng đặc tính, mỗi test invalid chỉ đổi một điều kiện; lập ma trận miền/biên/điểm → TC.
6. **Chạy.** Script Playwright/fetch, ghi Expected/Actual và ảnh bằng chứng cho test FAIL. FAIL của test không đồng nghĩa bug đặc tả.
7. **Bug report và AI gap analysis.** Gom phát hiện theo nguyên nhân, ghi bug kèm ảnh và issue; ghi phần AI bỏ sót và lý do.

## 2. FR-05 web — Pool A

Input chính là `search`; trạng thái dữ liệu gồm tên và số sản phẩm trong CSDL. Phân hoạch: khớp toàn phần/một phần/không khớp; hoa thường/dấu; rỗng; SQL/HTML và ký tự có ý nghĩa trong URL; số sản phẩm 0 hoặc ≥ 1. Ký tự đặc biệt là dữ liệu hợp lệ, không phải input invalid.

Spec chưa chốt chuẩn hóa hoa thường/dấu hoặc trim. TC-04/05/07 chấp nhận rỗng hoặc sản phẩm tương ứng; khi rỗng vẫn phải có empty state.

On/off/in/out: độ dài từ khóa `len ≥ 1` (on `a`, off `""`, in `iPhone`) và số sản phẩm `N ≥ 1` (on 1, off 0, in 5). BVA: độ dài 0/1/2; số sản phẩm 0/1/2 (TC-52..54). Chuỗi 254/255/256 chỉ là kiểm tra độ bền, không phải MaxLength.

26 test chức năng; 23 test query thừa giữ riêng làm kiểm tra bổ sung, không tính coverage. Lỗi quan sát: đơn vị giá, alt, heading, loading, empty state (kể cả khi CSDL rỗng), render HTML, ký tự SQL và cắt từ khóa có `&`/`#`.

## 3. FR-11 — Pool B

Miền: phiên đăng nhập/JWT; quan hệ chủ đơn bằng hoặc khác người gọi; số đơn 0 hoặc có đơn; năm trạng thái; mã/ngày/tổng tiền hiển thị. Base choice là một đơn pending của user id 2.

On/off/in/out: số đơn `N ≥ 1` (on 1, off 0, in 2); tổng tiền `≥ 1000` (on 1000, off 999, in 30000000, out 1) và `≥ 1000000` (on 1000000, off 999999). BVA tổng tiền -1/0/1, 999/1000/1001, 999999/1000000/1000001. Chủ đơn id 1/2/3 và mã 0/1/2 là kiểm tra định danh, không phải biên số học.

TC-21/22 chèn NULL là kiểm thử độ bền; BUG-12/13 chờ xác nhận. TC-28 (mới) kiểm tra thứ tự Tab theo FR-21: focus đi hết cột trái rồi mới sang nút "Hủy đơn" ở cột phải. FR-21 chưa rõ cách đọc bố cục hai cột nên ghi là phát hiện cần làm rõ. Gap múi giờ chưa có oracle nên chưa chạy.

## 4. FR-16 — Pool C

Miền: quyền admin/JWT; đuôi/header; cú pháp CSV; tên rỗng; giá dương và không phải số; số dòng; giao dịch nguyên tử. Base choice là CSV một dòng chuẩn, admin và seed năm sản phẩm.

On/off/in/out: tên `len ≥ 1` (on `a`, off `""`); giá `> 0` là biên mở (on 0 nằm ngoài miền, off 0.01 nằm trong miền theo bước lấy mẫu 0.01, in 100000, out -1); số dòng `N ≥ 1` (on 1, off 0). BVA tên 0/1/2, giá -1/0/1 và -0.01/0.01, số dòng 0/1/2.

Giới hạn 255 của FR-15 chưa được xác nhận cho FR-16: rút TC-21, BUG-19 chờ làm rõ. TC-25/26 xác nhận sai nháy kép escape và newline trong trường nháy (BUG-14); TC-31 giá -0.01 FAIL (BUG-18). Ảnh bằng chứng đã chụp lại để thấy dữ liệu sai sau import (trang chi tiết sản phẩm, bảng sản phẩm admin) thay vì chỉ banner "Import hoàn tất".

## 5. FR-05 mobile — Pool D

Bộ test dùng UI React Native qua react-native-web. Ngoài các lớp từ khóa như web (thêm `&`, `#`, `?`), bộ mobile có hai đặc tính riêng: số sản phẩm trong CSDL (0/1/2, TC-24..26) và độ rộng màn thiết bị (320/390/768 px, TC-27/28; ranh giới nhóm thiết bị là giả định). Không áp thẻ HTML `h1`/`alt` làm oracle native.

Script chuyển host API hard-code sang localhost, giữ query do app tạo và thêm độ trễ để quan sát loading. Đây là điều chỉnh môi trường test, không sửa ứng dụng. TC-15/16 BLOCKED vì Chrome cắt dấu cách cuối URL. Máy chưa có Android SDK hoặc iOS Simulator; kết quả là của Expo web, chưa thay cho chạy native.

## 6. Test summary hiện hành

Test chức năng:

| Chức năng | Thiết kế | Đã chạy | PASS | FAIL | BLOCKED |
| --- | --- | --- | --- | --- | --- |
| FR-05 web | 26 | 26 | 7 | 19 | 0 |
| FR-11 | 28 | 28 | 23 | 5 | 0 |
| FR-16 | 30 | 30 | 17 | 13 | 0 |
| FR-05 mobile (Expo web) | 27 | 25 | 10 | 15 | 2 |
| Tổng | 111 | 109 | 57 | 52 | 2 |

Kiểm tra bổ sung query thừa: 23 (web) + 1 (mobile), đều PASS, không tính vào bảng trên. Số test FAIL không phải số bug.

## 7. Bug report và AI gap analysis

23 mã bug: 19 bug theo đặc tả, 4 phát hiện chờ xác nhận (BUG-07/12/13/19). BUG-01..22 có issue #44–#65 kèm ảnh. BUG-23 (web cắt từ khóa có `&`/`#`, tách khỏi BUG-22 của mobile vì khác component) có issue #66. Ảnh bổ sung đã gắn bằng comment lên các issue cũ liên quan. BUG-01/02/03 trước đây dùng chung một ảnh, nay có ảnh riêng thấy đúng giá `VND`, `alt=""` và hai thẻ `h1`.

Mỗi thư mục có `06-ai-gap-analysis.md`: nguyên nhân (prompt hẹp, giới hạn công cụ, độ phức tạp chức năng), cách khắc phục và gap còn lại. Lần cập nhật này ghi thêm: AI coi BVA thay được bước on/off/in/out; biến số sản phẩm có ở bước 1 nhưng bị bỏ ở bước 2; bộ mobile chép bộ web; ảnh bằng chứng FR-16 trùng nhau mà AI không mở ra kiểm tra.

## 8. AI, skill và hồ sơ nộp

AI Critique: `ai-critique.md` và `.pdf`. AI Audit: `ai-audit-report.md` và `.pdf`.

Skill: `../.cursor/skills/fr-domain-testing/SKILL.md`, đã thêm bước on/off/in/out, quy tắc ảnh bằng chứng, miền riêng cho mobile và tách kiểm tra bổ sung khỏi summary. Video demo: https://youtu.be/b0SKlX8yYJU (quay với bản skill trước).

Git commit log có commit riêng cho từng bước của lượt hiệu chỉnh này. Chưa xác minh việc chọn FR không trùng thành viên khác vì chưa có danh sách nhóm.

Tên zip: `23120175_HW02_AI_DomainTesting_083.zip`. Điểm 083 là tự đánh giá.
