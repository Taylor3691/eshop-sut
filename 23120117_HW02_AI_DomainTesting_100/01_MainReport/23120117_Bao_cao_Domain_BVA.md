# Báo cáo Domain Testing và Boundary Value Analysis cho EShop

Ho và tên: Võ Hoàng Danh

MSSV: 23120117

## Phạm vi báo cáo

Báo cáo trình bày việc áp dụng Domain Testing và Boundary Value Analysis cho bốn phạm vi: FR-01 Đăng ký tài khoản trên Web, FR-07 Giỏ hàng trên Web, FR-17 Quản lý mã giảm giá trên Web Admin và FR-01 Đăng ký tài khoản trên Mobile. Mỗi phần xác định input, output, điều kiện, phân hoạch tương đương, giá trị đại diện, giá trị biên, kết quả chạy và khoảng trống cần xem xét sau khi dùng AI.

Domain Testing được thực hiện theo chuỗi: đọc requirement, xác định input và output, tách điều kiện độc lập, lập equivalence class, chọn representative value, thiết kế test case và kiểm tra độ phủ. BVA chỉ áp dụng cho miền có thứ tự và boundary có căn cứ; báo cáo không tự đặt giới hạn hoặc precision khi requirement chưa mô tả.

## Tổng quan kết quả

| Nhóm | Tính năng | TestCase | Đã chạy | Pass | Fail | Blocked | Lỗi |
|:---:|---|---:|---:|---:|---:|---:|---:|
| A | FR-01 Đăng ký tài khoản Web | 26 | 26 | 15 | 11 | 0 | 1 |
| B | FR-07 Giỏ hàng Web | 12 | 3 | 1 | 2 | 9 | 1 |
| C | FR-17 Quản lý mã giảm giá Web Admin | 20 | 18 | 11 | 7 | 2 | 6 |
| D | FR-01 Đăng ký tài khoản Mobile | 37 | 37 | 21 | 16 | 0 | 5 |
| **Tổng** | **4 tính năng** | **95** | **84** | **48** | **36** | **11** | **13** |

Tổng cộng có 95 test case được thiết kế. Có 84 test case đã có kết quả thực thi, gồm 48 Pass và 36 Fail; 11 test case Blocked do thiếu fixture hoặc tiền điều kiện ổn định. Báo cáo lỗi gồm 8 lỗi đã có trong thư mục Issue và 5 lỗi Mobile được tổng hợp từ Actual Result của test case hoặc bằng chứng mã nguồn.

## Feature A FR-01 Đăng ký tài khoản Web

### Kết quả thực thi

| Kỹ thuật | TestCase | Pass | Fail | Blocked |
|---|---:|---:|---:|---:|
| Domain Testing | 11 | 10 | 1 | 0 |
| Boundary Value Analysis | 15 | 5 | 10 | 0 |
| **Tổng** | **26** | **15** | **11** | **0** |

Một lỗi chính được xác nhận: các Mật khẩu hợp lệ theo FR-01 không tạo request đăng ký. Lỗi tác động đến một test Domain và mười test BVA, vì vậy số test Fail lớn hơn số lỗi độc lập.

### Phân tích Domain Testing

#### Phạm vi và phân tích requirement

- **Nguồn:** `README.md`, mục `FR-01: Đăng ký tài khoản`.
- **Phạm vi:** Chỉ FR-01; không sử dụng rule của feature, GUI hoặc Security khác.
- **Rule được trích xuất:** Họ Tên, Email và Mật khẩu là bắt buộc; Email đúng dạng `user@domain.com` và duy nhất; Mật khẩu dài tối thiểu 8 ký tự, có chữ hoa, chữ thường, chữ số và ít nhất một ký tự trong `{@, $, !, %, *, ?, &}`; đăng ký thành công thì chuyển tới trang Đăng nhập.
- **Chưa được mô tả trong requirement:** xử lý chuỗi chỉ có khoảng trắng; độ dài tối đa; tập ký tự của Họ Tên/Email; chuẩn Email chi tiết ngoài ví dụ; chuẩn hóa và phân biệt hoa/thường của Email; việc có cấm ký tự đặc biệt khác trong Mật khẩu hay không; nội dung thông báo; trạng thái/điều hướng khi đăng ký thất bại.
- FR-01 hiện tại không yêu cầu trường Xác nhận mật khẩu, vì vậy báo cáo không tự bổ sung trường này.

#### 1. Input / Output

**Input:**

- Họ Tên.
- Email.
- Trạng thái Email đã/chưa tồn tại trong hệ thống.
- Mật khẩu.

**Output:**

- Tất cả input hợp lệ: tài khoản được đăng ký thành công và người dùng được chuyển tới trang Đăng nhập.
- Có input không hợp lệ: đăng ký không thành công.
- Nội dung thông báo và điều hướng khi thất bại chưa được mô tả trong requirement.

---

#### 2. Xác định condition

| Condition ID | Input/Output | Điều kiện |
|---|---|---|
| C1 | Họ Tên | Phải được cung cấp. |
| C2 | Email | Phải được cung cấp. |
| C3 | Email | Với Email không rỗng, phải đúng dạng `user@domain.com`. |
| C4 | Email / Trạng thái hệ thống | Với Email đúng định dạng, Email phải chưa tồn tại. |
| C5 | Mật khẩu | Phải được cung cấp. |
| C6 | Mật khẩu | Với Mật khẩu không rỗng, độ dài phải `>= 8`. |
| C7 | Mật khẩu | Với Mật khẩu đủ độ dài, phải có ít nhất một chữ hoa. |
| C8 | Mật khẩu | Với Mật khẩu đủ độ dài, phải có ít nhất một chữ thường. |
| C9 | Mật khẩu | Với Mật khẩu đủ độ dài, phải có ít nhất một chữ số. |
| C10 | Mật khẩu | Với Mật khẩu đủ độ dài, phải có ít nhất một ký tự thuộc `{@, $, !, %, *, ?, &}`. |
| C11 | Output khi mọi input hợp lệ | Đăng ký thành công và chuyển tới trang Đăng nhập. |
| C12 | Output khi có input không hợp lệ | Đăng ký không thành công. |

---

#### 3. Equivalence Class Table

| EC ID | Input/Output | Equivalence Class | Loại |
|---|---|---|---|
| EC01 | Họ Tên | C1 — Họ Tên không rỗng. | Valid |
| EC02 | Họ Tên | C1 — Họ Tên rỗng. | Invalid |
| EC03 | Email | C2 — Email không rỗng. | Valid |
| EC04 | Email | C2 — Email rỗng. | Invalid |
| EC05 | Email | C3 — Email không rỗng, đúng dạng `user@domain.com`. | Valid |
| EC06 | Email | C3 — Email không rỗng, sai dạng `user@domain.com`. | Invalid |
| EC07 | Email / Trạng thái hệ thống | C4 — Email đúng định dạng và chưa tồn tại. | Valid |
| EC08 | Email / Trạng thái hệ thống | C4 — Email đúng định dạng nhưng đã tồn tại. | Invalid |
| EC09 | Mật khẩu | C5 — Mật khẩu không rỗng. | Valid |
| EC10 | Mật khẩu | C5 — Mật khẩu rỗng. | Invalid |
| EC11 | Mật khẩu | C6 — Mật khẩu không rỗng, độ dài `>= 8`. | Valid |
| EC12 | Mật khẩu | C6 — Mật khẩu không rỗng, độ dài từ 1 đến 7. | Invalid |
| EC13 | Mật khẩu | C7 — Có ít nhất một chữ hoa. | Valid |
| EC14 | Mật khẩu | C7 — Không có chữ hoa; các thành phần khác hợp lệ. | Invalid |
| EC15 | Mật khẩu | C8 — Có ít nhất một chữ thường. | Valid |
| EC16 | Mật khẩu | C8 — Không có chữ thường; các thành phần khác hợp lệ. | Invalid |
| EC17 | Mật khẩu | C9 — Có ít nhất một chữ số. | Valid |
| EC18 | Mật khẩu | C9 — Không có chữ số; các thành phần khác hợp lệ. | Invalid |
| EC19 | Mật khẩu | C10 — Có ít nhất một ký tự thuộc tập yêu cầu. | Valid |
| EC20 | Mật khẩu | C10 — Không có ký tự nào thuộc tập yêu cầu; các thành phần khác hợp lệ. | Invalid |
| EC21 | Output — mọi input hợp lệ | C11 — Tài khoản được tạo và chuyển tới trang Đăng nhập. | Valid |
| EC22 | Output — mọi input hợp lệ | C11 — Không tạo tài khoản hoặc không chuyển tới trang Đăng nhập. | Invalid |
| EC23 | Output — có input không hợp lệ | C12 — Đăng ký không thành công. | Valid |
| EC24 | Output — có input không hợp lệ | C12 — Hệ thống vẫn đăng ký thành công. | Invalid |

**Kiểm tra phân hoạch:** C1–C12 đều có EC tương ứng. C3 chỉ áp dụng khi Email không rỗng; C4 chỉ áp dụng khi Email đúng định dạng; C6 chỉ áp dụng khi Mật khẩu không rỗng. Khi kiểm tra C7–C10, Mật khẩu luôn đủ độ dài và các thành phần không phải mục tiêu đều hợp lệ để cô lập một Invalid EC.

---

#### 4. Representative Values

| EC ID | Equivalence Class | Loại | Representative Value |
|---|---|---|---|
| EC01 | Họ Tên không rỗng. | Valid | `Nguyễn Văn An` |
| EC02 | Họ Tên rỗng. | Invalid | `""` |
| EC03 | Email không rỗng. | Valid | `an.nguyen01@example.com` |
| EC04 | Email rỗng. | Invalid | `""` |
| EC05 | Email đúng định dạng. | Valid | `an.nguyen01@example.com` |
| EC06 | Email sai định dạng. | Invalid | `user.example.com` |
| EC07 | Email chưa tồn tại. | Valid | `an.nguyen01@example.com` với precondition chưa đăng ký |
| EC08 | Email đã tồn tại. | Invalid | `existing.user@example.com` với precondition đã đăng ký |
| EC09 | Mật khẩu không rỗng. | Valid | `Abcdef1@` |
| EC10 | Mật khẩu rỗng. | Invalid | `""` |
| EC11 | Mật khẩu dài ít nhất 8 ký tự. | Valid | `Abcdef1@` |
| EC12 | Mật khẩu dài 1–7 ký tự. | Invalid | `Aa1@abc` |
| EC13 | Có chữ hoa. | Valid | `Abcdef1@` |
| EC14 | Không có chữ hoa. | Invalid | `abcdef1@` |
| EC15 | Có chữ thường. | Valid | `Abcdef1@` |
| EC16 | Không có chữ thường. | Invalid | `ABCDEF1@` |
| EC17 | Có chữ số. | Valid | `Abcdef1@` |
| EC18 | Không có chữ số. | Invalid | `Abcdefg@` |
| EC19 | Có ký tự đặc biệt thuộc tập yêu cầu. | Valid | `Abcdef1@` |
| EC20 | Không có ký tự đặc biệt thuộc tập yêu cầu. | Invalid | `Abcdef12` |
| EC21 | Đăng ký hợp lệ hoàn tất đúng. | Valid | Kết quả của `TC-REG-001` |
| EC22 | Đăng ký hợp lệ không hoàn tất đúng. | Invalid | Tài khoản không tạo hoặc không chuyển trang |
| EC23 | Dữ liệu không hợp lệ bị từ chối. | Valid | Đăng ký không thành công |
| EC24 | Dữ liệu không hợp lệ được chấp nhận. | Invalid | Tài khoản vẫn được tạo |

---

#### 5. Test Cases
**Dữ liệu nền hợp lệ:** Họ Tên `Nguyễn Văn An`; Email đúng định dạng và chưa tồn tại; Mật khẩu `Abcdef1@`. 

| TC-ID | Requirement ID | Module / TestType / Technique | Preconditions | Test data | Test steps | Expected result | Status / Related bugs |
| --- | :-- | --- | --- | --- | --- | --- | --- |
| **TC-REG-001** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Trang Đăng ký đã mở.<br>`an.nguyen01@example.com` chưa tồn tại. | **Họ Tên:** Nguyễn Văn An<br>**Email:** an.nguyen01@example.com<br>**Mật khẩu:** Abcdef1@ | 1. Nhập toàn bộ dữ liệu hợp lệ.<br>2. Gửi form.<br>3. Kiểm tra tài khoản và trang đích. | Tài khoản được đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Fail** / `BUG-FR01-REG-VALID-PASSWORD-REJECTED` |
| **TC-REG-002** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Trang Đăng ký đã mở.<br>Email test chưa tồn tại. | **Họ Tên:** `""`<br>**Email:** an.nguyen02@example.com<br>**Mật khẩu:** Abcdef1@ | 1. Để trống Họ Tên.<br>2. Nhập các trường khác hợp lệ.<br>3. Gửi form. | Đăng ký không thành công do thiếu Họ Tên. Message cụ thể chưa được mô tả. | **Pass** / Không có |
| **TC-REG-003** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Trang Đăng ký đã mở. | **Họ Tên:** Nguyễn Văn An<br>**Email:** `""`<br>**Mật khẩu:** Abcdef1@ | 1. Để trống Email.<br>2. Nhập các trường khác hợp lệ.<br>3. Gửi form. | Đăng ký không thành công do thiếu Email. Message cụ thể chưa được mô tả. | **Pass** / Không có |
| **TC-REG-004** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Trang Đăng ký đã mở.<br>Chuỗi Email test chưa tồn tại. | **Họ Tên:** Nguyễn Văn An<br>**Email:** user.example.com<br>**Mật khẩu:** Abcdef1@ | 1. Nhập Email sai dạng.<br>2. Nhập các trường khác hợp lệ.<br>3. Gửi form. | Đăng ký không thành công do Email không hợp lệ. Message cụ thể chưa được mô tả. | **Pass** / Không có |
| **TC-REG-005** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Trang Đăng ký đã mở.<br>`existing.user@example.com` đã tồn tại. | **Họ Tên:** Nguyễn Văn An<br>**Email:** existing.user@example.com<br>**Mật khẩu:** Abcdef1@ | 1. Nhập Email đã tồn tại.<br>2. Nhập các trường khác hợp lệ.<br>3. Gửi form. | Đăng ký không thành công vì Email không duy nhất. Message cụ thể chưa được mô tả. | **Pass** / Không có |
| **TC-REG-006** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Trang Đăng ký đã mở.<br>Email test chưa tồn tại. | **Họ Tên:** Nguyễn Văn An<br>**Email:** an.nguyen06@example.com<br>**Mật khẩu:** `""` | 1. Để trống Mật khẩu.<br>2. Nhập các trường khác hợp lệ.<br>3. Gửi form. | Đăng ký không thành công do thiếu Mật khẩu. Message cụ thể chưa được mô tả. | **Pass** / Không có |
| **TC-REG-007** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Trang Đăng ký đã mở.<br>Email test chưa tồn tại. | **Họ Tên:** Nguyễn Văn An<br>**Email:** an.nguyen07@example.com<br>**Mật khẩu:** Aa1@abc | 1. Nhập Mật khẩu 7 ký tự nhưng đủ các thành phần ký tự.<br>2. Nhập các trường khác hợp lệ.<br>3. Gửi form. | Đăng ký không thành công do Mật khẩu ngắn hơn 8 ký tự. Message cụ thể chưa được mô tả. | **Pass** / Không có |
| **TC-REG-008** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Trang Đăng ký đã mở.<br>Email test chưa tồn tại. | **Họ Tên:** Nguyễn Văn An<br>**Email:** an.nguyen08@example.com<br>**Mật khẩu:** abcdef1@ | 1. Nhập Mật khẩu không có chữ hoa.<br>2. Nhập các trường khác hợp lệ.<br>3. Gửi form. | Đăng ký không thành công do Mật khẩu thiếu chữ hoa. Message cụ thể chưa được mô tả. | **Pass** / Không có |
| **TC-REG-009** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Trang Đăng ký đã mở.<br>Email test chưa tồn tại. | **Họ Tên:** Nguyễn Văn An<br>**Email:** an.nguyen09@example.com<br>**Mật khẩu:** ABCDEF1@ | 1. Nhập Mật khẩu không có chữ thường.<br>2. Nhập các trường khác hợp lệ.<br>3. Gửi form. | Đăng ký không thành công do Mật khẩu thiếu chữ thường. Message cụ thể chưa được mô tả. | **Pass** / Không có |
| **TC-REG-010** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Trang Đăng ký đã mở.<br>Email test chưa tồn tại. | **Họ Tên:** Nguyễn Văn An<br>**Email:** an.nguyen10@example.com<br>**Mật khẩu:** Abcdefg@ | 1. Nhập Mật khẩu không có chữ số.<br>2. Nhập các trường khác hợp lệ.<br>3. Gửi form. | Đăng ký không thành công do Mật khẩu thiếu chữ số. Message cụ thể chưa được mô tả. | **Pass** / Không có |
| **TC-REG-011** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Trang Đăng ký đã mở.<br>Email test chưa tồn tại. | **Họ Tên:** Nguyễn Văn An<br>**Email:** an.nguyen11@example.com<br>**Mật khẩu:** Abcdef12 | 1. Nhập Mật khẩu không có ký tự thuộc tập yêu cầu.<br>2. Nhập các trường khác hợp lệ.<br>3. Gửi form. | Đăng ký không thành công do Mật khẩu thiếu ký tự đặc biệt thuộc tập yêu cầu. Message cụ thể chưa được mô tả. | **Pass** / Không có |

---

#### 6. Rút gọn Test Case

