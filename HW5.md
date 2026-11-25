# HW05 – Performance Testing (Kiểm thử hiệu năng)

> **Bản dịch tiếng Việt của tài liệu “2026.HW05.Performance Testing_En.pdf” (9 trang).** Các thuật ngữ kỹ thuật được giữ bằng tiếng Anh, kèm nghĩa tiếng Việt trong ngoặc. Tên riêng, tên công cụ, mã tính năng, tên tệp, câu lệnh và đường dẫn được giữ nguyên khi cần để sử dụng chính xác.

## 1. General Information (Thông tin chung)

| Thông tin | Nội dung |
|---|---|
| **Exercise ID (Mã bài tập)** | HW05-AI |
| **Duration (Thời lượng)** | 10 giờ |
| **Deadline (Hạn nộp)** | Xem tại liên kết nộp bài trên Moodle. |
| **Form (Hình thức)** | Individual Assignment (Bài tập cá nhân). |
| **Submission (Nộp bài)** | Moodle (báo cáo). |
| **Lecturers & TAs (Giảng viên và trợ giảng)** | Dr. Lam Quang Vu / Dr. Tran Duy Hoang / MSc. Tran Thi Bich Hanh / MSc. Truong Phuoc Loc / MSc. Ho Tuan Thanh |
| **Contact (Liên hệ)** | lqvu@fit.hcmus.edu.vn / tdhoang@fit.hcmus.edu.vn / ttbhanh@fit.hcmus.edu.vn / tploc@fit.hcmus.edu.vn / hthanh@fit.hcmus.edu.vn |
| **AI Policy (Chính sách sử dụng AI)** | Open (Cho phép sử dụng AI) — **bắt buộc** có bản khai báo và đính kèm **AI Audit Report (Báo cáo kiểm toán/quá trình sử dụng AI)**. |
| **Required Bloom-AI Level (Cấp độ Bloom-AI yêu cầu)** | G9.1 → G9.6, tùy bài tập (xem **CLO Mapping (Bảng ánh xạ chuẩn đầu ra học phần)**). |

## 2. Guiding Principles (Nguyên tắc hướng dẫn)

Các nguyên tắc dưới đây quy định cách bạn được kỳ vọng thực hiện xuyên suốt chuỗi bài tập của học phần. Hãy đọc kỹ trước khi bắt đầu vì bài nộp sẽ được đánh giá theo những nguyên tắc này.

- **AI-First strategy (Chiến lược ưu tiên sử dụng AI):** Bạn bắt buộc áp dụng AI vào các kỹ thuật kiểm thử đã học trên lớp. Tuy nhiên, điều này **không** có nghĩa chỉ đưa ra một **prompt (câu lệnh/yêu cầu đầu vào cho AI)** chung chung, chẳng hạn “chạy một bài kiểm thử tải và cho tôi biết hiệu năng có tốt không”. Thay vào đó, bạn phải hướng dẫn AI qua từng bước của kỹ thuật đúng như đã được giảng dạy, sử dụng AI như một trợ lý có quy trình chặt chẽ chứ không phải một **black box (hộp đen)**.
- **Human review (Rà soát bởi con người):** Mọi kết quả AI tạo ra đều phải được chính bạn kiểm tra cẩn thận. Bạn chịu hoàn toàn trách nhiệm về độ chính xác của chúng và phải sửa đổi, hoàn thiện khi cần. Không được nộp nguyên **AI output (đầu ra AI)** mà chưa rà soát.
- **AI Audit Report (Báo cáo kiểm toán/quá trình sử dụng AI):** Phải ghi lại toàn bộ quá trình sử dụng AI thành một **log (nhật ký)** đầy đủ. Bạn được khuyến khích tạo **Agent Skills (các kỹ năng của tác nhân AI)** để tự động thực hiện những hoạt động tương tự trong các bài khác. Nếu không sử dụng AI, bạn vẫn phải khai báo rõ điều đó.
- **Documentation (Tài liệu hóa):** Toàn bộ quá trình làm việc phải được ghi chép bằng định dạng văn bản, chẳng hạn **Markdown (định dạng văn bản đánh dấu nhẹ)**.
- **Quality over completion (Ưu tiên chất lượng hơn việc chỉ hoàn thành):** Điểm không chỉ phụ thuộc vào việc có làm đủ hay không mà còn vào số lượng và chất lượng sản phẩm: **test plans (kế hoạch kiểm thử)**, **data files (tệp dữ liệu)**, **raw logs (nhật ký thô)** và **report views (các dạng hiển thị báo cáo)**, bằng chứng tài nguyên/phần cứng, video demo, phần phê bình phân tích của AI và các liên kết tham chiếu.

