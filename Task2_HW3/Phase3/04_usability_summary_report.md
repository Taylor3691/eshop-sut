# Phase 3 — Báo cáo tổng kết Usability Evaluation

## 1. Tóm tắt điều hành

- **SUT/URL:** `[TỰ ĐIỀN]`
- **Luồng:** Đăng nhập → xem chi tiết sản phẩm → chọn số lượng → thêm giỏ → kiểm tra giỏ → đăng xuất.
- **Phương pháp:** Moderated usability evaluation, think-aloud, SUS và câu hỏi mở.
- **Quy mô:** 7 phiên độc lập (P01–P07) + 1 pilot P00.
- **Khoảng thời gian:** 15/11/2026 (thời điểm 7 người gửi form khảo sát).
- **SUS trung bình:** 77,9 / 100.
- **Tỷ lệ hoàn thành toàn luồng:** Không xác định từ form khảo sát.
- **Kết luận ngắn:** Điểm SUS trung bình cao hơn mốc tham chiếu 68. Tuy nhiên, form không ghi nhận kết quả thao tác theo từng mốc; hai phản hồi đơn lẻ về trạng thái đăng nhập và chọn số lượng cần được kiểm tra lại bằng quan sát hoặc tái hiện.

## 2. Người tham gia và phương pháp

Tóm tắt từ `../Phase1/04_participant_roster.md` theo nhóm tuổi/bối cảnh/tần suất mua online, không công bố danh tính hoặc liên hệ. Nêu rõ rằng tất cả 7 người ở ngoài lớp HW03 và mỗi người có một phiên riêng.

`[TỰ VIẾT: cách điều phối, think-aloud, consent, thiết bị/môi trường và mọi khác biệt giữa các phiên.]`

## 3. Kết quả định lượng

| Mốc | Hoàn thành độc lập | Gặp khó/cần hỗ trợ | Không hoàn thành | Thời gian trung bình | Ghi chú |
|---|---:|---:|---:|---|---|
| M1 Đăng nhập | `Không có dữ liệu` | `Không có dữ liệu` | `Không có dữ liệu` | `Không có dữ liệu` | Form chỉ hỏi cảm nhận sau phiên. |
| M2 Chi tiết sản phẩm | `Không có dữ liệu` | `Không có dữ liệu` | `Không có dữ liệu` | `Không có dữ liệu` | Form chỉ hỏi cảm nhận sau phiên. |
| M3 Chọn số lượng | `Không có dữ liệu` | `Không có dữ liệu` | `Không có dữ liệu` | `Không có dữ liệu` | Form chỉ hỏi cảm nhận sau phiên. |
| M4 Thêm giỏ | `Không có dữ liệu` | `Không có dữ liệu` | `Không có dữ liệu` | `Không có dữ liệu` | Form chỉ hỏi cảm nhận sau phiên. |
| M5 Kiểm tra giỏ | `Không có dữ liệu` | `Không có dữ liệu` | `Không có dữ liệu` | `Không có dữ liệu` | Form chỉ hỏi cảm nhận sau phiên. |
| M6 Đăng xuất | `Không có dữ liệu` | `Không có dữ liệu` | `Không có dữ liệu` | `Không có dữ liệu` | Form không hỏi trực tiếp về đăng xuất. |
| Toàn luồng | `Không có dữ liệu` | `Không có dữ liệu` | `Không có dữ liệu` | `Không có dữ liệu` | Không suy ra được từ điểm SUS hay câu trả lời mở. |

Điền điểm SUS và diễn giải tại [01_sus_scoring.md](01_sus_scoring.md). Nêu cả các giá trị thiếu/ngoại lệ, nếu có.

## 4. Kết quả định tính

### Clarity

Sáu người trả lời rằng hệ thống giúp họ nhận biết đăng nhập thành công, trong khi P04 trả lời “Không”. Cả bảy người trả lời rằng họ dễ tìm iPhone 15 Pro Max và kiểm tra đúng sản phẩm cùng số lượng 2 trong giỏ.

### Error recovery

P03 cho biết đã phải thêm sản phẩm hai lần để đạt số lượng 2 và sau đó thấy hai dòng cùng sản phẩm, mỗi dòng số lượng 1. Form không ghi nhận cách người tham gia sửa tình huống này; cần tái hiện trước khi kết luận về khả năng khôi phục lỗi.

### Speed & efficiency

Không có dữ liệu thời gian, số lần nhấp hoặc ghi nhận do dự trong form, nên không đánh giá được tốc độ và hiệu quả của luồng.

### Trust

Cả bảy người trả lời rằng họ dễ kiểm tra sản phẩm và số lượng trong giỏ, đồng thời tự tin hoàn thành lại luồng mà không cần hỗ trợ. Form không hỏi trực tiếp về cảm nhận an toàn tài khoản hoặc đăng xuất.

## 5. Findings ưu tiên và bug

Tham chiếu [02_qualitative_synthesis.md](02_qualitative_synthesis.md) và [03_severity_ranked_findings.md](03_severity_ranked_findings.md). Liệt kê chỉ genuine bug đã tái hiện ở bảng dưới và liên kết issue thật.

| Bug ID | Mô tả ngắn | Severity | Bằng chứng thật | GitHub Issue |
|---|---|---:|---|---|
| `[BUG-...]` | `[TỰ ĐIỀN]` | `[1–4]` | `[đường dẫn ảnh]` | `[URL]` |

## 6. Khuyến nghị

| Ưu tiên | Khuyến nghị có thể thực hiện | Finding/bug hỗ trợ | Tác động mong đợi |
|---:|---|---|---|
| 1 | Tái hiện phản hồi của P03; nếu xác nhận, hiển thị bộ chọn số lượng rõ ràng và gộp cùng sản phẩm thành một dòng trong giỏ. | `QF-02` | Giảm nhầm lẫn khi mua nhiều hơn một sản phẩm. |
| 2 | Kiểm tra lại trạng thái/thông báo đăng nhập thành công và làm tín hiệu này dễ nhận thấy hơn nếu cần. | `QF-01` | Giúp người dùng xác nhận họ đã đăng nhập. |
| 3 | Ở vòng đánh giá tiếp theo, ghi nhận kết quả từng mốc, thời gian, do dự và hỗ trợ của moderator. | `Giới hạn dữ liệu hiện có` | Cho phép đo tỷ lệ hoàn thành và xác minh tần suất của các finding. |

## 7. Giới hạn

Mẫu chỉ gồm 7 người. Form chỉ thu điểm SUS và phản hồi sau phiên; không có dữ liệu kết quả theo mốc, thời gian, thao tác, do dự, môi trường thiết bị hoặc bằng chứng tái hiện. Vì vậy, không thể suy ra tỷ lệ hoàn thành, tốc độ hoặc xếp mức severity chỉ từ dữ liệu này.
