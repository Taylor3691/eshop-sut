# Agent Skill: Boundary Value Analysis (BVA)

# 1. Mục tiêu

Skill này dùng để giải quyết **Requirement 2 – Boundary Value Analysis** của HW02 bằng kỹ thuật
**Phân tích giá trị biên (Boundary Value Analysis - BVA)**.

Mục tiêu là hướng dẫn AI thực hiện đầy đủ quá trình xác định giá trị biên và hình thành test case,
đồng thời xuất ra **một báo cáo Markdown dễ đọc**, giải thích rõ cách chọn các giá trị BVA thay vì
chỉ đưa ra bảng test case cuối cùng.

Boundary Value Analysis tập trung kiểm thử **tại và xung quanh ranh giới của các miền dữ liệu có thứ tự**,
vì đây là những vị trí có khả năng xuất hiện lỗi cao.

Agent phải phân tích Condition và Equivalence Class / Partition ở bên trong để tìm boundary chính xác,
nhưng **không bắt buộc đưa Condition ID, EC ID, Boundary ID hoặc BV ID vào báo cáo cuối cùng**.

Luồng tổng quát:

```text
Requirement
    ↓
Phân tích Requirement
    ↓
Xác định Input / Output
    ↓
Xác định các Condition
    ↓
Xác định Equivalence Classes / Partitions
    ↓
Chọn các Partition có thứ tự và có Boundary
    ↓
Xác định Lower Boundary / Upper Boundary
    ↓
Xác định các giá trị ngay trước, tại và ngay sau Boundary
    ↓
Hình thành tập giá trị BVA
    ↓
Sinh Test Cases
    ↓
Kiểm tra Boundary Coverage
    ↓
Xuất báo cáo BVA
```

---

# 2. Input cần cung cấp

Agent nhận **Feature cần kiểm thử** từ prompt của người dùng.

Requirement của Feature phải được đọc từ file `README.md` tại thư mục gốc của project.

Agent chỉ phân tích Feature được yêu cầu và bỏ qua các Feature khác.
Nếu requirement tham chiếu đến tài liệu khác trong project, Agent được phép đọc thêm các file liên quan.

Không tự bổ sung:

- Business Rule không có căn cứ;
- Validation Rule không có căn cứ;
- minimum / maximum không được mô tả;
- kiểu dữ liệu không được mô tả;
- behavior hoặc error message không có trong requirement.

Nếu thiếu thông tin cần thiết để xác định boundary, ghi rõ:

```text
Chưa được mô tả trong requirement.
```

---

# 3. Quy trình thực hiện

## Step 1 – Phân tích Requirement

Đọc kỹ requirement và trích xuất các rule có liên quan đến dữ liệu có thể áp dụng Boundary Value Analysis.

Cần chú ý các dạng rule như:

- khoảng giá trị;
- giá trị tối thiểu;
- giá trị tối đa;
- số lượng;
- độ dài chuỗi;
- số lần thử;
- ngày / thời gian;
- giá trị số;
- giới hạn trên / dưới;
- output có miền giá trị có thứ tự;
- hành vi khi dữ liệu nằm trong hoặc ngoài miền hợp lệ.

### Quy tắc

- Không sinh test case ngay ở bước này.
- Không tự suy đoán boundary.
- Nếu requirement có nhiều rule, phải tách riêng từng rule để xem rule nào có thể tạo boundary.
- Rule không có miền dữ liệu có thứ tự thì không được ép áp dụng BVA.

### Nội dung đưa vào báo cáo

Không cần xuất toàn bộ quá trình phân tích nội bộ.

Chỉ cần bảo đảm các rule phù hợp với BVA được phản ánh trong phần:

```text
Boundary Value Analysis
```

của báo cáo cuối cùng.

---

## Step 2 – Xác định Input và Output

Dựa trực tiếp vào requirement để xác định tất cả Input và Output liên quan.

**Mục đích:** xác định dữ liệu nào có thể chứa boundary trước khi thực hiện BVA.

### Input có thể bao gồm

