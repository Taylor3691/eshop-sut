# Domain Testing — Feature1: FR-01 Đăng ký tài khoản

## Phạm vi và phân tích requirement

Nguồn requirement: `README.md`, mục **FR-01: Đăng ký tài khoản**.

Các rule được trích xuất:

1. Người dùng phải cung cấp Họ Tên, Email và Mật khẩu.
2. Email phải có định dạng hợp lệ theo dạng `user@domain.com`.
3. Email phải là duy nhất trong hệ thống.
4. Mật khẩu có ít nhất 8 ký tự.
5. Mật khẩu có ít nhất 1 chữ hoa.
6. Mật khẩu có ít nhất 1 chữ thường.
7. Mật khẩu có ít nhất 1 chữ số.
8. Mật khẩu có ít nhất 1 ký tự đặc biệt thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`.
9. Sau khi đăng ký thành công, người dùng được chuyển tới trang Đăng nhập.

Chỉ FR-01 được phân tích. Các yêu cầu của FR-02 đến FR-24 và SEC-01 đến SEC-07 không được đưa vào test này. Requirement chưa mô tả giới hạn độ dài/định dạng của Họ Tên; cách xử lý khoảng trắng; độ dài tối đa của Email/Mật khẩu; tính phân biệt hoa thường của Email; nội dung thông báo lỗi; hoặc hành vi cụ thể của hệ thống khi đăng ký thất bại. Vì vậy báo cáo không tự bổ sung các rule này.

## 1. Input / Output

**Input:**

- Họ Tên: dữ liệu người dùng nhập, bắt buộc phải được cung cấp.
- Email: dữ liệu người dùng nhập, bắt buộc, đúng định dạng và chưa tồn tại trong hệ thống.
- Mật khẩu: dữ liệu người dùng nhập, bắt buộc và phải đồng thời thỏa mãn các yêu cầu mật khẩu mạnh.
- Trạng thái hệ thống liên quan: Email đã tồn tại hay chưa tồn tại trong hệ thống.

**Output:**

- Khi đăng ký thành công, tài khoản được đăng ký và người dùng được chuyển tới trang Đăng nhập.
- Kết quả/thông báo cụ thể khi đăng ký thất bại: **Chưa được mô tả trong requirement**.

---

## 2. Xác định condition

| Condition ID | Input/Output | Điều kiện |
|---|---|---|
| C1 | Họ Tên | Phải được cung cấp (không rỗng) |
| C2 | Email | Phải được cung cấp (không rỗng) |
| C3 | Email | Email không rỗng phải có định dạng hợp lệ theo dạng `user@domain.com` |
| C4 | Email / Trạng thái hệ thống | Email hợp lệ phải là duy nhất, tức chưa tồn tại trong hệ thống |
| C5 | Mật khẩu | Phải được cung cấp (không rỗng) |
| C6 | Mật khẩu | Mật khẩu không rỗng phải có độ dài tối thiểu 8 ký tự |
| C7 | Mật khẩu | Mật khẩu không rỗng có ít nhất 1 chữ hoa |
| C8 | Mật khẩu | Mật khẩu không rỗng có ít nhất 1 chữ thường |
| C9 | Mật khẩu | Mật khẩu không rỗng có ít nhất 1 chữ số |
| C10 | Mật khẩu | Mật khẩu không rỗng có ít nhất 1 ký tự thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&` |
| C11 | Output | Khi tất cả dữ liệu hợp lệ và Email là duy nhất, đăng ký thành công và chuyển tới trang Đăng nhập |

Các condition về sự hiện diện, định dạng, tính duy nhất, độ dài và từng nhóm ký tự được tách độc lập để mỗi miền không hợp lệ có thể được kiểm thử riêng.

## 3. Equivalence Class Table