## 3. Learning Outcomes (Kết quả học tập)

Sau khi hoàn thành bài tập, bạn có thể:

1. Thiết kế và chạy các bài **Load testing (Kiểm thử tải)**, **Stress testing (Kiểm thử chịu tải tới hạn)** và **Spike testing (Kiểm thử tải tăng đột biến)** đối với **backend API (giao diện lập trình ứng dụng phía máy chủ)** của **SUT – System Under Test (Hệ thống được kiểm thử)** bằng JMeter (hoặc k6).
2. Thu thập và trình bày **performance metrics (các chỉ số hiệu năng)** cùng với **resource monitoring (giám sát tài nguyên)** và nhiều **report views (dạng hiển thị báo cáo)**, đồng thời xác định **endurance threshold (ngưỡng chịu tải duy trì lâu dài)** trên phần cứng của chính bạn.
3. Sử dụng AI để phân tích kết quả, sau đó phản biện phân tích của AI: xác định nơi AI hiểu sai các chỉ số và xem xét những **optimizations (biện pháp tối ưu hóa)** mà AI đề xuất có khả thi hay không.
4. Đề xuất một **continuous performance-testing pipeline (quy trình tự động kiểm thử hiệu năng liên tục)**.
5. Thể hiện các năng lực Bloom-AI ở mức **G9.2 (Apply – Áp dụng)**, **G9.3 (Analyse – Phân tích)**, **G9.4 (Collaborate – Hợp tác với AI)** và **G9.6 (Disrupt – Tạo đổi mới/đột phá)**.

## 4. System Under Test – SUT (Hệ thống được kiểm thử)

**SUT:** EShop — ứng dụng thương mại điện tử mẫu của Việt Nam, được thiết kế để thực hành kiểm thử.

**Repository (Kho mã nguồn):** https://github.com/ttbhanh/eshop-sut

Các chức năng được chia thành các **pool (nhóm chức năng)** sau:

### Pool A – Authentication, Categories, and Products (Xác thực, danh mục và sản phẩm)

- **FR-01:** Account registration (Đăng ký tài khoản).
- **FR-02:** Login and account lockout (Đăng nhập và khóa tài khoản).
- **FR-03:** Forgot password and password reset (two steps) (Quên mật khẩu và đặt lại mật khẩu — hai bước).
- **FR-04:** Personal profile management (Quản lý hồ sơ cá nhân).
- **FR-05:** Product listing and search (Danh sách và tìm kiếm sản phẩm).
- **FR-06:** Product detail view (Xem chi tiết sản phẩm).

### Pool B – Shopping Cart and Checkout (Giỏ hàng và thanh toán)

- **FR-07:** Shopping cart (Giỏ hàng).
- **FR-08:** Checkout (Thanh toán/hoàn tất đặt hàng).
- **FR-09:** Discount coupons (Mã giảm giá).
- **FR-10:** Order state machine (Máy trạng thái đơn hàng).
- **FR-11:** Order history view (user) (Xem lịch sử đơn hàng của người dùng).

### Pool C – Web Admin (Quản trị trên nền web)

- **FR-12:** Access control (Kiểm soát quyền truy cập).
- **FR-13:** Dashboard (Bảng điều khiển tổng quan).
- **FR-14:** Category management (CRUD) (Quản lý danh mục — tạo, đọc, cập nhật, xóa).
- **FR-15:** Product management (CRUD) (Quản lý sản phẩm — tạo, đọc, cập nhật, xóa).
- **FR-16:** Product import from CSV (Nhập sản phẩm từ tệp CSV).
- **FR-17:** Coupon management (CRUD) (Quản lý mã giảm giá — tạo, đọc, cập nhật, xóa).
- **FR-18:** Order management (admin) (Quản lý đơn hàng dành cho quản trị viên).
- **FR-19:** User management (admin) (Quản lý người dùng dành cho quản trị viên).

### Pool D – Mobile App (Ứng dụng di động)

