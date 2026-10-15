# FR-16 — Boundary Value Analysis, 3-value

Chức năng: **FR-16 Import sản phẩm từ CSV**.

Kỹ thuật: với biên đóng `[Min, Max]`, lấy `Min-1`, `Min`, `Min+1`, `Max-1`, `Max`, `Max+1`. Giá trị `Min` và `Max` nằm trên biên. `Min+1` và `Max-1` nằm trong miền. `Min-1` và `Max+1` nằm sát ngoài miền.

Miền lấy từ bước 2 (`docs/fr-16/02-equivalence-partitioning.md`). Bước này chỉ tính số. Chưa viết test case.

Mỗi mốc dưới đây là một file `hang.csv`, header đúng, các cột còn lại ở dòng chuẩn của bước 2. Chỉ cột đang xét đổi.

Phiên đăng nhập, JWT, đuôi file, header, dấu phẩy trong nháy kép, mô tả, ảnh và `category_id` là miền liệt kê. Không có `[Min, Max]`. Không gán số cho chúng.

## 1. Độ dài tên

Tên không rỗng có biên dưới `Min = 1` ký tự. Chuỗi dài 0 là lớp NM-IEC-01, không phải một tên hợp lệ.

FR-16 không khai báo độ dài tối đa. Mốc trên lấy từ **FR-15: tên sản phẩm tối đa 255 ký tự**, vì dòng import trở thành một sản phẩm. `MaxLength = 255`.

Đếm theo số ký tự. Chuỗi biên là chữ `a` lặp lại.

| ID | Vị trí | Số ký tự | Giá trị | So với miền 1..255 |
| --- | --- | --- | --- | --- |
| NM-B-01 | Min-1 | 0 | `""` | Sát dưới Min. Lớp NM-IEC-01 |
| NM-B-02 | Min | 1 | `a` | Trên biên dưới |
| NM-B-03 | Min+1 | 2 | `aa` | Trong miền |
| NM-B-04 | Max-1 | 254 | `a` lặp 254 lần | Trong miền |
| NM-B-05 | Max | 255 | `a` lặp 255 lần | Trên biên trên của FR-15 |
| NM-B-06 | Max+1 | 256 | `a` lặp 256 lần | Sát ngoài FR-15 |

## 2. Giá

Miền hợp lệ là số nguyên dương. Không có giá tối đa trong FR-16, nên không có `Max-1`, `Max`, `Max+1`.

Ba giá trị quanh biên 0:

| ID | Vị trí | price | Lớp bước 2 |
| --- | --- | --- | --- |
| PR-B-01 | Dưới mốc | -1 | PR-IEC-01, số âm |
| PR-B-02 | Đúng mốc | 0 | PR-IEC-02, bằng 0 |
| PR-B-03 | Trên mốc | 1 | PR-VEC-01, số dương nhỏ nhất |

## 3. Số dòng dữ liệu

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