| EC ID | Input/Output | Equivalence Class | Loại |
|---|---|---|---|
| EC1 | Họ Tên / C1 | Họ Tên không rỗng | Valid |
| EC2 | Họ Tên / C1 | Họ Tên rỗng | Invalid |
| EC3 | Email / C2 | Email không rỗng | Valid |
| EC4 | Email / C2 | Email rỗng | Invalid |
| EC5 | Email / C3 | Email không rỗng có định dạng hợp lệ theo dạng `user@domain.com` | Valid |
| EC6 | Email / C3 | Email không rỗng có định dạng không hợp lệ | Invalid |
| EC7 | Email / C4 | Email hợp lệ chưa tồn tại trong hệ thống | Valid |
| EC8 | Email / C4 | Email hợp lệ đã tồn tại trong hệ thống | Invalid |
| EC9 | Mật khẩu / C5 | Mật khẩu không rỗng | Valid |
| EC10 | Mật khẩu / C5 | Mật khẩu rỗng | Invalid |
| EC11 | Mật khẩu / C6 | Mật khẩu không rỗng có độ dài từ 8 ký tự trở lên | Valid |
| EC12 | Mật khẩu / C6 | Mật khẩu không rỗng có độ dài từ 1 đến 7 ký tự | Invalid |
| EC13 | Mật khẩu / C7 | Mật khẩu không rỗng có ít nhất 1 chữ hoa | Valid |
| EC14 | Mật khẩu / C7 | Mật khẩu không rỗng nhưng không có chữ hoa | Invalid |
| EC15 | Mật khẩu / C8 | Mật khẩu không rỗng có ít nhất 1 chữ thường | Valid |
| EC16 | Mật khẩu / C8 | Mật khẩu không rỗng nhưng không có chữ thường | Invalid |
| EC17 | Mật khẩu / C9 | Mật khẩu không rỗng có ít nhất 1 chữ số | Valid |
| EC18 | Mật khẩu / C9 | Mật khẩu không rỗng nhưng không có chữ số | Invalid |
| EC19 | Mật khẩu / C10 | Mật khẩu không rỗng có ít nhất 1 ký tự thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&` | Valid |
| EC20 | Mật khẩu / C10 | Mật khẩu không rỗng nhưng không có ký tự nào thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&` | Invalid |
| EC21 | Output / C11 | Tất cả dữ liệu hợp lệ, Email duy nhất; đăng ký thành công và chuyển tới trang Đăng nhập | Valid |

Các lớp của từng condition bao phủ toàn bộ miền cần xét theo FR-01. Với C3, C4 và C6, miền được giới hạn theo điều kiện tiền đề “không rỗng” hoặc “hợp lệ” để tránh chồng lấn vô lý với các lớp bắt buộc C2/C5 và lớp định dạng C3. C11 chỉ có Valid EC vì requirement không quy định một miền output thất bại cụ thể.

## 4. Representative Values

Giả định dữ liệu nền: `existing@example.com` đã tồn tại; `new.user@example.com` chưa tồn tại trong hệ thống.