- Number
- Quantity
- Price
- Age
- Length của chuỗi
- Date / Time
- Số lần thử
- Số lượng người
- Số lượng item
- Các giá trị có thứ tự khác

### Output có thể bao gồm

- Giá trị được tính toán
- Tổng
- Số lượng kết quả
- Điểm số
- Giá trị output có minimum / maximum
- Trạng thái thay đổi khi vượt qua một boundary

### Lưu ý

Không phải mọi Input / Output đều phù hợp với BVA.

Ví dụ:

```text
Payment Method ∈ {COD, VISA, MOMO}
```

là tập giá trị phân loại, không có thứ tự tự nhiên để xác định Lower Boundary / Upper Boundary.

### Nội dung phải đưa vào báo cáo

```markdown
## 1. Input / Output

Input:
- ...

Output:
- ...
```

---

## Step 3 – Xác định Condition và Equivalence Class / Partition

Đây là bước phân tích **nội bộ của Agent** để tìm boundary chính xác.

Với từng Input / Output:

1. Xác định các condition độc lập.
2. Xác định miền hợp lệ và không hợp lệ.
3. Chia thành Equivalence Classes / Partitions nếu cần.
4. Xác định partition nào có thứ tự.
5. Xác định nơi expected behavior thay đổi giữa các partition.

### Ví dụ

Requirement:

```text
Số người phải từ 2 đến 4.
```

Agent có thể phân tích nội bộ:

```text
Valid:
2 <= numberOfPeople <= 4

Invalid:
numberOfPeople < 2
numberOfPeople > 4
```

Các boundary chính là nơi hành vi thay đổi:

```text
Lower Boundary = 2
Upper Boundary = 4
```

### Ví dụ khác

Requirement:

```text
Username phải dài từ 5 đến 20 ký tự
và chỉ chứa chữ cái hoặc chữ số.
```

Agent tách:

```text
C1 – Length:
5 <= length(username) <= 20

C2 – Character format:
chỉ chứa chữ cái hoặc chữ số
```

Trong đó:

```text
C1 → áp dụng BVA
C2 → không áp dụng BVA
```

vì `length` có miền thứ tự và boundary rõ ràng, còn character format không có Lower / Upper Boundary.

### Quy tắc

- Không gộp hai condition khác bản chất.
- Không ép BVA lên condition không có miền thứ tự.
- Nếu một partition chứa các giá trị có hành vi khác nhau, phải tách partition trước khi xác định boundary.
- Boundary phải có căn cứ từ requirement hoặc partition được suy ra trực tiếp từ requirement.

### Nội dung phải đưa vào báo cáo

**Không xuất bảng Condition, EC hoặc Partition.**

Kết quả phân tích này phải được chuyển thành phần giải thích tự nhiên ở:

```markdown
## 2. Boundary Value Analysis
```

---

## Step 4 – Xác định Boundary cho Input / Output

Với mỗi condition có thể áp dụng BVA, xác định các boundary quan trọng.

Thông thường cần xem xét:

```text
Lower Boundary (LB)
Upper Boundary (UB)
```

nếu requirement mô tả đủ cả hai giới hạn.

### Ví dụ

Requirement:

```text
2 <= numberOfPeople <= 4
```

Ta có:

```text
LB = 2
UB = 4
```

### Trường hợp chỉ có một boundary

Requirement:

```text
Age >= 18
```

Ta chỉ có:

```text
Boundary = 18
```

Không được tự tạo Upper Boundary nếu requirement không mô tả giới hạn trên.

### Trường hợp biên mở

Ví dụ:

```text
10 <= x < 25
```

Agent phải giữ nguyên toán tử.

Không được tự đổi thành:

```text
10 <= x <= 25
```

Agent cần xác định rõ:

- giá trị nào còn hợp lệ;
- giá trị nào bắt đầu không hợp lệ;
- expected behavior thay đổi tại đâu.

### Nội dung phải đưa vào báo cáo

Không xuất riêng bảng Boundary Identification.

Boundary phải được giải thích trực tiếp trong phần:

```markdown
## 2. Boundary Value Analysis
```

---

## Step 5 – Xác định đơn vị bước của dữ liệu

Để xác định giá trị ngay trước và ngay sau boundary, Agent cần biết
**đơn vị thay đổi nhỏ nhất có ý nghĩa** của dữ liệu.

Ký hiệu tổng quát:

```text
Δ
```

### Ví dụ

#### Integer

```text
2 <= numberOfPeople <= 4
```

```text
Δ = 1
```

#### String Length

```text
5 <= length(username) <= 20
```

```text
Δ = 1 ký tự
```

#### Date theo ngày

```text
Δ = 1 ngày
```

nếu requirement xử lý theo đơn vị ngày.

#### Decimal

Không được mặc định:

```text
Δ = 1
```

Phải dựa vào precision / scale hoặc đơn vị nhỏ nhất được requirement mô tả.

Ví dụ:

```text
Δ = 0.01
```

nếu dữ liệu có bước nhỏ nhất là 0.01.

### Quy tắc

Các ký hiệu:

```text
LB-1
LB+1
UB-1
UB+1
```

trong trường hợp integer thực chất là trường hợp cụ thể của:

```text
LB-Δ
LB+Δ
UB-Δ
UB+Δ
```

Nếu requirement không đủ thông tin để xác định `Δ`, Agent không được tự đoán.

---

## Step 6 – Xác định các giá trị tại và xung quanh Boundary

Với mỗi boundary, Agent phải xem xét:

```text
Ngay trước Boundary
Tại Boundary
Ngay sau Boundary
```

Với miền có cả LB và UB:

```text
LB-Δ
LB
LB+Δ

UB-Δ
UB
UB+Δ
```

Nếu có giá trị trùng nhau giữa hai nhóm, chỉ cần giữ một lần trong tập BVA cuối cùng.

### Ví dụ: số người từ 2 đến 4

Lower Boundary:

```text
1, 2, 3
```

Upper Boundary:

```text
3, 4, 5
```

Sau khi loại trùng:

```text
1, 2, 3, 4, 5
```

### Giá trị cực tiểu / cực đại của UI

Nếu specification hoặc UI xác định rõ:

- smallest possible value;
- largest possible value;

Agent có thể xem xét thêm các giá trị này khi chúng tạo ra risk khác đáng kiểm thử.

Không bắt buộc thêm nếu chúng không có căn cứ hoặc không bổ sung coverage có ý nghĩa.

### Quy tắc

- Ưu tiên giá trị tại và sát boundary.
- Không thay boundary bằng một giá trị tùy ý nằm xa boundary.
- Không bắt buộc tạo đủ một số lượng cố định test value cho mọi partition.
- Giá trị BVA phải phản ánh nơi behavior có khả năng thay đổi.

---

## Step 7 – Hình thành tập BVA và viết phần giải thích

Sau khi xác định các Boundary Value, Agent phải tạo một tập giá trị BVA cuối cùng
cho từng Input / Output.

Phần giải thích phải ngắn gọn, dễ đọc và thể hiện được quá trình chọn giá trị.

### Format giải thích khuyến nghị

```markdown
### Boundary Value Analysis cho <Input / Output>

Miền hợp lệ là **<miền hợp lệ>**.

Các mốc quan trọng là **<Lower Boundary>** và **<Upper Boundary>**.

Quanh mốc <Lower Boundary>:

**<giá trị ngay trước>, <giá trị tại biên>, <giá trị ngay sau>**

Quanh mốc <Upper Boundary>:

**<giá trị ngay trước>, <giá trị tại biên>, <giá trị ngay sau>**

Vì vậy tập BVA quan trọng là:

**<tập giá trị BVA cuối cùng>**

Trong đó:
- **<giá trị dưới Lower Boundary>** kiểm tra trường hợp ngay dưới giới hạn tối thiểu.
- **<Lower Boundary>** kiểm tra đúng tại giới hạn dưới.
- **<Upper Boundary>** kiểm tra đúng tại giới hạn trên.
- **<giá trị trên Upper Boundary>** kiểm tra trường hợp vượt quá giới hạn tối đa.
```

