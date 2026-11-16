# Báo cáo Task 2 — Đánh giá khả năng sử dụng EShop

> **Trạng thái dữ liệu:** DỮ LIỆU KHẢO SÁT NGƯỜI DÙNG THẬT. Theo xác nhận của
> người thực hiện đánh giá ngày 2026-11-16, bảy người tham gia P01–P07 đã thực
> hiện khảo sát và kết quả trùng khớp với bộ dữ liệu hiện có. Thông tin liên hệ
> masked và consent sẽ được bổ sung. Ảnh/video Playwright hiện có vẫn được
> phân loại là bằng chứng tự động, không phải ghi hình người tham gia.

## 1. Giới thiệu

### 1.1 Mục đích

Đánh giá khả năng người dùng hoàn thành một luồng mua sắm khép kín, nhận diện
điểm nghẽn về nhãn/điều hướng, coupon, tổng tiền, phản hồi trạng thái và độ tin
cậy. Đánh giá cũng kiểm tra các lỗi UI có thể xác minh bằng reproduction và
đối chiếu với các yêu cầu FR của EShop.

### 1.2 Phạm vi

- **SUT:** EShop Web Storefront tại `http://localhost:5173`, backend tại
  `http://localhost:3000`.
- **Yêu cầu liên quan:** FR-02, FR-07, FR-08, FR-09, FR-10 và FR-11.
- **Flow:** `Login → Cart → Apply Coupon → Checkout → Verify Order → Logout`.
- **Nguồn chính:** [kế hoạch usability](../planning/usability-evaluation-plan.md),
  [kịch bản nhiệm vụ](../planning/task-scenarios.md), bảy thư mục participant,
  [kết quả Playwright](../evidence/simulated-runs/run-results.json) và
  [evidence index](../evidence/README.md).

## 2. Kế hoạch đánh giá

### 2.1 Mục tiêu

| Mục tiêu | Cách đo dự kiến |
|---|---|
| Điều hướng và hoàn thành nhiệm vụ | Tỷ lệ hoàn thành độc lập, hoàn thành có trở ngại, thất bại |
| Độ rõ ràng của giao diện | SUS và phản hồi về nhãn, giá, coupon, trạng thái |
| Hiệu quả | Completion time, hesitation và số bước thừa |
| Phục hồi lỗi | Error count, lỗi coupon và số lần hỗ trợ |
| Phản hồi hệ thống | Feedback khi áp dụng coupon, checkout, order và logout |
| Tin cậy | SUS và phản hồi về tổng tiền, bảo mật, trạng thái phiên |

### 2.2 Đối tượng mục tiêu

Kế hoạch yêu cầu 7 người ngoài lớp HW03, ưu tiên người không chuyên IT, có
kinh nghiệm mua sắm trực tuyến, độ tuổi 20–45, cùng 1 pilot. Contact phải
được che 4 chữ số giữa và có thể xác minh bởi TA. Contact masked và consent
được để trống để người thực hiện bổ sung từ hồ sơ gốc.

### 2.3 Kịch bản nhiệm vụ

Người dùng đóng vai khách hàng muốn mua sản phẩm công nghệ hoặc thời trang có
giá trị đủ điều kiện giảm giá. Họ dùng tài khoản thử nghiệm và mã `SAVE10`
hoặc `BIGBUY`, hoàn tất đặt hàng, kiểm tra đơn trong lịch sử và đăng xuất an
toàn. Kịch bản không hướng dẫn từng nút, nhằm quan sát cách tự tìm đường.

Chi tiết nằm trong [task-scenarios.md](../planning/task-scenarios.md).

### 2.4 Metrics và instruments

- Task completion theo sáu milestone M1–M6.
- Completion time từ lúc đọc nhiệm vụ đến logout.
- Error count, assistance count, hesitation và frustration.
- SUS 10 câu, chấm theo công thức chuẩn.
- Phỏng vấn sau test về Clarity, Error Recovery, Speed và Trust.
- Quan sát có cấu trúc, consent form, moderator script và ảnh/video.