| EC ID | Equivalence Class | Loại | Representative Value |
|---|---|---|---|
| EC1 | Họ Tên không rỗng | Valid | `Nguyễn Văn An` |
| EC2 | Họ Tên rỗng | Invalid | Chuỗi rỗng `""` |
| EC3 | Email không rỗng | Valid | `new.user@example.com` |
| EC4 | Email rỗng | Invalid | Chuỗi rỗng `""` |
| EC5 | Email đúng định dạng | Valid | `new.user@example.com` |
| EC6 | Email sai định dạng | Invalid | `new.user.example.com` |
| EC7 | Email hợp lệ chưa tồn tại | Valid | `new.user@example.com` |
| EC8 | Email hợp lệ đã tồn tại | Invalid | `existing@example.com` |
| EC9 | Mật khẩu không rỗng | Valid | `Abcdef1@` |
| EC10 | Mật khẩu rỗng | Invalid | Chuỗi rỗng `""` |
| EC11 | Độ dài từ 8 ký tự trở lên | Valid | `Abcdef1@` (8 ký tự) |
| EC12 | Độ dài từ 1 đến 7 ký tự | Invalid | `Aa1@` (4 ký tự) |
| EC13 | Có chữ hoa | Valid | `Abcdef1@` |
| EC14 | Không có chữ hoa | Invalid | `abcdef1@` |
| EC15 | Có chữ thường | Valid | `Abcdef1@` |
| EC16 | Không có chữ thường | Invalid | `ABCDEF1@` |
| EC17 | Có chữ số | Valid | `Abcdef1@` |
| EC18 | Không có chữ số | Invalid | `Abcdefg@` |
| EC19 | Có ký tự đặc biệt thuộc tập cho phép | Valid | `Abcdef1@` |
| EC20 | Không có ký tự đặc biệt thuộc tập cho phép | Invalid | `Abcdef12` |
| EC21 | Đăng ký thành công và chuyển tới trang Đăng nhập | Valid | Họ Tên `Nguyễn Văn An`; Email `new.user@example.com`; Mật khẩu `Abcdef1@` |

---

## 5. Test Cases

