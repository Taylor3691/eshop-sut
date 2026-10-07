
# Agent Skill: Domain Testing bằng Phân hoạch tương đương

# 1. Mục tiêu

Skill này dùng để giải quyết **Requirement 1 – Domain Testing** bằng kỹ thuật
**Phân hoạch tương đương (Equivalence Partitioning - EP)**.

Mục tiêu là hướng dẫn AI thực hiện đầy đủ từng bước của kỹ thuật thay vì đi thẳng từ requirement sang test case.

Luồng tổng quát:

```text
Requirement
    ↓
Phân tích Requirement
    ↓
Xác định Input / Output
    ↓
Xác định Condition / Constraint
    ↓
Xác định Equivalence Classes
    ↓
Chọn Representative Values
    ↓
Sinh Test Cases
    ↓
Rút gọn Test Cases
    ↓
Kiểm tra EC Coverage
    ↓
Xuất báo cáo Domain Testing
```

# 2. Input cần cung cấp

Agent nhận **Feature cần kiểm thử** từ prompt của người dùng.

Requirement của Feature phải được đọc từ file `README.md` tại thư mục gốc của project.

Agent chỉ phân tích Feature được yêu cầu và bỏ qua các Feature khác. Nếu requirement tham chiếu đến tài liệu khác trong project, Agent được phép đọc thêm các file liên quan.

Không tự bổ sung Business Rule hoặc Validation Rule không có căn cứ trong requirement.

Nếu thiếu thông tin cần thiết, ghi rõ: Chưa được mô tả trong requirement

---


# 3. Quy trình thực hiện
## Step 1 – Phân tích Requirement

Đọc kỹ requirement và trích xuất các rule có liên quan đến hành vi cần kiểm thử.

Cần xác định:

- dữ liệu người dùng nhập;
- tham số đầu vào;
- lựa chọn dropdown/radio/checkbox;
- trạng thái hệ thống ảnh hưởng tới requirement;
- điều kiện hợp lệ;
- điều kiện không hợp lệ;
- kết quả mong đợi;
- thông báo lỗi;
- các ràng buộc liên quan.

### Quy tắc

Không sinh test case ngay ở bước này.

Không suy đoán rule chưa được mô tả.

Nếu requirement có nhiều câu hoặc nhiều rule, phải tách chúng ra trước khi phân hoạch.

---

## Step 2 – Xác định Input và Output

Dựa trực tiếp vào requirement để xác định tất cả biến đầu vào và đầu ra liên quan.

**Mục đích:** Biết feature nhận dữ liệu gì và tạo ra kết quả gì trước khi chia lớp.

### Input có thể bao gồm

- Text field
- Number field
- Password
- Email
- Date
- Dropdown
- Radio button
- Checkbox
- File
- Trạng thái tài khoản
- Trạng thái đơn hàng

### Output có thể bao gồm

- Kết quả xử lý thành công
- Giá trị được tính toán
- Dữ liệu được lưu
- Trạng thái mới
- Thông báo thành công
- Thông báo lỗi
- Hành động bị từ chối
- .....

### Ví dụ:

```text
Input: Email, Mật khẩu hợp lệ, Họ tên
Output: Tạo tài khoản thành công và chuyển tới trang Đăng nhập
```
---

## Step 3 – Xác định các Condition

Với từng Input và Output, xác định các điều kiện độc lập.

Một Input có thể có nhiều condition.

### Ví dụ

Requirement:

```text
Username phải dài từ 5 đến 20 ký tự và chỉ chứa chữ cái hoặc chữ số.
```

Phải tách thành:

```text
C1 – Độ dài:
5 <= length(username) <= 20

C2 – Định dạng ký tự:
Username chỉ chứa chữ cái hoặc chữ số
```

Không gộp hai condition khác bản chất thành một lớp duy nhất.

### Output bắt buộc

| Condition ID | Input/Output | Điều kiện |
|---|---|---|
| C1 | Username | 5 <= length <= 20 |
| C2 | Username | Chỉ chứa chữ và số |

---