### Ví dụ

```markdown
### Boundary Value Analysis cho số người

Miền hợp lệ là **2 đến 4 người**.

Các mốc quan trọng là **2** và **4**.

Quanh mốc 2:

**1, 2, 3**

Quanh giới hạn tối đa 4:

**3, 4, 5**

Vì vậy tập BVA rất quan trọng là:

**1, 2, 3, 4, 5**

Trong đó:
- **1** kiểm tra trường hợp nhỏ hơn số người tối thiểu.
- **2** kiểm tra đúng tại giới hạn dưới.
- **4** kiểm tra đúng tại giới hạn trên.
- **5** kiểm tra trường hợp vượt quá số người cho phép.
```

### Quy tắc

Phần giải thích phải cho người đọc hiểu được:

1. Input / Output nào đang được phân tích.
2. Miền hợp lệ là gì.
3. Boundary quan trọng nằm ở đâu.
4. Giá trị ngay trước / tại / sau boundary là gì.
5. Tập BVA cuối cùng là gì.
6. Ý nghĩa của các giá trị ngoài miền nếu có.

---


## Step 8 – Lập bảng Boundary Test Values

Sau khi hình thành tập BVA, tổng hợp từng giá trị vào bảng.

### Format bắt buộc

| Input / Output | Mô tả | Boundary Position | Value | Expected Behavior |
|---|---|---|---:|---|
| Số người | Số người tham gia | LB-1 | 1 | Invalid |
| Số người | Số người tham gia | LB | 2 | Valid |
| Số người | Số người tham gia | LB+1 / UB-1 | 3 | Valid |
| Số người | Số người tham gia | UB | 4 | Valid |
| Số người | Số người tham gia | UB+1 | 5 | Invalid |

### Quy tắc

- Không dùng `BV ID`.
- Không dùng `Boundary ID`.
- Không dùng `EC / Partition` trong bảng này.
- Cột `Input / Output` phải ghi rõ biến đang được kiểm thử.
- Cột `Mô tả` phải mô tả ngắn gọn ý nghĩa của biến.
- Nếu một giá trị đồng thời có hai vị trí, có thể ghi:
  `LB+1 / UB-1`.
- Expected Behavior phải xuất phát từ requirement.

---

## Step 9 – Chọn giá trị hợp lệ cho các Input khác

Khi kiểm thử boundary của một Input, các Input khác nên giữ ở
**giá trị hợp lệ bình thường** để cô lập behavior của boundary đang kiểm thử.

### Ví dụ

Requirement có:

```text
A: -99 <= A <= 99
B: -99 <= B <= 99
```

Khi kiểm thử boundary của A:

```text
A = -100
B = 9
```

Khi kiểm thử boundary của B:

```text
A = 10
B = -100
```

Trong đó:

```text
9
10
```

là các valid representative không nằm sát boundary.

### Quy tắc

Giá trị hợp lệ cho Input khác phải:

- nằm trong miền hợp lệ;
- không nằm ngay sát boundary;
- không vi phạm rule khác;
- dễ hiểu và dễ tái tạo.

### Nội dung phải đưa vào báo cáo

```markdown
## 4. Valid Representative Values cho các Input khác
```

| Input | Valid Range / Rule | Giá trị sử dụng | Lý do |
|---|---|---|---|

Nếu feature chỉ có một Input thì có thể ghi:

```text
Không có Input khác cần giữ ở giá trị hợp lệ.
```

---

## Step 10 – Xác định Expected Behavior cho từng Boundary Value

Với mỗi giá trị trong tập BVA, xác định expected behavior theo requirement.

### Ví dụ

Requirement:

```text
2 <= numberOfPeople <= 4
```

Ta có:

```text
1 → Invalid
2 → Valid
3 → Valid
4 → Valid
5 → Invalid
```

### Quy tắc

Expected Result phải xuất phát từ requirement.

Không tự tạo error message cụ thể nếu requirement chỉ nói chung:

```text
System displays an error.
```