SUT cung cấp **REST backend API (API phía máy chủ theo kiến trúc REST)** để **web frontend (giao diện web phía người dùng)** sử dụng. Tham khảo **repository (kho mã nguồn)** để biết chính xác các **endpoints (điểm cuối API)** và **ports (cổng kết nối)**.

## 5. Scope – Endpoint Selection (Phạm vi – Lựa chọn nhóm điểm cuối API)

Chọn ba nhóm **backend API endpoints (điểm cuối API phía máy chủ)** và ánh xạ chúng với API của SUT:

1. **Read-heavy (Nhóm tác vụ thiên về đọc dữ liệu):** Ví dụ: lấy danh sách/tìm kiếm sản phẩm và xem chi tiết sản phẩm.
2. **Auth-heavy (Nhóm tác vụ thiên về xác thực):** Ví dụ: đăng nhập, có xét tới cơ chế **account lockout (khóa tài khoản)**.
3. **Transactional (Nhóm tác vụ giao dịch):** Ví dụ: thêm vào giỏ hàng và **checkout / order creation (thanh toán / tạo đơn hàng)**.

Tương tự các bài tập trước, cần đảm bảo các thành viên trong cùng nhóm **không chọn trùng workflow (luồng thao tác)**: không có hai thành viên kiểm thử cùng một workflow.

## 6. Requirements (Yêu cầu thực hiện)

Với từng nhiệm vụ dưới đây, hãy ghi lại quá trình làm trong **main report (báo cáo chính)** và đính kèm các **evidence (bằng chứng)** được yêu cầu. Trước khi bắt đầu, hãy xem lại các bài giảng liên quan đến **performance testing (kiểm thử hiệu năng)**.

### Task 1 – AI-assisted test design and execution (Thiết kế và thực thi kiểm thử có AI hỗ trợ)

Theo **AI-First strategy (chiến lược ưu tiên AI)**, sử dụng công cụ AI để thiết kế và tạo các **test plans (kế hoạch kiểm thử)**, sau đó rà soát, chỉnh sửa và chịu hoàn toàn trách nhiệm về chúng.

1. **Design and generate with AI (Thiết kế và tạo bằng AI):**
   - Hướng dẫn AI **từng bước**, không dùng một prompt chung chung, để thiết kế và tạo **ba test plans**: **Load**, **Stress** và **Spike**.
   - **Cả ba test plans phải chạy cùng một end-to-end workflow (luồng thao tác xuyên suốt từ đầu đến cuối)**, bao phủ đủ cả ba nhóm endpoint: **auth-heavy (thiên về xác thực)**, **read-heavy (thiên về đọc dữ liệu)** và **transactional (giao dịch)**.
   - Ví dụ: một **virtual user (người dùng ảo)** đăng nhập, duyệt hoặc tìm kiếm sản phẩm, thêm một mặt hàng vào giỏ, rồi hoàn tất thanh toán.
   - Nhờ AI hỗ trợ lựa chọn các **parameters (tham số)** thực tế cho từng **scenario (kịch bản)**, bao gồm **think-time (thời gian người dùng tạm dừng giữa các thao tác)**, **ramp-up (thời gian tăng dần tải)**, **thread / virtual-user counts (số luồng / số người dùng ảo)**.
   - Giải thích ngắn gọn vì sao workflow đã bao phủ từng nhóm endpoint.
2. **Make the workflow data-driven (Áp dụng cách tiếp cận dựa trên dữ liệu):** Dùng **CSV input data (dữ liệu đầu vào dạng CSV)** trong end-to-end workflow để **parameterize requests (tham số hóa các yêu cầu gửi đi)**, ví dụ **credentials (thông tin đăng nhập)**, **product IDs (mã sản phẩm)** hoặc **order payloads (dữ liệu gửi kèm yêu cầu tạo đơn hàng)**. Có thể sử dụng một hay nhiều tệp CSV phù hợp với workflow.
3. **Use three different report views (Sử dụng ba dạng báo cáo khác nhau):** Trên cả ba test plans, sử dụng ba loại **listener / report (bộ thu thập kết quả / báo cáo)** khác nhau, ví dụ **View Results Tree (Xem cây kết quả)**, **Summary Report (Báo cáo tóm tắt)** và **Aggregate Report (Báo cáo tổng hợp)**; **không lặp lại một loại**. Đây là thuật ngữ của JMeter; người sử dụng k6 phải cung cấp các đầu ra khác nhau tương đương.
4. **Name each test plan (Đặt tên từng kế hoạch kiểm thử)** theo mẫu chính xác:

   ```text
   {StudentID}_{ScenarioType}_{YYYYMMDD}
   ```

   Trong đó `StudentID` là mã số sinh viên, `ScenarioType` là loại kịch bản và `YYYYMMDD` là ngày theo dạng năm-tháng-ngày.
