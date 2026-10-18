# FR-05 mobile — Chọn điểm on/off/in/out và phân tích biên

## A. Domain testing — chọn điểm on/off/in/out

On point nằm đúng trên biên. Off point là giá trị gần biên nhất ở phía bên kia (biên đóng `≥` thì off point nằm ngoài miền). In point và out point là giá trị điển hình trong và ngoài miền. Các lớp ký tự (`%`, `_`, `'`, `&`, `#`, `?`, HTML), hoa thường và dấu là miền liệt kê, không có on/off.

### A.1 Độ dài từ khóa — biên `len(search) ≥ 1`

| Điểm | Giá trị | Thuộc miền | Test case |
| --- | --- | --- | --- |
| On | `a` (1) | Có lọc | TC-10 |
| Off | `""` (0) | Hiện tất cả | TC-08 |
| In | `iPhone` (6) | Có lọc | TC-01 |
| Out | `""` (0) | Hiện tất cả | TC-08 |

### A.2 Số sản phẩm trong CSDL — biên `N ≥ 1`

| Điểm | N | Thuộc miền | Test case |
| --- | --- | --- | --- |
| On | 1 | Có danh sách | TC-25 |
| Off | 0 | Trang trống | TC-24 |
| In | 5 (seed) | Có danh sách | TC-08 |
| Out | 0 | Trang trống | TC-24 |

Độ dài và số dòng không âm, nên out point trùng off point.

Độ rộng màn hình (VIEW-VEC-01..03) không có on/off: ranh giới 360 và 600 px là giả định chia nhóm thiết bị, README không đặt breakpoint nào để kiểm tra hai phía.

## B. Boundary value analysis

FR-05 không quy định độ dài tối đa của từ khóa. Giới hạn tên sản phẩm ở FR-15 không phải giới hạn ô tìm kiếm. Không áp dụng Max = 255 cho từ khóa.

### B.1 Biên chuyển trạng thái rỗng / không rỗng

| ID | Độ dài | Giá trị | Ý nghĩa |
| --- | --- | --- | --- |
| LEN-B-01 | 0 | Chuỗi rỗng | Liệt kê tất cả sản phẩm |
| LEN-B-02 | 1 | a | Đầu lớp chuỗi không rỗng |
| LEN-B-03 | 2 | aa | Bên trong lớp chuỗi không rỗng |

Các mã LEN-B-04, LEN-B-05, LEN-B-06 giữ các chuỗi 254, 255, 256 ký tự làm kiểm thử độ bền bổ sung, không phải Max-1/Max/Max+1 của search. Không được mong đợi lỗi độ dài vì spec không nêu giới hạn.

Khoảng trắng: 0, 1, 2 dấu cách kiểm tra chuyển từ rỗng sang chuỗi chỉ dấu cách; chính sách trim chưa được spec chốt. `%`, `_`, nháy đơn, `&`, `#`, `?` là các lớp ký tự, không phải biên số.

Không lập BVA giá, sort, danh mục hoặc phân trang cho FR-05. Không dùng ký hiệu L và không tạo test blocked cho chức năng không được yêu cầu.
