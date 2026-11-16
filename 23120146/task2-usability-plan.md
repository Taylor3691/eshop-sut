# Task 2 — Kế hoạch & Bộ công cụ Đánh giá Khả năng Sử dụng (Usability Evaluation — Phase 1)

- **MSSV:** `23120146`
- **Luồng End-to-End (E2E):** `Đăng ký tài khoản mới → Đăng nhập → Cập nhật hồ sơ cá nhân (Họ tên, Số điện thoại, Địa chỉ giao hàng) → Kiểm tra thông tin đã lưu → Đăng xuất`
- **SUT mục tiêu:** EShop Web Customer (`http://localhost:5173`)
- **Phương pháp:** Đánh giá có điều phối mẫu nhỏ (*Moderated Usability Evaluation* + *Think Aloud*)
- **Quy mô mẫu:** **1 phiên Pilot** + **7 phiên chính thức** (1 người/phiên, người dùng thật **ngoài lớp**, ưu tiên ngoài ngành IT/non-tester)
- **Thang đo định lượng:** System Usability Scale (**SUS** — 10 câu, Likert 1–5) + Phỏng vấn mở sau phiên (4 khía cạnh: *Clarity, Error recovery, Speed, Trust*)

> **Lưu ý chống giả mạo & rà soát:** Tài liệu này chỉ chứa **Kế hoạch & Biểu mẫu chuẩn bị (Phase 1)**. Tuyệt đối không điền trước danh tính người tham gia, ghi chú quan sát hay điểm SUS; chỉ chạy **Phase 2 (Tổng hợp & Báo cáo)** sau khi bạn đã tiến hành **1 phiên Pilot + 7 phiên người dùng thật** và có dữ liệu ghi nhận thực tế.

---

## 1. Mục tiêu Đánh giá (Evaluation Objectives)

Đánh giá trải nghiệm người dùng thật (non-IT) trên luồng quản lý tài khoản và hồ sơ cá nhân của EShop nhằm trả lời 4 câu hỏi trọng tâm:

1. **Khả năng định hướng & hiểu nhãn giao diện (*Clarity*):** Người dùng lần đầu có dễ dàng tìm thấy và phân biệt đúng chức năng tạo tài khoản, đăng nhập, trang hồ sơ cá nhân và đăng xuất mà không bị nhầm lẫn hay do dự bởi tên gọi trên giao diện không?
2. **Khả năng phát hiện & tự phục hồi khi gặp lỗi (*Error Recovery*):** Khi nhập dữ liệu không được hệ thống chấp nhận (như mật khẩu, email, số điện thoại) hoặc gặp lỗi phản hồi, người dùng có hiểu rõ nguyên nhân và tự sửa để hoàn thành tác vụ mà không cần người điều phối trợ giúp không?
3. **Tính hiệu quả & nỗ lực thao tác (*Speed & Effort*):** Người dùng mất bao lâu để hoàn tất toàn bộ luồng E2E, đâu là bước gây khựng lại (*hesitation*), thao tác thừa hoặc phải thử đi thử lại nhiều lần?
4. **Mức độ tự tin & an tâm sử dụng (*Trust*):** Người dùng có chắc chắn thông tin hồ sơ của mình đã được lưu đúng sau khi cập nhật và có tin tưởng rằng tài khoản đã được bảo vệ / thoát hoàn toàn khỏi máy dùng chung hay không?

---

## 2. Kịch bản Tác vụ Hướng Mục tiêu (Goal-Oriented Task Scenario)

> **Quy tắc nghiêm ngặt:** Chỉ đưa cho người tham gia phần **Tình huống dành cho người tham gia** dưới đây. Tuyệt đối **không** đọc thêm hướng dẫn từng bước, tên nút bấm hay gợi ý cách xử lý lỗi.

### Tình huống dành cho người tham gia (Participant Brief)
> *"Hãy tưởng tượng bạn mới biết đến cửa hàng trực tuyến **EShop** và đang dùng một máy tính dùng chung để chuẩn bị mua sắm lần đầu.*
>
> *Nhiệm vụ của bạn là:*
> 1. *Tự tạo một tài khoản khách hàng mới dành cho mình trên trang web.*
> 2. *Sử dụng tài khoản vừa tạo để vào khu vực cá nhân và thiết lập đầy đủ thông tin nhận hàng mặc định gồm **Họ tên**, **Số điện thoại Việt Nam** và **Địa chỉ giao hàng**.*
> 3. *Kiểm tra lại để chắc chắn các thông tin bạn vừa cập nhật đã thực sự được hệ thống lưu giữ ổn định.*
> 4. *Thoát khỏi tài khoản một cách an toàn trước khi nhường máy lại cho người khác.*
>
> *Trong suốt quá trình thực hiện, bạn hãy nói thành tiếng mọi suy nghĩ của mình nhé."*