5. **Review and fix – human review (Rà soát và sửa lỗi bởi con người):** Phản biện và sửa các test plans do AI tạo. Báo cáo những điểm AI làm sai hoặc bỏ sót, ví dụ **ramp-up** hoặc **think-time** thiếu thực tế, số **threads (luồng)** không đúng, **assertions (điều kiện kiểm tra/xác nhận kết quả)** yếu hoặc thiếu xử lý **account lockout (khóa tài khoản)**. Giải thích vì sao AI bỏ sót (do chất lượng prompt, giới hạn mô hình hoặc đặc điểm endpoint). Bạn chịu trách nhiệm toàn bộ đối với test plans cuối cùng.
6. **Run as completely as possible, with evidence (Thực thi đầy đủ nhất có thể và cung cấp bằng chứng):**
   - Thực thi đủ cả ba scenarios (kịch bản).
   - Mỗi lần chạy cần có **screenshot (ảnh chụp màn hình)** của công cụ kiểm thử cùng thông tin sử dụng tài nguyên của **backend process (tiến trình phía máy chủ)** từ **htop / Task Manager / Activity Monitor (các công cụ giám sát tài nguyên)**.
   - Cung cấp **hardware report (báo cáo phần cứng)** bao gồm ảnh chụp **dxdiag / screenfetch (công cụ hiển thị thông tin hệ thống)** và một **spec table (bảng thông số cấu hình)**.
   - Nếu chạy Stress/Spike kích hoạt cơ chế **3-fail login lockout (khóa đăng nhập sau 3 lần thất bại)**, cần đặt lại trạng thái khóa giữa các lượt chạy và ghi lại các bước thực hiện.
   - Xuất các **raw `.jtl` logs (tệp nhật ký kết quả thô định dạng `.jtl`)** và các **HTML report folders (thư mục báo cáo HTML)**.
7. **Determine the endurance threshold (Xác định ngưỡng chịu tải duy trì):** Chạy một bài **endurance / soak test (kiểm thử duy trì tải trong thời gian dài)** ngắn, khoảng **10–15 phút** với mức tải được duy trì ổn định, để xác định bằng thực nghiệm ngưỡng phần cứng của bạn. Báo cáo bằng số cụ thể, ví dụ **maximum stable RPS (số yêu cầu mỗi giây tối đa còn ổn định)** và **memory ceiling (giới hạn sử dụng bộ nhớ)**.
8. **Record a demo video (Quay video minh họa):** Cung cấp video YouTube ở chế độ **unlisted (không công khai, chỉ ai có liên kết mới xem được)** với **tổng thời lượng tối thiểu 6 phút**; có thể tách thành một clip cho mỗi scenario. Video phải cho thấy công cụ kiểm thử và công cụ giám sát tài nguyên **trong cùng một khung hình**, với lời thuyết minh tiếng Việt bằng chính giọng nói của bạn.
9. **Report issues (Báo cáo vấn đề):** Ghi nhận các **bugs (lỗi phần mềm)** hoặc **performance issues (vấn đề hiệu năng)** thực sự, như **error responses (phản hồi lỗi)**, **crashes (sự cố làm chương trình dừng đột ngột)**, **functional regressions (lỗi hồi quy chức năng)**, lên trang **GitHub Issues (trình quản lý vấn đề của GitHub)** cùng ảnh chụp màn hình. Việc ghi nhận vấn đề hiệu năng như **high latency (độ trễ cao)** hoặc **elevated error rate (tỷ lệ lỗi tăng cao)** được khuyến khích, nhưng không bị trừ điểm nếu không có.

### Task 2 – AI analysis and misinterpretation hunt (Phân tích bằng AI và tìm các trường hợp diễn giải sai)

