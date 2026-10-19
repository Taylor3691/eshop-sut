# FR-16 — Chọn điểm on/off/in/out và Boundary Value Analysis, 3-value

Chức năng: **FR-16 Import sản phẩm từ CSV**.

## A. Domain testing — chọn điểm on/off/in/out

On point nằm đúng trên biên. Off point là giá trị gần biên nhất ở phía bên kia: biên đóng (`≥`) thì off point nằm ngoài miền, biên mở (`>`) thì off point nằm trong miền. In point và out point là giá trị điển hình trong và ngoài miền. Phiên, JWT, role, đuôi file, header và cú pháp CSV là miền liệt kê, không có on/off.

### A.1 Độ dài tên — biên đóng `len(name) ≥ 1`

| Điểm | Giá trị | Thuộc miền | Test case |
| --- | --- | --- | --- |
| On | `a` (1) | Hợp lệ | TC-04 |
| Off | `""` (0) | Không hợp lệ | TC-16 |
| In | `SP Import` (9) | Hợp lệ | TC-01 |
| Out | `""` (0) | Không hợp lệ | TC-16 |

Độ dài không âm nên out point trùng off point.

### A.2 Giá — biên mở `price > 0`

| Điểm | Giá trị | Thuộc miền | Test case |
| --- | --- | --- | --- |
| On | `0` | Không hợp lệ (biên mở) | TC-18 |
| Off | `0.01` | Hợp lệ, gần 0 nhất theo bước lấy mẫu 0.01 | TC-30 |
| In | `100000` | Hợp lệ | TC-01 |
| Out | `-1` | Không hợp lệ | TC-17 |

Miền số thực không có số dương nhỏ nhất. Bước 0.01 là bước lấy mẫu được công bố (đơn vị tiền nhỏ nhất thường gặp), không phải giới hạn của spec. `-0.01` (TC-31) là điểm ngoài sát biên bổ sung.

### A.3 Số dòng dữ liệu — biên đóng `N ≥ 1`

| Điểm | N | Thuộc miền | Test case |
| --- | --- | --- | --- |
| On | 1 | Có sản phẩm để import | TC-01 |
| Off | 0 (chỉ header) | Không có sản phẩm | TC-22 |
| In | 2 | Có sản phẩm để import | TC-02 |
| Out | 0 | Không có sản phẩm | TC-22 |

## B. Boundary value analysis

Kỹ thuật: với biên đóng `[Min, Max]`, lấy `Min-1`, `Min`, `Min+1`, `Max-1`, `Max`, `Max+1`. Giá trị `Min` và `Max` nằm trên biên. `Min+1` và `Max-1` nằm trong miền. `Min-1` và `Max+1` nằm sát ngoài miền.

Miền lấy từ bước 2 (`docs/fr-16/02-equivalence-partitioning.md`). Bước này chỉ tính số. Chưa viết test case.

Mỗi mốc dưới đây là một file `hang.csv`, header đúng, các cột còn lại ở dòng chuẩn của bước 2. Chỉ cột đang xét đổi.

Phiên đăng nhập, JWT, đuôi file, header, dấu phẩy trong nháy kép, mô tả, ảnh và `category_id` là miền liệt kê. Không có `[Min, Max]`. Không gán số cho chúng.

### B.1 Độ dài tên

Tên không rỗng có biên dưới `Min = 1` ký tự. Chuỗi dài 0 là lớp NM-IEC-01, không phải một tên hợp lệ.

FR-16 không chốt MaxLength. Không mặc nhiên áp giới hạn 255 của FR-15 cho import. NM-B-01..03 là biên dưới 0/1/2 ký tự. NM-B-04..06 (254/255/256) là thăm dò tính nhất quán giữa hai đường tạo sản phẩm. TC-21 được rút khỏi bộ chấm PASS/FAIL hiện hành. Tên 256 ký tự không bị coi là lỗi của FR-16. BUG-19 đã kết luận không vi phạm đặc tả.

### B.2 Giá

Miền hợp lệ là số dương. Không có giá tối đa trong FR-16, nên không có `Max-1`, `Max`, `Max+1`.

Giá là số dương, không bắt buộc số nguyên. 0 là biên mở; không tồn tại số dương nhỏ nhất. Bộ -1/0/1 là mẫu với bước 1, bổ sung -0.01/0.01 (TC-31/TC-30) và 1.5 (TC-29) để tránh ngầm ép kiểu nguyên:

| ID | Vị trí | price | Lớp bước 2 |
| --- | --- | --- | --- |
| PR-B-01 | Dưới mốc | -1 | PR-IEC-01, số âm |
| PR-B-02 | Đúng mốc | 0 | PR-IEC-02, bằng 0 |
| PR-B-03 | Trên mốc | 1 | PR-VEC-01, điểm lấy mẫu dương |

### B.3 Số dòng dữ liệu

Lớp có sản phẩm để import bắt đầu tại `N = 1`. `N = 0` là file chỉ có header (N-IEC-01).

FR-16 không khai báo số dòng tối đa. Không bịa Max.

| ID | Vị trí | N | So với miền N ≥ 1 |
| --- | --- | --- | --- |
| N-B-01 | Min-1 | 0 | Sát dưới Min. Chỉ header |
| N-B-02 | Min | 1 | Trên biên dưới. Một dòng chuẩn |
| N-B-03 | Min+1 | 2 | Trong miền. Đúng đại diện N-VEC-01: `SP Import A` và `SP Import B` |

`N = 2` với dòng 2 có tên rỗng vẫn là ATOM-IEC-01 của bước 2, không phải một biên số mới.

## Việc cố ý chưa làm ở bước này

Chưa ghép các mốc thành test case.
