# FR-11 — Chọn điểm on/off/in/out và Boundary Value Analysis, 3-value

Chức năng: **FR-11 Xem lịch sử đơn hàng (User)**.

## A. Domain testing — chọn điểm on/off/in/out

On point nằm đúng trên biên. Off point là giá trị gần biên nhất ở phía bên kia (biên đóng `≥` thì off point nằm ngoài miền). In point và out point là giá trị điển hình trong và ngoài miền, không sát biên. Chỉ áp dụng cho biến có thứ tự. Phiên, JWT, chủ đơn (bằng/khác người gọi) và năm trạng thái là miền liệt kê, không có on/off.

### A.1 Số đơn của người gọi — biên `N ≥ 1`

| Điểm | N | Thuộc miền | Test case |
| --- | --- | --- | --- |
| On | 1 | Có bảng đơn (CNT-VEC-02) | TC-01 |
| Off | 0 | Empty state (CNT-VEC-01) | TC-02 |
| In | 2 | Có bảng đơn | TC-03 |
| Out | 0 | Empty state | TC-02 |

Số đơn không âm nên out point trùng off point. Không có Max nên in point lấy 2, giá trị nhỏ nhất bên trong miền khác on point.

### A.2 Tổng tiền — biên định dạng `amount ≥ 1000` (bắt đầu có dấu phân cách hàng nghìn)

| Điểm | amount | Dạng phải hiện | Test case |
| --- | --- | --- | --- |
| On | 1000 | `1.000 ₫` | TC-16 |
| Off | 999 | `999 ₫` | TC-15 |
| In | 30000000 | `30.000.000 ₫` | TC-01 |
| Out | 1 | `1 ₫` | TC-14 |

### A.3 Tổng tiền — biên `amount ≥ 1000000` (dấu phân cách thứ hai)

| Điểm | amount | Dạng phải hiện | Test case |
| --- | --- | --- | --- |
| On | 1000000 | `1.000.000 ₫` | TC-19 |
| Off | 999999 | `999.999 ₫` | TC-18 |
| In | 30000000 | `30.000.000 ₫` | TC-01 |
| Out | 1000 | `1.000 ₫` | TC-16 |

## B. Boundary value analysis

Kỹ thuật: với biên đóng `[Min, Max]`, lấy `Min-1`, `Min`, `Min+1`, `Max-1`, `Max`, `Max+1`. Giá trị `Min` và `Max` nằm trên biên. `Min+1` và `Max-1` nằm trong miền. `Min-1` và `Max+1` nằm sát ngoài miền.

Miền lấy từ bước 2 (`docs/fr-11/02-equivalence-partitioning.md`). Bước này chỉ tính số. Chưa viết test case.

Người gọi ở các mốc dưới đây là user id 2 (`test@eshop.com`). Seed không có đơn. Mỗi mốc là số dòng cần tạo.

Phiên đăng nhập, JWT, năm trạng thái FR-10 và query thừa là miền liệt kê, không có `[Min, Max]`. Không gán số cho chúng. FR-11 không có phân trang, nên không đặt `Limit` và không lập biên `page`.

### B.1 Số đơn của người gọi

Lớp có đơn bắt đầu tại `N = 1` (CNT-VEC-02). `N = 0` là lớp trang trống kế bên (CNT-VEC-01), không phải lỗi.

FR-11 không khai báo số đơn tối đa. Không bịa Max. Không có bộ `Max-1`, `Max`, `Max+1`.

| ID | Vị trí | N | So với miền N ≥ 1 |
| --- | --- | --- | --- |
| CNT-B-01 | Min-1 | 0 | Sát dưới Min. Lớp CNT-VEC-01, trang trống |
| CNT-B-02 | Min | 1 | Trên biên dưới. Đủ để hiện bảng một dòng |
| CNT-B-03 | Min+1 | 2 | Trong miền. Đúng giá trị đại diện CNT-VEC-02 |

### B.2 Quan hệ sở hữu và mã đơn — kiểm tra bổ sung

ID là định danh, không phải đại lượng liên tục. Người gọi id 2 và chủ đơn id 1/2/3 kiểm tra hai lớp bằng/khác, không phải Min-1/Min/Min+1. Mã OWN-B-01..03 cũ chỉ giữ để truy vết TC-04, TC-01, TC-05.

FR-11 không quy định biên mã đơn. ID-B-01..03 (0,1,2; TC-06, TC-01, TC-07) là kiểm tra hiển thị dữ liệu fixture, không khẳng định id 0 là mã đơn hợp lệ trong nghiệp vụ.

### B.3 Tổng tiền

`0` và số âm vẫn thuộc AMT-VEC-01. Ba giá trị quanh `0` là các điểm trong cùng một lớp, không phải IEC.

Mốc phân cách lấy từ FR-21: định dạng hàng nghìn. Ngưỡng đầu tiên của dấu phân cách là `1000`. Ngưỡng nhóm tiếp theo là `1000000`. Không có trần số tiền, nên không có `Max+1` của một Max spec.

`NULL` không phải `0 - 1`. Đó là AMT-IEC-01, đã chốt ở bước 2.

Chuỗi tiền dưới đây là dạng `vi-VN` kèm `₫`.

#### B.3.1 Mốc 0

| ID | Vị trí | total_amount | Dạng phải hiện | Lớp |
| --- | --- | --- | --- | --- |
| AMT-B-01 | Dưới mốc | -1 | `-1 ₫` | AMT-VEC-01 |
| AMT-B-02 | Đúng mốc | 0 | `0 ₫` | AMT-VEC-01 |
| AMT-B-03 | Trên mốc | 1 | `1 ₫` | AMT-VEC-01 |

#### B.3.2 Mốc 1 000

| ID | Vị trí | total_amount | Dạng phải hiện |
| --- | --- | --- | --- |
| AMT-B-04 | Min-1 | 999 | `999 ₫` |
| AMT-B-05 | Min | 1000 | `1.000 ₫` |
| AMT-B-06 | Min+1 | 1001 | `1.001 ₫` |

#### B.3.3 Mốc 1 000 000

| ID | Vị trí | total_amount | Dạng phải hiện |
| --- | --- | --- | --- |
| AMT-B-07 | Min-1 | 999999 | `999.999 ₫` |
| AMT-B-08 | Min | 1000000 | `1.000.000 ₫` |
| AMT-B-09 | Min+1 | 1000001 | `1.000.001 ₫` |

### B.4 Ngày đặt

FR-11 không có khoảng đóng cho ngày. Không lấy năm nhỏ nhất hay năm lớn nhất. Trường hợp thiếu dữ liệu (không phải điểm liền kề theo thứ tự ngày) là `created_at = NULL` (DT-IEC-01).

## Việc cố ý chưa làm ở bước này

Chưa ghép các mốc thành test case.