### Ghi chú CHỈ dành cho Người điều phối (Moderator Reference — KHÔNG đưa cho người tham gia)
- **Điều kiện chuẩn bị SUT trước mỗi phiên:**
  - Đảm bảo Backend (`http://localhost:3000`) và Frontend Web (`http://localhost:5173`) đang chạy ổn định.
  - Để tránh trùng lịch sử trình duyệt/cache giữa các phiên, dùng **cửa sổ trình duyệt ẩn danh (Incognito)** hoặc profile sạch mới cho từng người tham gia, mở sẵn `http://localhost:5173`.
  - Nhắc người tham gia không dùng mật khẩu thật đang xài ở ngân hàng/email cá nhân; có thể dùng một email giả định dạng `ten_nguoi_thu@example.com` nếu họ ngại nhập email thật (chỉ nói điều này nếu họ hỏi *"có cần dùng email thật để nhận mail kích hoạt không?"* — hãy trả lời trung lập: *"Bạn có thể dùng email bất kỳ bạn muốn thử, không cần mở hộp thư thật"*).
- **Tiêu chí đánh giá hoàn thành tác vụ (Task Completion Criteria):**
  - `Success`: Người tham gia tự hoàn thành trọn vẹn từ đăng ký → đăng nhập → lưu hồ sơ → kiểm chứng đã lưu (ví dụ tải lại trang hoặc đăng nhập lại/kiểm tra lại thông tin vẫn còn) → thoát tài khoản mà không cần gợi ý trực tiếp.
  - `Partial`: Hoàn thành được một phần luồng (vd: tạo được tài khoản nhưng bỏ cuộc ở bước cập nhật SĐT, hoặc phải nhờ người điều phối gợi ý mới vượt qua chỗ bị kẹt, hoặc không kiểm chứng lại thông tin đã lưu).
  - `Failed`: Bỏ cuộc giữa chừng hoặc bị chặn hoàn toàn không hoàn thành được luồng chính.

---

## 3. Kịch bản Điều phối & Quy tắc Quan sát Trung lập (Moderator Protocol)

### 3.1. Lời mở đầu chuẩn (đọc trước khi bắt đầu)
> *"Chào bạn, cảm ơn bạn đã dành thời gian tham gia buổi trải nghiệm hôm nay. Mục đích của buổi này là **kiểm thử sản phẩm EShop, hoàn toàn không phải kiểm tra năng lực hay kiến thức công nghệ của bạn**. Vì vậy, nếu có chỗ nào khó hiểu, khó bấm hoặc báo lỗi vô lý, đó là vấn đề của hệ thống cần được phát hiện.*
>
> *Trong lúc thao tác, mình nhờ bạn thực hiện **Think Aloud** — tức là nghĩ gì nói nấy thành tiếng: bạn đang tìm nút nào, bạn kỳ vọng trang tiếp theo sẽ hiện gì, chỗ nào làm bạn thấy bất ngờ hoặc khó chịu. Bạn cho phép mình quay lại màn hình thao tác (và ghi âm phần nhận xét) để phục vụ việc ghi chép báo cáo môn học nhé?"*

### 3.2. Quy tắc giữ thái độ trung lập khi quan sát
- **KHÔNG** chỉ tay, đọc tên nút, giải thích quy tắc ẩn (như quy định mật khẩu hay SĐT), hay xác nhận đúng/sai trong lúc người dùng đang tự mò mẫm.
- **ĐƯỢC PHÉP** dùng câu nhắc trung lập nếu người tham gia im lặng quá lâu (> 15–20 giây):
  - *"Bạn đang suy nghĩ gì lúc này?"*
  - *"Bạn đang tìm thông tin gì trên màn hình?"*
  - *"Bạn kỳ vọng điều gì sẽ xảy ra khi vừa bấm xong?"*
- **Can thiệp tối thiểu khi kẹt hoàn toàn (*Blocker Rescue*):** Chỉ hỗ trợ nếu người tham gia bị kẹt quá ~2 phút ở một lỗi kỹ thuật không thể tự đoán ra và có nguy cơ dừng phiên sớm; khi can thiệp, phải **ghi rõ thời điểm, câu đã gợi ý** vào biên bản phiên để tách biệt dữ liệu tự lực vs cần hỗ trợ.

