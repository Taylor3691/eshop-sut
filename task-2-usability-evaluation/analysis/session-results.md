# Kết quả ghi nhận và kiểm tra phiên

## Phương pháp và nguồn dữ liệu

Bảy bộ hồ sơ P01–P07 được ghi nhận là **dữ liệu khảo sát người dùng thật** theo
xác nhận của người thực hiện đánh giá ngày 2026-11-16. Kết quả khảo sát trùng
khớp với bộ dữ liệu đã có; tên người tham gia được giữ nguyên. Thông tin liên
hệ masked và consent sẽ được bổ sung thủ công.

Hai lớp bằng chứng được giữ riêng:

1. **Quan sát Playwright:** trạng thái PASS/FAIL của sáu bước trong luồng và
   ảnh/video trình duyệt.
2. **Dữ liệu khảo sát:** hành vi, lỗi, ngập ngừng, phỏng vấn và SUS trong hồ sơ
   participant; cần đối chiếu với phiếu/consent gốc khi hoàn thiện hồ sơ.

## Kiểm tra tính nhất quán

- Tất cả P01–P07 đều có `session-summary.md`, `session-notes.md`,
  `observation-log.md`, `sus-responses.md`, `interview-responses.md` và
  `evidence-index.md`.
- Mỗi SUS có đủ 10 câu trả lời trong khoảng 1–5.
- Mỗi lượt Playwright có đủ 6 checkpoint PASS: đăng nhập, giỏ hàng, coupon,
  thanh toán, xác minh đơn và đăng xuất.
- Có 6 ảnh và 1 video Playwright tự động cho mỗi participant; tổng cộng 42 ảnh
  và 7 video. Các tham chiếu trong evidence index đã được kiểm tra tồn tại.
- Completion time, số lần hỗ trợ và consent chưa được điền trong workspace; đánh
  dấu **NOT PROVIDED** thay vì suy đoán.

## Bảng kết quả hợp nhất

| ID | Task completion (khảo sát/Playwright) | Completion time | Sự kiện lỗi ghi nhận | Assistance count | SUS | Quan sát quan trọng |
|---|---|---|---:|---|---:|---|
| P01 | 6/6 PASS (automation) | NOT PROVIDED | 1 hiểu nhầm trang đăng nhập | NOT PROVIDED | 57,5 | Nhầm đăng nhập với đăng ký; kiểm tra tổng sau coupon. |
| P02 | 6/6 PASS (automation) | NOT PROVIDED | 0 | NOT PROVIDED | 75 | Tìm ô coupon; chú ý trạng thái thành công và lịch sử đơn. |
| P03 | 6/6 PASS (automation) | NOT PROVIDED | 1 nhập coupon sai rồi sửa | NOT PROVIDED | 25 | Chữ khó đọc; cần tín hiệu rõ khi sửa coupon. |
| P04 | 6/6 PASS (automation) | NOT PROVIDED | 0 | NOT PROVIDED | 42,5 | Nghi ngờ tổng thanh toán có thể chỉnh sửa. |
| P05 | 6/6 PASS (automation) | NOT PROVIDED | 0 | NOT PROVIDED | 82,5 | Tìm badge giỏ; kiểm tra khoản giảm. |
| P06 | 6/6 PASS (automation) | NOT PROVIDED | 1 nhập coupon sai rồi sửa | NOT PROVIDED | 37,5 | Cần phản hồi rõ; sửa coupon sai trong kịch bản. |
| P07 | 6/6 PASS (automation) | NOT PROVIDED | 0 | NOT PROVIDED | 82,5 | Kiểm tra đơn; nhãn đăng xuất chưa rõ. |

`Sự kiện lỗi trong hồ sơ` là số sự kiện được ghi nhận trong dữ liệu khảo sát;
không thay thế cho error count nếu phiếu đo gốc chưa có trường này. Vì vậy
`Assistance count` và `Completion time` vẫn là **NOT PROVIDED**.

## Chỉ số tổng hợp

- Hoàn tất Playwright: **7/7 lượt (100%)**, **42/42 checkpoint (100%)**.
- SUS hợp lệ về mặt cấu trúc: **7/7 phiếu**.
- SUS trung bình: **57,50/100**.
- SUS trung vị: **57,5/100**; khoảng: **25–82,5**.
- Không suy diễn tỷ lệ dân số từ mẫu bảy người; completion time và assistance
  vẫn cần bổ sung nếu có trong phiếu gốc.

## Giới hạn

Kết quả khảo sát được ghi nhận là dữ liệu người dùng thật theo xác nhận của
người thực hiện. Tuy nhiên, ảnh/video Playwright hiện có chỉ là bằng chứng tự
động; không gán chúng thành ghi hình phiên người thật. Các trường còn thiếu và
thông tin liên hệ/consent cần được bổ sung từ hồ sơ gốc.