Khi đó nên ghi:

```text
Hệ thống từ chối dữ liệu và hiển thị thông báo lỗi phù hợp.
```

Không được tự viết một message chi tiết không tồn tại trong specification.

---

## Step 11 – Sinh Test Case

Tạo test case từ các Boundary Test Values đã xác định.

Mỗi test case phải trace được theo:

```text
Input / Output
    ↓
Boundary Position
    ↓
Boundary Value
    ↓
Test Case
```

Không bắt buộc trace bằng:

```text
Condition ID
EC ID
Boundary ID
BV ID
```

### Quy tắc khi có nhiều Input

Khi test boundary của một biến:

```text
Biến đang xét = Boundary Value
Các biến khác = Valid Representative Value
```

### Test case phải thể hiện

- Requirement ID;
- Input / Output đang được kiểm thử;
- boundary value trong Test data;
- Preconditions;
- Test steps;
- Expected Result.

### Format Test Case

| TC-ID | Requirement ID | Module / TestType / Technique | Preconditions | Test data | Test steps | Expected result | Status/ Related bugs |
|---|---|---|---|---|---|---|---|

### Ví dụ

| TC-ID | Requirement ID | Module / TestType / Technique | Preconditions | Test data | Test steps | Expected result | Status/ Related bugs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-BVA-001** | FR-XX | Feature / Functional / Boundary Value Analysis | User ở màn hình cần kiểm thử | **Số người:** 1 | 1. Nhập số người = 1<br>2. Submit | Hệ thống từ chối vì giá trị nhỏ hơn giới hạn tối thiểu. | Not run/ None |

---

## Step 12 – Kiểm tra Boundary Coverage

Sau khi sinh test case, kiểm tra tất cả Boundary Test Values đã được cover.

### Output bắt buộc

| Input / Output | Boundary Position | Boundary Value | Test Case cover |
|---|---|---:|---|
| Số người | LB-1 | 1 | TC01 |
| Số người | LB | 2 | TC02 |
| Số người | LB+1 / UB-1 | 3 | TC03 |
| Số người | UB | 4 | TC04 |
| Số người | UB+1 | 5 | TC05 |

### Điều kiện hoàn thành

Không được tồn tại giá trị BVA quan trọng mà không có Test Case cover.

Nếu có:

```text
Boundary Value → Không có Test Case
```

Agent phải bổ sung test case trước khi kết thúc.

---

## Step 13 – Kiểm tra Output Boundary nếu requirement có mô tả

Boundary Value Analysis không chỉ áp dụng cho Input.

Nếu Output:

- có miền dữ liệu có thứ tự;
- có boundary rõ ràng;
- requirement mô tả đủ quan hệ Input → Output;

thì Agent phải xem xét Output Boundary.

### Agent cần xác định

1. Output nào có boundary.
2. Boundary của Output là gì.
3. Input nào tạo ra Output tại hoặc sát boundary.
4. Expected Output.
5. Test case tương ứng.

### Quy tắc

Không tự suy diễn công thức hoặc business logic không có trong requirement.

### Nội dung phải đưa vào báo cáo

Nếu có:

```markdown
## 7. Output Boundary Analysis
```

| Output | Boundary / Mốc quan trọng | Input tạo ra giá trị biên | Expected Output | Test Case |
|---|---|---|---|---|

Nếu không có:

```text
Không xác định Output Boundary từ requirement.
```

---

## Step 14 – Kiểm tra chất lượng cuối cùng

Trước khi xuất kết quả, Agent phải tự kiểm tra.

### Requirement

- [ ] Tất cả rule có khả năng tạo boundary đã được xem xét.
- [ ] Không tự thêm minimum / maximum.
- [ ] Không tự đổi `<`, `<=`, `>`, `>=`.
- [ ] Không tự thêm behavior không được mô tả.

### Input / Output

- [ ] Đã xác định các Input / Output có miền thứ tự.
- [ ] Đã bỏ qua các condition không phù hợp với BVA.
- [ ] Đã xem xét Output Boundary nếu requirement hỗ trợ.

