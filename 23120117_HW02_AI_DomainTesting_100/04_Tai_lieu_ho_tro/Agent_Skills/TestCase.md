# Agent Skill: Trích xuất và xây dựng file Test Case

# 1. Mục tiêu

Skill này dùng để đọc các báo cáo kiểm thử trong thư mục `reports/`, trích xuất từng test case trong phần **Test Cases** và lưu mỗi test case thành một file Markdown độc lập trong thư mục `test/test-cases/`.

Skill chỉ chuyển đổi và tổ chức lại những test case đã tồn tại trong báo cáo. Không tự sinh thêm test case, business rule, validation rule, bước kiểm thử hoặc kết quả mong đợi không có căn cứ từ báo cáo nguồn.

Luồng tổng quát:

```text
reports/<Loại kiểm thử>/FeatureX.md
    ↓
Tìm phần Test Cases
    ↓
Trích xuất từng dòng test case
    ↓
Chuẩn hóa về mẫu Markdown quy định
    ↓
test/test-cases/<Loại kiểm thử>/FeatureX/<TC-ID>.md
```

# 2. Phạm vi đầu vào

- Đọc các file `.md` bên trong `reports/` và các thư mục con của nó.
- Chỉ xử lý file báo cáo có phần **Test Cases** chứa bảng test case.
- Một bảng test case hợp lệ thường có các cột:
  - `TC-ID`
  - `Requirement ID`
  - `Module / TestType / Technique`
  - `Preconditions`
  - `Test data`
  - `Test steps`
  - `Expected result`
- Bỏ qua các bảng phân tích, bảng boundary, coverage matrix, summary và các phần khác không phải bảng test case.
- Không thay đổi bất kỳ file nào trong `reports/`.

# 3. Quy tắc ánh xạ thư mục

Giữ nguyên loại kiểm thử và tên feature của đường dẫn nguồn khi tạo đường dẫn đích.

Ví dụ:

```text
reports/DomainTesting/Feature1.md
→ test/test-cases/DomainTesting/Feature1/<TC-ID>.md

reports/BVATesting/Feature1.md
→ test/test-cases/BVATesting/Feature1/<TC-ID>.md
```

Trong cấu trúc này, thư mục `Feature1` có vai trò tương tự thư mục `login` trong ví dụ cấu trúc test case.

Nếu thư mục đích chưa tồn tại, tạo đúng các thư mục cần thiết. Không tạo thêm cấp thư mục không có trong đường dẫn ánh xạ.

# 4. Quy tắc đặt tên file

- Mỗi test case phải được lưu thành một file `.md` riêng.
- Tên file phải chính xác theo `TC-ID` sau khi loại bỏ ký hiệu định dạng Markdown như `**`.
- Không dịch, viết lại hoặc tự đánh số lại `TC-ID`.
- Không dùng tiêu đề test case làm tên file.

Ví dụ:

```text
TC-REG-001.md
TC-BVA-FR01-001.md
TC-LOGIN-001.md
```

# 5. Quy tắc trích xuất nội dung

Với từng dòng dữ liệu trong bảng **Test Cases**:

1. Lấy nguyên vẹn giá trị của từng cột tương ứng.
2. Loại bỏ ký hiệu in đậm bao quanh `TC-ID`, nhưng giữ nguyên các định dạng có ý nghĩa trong nội dung như inline code.
3. Chuyển `<br>` hoặc `<br/>` trong một ô thành các dòng Markdown dễ đọc.
4. Với `Preconditions`, trình bày mỗi điều kiện thành một gạch đầu dòng `-`.
5. Với `Test data`, trình bày từng cặp tên trường và giá trị trên một dòng theo dạng `| Tên trường | Giá trị |`. Nếu dữ liệu không phải cặp tên–giá trị, giữ nguyên nội dung trên một dòng riêng và không tự bịa cấu trúc.
6. Với `Test steps`, trình bày thành danh sách đánh số `1.`, `2.`, `3.`, ... theo đúng thứ tự trong báo cáo.
7. Với `Expected result`, giữ nguyên ý nghĩa và mức độ khẳng định của báo cáo nguồn. Không bổ sung thông báo lỗi, điều hướng hoặc hành vi chưa được mô tả.
8. Tạo một tên ngắn cho test case ở dòng tiêu đề dựa trực tiếp trên hành vi, dữ liệu và expected result của chính dòng đó. Tên phải mô tả đúng mục tiêu kiểm thử, không thêm yêu cầu mới.

Không được gộp nhiều dòng test case thành một file. Không được tách một dòng test case thành nhiều file.

# 6. Cấu trúc bắt buộc của mỗi file Test Case

