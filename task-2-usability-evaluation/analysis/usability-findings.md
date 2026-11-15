# Phân tích phát hiện usability

## Phạm vi và cách đọc bằng chứng

Đây là phân tích bảy bộ dữ liệu **SIMULATED DATA**. Mỗi bộ gồm một lượt
Playwright, sáu ảnh checkpoint, một video và hồ sơ persona/SUS/phỏng vấn được
tạo cho bài tập. Không có âm thanh, consent hoặc quan sát người dùng thật.

- **Quan sát Playwright:** trạng thái flow và lỗi UI có thể thấy trong ảnh,
  video, mã nguồn hoặc `run-results.json`.
- **Tín hiệu persona:** hành vi, phỏng vấn và SUS trong hồ sơ participant; dùng
  để phân tích giả thuyết, không dùng làm tỷ lệ người dùng thật.

## Luồng được phân tích

`Login → Cart → Apply Coupon → Checkout → Verify Order → Logout`

## Sổ đăng ký phát hiện

| ID | Tiêu đề | Loại finding | Bước | Số participant/tín hiệu | Participant IDs | Evidence |
|---|---|---|---|---:|---|---|
| UF-01 | Lỗi mã hóa tiếng Việt trên nhiều màn hình | Systemic usability issue; cũng là lỗi UI đã xác nhận | Login, Cart, Coupon, Checkout | 1 bằng chứng trực tiếp; phạm vi màn hình rộng | P01 trực tiếp; P01–P07 có bộ ảnh checkpoint | `bug-reports/BUG-SIM-001.md`; `evidence/screenshots/P01-01-login-home.png`, `P01-02-cart.png`, `P01-03-coupon-checkout.png` |
| UF-02 | Form login dùng nhãn/kiểu trường gây nhầm | Confirmed functional/UI bug; systemic usability issue | Login | 2 tín hiệu persona + 1 bằng chứng UI | P01, P03; P01 trực tiếp | `bug-reports/BUG-SIM-002.md`; `evidence/screenshots/P01-01-login-home.png` |
| UF-03 | Password hiển thị dạng text | Confirmed functional/UI bug | Login | Không xác định từ participant; lỗi UI trực tiếp | Không áp dụng | `bug-reports/BUG-SIM-002.md`; Login UI |
| UF-04 | Tổng checkout có thể chỉnh sửa | Confirmed functional bug | Checkout | 3 tín hiệu persona + 1 bằng chứng UI | P01, P04, P07; P04 tín hiệu rõ nhất | Checkout screenshot được nêu trong `analysis/main-report.md`; FR-08; P04 `session-summary.md` |
| UF-05 | Coupon và khoản giảm khó tìm/khó hiểu | Systemic usability issue | Apply Coupon | 4 tín hiệu persona | P02, P03, P05, P06 | `participants/P02–P06/observation-log.md`, `interview-responses.md` |
| UF-06 | Trạng thái đơn và phản hồi hoàn tất chưa rõ | Systemic usability issue | Verify Order, Checkout | 3 tín hiệu persona | P02, P06, P07 | `participants/P02/P06/P07/session-summary.md`, `interview-responses.md` |
| UF-07 | Nhãn/feedback logout chưa nổi bật | Isolated usability difficulty | Logout | 1 tín hiệu persona | P07 | `participants/P07/session-summary.md`; `P07/observation-log.md` |
| UF-08 | Luồng tự động hoàn tất nhất quán | Positive usability observation | Tất cả | 7/7 lượt máy | P01–P07 | `evidence/simulated-runs/run-results.json`; `results-summary-vi.md`; 42 screenshots/7 videos |

`Số participant/tín hiệu` không phải tỷ lệ người dùng thật. Với UF-01, phạm vi
“nhiều màn hình” được xác nhận trong bug report nhưng tác động theo participant
không được đo.

## Mô tả, tác động và hướng cải thiện

### UF-01 — Lỗi mã hóa tiếng Việt

Nhãn/tiêu đề trên login, cart và checkout bị lỗi hiển thị, làm giảm khả năng
đọc và hiểu trạng thái. Đây là lỗi UI quan sát được trong ảnh, nhưng mức cản trở
đối với người dùng thật chưa được đo. Sửa encoding UTF-8 toàn tuyến và rà soát
chuỗi tiếng Việt; xác nhận không còn ký tự lỗi trên toàn flow.

### UF-02/UF-03 — Login không rõ và password plaintext

Tiêu đề/nút login dùng ngữ nghĩa không đúng, trường email ghi “Username”, nút
dùng tiếng Anh và password dùng `type="text"`. P01 mô tả nhầm login với
registration; P03 dừng ở tiêu đề khó đọc. Điều này có thể làm chậm hoặc làm
giảm tin cậy khi bắt đầu flow; password plaintext còn ảnh hưởng cảm nhận riêng
tư. Đổi nhãn, tiêu đề, nút, `type="email"` và `type="password"`.

### UF-04 — Tổng checkout có thể chỉnh sửa

FR-08 yêu cầu tổng tự tính, nhưng ảnh checkout cho thấy trường tổng có thể
chỉnh sửa. P01/P04/P07 mô tả việc đối chiếu lại tổng hoặc khoản giảm. Người
dùng vẫn có thể hoàn tất automation, nhưng tính minh bạch và tin cậy giao dịch
bị ảnh hưởng. Tính/đối soát tổng ở server và hiển thị các thành phần chỉ đọc.

### UF-05 — Coupon và khoản giảm

P02/P05 mô tả khó tìm ô coupon hoặc badge giỏ; P03/P06 mô tả nhập sai coupon
rồi sửa; các hồ sơ nhấn mạnh cần lỗi và khoản giảm dễ hiểu. Đây là tín hiệu
persona, chưa có log thời gian/hỗ trợ. Làm nổi bật ô coupon, điều kiện áp dụng,
lý do thất bại và số tiền được giảm.

### UF-06/UF-07 — Trạng thái đơn và logout

P02/P07 kiểm tra lịch sử/trạng thái đơn để chắc chắn giao dịch xong; P06 cần
feedback thành công rõ; P07 dừng ở nhãn logout. Cải thiện nhãn tiếng Việt,
trạng thái màu nhất quán, toast thành công và feedback logout/xóa phiên.

## Phát hiện tích cực

Playwright đạt 6/6 checkpoint trong cả 7 lượt: **7/7 lượt và 42/42 bước**.
Đây là bằng chứng flow có thể được tự động hóa ổn định, không phải bằng chứng
về tốc độ, học được hay hài lòng của người dùng.

## SUS

| ID | SUS |
|---|---:|
| P01 | 57,5 |
| P02 | 75 |
| P03 | 25 |
| P04 | 42,5 |
| P05 | 82,5 |
| P06 | 37,5 |
| P07 | 82,5 |

Trung bình: **57,50/100**; trung vị: **57,5**; khoảng: **25–82,5**.
Phân bố gồm 2 điểm cao (82,5), 1 điểm 75, 1 điểm 57,5, 1 điểm 42,5,
1 điểm 37,5 và 1 điểm 25. Các điểm đều tính từ đủ 10 đáp án, nhưng là vector
SUS mô phỏng.

SUS thấp hơn mốc tham khảo 68 trong bộ mô phỏng phù hợp với các tín hiệu về
nhãn, coupon, tổng tiền và feedback. Không kết luận đây là điểm của người dùng
thật; mẫu bảy persona nhỏ, không ngẫu nhiên và không có thời gian/hỗ trợ thực.