### 3.3. Checklist cho 1 phiên Pilot (chạy trước 7 phiên chính thức)
- [ ] Tình huống viết ra có đủ rõ ràng để người thử hiểu mục tiêu mà không cần hỏi lại *"ý câu này là gì?"* không?
- [ ] Thời gian thực hiện + trả lời SUS + phỏng vấn nằm trong khoảng hợp lý (dự kiến 10–15 phút/phiên) không?
- [ ] Công cụ quay màn hình/ghi âm hoạt động tốt, thấy rõ con trỏ chuột và hộp thoại trình duyệt không?
- [ ] Đã chỉnh sửa câu chữ kịch bản (nếu có chỗ gây hiểu nhầm đề bài) và **commit Git riêng sau phiên Pilot** trước khi chạy P1–P7?

---

## 4. Công cụ Đo lường (SUS & Bộ câu hỏi Thăm dò)

### 4.1. Phiếu khảo sát SUS (System Usability Scale — 10 câu)
*Hướng dẫn cho người tham gia: Khoanh/chọn mức độ đồng ý từ **1 (Hoàn toàn không đồng ý)** đến **5 (Hoàn toàn đồng ý)** ngay sau khi kết thúc thao tác trên EShop.*

| Câu | Phát biểu SUS | 1 | 2 | 3 | 4 | 5 |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| **Q1** | Tôi nghĩ mình sẽ muốn sử dụng hệ thống này thường xuyên. | ☐ | ☐ | ☐ | ☐ | ☐ |
| **Q2** | Tôi thấy hệ thống này phức tạp một cách không cần thiết. | ☐ | ☐ | ☐ | ☐ | ☐ |
| **Q3** | Tôi thấy hệ thống này dễ sử dụng. | ☐ | ☐ | ☐ | ☐ | ☐ |
| **Q4** | Tôi nghĩ mình sẽ cần sự hỗ trợ của người có chuyên môn kỹ thuật để sử dụng được hệ thống này. | ☐ | ☐ | ☐ | ☐ | ☐ |
| **Q5** | Tôi thấy các chức năng khác nhau trong hệ thống được tích hợp khá tốt. | ☐ | ☐ | ☐ | ☐ | ☐ |
| **Q6** | Tôi thấy hệ thống có quá nhiều điểm thiếu nhất quán. | ☐ | ☐ | ☐ | ☐ | ☐ |
| **Q7** | Tôi hình dung hầu hết mọi người sẽ học cách sử dụng hệ thống này rất nhanh. | ☐ | ☐ | ☐ | ☐ | ☐ |
| **Q8** | Tôi thấy hệ thống rất rườm rà/bất tiện khi sử dụng. | ☐ | ☐ | ☐ | ☐ | ☐ |
| **Q9** | Tôi cảm thấy rất tự tin khi sử dụng hệ thống này. | ☐ | ☐ | ☐ | ☐ | ☐ |
| **Q10** | Tôi cần phải học rất nhiều thứ trước khi có thể sử dụng được hệ thống này. | ☐ | ☐ | ☐ | ☐ | ☐ |

**Công thức tính điểm SUS (dùng ở Phase 2 cho từng người tham gia):**
$$\text{SUS} = \left(\sum_{i \in \{1,3,5,7,9\}} (Q_i - 1) + \sum_{j \in \{2,4,6,8,10\}} (5 - Q_j)\right) \times 2.5$$
*(Diễn giải chuẩn: `< 51` = Poor / Kém; `51 – 68` = OK / Marginal; `68 – 80.3` = Good / Tốt; `> 80.3` = Excellent / Xuất sắc).*

### 4.2. Bộ câu hỏi Phỏng vấn Mở sau phiên (Open-Ended Probe Questions)
1. **[Clarity — Độ rõ ràng]:** *Trong suốt quá trình từ lúc tạo tài khoản đến khi thoát ra, có nhãn nút, tiêu đề trang hoặc ô nhập nào khiến bạn bị khựng lại, hiểu nhầm hoặc phải đọc đi đọc lại không? Cụ thể ở đâu?*
2. **[Error recovery — Khả năng khắc phục lỗi]:** *Khi gặp thông báo lỗi (hoặc lúc hệ thống không cho lưu), thông báo đó có giúp bạn hiểu ngay lý do sai và biết cách tự sửa không? Bạn đã xử lý thế nào?*
3. **[Speed — Tốc độ & Nỗ lực]:** *Bước nào làm bạn mất nhiều thời gian hoặc phải thao tác lặp lại nhiều nhất? Nếu chỉ sửa một chỗ để làm nhanh hơn, bạn muốn sửa bước nào?*
4. **[Trust — Độ tin cậy]:** *Sau khi cập nhật thông tin cá nhân và thoát tài khoản trên máy dùng chung, bạn có tin tưởng rằng dữ liệu của mình đã được lưu đúng và tài khoản đã hoàn toàn an toàn không? Điều gì khiến bạn tin hoặc nghi ngờ?*
5. **[Observation Follow-up — Câu hỏi theo quan sát thực tế]:** *Lúc nãy ở bước [ghi lại thời điểm người dùng do dự/nhíu mày/thử sai], bạn đang kỳ vọng hệ thống hoạt động ra sao?*