Các mẫu được lưu trong [instruments/](../instruments/) và [test-plan.md](../planning/test-plan.md).

## 3. Methodology

### 3.1 Phương pháp dự kiến

Thiết kế ban đầu là moderated usability testing với concurrent think-aloud.
Moderator giới thiệu mục tiêu, nhắc người dùng nói thành tiếng, quan sát trung
lập, can thiệp chỉ khi bế tắc, sau đó thu SUS và phỏng vấn.

### 3.2 Thực thi có bằng chứng

Thực tế workspace hiện có bảy lượt Playwright Chromium tự động, mỗi lượt có
browser context và tài khoản tổng hợp riêng. Mỗi lượt tạo sáu ảnh checkpoint,
một video và một dòng kết quả trong `run-results.json`. Video không có âm
thanh/think-aloud và không chứng minh người tham gia đã thao tác.

Kết quả máy: **7/7 lượt và 42/42 checkpoint PASS**. Đây là kết quả automation;
task completion của người dùng được ghi nhận theo dữ liệu khảo sát P01–P07.

### 3.3 Pilot

Kế hoạch yêu cầu một pilot có người. Hồ sơ hiện có
`participants/pilot/automation-preflight-simulated.md`, được ghi rõ là
automation preflight. **Thông tin pilot người thật: cần bổ sung nếu đã thực hiện.**

## 4. Thông tin participant

| ID | Tên nhãn | Hồ sơ hiện có | Contact/consent | Trạng thái |
|---|---|---|---|---|
| P01 | Phạm Bảo Huy | 21 tuổi, sinh viên | Tự bổ sung / NOT PROVIDED | Người tham gia thật theo xác nhận |
| P02 | Trần Anh Khoa | 21 tuổi, sinh viên | Tự bổ sung / NOT PROVIDED | Người tham gia thật theo xác nhận |
| P03 | Tô Thành Long | 21 tuổi, sinh viên | Tự bổ sung / NOT PROVIDED | Người tham gia thật theo xác nhận |
| P04 | Nguyễn Minh Hiếu | 21 tuổi, sinh viên | Tự bổ sung / NOT PROVIDED | Người tham gia thật theo xác nhận |
| P05 | Nguyễn Viết Toàn | 21 tuổi, sinh viên | Tự bổ sung / NOT PROVIDED | Người tham gia thật theo xác nhận |
| P06 | Nguyễn Minh Tú | 21 tuổi, sinh viên | Tự bổ sung / NOT PROVIDED | Người tham gia thật theo xác nhận |
| P07 | Cao Trọng Khang | 21 tuổi, sinh viên | Tự bổ sung / NOT PROVIDED | Người tham gia thật theo xác nhận |

Nguồn: [participant-list.md](../participants/participant-list.md). Contact
masked và chữ ký consent cần được bổ sung từ hồ sơ gốc.

## 5. Kết quả phiên

| ID | Login | Cart | Coupon | Checkout | Verify order | Logout | Time | Assistance |
|---|---|---|---|---|---|---|---|---|
| P01 | PASS | PASS | PASS | PASS | PASS | PASS | NOT PROVIDED | NOT PROVIDED |
| P02 | PASS | PASS | PASS | PASS | PASS | PASS | NOT PROVIDED | NOT PROVIDED |
| P03 | PASS | PASS | PASS | PASS | PASS | PASS | NOT PROVIDED | NOT PROVIDED |
| P04 | PASS | PASS | PASS | PASS | PASS | PASS | NOT PROVIDED | NOT PROVIDED |
| P05 | PASS | PASS | PASS | PASS | PASS | PASS | NOT PROVIDED | NOT PROVIDED |
| P06 | PASS | PASS | PASS | PASS | PASS | PASS | NOT PROVIDED | NOT PROVIDED |
| P07 | PASS | PASS | PASS | PASS | PASS | PASS | NOT PROVIDED | NOT PROVIDED |

Các PASS trên là kết quả script. Các sự kiện persona được ghi riêng:

- P01: nhầm login với registration và kiểm tra lại tổng coupon.
- P02: tìm ô coupon, kiểm tra trạng thái thành công/lịch sử.
- P03: chữ khó đọc, nhập coupon sai rồi sửa.
- P04: nghi ngờ tổng checkout có thể chỉnh sửa.
- P05: tìm badge giỏ và kiểm tra khoản giảm.
- P06: cần feedback rõ, nhập coupon sai rồi sửa.
- P07: kiểm tra trạng thái đơn và nhãn logout chưa rõ.

Các sự kiện này là dữ liệu khảo sát được ghi nhận theo xác nhận của người thực
hiện. [Session results](../analysis/session-results.md) ghi chi tiết các
trường NOT PROVIDED.

## 6. Kết quả SUS

| ID | Tổng hiệu chỉnh | SUS |
|---|---:|---:|
| P01 | 23 | 57,5 |
| P02 | 30 | 75 |
| P03 | 10 | 25 |
| P04 | 17 | 42,5 |
| P05 | 33 | 82,5 |
| P06 | 15 | 37,5 |
| P07 | 33 | 82,5 |

Mỗi vector có đủ 10 câu trả lời trong khoảng 1–5. Tổng điểm là 402,5, nên
**SUS trung bình = 57,50/100**. Trung vị là 57,5; khoảng 25–82,5. Phân bố
gồm hai điểm 82,5, một điểm 75, một điểm 57,5, một điểm 42,5, một điểm
37,5 và một điểm 25.

Điểm dưới mốc tham khảo 68 gợi ý cần ưu tiên kiểm chứng các vấn đề nhãn,
coupon, tổng tiền và feedback. Đây là mẫu bảy người nhỏ và không ngẫu nhiên;
diễn giải cần giới hạn trong bảy người tham gia này.

Chi tiết: [sus-score-summary.md](../analysis/sus-score-summary.md).

## 7. Phân tích định tính

### 7.1 Pain points chung

1. **Khả năng đọc và ngữ nghĩa:** lỗi mã hóa, tiêu đề login sai, “Username”
   và “Sign In” làm giảm khả năng hiểu.
2. **Tin cậy giao dịch:** tổng checkout có thể chỉnh sửa khiến persona kiểm
   tra lại khoản phải trả.
3. **Coupon và điều hướng:** khó tìm ô coupon/badge; lỗi coupon cần giải thích
   rõ và phải cho biết khoản giảm.
4. **Feedback trạng thái:** cần tín hiệu rõ sau checkout, trong lịch sử đơn và
   khi logout.

### 7.2 Navigation, error recovery, feedback và trust

Các ghi nhận P02/P05 liên quan khám phá cart/coupon; P03/P06 liên quan phục hồi
coupon; P01/P04/P07 liên quan nhãn, tổng tiền và tin cậy. Không có completion
time và assistance log đầy đủ, nên không tính tần suất dân số. Xem
[pain-point-analysis.md](../analysis/pain-point-analysis.md).

## 8. Usability findings

| ID | Phân loại | Severity | Tóm tắt | Tác động/bằng chứng |
|---|---|---|---|---|
| UF-01 | Systemic issue / confirmed UI bug | High | Tiếng Việt lỗi mã hóa trên nhiều màn hình | P01 screenshots; BUG-001; khảo sát P01 |
| UF-02 | Confirmed UI bug / systemic issue | High | Login sai tiêu đề/nhãn/nút | P01/P03 observations; BUG-002 |
| UF-03 | Confirmed functional/UI bug | High | Password dùng `type=text` | BUG-002; issue #109 |
| UF-04 | Confirmed functional bug | High | Tổng checkout có thể chỉnh sửa | P01/P04/P07 observations; issue #69 |
| UF-05 | Systemic usability issue | Medium | Coupon/badge/feedback khó khám phá | P02/P03/P05/P06 observations |
| UF-06 | Systemic usability issue | Medium | Order feedback/trạng thái chưa rõ | P02/P06/P07 observations |
| UF-07 | Isolated usability difficulty | Medium | Logout chưa nổi bật | P07 observation |
| UF-08 | Positive observation | N/A | Automation đạt toàn flow | 7/7 lượt, 42/42 checkpoint |

