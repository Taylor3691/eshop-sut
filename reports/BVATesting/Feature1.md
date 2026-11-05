# Báo cáo Boundary Value Analysis — Feature1

## Phạm vi

- **Requirement:** FR-01 — Đăng ký tài khoản.
- **Nguồn requirement:** `README.md`, mục `FR-01: Đăng ký tài khoản`.
- **Phạm vi kiểm thử:** Chỉ FR-01; không phân tích hoặc tạo test case cho feature khác.
- **Kỹ thuật:** Boundary Value Analysis (BVA).

## 1. Input / Output

### Input / trạng thái đầu vào

- **Họ Tên:** trường bắt buộc phải được cung cấp.
- **Email:** trường bắt buộc, phải có định dạng hợp lệ theo dạng `user@domain.com`.
- **Trạng thái tồn tại của Email:** Email phải là duy nhất trong hệ thống.
- **Mật khẩu:** trường bắt buộc; dài tối thiểu 8 ký tự và có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số, 1 ký tự đặc biệt thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`.

### Output

- **Kết quả đăng ký:** tài khoản được đăng ký khi dữ liệu đáp ứng FR-01.
- **Điều hướng sau đăng ký:** sau khi đăng ký thành công, người dùng được chuyển tới trang Đăng nhập.
- Kết quả hoặc thông báo lỗi cụ thể khi đăng ký thất bại: **Chưa được mô tả trong requirement**.

### Phân loại khả năng áp dụng BVA

- Áp dụng BVA cho **độ dài Họ Tên**. Rule “phải cung cấp” tạo hai partition trực tiếp: rỗng và không rỗng; mốc chuyển tiếp sang giá trị đã được cung cấp là 1 ký tự.
- Áp dụng BVA cho **độ dài Mật khẩu** vì requirement quy định tối thiểu 8 ký tự.
- Áp dụng BVA cho **số chữ hoa, số chữ thường, số chữ số và số ký tự đặc biệt hợp lệ trong Mật khẩu** vì mỗi rule quy định số lượng tối thiểu là 1.
- Không áp dụng BVA cho **Email rỗng/không rỗng** vì giá trị 1 hoặc 2 ký tự vẫn không thể thỏa định dạng Email; không có một chuyển tiếp behavior hợp lệ chỉ dựa trên độ dài tại đó.
- Không áp dụng BVA cho **định dạng Email** hoặc **trạng thái Email duy nhất/trùng** vì đây là các condition phân loại, không có miền giá trị có thứ tự với boundary được FR-01 mô tả.
- Không áp dụng BVA riêng cho rule Mật khẩu bắt buộc vì boundary độ dài tối thiểu 8 đã bao hàm miền Mật khẩu rỗng ở phía dưới; FR-01 không mô tả thêm behavior riêng tại độ dài 0.
- Không xác định giới hạn trên cho Họ Tên, Email hoặc Mật khẩu vì FR-01 không cung cấp maximum.

## 2. Boundary Value Analysis

### Boundary Value Analysis cho độ dài Họ Tên

Từ rule Họ Tên phải được cung cấp, miền hợp lệ trực tiếp suy ra là **độ dài từ 1 ký tự trở lên**. Mốc quan trọng là **Lower Boundary = 1 ký tự**; không có Upper Boundary trong FR-01. Đơn vị bước là **Δ = 1 ký tự**.

Quanh mốc **1**:

**0, 1, 2 ký tự**

Vì vậy tập BVA quan trọng là **0, 1, 2**.

- **0** là ngay dưới boundary, biểu diễn Họ Tên chưa được cung cấp và không hợp lệ.
- **1** là đúng tại boundary, biểu diễn Họ Tên đã được cung cấp.
- **2** là ngay trên boundary và vẫn hợp lệ.

FR-01 không quy định cấu trúc, tập ký tự hoặc độ dài tối đa của Họ Tên; báo cáo không tự thêm các boundary đó.

### Boundary Value Analysis cho độ dài Mật khẩu

Miền hợp lệ là **độ dài Mật khẩu từ 8 ký tự trở lên**. Mốc quan trọng là **Lower Boundary = 8 ký tự**; không có Upper Boundary. Đơn vị bước là **Δ = 1 ký tự**.

Quanh mốc **8**:

**7, 8, 9 ký tự**

Vì vậy tập BVA quan trọng là **7, 8, 9**.

- **7** nằm ngay dưới giới hạn tối thiểu và không hợp lệ.
- **8** nằm đúng tại giới hạn dưới và hợp lệ.
- **9** nằm ngay trên giới hạn dưới và hợp lệ.

Mỗi chuỗi dùng cho boundary độ dài vẫn có chữ hoa, chữ thường, chữ số và ký tự đặc biệt hợp lệ để cô lập rule độ dài.

### Boundary Value Analysis cho số chữ hoa trong Mật khẩu

Miền hợp lệ là **từ 1 chữ hoa trở lên**. Mốc quan trọng là **Lower Boundary = 1 chữ hoa**; không có Upper Boundary. Đơn vị bước là **Δ = 1 chữ hoa**.

Quanh mốc **1**: **0, 1, 2 chữ hoa**.

Tập BVA cuối cùng là **0, 1, 2**: 0 không hợp lệ; 1 hợp lệ đúng tại boundary; 2 hợp lệ ngay trên boundary. Các chuỗi đều dài 12 ký tự và giữ số chữ thường, chữ số, ký tự đặc biệt hợp lệ ở mức từ 2 trở lên.

### Boundary Value Analysis cho số chữ thường trong Mật khẩu

Miền hợp lệ là **từ 1 chữ thường trở lên**. Mốc quan trọng là **Lower Boundary = 1 chữ thường**; không có Upper Boundary. Đơn vị bước là **Δ = 1 chữ thường**.

Quanh mốc **1**: **0, 1, 2 chữ thường**.

Tập BVA cuối cùng là **0, 1, 2**: 0 không hợp lệ; 1 hợp lệ đúng tại boundary; 2 hợp lệ ngay trên boundary. Các chuỗi đều dài 12 ký tự và giữ số chữ hoa, chữ số, ký tự đặc biệt hợp lệ ở mức từ 2 trở lên.

### Boundary Value Analysis cho số chữ số trong Mật khẩu

Miền hợp lệ là **từ 1 chữ số trở lên**. Mốc quan trọng là **Lower Boundary = 1 chữ số**; không có Upper Boundary. Đơn vị bước là **Δ = 1 chữ số**.

Quanh mốc **1**: **0, 1, 2 chữ số**.

Tập BVA cuối cùng là **0, 1, 2**: 0 không hợp lệ; 1 hợp lệ đúng tại boundary; 2 hợp lệ ngay trên boundary. Các chuỗi đều dài 12 ký tự và giữ số chữ hoa, chữ thường, ký tự đặc biệt hợp lệ ở mức từ 2 trở lên.

### Boundary Value Analysis cho số ký tự đặc biệt hợp lệ trong Mật khẩu

Chỉ các ký tự thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&` được tính cho rule này. Miền hợp lệ là **từ 1 ký tự thuộc tập trở lên**. Mốc quan trọng là **Lower Boundary = 1 ký tự đặc biệt hợp lệ**; không có Upper Boundary. Đơn vị bước là **Δ = 1 ký tự**.