- `TC-REG-001` kết hợp toàn bộ Valid EC đầu vào trong một luồng thành công.
- Mỗi test từ `TC-REG-002` đến `TC-REG-011` chỉ chủ động dùng một Invalid EC; các input độc lập còn lại hợp lệ.
- Không hợp nhất các invalid test dù có cùng kết quả, vì mỗi test bao phủ một condition độc lập.
- Condition phụ thuộc không áp dụng nếu condition tiền đề thất bại: Email rỗng không đồng thời bị tính sai format; Mật khẩu rỗng không đồng thời bị tính thiếu thành phần.
- Sau rút gọn còn 11 test case và vẫn cover đủ 24 EC.

---

#### 7. EC Coverage Matrix

| EC ID | Loại | Test Case cover |
|---|---|---|
| EC01 | Valid | TC-REG-001 |
| EC02 | Invalid | TC-REG-002 |
| EC03 | Valid | TC-REG-001 |
| EC04 | Invalid | TC-REG-003 |
| EC05 | Valid | TC-REG-001 |
| EC06 | Invalid | TC-REG-004 |
| EC07 | Valid | TC-REG-001 |
| EC08 | Invalid | TC-REG-005 |
| EC09 | Valid | TC-REG-001 |
| EC10 | Invalid | TC-REG-006 |
| EC11 | Valid | TC-REG-001 |
| EC12 | Invalid | TC-REG-007 |
| EC13 | Valid | TC-REG-001 |
| EC14 | Invalid | TC-REG-008 |
| EC15 | Valid | TC-REG-001 |
| EC16 | Invalid | TC-REG-009 |
| EC17 | Valid | TC-REG-001 |
| EC18 | Invalid | TC-REG-010 |
| EC19 | Valid | TC-REG-001 |
| EC20 | Invalid | TC-REG-011 |
| EC21 | Valid | TC-REG-001 |
| EC22 | Invalid | TC-REG-001 |
| EC23 | Valid | TC-REG-002, TC-REG-003, TC-REG-004, TC-REG-005, TC-REG-006, TC-REG-007, TC-REG-008, TC-REG-009, TC-REG-010, TC-REG-011 |
| EC24 | Invalid | TC-REG-002, TC-REG-003, TC-REG-004, TC-REG-005, TC-REG-006, TC-REG-007, TC-REG-008, TC-REG-009, TC-REG-010, TC-REG-011 |

**Kết quả:** 24/24 EC được ánh xạ tới ít nhất một test case. EC22 và EC24 là output không tuân thủ; test tương ứng chứa oracle để phát hiện các output này.

---

### Phân tích Boundary Value Analysis

#### Phạm vi

- **Requirement:** FR-01 — Đăng ký tài khoản.
- **Nguồn requirement:** `README.md`, mục `FR-01: Đăng ký tài khoản`.
- **Phạm vi kiểm thử:** Chỉ FR-01; không phân tích hoặc tạo test case cho feature khác.
- **Kỹ thuật:** Boundary Value Analysis (BVA).

#### 1. Input / Output

##### Input

- **Họ Tên:** người dùng phải cung cấp.
- **Email:** người dùng phải cung cấp; phải có định dạng hợp lệ (`user@domain.com`) và duy nhất trong hệ thống.
- **Mật khẩu:** người dùng phải cung cấp; có tối thiểu 8 ký tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt trong nhóm `@`, `$`, `!`, `%`, `*`, `?`, `&`.

##### Output

- **Kết quả đăng ký:** đăng ký được chấp nhận hoặc bị từ chối theo FR-01.
- **Điều hướng sau đăng ký:** đăng ký thành công dẫn người dùng tới trang Đăng nhập.

##### Phân loại khả năng áp dụng BVA

- Áp dụng BVA cho **Mật khẩu** qua 5 đại lượng có thứ tự và giới hạn dưới rõ ràng: tổng độ dài, số chữ hoa, số chữ thường, số chữ số và số ký tự đặc biệt hợp lệ.
- Không áp dụng BVA cho **Họ Tên**: requirement chỉ quy định phải cung cấp, không quy định kiểu dữ liệu hoặc giới hạn độ dài để xác định các giá trị ngay trước, tại và sau boundary độ dài.
- Không áp dụng BVA cho **định dạng Email** và **tính duy nhất của Email**: đây là các điều kiện phân loại; FR-01 không cung cấp miền giá trị có thứ tự với Lower/Upper Boundary.

#### 2. Boundary Value Analysis

##### Boundary Value Analysis cho độ dài Mật khẩu

Miền hợp lệ là **độ dài từ 8 ký tự trở lên**. Mốc quan trọng duy nhất là **Lower Boundary = 8 ký tự**; requirement không mô tả Upper Boundary. Đơn vị bước là **1 ký tự**.

Quanh mốc **8**:

**7, 8, 9**

Vì vậy tập BVA quan trọng là:

**7, 8, 9**

Trong đó:

- **7** kiểm tra trường hợp ngay dưới giới hạn tối thiểu và không hợp lệ.
- **8** kiểm tra đúng tại giới hạn dưới và hợp lệ về độ dài.
- **9** kiểm tra ngay trên giới hạn dưới và hợp lệ về độ dài.

Các mật khẩu kiểm thử độ dài vẫn chứa đủ bốn nhóm ký tự. Tại độ dài 8 và 9, mỗi nhóm có ít nhất 2 ký tự để không nằm sát boundary thành phần. Với độ dài 7, không thể đồng thời có ít nhất 2 ký tự ở cả bốn nhóm; dữ liệu vẫn giữ tất cả rule thành phần hợp lệ và chỉ vi phạm độ dài.

##### Boundary Value Analysis cho số chữ hoa trong Mật khẩu

Miền hợp lệ là **từ 1 chữ hoa trở lên**. Mốc quan trọng duy nhất là **Lower Boundary = 1 chữ hoa**; requirement không mô tả Upper Boundary. Đơn vị bước là **1 chữ hoa**.

Quanh mốc **1**:

**0, 1, 2**

Vì vậy tập BVA quan trọng là:

**0, 1, 2**

Trong đó:

- **0** kiểm tra trường hợp ngay dưới giới hạn và không hợp lệ.
- **1** kiểm tra đúng tại giới hạn dưới và hợp lệ về số chữ hoa.
- **2** kiểm tra ngay trên giới hạn dưới và hợp lệ về số chữ hoa.

##### Boundary Value Analysis cho số chữ thường trong Mật khẩu

Miền hợp lệ là **từ 1 chữ thường trở lên**. Mốc quan trọng duy nhất là **Lower Boundary = 1 chữ thường**; requirement không mô tả Upper Boundary. Đơn vị bước là **1 chữ thường**.

Quanh mốc **1**:

**0, 1, 2**

Vì vậy tập BVA quan trọng là:

**0, 1, 2**

Trong đó:

- **0** kiểm tra trường hợp ngay dưới giới hạn và không hợp lệ.
- **1** kiểm tra đúng tại giới hạn dưới và hợp lệ về số chữ thường.
- **2** kiểm tra ngay trên giới hạn dưới và hợp lệ về số chữ thường.

##### Boundary Value Analysis cho số chữ số trong Mật khẩu

Miền hợp lệ là **từ 1 chữ số trở lên**. Mốc quan trọng duy nhất là **Lower Boundary = 1 chữ số**; requirement không mô tả Upper Boundary. Đơn vị bước là **1 chữ số**.

Quanh mốc **1**:

**0, 1, 2**

Vì vậy tập BVA quan trọng là:

**0, 1, 2**

Trong đó:

- **0** kiểm tra trường hợp ngay dưới giới hạn và không hợp lệ.
- **1** kiểm tra đúng tại giới hạn dưới và hợp lệ về số chữ số.
- **2** kiểm tra ngay trên giới hạn dưới và hợp lệ về số chữ số.

##### Boundary Value Analysis cho số ký tự đặc biệt hợp lệ trong Mật khẩu

Miền hợp lệ là **từ 1 ký tự đặc biệt thuộc nhóm `@`, `$`, `!`, `%`, `*`, `?`, `&` trở lên**. Mốc quan trọng duy nhất là **Lower Boundary = 1 ký tự đặc biệt hợp lệ**; requirement không mô tả Upper Boundary. Đơn vị bước là **1 ký tự đặc biệt hợp lệ**.

Quanh mốc **1**:

**0, 1, 2**

Vì vậy tập BVA quan trọng là:

**0, 1, 2**

Trong đó:

- **0** kiểm tra trường hợp ngay dưới giới hạn và không hợp lệ.
- **1** kiểm tra đúng tại giới hạn dưới và hợp lệ về số ký tự đặc biệt.
- **2** kiểm tra ngay trên giới hạn dưới và hợp lệ về số ký tự đặc biệt.

Các test value chỉ dùng ký tự đặc biệt được FR-01 nêu; báo cáo không suy diễn hành vi đối với ký tự ngoài nhóm này.

#### 3. Boundary Test Values

| Input / Output | Mô tả | Boundary Position | Value | Expected Behavior |
|---|---|---|---:|---|
| Độ dài Mật khẩu | Tổng số ký tự của Mật khẩu | LB-1 | 7 | Invalid — hệ thống từ chối đăng ký vì Mật khẩu dưới 8 ký tự. |
| Độ dài Mật khẩu | Tổng số ký tự của Mật khẩu | LB | 8 | Valid về độ dài. |
| Độ dài Mật khẩu | Tổng số ký tự của Mật khẩu | LB+1 | 9 | Valid về độ dài. |
| Số chữ hoa | Số chữ hoa trong Mật khẩu | LB-1 | 0 | Invalid — hệ thống từ chối vì Mật khẩu thiếu chữ hoa. |
| Số chữ hoa | Số chữ hoa trong Mật khẩu | LB | 1 | Valid về số chữ hoa. |
| Số chữ hoa | Số chữ hoa trong Mật khẩu | LB+1 | 2 | Valid về số chữ hoa. |
| Số chữ thường | Số chữ thường trong Mật khẩu | LB-1 | 0 | Invalid — hệ thống từ chối vì Mật khẩu thiếu chữ thường. |
| Số chữ thường | Số chữ thường trong Mật khẩu | LB | 1 | Valid về số chữ thường. |
| Số chữ thường | Số chữ thường trong Mật khẩu | LB+1 | 2 | Valid về số chữ thường. |
| Số chữ số | Số chữ số trong Mật khẩu | LB-1 | 0 | Invalid — hệ thống từ chối vì Mật khẩu thiếu chữ số. |
| Số chữ số | Số chữ số trong Mật khẩu | LB | 1 | Valid về số chữ số. |
| Số chữ số | Số chữ số trong Mật khẩu | LB+1 | 2 | Valid về số chữ số. |
| Số ký tự đặc biệt hợp lệ | Số ký tự thuộc nhóm được FR-01 nêu | LB-1 | 0 | Invalid — hệ thống từ chối vì Mật khẩu thiếu ký tự đặc biệt hợp lệ. |
| Số ký tự đặc biệt hợp lệ | Số ký tự thuộc nhóm được FR-01 nêu | LB | 1 | Valid về số ký tự đặc biệt. |
| Số ký tự đặc biệt hợp lệ | Số ký tự thuộc nhóm được FR-01 nêu | LB+1 | 2 | Valid về số ký tự đặc biệt. |

#### 4. Valid Representative Values cho các Input khác

| Input | Valid Range / Rule | Giá trị sử dụng | Lý do |
|---|---|---|---|
| Họ Tên | Phải được cung cấp | `Nguyễn Văn An` | Giá trị được cung cấp rõ ràng; không giả định boundary độ dài. |
| Email | Đúng định dạng và duy nhất | `bvaNNN@example.com` | Đúng mẫu requirement nêu; `NNN` được thay bằng số TC và email phải chưa tồn tại. |

Khi kiểm thử số lượng một nhóm ký tự, ba nhóm còn lại có ít nhất 2 ký tự và tổng độ dài là 12 ký tự. Khi kiểm thử độ dài, tất cả bốn nhóm ký tự vẫn hợp lệ.

**Tiền điều kiện chung:** Người dùng đang ở trang Đăng ký; Email của test case chưa tồn tại trong hệ thống. Mỗi test case độc lập; dữ liệu do một test case thành công tạo ra phải được hoàn tác hoặc test case tiếp theo phải dùng email khác.