---

## 5. Biểu mẫu Ghi nhận Dữ liệu Thực tế (Templates — Điền sau mỗi phiên)

### 5.1. Danh sách Người tham gia (1 Pilot + 7 Người dùng thật ngoài lớp)
> **Quy định bắt buộc (HW03 §Task 2):** Tất cả 7 người tham gia chính thức phải là **người ngoài lớp** (không phải sinh viên cùng môn/làm HW03; ưu tiên non-IT). Phải ghi thông tin liên hệ xác minh được (**Zalo / Email / SĐT đã che 4 số giữa** để TA có thể gọi kiểm tra ngẫu nhiên 2 người).

| STT | Vai trò | Họ và tên | Nghề nghiệp / Non-IT? | Liên hệ xác minh (che 4 số giữa SĐT) | Hình thức & Ngày/Giờ thực hiện |
| :---: | :--- | :--- | :--- | :--- | :--- |
| Pilot | Pilot | | | | |
| P1 | Chính thức | | | | |
| P2 | Chính thức | | | | |
| P3 | Chính thức | | | | |
| P4 | Chính thức | | | | |
| P5 | Chính thức | | | | |
| P6 | Chính thức | | | | |
| P7 | Chính thức | | | | |

---

### 5.2. Mẫu Biên bản Quan sát từng Phiên (Dùng cho Pilot và P1 → P7)

*(Nhân bản khối mẫu dưới đây cho mỗi phiên `Pilot`, `P1`, ..., `P7` và **commit Git sau từng phiên** theo kế hoạch HW03).*

```markdown
### Phiên [Pilot / P1..P7] — [Họ tên viết tắt / Mã người tham gia]
- **Thời gian thực hiện:** YYYY-MM-DD HH:MM – HH:MM
- **Hình thức & Thiết bị:** [Trực tiếp / Online] — [Trình duyệt + OS]
- **Thời lượng hoàn thành tác vụ (Duration):** [__ phút __ giây]
- **Kết quả hoàn thành (Task Completion):** [Success / Partial / Failed]
- **Can thiệp của người điều phối (nếu có):** [Không / Có — ghi rõ thời điểm & câu gợi ý]
- **Bằng chứng ghi hình/ghi âm:** `[Đường dẫn/tên file video hoặc link Drive/Unlisted]`

#### Ghi chú quan sát theo dòng thời gian (Think Aloud)
- **Điểm vướng (Friction points):**
  - ...
- **Lỗi gặp phải (Errors encountered):**
  - ...
- **Khoảnh khắc do dự / thử sai (Hesitations):**
  - ...
- **Phản hồi cảm xúc / bức xúc nguyên văn (Verbalised frustration quotes):**
  - "..."

#### Kết quả Thang đo SUS
- **Điểm từng câu (Q1..Q10):** Q1=_, Q2=_, Q3=_, Q4=_, Q5=_, Q6=_, Q7=_, Q8=_, Q9=_, Q10=_
- **Tổng điểm SUS:** [Tính ở Phase 2]

#### Tóm tắt Trả lời Phỏng vấn Mở
- **Clarity:** ...
- **Error recovery:** ...
- **Speed:** ...
- **Trust:** ...
- **Observation Follow-up:** ...
```

---

## 6. Kiểm tra trước khi Chuyển sang Thực thi & Phase 2 (Human Review Gate)
- [ ] Đọc soát lại **Tình huống (Goal-Oriented Task Scenario)** để đảm bảo không vô tình gợi ý bước bấm hay tên nút.
- [ ] Khởi động SUT sạch (`node server.js` ở `backend/` + `npm run dev` ở `frontend-web/`), chạy **1 phiên Pilot** trước → rà soát lại bộ câu hỏi/kịch bản → commit Git.
- [ ] Tiến hành lần lượt **7 phiên chính thức (P1 → P7)** với người ngoài lớp, ghi biên bản thật và **commit Git sau mỗi phiên**.
- [ ] Sau khi có đủ dữ liệu thật từ 7 phiên, gửi toàn bộ ghi chú + điểm SUS/câu trả lời cho AI để thực hiện **Phase 2 (Tính điểm SUS, phân tách Isolated Bugs vs Systemic Issues, xếp hạng Severity và tạo GitHub Issues)**.
