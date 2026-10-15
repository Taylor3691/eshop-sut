# FR-11 — Boundary Value Analysis, 3-value

Chức năng: **FR-11 Xem lịch sử đơn hàng (User)**.

Kỹ thuật: với biên đóng `[Min, Max]`, lấy `Min-1`, `Min`, `Min+1`, `Max-1`, `Max`, `Max+1`. Giá trị `Min` và `Max` nằm trên biên. `Min+1` và `Max-1` nằm trong miền. `Min-1` và `Max+1` nằm sát ngoài miền.

Miền lấy từ bước 2 (`docs/fr-11/02-equivalence-partitioning.md`). Bước này chỉ tính số. Chưa viết test case.

Người gọi ở các mốc dưới đây là user id 2 (`test@eshop.com`). Seed không có đơn. Mỗi mốc là số dòng cần tạo.

Phiên đăng nhập, JWT, năm trạng thái FR-10 và query thừa là miền liệt kê, không có `[Min, Max]`. Không gán số cho chúng. FR-11 không có phân trang, nên không đặt `Limit` và không lập biên `page`.

## 1. Số đơn của người gọi

Lớp có đơn bắt đầu tại `N = 1` (CNT-VEC-02). `N = 0` là lớp trang trống kế bên (CNT-VEC-01), không phải lỗi.

FR-11 không khai báo số đơn tối đa. Không bịa Max. Không có bộ `Max-1`, `Max`, `Max+1`.

| ID | Vị trí | N | So với miền N ≥ 1 |
| --- | --- | --- | --- |
| CNT-B-01 | Min-1 | 0 | Sát dưới Min. Lớp CNT-VEC-01, trang trống |
| CNT-B-02 | Min | 1 | Trên biên dưới. Đủ để hiện bảng một dòng |
| CNT-B-03 | Min+1 | 2 | Trong miền. Đúng giá trị đại diện CNT-VEC-02 |

## 2. Chủ đơn là một điểm

Miền "đơn của mình" là điểm `user_id = 2`, không phải một khoảng. `Min = Max = 2`, nên bộ biên trên trùng bộ biên dưới: `1`, `2`, `3`.

`1` là admin trong seed. `3` không có tài khoản seed; dòng đơn vẫn có thể mang `user_id = 3`. Cả `1` và `3` đều là OWN-VEC-02.

| ID | Vị trí | user_id của đơn | Người gọi | Lớp bước 2 |
| --- | --- | --- | --- | --- |
| OWN-B-01 | Min-1 | 1 | 2 | OWN-VEC-02. Đơn không được xuất hiện |
| OWN-B-02 | Min = Max | 2 | 2 | OWN-VEC-01. Đơn được xuất hiện |
| OWN-B-03 | Min+1 | 3 | 2 | OWN-VEC-02. Đơn không được xuất hiện |

## 3. Mã đơn

Mã hợp lệ là số nguyên dương (ID-VEC-01). `Min = 1`. Không có Max trong FR-11.

| ID | Vị trí | id | Cách hiện |
| --- | --- | --- | --- |
| ID-B-01 | Min-1 | 0 | Sát dưới Min. Không phải mã tự tăng thông thường |
| ID-B-02 | Min | 1 | Trên biên dưới. Hiện kèm mã `1` |
| ID-B-03 | Min+1 | 2 | Trong miền. Hiện kèm mã `2` |

## 4. Tổng tiền

`0` và số âm vẫn thuộc AMT-VEC-01. Ba giá trị quanh `0` là các điểm trong cùng một lớp, không phải IEC.

Mốc phân cách lấy từ FR-21: định dạng hàng nghìn. Ngưỡng đầu tiên của dấu phân cách là `1000`. Ngưỡng nhóm tiếp theo là `1000000`. Không có trần số tiền, nên không có `Max+1` của một Max spec.

`NULL` không phải `0 - 1`. Đó là AMT-IEC-01, đã chốt ở bước 2.

Chuỗi tiền dưới đây là dạng `vi-VN` kèm `₫`.

### 4.1 Mốc 0

| ID | Vị trí | total_amount | Dạng phải hiện | Lớp |
| --- | --- | --- | --- | --- |
| AMT-B-01 | Dưới mốc | -1 | `-1 ₫` | AMT-VEC-01 |
| AMT-B-02 | Đúng mốc | 0 | `0 ₫` | AMT-VEC-01 |
| AMT-B-03 | Trên mốc | 1 | `1 ₫` | AMT-VEC-01 |

### 4.2 Mốc 1 000

| ID | Vị trí | total_amount | Dạng phải hiện |
| --- | --- | --- | --- |
| AMT-B-04 | Min-1 | 999 | `999 ₫` |
| AMT-B-05 | Min | 1000 | `1.000 ₫` |
| AMT-B-06 | Min+1 | 1001 | `1.001 ₫` |

### 4.3 Mốc 1 000 000

| ID | Vị trí | total_amount | Dạng phải hiện |
| --- | --- | --- | --- |
| AMT-B-07 | Min-1 | 999999 | `999.999 ₫` |
| AMT-B-08 | Min | 1000000 | `1.000.000 ₫` |
| AMT-B-09 | Min+1 | 1000001 | `1.000.001 ₫` |

## 5. Ngày đặt

FR-11 không có khoảng đóng cho ngày. Không lấy năm nhỏ nhất hay năm lớn nhất. Điểm sát ngoài miền "có ngày đặt" là `created_at = NULL` (DT-IEC-01).

## Việc cố ý chưa làm ở bước này

Chưa ghép các mốc thành test case.
