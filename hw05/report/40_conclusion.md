### Kết luận

1. **Hệ thống đáp ứng tải bình thường rất tốt:** Load 30 thread có p95 4 ms, 0 lỗi; Spike không làm suy giảm (dù biên độ spike nhỏ so với năng lực).
2. **Năng lực bị giới hạn bởi một luồng Node.js:** đỉnh Stress ≈ 8.930 request/giây khi CPU `node` đã ≈ 101%; điểm bão hòa đo riêng ≈ 11.400 request/giây. Máy 10 nhân nhưng backend chỉ dùng được một.
3. **Vấn đề nghiêm trọng nhất chỉ lộ ra khi chạy lâu:** Soak giữ ≈ 6.800 request/giây trong 7 phút rồi suy giảm (throughput −20%, p99 tăng ≈70 lần) trong khi RAM tăng 79 → 329 MB. Giả thuyết chính là `userCarts` không được giải phóng (#229); chưa loại trừ khả năng máy không quạt bị hạ xung.
4. **Bug chức năng tìm được qua kiểm thử hiệu năng:** khóa tài khoản sau 2 lần sai (#225), coupon phần trăm tính sai (#20), lộ stack trace (#226), `price` sai kiểu (#228), 200 thay vì 404 (#227), SQL injection ở tìm kiếm (demo skill).
5. **Về làm việc với AI:** AI sinh plan và phân tích nhanh nhưng sai ở những chỗ cần đối chiếu dữ liệu thật (percentile của report, throughput trung bình, cột `IdleTime`, cặp dữ liệu so sánh). Mọi kết luận trong báo cáo đều tính lại từ file `.jtl`.

Để phát hiện sớm các vấn đề trên (đặc biệt là suy giảm theo thời gian và regression vài millisecond), phần dưới đề xuất một mô hình kiểm thử hiệu năng liên tục.
