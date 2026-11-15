# Kết quả ghi nhận và kiểm tra phiên

## Phương pháp và nguồn dữ liệu

Bảy bộ hồ sơ P01–P07 được xử lý như **một bộ dữ liệu đánh giá mô phỏng hoàn
chỉnh** cho bài tập độc lập này. Mỗi bộ gồm kết quả Playwright, ảnh/video
checkpoint, nhật ký quan sát được gắn nhãn mô phỏng, SUS và phản hồi phỏng vấn
được tạo cho persona. Không có dữ liệu người dùng thật, âm thanh think-aloud,
consent hoặc thời lượng người dùng đo trực tiếp.

Hai lớp bằng chứng được giữ riêng:

1. **Quan sát Playwright:** trạng thái PASS/FAIL của sáu bước trong luồng và
   ảnh/video trình duyệt.
2. **Phản hồi persona tạo sinh:** hành vi, lỗi, ngập ngừng và phỏng vấn trong
   hồ sơ participant; dùng để phân tích giả thuyết, không gọi là quan sát thật.

## Kiểm tra tính nhất quán

- Tất cả P01–P07 đều có `session-summary.md`, `session-notes.md`,
  `observation-log.md`, `sus-responses.md`, `interview-responses.md` và
  `evidence-index.md`.
- Mỗi SUS có đủ 10 câu trả lời trong khoảng 1–5.
- Mỗi lượt Playwright có đủ 6 checkpoint PASS: đăng nhập, giỏ hàng, coupon,
  thanh toán, xác minh đơn và đăng xuất.
- Có 6 ảnh và 1 video mô phỏng cho mỗi participant; tổng cộng 42 ảnh và 7
  video. Các tham chiếu trong evidence index đã được kiểm tra tồn tại.
- Không có completion time của người dùng, số lần hỗ trợ hoặc consent thật.

## Bảng kết quả hợp nhất

| ID | Task completion (Playwright) | Completion time | Sự kiện lỗi trong kịch bản persona | Assistance count | SUS | Quan sát quan trọng |
|---|---|---|---:|---|---:|---|
| P01 | 6/6 PASS (mô phỏng) | NOT PROVIDED | 1 hiểu nhầm trang đăng nhập | NOT PROVIDED | 57,5 | Nhầm đăng nhập với đăng ký; kiểm tra tổng sau coupon. |
| P02 | 6/6 PASS (mô phỏng) | NOT PROVIDED | 0 | NOT PROVIDED | 75 | Tìm ô coupon; chú ý trạng thái thành công và lịch sử đơn. |
| P03 | 6/6 PASS (mô phỏng) | NOT PROVIDED | 1 nhập coupon sai rồi sửa | NOT PROVIDED | 25 | Chữ khó đọc; cần tín hiệu rõ khi sửa coupon. |
| P04 | 6/6 PASS (mô phỏng) | NOT PROVIDED | 0 | NOT PROVIDED | 42,5 | Nghi ngờ tổng thanh toán có thể chỉnh sửa. |
| P05 | 6/6 PASS (mô phỏng) | NOT PROVIDED | 0 | NOT PROVIDED | 82,5 | Tìm badge giỏ; kiểm tra khoản giảm. |
| P06 | 6/6 PASS (mô phỏng) | NOT PROVIDED | 1 nhập coupon sai rồi sửa | NOT PROVIDED | 37,5 | Cần phản hồi rõ; sửa coupon sai trong kịch bản. |
| P07 | 6/6 PASS (mô phỏng) | NOT PROVIDED | 0 | NOT PROVIDED | 82,5 | Kiểm tra đơn; nhãn đăng xuất chưa rõ. |

`Sự kiện lỗi trong kịch bản persona` là số sự kiện được mô tả trong hồ sơ
giả định, không phải error count được quan sát hoặc đo từ video. Vì vậy
`Assistance count` và `Completion time` vẫn là **NOT PROVIDED**.

## Chỉ số tổng hợp

- Hoàn tất Playwright: **7/7 lượt (100%)**, **42/42 checkpoint (100%)**.
- SUS mô phỏng hợp lệ về mặt cấu trúc: **7/7 phiếu**.
- SUS trung bình mô phỏng: **57,50/100**.
- SUS trung vị: **57,5/100**; khoảng: **25–82,5**.
- Không suy diễn tỷ lệ hoàn thành, thời gian hay lỗi của người dùng thật từ
  các tỷ lệ trên.

## Giới hạn

Kết quả mô phỏng xác nhận được tính lặp lại của flow tự động và các vấn đề UI
hiển thị trong ảnh chụp. Nó không xác nhận mức độ khó, cảm xúc, hiệu quả tự
khắc phục hoặc sự hài lòng của người dùng thật. Các kết luận tác động người
dùng cần được kiểm chứng bằng phiên moderated với consent, thời gian đo được,
quan sát trực tiếp và dữ liệu âm thanh/video phù hợp.
