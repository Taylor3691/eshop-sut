# Tổng hợp Yêu cầu & Kế hoạch Thực hiện HW03 — GUI & Usability

> **Nguồn tham chiếu:** [2026.HW03.GUI Usability_En.pdf](file:///d:/Projects/eshop-sut/docs/2026.HW03.GUI%20Usability_En.pdf) | **Đặc tả SUT:** [README.md](file:///d:/Projects/eshop-sut/README.md)

---

## 1. Thông tin chung

| Hạng mục | Chi tiết |
| :--- | :--- |
| **Mã bài tập** | `HW03-AI` — GUI & Usability |
| **Hình thức** | Bài tập cá nhân (nhưng cần phối hợp tránh trùng phạm vi trong nhóm) |
| **Thời lượng dự kiến** | 10 giờ |
| **Nộp bài** | Moodle (file `.zip` theo đúng quy định tên file) |
| **Chính sách AI** | Mở — **Bắt buộc** có khai báo và đính kèm **AI Audit Report** + **AI Critique** |
| **Mức Bloom-AI yêu cầu** | **G9.3 (Analyse)** và **G9.4 (Collaborate with AI for exploratory testing)** |
| **Phúc đáp (Oral Defense)** | 30% sinh viên được chọn ngẫu nhiên vấn đáp 5–7 phút trong tuần sau hạn nộp |

### Nguyên tắc làm việc bắt buộc
1. **AI-First có kỷ luật:** Dẫn dắt AI từng bước theo đúng kỹ thuật kiểm thử đã học, **không** dùng một prompt chung chung kiểu *"generate a GUI checklist and find usability problems in this app"*.
2. **Human Review:** Sinh viên phải tự kiểm tra, sửa lỗi và tinh chỉnh kết quả AI tạo ra; **không** nộp nguyên văn kết quả thô từ AI.
3. **Tài liệu hóa bằng Markdown:** Toàn bộ quy trình làm việc phải ghi lại dạng text/Markdown (kèm bản PDF cho các báo cáo chính).
4. **Chất lượng hơn số lượng đối phó:** Điểm đánh giá dựa vào độ sâu, chất lượng của checklist, thiết kế & phân tích usability, bug report, ảnh chụp bằng chứng, danh sách người dùng thật và các liên kết tham chiếu.

---

## 2. Đối tượng kiểm thử (SUT) & Chọn phạm vi

### Hệ thống EShop
- **Web Customer:** `http://localhost:5173` (Pool A: `FR-01` → `FR-06`; Pool B: `FR-07` → `FR-11`)
- **Web Admin:** `http://localhost:5174` (Pool C: `FR-12` → `FR-19`)
- **Mobile App:** Expo / React Native (Pool D)

### 4 khía cạnh giao diện (Interface Aspects — IA) dùng cho GUI Checklist
- `IA-01`: **General UI standards** (Tiêu chuẩn giao diện chung)
- `IA-02`: **Forms** (Biểu mẫu nhập liệu)
- `IA-03`: **Navigation** (Điều hướng)
- `IA-04`: **Feedback / state** (Phản hồi hệ thống / trạng thái)

### Chọn phạm vi (Scope Selection)
- **Cho Task 1 (GUI Checklist):** Chọn 1 hoặc nhiều màn hình (Home, Cart, Checkout, Admin Dashboard, hoặc Mobile...). Tối thiểu 1 màn hình nhưng **nên chọn nhiều màn hình** để tạo được > 40 mục kiểm tra có chiều sâu, không lặp lại.
- **Cho Task 2 (Usability Evaluation):** Chọn **1 luồng End-to-End (E2E)** (ví dụ: *Đăng ký → Thêm vào giỏ hàng → Thanh toán với mã giảm giá*).
- **Quy tắc chống trùng lặp trong nhóm:** Trong cùng một nhóm, **không 2 thành viên nào được chọn trùng màn hình chính cho GUI Checklist hoặc trùng luồng Usability**.

---

## 3. Nội dung chi tiết các nhiệm vụ cần làm

### Task 1 — GUI Checklist (30/100 điểm)
1. **Thiết kế checklist (> 40 items):**
   - Bao phủ cả 4 khía cạnh `IA-01`, `IA-02`, `IA-03`, `IA-04` (dựa theo kiến thức trên lớp và các yêu cầu UI trong `README.md`).
   - Dùng AI sinh bộ khởi tạo theo từng bước, sau đó tự rà soát và bổ sung thêm.
2. **Phản biện và bổ sung mục AI bỏ sót:**
   - Tự bổ sung các mục AI bỏ qua (gợi ý: *accessibility, bố cục RTL, dark mode, responsive, độ tương phản, nhãn/định dạng tiếng Việt...*).
   - Với **mỗi mục tự thêm**, phải giải thích **tại sao AI bỏ sót** (do chất lượng prompt, hạn chế của mô hình AI, hay đặc thù màn hình được chọn).
3. **Thực thi (Execute) checklist trên SUT:**
   - Đánh dấu từng mục là **Passed** hoặc **Failed**.
   - Thêm cột **Notes** ghi rõ lý do lỗi cho các mục **Failed**.
   - **Chỉ đính kèm ảnh chụp màn hình (screenshot) cho các mục Failed.**
   - Xuất/lập thành **file Excel checklist (> 40 items)** kèm bảng tổng hợp kết quả (**Test Summary**).
4. **Báo cáo lỗi (Bug Reporting):**
   - Ghi nhận toàn bộ bug tìm được vào **cả hai nơi**: báo cáo Markdown và trang **GitHub Issues** (mỗi GitHub Issue bắt buộc kèm screenshot).

---

### Task 2 — Usability Evaluation (40/100 điểm)
Thực hiện đánh giá khả năng sử dụng có điều phối mẫu nhỏ (*moderated usability evaluation*) trên 1 luồng E2E với **7 người dùng thật** (7 phiên riêng biệt, 1 người/phiên).

#### Pha 1: Lập kế hoạch & Chuẩn bị (Plan & Prepare)
- **Xác định mục tiêu:** Nêu rõ điều muốn kiểm chứng (ví dụ: điểm nghẽn điều hướng, mức độ tự tin của người dùng...).
- **Viết Task Scenario:** Chuyển luồng E2E thành tình huống hướng mục tiêu (*goal-oriented*, ví dụ: *"Tìm áo khoác mùa đông dưới 500.000 ₫ và thanh toán bằng mã giảm giá"*), **tuyệt đối không** viết hướng dẫn từng bước.
- **Chuẩn bị công cụ đo lường:**
  - Thang đo chuẩn **SUS** hoặc **UEQ-S** (hoặc thang tự thiết kế có giải thích cơ sở rõ ràng) để người dùng điền sau phiên test.
  - Bộ câu hỏi phỏng vấn mở (*open-ended probe questions*) tối thiểu xoay quanh 4 yếu tố: **Clarity** (độ rõ ràng), **Error recovery** (khả năng khắc phục lỗi), **Speed** (tốc độ), **Trust** (độ tin cậy).
- **Tuyển 7 người dùng thật:**
  - Phải là **người ngoài lớp** (sinh viên đang học môn này/làm HW03 **không hợp lệ**). Ưu tiên người không thuộc ngành IT/non-tester.
  - Có thông tin liên hệ xác minh được (**Tên + Zalo / Email / SĐT với 4 số giữa được che**). *(TA có thể gọi ngẫu nhiên 2 người để kiểm tra; giả mạo bị **0 điểm Task 2**)*.
- **Chạy 1 phiên Pilot:** Thử nghiệm trước với 1 người để phát hiện kịch bản khó hiểu, lỗi luồng hoặc vấn đề thời gian, chỉnh sửa trước khi chạy 7 phiên chính thức.

#### Pha 2: Tiến hành các phiên test (Conduct Sessions — 1 người/phiên)
- **Mở đầu:** Giải thích rõ *"đang kiểm thử sản phẩm, không phải kiểm tra người dùng"*, hướng dẫn người tham gia **Think Aloud** (nói thành tiếng suy nghĩ khi thao tác).
- **Quan sát trung lập:** Không gợi ý dẫn dắt hay giải thích giao diện; chỉ hỗ trợ khi người tham gia bị kẹt hoàn toàn.
- **Ghi nhận bằng chứng:** Quay màn hình (và ghi âm nếu được đồng ý), ghi chép có cấu trúc về các điểm vướng (*friction points*), thao tác lỗi, sự do dự (*hesitations*) và phản hồi bức xúc (*verbalised frustration*).
- **Kết thúc phiên:** Cho điền thang đo **SUS / UEQ-S**, sau đó hỏi bộ câu hỏi thăm dò về các khó khăn vừa quan sát.

#### Pha 3: Phân tích & Báo cáo (Analyse & Report)
- Tính điểm **SUS / UEQ-S** trên 7 người tham gia.
- Tổng hợp ghi chú: Gom nhóm các *pain point* tương đồng, phân tách giữa lỗi đơn lẻ (*isolated bugs*) và vấn đề thiết kế hệ thống (*systemic design issues*).
- Xếp hạng ưu tiên theo mức độ nghiêm trọng (*severity*, ví dụ: blocker cản trở hoàn thành tác vụ vs lỗi hiển thị nhỏ).
- Báo cáo các bug thực sự tìm được lên **cả Markdown report và GitHub Issues** (kèm screenshot).

---

### Task 3 — Cross-Browser / Cross-Platform (20/100 điểm)
1. Thực hiện lại **Task 1 (chạy GUI Checklist)** trên **ít nhất 3 nền tảng**.
2. **Nền tảng mục tiêu:**
   - Web Frontend: **Chrome**, **Firefox**, và **Safari** (hoặc **Android Chrome**).
   - Có thể dùng **Mobile App qua Expo Go trên điện thoại thật** — được tính là 1 nền tảng hợp lệ và **có thể thay thế 1 trong 3 trình duyệt** (ví dụ: thay cho Safari).
3. **Công cụ thực hiện:**
   - Khuyên dùng bản dùng thử **BrowserStack** hoặc **LambdaTest**.
   - Nếu hết trial có thể dùng công cụ cloud khác (Sauce Labs, CrossBrowserTesting) hoặc thiết bị thật, nhưng screenshot phải thấy rõ **tên trình duyệt / OS / thiết bị** cùng **URL localhost của SUT**.
4. **Quy định bắt buộc trên Screenshot (Anti-AI-Cheat):**
   - Mỗi ảnh chụp phải **overlay username dạng email sinh viên** (theo mục 6 - Task 3).
   - Ảnh chụp cross-platform phải **hiển thị MSSV và Họ tên đầy đủ trên form của SUT** (theo mục 11 - Anti-AI-Cheat).
   - *Khuyến nghị:* Thực hiện đồng thời cả hai yêu cầu trên mọi screenshot cross-platform để an toàn tuyệt đối.

---

### Agent Skill (10/100 điểm)
1. Xây dựng **Agent Skills** tự động hóa quy trình lập/thực thi GUI checklist và đánh giá usability để tái sử dụng cho màn hình/luồng khác.
2. Quay **video minh họa (đăng YouTube và gắn link)** thể hiện quy trình sử dụng skill từ đầu đến cuối (*end-to-end*) trên một màn hình hoặc một luồng hoàn chỉnh.

---

## 4. Yêu cầu về Báo cáo AI, Git Log & Quy định nghiêm ngặt

### 1. AI Audit Report (Phụ lục bắt buộc — Markdown + PDF)
- Nếu **không** dùng AI: Khai báo chính xác câu `"I do not use any AI help in this exercise."`
- Nếu **có** dùng AI: Khai báo `"I use AI tools for the following tasks,"` và ghi đầy đủ cho **mỗi lần tương tác**:
  - Tên công cụ AI (ChatGPT, Claude, Gemini, Copilot, Cursor...)
  - Ngày và giờ thực hiện
  - Toàn bộ Prompt đã nhập
  - Kết quả AI trả về (AI output)

### 2. AI Critique (Đoạn văn 200–300 từ bắt buộc — Markdown + PDF)
Viết một đoạn văn **độ dài 200–300 từ** phê bình AI, trả lời đủ 3 ý:
1. AI đã sai, thiên lệch (*biased*), hoặc thiếu sót ở đâu?
2. Vì sao AI không phát hiện/bỏ sót vấn đề đó?
3. Nguyên tắc rút ra khi cộng tác với AI trong bài tập này là gì?

### 3. Git Commit Log (File text)
- Tạo **commit mới cho từng bước** trong quy trình kiểm thử (ví dụ: thiết kế checklist, thực thi checklist, ghi nhận bug, từng phiên usability, phân tích tổng hợp...).
- Xuất lịch sử commit ra **file text** (ví dụ: `git log > git-log.txt`).

### 4. Lưu ý điểm liệt (0 điểm toàn bài)
- **Không chấp nhận nộp trễ.**
- **Thiếu bất kỳ tài liệu bắt buộc nào → 0 điểm toàn bài.**
- **Sao chép bài hoặc sao chép prompt giữa các sinh viên → 0 điểm cho cả hai bên.**
- **Giả mạo người tham gia usability hoặc ảnh cross-platform → 0 điểm Task 2 / vi phạm Anti-AI-Cheat.**

---

## 5. Checklist các công việc cần làm theo thứ tự (Action Plan)

### Bước 1: Chuẩn bị & Chốt phạm vi
- [ ] Đọc lại slide bài giảng về GUI Checklist & Usability Evaluation + đọc kỹ `README.md` của EShop.
- [ ] Dựng và chạy thành công SUT (Backend, Frontend Web/Admin, hoặc Expo Mobile App).
- [ ] Trao đổi với nhóm để chốt **màn hình GUI Checklist** và **1 luồng E2E Usability** không trùng với bất kỳ thành viên nào khác.
- [ ] Khởi tạo nhánh/thư mục làm việc và commit từng bước lên Git.

### Bước 2: Thực hiện Task 1 — GUI Checklist (30đ)
- [ ] Xây dựng/cập nhật Agent Skill hỗ trợ sinh GUI Checklist và chạy quy trình từng bước với AI (lưu prompt + output cho AI Audit Report).
- [ ] Tự review checklist AI tạo, bổ sung các mục AI bỏ sót (> 40 items, đủ `IA-01` → `IA-04`) và ghi rõ lý do vì sao AI sót từng mục đó.
- [ ] Commit Git bước thiết kế checklist.
- [ ] Thực thi checklist trên SUT, điền Passed/Failed, cột `Notes` cho mục Failed, chụp screenshot **chỉ cho các mục Failed**.
- [ ] Tạo file **Excel Checklist** (> 40 items) + Test Summary.
- [ ] Tạo **GitHub Issues** (kèm screenshot) cho tất cả bug tìm thấy và ghi nhận vào báo cáo Markdown.
- [ ] Commit Git bước thực thi checklist & log bug.

### Bước 3: Thực hiện Task 3 — Cross-Browser / Cross-Platform (20đ)
- [ ] Đăng ký trial **BrowserStack** hoặc **LambdaTest** (hoặc chuẩn bị ≥ 3 nền tảng gồm Chrome, Firefox, Safari / Android Chrome / Expo Go trên điện thoại thật).
- [ ] Thực hiện lại Task 1 trên ≥ 3 nền tảng đó.
- [ ] Chụp ảnh bằng chứng cho từng nền tảng đảm bảo: thấy rõ **tên browser/OS/device + URL localhost**, **overlay email sinh viên**, và **điền MSSV + Họ tên đầy đủ trên form SUT**.
- [ ] Tổng hợp bảng so sánh/lỗi phát sinh theo từng nền tảng và commit Git.

### Bước 4: Thực hiện Task 2 — Usability Evaluation (40đ)
- [ ] Viết mục tiêu đánh giá, Task Scenario (dạng goal-oriented), chuẩn bị phiếu **SUS** hoặc **UEQ-S** + bộ câu hỏi thăm dò mở (clarity, error recovery, speed, trust).
- [ ] Tuyển **1 người chạy Pilot** + **7 người dùng thật ngoài lớp** (lập bảng thông tin gồm tên + Zalo/Email/SĐT đã che 4 số giữa).
- [ ] Chạy phiên Pilot → chỉnh sửa kịch bản nếu cần → Commit Git.
- [ ] Tiến hành 7 phiên test (Think Aloud, không gợi ý dẫn dắt, quay màn hình + ghi chú có cấu trúc, điền SUS/UEQ-S + hỏi thăm dò) → **Commit Git sau từng phiên**.
- [ ] Chấm điểm SUS/UEQ-S, gom nhóm pain points, phân biệt isolated bug vs systemic issue, xếp hạng severity.
- [ ] Log các bug thực sự lên **GitHub Issues** (kèm screenshot) và hoàn thiện phần phân tích → Commit Git.

### Bước 5: Hoàn thiện Agent Skill & Video Demo (10đ)
- [ ] Hoàn thiện Agent Skills cho GUI-checklist và usability-evaluation.
- [ ] Quay video sử dụng Skill end-to-end trên 1 màn hình/luồng hoàn chỉnh, upload lên **YouTube** (để chế độ Unlisted/Public xem được) và lấy link.

### Bước 6: Hoàn thiện Tài liệu & Đóng gói Nộp bài
- [ ] Viết **Main Report** (GUI Checklist + Usability Evaluation) → xuất ra **Markdown + PDF**.
- [ ] Viết **Bug Report** (kèm screenshot các GitHub Issues).
- [ ] Viết **AI Audit Report** (kèm khai báo bắt buộc & toàn bộ log tương tác AI) → xuất **Markdown + PDF**.
- [ ] Viết **AI Critique** (**đủ 200–300 từ**, trả lời 3 câu hỏi quy định) → xuất **Markdown + PDF**.
- [ ] Xuất **Git commit log** ra file `.txt`.
- [ ] Tạo **`README.md`** ở gốc gói nộp chứa:
  - Bảng tự đánh giá (**Self-Assessment Table** — 4 phần, tổng `/100`).
  - Báo cáo tóm tắt (**Test Summary**): số màn hình/luồng đã test; số checklist items thiết kế, thực thi, Passed, Failed; số bug; số người tham gia; link video demo YouTube.
- [ ] Kiểm tra lại toàn bộ tài liệu bắt buộc (tránh thiếu bất kỳ mục nào dẫn đến 0 điểm).
- [ ] Nén thành file `.zip` đúng chuẩn tên: `<StudentID>_HW03_AI_GUIUsability_<SelfAssessedGrade>.zip` (ví dụ: `23120146_HW03_AI_GUIUsability_090.zip`) và nộp lên Moodle trước deadline.

---

## 6. Thang điểm tự đánh giá (Assessment Template)

| STT | Tiêu chí | Điểm tối đa | Tự đánh giá |
| :---: | :--- | :---: | :---: |
| **1** | Task 1 — GUI Checklist (thiết kế + thực thi + bug report) | 30 | |
| **2** | Task 2 — Usability Evaluation (kịch bản + 7 phiên + phân tích) | 40 | |
| **3** | Task 3 — Cross-Browser / Cross-Platform (≥ 3 nền tảng) | 20 | |
| **4** | Agent Skills (kèm link video YouTube minh họa) | 10 | |
| | **Tổng cộng** | **100** | |