## Step 4 – Xác định Equivalence Classes

Với mỗi condition, chia miền dữ liệu thành các lớp có cùng hành vi.

Mỗi lớp phải được phân loại:

- **Valid EC**
- **Invalid EC**

Gán mã:

```text
EC1
EC2
EC3
...
```

---

### 4.1. Rule cho một giá trị cụ thể

Ví dụ:

```text
Role = Customer
```

Phân hoạch:

```text
EC1: Role = Customer       → Valid
EC2: Role != Customer      → Invalid
```

---

### 4.2. Rule cho một khoảng giá trị

Ví dụ:

```text
1 <= Quantity <= 100
```

Phân hoạch:

```text
EC1: 1 <= Quantity <= 100  → Valid
EC2: Quantity < 1          → Invalid
EC3: Quantity > 100        → Invalid
```

Với một khoảng liên tục có giới hạn dưới và trên, thông thường phải xem xét:

- miền hợp lệ;
- miền nhỏ hơn giới hạn dưới;
- miền lớn hơn giới hạn trên.

---

### 4.3. Rule cho một tập giá trị

Ví dụ:

```text
PaymentMethod ∈ {COD, VISA, MOMO}
```

Phân hoạch:

```text
EC1: COD
EC2: VISA
EC3: MOMO
EC4: Giá trị ngoài {COD, VISA, MOMO}
```

Nếu các giá trị hợp lệ dẫn đến hành vi khác nhau thì giữ chúng thành các EC riêng.

Nếu chúng hoàn toàn có cùng hành vi thì có thể nhóm lại, nhưng phải giải thích.

---

### 4.4. Rule Boolean hoặc kiểu dữ liệu

Ví dụ:

```text
Age phải là số nguyên
```

Phân hoạch:

```text
EC1: Age là số nguyên            → Valid
EC2: Age không phải số nguyên    → Invalid
```

---

### 4.5. Nhiều điều kiện trên cùng một Input

Ví dụ:

```text
Username:
- dài 5–20 ký tự;
- chỉ chứa chữ và số.
```

Phân hoạch theo từng condition:

```text
C1 – Length
EC1: 5 <= length <= 20          → Valid
EC2: length < 5                 → Invalid
EC3: length > 20                → Invalid

C2 – Character
EC4: chỉ chứa chữ và số         → Valid
EC5: chứa ký tự không hợp lệ    → Invalid
```

---

## Step 5 – Lập bảng Equivalence Class

Tổng hợp toàn bộ EC vào bảng.

### Format bắt buộc

| EC ID | Input/Output | Equivalence Class | Loại |
|---|---|---|---|
| EC1 | ... | C1 | ... | Valid |
| EC2 | ... | C1 | ... | Invalid |

### Kiểm tra

Agent phải xác nhận:

- không bỏ sót condition;
- mỗi condition có ít nhất một EC;
- các EC của cùng một condition phải bao phủ toàn bộ miền dữ liệu cần xét;
- các EC không được mô tả mơ hồ hoặc chồng lấn vô lý.

---

## Step 6 – Chọn Representative Value

Với mỗi Equivalence Class, chọn ít nhất một giá trị đại diện.

Mục tiêu là dùng một giá trị đại diện để kiểm thử hành vi của cả lớp.

### Ví dụ

```text
EC1: -99 <= A <= 99
Representative Value: 10

EC2: A < -99
Representative Value: -102

EC3: A > 99
Representative Value: 102

EC4: A không phải số nguyên
Representative Value: "abc"
```

### Quy tắc

- Giá trị phải thật sự thuộc EC đó.
- Không chọn giá trị nằm ở EC khác.
- Nếu chưa thực hiện Boundary Value Analysis, không cần cố tình chọn toàn bộ giá trị biên.
- Giá trị phải đơn giản, dễ hiểu và dễ tái tạo.

### Output bắt buộc

| EC ID | Equivalence Class | Loại | Representative Value |
|---|---|---|---|
| EC1 | ... | Valid | ... |
| EC2 | ... | Invalid | ... |

---

## Step 7 – Sinh Test Case