### Phân tích nội bộ

- [ ] Condition đã được tách khi cần.
- [ ] Equivalence Class / Partition đã được phân tích nội bộ.
- [ ] Boundary có căn cứ từ requirement / partition.
- [ ] Không gọi một giá trị là boundary nếu không có căn cứ.

### Boundary Values

- [ ] Đã xác định giá trị ngay trước boundary.
- [ ] Đã xác định giá trị tại boundary.
- [ ] Đã xác định giá trị ngay sau boundary.
- [ ] Giá trị trùng đã được loại khỏi tập BVA cuối cùng khi phù hợp.
- [ ] Đơn vị bước phù hợp với kiểu dữ liệu.

### Test Case

- [ ] Mỗi Boundary Test Value quan trọng đều có test case.
- [ ] Input khác giữ ở valid representative nếu cần.
- [ ] Expected Result bám sát requirement.
- [ ] Test case trace được từ Input/Output → Boundary Position → Value.

### Báo cáo

- [ ] Không bắt buộc xuất Condition ID.
- [ ] Không bắt buộc xuất EC ID.
- [ ] Không xuất Boundary ID trong Boundary Test Values.
- [ ] Không xuất BV ID trong Boundary Test Values.
- [ ] Phần BVA có giải thích bằng lời trước khi đưa bảng.
- [ ] Boundary Coverage đầy đủ.

---

# 4. Nguyên tắc Boundary Value Analysis sử dụng trong Skill

## 4.1. Vì sao kiểm thử Boundary

Boundary là nơi behavior của hệ thống có khả năng thay đổi.

Các lỗi thường gặp gồm:

- viết sai toán tử bất đẳng thức;
- nhầm `<` thành `<=`;
- nhầm `>` thành `>=`;
- nhập sai giá trị boundary;
- xử lý sai giá trị ngay trước hoặc ngay sau boundary.

Do đó, giá trị tại và sát boundary thường có khả năng phát hiện lỗi cao hơn
một giá trị nằm xa boundary.

---

## 4.2. Boundary phải xuất phát từ Requirement / Partition

Agent không được tự tạo boundary.

Ví dụ:

```text
2 <= numberOfPeople <= 4
```

cho phép xác định:

```text
LB = 2
UB = 4
```

Nhưng requirement:

```text
numberOfPeople phải hợp lệ
```

không đủ thông tin để xác định boundary.

---

## 4.3. Các vị trí cần xem xét quanh Boundary

Với boundary có đơn vị bước `Δ`:

```text
Boundary - Δ
Boundary
Boundary + Δ
```

Nếu có cả Lower và Upper Boundary:

```text
LB-Δ
LB
LB+Δ

UB-Δ
UB
UB+Δ
```

Sau đó loại giá trị trùng để tạo tập BVA cuối cùng.

Ví dụ:

```text
2 <= x <= 4
```

cho:

```text
LB group: 1, 2, 3
UB group: 3, 4, 5
```

Tập cuối:

```text
1, 2, 3, 4, 5
```

---

# 5. Format đầu ra bắt buộc

File kết quả phải là **một file Markdown (`.md`)** và phải thể hiện rõ
quá trình lựa chọn Boundary Values.

Không được chỉ xuất bảng Test Cases.

---

## 1. Input / Output

```text
Input:
- ...

Output:
- ...
```

---

## 2. Boundary Value Analysis

Với mỗi Input / Output có thể áp dụng BVA, trình bày ngắn gọn theo dạng dễ đọc như sau:

### Boundary Value Analysis cho <Input / Output>

Các mốc quan trọng là **<Lower Boundary>** và **<Upper Boundary>**.

Quanh mốc **<Lower Boundary>**:

**<LB-1>, <LB>, <LB+1>**

Quanh giới hạn tối đa **<Upper Boundary>**:

**<UB-1>, <UB>, <UB+1>**

Vì vậy tập BVA quan trọng là:

**<Danh sách các giá trị BVA sau khi loại bỏ giá trị trùng>**

