# Hồ sơ nộp bài HW02 Domain Testing

## Thông tin sinh viên

- MSSV: `23120117`
- Họ và tên: `Võ Hoàng Danh`
- Bài tập: `HW02 - Domain Testing on EShop`
- Điểm tự đánh giá: `100/100`

## Thành phần hồ sơ

| Thư mục | Nội dung |
|---|---|
| `01_MainReport` | Báo cáo Domain Testing và Boundary Value Analysis bằng Markdown và Word. |
| `02_BugReport` | Báo cáo tổng hợp 12 lỗi và các bug report chi tiết. Không kèm ảnh chụp GitHub Issues. |
| `03_AI_Critique` | Bài phê bình việc sử dụng AI dài 200-300 từ bằng Markdown và Word. |
| `04_Tai_lieu_ho_tro` | Agent Skills, test case, test script, kết quả chạy, ma trận truy vết và ảnh bằng chứng kiểm thử hiện có. |

## Bảng tự đánh giá

| STT | Tiêu chí | Điểm tối đa | Điểm tự đánh giá |
|:---:|---|---:|---:|
| 1 | Feature A - Domain Testing và Boundary Value Analysis | 25 | 25 |
| 2 | Feature B - Domain Testing và Boundary Value Analysis | 25 | 25 |
| 3 | Feature C - Domain Testing và Boundary Value Analysis | 25 | 25 |
| 4 | Feature D Mobile - Domain Testing và Boundary Value Analysis | 15 | 15 |
| 5 | Agent Skills | 10 | 10 |
| | **Tổng** | **100** | **100** |

## Test summary report

| Nhóm | Tính năng | TestCase | Đã chạy | Pass | Fail | Chưa chạy | Lỗi |
|:---:|---|---:|---:|---:|---:|---:|---:|
| A | FR-01 Đăng ký tài khoản Web | 26 | 26 | 15 | 11 | 0 | 1 |
| B | FR-07 Giỏ hàng Web | 12 | 3 | 1 | 2 | 9 | 1 |
| C | FR-17 Quản lý mã giảm giá Web Admin | 20 | 18 | 11 | 7 | 2 | 6 |
| D | FR-01 Đăng ký tài khoản Mobile | 37 | 37 | 20 | 17 | 0 | 4 |
| **Tổng** | **4 tính năng** | **95** | **84** | **47** | **37** | **11** | **12** |


## Lỗi được ghi nhận

- 8 bug report có sẵn cho phiên bản Web và Web Admin.
- 5 bug report Mobile được tổng hợp từ kết quả FR-01 và đối chiếu với mã nguồn hiện tại.
- Các test Mobile Fail nhưng không có Actual Result chi tiết được liệt kê trong báo cáo chính ở nhóm cần tái kiểm thử; chúng không được tự động quy thành lỗi mới.

## Video demo Agent Skills

Đường dẫn: https://youtu.be/tesHNpyi8hI
