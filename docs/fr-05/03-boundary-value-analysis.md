# FR-05 — Boundary Value Analysis, 3-value

Chức năng: **FR-05 Xem danh sách và tìm kiếm sản phẩm**.

Kỹ thuật: với biên đóng `[Min, Max]`, lấy `Min-1`, `Min`, `Min+1`, `Max-1`, `Max`, `Max+1`. Giá trị `Min` và `Max` nằm trên biên. `Min+1` và `Max-1` nằm trong miền. `Min-1` và `Max+1` nằm sát ngoài miền.

Miền lấy từ bước 2 (`docs/fr-05/02-equivalence-partitioning.md`). Bước này chỉ tính số. Chưa viết test case.

## 1. Độ dài chuỗi tìm kiếm

FR-05 không khai báo độ dài tối đa của ô tìm. Ô `input` không có `maxLength`.

Mốc dùng để tính biên trên là **FR-15: tên sản phẩm tối đa 255 ký tự**. Đó là độ dài tên hợp lệ dài nhất có thể lưu, nên một từ khóa dài hơn 255 không thể khớp toàn phần một tên đúng spec. `MaxLength = 255`.

Biên dưới của từ khóa không rỗng là 1 ký tự. Chuỗi dài 0 là lớp kế bên (KW-VEC-09, trang chủ liệt kê mọi sản phẩm), không phải lỗi bị từ chối.

Đếm theo số ký tự. Chuỗi biên trên là chữ `a` lặp lại, để độ dài không lệch vì dấu tiếng Việt.

| ID | Vị trí | Số ký tự | Giá trị | So với miền 1..255 |
| --- | --- | --- | --- | --- |
| LEN-01 | Min-1 | 0 | `""` | Sát dưới Min. Lớp KW-VEC-09 |
| LEN-02 | Min | 1 | `a` | Trên biên dưới |
| LEN-03 | Min+1 | 2 | `aa` | Trong miền |
| LEN-04 | Max-1 | 254 | `a` lặp 254 lần | Trong miền |
| LEN-05 | Max | 255 | `a` lặp 255 lần | Trên biên trên của FR-15 |
| LEN-06 | Max+1 | 256 | `a` lặp 256 lần | Sát ngoài FR-15. Ô tìm không chặn độ dài này |

## 2. Giá (`min_price`, `max_price`)

FR-05 không có hai biến này. Miền một biến lấy từ FR-15: giá là số nguyên VNĐ, lớn hơn 0. Giá trong DB là seed hiện tại (bảng bị tạo lại mỗi lần khởi động API).

| Sản phẩm | Giá (VNĐ) |
| --- | --- |
| Bàn phím cơ Keychron Q1 | 4 000 000 (thấp nhất) |
| Tai nghe AirPods Pro 2 | 6 000 000 |
| Samsung Galaxy S24 Ultra | 28 000 000 |
| iPhone 15 Pro Max | 30 000 000 |
| MacBook Pro M3 | 45 000 000 (cao nhất) |

### 2.1 Mốc 0

Ba giá trị quanh biên 0, gán cho cả `min_price` và `max_price`.

| ID | Vị trí | Giá trị (VNĐ) | Lớp bước 2 |
| --- | --- | --- | --- |
| PRC-01 | Dưới mốc | -1 | PR-IEC-01, số âm |
| PRC-02 | Đúng mốc | 0 | PR-IEC-02, bằng 0 |
| PRC-03 | Trên mốc | 1 | PR-VEC-01, số dương nhỏ nhất |

### 2.2 Giá thấp nhất và cao nhất trong DB

`Pmin = 4000000`, `Pmax = 45000000`.

| ID | Vị trí | Giá trị (VNĐ) | Cách tính |
| --- | --- | --- | --- |
| PRC-04 | Min-1 | 3 999 999 | `4000000 - 1` |
| PRC-05 | Min | 4 000 000 | giá thấp nhất trong DB |
| PRC-06 | Min+1 | 4 000 001 | `4000000 + 1` |
| PRC-07 | Max-1 | 44 999 999 | `45000000 - 1` |
| PRC-08 | Max | 45 000 000 | giá cao nhất trong DB |
| PRC-09 | Max+1 | 45 000 001 | `45000000 + 1` |