Quanh mốc **1**: **0, 1, 2 ký tự đặc biệt hợp lệ**.

Tập BVA cuối cùng là **0, 1, 2**: 0 không hợp lệ; 1 hợp lệ đúng tại boundary; 2 hợp lệ ngay trên boundary. Các chuỗi đều dài 12 ký tự và giữ số chữ hoa, chữ thường, chữ số hợp lệ ở mức từ 2 trở lên.

## 3. Boundary Test Values

| Input / Output | Mô tả | Boundary Position | Value | Expected Behavior |
|---|---|---|---:|---|
| Độ dài Họ Tên | Số ký tự trong Họ Tên bắt buộc | LB-1 | 0 | Invalid — Họ Tên chưa được cung cấp. |
| Độ dài Họ Tên | Số ký tự trong Họ Tên bắt buộc | LB | 1 | Valid — Họ Tên đã được cung cấp. |
| Độ dài Họ Tên | Số ký tự trong Họ Tên bắt buộc | LB+1 | 2 | Valid — Họ Tên đã được cung cấp. |
| Độ dài Mật khẩu | Mật khẩu phải dài tối thiểu 8 ký tự | LB-1 | 7 | Invalid — ngắn hơn giới hạn tối thiểu. |
| Độ dài Mật khẩu | Mật khẩu phải dài tối thiểu 8 ký tự | LB | 8 | Valid — đúng tại giới hạn tối thiểu. |
| Độ dài Mật khẩu | Mật khẩu phải dài tối thiểu 8 ký tự | LB+1 | 9 | Valid — ngay trên giới hạn tối thiểu. |
| Số chữ hoa trong Mật khẩu | Mật khẩu phải có ít nhất 1 chữ hoa | LB-1 | 0 | Invalid — không có chữ hoa. |
| Số chữ hoa trong Mật khẩu | Mật khẩu phải có ít nhất 1 chữ hoa | LB | 1 | Valid — đúng tại số lượng tối thiểu. |
| Số chữ hoa trong Mật khẩu | Mật khẩu phải có ít nhất 1 chữ hoa | LB+1 | 2 | Valid — ngay trên số lượng tối thiểu. |
| Số chữ thường trong Mật khẩu | Mật khẩu phải có ít nhất 1 chữ thường | LB-1 | 0 | Invalid — không có chữ thường. |
| Số chữ thường trong Mật khẩu | Mật khẩu phải có ít nhất 1 chữ thường | LB | 1 | Valid — đúng tại số lượng tối thiểu. |
| Số chữ thường trong Mật khẩu | Mật khẩu phải có ít nhất 1 chữ thường | LB+1 | 2 | Valid — ngay trên số lượng tối thiểu. |
| Số chữ số trong Mật khẩu | Mật khẩu phải có ít nhất 1 chữ số | LB-1 | 0 | Invalid — không có chữ số. |
| Số chữ số trong Mật khẩu | Mật khẩu phải có ít nhất 1 chữ số | LB | 1 | Valid — đúng tại số lượng tối thiểu. |
| Số chữ số trong Mật khẩu | Mật khẩu phải có ít nhất 1 chữ số | LB+1 | 2 | Valid — ngay trên số lượng tối thiểu. |
| Số ký tự đặc biệt hợp lệ trong Mật khẩu | Số ký tự thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&` | LB-1 | 0 | Invalid — không có ký tự đặc biệt thuộc tập được yêu cầu. |
| Số ký tự đặc biệt hợp lệ trong Mật khẩu | Số ký tự thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&` | LB | 1 | Valid — đúng tại số lượng tối thiểu. |
| Số ký tự đặc biệt hợp lệ trong Mật khẩu | Số ký tự thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&` | LB+1 | 2 | Valid — ngay trên số lượng tối thiểu. |

## 4. Valid Representative Values cho các Input khác

| Input | Valid Range / Rule | Giá trị sử dụng | Lý do |
|---|---|---|---|
| Họ Tên | Bắt buộc phải được cung cấp | `Nguyễn Văn An` | Giá trị không rỗng, dễ tái tạo và không sát boundary độ dài; dùng khi kiểm thử Mật khẩu. |
| Email | Bắt buộc, đúng định dạng và duy nhất | `bva.fr01.NNN@example.com` với `NNN` trùng số TC | Mỗi test dùng Email hợp lệ riêng, được xác nhận chưa tồn tại trước khi chạy để tránh các test đăng ký thành công ảnh hưởng lẫn nhau. |
| Mật khẩu | Dài ít nhất 8; có chữ hoa, chữ thường, chữ số và ký tự đặc biệt hợp lệ | `ABCDef12@!IJ` | Dài 12 ký tự; có 6 chữ hoa, 2 chữ thường, 2 chữ số và 2 ký tự đặc biệt hợp lệ; dùng khi kiểm thử Họ Tên. |

**Tiền điều kiện chung:** người dùng đang ở trang Đăng ký. Email cố định của từng test chưa tồn tại trong hệ thống. Mỗi test độc lập; tài khoản tạo thành công phải được hoàn tác sau test để có thể chạy lại với cùng dữ liệu. Các test Mật khẩu dùng Họ Tên `Nguyễn Văn An`; các test Họ Tên dùng Mật khẩu `ABCDef12@!IJ`.

Khi kiểm thử một thuộc tính của Mật khẩu, các thuộc tính còn lại đều hợp lệ. Riêng chuỗi dài 7 ký tự không thể đồng thời đặt cả bốn nhóm ký tự ở mức từ 2 trở lên; chuỗi được chọn vẫn thỏa đầy đủ bốn rule về nhóm ký tự để chỉ vi phạm rule độ dài.

## 5. Test Cases

| TC-ID | Requirement ID | Module / TestType / Technique | Preconditions | Test data | Test steps | Expected result | Status / Related bugs |
|---|---|---|---|---|---|---|---|
| **TC-BVA-FR01-001** | FR-01 | Đăng ký / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `bva.fr01.001@example.com` chưa tồn tại | **Boundary:** Độ dài Họ Tên = 0 (LB-1)<br>**Họ Tên:** `""`<br>**Email:** `bva.fr01.001@example.com`<br>**Mật khẩu:** `ABCDef12@!IJ` | 1. Để trống Họ Tên.<br>2. Nhập Email và Mật khẩu hợp lệ.<br>3. Gửi form đăng ký. | Đăng ký không thành công vì Họ Tên chưa được cung cấp. Nội dung thông báo lỗi chưa được mô tả trong requirement. | Not run / None |
| **TC-BVA-FR01-002** | FR-01 | Đăng ký / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `bva.fr01.002@example.com` chưa tồn tại | **Boundary:** Độ dài Họ Tên = 1 (LB)<br>**Họ Tên:** `A`<br>**Email:** `bva.fr01.002@example.com`<br>**Mật khẩu:** `ABCDef12@!IJ` | 1. Nhập Họ Tên dài 1 ký tự.<br>2. Nhập Email và Mật khẩu hợp lệ.<br>3. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | Not run / None |
| **TC-BVA-FR01-003** | FR-01 | Đăng ký / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `bva.fr01.003@example.com` chưa tồn tại | **Boundary:** Độ dài Họ Tên = 2 (LB+1)<br>**Họ Tên:** `An`<br>**Email:** `bva.fr01.003@example.com`<br>**Mật khẩu:** `ABCDef12@!IJ` | 1. Nhập Họ Tên dài 2 ký tự.<br>2. Nhập Email và Mật khẩu hợp lệ.<br>3. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | Not run / None |
| **TC-BVA-FR01-004** | FR-01 | Đăng ký / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `bva.fr01.004@example.com` chưa tồn tại | **Boundary:** Độ dài Mật khẩu = 7 (LB-1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva.fr01.004@example.com`<br>**Mật khẩu:** `Aaa11@@` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Nhập Mật khẩu dài 7 ký tự, có đủ bốn nhóm ký tự.<br>3. Gửi form đăng ký. | Đăng ký không thành công vì Mật khẩu ngắn hơn 8 ký tự. Nội dung thông báo lỗi chưa được mô tả trong requirement. | Not run / None |
| **TC-BVA-FR01-005** | FR-01 | Đăng ký / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `bva.fr01.005@example.com` chưa tồn tại | **Boundary:** Độ dài Mật khẩu = 8 (LB)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva.fr01.005@example.com`<br>**Mật khẩu:** `AAaa11@@` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Nhập Mật khẩu dài đúng 8 ký tự và thỏa các rule còn lại.<br>3. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | Not run / None |
| **TC-BVA-FR01-006** | FR-01 | Đăng ký / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `bva.fr01.006@example.com` chưa tồn tại | **Boundary:** Độ dài Mật khẩu = 9 (LB+1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva.fr01.006@example.com`<br>**Mật khẩu:** `AAaa11@@b` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Nhập Mật khẩu dài 9 ký tự và thỏa các rule còn lại.<br>3. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | Not run / None |
| **TC-BVA-FR01-007** | FR-01 | Đăng ký / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `bva.fr01.007@example.com` chưa tồn tại | **Boundary:** Số chữ hoa = 0 (LB-1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva.fr01.007@example.com`<br>**Mật khẩu:** `abcdef12@!gh` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Nhập Mật khẩu dài 12 ký tự, có 0 chữ hoa; các thuộc tính khác hợp lệ.<br>3. Gửi form đăng ký. | Đăng ký không thành công vì Mật khẩu không có chữ hoa. Nội dung thông báo lỗi chưa được mô tả trong requirement. | Not run / None |
| **TC-BVA-FR01-008** | FR-01 | Đăng ký / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `bva.fr01.008@example.com` chưa tồn tại | **Boundary:** Số chữ hoa = 1 (LB)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva.fr01.008@example.com`<br>**Mật khẩu:** `Abcdef12@!gh` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Nhập Mật khẩu dài 12 ký tự, có đúng 1 chữ hoa; các thuộc tính khác hợp lệ.<br>3. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | Not run / None |
| **TC-BVA-FR01-009** | FR-01 | Đăng ký / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `bva.fr01.009@example.com` chưa tồn tại | **Boundary:** Số chữ hoa = 2 (LB+1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva.fr01.009@example.com`<br>**Mật khẩu:** `ABcdef12@!gh` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Nhập Mật khẩu dài 12 ký tự, có đúng 2 chữ hoa; các thuộc tính khác hợp lệ.<br>3. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | Not run / None |
| **TC-BVA-FR01-010** | FR-01 | Đăng ký / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `bva.fr01.010@example.com` chưa tồn tại | **Boundary:** Số chữ thường = 0 (LB-1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva.fr01.010@example.com`<br>**Mật khẩu:** `ABCDEF12@!GH` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Nhập Mật khẩu dài 12 ký tự, có 0 chữ thường; các thuộc tính khác hợp lệ.<br>3. Gửi form đăng ký. | Đăng ký không thành công vì Mật khẩu không có chữ thường. Nội dung thông báo lỗi chưa được mô tả trong requirement. | Not run / None |
| **TC-BVA-FR01-011** | FR-01 | Đăng ký / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `bva.fr01.011@example.com` chưa tồn tại | **Boundary:** Số chữ thường = 1 (LB)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva.fr01.011@example.com`<br>**Mật khẩu:** `aBCDEF12@!GH` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Nhập Mật khẩu dài 12 ký tự, có đúng 1 chữ thường; các thuộc tính khác hợp lệ.<br>3. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | Not run / None |
| **TC-BVA-FR01-012** | FR-01 | Đăng ký / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `bva.fr01.012@example.com` chưa tồn tại | **Boundary:** Số chữ thường = 2 (LB+1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva.fr01.012@example.com`<br>**Mật khẩu:** `abCDEF12@!GH` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Nhập Mật khẩu dài 12 ký tự, có đúng 2 chữ thường; các thuộc tính khác hợp lệ.<br>3. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | Not run / None |
| **TC-BVA-FR01-013** | FR-01 | Đăng ký / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `bva.fr01.013@example.com` chưa tồn tại | **Boundary:** Số chữ số = 0 (LB-1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva.fr01.013@example.com`<br>**Mật khẩu:** `ABCDefgh@!IJ` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Nhập Mật khẩu dài 12 ký tự, có 0 chữ số; các thuộc tính khác hợp lệ.<br>3. Gửi form đăng ký. | Đăng ký không thành công vì Mật khẩu không có chữ số. Nội dung thông báo lỗi chưa được mô tả trong requirement. | Not run / None |
| **TC-BVA-FR01-014** | FR-01 | Đăng ký / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `bva.fr01.014@example.com` chưa tồn tại | **Boundary:** Số chữ số = 1 (LB)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva.fr01.014@example.com`<br>**Mật khẩu:** `ABCDefg1@!IJ` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Nhập Mật khẩu dài 12 ký tự, có đúng 1 chữ số; các thuộc tính khác hợp lệ.<br>3. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | Not run / None |
| **TC-BVA-FR01-015** | FR-01 | Đăng ký / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `bva.fr01.015@example.com` chưa tồn tại | **Boundary:** Số chữ số = 2 (LB+1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva.fr01.015@example.com`<br>**Mật khẩu:** `ABCDef12@!IJ` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Nhập Mật khẩu dài 12 ký tự, có đúng 2 chữ số; các thuộc tính khác hợp lệ.<br>3. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | Not run / None |
| **TC-BVA-FR01-016** | FR-01 | Đăng ký / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `bva.fr01.016@example.com` chưa tồn tại | **Boundary:** Số ký tự đặc biệt hợp lệ = 0 (LB-1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva.fr01.016@example.com`<br>**Mật khẩu:** `ABCDefgh12IJ` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Nhập Mật khẩu dài 12 ký tự, không có ký tự thuộc tập đặc biệt được yêu cầu; các thuộc tính khác hợp lệ.<br>3. Gửi form đăng ký. | Đăng ký không thành công vì Mật khẩu không có ký tự đặc biệt thuộc tập được yêu cầu. Nội dung thông báo lỗi chưa được mô tả trong requirement. | Not run / None |
| **TC-BVA-FR01-017** | FR-01 | Đăng ký / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `bva.fr01.017@example.com` chưa tồn tại | **Boundary:** Số ký tự đặc biệt hợp lệ = 1 (LB)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva.fr01.017@example.com`<br>**Mật khẩu:** `ABCDefg12@IJ` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Nhập Mật khẩu dài 12 ký tự, có đúng 1 ký tự đặc biệt hợp lệ; các thuộc tính khác hợp lệ.<br>3. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | Not run / None |
| **TC-BVA-FR01-018** | FR-01 | Đăng ký / Functional / Boundary Value Analysis | Theo tiền điều kiện chung; `bva.fr01.018@example.com` chưa tồn tại | **Boundary:** Số ký tự đặc biệt hợp lệ = 2 (LB+1)<br>**Họ Tên:** `Nguyễn Văn An`<br>**Email:** `bva.fr01.018@example.com`<br>**Mật khẩu:** `ABCDef12@!IJ` | 1. Nhập Họ Tên và Email hợp lệ.<br>2. Nhập Mật khẩu dài 12 ký tự, có đúng 2 ký tự đặc biệt hợp lệ; các thuộc tính khác hợp lệ.<br>3. Gửi form đăng ký. | Đăng ký thành công và người dùng được chuyển tới trang Đăng nhập. | Not run / None |

## 6. Boundary Coverage Matrix

| Input / Output | Boundary Position | Boundary Value | Test Case cover |
|---|---|---:|---|
| Độ dài Họ Tên | LB-1 | 0 | TC-BVA-FR01-001 |
| Độ dài Họ Tên | LB | 1 | TC-BVA-FR01-002 |
| Độ dài Họ Tên | LB+1 | 2 | TC-BVA-FR01-003 |
| Độ dài Mật khẩu | LB-1 | 7 | TC-BVA-FR01-004 |
| Độ dài Mật khẩu | LB | 8 | TC-BVA-FR01-005 |
| Độ dài Mật khẩu | LB+1 | 9 | TC-BVA-FR01-006 |
| Số chữ hoa trong Mật khẩu | LB-1 | 0 | TC-BVA-FR01-007 |
| Số chữ hoa trong Mật khẩu | LB | 1 | TC-BVA-FR01-008 |
| Số chữ hoa trong Mật khẩu | LB+1 | 2 | TC-BVA-FR01-009 |
| Số chữ thường trong Mật khẩu | LB-1 | 0 | TC-BVA-FR01-010 |
| Số chữ thường trong Mật khẩu | LB | 1 | TC-BVA-FR01-011 |
| Số chữ thường trong Mật khẩu | LB+1 | 2 | TC-BVA-FR01-012 |
| Số chữ số trong Mật khẩu | LB-1 | 0 | TC-BVA-FR01-013 |
| Số chữ số trong Mật khẩu | LB | 1 | TC-BVA-FR01-014 |
| Số chữ số trong Mật khẩu | LB+1 | 2 | TC-BVA-FR01-015 |
| Số ký tự đặc biệt hợp lệ trong Mật khẩu | LB-1 | 0 | TC-BVA-FR01-016 |
| Số ký tự đặc biệt hợp lệ trong Mật khẩu | LB | 1 | TC-BVA-FR01-017 |
| Số ký tự đặc biệt hợp lệ trong Mật khẩu | LB+1 | 2 | TC-BVA-FR01-018 |

Tất cả 18 Boundary Test Value quan trọng đều có test case cover.

## 7. Output Boundary Analysis

Không xác định Output Boundary từ requirement. Kết quả đăng ký thành công/thất bại và hành động chuyển trang là các trạng thái rời rạc; FR-01 không mô tả output có miền giá trị có thứ tự hoặc công thức Input → Output để xác định boundary.

## 8. BVA Summary

```text
Total Inputs / Outputs reviewed: 6 (4 Inputs/states, 2 Outputs)
Total Inputs / Outputs applicable to BVA: 2 Inputs, represented by 6 ordered measures
Total boundary points identified: 6 lower boundary points
Total boundary test values: 18
Total test cases generated: 18
Uncovered boundary values: 0
```

### Giới hạn của requirement

- Upper Boundary của độ dài Họ Tên, Email và Mật khẩu: **Chưa được mô tả trong requirement**.
- Quy tắc cấu trúc, tập ký tự và xử lý khoảng trắng của Họ Tên: **Chưa được mô tả trong requirement**.
- Độ dài tối thiểu/tối đa của Email và đặc tả đầy đủ về format Email: **Chưa được mô tả trong requirement**; ví dụ `user@domain.com` không đủ căn cứ để tạo boundary độ dài.
- Tính phân biệt hoa thường khi kiểm tra Email duy nhất: **Chưa được mô tả trong requirement**.
- Nội dung thông báo hoặc behavior chi tiết khi đăng ký thất bại: **Chưa được mô tả trong requirement**.

### Kiểm tra chất lượng cuối cùng

- [x] Tất cả rule của FR-01 có khả năng tạo boundary đã được xem xét.
- [x] Không tự thêm minimum, maximum hoặc thay đổi toán tử của requirement.
- [x] Condition và partition đã được phân tích trước khi xác định boundary.
- [x] Chỉ các miền có thứ tự và có boundary trực tiếp từ FR-01 mới được áp dụng BVA.
- [x] Đơn vị bước là 1 ký tự hoặc 1 lần xuất hiện, phù hợp với đại lượng đếm nguyên.
- [x] Đã xác định giá trị ngay trước, tại và ngay sau mỗi Lower Boundary.
- [x] Các input/thuộc tính khác được giữ hợp lệ khi kiểm thử từng boundary.
- [x] Expected result không tự đặt nội dung thông báo lỗi.
- [x] Mỗi Boundary Test Value trace được tới đúng test case.
- [x] Không có Boundary Test Value quan trọng nào chưa được cover.
- [x] Đã xem xét và kết luận không có Output Boundary từ FR-01.