Từ các EC và representative values, thiết kế test case.

### Nguyên tắc 1 – Valid EC

Một test case có thể đồng thời bao phủ nhiều Valid EC của nhiều Input.

Ví dụ:

```text
Username = valid
Password = valid
Age = valid
```

Test này có thể cùng lúc cover nhiều Valid EC.

---

### Nguyên tắc 2 – Invalid EC

Tại một thời điểm, một test case chỉ nên kiểm thử **một Invalid EC**.

Khi kiểm thử một Invalid EC của một Input, tất cả Input khác phải dùng giá trị hợp lệ.

Ví dụ đang kiểm thử:

```text
EC7: Password có độ dài < 8
```

Thì:

```text
Username = Valid
Password = Invalid
Age      = Valid
```

Không tạo:

```text
Username = Invalid
Password = Invalid
Age      = Invalid
```

vì khi test fail sẽ không xác định được invalid condition nào gây ra kết quả.

---

### Nguyên tắc 3 – Expected Result

Expected Result phải xuất phát từ requirement.

Không tự viết message cụ thể nếu requirement chỉ nói chung là "hiển thị lỗi".

Ví dụ requirement chỉ quy định:

```text
The system displays an error.
```

thì Expected Result nên là:

```text
Hệ thống từ chối dữ liệu và hiển thị thông báo lỗi phù hợp.
```

Không tự tạo:

```text
"Password must contain at least 8 characters."
```

nếu requirement không cung cấp chính xác nội dung message đó.

---

### Format Test Case

| TC-ID | Requirement ID | Module / TestType / Technique | Preconditions | Test data | Test steps | Expectect result |

---

Ví dụ mẫu cho một TestCase:

| TC-ID | Requirement ID | Module / TestType / Technique | Preconditions | Test data | Test steps | Expected result |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-LOGIN-001** | FR-LOGIN-01 | Login / Functional / Equivalence Partitioning | - User đã có tài khoản hợp lệ<br>- User đang ở trang Login | **Email:** user01@gmail.com<br>**Password:** Abc@123456 | 1. Mở trang Login<br>2. Nhập email và password hợp lệ<br>3. Bấm Login | Đăng nhập thành công và chuyển về Home. |

---

## Step 8 – Rút gọn Test Case

Sau khi sinh test case, kiểm tra test case bị trùng.

Nếu nhiều test case:

- sử dụng cùng dữ liệu;
- cùng expected result;
- cover cùng EC;
- không cung cấp coverage mới;

thì có thể hợp nhất hoặc loại bỏ test dư thừa.

### Quy tắc

Ưu tiên:

```text
Ít test case hơn
+
vẫn cover đầy đủ tất cả EC
```

Không được rút gọn nếu làm mất EC coverage.

---

## Step 9 – Kiểm tra EC Coverage

Tạo bảng mapping từ Equivalence Class sang Test Case.

### Format

| EC ID | Loại | Test Case cover |
|---|---|---|
| EC1 | Valid | TC01 |
| EC2 | Invalid | TC02 |
| EC3 | Invalid | TC03 |

### Điều kiện hoàn thành

Mỗi EC phải xuất hiện trong ít nhất một Test Case.

Không được tồn tại:

```text
ECx → Không có Test Case cover
```

Nếu có EC chưa được cover, Agent phải bổ sung test case trước khi kết thúc.

---

## Step 10 – Kiểm tra chất lượng cuối cùng

Trước khi xuất kết quả, Agent phải tự kiểm tra:

### Requirement coverage

- [ ] Tất cả rule trong requirement đã được phân tích.
- [ ] Không tự thêm rule không có căn cứ.

### Input / Output

- [ ] Đã xác định đủ Input liên quan.
- [ ] Đã xác định đủ Output liên quan.

### Condition

- [ ] Các rule phức tạp đã được tách thành condition độc lập.

### Equivalence Class

- [ ] Có Valid EC.
- [ ] Có Invalid EC khi requirement cho phép xác định invalid domain.
- [ ] Các EC được mô tả rõ.
- [ ] Các EC không chồng lấn không hợp lý.
- [ ] Các EC bao phủ miền dữ liệu cần xét.