| TC-ID | Requirement ID | Module / TestType / Technique | Preconditions | Test data | Test steps | Expected result | Status/ Relate bugs |
| --- | :-- | --- | --- | --- | --- | --- | --- |
| **TC-REG-001** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Email `new.user@example.com` chưa tồn tại trong hệ thống.<br>Người dùng đang ở trang Đăng ký. | **Họ Tên:** `Nguyễn Văn An`<br>**Email:** `new.user@example.com`<br>**Mật khẩu:** `Abcdef1@` | 1. Nhập Họ Tên.<br>2. Nhập Email.<br>3. Nhập Mật khẩu.<br>4. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | Not run/None |
| **TC-REG-002** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Email `new.user@example.com` chưa tồn tại trong hệ thống.<br>Người dùng đang ở trang Đăng ký. | **Họ Tên:** `""`<br>**Email:** `new.user@example.com`<br>**Mật khẩu:** `Abcdef1@` | 1. Để trống Họ Tên.<br>2. Nhập Email và Mật khẩu hợp lệ.<br>3. Gửi form đăng ký. | Không đăng ký thành công do Họ Tên chưa được cung cấp. Nội dung thông báo lỗi chưa được mô tả trong requirement. | Not run/None |
| **TC-REG-003** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Người dùng đang ở trang Đăng ký. | **Họ Tên:** `Nguyễn Văn An`<br>**Email:** `""`<br>**Mật khẩu:** `Abcdef1@` | 1. Nhập Họ Tên hợp lệ.<br>2. Để trống Email.<br>3. Nhập Mật khẩu hợp lệ.<br>4. Gửi form đăng ký. | Không đăng ký thành công do Email chưa được cung cấp. Nội dung thông báo lỗi chưa được mô tả trong requirement. | Not run/None |
| **TC-REG-004** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Người dùng đang ở trang Đăng ký. | **Họ Tên:** `Nguyễn Văn An`<br>**Email:** `new.user.example.com`<br>**Mật khẩu:** `Abcdef1@` | 1. Nhập Họ Tên hợp lệ.<br>2. Nhập Email sai định dạng.<br>3. Nhập Mật khẩu hợp lệ.<br>4. Gửi form đăng ký. | Không đăng ký thành công do Email không có định dạng hợp lệ. Nội dung thông báo lỗi chưa được mô tả trong requirement. | Not run/None |
| **TC-REG-005** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Email `existing@example.com` đã tồn tại trong hệ thống.<br>Người dùng đang ở trang Đăng ký. | **Họ Tên:** `Nguyễn Văn An`<br>**Email:** `existing@example.com`<br>**Mật khẩu:** `Abcdef1@` | 1. Nhập Họ Tên hợp lệ.<br>2. Nhập Email hợp lệ đã tồn tại.<br>3. Nhập Mật khẩu hợp lệ.<br>4. Gửi form đăng ký. | Không đăng ký thành công do Email không duy nhất. Nội dung thông báo lỗi chưa được mô tả trong requirement. | Not run/None |
| **TC-REG-006** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Email `new.user@example.com` chưa tồn tại trong hệ thống.<br>Người dùng đang ở trang Đăng ký. | **Họ Tên:** `Nguyễn Văn An`<br>**Email:** `new.user@example.com`<br>**Mật khẩu:** `""` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Để trống Mật khẩu.<br>3. Gửi form đăng ký. | Không đăng ký thành công do Mật khẩu chưa được cung cấp. Nội dung thông báo lỗi chưa được mô tả trong requirement. | Not run/None |
| **TC-REG-007** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Email `new.user@example.com` chưa tồn tại trong hệ thống.<br>Người dùng đang ở trang Đăng ký. | **Họ Tên:** `Nguyễn Văn An`<br>**Email:** `new.user@example.com`<br>**Mật khẩu:** `Aa1@` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Nhập Mật khẩu dài 4 ký tự nhưng có đủ chữ hoa, chữ thường, chữ số và ký tự đặc biệt hợp lệ.<br>3. Gửi form đăng ký. | Không đăng ký thành công do Mật khẩu có ít hơn 8 ký tự. Nội dung thông báo lỗi chưa được mô tả trong requirement. | Not run/None |
| **TC-REG-008** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Email `new.user@example.com` chưa tồn tại trong hệ thống.<br>Người dùng đang ở trang Đăng ký. | **Họ Tên:** `Nguyễn Văn An`<br>**Email:** `new.user@example.com`<br>**Mật khẩu:** `abcdef1@` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Nhập Mật khẩu không có chữ hoa; các điều kiện mật khẩu khác hợp lệ.<br>3. Gửi form đăng ký. | Không đăng ký thành công do Mật khẩu không có chữ hoa. Nội dung thông báo lỗi chưa được mô tả trong requirement. | Not run/None |
| **TC-REG-009** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Email `new.user@example.com` chưa tồn tại trong hệ thống.<br>Người dùng đang ở trang Đăng ký. | **Họ Tên:** `Nguyễn Văn An`<br>**Email:** `new.user@example.com`<br>**Mật khẩu:** `ABCDEF1@` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Nhập Mật khẩu không có chữ thường; các điều kiện mật khẩu khác hợp lệ.<br>3. Gửi form đăng ký. | Không đăng ký thành công do Mật khẩu không có chữ thường. Nội dung thông báo lỗi chưa được mô tả trong requirement. | Not run/None |
| **TC-REG-010** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Email `new.user@example.com` chưa tồn tại trong hệ thống.<br>Người dùng đang ở trang Đăng ký. | **Họ Tên:** `Nguyễn Văn An`<br>**Email:** `new.user@example.com`<br>**Mật khẩu:** `Abcdefg@` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Nhập Mật khẩu không có chữ số; các điều kiện mật khẩu khác hợp lệ.<br>3. Gửi form đăng ký. | Không đăng ký thành công do Mật khẩu không có chữ số. Nội dung thông báo lỗi chưa được mô tả trong requirement. | Not run/None |
| **TC-REG-011** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Email `new.user@example.com` chưa tồn tại trong hệ thống.<br>Người dùng đang ở trang Đăng ký. | **Họ Tên:** `Nguyễn Văn An`<br>**Email:** `new.user@example.com`<br>**Mật khẩu:** `Abcdef12` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Nhập Mật khẩu không có ký tự nào thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`; các điều kiện mật khẩu khác hợp lệ.<br>3. Gửi form đăng ký. | Không đăng ký thành công do Mật khẩu không có ký tự đặc biệt thuộc tập được yêu cầu. Nội dung thông báo lỗi chưa được mô tả trong requirement. | Not run/None |

### Kết quả rút gọn test case

- Một test hợp lệ duy nhất (`TC-REG-001`) đồng thời cover các Valid EC tương thích.
- Mỗi Invalid EC được cô lập trong một test; tất cả input và condition còn lại dùng giá trị hợp lệ.
- Không có test nào trùng dữ liệu, expected result và EC coverage hoàn toàn với test khác; không thể loại thêm test mà không làm mất EC coverage.

---

## 7. EC Coverage Matrix

| EC ID | Loại | Test Case cover |
|---|---|---|
| EC1 | Valid | TC-REG-001, TC-REG-003 đến TC-REG-011 |
| EC2 | Invalid | TC-REG-002 |
| EC3 | Valid | TC-REG-001, TC-REG-002, TC-REG-004 đến TC-REG-011 |
| EC4 | Invalid | TC-REG-003 |
| EC5 | Valid | TC-REG-001, TC-REG-002, TC-REG-005 đến TC-REG-011 |
| EC6 | Invalid | TC-REG-004 |
| EC7 | Valid | TC-REG-001, TC-REG-002, TC-REG-006 đến TC-REG-011 |
| EC8 | Invalid | TC-REG-005 |
| EC9 | Valid | TC-REG-001 đến TC-REG-005, TC-REG-007 đến TC-REG-011 |
| EC10 | Invalid | TC-REG-006 |
| EC11 | Valid | TC-REG-001 đến TC-REG-005, TC-REG-008 đến TC-REG-011 |
| EC12 | Invalid | TC-REG-007 |
| EC13 | Valid | TC-REG-001 đến TC-REG-005, TC-REG-007, TC-REG-009 đến TC-REG-011 |
| EC14 | Invalid | TC-REG-008 |
| EC15 | Valid | TC-REG-001 đến TC-REG-005, TC-REG-007, TC-REG-008, TC-REG-010, TC-REG-011 |
| EC16 | Invalid | TC-REG-009 |
| EC17 | Valid | TC-REG-001 đến TC-REG-005, TC-REG-007 đến TC-REG-009, TC-REG-011 |
| EC18 | Invalid | TC-REG-010 |
| EC19 | Valid | TC-REG-001 đến TC-REG-005, TC-REG-007 đến TC-REG-010 |
| EC20 | Invalid | TC-REG-011 |
| EC21 | Valid | TC-REG-001 |

Tất cả 21 EC đều được ít nhất một test case cover.

---

## 8. Kiểm tra chất lượng cuối cùng

### Requirement coverage

- [x] Tất cả rule của FR-01 đã được phân tích.
- [x] Không bổ sung business rule hoặc validation rule không có căn cứ.
- [x] Không phân tích feature khác.

### Input / Output và condition

- [x] Đã xác định đầy đủ input, trạng thái hệ thống liên quan và output của FR-01.
- [x] Các rule phức hợp của Mật khẩu đã được tách thành condition độc lập.
- [x] Những thông tin requirement chưa mô tả đã được ghi rõ.

### Equivalence Class và representative value

- [x] Mỗi condition có ít nhất một EC.
- [x] Có Valid EC và các Invalid EC có thể xác định từ requirement.
- [x] Các EC của cùng condition rõ ràng, không chồng lấn vô lý và bao phủ miền cần xét.
- [x] Mỗi EC có ít nhất một representative value thuộc đúng lớp.

### Test case, rút gọn và coverage

- [x] Các Valid EC tương thích được kết hợp trong test đăng ký thành công.
- [x] Mỗi test không hợp lệ chỉ kiểm tra một Invalid EC; các input/condition còn lại hợp lệ.
- [x] Expected result bám sát FR-01 và không tự đặt nội dung thông báo lỗi.
- [x] Đã kiểm tra trùng lặp và rút gọn mà không làm mất coverage.
- [x] Mọi EC đều được ít nhất một test case cover.