Theo AI-First strategy, sử dụng AI để phân tích kết quả, sau đó tự mình đánh giá phản biện: **phần phân tích là đầu ra của AI, còn phần rà soát là của bạn**.

1. **Analyse with AI (Phân tích bằng AI):** Sau khi thu thập **raw results (kết quả thô)**, viết prompt yêu cầu công cụ AI phân tích các **`.jtl` logs (nhật ký `.jtl`)** và đề xuất **performance thresholds (ngưỡng hiệu năng)**.
2. **Review and correct – human review (Rà soát và sửa bởi con người):** Đánh giá phản biện phân tích của AI và xác định chỗ AI hiểu sai hoặc đọc sai các **metrics (chỉ số)**. Với **mỗi** trường hợp diễn giải sai, hãy trích dẫn giá trị đúng từ **raw `.jtl` log (nhật ký `.jtl` gốc)** và giải thích lỗi.
3. **Judge the AI's recommendations (Đánh giá các đề xuất của AI):** Yêu cầu AI đề xuất **optimizations (biện pháp tối ưu hóa)**, ví dụ thêm **database index (chỉ mục cơ sở dữ liệu)**, **connection pool (bộ quản lý/tái sử dụng kết nối)** hoặc bật **SQLite WAL – Write-Ahead Logging (cơ chế ghi nhật ký trước của SQLite)**. Phân loại từng đề xuất là **feasible (khả thi)** hay **hallucinated (do AI bịa ra/không có căn cứ)**, kèm lý do.

### Task 3 – Continuous Performance Testing proposal (Disrupt) (Đề xuất kiểm thử hiệu năng liên tục – mức đổi mới/đột phá)

Trong phần kết luận, đề xuất một **continuous performance-testing model (mô hình kiểm thử hiệu năng liên tục)** có khả năng:

- Theo dõi các **commits (lần ghi nhận thay đổi mã nguồn)** của SUT.
- Quyết định khi nào cần chạy bài **performance tests (kiểm thử hiệu năng)**.
- Phát hiện và cảnh báo **p95 regressions (sự suy giảm hiệu năng ở phân vị thời gian phản hồi thứ 95)**.

Phải có **flow chart (lưu đồ)** và thảo luận về **trade-offs (các đánh đổi)**, ví dụ **cost (chi phí)** và **false alarms (cảnh báo sai)**.

## 7. Agent Skill (Kỹ năng tác nhân AI)

Bạn được khuyến khích xây dựng **Agent Skill (kỹ năng của tác nhân AI)** thực hiện **performance-testing and log-analysis workflow (quy trình kiểm thử hiệu năng và phân tích nhật ký)**, để tái sử dụng cho các endpoint khác trong những bài tập kiểm thử sau.

Nộp Agent Skill kèm **demonstration video (video minh họa)** dưới dạng liên kết YouTube, cho thấy toàn bộ quá trình sử dụng skill trên một **endpoint group (nhóm điểm cuối API)** hoàn chỉnh, từ đầu đến cuối.

## 8. Allowed Tools and Bloom-AI Level (Công cụ được phép sử dụng và cấp độ Bloom-AI)

Bạn có thể dùng những công cụ sau và **phải khai báo chúng trong AI Audit Report**:

- **JMeter** (mặc định) hoặc **k6** (được tính là **bonus (điểm cộng/ưu tiên thêm)**).
- Bất kỳ công cụ AI nào bạn chọn (ví dụ ChatGPT, Claude, Gemini) để **log analysis (phân tích nhật ký)**.
- **Resource monitor (công cụ giám sát tài nguyên)** như htop / Task Manager / Activity Monitor.

Các mức Bloom-AI yêu cầu: **G9.2 (Apply – Áp dụng)**, **G9.3 (Analyse – Phân tích)**, **G9.4 (Collaborate – Hợp tác)** và **G9.6 (Disrupt – Đổi mới/đột phá)**.

## 9. AI Audit Report – Mandatory Appendix (Báo cáo kiểm toán/quá trình sử dụng AI – Phụ lục bắt buộc)

Đính kèm **AI Audit Report** dưới dạng phụ lục. Có thể sử dụng nội dung của **AI Templates (các mẫu tài liệu AI)** đã được cung cấp nếu cần.