### Representative Value

- [ ] Mỗi EC có ít nhất một giá trị đại diện.
- [ ] Giá trị đại diện thuộc đúng EC.

### Test Case

- [ ] Valid EC có thể được kết hợp hợp lý.
- [ ] Mỗi test case invalid chỉ cover một Invalid EC.
- [ ] Các Input còn lại trong invalid test dùng giá trị hợp lệ.
- [ ] Expected Result bám sát requirement.

### Coverage

- [ ] Mọi EC đều được ít nhất một test case cover.

---

# 5. Format đầu ra bắt buộc

- File kết quả phải được trình bày thành một file .md gồm đầy đủ các phần như sau:

## 1. Input / Output

Input:
Output:
---
## 2. Xác định condition

| Condition ID | Input/Output | Điều kiện |
|---|---|---|

## 3. Equivalence Class Table

| EC ID | Input/Output | Equivalence Class | Loại |
|---|---|---|---|

---

## 4. Representative Values

| EC ID | Equivalence Class | Loại | Representative Value |
|---|---|---|---|
---

## 5. Test Cases

| TC-ID | Requirement ID | Module / TestType / Technique | Preconditions | Test data | Test steps | Expected result |
| --- | :-- | --- | --- | --- | --- | --- |
---

## 7. EC Coverage Matrix

| EC ID | Loại | Test Case cover |
|---|---|---|

---

- Xuất toàn bộ kết quả thành **một file Markdown (`.md`)**.
- Lưu file trong thư mục `reports/DomainTesting` tại thư mục gốc của project.
- Tên file tương ứng với Feature được yêu cầu: `reports/DomainTesting/<Feature-name>.md`.
- Nếu thư mục `reports/DomainTesting` chưa tồn tại, Agent phải tự tạo.

Ví dụ:

`Feature1` → `reports/feature1.md`
---

# 6. Các nguyên tắc bắt buộc của Agent

## MUST

Agent MUST:

- Đi qua từng bước của kỹ thuật.
- Dựa trên requirement được cung cấp.
- Tách condition trước khi tạo EC.
- Phân biệt Valid và Invalid EC.
- Gán ID cho từng EC.
- Chọn representative value cho từng EC.
- Cover tất cả EC.
- Chỉ kiểm thử một Invalid EC tại một thời điểm.
- Giữ các Input khác hợp lệ khi test một Invalid EC.
- Giải thích từng bước đã thực hiện.

## MUST NOT

Agent MUST NOT:

- Nhảy trực tiếp từ requirement sang test case.
- Tự bịa thêm business rule.
- Gộp nhiều Invalid EC vào cùng một test case.
- Bỏ qua Output.
- Bỏ qua EC coverage.
- Dùng Boundary Value Analysis trong skill này để thay thế Equivalence Partitioning.
- Khẳng định một behavior không được requirement mô tả.

---

# 7. Cách xử lý Requirement không rõ ràng

Nếu requirement thiếu thông tin, Agent không được tự đoán.

Ví dụ:

```text
Password phải hợp lệ.
```

nhưng không mô tả password hợp lệ là gì.

Agent phải ghi:

```text
Requirement chưa cung cấp rule xác định password hợp lệ.
Không đủ căn cứ để chia miền dữ liệu theo length, character hoặc format.
```

Sau đó chỉ tạo EC dựa trên những rule thực sự được cung cấp.

---


# 8. Tiêu chí hoàn thành

Skill chỉ được xem là hoàn thành khi:

```text
Tất cả Requirement Rules
        ↓
được chuyển thành Conditions
        ↓
Conditions được phân thành Equivalence Classes
        ↓
Mỗi Equivalence Class có Representative Value
        ↓
Mỗi Equivalence Class được Test Case cover
```

Nếu còn bất kỳ EC nào chưa được cover, Agent phải tiếp tục sinh hoặc chỉnh sửa test case trước khi xuất kết quả cuối cùng.
