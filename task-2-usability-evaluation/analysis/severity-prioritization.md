# Ưu tiên mức độ nghiêm trọng

## Tiêu chí

- **Critical:** ngăn hoàn thành nhiệm vụ.
- **High:** ảnh hưởng nghiêm trọng đến hoàn thành, tính đúng hoặc an toàn.
- **Medium:** gây nhầm lẫn, do dự hoặc thêm công sức nhưng vẫn có đường hoàn tất.
- **Low:** bất tiện/visual nhỏ, không ảnh hưởng đáng kể đến flow.

Đây là đánh giá QA/UX trên bằng chứng mô phỏng, không phải severity đo từ người
dùng thật.

| Issue ID | Finding type | Severity | Lý do | Bằng chứng |
|---|---|---|---|---|
| UF-01 | Confirmed UI bug + systemic usability issue | High | Lỗi chữ xuất hiện ở nhiều màn hình cốt lõi, làm giảm khả năng đọc nhãn và feedback; chưa có bằng chứng chặn hoàn thành nên không là Critical | BUG-SIM-001; P01 screenshots |
| UF-02 | Confirmed functional/UI bug + systemic usability issue | High | Nhãn sai có thể khiến người dùng hiểu sai bước đầu; P01 có tín hiệu nhầm login/registration; flow máy vẫn hoàn tất nên chưa là Critical | BUG-SIM-002; P01/P03 records |
| UF-03 | Confirmed functional/UI bug | High | Password plaintext tạo rủi ro riêng tư và giảm trust; không chặn flow nhưng cần sửa ngay | BUG-SIM-002 |
| UF-04 | Confirmed functional bug | High | Tổng checkout trái FR-08 và có thể làm sai/không đáng tin số tiền thanh toán; không có bằng chứng flow bị chặn | Checkout screenshot; FR-08; P01/P04/P07 |
| UF-05 | Systemic usability issue | Medium | Nhiều tín hiệu về tìm coupon, lỗi và khoản giảm; persona vẫn hoàn tất, chưa có time/assistance đo được | P02/P03/P05/P06 records |
| UF-06 | Systemic usability issue | Medium | Thiếu feedback rõ có thể gây kiểm tra lặp hoặc không chắc đơn đã tạo; không ngăn checkpoint máy | P02/P06/P07 records |
| UF-07 | Isolated usability difficulty | Medium | Một persona dừng ở logout; ảnh hưởng kết thúc phiên nhưng không làm automation thất bại | P07 records |
| UF-08 | Positive usability observation | Không áp dụng | 7/7 lượt đạt 6 checkpoint, là tín hiệu ổn định của flow tự động | `run-results.json`, screenshots/videos |

Không có finding nào được xếp Critical vì cả 42/42 checkpoint Playwright đều
PASS và hồ sơ không ghi nhận bỏ cuộc. Điều này không chứng minh người dùng thật
không thể bị chặn; chỉ giới hạn kết luận của dataset.

## Thứ tự xử lý

1. **High:** UF-01, UF-02, UF-03, UF-04 — sửa trước vì liên quan khả năng đọc,
   an toàn thông tin và độ đúng của tổng thanh toán.
2. **Medium:** UF-05, UF-06, UF-07 — chuẩn hóa feedback và discoverability.
3. **Theo dõi:** UF-08 — giữ regression check cho flow tự động.