Mỗi file đầu ra phải tuân thủ đúng thứ tự và cấp tiêu đề sau:

```md
# <TC-ID>: <Tên test case>

## Requirement ID
<Requirement ID>

## Module / Test type / Technique
<Module> / <Test type> / <Technique>

## Preconditions
- <Điều kiện 1>
- <Điều kiện 2>

## Test data
| <Tên dữ liệu 1> | <Giá trị 1> |
| <Tên dữ liệu 2> | <Giá trị 2> |

## Test steps
1. <Bước 1>
2. <Bước 2>
3. <Bước 3>

## Expected result
<Kết quả mong đợi>

## Status / Related Bugs
Not Run / None
```

Quy tắc định dạng bắt buộc:

- Tiêu đề test case dùng đúng một dấu `#`.
- Tất cả tên trường dùng đúng hai dấu `##`.
- Giữ nguyên thứ tự các phần trong mẫu.
- Không bỏ phần nào, kể cả khi dữ liệu nguồn ngắn.
- `Status / Related Bugs` luôn là phần cuối cùng.
- Giá trị khởi tạo của phần cuối luôn chính xác là `Not Run / None` vì test case chưa được thực thi.
- Không suy đoán trạng thái chạy test hoặc bug liên quan từ nội dung báo cáo.

# 7. Ví dụ chuyển đổi

Dòng test case nguồn:

```md
| **TC-REG-001** | FR-01 | Đăng ký / Functional / Equivalence Partitioning | Trang Đăng ký đã mở.<br>Email chưa tồn tại. | **Họ Tên:** Nguyễn Văn An<br>**Email:** an@example.com<br>**Mật khẩu:** Abcdef1@ | 1. Nhập toàn bộ dữ liệu hợp lệ.<br>2. Gửi form đăng ký. | Tài khoản được đăng ký thành công. |
```

Phải tạo file `TC-REG-001.md` có nội dung:

```md
# TC-REG-001: Đăng ký tài khoản thành công

## Requirement ID
FR-01

## Module / Test type / Technique
Đăng ký / Functional / Equivalence Partitioning

## Preconditions
- Trang Đăng ký đã mở.
- Email chưa tồn tại.

## Test data
| Họ Tên | Nguyễn Văn An |
| Email | an@example.com |
| Mật khẩu | Abcdef1@ |

## Test steps
1. Nhập toàn bộ dữ liệu hợp lệ.
2. Gửi form đăng ký.

## Expected result
Tài khoản được đăng ký thành công.

## Status / Related Bugs
Not Run / None
```

# 8. Xử lý file đã tồn tại và trùng lặp

- Trước khi ghi, kiểm tra xem file `<TC-ID>.md` đã tồn tại trong đúng thư mục đích hay chưa.
- Nếu chưa tồn tại, tạo file mới.
- Nếu đã tồn tại và nội dung do báo cáo nguồn thay đổi, cập nhật các phần được trích xuất nhưng vẫn đặt `Status / Related Bugs` về `Not Run / None` cho quy trình xây dựng test case chưa chạy.
- Không ghi một test case sang thư mục của loại kiểm thử hoặc feature khác.
- Nếu hai dòng trong cùng một thư mục đích có cùng `TC-ID` nhưng nội dung khác nhau, không tự ý ghi đè. Dừng xử lý hai dòng xung đột, nêu rõ file nguồn và `TC-ID` để người dùng quyết định.

# 9. Kiểm tra sau khi tạo

Sau khi hoàn tất, phải kiểm tra:

- Mỗi dòng trong bảng **Test Cases** đã tạo đúng một file `.md`.
- Mỗi file nằm đúng thư mục loại kiểm thử và feature tương ứng.
- Tên file khớp chính xác với `TC-ID`.
- File có đủ tám phần theo đúng thứ tự:
  1. Tiêu đề test case
  2. `Requirement ID`
  3. `Module / Test type / Technique`
  4. `Preconditions`
  5. `Test data`
  6. `Test steps`
  7. `Expected result`
  8. `Status / Related Bugs`
- Không còn thẻ `<br>` hoặc `<br/>` trong file đầu ra.
- Dòng cuối về trạng thái luôn là `Not Run / None`.
- Không có test case nào bị bỏ sót, tạo trùng hoặc ghi nhầm feature.

# 10. Kết quả báo cáo cho người dùng

Sau khi xây dựng xong, báo cáo ngắn gọn:

- Các file báo cáo nguồn đã xử lý.
- Số test case đã trích xuất theo từng feature và loại kiểm thử.
- Số file mới tạo và số file được cập nhật.
- Các dòng bị bỏ qua hoặc xung đột, nếu có.
- Đường dẫn thư mục đầu ra.