### 2.3 Biên đảo của hai biến

Giữ `max_price` tại giá cao nhất trong DB. Biên giữa “nhỏ hơn hoặc bằng” và “lớn hơn”:

- `min_price = max_price` vẫn là VEC (PR-VEC-03)
- `min_price = max_price + 1` là điểm IEC đầu tiên (PR-IEC-05)

| ID | Vị trí | min_price | max_price | Quan hệ |
| --- | --- | --- | --- | --- |
| PRC-10 | Trong miền, sát biên | 44 999 999 | 45 000 000 | `min = max - 1` |
| PRC-11 | Trên biên | 45 000 000 | 45 000 000 | `min = max` |
| PRC-12 | Sát ngoài, đảo | 45 000 001 | 45 000 000 | `min = max + 1` |

`PRC-12` là biên đảo được yêu cầu: `min_price = 45000000 + 1 = 45000001`.

## 3. Phân trang

FR-05 và `GET /api/products` không có `page` hay `limit`. Không có số `Limit` để thay vào. Các mốc dưới đây giữ `L` là kích thước trang. Không gán một số trang giả.

`N` là số sản phẩm khớp điều kiện. `MaxPage = 0` khi `N = 0`. Khi `N > 0`, `MaxPage = ceil(N / L)`.

### 3.1 Số sản phẩm khớp

| ID | N | Vị trí so với L | MaxPage | Trang 2 |
| --- | --- | --- | --- | --- |
| PG-01 | 0 | Dưới 1 sản phẩm | 0 | Không có |
| PG-02 | 1 | Một sản phẩm | 1 | Không có |
| PG-03 | L - 1 | Sát dưới một trang đầy | 1 | Không có |
| PG-04 | L | Đúng một trang | 1 | Không có dòng |
| PG-05 | L + 1 | Sát trên một trang | 2 | Đúng 1 sản phẩm |

Catalog seed đang có 5 sản phẩm. `N = 0` và `N = 1` tính được ngay. `L - 1`, `L`, `L + 1` chưa thành số vì `L` không có trong spec.

### 3.2 Số trang được truy cập

Miền trang hợp lệ, nếu phân trang tồn tại và đánh số từ 1, là `1 .. MaxPage`.

Ba giá trị biên dưới: `0`, `1`, `2`. `page = -1` là điểm được yêu cầu thêm, nằm dưới cả `Min-1`.

| ID | page | Vị trí | Khi nào thành số |
| --- | --- | --- | --- |
| PG-06 | -1 | Dưới Min-1 | Luôn là -1 |
| PG-07 | 0 | Min-1 | Luôn là 0 |
| PG-08 | 1 | Min | Luôn là 1 |
| PG-09 | 2 | Min+1 | Luôn là 2 |
| PG-10 | MaxPage - 1 | Max-1 | Phụ thuộc N và L |
| PG-11 | MaxPage | Max | Phụ thuộc N và L |
| PG-12 | MaxPage + 1 | Max+1 | Phụ thuộc N và L |

Trường hợp PG-05 (`N = L + 1`, trang 2 có đúng 1 sản phẩm) cho ba mốc trên thành số:

- `MaxPage = ceil((L + 1) / L) = 2`
- `MaxPage - 1 = 1`
- `MaxPage + 1 = 3`

| ID | page | Vai trò trong case trang 2 có 1 sản phẩm |
| --- | --- | --- |
| PG-10 | 1 | MaxPage - 1 |
| PG-11 | 2 | MaxPage, trang này có đúng 1 sản phẩm |
| PG-12 | 3 | MaxPage + 1 |

Khi `N = 0`, `MaxPage + 1 = 1`. Khi `N` là 1, `L - 1`, hoặc `L`, `MaxPage = 1` và `MaxPage + 1 = 2`.

## Việc cố ý chưa làm

Chưa ghép các mốc này thành test case. `Limit` chưa được bịa thành 10 hay 20.