- Nếu **không** dùng AI, phải khai báo nguyên văn:

  > I do not use any AI help in this exercise.

  (Tôi không sử dụng bất kỳ sự trợ giúp nào từ AI trong bài tập này.)

- Nếu **có** dùng AI, khai báo nguyên văn:

  > I use AI tools for the following tasks,

  (Tôi sử dụng các công cụ AI cho những nhiệm vụ sau,) và ghi lại **mỗi lần tương tác** với các thông tin:

  1. **Name of the AI tool (Tên công cụ AI)**.
  2. **Date and time (Ngày và giờ)**.
  3. **Your prompt (Prompt/yêu cầu bạn gửi cho AI)**.
  4. **The AI output (Đầu ra do AI trả về)**.

Để đơn giản hóa công việc, bạn được khuyến khích tạo **skill or rule (kỹ năng hoặc quy tắc tự động)** trích xuất các thông tin trên sau mỗi phiên sử dụng AI.

## 10. AI Critique – 200–300 words, Mandatory (Phê bình AI – 200–300 từ, bắt buộc)

Viết **một đoạn văn dài 200–300 từ** để đánh giá, phê bình AI. Trả lời các câu hỏi:

1. AI đã sai, thiên lệch hoặc thiếu sót ở đâu?
2. Vì sao AI không phát hiện được vấn đề đó?
3. Bạn rút ra nguyên tắc nào về **collaborating with AI (hợp tác với AI)** trong quá trình làm bài?

Có thể tham khảo nội dung **AI Templates (các mẫu tài liệu AI)** được cung cấp nếu cần.

## 11. Anti-AI-Cheat Constraints (Quy định chống gian lận bằng AI)

Bài tập dựa trên các **execution evidence (bằng chứng thực thi)** có thật và có thể xác định người thực hiện. Những nội dung sau **không được tạo giả hoặc ngụy tạo bằng AI**; trợ giảng sẽ kiểm tra khi chấm bài:

- Tên các **test-plan files (tệp kế hoạch kiểm thử)** phải khớp đúng mẫu:

  ```text
  {StudentID}_{ScenarioType}_{YYYYMMDD}
  ```

- Các **raw `.jtl` log files (tệp nhật ký `.jtl` thô)** phải được đính kèm **đầy đủ**, không chỉ nộp bản tóm tắt.
- **Demo video (video minh họa)** phải cho thấy công cụ kiểm thử và **resource monitor (công cụ giám sát tài nguyên)** trong cùng một khung hình, có phần thuyết minh bằng **chính giọng nói của bạn**.
- **Hardware report (báo cáo phần cứng)** phải có **hostname (tên máy chủ/tên máy)** khớp với những lần **deployment (triển khai)** ở các bài tập trước.

## 12. Git Commit Log (Nhật ký commit Git)

- Tạo một **Git commit (lần ghi nhận thay đổi trong Git)** mới cho **mỗi bước** của quy trình, chẳng hạn: test plan của từng scenario, phần phân tích AI và đề xuất kiểm thử liên tục.
- Nộp **Git commit log (nhật ký các commit Git)** trong một **text-based file (tệp văn bản)**.

## 13. Oral Defense (Vấn đáp bảo vệ bài tập)

Khoảng **30% sinh viên được chọn ngẫu nhiên** có thể được mời **oral defense (vấn đáp/bảo vệ trực tiếp)** trong **5–7 phút** vào tuần sau hạn nộp, để giải thích cách mình đã thực hiện bài tập.

## 14. Submission Regulations (Quy định nộp bài)

### 14.1. Filename format (Quy tắc đặt tên tệp)

Tên tệp `.zip` phải theo mẫu:

```text
<StudentID>_HW05_AI_Performance_<SelfAssessedGrade>.zip
```

- **SelfAssessedGrade (Điểm tự đánh giá):** số có **3 chữ số**, thuộc khoảng **[000, 100]**.
- **Ví dụ:** `25127001_HW05_AI_Performance_090.zip`.

### 14.2. Required contents of the `.zip` (Các thành phần bắt buộc trong tệp `.zip`)

