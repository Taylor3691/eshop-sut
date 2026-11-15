# Phân tích pain point

## Bảng phân tích theo issue

| Issue ID | Mô tả pain point | Flow step | Số participant/tín hiệu | Participant IDs | Quan sát hỗ trợ | Tác động đến hoàn thành | Cải thiện đề xuất |
|---|---|---|---:|---|---|---|---|
| UF-01 | Chữ tiếng Việt lỗi mã hóa | Login, Cart, Coupon, Checkout | 1 trực tiếp; UI rộng | P01 trực tiếp | BUG-SIM-001 và 3 ảnh P01 | Có thể làm người dùng không đọc được nhãn/trạng thái; chưa chứng minh bị chặn | Sửa UTF-8, kiểm tra chuỗi và thông báo |
| UF-02 | Tiêu đề/nhãn login không đúng ngữ nghĩa | Login | 2 tín hiệu + 1 trực tiếp | P01, P03; P01 ảnh | P01 nhầm registration; P03 dừng ở tiêu đề; BUG-SIM-002 | Tăng do dự ở bước đầu, có thể nhập sai ngữ cảnh | Đổi tiêu đề “Đăng nhập”, nhãn email và nút tiếng Việt |
| UF-03 | Password plaintext | Login | Không xác định | Không có tín hiệu persona riêng | BUG-SIM-002 và Login UI | Không chặn flow nhưng làm giảm an tâm và riêng tư | Dùng `type="password"` |
| UF-04 | Tổng tiền checkout có thể sửa | Checkout | 3 tín hiệu + 1 trực tiếp | P01, P04, P07; P04 rõ nhất | FR-08, ảnh checkout, P04 đối chiếu tổng | Có thể khiến người dùng không tin số phải trả; rủi ro nghiệp vụ | Tính ở server, trường tổng chỉ đọc |
| UF-05 | Khó tìm coupon/badge và hiểu lỗi coupon | Cart, Apply Coupon | 4 tín hiệu | P02, P03, P05, P06 | Session summary/observation/interview tương ứng | Tăng tìm kiếm và thao tác sửa; hồ sơ vẫn mô tả hoàn tất | Làm rõ affordance, điều kiện, lỗi và khoản giảm |
| UF-06 | Feedback checkout/order chưa đủ rõ | Checkout, Verify Order | 3 tín hiệu | P02, P06, P07 | Kiểm tra lịch sử/trạng thái và cần xác nhận rõ | Có thể làm người dùng không chắc đơn đã tạo | Toast, mã đơn, tổng và trạng thái tiếng Việt |
| UF-07 | Logout khó nhận biết | Logout | 1 tín hiệu | P07 | P07 dừng trước nhãn logout | Không chặn automation nhưng làm kết thúc phiên kém rõ | Nhãn “Đăng xuất”, feedback và xác nhận session |

## Phân nhóm nguyên nhân

- **Khả năng đọc và ngữ nghĩa:** UF-01, UF-02.
- **Tin cậy giao dịch:** UF-03, UF-04.
- **Khám phá và phục hồi:** UF-05.
- **Phản hồi trạng thái và an toàn phiên:** UF-06, UF-07.

## Cảnh báo diễn giải

Các con số trên là số hồ sơ hoặc tín hiệu trong dataset mô phỏng, không phải
tỷ lệ dân số. Completion time, error count thực tế và assistance count không
có trong hồ sơ; không chuyển các tín hiệu persona thành defect rate.
