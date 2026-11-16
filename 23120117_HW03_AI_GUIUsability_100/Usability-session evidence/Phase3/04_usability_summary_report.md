# Phase 3 — Báo cáo tổng kết Usability Evaluation

## 1. Tóm tắt điều hành

- **SUT/URL:** `https://penalties-shown-sessions-capital.trycloudflare.com/` (URL được ghi nhất quán trong P01–P07).
- **Luồng:** Đăng nhập → xem chi tiết sản phẩm → chọn số lượng → thêm giỏ → kiểm tra giỏ → đăng xuất.
- **Phương pháp:** Moderated usability evaluation, think-aloud, SUS và câu hỏi mở.
- **Quy mô:** 7 phiên độc lập (P01–P07) + 1 pilot P00 hoàn thành, không cần thay đổi trước phiên chính thức.
- **Khoảng thời gian:** 15/11/2026 (thời điểm 7 người gửi form khảo sát).
- **SUS trung bình:** 77,9 / 100.
- **Tỷ lệ hoàn thành toàn luồng:** `7/7` hồ sơ ghi hoàn thành, không có can thiệp.
- **Kết luận ngắn:** Điểm SUS trung bình cao hơn mốc tham chiếu 68. Tất cả 7 hồ sơ ghi hoàn thành toàn luồng độc lập; hai phản hồi đơn lẻ về trạng thái đăng nhập và chọn số lượng vẫn cần được tái hiện trước khi kết luận là lỗi hệ thống.

## 2. Người tham gia và phương pháp

Tóm tắt từ `../Phase1/04_participant_roster.md` theo nhóm tuổi/bối cảnh/tần suất mua online, không công bố danh tính hoặc liên hệ. Cả 7 người ở ngoài lớp HW03 và mỗi người có một phiên riêng. P01–P07 ghi phiên từ xa ngày 15/11/2026, dùng Chrome trên Windows 11 Pro/Laptop, cùng URL SUT qua Cloudflare Tunnel; cả 7 ghi đồng ý tham gia, quay màn hình và ghi âm. Giao thức điều phối, nhắc think-aloud và quy tắc không dẫn dắt được lưu tại `../Phase2/01_moderator_protocol.md`.

## 3. Kết quả định lượng

| Mốc | Hoàn thành độc lập | Gặp khó/cần hỗ trợ | Không hoàn thành | Thời gian trung bình | Ghi chú |
|---|---:|---:|---:|---|---|
| M1 Đăng nhập | `7/7` | `0/7` | `0/7` | `Không ghi nhận` | P01–P07 ghi hoàn thành và 0 can thiệp. P04 có phản hồi hậu phiên về tín hiệu đăng nhập, được phân tích riêng là QF-01. |
| M2 Chi tiết sản phẩm | `7/7` | `0/7` | `0/7` | `Không ghi nhận` | P01–P07 ghi hoàn thành và 0 can thiệp. |
| M3 Chọn số lượng | `7/7` | `0/7` | `0/7` | `Không ghi nhận` | P01–P07 ghi hoàn thành và 0 can thiệp. P03 có phản hồi hậu phiên, được phân tích riêng là QF-02. |
| M4 Thêm giỏ | `7/7` | `0/7` | `0/7` | `Không ghi nhận` | P01–P07 ghi hoàn thành và 0 can thiệp. |
| M5 Kiểm tra giỏ | `7/7` | `0/7` | `0/7` | `Không ghi nhận` | P01–P07 ghi hoàn thành và 0 can thiệp. |
| M6 Đăng xuất | `7/7` | `0/7` | `0/7` | `Không ghi nhận` | P01–P07 ghi hoàn thành và 0 can thiệp. |
| Toàn luồng | `7/7` | `0/7` | `0/7` | `Không ghi nhận` | Tất cả hồ sơ ghi toàn luồng hoàn thành và 0 lần can thiệp. |

Điểm SUS và diễn giải tại [01_sus_scoring.md](01_sus_scoring.md). Không có timestamp bắt đầu/kết thúc, nên không thể tính thời gian trung bình.

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
| `Không có genuine bug` | QF-01 và QF-02 chưa được tái hiện bằng steps và screenshot độc lập. | `N/A` | P03, P04 và Phase 3 | `N/A — chưa tạo issue` |

## 6. Khuyến nghị

| Ưu tiên | Khuyến nghị có thể thực hiện | Finding/bug hỗ trợ | Tác động mong đợi |
|---:|---|---|---|
| 1 | Tái hiện phản hồi của P03; nếu xác nhận, hiển thị bộ chọn số lượng rõ ràng và gộp cùng sản phẩm thành một dòng trong giỏ. | `QF-02` | Giảm nhầm lẫn khi mua nhiều hơn một sản phẩm. |
| 2 | Kiểm tra lại trạng thái/thông báo đăng nhập thành công và làm tín hiệu này dễ nhận thấy hơn nếu cần. | `QF-01` | Giúp người dùng xác nhận họ đã đăng nhập. |
| 3 | Ở vòng đánh giá tiếp theo, ghi nhận kết quả từng mốc, thời gian, do dự và hỗ trợ của moderator. | `Giới hạn dữ liệu hiện có` | Cho phép đo tỷ lệ hoàn thành và xác minh tần suất của các finding. |

## 7. Giới hạn

Mẫu chỉ gồm 7 người. Hồ sơ phiên có trạng thái hoàn thành từng mốc, trạng thái toàn luồng, số lần can thiệp, thiết bị và link video; vì vậy có thể báo cáo tỷ lệ hoàn thành. Tuy nhiên, hồ sơ không có timestamp, thời lượng, số lần nhấp, ghi chú do dự theo thời điểm hoặc screenshot điểm nghẽn. Vì vậy không thể kết luận về tốc độ, hiệu quả hoặc tái hiện bug chỉ từ dữ liệu hiện có.