1. **Main report (Báo cáo chính)** ở cả hai định dạng **Markdown + PDF**, bao gồm báo cáo **performance testing (kiểm thử hiệu năng)** và phần **AI-analysis critique (phê bình/đánh giá phân tích của AI)**.
2. Liên kết **public GitHub repository (kho mã nguồn GitHub công khai)** chứa các test plans và data files (tệp dữ liệu).
3. **Ba test plans** Load / Stress / Spike theo đúng quy tắc đặt tên.
4. **Ba raw `.jtl` logs (nhật ký `.jtl` thô)** và **ba HTML report folders (thư mục báo cáo HTML)**.
5. Ảnh chụp **resource monitor (công cụ giám sát tài nguyên)** và **hardware specifications (thông số cấu hình phần cứng)**.
6. Liên kết video demo trên YouTube ở chế độ **unlisted (không công khai)**.
7. **AI Critique (Bài phê bình AI)** và **AI Audit Report (Báo cáo quá trình sử dụng AI)**, mỗi tài liệu ở định dạng **Markdown + PDF**.
8. **Git commit log (Nhật ký commit Git)** dưới dạng tệp văn bản.
9. **Bug report (Báo cáo lỗi)**, kèm ảnh chụp vấn đề trên **GitHub Issues**, nếu có.
10. Một tệp **`README.md`** có **self-assessment table (bảng tự đánh giá)** ở mục 15 và **test summary report (báo cáo tổng kết kiểm thử)** gồm:
    - Các **scenarios (kịch bản)** đã chạy.
    - Các **endpoint groups (nhóm điểm cuối API)** được bao phủ.
    - **Endurance threshold (ngưỡng chịu tải duy trì)**, có số liệu cụ thể.
    - Số lượng **bugs / performance issues (lỗi / vấn đề hiệu năng)**.
    - Liên kết video demo.
11. Các tài liệu hỗ trợ khác (nếu có).

**Nơi nộp:** Moodle. **Hạn nộp:** xem tại liên kết nộp bài trên Moodle.

## 15. Assessment Template (Mẫu bảng đánh giá)

| STT | Tiêu chí đánh giá | Điểm tối đa | Self-Assessed Grade (Điểm tự đánh giá) |
|---:|---|---:|---|
| 1 | **Task 1 – Load testing (Kiểm thử tải)** | 30 | |
| 2 | **Task 1 – Stress testing (Kiểm thử chịu tải tới hạn)** | 20 | |
| 3 | **Task 1 – Spike testing (Kiểm thử tải tăng đột biến)** | 20 | |
| 4 | **Task 2 – AI analysis + misinterpretation hunt (Phân tích bằng AI và tìm các diễn giải sai)**, kèm giá trị đúng từ **raw logs (nhật ký thô)** | 10 | |
| 5 | **Task 3 – Continuous Performance Testing proposal (Đề xuất kiểm thử hiệu năng liên tục)** (G9.6) | 10 | |
| 6 | **Agent Skills (Kỹ năng tác nhân AI)** | 10 | |
| | **Total (Tổng điểm)** | **100** | |

## 16. References (Tài liệu tham khảo)

1. **ISTQB Foundation Level Syllabus (Đề cương ISTQB cấp độ nền tảng)** – phiên bản mới nhất.
2. Hardman, P. (2025). *A Post-AI Learning Taxonomy* (Hệ phân loại học tập thời kỳ hậu AI).
3. Fuster Rabella, M. (2025). *OECD Education Working Paper No. 338* (Tài liệu nghiên cứu giáo dục OECD số 338).
4. Anthropic (2025). *Building Reliable AI Test Agents* (Xây dựng các tác nhân AI kiểm thử đáng tin cậy) – bài viết blog kỹ thuật.
5. Tài liệu **DeepEval** và **Promptfoo** – **LLM testing frameworks (các framework kiểm thử mô hình ngôn ngữ lớn)**.

## 17. Other Regulations (Các quy định khác)

- **Không được nộp trễ.**
- **Thiếu bất kỳ tài liệu bắt buộc nào sẽ bị 0 điểm.**
- **Sao chép giữa các sinh viên — bao gồm cả prompts (các câu lệnh/yêu cầu gửi AI) — sẽ khiến cả hai bên bị 0 điểm.**

---

> **Lưu ý về bản dịch:** Nội dung giữ nguyên phạm vi và yêu cầu của tài liệu gốc. Các diễn giải tiếng Việt trong ngoặc chỉ nhằm làm rõ thuật ngữ, không bổ sung tiêu chí chấm điểm mới.