#### 5. Test Cases
| TC-ID | Requirement ID | Module / TestType / Technique | Preconditions | Test data | Test steps | Expected result | Status / Related bugs |
|---|---|---|---|---|---|---|---|
| **TC-BVA-FR01-001** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Theo tiền điều kiện chung | **Boundary:** Độ dài Mật khẩu = 7 (LB-1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva001@example.com`<br>**Mật khẩu:** `ABcd1!@` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Hệ thống từ chối đăng ký vì Mật khẩu dưới 8 ký tự. | **Pass** / Không có |
| **TC-BVA-FR01-002** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Theo tiền điều kiện chung | **Boundary:** Độ dài Mật khẩu = 8 (LB)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva002@example.com`<br>**Mật khẩu:** `ABcd12!@` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Fail** / `BUG-FR01-REG-VALID-PASSWORD-REJECTED` |
| **TC-BVA-FR01-003** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Theo tiền điều kiện chung | **Boundary:** Độ dài Mật khẩu = 9 (LB+1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva003@example.com`<br>**Mật khẩu:** `ABcde12!@` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Fail** / `BUG-FR01-REG-VALID-PASSWORD-REJECTED` |
| **TC-BVA-FR01-004** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Theo tiền điều kiện chung | **Boundary:** Số chữ hoa = 0 (LB-1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva004@example.com`<br>**Mật khẩu:** `abcdef12!@$%` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Hệ thống từ chối đăng ký vì Mật khẩu thiếu chữ hoa. | **Pass** / Không có |
| **TC-BVA-FR01-005** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Theo tiền điều kiện chung | **Boundary:** Số chữ hoa = 1 (LB)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva005@example.com`<br>**Mật khẩu:** `Abcdefg12!@$` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Fail** / `BUG-FR01-REG-VALID-PASSWORD-REJECTED` |
| **TC-BVA-FR01-006** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Theo tiền điều kiện chung | **Boundary:** Số chữ hoa = 2 (LB+1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva006@example.com`<br>**Mật khẩu:** `ABcdef12!@$%` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Fail** / `BUG-FR01-REG-VALID-PASSWORD-REJECTED` |
| **TC-BVA-FR01-007** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Theo tiền điều kiện chung | **Boundary:** Số chữ thường = 0 (LB-1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva007@example.com`<br>**Mật khẩu:** `ABCDEF12!@$%` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Hệ thống từ chối đăng ký vì Mật khẩu thiếu chữ thường. | **Pass** / Không có |
| **TC-BVA-FR01-008** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Theo tiền điều kiện chung | **Boundary:** Số chữ thường = 1 (LB)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva008@example.com`<br>**Mật khẩu:** `ABCDEa12!@$%` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Fail** / `BUG-FR01-REG-VALID-PASSWORD-REJECTED` |
| **TC-BVA-FR01-009** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Theo tiền điều kiện chung | **Boundary:** Số chữ thường = 2 (LB+1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva009@example.com`<br>**Mật khẩu:** `ABCDab12!@$%` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Fail** / `BUG-FR01-REG-VALID-PASSWORD-REJECTED` |
| **TC-BVA-FR01-010** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Theo tiền điều kiện chung | **Boundary:** Số chữ số = 0 (LB-1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva010@example.com`<br>**Mật khẩu:** `ABcdefgh!@$%` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Hệ thống từ chối đăng ký vì Mật khẩu thiếu chữ số. | **Pass** / Không có |
| **TC-BVA-FR01-011** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Theo tiền điều kiện chung | **Boundary:** Số chữ số = 1 (LB)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva011@example.com`<br>**Mật khẩu:** `ABcdefg1!@$%` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Fail** / `BUG-FR01-REG-VALID-PASSWORD-REJECTED` |
| **TC-BVA-FR01-012** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Theo tiền điều kiện chung | **Boundary:** Số chữ số = 2 (LB+1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva012@example.com`<br>**Mật khẩu:** `ABcdef12!@$%` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Fail** / `BUG-FR01-REG-VALID-PASSWORD-REJECTED` |
| **TC-BVA-FR01-013** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Theo tiền điều kiện chung | **Boundary:** Số ký tự đặc biệt hợp lệ = 0 (LB-1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva013@example.com`<br>**Mật khẩu:** `ABcdefgh1234` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Hệ thống từ chối đăng ký vì Mật khẩu thiếu ký tự đặc biệt hợp lệ. | **Pass** / Không có |
| **TC-BVA-FR01-014** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Theo tiền điều kiện chung | **Boundary:** Số ký tự đặc biệt hợp lệ = 1 (LB)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva014@example.com`<br>**Mật khẩu:** `ABcdefgh123!` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Fail** / `BUG-FR01-REG-VALID-PASSWORD-REJECTED` |
| **TC-BVA-FR01-015** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Theo tiền điều kiện chung | **Boundary:** Số ký tự đặc biệt hợp lệ = 2 (LB+1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva015@example.com`<br>**Mật khẩu:** `ABcdefgh12!@` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Fail** / `BUG-FR01-REG-VALID-PASSWORD-REJECTED` |

#### 6. Boundary Coverage Matrix

| Input / Output | Boundary Position | Boundary Value | Test Case cover |
|---|---|---:|---|
| Độ dài Mật khẩu | LB-1 | 7 | TC-BVA-FR01-001 |
| Độ dài Mật khẩu | LB | 8 | TC-BVA-FR01-002 |
| Độ dài Mật khẩu | LB+1 | 9 | TC-BVA-FR01-003 |
| Số chữ hoa | LB-1 | 0 | TC-BVA-FR01-004 |
| Số chữ hoa | LB | 1 | TC-BVA-FR01-005 |
| Số chữ hoa | LB+1 | 2 | TC-BVA-FR01-006 |
| Số chữ thường | LB-1 | 0 | TC-BVA-FR01-007 |
| Số chữ thường | LB | 1 | TC-BVA-FR01-008 |
| Số chữ thường | LB+1 | 2 | TC-BVA-FR01-009 |
| Số chữ số | LB-1 | 0 | TC-BVA-FR01-010 |
| Số chữ số | LB | 1 | TC-BVA-FR01-011 |
| Số chữ số | LB+1 | 2 | TC-BVA-FR01-012 |
| Số ký tự đặc biệt hợp lệ | LB-1 | 0 | TC-BVA-FR01-013 |
| Số ký tự đặc biệt hợp lệ | LB | 1 | TC-BVA-FR01-014 |
| Số ký tự đặc biệt hợp lệ | LB+1 | 2 | TC-BVA-FR01-015 |

Tất cả Boundary Test Values quan trọng đều có test case cover.



## Feature B FR-07 Giỏ hàng Web

### Kết quả thực thi

| Kỹ thuật | TestCase | Pass | Fail | Blocked |
|---|---:|---:|---:|---:|
| Domain Testing | 9 | 1 | 1 | 7 |
| Boundary Value Analysis | 3 | 0 | 1 | 2 |
| **Tổng** | **12** | **1** | **2** | **9** |

Hai ca Fail cùng xác nhận một lỗi: trạng thái giỏ hàng trống thiếu hình minh họa. Chín test case Blocked vì cần fixture giỏ hàng có số dòng sản phẩm và số lượng xác định trước.

### Phân tích Domain Testing

#### Phạm vi và phân tích requirement

- **Nguồn:** `README.md`, mục `FR-07: Giỏ hàng (Shopping Cart)`.
- **Phạm vi:** Chỉ FR-07; không sử dụng rule của FR-06, FR-08 hoặc feature khác.
- **Rule được trích xuất:**
  1. Giỏ có sản phẩm phải hiển thị các cột `Sản phẩm`, `Đơn giá`, `Số lượng`, `Thành tiền`, `Thao tác`.
  2. Cột Số lượng có nút `+` và `-` để điều chỉnh.
  3. Thêm cùng sản phẩm làm tăng số lượng, không tạo dòng mới.
  4. Xóa sản phẩm phải có dialog xác nhận trước khi thực hiện.
  5. Nút `Tiếp tục mua sắm` đưa người dùng về trang chủ.
  6. Nhãn tổng tiền phải chính xác là `Tổng cộng`, không phải `Tổng tạm tính`.
  7. Giỏ hàng trống phải có hình minh họa và thông báo rõ ràng.
- **Chưa được mô tả trong requirement:** công thức `Thành tiền` và tổng tiền; giới hạn số lượng; bước tăng/giảm; hành vi nút `-` tại số lượng 1; hành vi khi thêm sản phẩm chưa có trong giỏ; nội dung dialog; nội dung chính xác của empty-state message; URL trang chủ; thông báo sau điều chỉnh hoặc xóa.
- FR-07 chủ yếu mô tả trạng thái và output. Invalid EC của output được dùng làm oracle phát hiện hành vi không tuân thủ, không phải input để cố tình làm hệ thống sai.

#### 1. Input / Output

**Input:**

- Trạng thái giỏ: trống hoặc có sản phẩm.
- Sản phẩm được thêm và quan hệ với sản phẩm đã có.
- Số lượng hiện tại; thao tác nhấn `+` hoặc `-`.
- Thao tác Xóa và lựa chọn xác nhận/không xác nhận.
- Thao tác nhấn `Tiếp tục mua sắm`.

**Output:**

- Danh sách có đủ năm cột và điều khiển `+`/`-`.
- Số lượng thay đổi theo thao tác; thêm cùng sản phẩm tăng số lượng mà không tạo dòng mới.
- Dialog xuất hiện trước khi xóa; kết quả xóa phụ thuộc xác nhận.
- Nút tiếp tục mua sắm đưa về trang chủ.
- Nhãn tổng tiền là `Tổng cộng`.
- Empty state có hình minh họa và thông báo rõ ràng.

---

#### 2. Xác định condition

| Condition ID | Input/Output | Điều kiện |
|---|---|---|
| C1 | Trạng thái giỏ | Giỏ trống hoặc có ít nhất một sản phẩm. |
| C2 | Output danh sách | Giỏ có sản phẩm phải có đủ năm cột bắt buộc. |
| C3 | Output điều khiển số lượng | Có cả nút `+` và `-`. |
| C4 | Nút `+` / Output số lượng | Nhấn `+` làm số lượng tăng; mức tăng chưa được quy định. |
| C5 | Nút `-` / Output số lượng | Tại số lượng có thể giảm, nhấn `-` làm số lượng giảm; mức giảm chưa được quy định. |
| C6 | Thêm cùng sản phẩm / Output | Số lượng dòng hiện có tăng và không tạo dòng mới. |
| C7 | Yêu cầu xóa / Output dialog | Dialog phải xuất hiện trước khi sản phẩm bị xóa. |
| C8 | Xác nhận xóa / Output | Xác nhận thì thao tác xóa được thực hiện. |
| C9 | Không xác nhận xóa / Output | Không xác nhận/hủy thì sản phẩm không bị xóa. |
| C10 | Tiếp tục mua sắm / Output | Nhấn nút đưa người dùng về trang chủ. |
| C11 | Output nhãn tổng tiền | Nhãn chính xác là `Tổng cộng`. |
| C12 | Output giỏ trống | Có hình minh họa. |
| C13 | Output giỏ trống | Có thông báo rõ ràng rằng giỏ đang trống. |

---

#### 3. Equivalence Class Table

| EC ID | Input/Output | Equivalence Class | Loại |
|---|---|---|---|
| EC01 | Trạng thái giỏ | C1 — Giỏ không có sản phẩm. | Valid |
| EC02 | Trạng thái giỏ | C1 — Giỏ có ít nhất một sản phẩm. | Valid |
| EC03 | Output danh sách | C2 — Hiển thị đủ, đúng năm cột bắt buộc. | Valid |
| EC04 | Output danh sách | C2 — Thiếu hoặc sai ít nhất một cột bắt buộc. | Invalid |
| EC05 | Output điều khiển | C3 — Có cả nút `+` và `-`. | Valid |
| EC06 | Output điều khiển | C3 — Thiếu ít nhất một trong hai nút. | Invalid |
| EC07 | Output sau nút `+` | C4 — Số lượng sau lớn hơn trước. | Valid |
| EC08 | Output sau nút `+` | C4 — Số lượng không tăng. | Invalid |
| EC09 | Output sau nút `-` | C5 — Với số lượng hiện tại lớn hơn 1, số lượng sau nhỏ hơn trước. | Valid |
| EC10 | Output sau nút `-` | C5 — Với số lượng hiện tại lớn hơn 1, số lượng không giảm. | Invalid |
| EC11 | Output khi thêm cùng sản phẩm | C6 — Số lượng tăng và số dòng không đổi. | Valid |
| EC12 | Output khi thêm cùng sản phẩm | C6 — Tạo thêm dòng trùng sản phẩm. | Invalid |
| EC13 | Output khi thêm cùng sản phẩm | C6 — Không tạo dòng mới nhưng số lượng không tăng. | Invalid |
| EC14 | Output khi yêu cầu xóa | C7 — Dialog xuất hiện, sản phẩm còn nguyên khi chờ quyết định. | Valid |
| EC15 | Output khi yêu cầu xóa | C7 — Thiếu dialog hoặc xóa trước khi xác nhận. | Invalid |
| EC16 | Output sau xác nhận xóa | C8 — Sản phẩm được xóa. | Valid |
| EC17 | Output sau xác nhận xóa | C8 — Sản phẩm vẫn còn. | Invalid |
| EC18 | Output khi không xác nhận | C9 — Sản phẩm vẫn còn. | Valid |
| EC19 | Output khi không xác nhận | C9 — Sản phẩm bị xóa. | Invalid |
| EC20 | Output điều hướng | C10 — Đưa về trang chủ. | Valid |
| EC21 | Output điều hướng | C10 — Không điều hướng hoặc tới trang khác. | Invalid |
| EC22 | Output nhãn tổng tiền | C11 — Hiển thị chính xác `Tổng cộng`. | Valid |
| EC23 | Output nhãn tổng tiền | C11 — Thiếu nhãn hoặc nhãn khác `Tổng cộng`. | Invalid |
| EC24 | Output giỏ trống | C12 — Có hình minh họa. | Valid |
| EC25 | Output giỏ trống | C12 — Không có hình minh họa. | Invalid |
| EC26 | Output giỏ trống | C13 — Có thông báo rõ trạng thái trống. | Valid |
| EC27 | Output giỏ trống | C13 — Thiếu hoặc không rõ thông báo trạng thái trống. | Invalid |

**Kiểm tra phân hoạch:** C1–C13 đều có EC. C1 có hai trạng thái hợp lệ vì FR-07 quy định hành vi cho cả giỏ trống và giỏ có sản phẩm. EC12 và EC13 tách hai kiểu vi phạm không chồng lấn của rule thêm cùng sản phẩm. Các EC output còn lại phân biệt kết quả tuân thủ và không tuân thủ.

---

#### 4. Representative Values

| EC ID | Equivalence Class | Loại | Representative Value |
|---|---|---|---|
| EC01 | Giỏ trống. | Valid | `0` dòng |
| EC02 | Giỏ có sản phẩm. | Valid | Một dòng Sản phẩm A, số lượng `2` |
| EC03 | Đủ năm cột. | Valid | `Sản phẩm`, `Đơn giá`, `Số lượng`, `Thành tiền`, `Thao tác` |
| EC04 | Thiếu/sai cột. | Invalid | Thiếu `Thành tiền` |
| EC05 | Đủ nút điều chỉnh. | Valid | Có `+` và `-` |
| EC06 | Thiếu nút điều chỉnh. | Invalid | Có `+`, thiếu `-` |
| EC07 | Số lượng tăng. | Valid | Trước `2`, sau `> 2` |
| EC08 | Số lượng không tăng. | Invalid | Trước `2`, sau `2` |
| EC09 | Số lượng giảm. | Valid | Trước `2`, sau `< 2` |
| EC10 | Số lượng không giảm. | Invalid | Trước `2`, sau `2` |
| EC11 | Thêm cùng sản phẩm đúng. | Valid | Trước: 1 dòng A, qty 1; sau: 1 dòng A, qty `> 1` |
| EC12 | Tạo dòng trùng. | Invalid | Trước 1 dòng A; sau 2 dòng A |
| EC13 | Không tăng số lượng. | Invalid | Trước và sau: 1 dòng A, qty 1 |
| EC14 | Xác nhận trước xóa. | Valid | Dialog mở; dòng A vẫn còn khi chưa quyết định |
| EC15 | Thiếu xác nhận. | Invalid | Dòng A biến mất ngay, không có dialog |
| EC16 | Xác nhận thì xóa. | Valid | Xác nhận; dòng A không còn |
| EC17 | Xác nhận nhưng không xóa. | Invalid | Xác nhận; dòng A vẫn còn |
| EC18 | Không xác nhận thì giữ. | Valid | Hủy/đóng dialog; dòng A vẫn còn |
| EC19 | Không xác nhận vẫn xóa. | Invalid | Hủy/đóng dialog; dòng A biến mất |
| EC20 | Điều hướng đúng. | Valid | Trang đích là trang chủ |
| EC21 | Điều hướng sai. | Invalid | Vẫn ở giỏ hoặc tới trang khác |
| EC22 | Nhãn đúng. | Valid | `Tổng cộng` |
| EC23 | Nhãn sai. | Invalid | `Tổng tạm tính` |
| EC24 | Có hình empty state. | Valid | Một icon/hình minh họa hiển thị |
| EC25 | Thiếu hình empty state. | Invalid | Không có icon/hình minh họa |
| EC26 | Có message rõ ràng. | Valid | Message thể hiện rõ giỏ hàng đang trống, không yêu cầu câu chữ cụ thể |
| EC27 | Thiếu/không rõ message. | Invalid | Không có message mô tả trạng thái trống |

---

#### 5. Test Cases
Giá và số lượng trong test data chỉ dựng trạng thái dễ tái tạo. Test không khẳng định công thức tiền vì FR-07 không cung cấp.

| TC-ID | Requirement ID | Module / TestType / Technique | Preconditions | Test data | Test steps | Expected result | Status / Related bugs |
| --- | :-- | --- | --- | --- | --- | --- | --- |
| **TC-CART-001** | FR-07 | Giỏ hàng / Functional UI / Equivalence Partitioning | Đang ở trang Giỏ hàng.<br>Giỏ có một dòng Sản phẩm A, số lượng 2. | **Trạng thái:** không trống<br>**Sản phẩm:** A<br>**Số lượng:** 2 | 1. Quan sát danh sách.<br>2. Kiểm tra cột, nút điều chỉnh và nhãn tổng tiền. | Có đủ năm cột bắt buộc, có cả `+`/`-`, nhãn tổng tiền chính xác `Tổng cộng`. | **Blocked** - chưa đủ điều kiện thực thi / Không có. Thiếu precondition hoặc fixture được định danh. |
| **TC-CART-002** | FR-07 | Giỏ hàng / Functional UI / Equivalence Partitioning | Đang ở trang Giỏ hàng.<br>Giỏ không có sản phẩm. | **Số dòng:** 0 | 1. Mở/refresh giỏ trống.<br>2. Quan sát empty state. | Có cả hình minh họa và thông báo rõ rằng giỏ đang trống; không yêu cầu câu chữ cụ thể. | **Fail** / `BUG-FR07-CART-EMPTY-STATE-MISSING-IMAGE` |
| **TC-CART-003** | FR-07 | Giỏ hàng / Functional / Equivalence Partitioning | Giỏ có đúng một dòng A, số lượng 1.<br>Đã ghi nhận số dòng và số lượng. | **Sản phẩm thêm:** A<br>**Quan hệ:** cùng sản phẩm đã có | 1. Thêm lại A.<br>2. Quan sát giỏ.<br>3. So sánh số lượng và số dòng. | Số lượng dòng A tăng, số dòng không đổi, không có dòng A trùng. Mức tăng chưa được quy định. | **Blocked** - chưa đủ điều kiện thực thi / Không có. Thiếu precondition hoặc fixture được định danh. |
| **TC-CART-004** | FR-07 | Giỏ hàng / Functional / Equivalence Partitioning | Giỏ có A với số lượng 2.<br>Nút `+` hiển thị. | **Trước:** 2<br>**Hành động:** nhấn `+` | 1. Ghi số lượng.<br>2. Nhấn `+`.<br>3. Ghi số lượng sau. | Số lượng sau lớn hơn trước; không khẳng định mức tăng. | **Blocked** - chưa đủ điều kiện thực thi / Không có. Thiếu precondition hoặc fixture được định danh. |
| **TC-CART-005** | FR-07 | Giỏ hàng / Functional / Equivalence Partitioning | Giỏ có A với số lượng 2.<br>Nút `-` hiển thị. | **Trước:** 2<br>**Hành động:** nhấn `-` | 1. Ghi số lượng.<br>2. Nhấn `-`.<br>3. Ghi số lượng sau. | Số lượng sau nhỏ hơn trước; không khẳng định mức giảm. | **Blocked** - chưa đủ điều kiện thực thi / Không có. Thiếu precondition hoặc fixture được định danh. |
| **TC-CART-006** | FR-07 | Giỏ hàng / Functional UI / Equivalence Partitioning | Giỏ có Sản phẩm A. | **Hành động:** nhấn Xóa nhưng chưa quyết định | 1. Nhấn Xóa A.<br>2. Chưa xác nhận/hủy.<br>3. Quan sát dialog và dòng A. | Dialog xuất hiện trước khi xóa; A vẫn còn lúc chờ quyết định. Nội dung dialog chưa được quy định. | **Blocked** - chưa đủ điều kiện thực thi / Không có. Thiếu precondition hoặc fixture được định danh. |
| **TC-CART-007** | FR-07 | Giỏ hàng / Functional / Equivalence Partitioning | Giỏ có Sản phẩm A. | **Quyết định:** xác nhận xóa | 1. Nhấn Xóa A.<br>2. Xác nhận.<br>3. Quan sát giỏ. | Sản phẩm A được xóa sau xác nhận. | **Blocked** - chưa đủ điều kiện thực thi / Không có. Thiếu precondition hoặc fixture được định danh. |
| **TC-CART-008** | FR-07 | Giỏ hàng / Functional / Equivalence Partitioning | Giỏ có Sản phẩm A. | **Quyết định:** hủy/không xác nhận | 1. Nhấn Xóa A.<br>2. Hủy hoặc đóng dialog.<br>3. Quan sát giỏ. | Sản phẩm A vẫn còn vì người dùng không xác nhận. | **Blocked** - chưa đủ điều kiện thực thi / Không có. Thiếu precondition hoặc fixture được định danh. |
| **TC-CART-009** | FR-07 | Giỏ hàng / Functional / Equivalence Partitioning | Đang ở trang Giỏ hàng.<br>Nút `Tiếp tục mua sắm` hiển thị. | **Hành động:** nhấn `Tiếp tục mua sắm` | 1. Nhấn nút.<br>2. Quan sát trang đích. | Người dùng được đưa về trang chủ; URL cụ thể chưa được quy định. | **Pass** / Không có |

---

#### 6. Rút gọn Test Case

- `TC-CART-001` kết hợp cấu trúc bảng, điều khiển số lượng và nhãn tổng tiền vì cùng trạng thái giỏ không trống.
- `TC-CART-002` kết hợp hai output của cùng empty state: hình minh họa và message.
- Không gộp `TC-CART-003`–`005` vì các trigger thêm lại, `+`, `-` khác nhau.
- Không gộp `TC-CART-006`–`008` vì kiểm tra ba thời điểm/nhánh riêng của xác nhận xóa.
- Invalid EC đều là output không tuân thủ được phát hiện bằng oracle; FR-07 không định nghĩa invalid-input domain để kết hợp.
- Sau rút gọn còn 9 test case, vẫn cover đủ 27 EC.

---

#### 7. EC Coverage Matrix

| EC ID | Loại | Test Case cover |
|---|---|---|
| EC01 | Valid | TC-CART-002 |
| EC02 | Valid | TC-CART-001 |
| EC03 | Valid | TC-CART-001 |
| EC04 | Invalid | TC-CART-001 |
| EC05 | Valid | TC-CART-001 |
| EC06 | Invalid | TC-CART-001 |
| EC07 | Valid | TC-CART-004 |
| EC08 | Invalid | TC-CART-004 |
| EC09 | Valid | TC-CART-005 |
| EC10 | Invalid | TC-CART-005 |
| EC11 | Valid | TC-CART-003 |
| EC12 | Invalid | TC-CART-003 |
| EC13 | Invalid | TC-CART-003 |
| EC14 | Valid | TC-CART-006 |
| EC15 | Invalid | TC-CART-006 |
| EC16 | Valid | TC-CART-007 |
| EC17 | Invalid | TC-CART-007 |
| EC18 | Valid | TC-CART-008 |
| EC19 | Invalid | TC-CART-008 |
| EC20 | Valid | TC-CART-009 |
| EC21 | Invalid | TC-CART-009 |
| EC22 | Valid | TC-CART-001 |
| EC23 | Invalid | TC-CART-001 |
| EC24 | Valid | TC-CART-002 |
| EC25 | Invalid | TC-CART-002 |
| EC26 | Valid | TC-CART-002 |
| EC27 | Invalid | TC-CART-002 |

**Kết quả:** 27/27 EC được ánh xạ tới ít nhất một test case; không có EC chưa được cover.

---

### Phân tích Boundary Value Analysis

#### Phạm vi

- **Requirement:** FR-07 — Giỏ hàng (Shopping Cart).
- **Nguồn requirement:** `README.md`, mục `FR-07: Giỏ hàng (Shopping Cart)`.
- **Phạm vi kiểm thử:** Chỉ FR-07; không phân tích hoặc tạo test case cho feature khác.
- **Kỹ thuật:** Boundary Value Analysis (BVA).

#### 1. Input / Output

##### Input / trạng thái đầu vào

- **Nội dung giỏ hàng:** tập sản phẩm trong giỏ và số lượng của từng sản phẩm; số dòng sản phẩm phân biệt quyết định giỏ trống hay không trống.
- **Sản phẩm được thêm:** có thể trùng với sản phẩm đã có trong giỏ.
- **Thao tác điều chỉnh số lượng:** nút `+` hoặc `-`.
- **Thao tác xóa sản phẩm và xác nhận:** người dùng yêu cầu xóa và tương tác với dialog xác nhận.
- **Thao tác Tiếp tục mua sắm:** người dùng chọn quay về trang chủ.

##### Output

- **Danh sách sản phẩm:** hiển thị các cột Sản phẩm, Đơn giá, Số lượng (có nút `+/-`), Thành tiền và Thao tác.
- **Kết quả thêm sản phẩm trùng:** tăng số lượng, không tạo dòng mới.
- **Dialog xác nhận:** xuất hiện trước khi xóa sản phẩm.
- **Điều hướng:** nút Tiếp tục mua sắm đưa người dùng về trang chủ.
- **Nhãn tổng tiền:** hiển thị chính xác là “Tổng cộng”.
- **Empty state:** khi giỏ hàng trống, hiển thị hình minh họa và thông báo rõ ràng.

##### Phân loại khả năng áp dụng BVA

- Áp dụng BVA cho **số dòng sản phẩm phân biệt trong giỏ hàng**. FR-07 mô tả behavior khác nhau giữa giỏ trống và giỏ có sản phẩm, nên có transition boundary tại dòng sản phẩm đầu tiên.
- Không áp dụng BVA cho **số lượng của từng sản phẩm** hoặc nút `+/-`: FR-07 không quy định minimum, maximum hoặc behavior tại một ngưỡng số lượng cụ thể.
- Không áp dụng BVA cho quan hệ **sản phẩm trùng/không trùng**, xác nhận xóa, điều hướng và nội dung nhãn vì đây là các condition/hành vi phân loại, không có miền giá trị có thứ tự với boundary được mô tả.
- Không áp dụng BVA cho Đơn giá, Thành tiền hoặc Tổng tiền vì FR-07 không quy định miền giá trị, công thức hoặc precision để xác định boundary.

#### 2. Boundary Value Analysis

##### Boundary Value Analysis cho số dòng sản phẩm phân biệt trong giỏ hàng

Số dòng sản phẩm phân biệt là số đếm nguyên không âm. Từ FR-07, có hai miền behavior:

- **0 dòng:** giỏ hàng trống; phải hiển thị hình minh họa và thông báo rõ ràng.
- **Từ 1 dòng trở lên:** giỏ hàng có sản phẩm; hiển thị danh sách sản phẩm với các cột được yêu cầu.

Mốc quan trọng là **Lower Boundary = 1 dòng**, tức dòng đầu tiên làm trạng thái chuyển từ giỏ trống sang giỏ có sản phẩm. FR-07 không mô tả Upper Boundary. Đơn vị bước là **1 dòng sản phẩm phân biệt**.

Quanh mốc **1**:

**0, 1, 2**

Vì vậy tập BVA quan trọng là:

**0, 1, 2**

Trong đó:

- **0** là giá trị ngay trước boundary, kiểm tra trạng thái giỏ trống.
- **1** kiểm tra đúng tại boundary, tức giỏ vừa có dòng sản phẩm đầu tiên.
- **2** kiểm tra ngay trên boundary, xác nhận giỏ có nhiều hơn một dòng vẫn hiển thị danh sách sản phẩm.

Giá trị **0** là trạng thái hợp lệ, không phải dữ liệu invalid. Báo cáo không tạo `-1` vì số dòng âm không phải trạng thái giỏ hàng có thể thiết lập và không được FR-07 mô tả.

#### 3. Boundary Test Values

| Input / Output | Mô tả | Boundary Position | Value | Expected Behavior |
|---|---|---|---:|---|
| Số dòng sản phẩm phân biệt | Số dòng sản phẩm hiện có trong giỏ | LB-1 | 0 | Valid empty state — hiển thị hình minh họa và thông báo rõ ràng. |
| Số dòng sản phẩm phân biệt | Số dòng sản phẩm hiện có trong giỏ | LB | 1 | Valid non-empty state — hiển thị danh sách 1 sản phẩm với các cột FR-07 yêu cầu. |
| Số dòng sản phẩm phân biệt | Số dòng sản phẩm hiện có trong giỏ | LB+1 | 2 | Valid non-empty state — hiển thị danh sách 2 sản phẩm với các cột FR-07 yêu cầu. |

#### 4. Valid Representative Values cho các Input khác

| Input | Valid Range / Rule | Giá trị sử dụng | Lý do |
|---|---|---|---|
| Sản phẩm trong từng dòng | Sản phẩm có thể xuất hiện trong giỏ | Sản phẩm A; thêm Sản phẩm B ở test có 2 dòng | Hai sản phẩm phân biệt thiết lập đúng số dòng mà không kích hoạt rule gộp sản phẩm trùng. |
| Số lượng từng sản phẩm | FR-07 chưa mô tả giới hạn | Giữ nguyên số lượng đã được fixture thiết lập | Không tự giả định min/max; số lượng không phải biến đang kiểm thử. |
| Thao tác `+/-` | Có nút để điều chỉnh số lượng | Không thao tác | Cô lập boundary số dòng sản phẩm. |
| Xóa sản phẩm | Có dialog xác nhận trước khi xóa | Không thao tác | Tránh thay đổi số dòng trong khi quan sát state biên. |
| Tiếp tục mua sắm | Quay về trang chủ | Không thao tác | Không rời trang Giỏ hàng trong khi quan sát kết quả. |

**Tiền điều kiện chung:** hệ thống có ít nhất hai sản phẩm phân biệt có thể dùng để thiết lập giỏ hàng; người dùng có thể mở trang Giỏ hàng. Mỗi test case độc lập và giỏ hàng phải được đưa về đúng số dòng nêu trong test data trước khi kiểm tra.

#### 5. Test Cases
| TC-ID | Requirement ID | Module / TestType / Technique | Preconditions | Test data | Test steps | Expected result | Status / Related bugs |
|---|---|---|---|---|---|---|---|
| **TC-BVA-FR07-001** | FR-07 | Giỏ hàng / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; giỏ hàng không có sản phẩm | **Boundary:** Số dòng sản phẩm phân biệt = 0 (LB-1) | 1. Thiết lập giỏ hàng có 0 dòng sản phẩm.<br>2. Mở trang Giỏ hàng.<br>3. Quan sát nội dung hiển thị. | Giỏ hàng hiển thị hình minh họa và thông báo rõ ràng cho trạng thái trống. | **Fail** / `BUG-FR07-CART-EMPTY-STATE-MISSING-IMAGE` |
| **TC-BVA-FR07-002** | FR-07 | Giỏ hàng / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; giỏ hàng có Sản phẩm A | **Boundary:** Số dòng sản phẩm phân biệt = 1 (LB)<br>**Dữ liệu:** 1 dòng Sản phẩm A | 1. Thiết lập giỏ hàng có đúng 1 dòng sản phẩm.<br>2. Mở trang Giỏ hàng.<br>3. Quan sát danh sách và các cột. | Danh sách hiển thị 1 dòng sản phẩm và có các cột Sản phẩm, Đơn giá, Số lượng (có nút `+/-`), Thành tiền, Thao tác. | **Blocked** - chưa đủ điều kiện thực thi / Không có. Thiếu precondition hoặc fixture được định danh. |
| **TC-BVA-FR07-003** | FR-07 | Giỏ hàng / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; giỏ hàng có Sản phẩm A và B phân biệt | **Boundary:** Số dòng sản phẩm phân biệt = 2 (LB+1)<br>**Dữ liệu:** 2 dòng sản phẩm phân biệt | 1. Thiết lập giỏ hàng có đúng 2 dòng sản phẩm phân biệt.<br>2. Mở trang Giỏ hàng.<br>3. Quan sát danh sách và các cột. | Danh sách hiển thị 2 dòng sản phẩm và có các cột Sản phẩm, Đơn giá, Số lượng (có nút `+/-`), Thành tiền, Thao tác. | **Blocked** - chưa đủ điều kiện thực thi / Không có. Thiếu precondition hoặc fixture được định danh. |

#### 6. Boundary Coverage Matrix

| Input / Output | Boundary Position | Boundary Value | Test Case cover |
|---|---|---:|---|
| Số dòng sản phẩm phân biệt | LB-1 | 0 | TC-BVA-FR07-001 |
| Số dòng sản phẩm phân biệt | LB | 1 | TC-BVA-FR07-002 |
| Số dòng sản phẩm phân biệt | LB+1 | 2 | TC-BVA-FR07-003 |

Tất cả Boundary Test Values quan trọng đều có test case cover.


## Feature C FR-17 Quản lý mã giảm giá Web Admin

### Kết quả thực thi

| Kỹ thuật | Thiết kế | Pass | Fail | Blocked |
|---|---:|---:|---:|---:|
| Domain Testing | 15 | 7 | 6 | 2 |
| Boundary Value Analysis | 5 | 4 | 1 | 0 |
| **Tổng** | **20** | **11** | **7** | **2** |

Sáu lỗi độc lập được ghi nhận ở validation `type`, `discount_value`, `min_order_amount` và `max_uses_per_user`. Hai test Xem và Xóa chưa chạy vì thiếu coupon fixture có định danh ổn định.

### Phân tích Domain Testing

#### Phạm vi và phân tích requirement

- **Nguồn:** `README.md`, mục `FR-17: Quản lý Mã Giảm Giá (Coupon CRUD)`.
- **Phạm vi:** Chỉ FR-17; không dùng rule từ FR-09, FR-12 hoặc feature khác.
- **Rule được trích xuất:** Admin có thể Thêm, Xem, Xóa mã giảm giá; `code` bắt buộc và duy nhất; `type` bắt buộc, thuộc `{percent, fixed}`; `discount_value` bắt buộc và `> 0`; `expired_at` bắt buộc; `min_order_amount` bắt buộc và `>= 0`; `max_uses_per_user` bắt buộc và `>= 1`.
- **Chưa được mô tả trong requirement:** format/độ dài/case sensitivity của `code`; kiểu số nguyên hoặc thập phân; đơn vị tiền; giới hạn trên; giới hạn phần trăm; format và quan hệ của `expired_at` với ngày hiện tại; nội dung message; cách hiển thị chức năng Xem; xác nhận trước khi Xóa; xử lý mã đang được dùng; chức năng Sửa.
- Admin là precondition của FR-17. Phân hoạch quyền non-admin thuộc FR-12 nên không được thêm vào.

#### 1. Input / Output

**Input:**

- Thao tác: Thêm, Xem hoặc Xóa.
- Khi Thêm: `code`, trạng thái tồn tại của `code`, `type`, `discount_value`, `expired_at`, `min_order_amount`, `max_uses_per_user`.
- Khi Xóa: mã giảm giá đích đang tồn tại.

**Output:**

- Dữ liệu hợp lệ: mã giảm giá được tạo.
- Dữ liệu không hợp lệ: thao tác tạo bị từ chối.
- Xem: Admin xem được mã giảm giá.
- Xóa: mã đích được xóa.
- Message, status code, cách trình bày và bước xác nhận xóa chưa được mô tả.

##### Quy ước dữ liệu và đường kiểm thử cho automation

Tên field chuẩn trong report/testcase là `code`, `type`, `discount_value`, `expired_at`, `min_order_amount`, `max_uses_per_user`. Khi kiểm UI, các field này được ánh xạ tới placeholder/select tiếng Việt đã xác minh từ source; `type` dùng value kỹ thuật `percent`/`fixed`, tương ứng UI `Phần trăm (%)`/`Số tiền cố định (₫)`.

| Field | UI đã xác minh | Giá trị/dạng dùng trong automation |
|---|---|---|
| `code` | `Mã coupon (VD: SAVE10)` | Chuỗi code cố định của từng TC |
| `type` | select `Phần trăm (%)` / `Số tiền cố định (₫)` | `percent` / `fixed` |
| `discount_value` | `Giá trị % (VD: 10)` hoặc `Số tiền (VD: 50000)` | số |
| `min_order_amount` | `Đơn tối thiểu (₫)` | số |
| `expired_at` | `Ngày hết hạn` | `YYYY-MM-DD` |
| `max_uses_per_user` | `Số lần dùng tối đa/người` | số |

Các TC kiểm `type` rỗng hoặc ngoài tập không thể nhập trung thực qua select UI. Chúng là API-level Domain Test: gửi `POST /api/admin/coupons` với token Admin, body đầy đủ dữ liệu nền cố định và chỉ thay `type` theo Test data. Các TC còn lại kiểm qua UI trừ khi testcase nêu rõ API.

Mọi `code` tạo mới là giá trị cố định theo TC-ID. Precondition phải xác minh code chưa tồn tại; testcase tạo thành công phải cleanup đúng code đó. Nếu không thỏa, ghi Blocked thay vì sinh code động hoặc thay Test data.

Các giá trị “dữ liệu nền hợp lệ” trong bảng phân hoạch được cụ thể hóa khi thực thi là `type: fixed`, `discount_value: 10`, `expired_at: 2099-12-31`, `min_order_amount: 100000`, `max_uses_per_user: 2`, trừ đúng field đang kiểm thử. Contract này là nguồn Test data thực thi và thay thế mọi cụm “Khác: dữ liệu nền hợp lệ” trong bảng testcase bên dưới. Contract cụ thể theo TC là:

| TC-ID | `code` | Field cố ý khác dữ liệu nền | Kênh |
|---|---|---|---|
| TC-COUPON-001 | `EP_PERCENT_NEW` | `type: percent`, `discount_value: 10`, `expired_at: 2027-12-31`, `min_order_amount: 100000`, `max_uses_per_user: 2` | UI |
| TC-COUPON-002 | `EP_FIXED_NEW` | `type: fixed`, `discount_value: 50000`, `expired_at: 2027-12-31`, `min_order_amount: 100000`, `max_uses_per_user: 2` | UI |
| TC-COUPON-003 | `""` | `code` rỗng | UI |
| TC-COUPON-004 | `EP_COUPON_EXISTING` | code đã tồn tại | UI |
| TC-COUPON-005 | `EP_TYPE_EMPTY` | `type: ""` | API |
| TC-COUPON-006 | `EP_TYPE_OTHER` | `type: other` | API |
| TC-COUPON-007 | `EP_DISCOUNT_EMPTY` | `discount_value` không cung cấp | UI |
| TC-COUPON-008 | `EP_DISCOUNT_NEG` | `discount_value: -10` | UI |
| TC-COUPON-009 | `EP_EXPIRED_EMPTY` | `expired_at` không cung cấp | UI |
| TC-COUPON-010 | `EP_MIN_EMPTY` | `min_order_amount` không cung cấp | UI |
| TC-COUPON-011 | `EP_MIN_NEG` | `min_order_amount: -1000` | UI |
| TC-COUPON-012 | `EP_MAX_EMPTY` | `max_uses_per_user` không cung cấp | UI |
| TC-COUPON-013 | `EP_MAX_ZERO` | `max_uses_per_user: 0` | UI |
| TC-COUPON-014 | `EP_COUPON_VIEW` | coupon tồn tại để xem | UI |
| TC-COUPON-015 | `EP_COUPON_DELETE` | coupon tồn tại để xóa | UI |

---

#### 2. Xác định condition

| Condition ID | Input/Output | Điều kiện |
|---|---|---|
| C1 | `code` | Phải được cung cấp. |
| C2 | `code` / Trạng thái hệ thống | Với `code` không rỗng, phải chưa tồn tại. |
| C3 | `type` | Phải được cung cấp. |
| C4 | `type` | Với `type` không rỗng, phải thuộc `{percent, fixed}`. |
| C5 | `discount_value` | Phải được cung cấp. |
| C6 | `discount_value` | Với giá trị số đã cung cấp, phải `> 0`. |
| C7 | `expired_at` | Phải được cung cấp; không có rule khác trong FR-17. |
| C8 | `min_order_amount` | Phải được cung cấp. |
| C9 | `min_order_amount` | Với giá trị số đã cung cấp, phải `>= 0`. |
| C10 | `max_uses_per_user` | Phải được cung cấp. |
| C11 | `max_uses_per_user` | Với giá trị số đã cung cấp, phải `>= 1`. |
| C12 | Thao tác | Admin có thể Thêm, Xem hoặc Xóa; không có Sửa trong FR-17. |
| C13 | Output Thêm — dữ liệu hợp lệ | Mã giảm giá được tạo. |
| C14 | Output Thêm — dữ liệu không hợp lệ | Thao tác tạo bị từ chối. |
| C15 | Output Xem | Admin xem được mã giảm giá. |
| C16 | Output Xóa | Mã giảm giá đích được xóa. |

---

#### 3. Equivalence Class Table

| EC ID | Input/Output | Equivalence Class | Loại |
|---|---|---|---|
| EC01 | `code` | C1 — Không rỗng. | Valid |
| EC02 | `code` | C1 — Rỗng/không cung cấp. | Invalid |
| EC03 | `code` / Trạng thái | C2 — Không rỗng và chưa tồn tại. | Valid |
| EC04 | `code` / Trạng thái | C2 — Không rỗng nhưng đã tồn tại. | Invalid |
| EC05 | `type` | C3 — Không rỗng. | Valid |
| EC06 | `type` | C3 — Rỗng/không cung cấp. | Invalid |
| EC07 | `type` | C4 — `percent`. | Valid |
| EC08 | `type` | C4 — `fixed`. | Valid |
| EC09 | `type` | C4 — Không rỗng, ngoài `{percent, fixed}`. | Invalid |
| EC10 | `discount_value` | C5 — Được cung cấp. | Valid |
| EC11 | `discount_value` | C5 — Rỗng/không cung cấp. | Invalid |
| EC12 | `discount_value` | C6 — `> 0`. | Valid |
| EC13 | `discount_value` | C6 — `<= 0`. | Invalid |
| EC14 | `expired_at` | C7 — Được cung cấp. | Valid |
| EC15 | `expired_at` | C7 — Rỗng/không cung cấp. | Invalid |
| EC16 | `min_order_amount` | C8 — Được cung cấp. | Valid |
| EC17 | `min_order_amount` | C8 — Rỗng/không cung cấp. | Invalid |
| EC18 | `min_order_amount` | C9 — `>= 0`. | Valid |
| EC19 | `min_order_amount` | C9 — `< 0`. | Invalid |
| EC20 | `max_uses_per_user` | C10 — Được cung cấp. | Valid |
| EC21 | `max_uses_per_user` | C10 — Rỗng/không cung cấp. | Invalid |
| EC22 | `max_uses_per_user` | C11 — `>= 1`. | Valid |
| EC23 | `max_uses_per_user` | C11 — `< 1`. | Invalid |
| EC24 | Thao tác | C12 — Thêm. | Valid |
| EC25 | Thao tác | C12 — Xem. | Valid |
| EC26 | Thao tác | C12 — Xóa. | Valid |
| EC27 | Output Thêm hợp lệ | C13 — Mã được tạo. | Valid |
| EC28 | Output Thêm hợp lệ | C13 — Mã không được tạo dù dữ liệu hợp lệ. | Invalid |
| EC29 | Output Thêm không hợp lệ | C14 — Tạo bị từ chối. | Valid |
| EC30 | Output Thêm không hợp lệ | C14 — Mã vẫn được tạo. | Invalid |
| EC31 | Output Xem | C15 — Xem được mã. | Valid |
| EC32 | Output Xem | C15 — Không xem được mã đang tồn tại. | Invalid |
| EC33 | Output Xóa | C16 — Mã đích được xóa. | Valid |
| EC34 | Output Xóa | C16 — Mã đích vẫn tồn tại. | Invalid |

**Kiểm tra phân hoạch:** C1–C11 tách required khỏi uniqueness/tập/khoảng. Condition miền chỉ áp dụng sau condition bắt buộc để input rỗng không đồng thời thuộc nhiều Invalid EC. `percent` và `fixed` được giữ thành hai EC để kiểm thử đủ tập giá trị. Update không được tạo EC vì ngoài FR-17. C13–C16 bao phủ output đúng/sai.

---

#### 4. Representative Values

| EC ID | Equivalence Class | Loại | Representative Value |
|---|---|---|---|
| EC01 | `code` không rỗng. | Valid | `EP_COUPON_NEW` |
| EC02 | `code` rỗng. | Invalid | `""` |
| EC03 | `code` chưa tồn tại. | Valid | `EP_COUPON_NEW` chưa có trong hệ thống |
| EC04 | `code` đã tồn tại. | Invalid | `EP_COUPON_EXISTING` đã có |
| EC05 | `type` không rỗng. | Valid | `percent` |
| EC06 | `type` rỗng. | Invalid | `""` |
| EC07 | `type = percent`. | Valid | `percent` |
| EC08 | `type = fixed`. | Valid | `fixed` |
| EC09 | `type` ngoài tập. | Invalid | `other` |
| EC10 | `discount_value` có giá trị. | Valid | `10` |
| EC11 | `discount_value` thiếu. | Invalid | Không cung cấp |
| EC12 | `discount_value > 0`. | Valid | `10` |
| EC13 | `discount_value <= 0`. | Invalid | `-10` |
| EC14 | `expired_at` có giá trị. | Valid | `2027-12-31` — chỉ đại diện cho giá trị không rỗng, không suy ra rule ngày tương lai |
| EC15 | `expired_at` thiếu. | Invalid | Không cung cấp |
| EC16 | `min_order_amount` có giá trị. | Valid | `100000` |
| EC17 | `min_order_amount` thiếu. | Invalid | Không cung cấp |
| EC18 | `min_order_amount >= 0`. | Valid | `100000` |
| EC19 | `min_order_amount < 0`. | Invalid | `-1000` |
| EC20 | `max_uses_per_user` có giá trị. | Valid | `2` |
| EC21 | `max_uses_per_user` thiếu. | Invalid | Không cung cấp |
| EC22 | `max_uses_per_user >= 1`. | Valid | `2` |
| EC23 | `max_uses_per_user < 1`. | Invalid | `0` |
| EC24 | Thêm. | Valid | Chọn Thêm |
| EC25 | Xem. | Valid | Mở chức năng Xem |
| EC26 | Xóa. | Valid | Xóa `EP_COUPON_DELETE` |
| EC27 | Tạo hợp lệ thành công. | Valid | Mã mới tồn tại |
| EC28 | Tạo hợp lệ thất bại. | Invalid | Mã mới không tồn tại |
| EC29 | Từ chối dữ liệu sai. | Valid | Mã mới không được tạo |
| EC30 | Chấp nhận dữ liệu sai. | Invalid | Mã mới vẫn được tạo |
| EC31 | Xem thành công. | Valid | `EP_COUPON_VIEW` xuất hiện |
| EC32 | Xem thất bại. | Invalid | Mã tồn tại nhưng không xem được |
| EC33 | Xóa thành công. | Valid | `EP_COUPON_DELETE` không còn |
| EC34 | Xóa thất bại. | Invalid | `EP_COUPON_DELETE` vẫn còn |

---

#### 5. Test Cases
**Dữ liệu nền hợp lệ:** `code` chưa tồn tại; `type=percent`; `discount_value=10`; `expired_at=2027-12-31` (chỉ kiểm tra không rỗng); `min_order_amount=100000`; `max_uses_per_user=2`. Mỗi test dùng fixture độc lập hoặc khôi phục dữ liệu.

| TC-ID | Requirement ID | Module / TestType / Technique | Preconditions | Test data | Test steps | Expected result | Status / Related bugs |
| --- | :-- | --- | --- | --- | --- | --- | --- |
| **TC-COUPON-001** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm.<br>`EP_PERCENT_NEW` chưa tồn tại. | **code:** EP_PERCENT_NEW<br>**type:** percent<br>**discount_value:** 10<br>**expired_at:** 2027-12-31<br>**min_order_amount:** 100000<br>**max_uses_per_user:** 2 | 1. Nhập dữ liệu.<br>2. Thêm.<br>3. Kiểm tra mã mới. | Mã loại `percent` được tạo. Message cụ thể chưa được mô tả. | **Pass** / Không có |
| **TC-COUPON-002** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm.<br>`EP_FIXED_NEW` chưa tồn tại. | **code:** EP_FIXED_NEW<br>**type:** fixed<br>**discount_value:** 50000<br>**expired_at:** 2027-12-31<br>**min_order_amount:** 100000<br>**max_uses_per_user:** 2 | 1. Nhập dữ liệu.<br>2. Thêm.<br>3. Kiểm tra mã mới. | Mã loại `fixed` được tạo. Message cụ thể chưa được mô tả. | **Pass** / Không có |
| **TC-COUPON-003** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm. | **code:** `""`<br>**Khác:** dữ liệu nền hợp lệ | 1. Để trống `code`.<br>2. Nhập trường khác hợp lệ.<br>3. Thêm. | Từ chối tạo vì thiếu `code`; không khẳng định message. | **Pass** / Không có |
| **TC-COUPON-004** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm.<br>`EP_COUPON_EXISTING` đã tồn tại. | **code:** EP_COUPON_EXISTING<br>**Khác:** dữ liệu nền hợp lệ | 1. Nhập code đã tồn tại.<br>2. Nhập trường khác hợp lệ.<br>3. Thêm. | Từ chối tạo vì `code` không duy nhất; không khẳng định message. | **Pass** / Không có |
| **TC-COUPON-005** | FR-17 | Coupon / Functional / Equivalence Partitioning | Có token Admin hợp lệ.<br>`EP_TYPE_EMPTY` chưa tồn tại. | Theo contract TC-COUPON-005; **type:** `""` | 1. Gửi `POST /api/admin/coupons` với body đúng contract và `type` rỗng. | Từ chối tạo vì thiếu `type`; không khẳng định message. | **Fail** / `BUG-FR17-COUPON-MISSING-TYPE-ACCEPTED` |
| **TC-COUPON-006** | FR-17 | Coupon / Functional / Equivalence Partitioning | Có token Admin hợp lệ.<br>`EP_TYPE_OTHER` chưa tồn tại. | Theo contract TC-COUPON-006; **type:** `other` | 1. Gửi `POST /api/admin/coupons` với body đúng contract và `type: other`. | Từ chối tạo vì `type` không hợp lệ; không khẳng định message. | **Fail** / `BUG-FR17-COUPON-INVALID-TYPE-ACCEPTED` |
| **TC-COUPON-007** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm.<br>Code test chưa tồn tại. | **discount_value:** không cung cấp<br>**Khác:** dữ liệu nền hợp lệ | 1. Để trống `discount_value`.<br>2. Nhập trường khác hợp lệ.<br>3. Thêm. | Từ chối tạo vì thiếu `discount_value`; không khẳng định message. | **Pass** / Không có |
| **TC-COUPON-008** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm.<br>Code test chưa tồn tại. | **discount_value:** -10<br>**Khác:** dữ liệu nền hợp lệ | 1. Nhập giá trị `<=0`.<br>2. Nhập trường khác hợp lệ.<br>3. Thêm. | Từ chối tạo vì `discount_value` không dương. | **Fail** / `BUG-FR17-COUPON-NONPOSITIVE-DISCOUNT-ACCEPTED` |
| **TC-COUPON-009** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm.<br>Code test chưa tồn tại. | **expired_at:** không cung cấp<br>**Khác:** dữ liệu nền hợp lệ | 1. Để trống `expired_at`.<br>2. Nhập trường khác hợp lệ.<br>3. Thêm. | Từ chối tạo vì thiếu `expired_at`; không khẳng định format/message. | **Pass** / Không có |
| **TC-COUPON-010** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm.<br>Code test chưa tồn tại. | **min_order_amount:** không cung cấp<br>**Khác:** dữ liệu nền hợp lệ | 1. Để trống trường.<br>2. Nhập trường khác hợp lệ.<br>3. Thêm. | Từ chối tạo vì thiếu `min_order_amount`. | **Fail** / `BUG-FR17-COUPON-MISSING-MIN-ORDER-AMOUNT-ACCEPTED` |
| **TC-COUPON-011** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm.<br>Code test chưa tồn tại. | **min_order_amount:** -1000<br>**Khác:** dữ liệu nền hợp lệ | 1. Nhập giá trị `<0`.<br>2. Nhập trường khác hợp lệ.<br>3. Thêm. | Từ chối tạo vì `min_order_amount < 0`. | **Fail** / `BUG-FR17-COUPON-INVALID-MIN-ORDER-AMOUNT-ACCEPTED` |
| **TC-COUPON-012** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm.<br>Code test chưa tồn tại. | **max_uses_per_user:** không cung cấp<br>**Khác:** dữ liệu nền hợp lệ | 1. Để trống trường.<br>2. Nhập trường khác hợp lệ.<br>3. Thêm. | Từ chối tạo vì thiếu `max_uses_per_user`. | **Fail** / `BUG-FR17-COUPON-MISSING-MAX-USES-ACCEPTED` |
| **TC-COUPON-013** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Thêm.<br>Code test chưa tồn tại. | **max_uses_per_user:** 0<br>**Khác:** dữ liệu nền hợp lệ | 1. Nhập giá trị `<1`.<br>2. Nhập trường khác hợp lệ.<br>3. Thêm. | Từ chối tạo vì `max_uses_per_user < 1`. | **Pass** / Không có |
| **TC-COUPON-014** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Xem.<br>`EP_COUPON_VIEW` tồn tại. | **Thao tác:** Xem<br>**Mã:** EP_COUPON_VIEW | 1. Mở chức năng Xem.<br>2. Tìm/quan sát mã hiện có. | Admin xem được mã; FR-17 không quy định danh sách/chi tiết hoặc cột hiển thị. | **Blocked** - chưa đủ điều kiện thực thi / Không có. Thiếu precondition hoặc fixture được định danh. |
| **TC-COUPON-015** | FR-17 | Coupon / Functional / Equivalence Partitioning | Admin ở chức năng Xóa.<br>`EP_COUPON_DELETE` tồn tại. | **Thao tác:** Xóa<br>**Mã:** EP_COUPON_DELETE | 1. Chọn Xóa mã.<br>2. Thực hiện theo UI/API hiện có.<br>3. Kiểm tra sự tồn tại. | Mã đích được xóa; FR-17 không quy định dialog/message. | **Blocked** - chưa đủ điều kiện thực thi / Không có. Thiếu precondition hoặc fixture được định danh. |

---

#### 6. Rút gọn Test Case

- `TC-COUPON-001` kết hợp các Valid EC với `type=percent`; `TC-COUPON-002` được giữ để cover `type=fixed`.
- `TC-COUPON-003`–`013` mỗi test chỉ chủ động dùng một Invalid EC; trường khác hợp lệ, condition phụ thuộc không áp dụng khi trường bắt buộc rỗng.
- Không gộp invalid test dù cùng kết quả từ chối vì mỗi test cover một condition độc lập.
- Xem và Xóa được giữ riêng do khác trigger/output.
- Sau rút gọn còn 15 test case, cover đủ 34 EC.

---

#### 7. EC Coverage Matrix

| EC ID | Loại | Test Case cover |
|---|---|---|
| EC01 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC02 | Invalid | TC-COUPON-003 |
| EC03 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC04 | Invalid | TC-COUPON-004 |
| EC05 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC06 | Invalid | TC-COUPON-005 |
| EC07 | Valid | TC-COUPON-001 |
| EC08 | Valid | TC-COUPON-002 |
| EC09 | Invalid | TC-COUPON-006 |
| EC10 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC11 | Invalid | TC-COUPON-007 |
| EC12 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC13 | Invalid | TC-COUPON-008 |
| EC14 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC15 | Invalid | TC-COUPON-009 |
| EC16 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC17 | Invalid | TC-COUPON-010 |
| EC18 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC19 | Invalid | TC-COUPON-011 |
| EC20 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC21 | Invalid | TC-COUPON-012 |
| EC22 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC23 | Invalid | TC-COUPON-013 |
| EC24 | Valid | TC-COUPON-001, TC-COUPON-002, TC-COUPON-003, TC-COUPON-004, TC-COUPON-005, TC-COUPON-006, TC-COUPON-007, TC-COUPON-008, TC-COUPON-009, TC-COUPON-010, TC-COUPON-011, TC-COUPON-012, TC-COUPON-013 |
| EC25 | Valid | TC-COUPON-014 |
| EC26 | Valid | TC-COUPON-015 |
| EC27 | Valid | TC-COUPON-001, TC-COUPON-002 |
| EC28 | Invalid | TC-COUPON-001, TC-COUPON-002 |
| EC29 | Valid | TC-COUPON-003, TC-COUPON-004, TC-COUPON-005, TC-COUPON-006, TC-COUPON-007, TC-COUPON-008, TC-COUPON-009, TC-COUPON-010, TC-COUPON-011, TC-COUPON-012, TC-COUPON-013 |
| EC30 | Invalid | TC-COUPON-003, TC-COUPON-004, TC-COUPON-005, TC-COUPON-006, TC-COUPON-007, TC-COUPON-008, TC-COUPON-009, TC-COUPON-010, TC-COUPON-011, TC-COUPON-012, TC-COUPON-013 |
| EC31 | Valid | TC-COUPON-014 |
| EC32 | Invalid | TC-COUPON-014 |
| EC33 | Valid | TC-COUPON-015 |
| EC34 | Invalid | TC-COUPON-015 |

**Kết quả:** 34/34 EC được ánh xạ tới test case. EC28, EC30, EC32, EC34 là output không tuân thủ và được kiểm tra bằng oracle tương ứng.

---

### Phân tích Boundary Value Analysis

#### Phạm vi

- **Requirement:** FR-17 — Quản lý Mã Giảm Giá (Coupon CRUD).
- **Nguồn requirement:** `README.md`, mục `FR-17: Quản lý Mã Giảm Giá (Coupon CRUD)`.
- **Phạm vi kiểm thử:** Chỉ FR-17; không phân tích hoặc tạo test case cho feature khác.
- **Kỹ thuật:** Boundary Value Analysis (BVA).

#### 1. Input / Output

##### Input

- **Thao tác quản lý:** Thêm, Xem hoặc Xóa mã giảm giá.
- **`code`:** trường bắt buộc và duy nhất.
- **`type`:** trường bắt buộc, nhận `percent` hoặc `fixed`.
- **`discount_value`:** trường bắt buộc và phải dương (`discount_value > 0`).
- **`expired_at`:** trường bắt buộc.
- **`min_order_amount`:** trường bắt buộc và phải thỏa `min_order_amount >= 0`.
- **`max_uses_per_user`:** trường bắt buộc và phải thỏa `max_uses_per_user >= 1`.

##### Output

- **Kết quả thao tác CRUD:** mã giảm giá được thêm, xem hoặc xóa theo thao tác Admin; tạo mã với dữ liệu không thỏa rule bị từ chối.
- **Dữ liệu mã giảm giá hiển thị:** thông tin mã giảm giá khi Admin thực hiện thao tác Xem.

##### Phân loại khả năng áp dụng BVA

- Áp dụng BVA cho `discount_value`, `min_order_amount` và `max_uses_per_user` vì requirement có giới hạn dưới rõ ràng.
- `max_uses_per_user` là số lần sử dụng, nên là đại lượng đếm nguyên với đơn vị bước có căn cứ là **1 lần**.
- Kiểu số và precision của `discount_value`, `min_order_amount` chưa được mô tả. Vì vậy chỉ giá trị đúng tại mốc `0` có thể cụ thể hóa mà không suy đoán; không tự chọn `Δ = 1`, `0.01` hoặc giá trị khác cho vị trí ngay trước/sau mốc.
- Không áp dụng BVA cho `code`, `type`, `expired_at` và thao tác CRUD vì đó là rule bắt buộc, duy nhất hoặc tập giá trị phân loại; không có miền thứ tự và boundary đủ thông tin.
- Không xác định Output Boundary vì FR-17 không nêu output dạng số, khoảng giá trị, hoặc công thức Input → Output.

#### 2. Boundary Value Analysis

##### Boundary Value Analysis cho `discount_value`

Miền hợp lệ là **`discount_value > 0`**. Mốc chuyển tiếp là **0** và bị loại khỏi miền hợp lệ. FR-17 không mô tả Upper Boundary.

Về nguyên tắc, quanh mốc **0** cần xét:

**0 - Δ, 0, 0 + Δ**

Trong đó:

- **`0 - Δ`** nằm ngay dưới mốc và không hợp lệ.
- **`0`** nằm tại mốc nhưng không hợp lệ vì rule dùng toán tử `> 0`.
- **`0 + Δ`** là giá trị dương ngay trên mốc và hợp lệ.

Kiểu số và precision **chưa được mô tả trong requirement**, nên không đủ căn cứ để thay `Δ` bằng số cụ thể. Tập Boundary Test Value có thể thực thi là:

**0**

Hai vị trí `0 - Δ` và `0 + Δ` được ghi nhận là chưa thể cụ thể hóa, không thay bằng giá trị nằm xa boundary.

##### Boundary Value Analysis cho `min_order_amount`

Miền hợp lệ là **`min_order_amount >= 0`**. Mốc quan trọng là **Lower Boundary = 0** và được bao gồm trong miền hợp lệ. FR-17 không mô tả Upper Boundary.

Về nguyên tắc, quanh mốc **0** cần xét:

**0 - Δ, 0, 0 + Δ**

Trong đó:

- **`0 - Δ`** nằm ngay dưới giới hạn và không hợp lệ.
- **`0`** nằm đúng tại giới hạn dưới và hợp lệ.
- **`0 + Δ`** nằm ngay trên giới hạn dưới và hợp lệ.

Kiểu số và precision **chưa được mô tả trong requirement**, nên không đủ căn cứ để chọn giá trị cụ thể cho `Δ`. Tập Boundary Test Value có thể thực thi là:

**0**

Hai vị trí `0 - Δ` và `0 + Δ` được ghi nhận là chưa thể cụ thể hóa.

##### Boundary Value Analysis cho `max_uses_per_user`

Miền hợp lệ là **từ 1 lần sử dụng/người trở lên**. Mốc quan trọng là **Lower Boundary = 1**; requirement không mô tả Upper Boundary. Vì đây là số lần sử dụng, đơn vị bước là **1 lần**.

Quanh mốc **1**:

**0, 1, 2**

Vì vậy tập BVA quan trọng là:

**0, 1, 2**

Trong đó:

- **0** kiểm tra trường hợp ngay dưới giới hạn tối thiểu và không hợp lệ.
- **1** kiểm tra đúng tại giới hạn dưới và hợp lệ.
- **2** kiểm tra ngay trên giới hạn dưới và hợp lệ.

##### Tập BVA cuối cùng

- `discount_value`: **0**.
- `min_order_amount`: **0**.
- `max_uses_per_user`: **0, 1, 2**.

Tổng cộng có **5 Boundary Test Value cụ thể**. Các vị trí sát mốc chưa thể cụ thể hóa của hai trường số được ghi rõ tại phần giới hạn requirement.

#### 3. Boundary Test Values

| Input / Output | Mô tả | Boundary Position | Value | Expected Behavior |
|---|---|---|---:|---|
| `discount_value` | Giá trị giảm giá phải dương | Mốc 0 bị loại (`x > 0`) | 0 | Invalid — hệ thống từ chối tạo mã giảm giá vì giá trị không dương. |
| `min_order_amount` | Giá trị đơn hàng tối thiểu phải lớn hơn hoặc bằng 0 | LB | 0 | Valid — giá trị nằm đúng tại giới hạn dưới. |
| `max_uses_per_user` | Số lần sử dụng tối đa cho mỗi người phải lớn hơn hoặc bằng 1 | LB-1 | 0 | Invalid — hệ thống từ chối tạo mã giảm giá vì số lần nhỏ hơn 1. |
| `max_uses_per_user` | Số lần sử dụng tối đa cho mỗi người phải lớn hơn hoặc bằng 1 | LB | 1 | Valid — giá trị nằm đúng tại giới hạn dưới. |
| `max_uses_per_user` | Số lần sử dụng tối đa cho mỗi người phải lớn hơn hoặc bằng 1 | LB+1 | 2 | Valid — giá trị nằm ngay trên giới hạn dưới. |

#### 4. Valid Representative Values cho các Input khác

| Input | Valid Range / Rule | Giá trị sử dụng | Lý do |
|---|---|---|---|
| Thao tác quản lý | Thêm / Xem / Xóa | Thêm | Boundary của các trường được kiểm tra khi tạo mã giảm giá. |
| `code` | Bắt buộc và duy nhất | Mã cố định riêng cho từng TC, được liệt kê tại Test Cases | Không sinh mã động; precondition xác minh mã chưa tồn tại. |
| `type` | `percent` hoặc `fixed` | `fixed` — UI: `Số tiền cố định (₫)` | Giá trị kỹ thuật là `fixed`; nhãn UI tiếng Việt được đối chiếu từ source. |
| `discount_value` | `> 0` | `10` | Giá trị dương rõ ràng; dùng khi không kiểm thử boundary của trường này. |
| `expired_at` | Bắt buộc | `2099-12-31` | Giá trị cố định trong tương lai để tách khỏi rule ngày hiện tại vốn không được FR-17 mô tả. |
| `min_order_amount` | `>= 0` | `100000` | Giá trị hợp lệ, không dùng như giá trị sát biên. |
| `max_uses_per_user` | `>= 1` | `5` | Giá trị đếm hợp lệ, không sát Lower Boundary. |

**Tiền điều kiện chung:** Admin đang ở chức năng Thêm mã giảm giá. Mỗi test case dùng đúng `code` cố định được liệt kê bên dưới và mã đó chưa tồn tại trước khi chạy. Mỗi test case độc lập. Dữ liệu từ test case tạo thành công phải được hoàn tác; nếu không xác minh được trạng thái này, testcase bị Blocked thay vì đổi code.

#### 5. Test Cases
| TC-ID | Requirement ID | Module / TestType / Technique | Preconditions | Test data | Test steps | Expected result | Status / Related bugs |
|---|---|---|---|---|---|---|---|
| **TC-BVA-FR17-001** | FR-17 | Quản lý Mã Giảm Giá / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `BVA17DV0` chưa tồn tại | **Boundary:** `discount_value = 0` (mốc 0 bị loại)<br>**code:** `BVA17DV0`<br>**type:** `fixed`<br>**UI mapping type:** `Số tiền cố định (₫)`<br>**expired_at:** `2099-12-31`<br>**min_order_amount:** `100000`<br>**max_uses_per_user:** `5` | 1. Nhập dữ liệu đúng control theo mapping UI.<br>2. Gửi yêu cầu thêm mã giảm giá. | Hệ thống từ chối tạo mã giảm giá vì `discount_value` không phải giá trị dương. | **Fail** / `BUG-FR17-COUPON-NONPOSITIVE-DISCOUNT-ACCEPTED` |
| **TC-BVA-FR17-002** | FR-17 | Quản lý Mã Giảm Giá / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `BVA17MIN0` chưa tồn tại | **Boundary:** `min_order_amount = 0` (LB)<br>**code:** `BVA17MIN0`<br>**type:** `fixed`<br>**UI mapping type:** `Số tiền cố định (₫)`<br>**discount_value:** `10`<br>**expired_at:** `2099-12-31`<br>**max_uses_per_user:** `5` | 1. Nhập dữ liệu đúng control theo mapping UI.<br>2. Gửi yêu cầu thêm mã giảm giá. | Mã giảm giá được tạo thành công vì `min_order_amount = 0` thỏa `>= 0` và các input khác hợp lệ. | **Pass** / Không có |
| **TC-BVA-FR17-003** | FR-17 | Quản lý Mã Giảm Giá / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `BVA17MAX0` chưa tồn tại | **Boundary:** `max_uses_per_user = 0` (LB-1)<br>**code:** `BVA17MAX0`<br>**type:** `fixed`<br>**UI mapping type:** `Số tiền cố định (₫)`<br>**discount_value:** `10`<br>**expired_at:** `2099-12-31`<br>**min_order_amount:** `100000` | 1. Nhập dữ liệu đúng control theo mapping UI.<br>2. Gửi yêu cầu thêm mã giảm giá. | Hệ thống từ chối tạo mã giảm giá vì `max_uses_per_user` nhỏ hơn 1. | **Pass** / Không có |
| **TC-BVA-FR17-004** | FR-17 | Quản lý Mã Giảm Giá / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `BVA17MAX1` chưa tồn tại | **Boundary:** `max_uses_per_user = 1` (LB)<br>**code:** `BVA17MAX1`<br>**type:** `fixed`<br>**UI mapping type:** `Số tiền cố định (₫)`<br>**discount_value:** `10`<br>**expired_at:** `2099-12-31`<br>**min_order_amount:** `100000` | 1. Nhập dữ liệu đúng control theo mapping UI.<br>2. Gửi yêu cầu thêm mã giảm giá. | Mã giảm giá được tạo thành công vì `max_uses_per_user = 1` nằm đúng tại giới hạn dưới và các input khác hợp lệ. | **Pass** / Không có |
| **TC-BVA-FR17-005** | FR-17 | Quản lý Mã Giảm Giá / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `BVA17MAX2` chưa tồn tại | **Boundary:** `max_uses_per_user = 2` (LB+1)<br>**code:** `BVA17MAX2`<br>**type:** `fixed`<br>**UI mapping type:** `Số tiền cố định (₫)`<br>**discount_value:** `10`<br>**expired_at:** `2099-12-31`<br>**min_order_amount:** `100000` | 1. Nhập dữ liệu đúng control theo mapping UI.<br>2. Gửi yêu cầu thêm mã giảm giá. | Mã giảm giá được tạo thành công vì `max_uses_per_user = 2` nằm ngay trên giới hạn dưới và các input khác hợp lệ. | **Pass** / Không có |

#### 6. Boundary Coverage Matrix

| Input / Output | Boundary Position | Boundary Value | Test Case cover |
|---|---|---:|---|
| `discount_value` | Mốc 0 bị loại (`x > 0`) | 0 | TC-BVA-FR17-001 |
| `min_order_amount` | LB | 0 | TC-BVA-FR17-002 |
| `max_uses_per_user` | LB-1 | 0 | TC-BVA-FR17-003 |
| `max_uses_per_user` | LB | 1 | TC-BVA-FR17-004 |
| `max_uses_per_user` | LB+1 | 2 | TC-BVA-FR17-005 |

Tất cả Boundary Test Value cụ thể xác định được từ requirement đều có test case cover.

Các vị trí `0 - Δ` và `0 + Δ` của `discount_value` và `min_order_amount` không phải Boundary Value bị bỏ sót; chúng chưa thể chuyển thành giá trị cụ thể vì FR-17 không nêu kiểu số hoặc precision.

#### 7. Output Boundary Analysis

Không xác định Output Boundary từ requirement. Kết quả Thêm/Xem/Xóa là trạng thái rời rạc; FR-17 không mô tả output có miền giá trị có thứ tự hoặc quan hệ tính toán Input → Output.

#### 8. BVA Summary

```text
Total Inputs / Outputs reviewed: 9 (7 Inputs, 2 Outputs)
Total Inputs / Outputs applicable to BVA: 3 Inputs
Total boundary points identified: 3 lower boundary/threshold points
Total boundary test values: 5 concrete values
Total test cases generated: 5
Uncovered boundary values: 0 concrete values
Unresolved adjacent boundary positions: 4
```

##### Giới hạn của requirement

- Kiểu số và precision của `discount_value`: **Chưa được mô tả trong requirement.** Không đủ căn cứ để cụ thể hóa `0 - Δ` và `0 + Δ`.
- Kiểu số và precision của `min_order_amount`: **Chưa được mô tả trong requirement.** Không đủ căn cứ để cụ thể hóa `0 - Δ` và `0 + Δ`.
- Upper Boundary của `discount_value`, `min_order_amount` và `max_uses_per_user`: **Chưa được mô tả trong requirement.** Không tự tạo giới hạn trên.
- Cấu trúc/độ dài của `code` và format/giới hạn ngày của `expired_at`: **Chưa được mô tả trong requirement.** Không đủ căn cứ để xác định Boundary Value.
- Thông báo lỗi cụ thể cho dữ liệu không hợp lệ: **Chưa được mô tả trong requirement.** Expected Result chỉ khẳng định chấp nhận hoặc từ chối theo rule, không tự viết nội dung thông báo.


## Feature D FR-01 Đăng ký tài khoản Mobile

### Phân tích Domain Testing Mobile

#### 1. Input và Output

**Input:** Họ Tên, Email, trạng thái Email đã tồn tại hay chưa và Mật khẩu. Phiên bản Mobile sử dụng cùng yêu cầu FR-01 với Web nhưng bộ test mở rộng phân hoạch chuỗi cho Họ Tên và Email.

**Output:** Với dữ liệu hợp lệ, tài khoản được tạo và ứng dụng chuyển tới trang Đăng nhập. Với dữ liệu không hợp lệ, đăng ký phải bị từ chối và không tạo tài khoản.

#### 2. Xác định condition

| Condition ID | Input hoặc Output | Điều kiện trên Mobile |
|---|---|---|
| MC1 | Họ Tên | Bắt buộc, không rỗng và không chỉ gồm khoảng trắng. |
| MC2 | Email | Bắt buộc. |
| MC3 | Email | Có đúng cấu trúc `user@domain.com`: có local-part, tên miền, phần mở rộng; không có khoảng trắng và không có nhiều ký tự `@`. |
| MC4 | Email và trạng thái hệ thống | Email chưa tồn tại. |
| MC5 | Mật khẩu | Bắt buộc. |
| MC6 | Mật khẩu | Có ít nhất 8 ký tự. |
| MC7 | Mật khẩu | Có ít nhất một chữ hoa. |
| MC8 | Mật khẩu | Có ít nhất một chữ thường. |
| MC9 | Mật khẩu | Có ít nhất một chữ số. |
| MC10 | Mật khẩu | Có ít nhất một ký tự thuộc tập `@, $, !, %, *, ?, &`. |
| MC11 | Output hợp lệ | Tạo tài khoản và chuyển tới trang Đăng nhập. |
| MC12 | Output không hợp lệ | Không tạo tài khoản. |

So với Web, MC1 và MC3 được tách chi tiết hơn để giải thích các testcase Mobile bổ sung: Họ Tên chỉ chứa khoảng trắng; Email thiếu local-part, thiếu tên miền, thiếu phần mở rộng, chứa khoảng trắng hoặc chứa nhiều ký tự `@`.

#### 3. Equivalence Class Table

| EC ID | Input hoặc Output | Equivalence Class | Loại |
|---|---|---|---|
| MEC01 | Họ Tên | Không rỗng và có ít nhất một ký tự khác khoảng trắng. | Valid |
| MEC02 | Họ Tên | Rỗng. | Invalid |
| MEC03 | Họ Tên | Chỉ chứa khoảng trắng. | Invalid |
| MEC04 | Email | Không rỗng. | Valid |
| MEC05 | Email | Rỗng. | Invalid |
| MEC06 | Email | Đúng cấu trúc `user@domain.com`. | Valid |
| MEC07 | Email | Không có ký tự `@`. | Invalid |
| MEC08 | Email | Thiếu local-part trước `@`. | Invalid |
| MEC09 | Email | Thiếu tên miền sau `@`. | Invalid |
| MEC10 | Email | Thiếu phần mở rộng tên miền. | Invalid |
| MEC11 | Email | Chứa khoảng trắng. | Invalid |
| MEC12 | Email | Chứa nhiều ký tự `@`. | Invalid |
| MEC13 | Email và trạng thái hệ thống | Email chưa tồn tại. | Valid |
| MEC14 | Email và trạng thái hệ thống | Email đã tồn tại. | Invalid |
| MEC15 | Mật khẩu | Không rỗng. | Valid |
| MEC16 | Mật khẩu | Rỗng. | Invalid |
| MEC17 | Mật khẩu | Dài ít nhất 8 ký tự. | Valid |
| MEC18 | Mật khẩu | Dài từ 1 đến 7 ký tự. | Invalid |
| MEC19 | Mật khẩu | Có chữ hoa. | Valid |
| MEC20 | Mật khẩu | Không có chữ hoa. | Invalid |
| MEC21 | Mật khẩu | Có chữ thường. | Valid |
| MEC22 | Mật khẩu | Không có chữ thường. | Invalid |
| MEC23 | Mật khẩu | Có chữ số. | Valid |
| MEC24 | Mật khẩu | Không có chữ số. | Invalid |
| MEC25 | Mật khẩu | Có ít nhất một ký tự đặc biệt thuộc tập FR-01. | Valid |
| MEC26 | Mật khẩu | Không có ký tự thuộc tập FR-01, kể cả trường hợp chỉ dùng ký tự đặc biệt ngoài tập. | Invalid |
| MEC27 | Output với mọi input hợp lệ | Tài khoản được tạo và chuyển tới trang Đăng nhập. | Valid |
| MEC28 | Output với input không hợp lệ | Đăng ký bị từ chối. | Valid |

#### 4. Representative Values

| EC ID | Giá trị đại diện | Test case chính |
|---|---|---|
| MEC01 | `Nguyễn Văn An` | TC-REG-001 |
| MEC02 | `""` | TC-REG-002 |
| MEC03 | Ba khoảng trắng | TC-REG-012 |
| MEC04, MEC06, MEC13 | `an.nguyen01@example.com` chưa tồn tại | TC-REG-001 |
| MEC05 | Email rỗng | TC-REG-003 |
| MEC07 | `user.example.com` | TC-REG-004 |
| MEC08 | `@example.com` | TC-REG-013 |
| MEC09 | `user@` | TC-REG-014 |
| MEC10 | `user@example` | TC-REG-015 |
| MEC11 | Email chứa khoảng trắng | TC-REG-016 |
| MEC12 | Email chứa hai ký tự `@` | TC-REG-017 |
| MEC14 | Email đã tồn tại | TC-REG-005 |
| MEC15, MEC17, MEC19, MEC21, MEC23, MEC25 | `Abcdef1@` | TC-REG-001 |
| MEC16 | Mật khẩu rỗng | TC-REG-006 |
| MEC18 | `Aa1@abc` dài 7 ký tự | TC-REG-007 |
| MEC20 | `abcdef1@` | TC-REG-008 |
| MEC22 | `ABCDEF1@` | TC-REG-009 |
| MEC24 | `Abcdefg@` | TC-REG-010 |
| MEC26 | `Abcdef12` và `Abcdef1#` | TC-REG-011, TC-REG-018 |
| MEC27 | Đăng ký thành công | TC-REG-001, TC-REG-019 |
| MEC28 | Không tạo tài khoản | TC-REG-002 đến TC-REG-018, trừ các ca kiểm tra output hợp lệ |

#### 5. Test Cases

| TC-ID | Requirement ID | Module / TestType / Technique | Preconditions | Test data | Test steps | Expected result | Status / Related bugs |
|---|---|---|---|---|---|---|---|
| **TC-REG-001** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Trang Đăng ký đã mở.<br>`an.nguyen01@example.com` chưa tồn tại. | **Họ Tên:** Nguyễn Văn An<br>**Email:** an.nguyen01@example.com<br>**Mật khẩu:** Abcdef1@ | 1. Nhập toàn bộ dữ liệu hợp lệ.<br>2. Gửi form.<br>3. Kiểm tra tài khoản và trang đích. | Tài khoản được đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Pass** / Không có |
| **TC-REG-002** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Trang Đăng ký đã mở.<br>Email test chưa tồn tại. | **Họ Tên:** `""`<br>**Email:** an.nguyen02@example.com<br>**Mật khẩu:** Abcdef1@ | 1. Để trống Họ Tên.<br>2. Nhập các trường khác hợp lệ.<br>3. Gửi form. | Đăng ký không thành công do thiếu Họ Tên. Message cụ thể chưa được mô tả. | **Fail** / `BUG-FR01-MOBILE-REQUIRED-NAME-NOT-VALIDATED` |
| **TC-REG-003** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Trang Đăng ký đã mở. | **Họ Tên:** Nguyễn Văn An<br>**Email:** `""`<br>**Mật khẩu:** Abcdef1@ | 1. Để trống Email.<br>2. Nhập các trường khác hợp lệ.<br>3. Gửi form. | Đăng ký không thành công do thiếu Email. Message cụ thể chưa được mô tả. | **Fail** / `BUG-FR01-MOBILE-EMAIL-FORMAT-NOT-VALIDATED` |
| **TC-REG-004** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Trang Đăng ký đã mở.<br>Chuỗi Email test chưa tồn tại. | **Họ Tên:** Nguyễn Văn An<br>**Email:** user.example.com<br>**Mật khẩu:** Abcdef1@ | 1. Nhập Email sai dạng.<br>2. Nhập các trường khác hợp lệ.<br>3. Gửi form. | Đăng ký không thành công do Email không hợp lệ. Message cụ thể chưa được mô tả. | **Fail** / `BUG-FR01-MOBILE-EMAIL-FORMAT-NOT-VALIDATED` |
| **TC-REG-005** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Trang Đăng ký đã mở.<br>`existing.user@example.com` đã tồn tại. | **Họ Tên:** Nguyễn Văn An<br>**Email:** existing.user@example.com<br>**Mật khẩu:** Abcdef1@ | 1. Nhập Email đã tồn tại.<br>2. Nhập các trường khác hợp lệ.<br>3. Gửi form. | Đăng ký không thành công vì Email không duy nhất. Message cụ thể chưa được mô tả. | **Fail** / `BUG-FR01-MOBILE-DUPLICATE-EMAIL-ACCEPTED` |
| **TC-REG-006** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Trang Đăng ký đã mở.<br>Email test chưa tồn tại. | **Họ Tên:** Nguyễn Văn An<br>**Email:** an.nguyen06@example.com<br>**Mật khẩu:** `""` | 1. Để trống Mật khẩu.<br>2. Nhập các trường khác hợp lệ.<br>3. Gửi form. | Đăng ký không thành công do thiếu Mật khẩu. Message cụ thể: Mật khẩu quá yếu! Phải dài tối thiếu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT | **Pass** / Không có |
| **TC-REG-007** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Trang Đăng ký đã mở.<br>Email test chưa tồn tại. | **Họ Tên:** Nguyễn Văn An<br>**Email:** an.nguyen07@example.com<br>**Mật khẩu:** Aa1@abc | 1. Nhập Mật khẩu 7 ký tự nhưng đủ các thành phần ký tự.<br>2. Nhập các trường khác hợp lệ.<br>3. Gửi form. | Đăng ký không thành công do Mật khẩu ngắn hơn 8 ký tự. Message cụ thể: Mật khẩu quá yếu! Phải dài tối thiếu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT | **Pass** / Không có |
| **TC-REG-008** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Trang Đăng ký đã mở.<br>Email test chưa tồn tại. | **Họ Tên:** Nguyễn Văn An<br>**Email:** an.nguyen08@example.com<br>**Mật khẩu:** abcdef1@ | 1. Nhập Mật khẩu không có chữ hoa.<br>2. Nhập các trường khác hợp lệ.<br>3. Gửi form. | Đăng ký không thành công do Mật khẩu thiếu chữ hoa. Message cụ thể: Mật khẩu quá yếu! Phải dài tối thiếu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT | **Pass** / Không có |
| **TC-REG-009** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Trang Đăng ký đã mở.<br>Email test chưa tồn tại. | **Họ Tên:** Nguyễn Văn An<br>**Email:** an.nguyen09@example.com<br>**Mật khẩu:** ABCDEF1@ | 1. Nhập Mật khẩu không có chữ thường.<br>2. Nhập các trường khác hợp lệ.<br>3. Gửi form. | Đăng ký không thành công do Mật khẩu thiếu chữ thường. Message cụ thể chưa được mô tả. | **Pass** / Không có |
| **TC-REG-010** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Trang Đăng ký đã mở.<br>Email test chưa tồn tại. | **Họ Tên:** Nguyễn Văn An<br>**Email:** an.nguyen10@example.com<br>**Mật khẩu:** Abcdefg@ | 1. Nhập Mật khẩu không có chữ số.<br>2. Nhập các trường khác hợp lệ.<br>3. Gửi form. | Đăng ký không thành công do Mật khẩu thiếu chữ số. Message cụ thể chưa được mô tả. | **Pass** / Không có |
| **TC-REG-011** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Trang Đăng ký đã mở.<br>Email test chưa tồn tại. | **Họ Tên:** Nguyễn Văn An<br>**Email:** an.nguyen11@example.com<br>**Mật khẩu:** Abcdef12 | 1. Nhập Mật khẩu không có ký tự thuộc tập yêu cầu.<br>2. Nhập các trường khác hợp lệ.<br>3. Gửi form. | Đăng ký không thành công do Mật khẩu thiếu ký tự đặc biệt thuộc tập yêu cầu. Message cụ thể chưa được mô tả. | **Pass** / Không có |
| **TC-REG-012** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Trang Đăng ký đã mở và `an.nguyen12@example.com` chưa tồn tại. | **Họ Tên:** `"   "` (ba khoảng trắng)<br>**Email:** `an.nguyen12@example.com`<br>**Mật khẩu:** `Abcdef1@` | 1. Nhập ba khoảng trắng vào `Họ Tên` và nhập các trường còn lại theo Test data.<br>2. Chạm nút `Đăng Ký`. | Đăng ký không thành công vì giá trị chỉ chứa khoảng trắng được xem là thiếu `Họ Tên`; tài khoản không được tạo. | **Fail** / `BUG-FR01-MOBILE-REQUIRED-NAME-NOT-VALIDATED` |
| **TC-REG-013** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Trang Đăng ký đã mở. | **Họ Tên:** Nguyễn Văn An<br>**Email:** `@example.com`<br>**Mật khẩu:** `Abcdef1@` | 1. Nhập Email thiếu phần đứng trước ký tự `@` và nhập các trường còn lại theo Test data.<br>2. Chạm nút `Đăng Ký`. | Đăng ký không thành công vì Email không đúng định dạng `user@domain.com`; không tạo tài khoản mới. | **Fail** / `BUG-FR01-MOBILE-EMAIL-FORMAT-NOT-VALIDATED` |
| **TC-REG-014** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Trang Đăng ký đã mở. | **Họ Tên:** Nguyễn Văn An<br>**Email:** `user@`<br>**Mật khẩu:** `Abcdef1@` | 1. Nhập Email thiếu phần tên miền sau ký tự `@` và nhập các trường còn lại theo Test data.<br>2. Chạm nút `Đăng Ký`. | Đăng ký không thành công vì Email không đúng định dạng `user@domain.com`; không tạo tài khoản mới. | **Fail** / `BUG-FR01-MOBILE-EMAIL-FORMAT-NOT-VALIDATED` |
| **TC-REG-015** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Trang Đăng ký đã mở. | **Họ Tên:** Nguyễn Văn An<br>**Email:** `user@example`<br>**Mật khẩu:** `Abcdef1@` | 1. Nhập Email không có phần mở rộng tên miền và nhập các trường còn lại theo Test data.<br>2. Chạm nút `Đăng Ký`. | Đăng ký không thành công vì Email không đúng định dạng được mô tả bởi FR-01; không tạo tài khoản mới. | **Fail** / `BUG-FR01-MOBILE-EMAIL-FORMAT-NOT-VALIDATED` |
| **TC-REG-016** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Trang Đăng ký đã mở. | **Họ Tên:** Nguyễn Văn An<br>**Email:** `user @example.com`<br>**Mật khẩu:** `Abcdef1@` | 1. Nhập Email có khoảng trắng và nhập các trường còn lại theo Test data.<br>2. Chạm nút `Đăng Ký`. | Đăng ký không thành công vì Email chứa khoảng trắng không đúng định dạng; không tạo tài khoản mới. | **Fail** / `BUG-FR01-MOBILE-EMAIL-FORMAT-NOT-VALIDATED` |
| **TC-REG-017** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Trang Đăng ký đã mở. | **Họ Tên:** Nguyễn Văn An<br>**Email:** `user@@example.com`<br>**Mật khẩu:** `Abcdef1@` | 1. Nhập Email có hai ký tự `@` và nhập các trường còn lại theo Test data.<br>2. Chạm nút `Đăng Ký`. | Đăng ký không thành công vì Email không đúng định dạng `user@domain.com`; không tạo tài khoản mới. | **Fail** / `BUG-FR01-MOBILE-EMAIL-FORMAT-NOT-VALIDATED` |
| **TC-REG-018** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Trang Đăng ký đã mở và `an.nguyen18@example.com` chưa tồn tại. | **Họ Tên:** Nguyễn Văn An<br>**Email:** `an.nguyen18@example.com`<br>**Mật khẩu:** `Abcdef1#` | 1. Nhập Mật khẩu dài 8 ký tự, có chữ hoa, chữ thường, chữ số và ký tự `#`, nhưng không có ký tự nào thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`.<br>2. Nhập các trường còn lại theo Test data.<br>3. Chạm nút `Đăng Ký`. | Đăng ký không thành công vì `#` không thuộc tập ký tự đặc biệt mà FR-01 cho phép; tài khoản không được tạo. | **Fail** / `BUG-FR01-MOBILE-UNSUPPORTED-SPECIAL-CHAR-ACCEPTED` |
| **TC-REG-019** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Trang Đăng ký đã mở.<br>Các Email trong Test data chưa tồn tại; mỗi dòng dữ liệu được thực hiện độc lập. | Lần chạy 1; Email `special.at@example.com`; Mật khẩu `Abcdef1@`; Ký tự cần kiểm tra `@`<br>Lần chạy 2; Email `special.dollar@example.com`; Mật khẩu `Abcdef1$`; Ký tự cần kiểm tra `$`<br>Lần chạy 3; Email `special.exclamation@example.com`; Mật khẩu `Abcdef1!`; Ký tự cần kiểm tra `!`<br>Lần chạy 4; Email `special.percent@example.com`; Mật khẩu `Abcdef1%`; Ký tự cần kiểm tra `%`<br>Lần chạy 5; Email `special.asterisk@example.com`; Mật khẩu `Abcdef1*`; Ký tự cần kiểm tra `*`<br>Lần chạy 6; Email `special.question@example.com`; Mật khẩu `Abcdef1?`; Ký tự cần kiểm tra `?`<br>Lần chạy 7; Email `special.ampersand@example.com`; Mật khẩu `Abcdef1&`; Ký tự cần kiểm tra `&` | 1. Với từng dòng Test data, nhập `Nguyễn Văn An` vào `Họ Tên`, sau đó nhập Email và Mật khẩu tương ứng.<br>2. Chạm nút `Đăng Ký`.<br>3. Xác nhận kết quả, hoàn tác tài khoản vừa tạo và quay lại trang Đăng ký trước khi chạy dòng tiếp theo. | Ở cả 7 lần chạy, đăng ký thành công vì Mật khẩu dài 8 ký tự, có đủ chữ hoa, chữ thường, chữ số và một ký tự đặc biệt thuộc đúng tập FR-01; người dùng được chuyển tới trang Đăng nhập. | **Pass** / Không có |

#### 6. Rút gọn Test Case

- TC-REG-001 kết hợp các Valid EC đầu vào và output thành công.
- TC-REG-002 đến TC-REG-011 giữ nguyên các Invalid EC cốt lõi của bản Web.
- TC-REG-012 đến TC-REG-018 không được gộp vì mỗi ca đại diện một phân hoạch chuỗi bổ sung hoặc một oracle riêng của Mobile.
- TC-REG-019 là testcase tham số hóa gồm bảy lượt chạy để xác nhận từng ký tự đặc biệt FR-01 cho phép.

Sau rút gọn có 19 testcase và mọi EC Mobile đều được ánh xạ ít nhất một lần.

#### 7. EC Coverage Matrix

| EC ID | Loại | Test case cover |
|---|---|---|
| MEC01 | Valid | TC-REG-001, TC-REG-003 đến TC-REG-011, TC-REG-013 đến TC-REG-019 |
| MEC02 | Invalid | TC-REG-002 |
| MEC03 | Invalid | TC-REG-012 |
| MEC04 | Valid | TC-REG-001, TC-REG-002, TC-REG-006 đến TC-REG-012, TC-REG-018, TC-REG-019 |
| MEC05 | Invalid | TC-REG-003 |
| MEC06 | Valid | TC-REG-001, TC-REG-002, TC-REG-005 đến TC-REG-012, TC-REG-018, TC-REG-019 |
| MEC07 | Invalid | TC-REG-004 |
| MEC08 | Invalid | TC-REG-013 |
| MEC09 | Invalid | TC-REG-014 |
| MEC10 | Invalid | TC-REG-015 |
| MEC11 | Invalid | TC-REG-016 |
| MEC12 | Invalid | TC-REG-017 |
| MEC13 | Valid | Mọi testcase trừ TC-REG-005 |
| MEC14 | Invalid | TC-REG-005 |
| MEC15 | Valid | Mọi testcase trừ TC-REG-006 |
| MEC16 | Invalid | TC-REG-006 |
| MEC17 | Valid | Mọi testcase trừ TC-REG-006, TC-REG-007 |
| MEC18 | Invalid | TC-REG-007 |
| MEC19 | Valid | Mọi testcase có Mật khẩu nền hợp lệ |
| MEC20 | Invalid | TC-REG-008 |
| MEC21 | Valid | Mọi testcase có Mật khẩu nền hợp lệ |
| MEC22 | Invalid | TC-REG-009 |
| MEC23 | Valid | Mọi testcase có Mật khẩu nền hợp lệ |
| MEC24 | Invalid | TC-REG-010 |
| MEC25 | Valid | TC-REG-001 đến TC-REG-010, TC-REG-012 đến TC-REG-017, TC-REG-019 |
| MEC26 | Invalid | TC-REG-011, TC-REG-018 |
| MEC27 | Valid | TC-REG-001, TC-REG-019 |
| MEC28 | Valid | TC-REG-002 đến TC-REG-018 |

### Phân tích Boundary Value Analysis Mobile

#### 1. Input và phạm vi áp dụng

Mobile kế thừa năm boundary Mật khẩu của Web: độ dài, số chữ hoa, số chữ thường, số chữ số và số ký tự đặc biệt hợp lệ. Bộ test Mobile bổ sung boundary độ dài Họ Tên để kiểm tra trực tiếp yêu cầu bắt buộc.

Với Họ Tên, báo cáo dùng giả định kiểm thử tối thiểu: sau khi loại bỏ khoảng trắng đầu và cuối, chuỗi hợp lệ phải có ít nhất 1 ký tự. Vì FR-01 không quy định giới hạn trên, chỉ kiểm tra Lower Boundary 1 với ba giá trị 0, 1 và 2 ký tự. Đây là boundary bổ sung của Mobile, không phải giới hạn độ dài tối đa suy diễn từ requirement.

#### 2. Boundary Value Analysis

| Input | Miền hợp lệ | Boundary | Bộ giá trị BVA | Test case |
|---|---|---|---|---|
| Độ dài Mật khẩu | `>= 8` ký tự | LB = 8 | 7, 8, 9 | TC-BVA-FR01-001 đến 003 |
| Số chữ hoa | `>= 1` | LB = 1 | 0, 1, 2 | TC-BVA-FR01-004 đến 006 |
| Số chữ thường | `>= 1` | LB = 1 | 0, 1, 2 | TC-BVA-FR01-007 đến 009 |
| Số chữ số | `>= 1` | LB = 1 | 0, 1, 2 | TC-BVA-FR01-010 đến 012 |
| Số ký tự đặc biệt hợp lệ | `>= 1` | LB = 1 | 0, 1, 2 | TC-BVA-FR01-013 đến 015 |
| Độ dài Họ Tên sau trim | `>= 1` ký tự | LB = 1 | 0, 1, 2 | TC-BVA-FR01-016 đến 018 |

#### 3. Boundary Test Values

| Input | Boundary Position | Value | Expected behavior |
|---|---|---:|---|
| Độ dài Mật khẩu | LB-1 | 7 | Từ chối vì dưới 8 ký tự. |
| Độ dài Mật khẩu | LB | 8 | Chấp nhận về độ dài. |
| Độ dài Mật khẩu | LB+1 | 9 | Chấp nhận về độ dài. |
| Số chữ hoa | LB-1 | 0 | Từ chối vì thiếu chữ hoa. |
| Số chữ hoa | LB | 1 | Chấp nhận về số chữ hoa. |
| Số chữ hoa | LB+1 | 2 | Chấp nhận về số chữ hoa. |
| Số chữ thường | LB-1 | 0 | Từ chối vì thiếu chữ thường. |
| Số chữ thường | LB | 1 | Chấp nhận về số chữ thường. |
| Số chữ thường | LB+1 | 2 | Chấp nhận về số chữ thường. |
| Số chữ số | LB-1 | 0 | Từ chối vì thiếu chữ số. |
| Số chữ số | LB | 1 | Chấp nhận về số chữ số. |
| Số chữ số | LB+1 | 2 | Chấp nhận về số chữ số. |
| Số ký tự đặc biệt hợp lệ | LB-1 | 0 | Từ chối vì thiếu ký tự thuộc tập FR-01. |
| Số ký tự đặc biệt hợp lệ | LB | 1 | Chấp nhận về số ký tự đặc biệt. |
| Số ký tự đặc biệt hợp lệ | LB+1 | 2 | Chấp nhận về số ký tự đặc biệt. |
| Độ dài Họ Tên sau trim | LB-1 | 0 | Từ chối vì Họ Tên bắt buộc. |
| Độ dài Họ Tên sau trim | LB | 1 | Chấp nhận về độ dài tối thiểu. |
| Độ dài Họ Tên sau trim | LB+1 | 2 | Chấp nhận về độ dài tối thiểu. |

#### 4. Valid Representative Values cho các Input khác

| Input | Giá trị sử dụng | Lý do |
|---|---|---|
| Họ Tên khi không phải biến boundary | `Nguyễn Văn An` | Giá trị rõ ràng, không sát boundary. |
| Email | Email đúng định dạng và chưa tồn tại, riêng cho từng testcase | Cô lập boundary đang kiểm tra và tránh ảnh hưởng dữ liệu giữa các ca. |
| Mật khẩu khi kiểm tra Họ Tên | `Abcdef1@` | Thỏa tất cả điều kiện Mật khẩu. |
| Các nhóm ký tự Mật khẩu không phải biến boundary | Ít nhất hai ký tự mỗi nhóm và tổng độ dài hợp lệ | Tránh vô tình chạm boundary khác. |

#### 5. Test Cases

| TC-ID | Requirement ID | Module / TestType / Technique | Preconditions | Test data | Test steps | Expected result | Status / Related bugs |
|---|---|---|---|---|---|---|---|
| **TC-BVA-FR01-001** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Người dùng đang ở trang Đăng ký; Email của test case chưa tồn tại trong hệ thống. Mỗi test case độc lập; dữ liệu do một test case thành công tạo ra phải được hoàn tác hoặc test case tiếp theo phải dùng email khác. | **Boundary:** Độ dài Mật khẩu = 7 (LB-1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva001@example.com`<br>**Mật khẩu:** `ABcd1!@` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Hệ thống từ chối đăng ký vì Mật khẩu dưới 8 ký tự. | **Pass** / Không có |
| **TC-BVA-FR01-002** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Người dùng đang ở trang Đăng ký; Email của test case chưa tồn tại trong hệ thống. Mỗi test case độc lập; dữ liệu do một test case thành công tạo ra phải được hoàn tác hoặc test case tiếp theo phải dùng email khác. | **Boundary:** Độ dài Mật khẩu = 8 (LB)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva002@example.com`<br>**Mật khẩu:** `ABcd12!@` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Pass** / Không có |
| **TC-BVA-FR01-003** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Người dùng đang ở trang Đăng ký; Email của test case chưa tồn tại trong hệ thống. Mỗi test case độc lập; dữ liệu do một test case thành công tạo ra phải được hoàn tác hoặc test case tiếp theo phải dùng email khác. | **Boundary:** Độ dài Mật khẩu = 9 (LB+1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva003@example.com`<br>**Mật khẩu:** `ABcde12!@` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Pass** / Không có |
| **TC-BVA-FR01-004** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Người dùng đang ở trang Đăng ký; Email của test case chưa tồn tại trong hệ thống. Mỗi test case độc lập; dữ liệu do một test case thành công tạo ra phải được hoàn tác hoặc test case tiếp theo phải dùng email khác. | **Boundary:** Số chữ hoa = 0 (LB-1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva004@example.com`<br>**Mật khẩu:** `abcdef12!@$%` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Hệ thống từ chối đăng ký vì Mật khẩu thiếu chữ hoa. | **Fail** / `BUG-FR01-MOBILE-WEAK-PASSWORD-ACCEPTED` |
| **TC-BVA-FR01-005** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Người dùng đang ở trang Đăng ký; Email của test case chưa tồn tại trong hệ thống. Mỗi test case độc lập; dữ liệu do một test case thành công tạo ra phải được hoàn tác hoặc test case tiếp theo phải dùng email khác. | **Boundary:** Số chữ hoa = 1 (LB)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva005@example.com`<br>**Mật khẩu:** `Abcdefg12!@$` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Pass** / Không có |
| **TC-BVA-FR01-006** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Người dùng đang ở trang Đăng ký; Email của test case chưa tồn tại trong hệ thống. Mỗi test case độc lập; dữ liệu do một test case thành công tạo ra phải được hoàn tác hoặc test case tiếp theo phải dùng email khác. | **Boundary:** Số chữ hoa = 2 (LB+1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva006@example.com`<br>**Mật khẩu:** `ABcdef12!@$%` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Pass** / Không có |
| **TC-BVA-FR01-007** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Người dùng đang ở trang Đăng ký; Email của test case chưa tồn tại trong hệ thống. Mỗi test case độc lập; dữ liệu do một test case thành công tạo ra phải được hoàn tác hoặc test case tiếp theo phải dùng email khác. | **Boundary:** Số chữ thường = 0 (LB-1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva007@example.com`<br>**Mật khẩu:** `ABCDEF12!@$%` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Hệ thống từ chối đăng ký vì Mật khẩu thiếu chữ thường. | **Fail** / `BUG-FR01-MOBILE-WEAK-PASSWORD-ACCEPTED` |
| **TC-BVA-FR01-008** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Người dùng đang ở trang Đăng ký; Email của test case chưa tồn tại trong hệ thống. Mỗi test case độc lập; dữ liệu do một test case thành công tạo ra phải được hoàn tác hoặc test case tiếp theo phải dùng email khác. | **Boundary:** Số chữ thường = 1 (LB)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva008@example.com`<br>**Mật khẩu:** `ABCDEa12!@$%` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Pass** / Không có |
| **TC-BVA-FR01-009** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Người dùng đang ở trang Đăng ký; Email của test case chưa tồn tại trong hệ thống. Mỗi test case độc lập; dữ liệu do một test case thành công tạo ra phải được hoàn tác hoặc test case tiếp theo phải dùng email khác. | **Boundary:** Số chữ thường = 2 (LB+1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva009@example.com`<br>**Mật khẩu:** `ABCDab12!@$%` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Pass** / Không có |
| **TC-BVA-FR01-010** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Người dùng đang ở trang Đăng ký; Email của test case chưa tồn tại trong hệ thống. Mỗi test case độc lập; dữ liệu do một test case thành công tạo ra phải được hoàn tác hoặc test case tiếp theo phải dùng email khác. | **Boundary:** Số chữ số = 0 (LB-1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva010@example.com`<br>**Mật khẩu:** `ABcdefgh!@$%` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Hệ thống từ chối đăng ký vì Mật khẩu thiếu chữ số. | **Fail** / `BUG-FR01-MOBILE-WEAK-PASSWORD-ACCEPTED` |
| **TC-BVA-FR01-011** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Người dùng đang ở trang Đăng ký; Email của test case chưa tồn tại trong hệ thống. Mỗi test case độc lập; dữ liệu do một test case thành công tạo ra phải được hoàn tác hoặc test case tiếp theo phải dùng email khác. | **Boundary:** Số chữ số = 1 (LB)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva011@example.com`<br>**Mật khẩu:** `ABcdefg1!@$%` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Pass** / Không có |
| **TC-BVA-FR01-012** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Người dùng đang ở trang Đăng ký; Email của test case chưa tồn tại trong hệ thống. Mỗi test case độc lập; dữ liệu do một test case thành công tạo ra phải được hoàn tác hoặc test case tiếp theo phải dùng email khác. | **Boundary:** Số chữ số = 2 (LB+1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva012@example.com`<br>**Mật khẩu:** `ABcdef12!@$%` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Pass** / Không có |
| **TC-BVA-FR01-013** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Người dùng đang ở trang Đăng ký; Email của test case chưa tồn tại trong hệ thống. Mỗi test case độc lập; dữ liệu do một test case thành công tạo ra phải được hoàn tác hoặc test case tiếp theo phải dùng email khác. | **Boundary:** Số ký tự đặc biệt hợp lệ = 0 (LB-1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva013@example.com`<br>**Mật khẩu:** `ABcdefgh1234` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Hệ thống từ chối đăng ký vì Mật khẩu thiếu ký tự đặc biệt hợp lệ. | **Fail** / `BUG-FR01-MOBILE-WEAK-PASSWORD-ACCEPTED` |
| **TC-BVA-FR01-014** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Người dùng đang ở trang Đăng ký; Email của test case chưa tồn tại trong hệ thống. Mỗi test case độc lập; dữ liệu do một test case thành công tạo ra phải được hoàn tác hoặc test case tiếp theo phải dùng email khác. | **Boundary:** Số ký tự đặc biệt hợp lệ = 1 (LB)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva014@example.com`<br>**Mật khẩu:** `ABcdefgh123!` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Pass** / Không có |
| **TC-BVA-FR01-015** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Người dùng đang ở trang Đăng ký; Email của test case chưa tồn tại trong hệ thống. Mỗi test case độc lập; dữ liệu do một test case thành công tạo ra phải được hoàn tác hoặc test case tiếp theo phải dùng email khác. | **Boundary:** Số ký tự đặc biệt hợp lệ = 2 (LB+1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva015@example.com`<br>**Mật khẩu:** `ABcdefgh12!@` | 1. Nhập các giá trị như Test data.<br>2. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | **Pass** / Không có |
| **TC-BVA-FR01-016** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Người dùng đang ở trang Đăng ký và `bva016@example.com` chưa tồn tại. | **Boundary:** Độ dài Họ Tên = 0 (LB-1)<br>**Họ Tên:** `""`<br>**Email:** `bva016@example.com`<br>**Mật khẩu:** `Abcdef1@` | 1. Để trống trường `Họ Tên` và nhập Email, Mật khẩu theo Test data.<br>2. Chạm nút `Đăng Ký`. | Hệ thống từ chối đăng ký vì `Họ Tên` là trường bắt buộc; tài khoản `bva016@example.com` không được tạo. | **Fail** / `BUG-FR01-MOBILE-REQUIRED-NAME-NOT-VALIDATED` |
| **TC-BVA-FR01-017** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Người dùng đang ở trang Đăng ký và `bva017@example.com` chưa tồn tại. | **Boundary:** Độ dài Họ Tên = 1 (LB)<br>**Họ Tên:** `A`<br>**Email:** `bva017@example.com`<br>**Mật khẩu:** `Abcdef1@` | 1. Nhập các giá trị theo Test data.<br>2. Chạm nút `Đăng Ký`. | Đăng ký thành công vì FR-01 chỉ yêu cầu `Họ Tên` không được thiếu và không quy định độ dài tối thiểu lớn hơn 1; người dùng được chuyển tới trang Đăng nhập. | **Pass** / Không có |
| **TC-BVA-FR01-018** | FR-01 | Đăng ký tài khoản / Functional / Boundary Value Analysis | Ứng dụng React Native được mở trên thiết bị hoặc giả lập mobile.<br>Người dùng đang ở trang Đăng ký và `bva018@example.com` chưa tồn tại. | **Boundary:** Độ dài Họ Tên = 2 (LB+1)<br>**Họ Tên:** `An`<br>**Email:** `bva018@example.com`<br>**Mật khẩu:** `Abcdef1@` | 1. Nhập các giá trị theo Test data.<br>2. Chạm nút `Đăng Ký`. | Đăng ký thành công với Họ Tên dài 2 ký tự và người dùng được chuyển tới trang Đăng nhập. | **Pass** / Không có |

#### 6. Boundary Coverage Matrix

| Input | Boundary Position | Boundary Value | Test case cover |
|---|---|---:|---|
| Độ dài Mật khẩu | LB-1 | 7 | TC-BVA-FR01-001 |
| Độ dài Mật khẩu | LB | 8 | TC-BVA-FR01-002 |
| Độ dài Mật khẩu | LB+1 | 9 | TC-BVA-FR01-003 |
| Số chữ hoa | LB-1 | 0 | TC-BVA-FR01-004 |
| Số chữ hoa | LB | 1 | TC-BVA-FR01-005 |
| Số chữ hoa | LB+1 | 2 | TC-BVA-FR01-006 |
| Số chữ thường | LB-1 | 0 | TC-BVA-FR01-007 |
| Số chữ thường | LB | 1 | TC-BVA-FR01-008 |
| Số chữ thường | LB+1 | 2 | TC-BVA-FR01-009 |
| Số chữ số | LB-1 | 0 | TC-BVA-FR01-010 |
| Số chữ số | LB | 1 | TC-BVA-FR01-011 |
| Số chữ số | LB+1 | 2 | TC-BVA-FR01-012 |
| Số ký tự đặc biệt hợp lệ | LB-1 | 0 | TC-BVA-FR01-013 |
| Số ký tự đặc biệt hợp lệ | LB | 1 | TC-BVA-FR01-014 |
| Số ký tự đặc biệt hợp lệ | LB+1 | 2 | TC-BVA-FR01-015 |
| Độ dài Họ Tên sau trim | LB-1 | 0 | TC-BVA-FR01-016 |
| Độ dài Họ Tên sau trim | LB | 1 | TC-BVA-FR01-017 |
| Độ dài Họ Tên sau trim | LB+1 | 2 | TC-BVA-FR01-018 |

Mobile có 18 Boundary Test Values. Ba giá trị cuối là phần bổ sung so với Web và được truy vết trực tiếp tới các testcase Họ Tên.


AI giúp mở rộng nhanh các chuỗi Email sai và giá trị biên Mật khẩu, nhưng dữ liệu kết quả không đồng đều: có lỗi chính tả trạng thái, có test giữ cả `trạng thái thiết kế ban đầu` lẫn kết quả mới, và `TC-BVA-FR01-008` ghi Fail dù Actual Result khớp Expected Result. Human review đã đối chiếu Expected với Actual, chuẩn hóa ca này thành Pass và chỉ lập bug khi hành vi quan sát được trái requirement. Bài học cho phần Mobile là test case phải ghi nhất quán trạng thái, Actual Result và bằng chứng tái hiện.