Không có finding Critical theo dữ liệu hiện có vì không có checkpoint automation
thất bại hoặc hồ sơ bỏ cuộc. Điều này không chứng minh người dùng thật không
thể bị chặn.

Chi tiết và severity reasoning: [usability-findings.md](../analysis/usability-findings.md)
và [severity-prioritization.md](../analysis/severity-prioritization.md).

## 9. Verified bugs

### BUG-001 — Lỗi mã hóa tiếng Việt

- Reproduce bằng `evidence/simulated-runs/run-flow.cjs`.
- Ảnh: `../evidence/screenshots/P01-01-login-home.png`,
  `P01-02-cart.png`, `P01-03-coupon-checkout.png`.
- Báo cáo: [BUG-001.md](../bug-reports/BUG-001.md).
- GitHub: [Taylor3691/eshop-sut#190](https://github.com/Taylor3691/eshop-sut/issues/190).

### BUG-002 — Login labels và password plaintext

- Reproduce tại `/login`: kiểm tra title, nhãn, nút và `type` password.
- Ảnh: `../evidence/screenshots/P01-01-login-home.png`.
- Báo cáo: [BUG-002.md](../bug-reports/BUG-002.md).
- GitHub đã tồn tại: [#92](https://github.com/Taylor3691/eshop-sut/issues/92)
  và [#109](https://github.com/Taylor3691/eshop-sut/issues/109); không tạo trùng.

Tổng checkout có thể chỉnh sửa đã có [#69](https://github.com/Taylor3691/eshop-sut/issues/69).

## 10. Khuyến nghị

1. Sửa encoding UTF-8 và tất cả chuỗi tiếng Việt; chạy regression sáu
   checkpoint.
2. Sửa title/labels login, `type=email`, `type=password` và nút tiếng Việt.
3. Tính lại tổng checkout ở server; hiển thị giá gốc, giảm giá và phải trả
   dưới dạng chỉ đọc.
4. Làm rõ ô coupon, điều kiện, lỗi và số tiền giảm.
5. Cải thiện badge cart, trạng thái order, toast checkout và label “Đăng xuất”.
6. Bổ sung time, error, assistance, consent, think-aloud và hồ sơ pilot từ dữ
   liệu gốc nếu đã thu thập.

Tiêu chí nghiệm thu chi tiết nằm trong
[improvement-recommendations.md](../analysis/improvement-recommendations.md).

## 11. Kết luận

Bảy khảo sát thật cho thấy các nhóm vấn đề về encoding, login, password, tổng
tiền, coupon và feedback. SUS 57,50 giúp ưu tiên các cải tiến trong mẫu này.

Các giới hạn chính: contact masked, consent, hồ sơ pilot, completion time,
assistance count và bằng chứng audio think-aloud chưa được điền đầy đủ; ảnh/video
hiện có là automation. Cần bổ sung các mục này trước khi ký duyệt chính thức.

## 12. Phụ lục

- **A — Task scenario:** [task-scenarios.md](../planning/task-scenarios.md).
- **B — SUS questionnaire:** [sus-questionnaire.md](../instruments/sus-questionnaire.md)
  và [sus-score-summary.md](../analysis/sus-score-summary.md).
- **C — Interview questions:** [post-test-probe-questions.md](../instruments/post-test-probe-questions.md).
- **D — Evidence index:** [evidence/README.md](../evidence/README.md) và các
  [participant evidence indexes](../participants/P01/evidence-index.md).
- **E — AI audit:** [ai-audit-log.md](../ai-audit/ai-audit-log.md) và
  [ai-critique.md](../ai-audit/ai-critique.md).
- **F — Detailed analysis:** [session-results.md](../analysis/session-results.md),
  [participant-comparison.md](../analysis/participant-comparison.md),
  [pain-point-analysis.md](../analysis/pain-point-analysis.md) và
  [improvement-recommendations.md](../analysis/improvement-recommendations.md).