Trong đó:
- **<giá trị dưới Lower Boundary>** kiểm tra trường hợp nhỏ hơn giới hạn tối thiểu.
- **<Lower Boundary>** kiểm tra đúng tại giới hạn dưới.
- **<Upper Boundary>** kiểm tra đúng tại giới hạn trên.
- **<giá trị trên Upper Boundary>** kiểm tra trường hợp vượt quá giới hạn tối đa.

### Ví dụ

#### Boundary Value Analysis cho số người

Các mốc quan trọng là **2** và **4**.

Quanh mốc **2**:

**1, 2, 3**

Quanh giới hạn tối đa **4**:

**3, 4, 5**

Vì vậy tập BVA quan trọng là:

**1, 2, 3, 4, 5**

Trong đó:
- **1** kiểm tra trường hợp nhỏ hơn số người tối thiểu.
- **2** kiểm tra đúng tại giới hạn dưới.
- **4** kiểm tra đúng tại giới hạn trên.
- **5** kiểm tra trường hợp vượt quá số người cho phép.

Không bắt buộc hiển thị:

```text
Condition ID
EC ID
Partition ID
Boundary ID
```

trong phần báo cáo này.

---

## 3. Boundary Test Values

| Input / Output | Mô tả | Boundary Position | Value | Expected Behavior |
|---|---|---|---:|---|

Ví dụ:

| Input / Output | Mô tả | Boundary Position | Value | Expected Behavior |
|---|---|---|---:|---|
| Số người | Số người tham gia | LB-1 | 1 | Invalid |
| Số người | Số người tham gia | LB | 2 | Valid |
| Số người | Số người tham gia | LB+1 / UB-1 | 3 | Valid |
| Số người | Số người tham gia | UB | 4 | Valid |
| Số người | Số người tham gia | UB+1 | 5 | Invalid |

---

## 4. Valid Representative Values cho các Input khác

| Input | Valid Range / Rule | Giá trị sử dụng | Lý do |
|---|---|---|---|

Nếu không có Input khác:

```text
Không có Input khác cần giữ ở giá trị hợp lệ.
```

---

## 5. Test Cases

| TC-ID | Requirement ID | Module / TestType / Technique | Preconditions | Test data | Test steps | Expected result | Status/ Relate bugs |
|---|---|---|---|---|---|---|---|

---

## 6. Boundary Coverage Matrix

| Input / Output | Boundary Position | Boundary Value | Test Case cover |
|---|---|---:|---|

---

## 7. Output Boundary Analysis

Nếu có Output Boundary:

| Output | Boundary / Mốc quan trọng | Input tạo ra giá trị biên | Expected Output | Test Case |
|---|---|---|---|---|

Nếu không có:

```text
Không xác định Output Boundary từ requirement.
```

---

## 8. BVA Summary

```text
Total Inputs / Outputs reviewed:
Total Inputs / Outputs applicable to BVA:
Total boundary points identified:
Total boundary test values:
Total test cases generated:
Uncovered boundary values:
```

Nếu có boundary không thể kiểm thử do requirement thiếu thông tin,
phải ghi rõ lý do.

---

### Quy tắc lưu file

- Xuất toàn bộ kết quả thành **một file Markdown (`.md`)**.
- Lưu file trong thư mục `reports/BVATesting` tại thư mục gốc của project.
- Tên file tương ứng với Feature được yêu cầu:

```text
reports/BVATesting/<feature-name>-bva.md
```

- Nếu thư mục `reports/BVATesting` chưa tồn tại, Agent phải tự tạo.

Ví dụ:

```text
Feature1 → reports/feature1-bva.md
```

---

# 6. Các nguyên tắc bắt buộc của Agent

## MUST

Agent MUST:

- Đi qua từng bước của Boundary Value Analysis.
- Dựa trên requirement được cung cấp.
- Xác định Input và Output trước khi tạo test case.
- Phân tích Condition và Equivalence Class / Partition ở bên trong khi cần để tìm boundary.
- Chỉ áp dụng BVA cho miền dữ liệu có thứ tự.
- Xác định boundary từ requirement hoặc partition có căn cứ.
- Xác định giá trị ngay trước, tại và ngay sau boundary.
- Xác định đơn vị bước phù hợp với dữ liệu.
- Loại giá trị trùng khi hình thành tập BVA cuối cùng nếu phù hợp.
- Giải thích bằng lời cách hình thành tập BVA trong báo cáo.
- Giữ Input khác ở valid representative khi kiểm thử một boundary.
- Expected Result phải xuất phát từ requirement.
- Cover tất cả Boundary Test Values quan trọng.
- Trace test case theo:
  `Input/Output → Boundary Position → Boundary Value → Test Case`.
- Kiểm tra Output Boundary nếu requirement cung cấp đủ thông tin.

## MUST NOT

Agent MUST NOT:

- Nhảy trực tiếp từ requirement sang test case.
- Tự bịa minimum / maximum.
- Tự tạo boundary không có căn cứ.
- Tự đổi toán tử `<`, `<=`, `>`, `>=`.
- Tự giả định đơn vị bước không phù hợp với kiểu dữ liệu.
- Áp dụng BVA cho dữ liệu không có thứ tự chỉ để tăng test case.
- Dùng một giá trị nằm xa boundary thay cho giá trị sát boundary.
- Bắt buộc sinh một số lượng test case cố định cho mọi partition.
- Tự viết error message không tồn tại trong specification.
- Bỏ một boundary value quan trọng mà không giải thích.
- Bắt buộc người đọc báo cáo phải theo dõi `Condition ID`, `EC ID`,
  `Boundary ID` hoặc `BV ID`.
- Xuất `Boundary ID`, `BV ID`, `EC / Partition` trong bảng Boundary Test Values.
- Khẳng định behavior không được requirement mô tả.

---

# 7. Cách xử lý Requirement không rõ ràng

Nếu requirement thiếu thông tin để xác định boundary, Agent không được tự đoán.

### Trường hợp 1 – Không có giới hạn

Requirement:

```text
Password phải có độ dài hợp lệ.
```

Agent phải ghi:

```text
Requirement chưa cung cấp giới hạn độ dài của Password.
Không đủ căn cứ để xác định Boundary Value.
```

---

### Trường hợp 2 – Chỉ có một boundary

Requirement:

```text
Age >= 18
```

Agent được phép xét:

```text
17, 18, 19
```

nếu Age là integer.

Không được tự tạo Upper Boundary.

---

### Trường hợp 3 – Không rõ đơn vị bước

Nếu requirement mô tả:

```text
0 <= price <= 100
```

nhưng không nói precision của `price`,
Agent không được tự kết luận:

```text
99
100
101
```

nếu chưa biết đơn vị bước hợp lệ là `1`.

Phải ghi rõ limitation hoặc chỉ sử dụng giá trị có căn cứ từ specification.

---

### Trường hợp 4 – Condition không phù hợp với BVA

Requirement:

```text
Role ∈ {Admin, Staff, Customer}
```

Agent phải xác định:

```text
Không áp dụng Boundary Value Analysis vì tập giá trị không có thứ tự
và không xác định được boundary có ý nghĩa từ requirement.
```

---

# 8. Tiêu chí hoàn thành

Skill chỉ được xem là hoàn thành khi:

```text
Requirement
    ↓
Input / Output được xác định
    ↓
Condition / Partition được phân tích nội bộ
    ↓
Các Input / Output phù hợp BVA được nhận diện
    ↓
Boundary có căn cứ được xác định
    ↓
Giá trị trước / tại / sau Boundary được xác định
    ↓
Tập BVA cuối cùng được hình thành
    ↓
Boundary Test Values được lập
    ↓
Test Cases được sinh
    ↓
Mỗi Boundary Test Value quan trọng được cover
    ↓
Báo cáo giải thích rõ quá trình BVA
```

Nếu còn Boundary Test Value quan trọng chưa được cover,
Agent phải tiếp tục bổ sung hoặc chỉnh sửa test case trước khi xuất kết quả cuối cùng.
