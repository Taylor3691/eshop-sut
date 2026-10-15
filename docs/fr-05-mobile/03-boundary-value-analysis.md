# FR-05 — Boundary Value Analysis, 3-value (mobile)

Chức năng: **FR-05 Xem danh sách và tìm kiếm sản phẩm**, màn `home` của app mobile.

Kỹ thuật: với biên đóng `[Min, Max]`, lấy `Min-1`, `Min`, `Min+1`, `Max-1`, `Max`, `Max+1`. Giá trị `Min` và `Max` nằm trên biên. `Min+1` và `Max-1` nằm trong miền. `Min-1` và `Max+1` nằm sát ngoài miền.

Miền lấy từ bước 2 (`docs/fr-05-mobile/02-equivalence-partitioning.md`). Bước này chỉ tính số. Chưa viết test case. Bộ web ở `docs/fr-05/` không bị sửa.

`%`, `_`, `'`, `&`, `#`, `?` và `<script>` là từng điểm, không phải khoảng `[Min, Max]`. Không gán số cho chúng.

Không lập biên cho giá, danh mục, sắp xếp, phân trang. Bước 2 không có các lớp đó. FR-05 không có `Limit`. Không bịa số trang.

## 1. Độ dài từ khóa

FR-05 không khai báo độ dài tối đa của ô tìm. `TextInput` không có `maxLength`.

Mốc biên trên là **FR-15: tên sản phẩm tối đa 255 ký tự**. Đó là độ dài tên hợp lệ dài nhất có thể lưu, nên một từ khóa dài hơn 255 không thể khớp toàn phần một tên đúng spec. `Max = 255`.

Biên dưới của từ khóa không rỗng là 1 ký tự. Chuỗi dài 0 là lớp kế bên (KW-VEC-09), không phải lỗi bị từ chối.

Đếm theo số ký tự. Chuỗi biên là chữ `a` lặp lại.

| ID | Vị trí | Số ký tự | Giá trị | So với miền 1..255 |
| --- | --- | --- | --- | --- |
| LEN-B-01 | Min-1 | 0 | `""` | Sát dưới Min. Lớp KW-VEC-09 |
| LEN-B-02 | Min | 1 | `a` | Trên biên dưới |
| LEN-B-03 | Min+1 | 2 | `aa` | Trong miền |
| LEN-B-04 | Max-1 | 254 | `a` lặp 254 lần | Trong miền |
| LEN-B-05 | Max | 255 | `a` lặp 255 lần | Trên biên trên của FR-15 |
| LEN-B-06 | Max+1 | 256 | `a` lặp 256 lần | Sát ngoài FR-15. Ô tìm không chặn độ dài này |

## 2. Chuỗi chỉ gồm dấu cách

Lớp KW-IEC-01 bắt đầu tại 1 dấu cách. Chuỗi 0 dấu cách là KW-VEC-09. Spec không có số dấu cách tối đa, nên không có `Max-1`, `Max`, `Max+1`.

| ID | Vị trí | Số dấu cách | Giá trị | Lớp bước 2 |
| --- | --- | --- | --- | --- |
| SP-B-01 | Min-1 | 0 | `""` | KW-VEC-09 |
| SP-B-02 | Min | 1 | `" "` | KW-IEC-01. Điểm đầu của chuỗi chỉ dấu cách |
| SP-B-03 | Min+1 | 2 | `"  "` | KW-IEC-01. Trong lớp. Đại diện 3 dấu cách ở bước 2 vẫn cùng lớp |
