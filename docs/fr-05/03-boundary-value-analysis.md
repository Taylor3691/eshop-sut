# FR-05 — Chọn điểm on/off/in/out và phân tích biên

## A. Domain testing — chọn điểm on/off/in/out

Quy ước theo bài giảng domain testing:

- **On point:** giá trị nằm đúng trên biên.
- **Off point:** giá trị gần biên nhất nằm ở phía bên kia biên. Biên đóng (`≥`) thì off point nằm ngoài miền; biên mở (`>`) thì off point nằm trong miền.
- **In point:** giá trị điển hình nằm trong miền, không sát biên.
- **Out point:** giá trị điển hình nằm ngoài miền, không sát biên.

Chỉ áp dụng cho biến có thứ tự. Các lớp liệt kê ở bước 2 (khớp/không khớp, hoa thường, dấu, `%`, `_`, `'`, `&`, `#`, `?`, HTML) không có biên nên không có on/off; chúng được phủ bằng một giá trị đại diện mỗi lớp.

### A.1 Độ dài từ khóa — biên `len(search) ≥ 1`

Miền "có lọc theo tên" là `len ≥ 1` (biên đóng). Miền kề bên `len = 0` là "hiện tất cả sản phẩm".

| Điểm | Giá trị | Thuộc miền | Test case |
| --- | --- | --- | --- |
| On | `a` (len 1) | Có lọc | TC-10 |
| Off | `""` (len 0) | Hiện tất cả | TC-08 |
| In | `iPhone` (len 6) | Có lọc | TC-01 |
| Out | `""` (len 0) | Hiện tất cả | TC-08 |

Độ dài không âm, nên out point trùng off point. Không có biên trên (README không nêu MaxLength).

### A.2 Số sản phẩm trong CSDL — biên `N ≥ 1`

Miền CAT-VEC-02 "có sản phẩm để hiện lưới" là `N ≥ 1` (biên đóng). `N = 0` là CAT-VEC-01, phải hiện trang trống.

| Điểm | N | Thuộc miền | Test case |
| --- | --- | --- | --- |
| On | 1 | Có lưới | TC-53 |
| Off | 0 | Trang trống | TC-52 |
| In | 5 (seed) | Có lưới | TC-08 |
| Out | 0 | Trang trống | TC-52 |

Số dòng không âm, nên out point trùng off point. README không có giới hạn trên.

## B. Boundary value analysis

FR-05 không quy định độ dài tối đa của từ khóa. Giới hạn tên sản phẩm ở FR-15 không phải giới hạn ô tìm kiếm. Không áp dụng Max = 255 cho từ khóa.

### B.1 Biên chuyển trạng thái rỗng / không rỗng

| ID | Độ dài | Giá trị | Ý nghĩa |
| --- | --- | --- | --- |
| LEN-01 | 0 | Chuỗi rỗng | Liệt kê tất cả sản phẩm |
| LEN-02 | 1 | a | Đầu lớp chuỗi không rỗng |
| LEN-03 | 2 | aa | Bên trong lớp chuỗi không rỗng |

Các mã LEN-04, LEN-05, LEN-06 giữ các chuỗi 254, 255, 256 ký tự làm kiểm thử độ bền bổ sung, không phải Max-1/Max/Max+1 của search. Không được mong đợi lỗi độ dài vì spec không nêu giới hạn.

Khoảng trắng: 0, 1, 2 dấu cách kiểm tra chuyển từ rỗng sang chuỗi chỉ dấu cách; chính sách trim chưa được spec chốt. `%`, `_`, nháy đơn, `&`, `#`, `?` là các lớp ký tự, không phải biên số.

Không lập BVA giá, sort, danh mục hoặc phân trang cho FR-05. Không dùng ký hiệu L và không tạo test blocked cho chức năng không được yêu cầu.
