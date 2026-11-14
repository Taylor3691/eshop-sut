# HW03 – GUI (Giao diện người dùng đồ họa) & Usability (Tính dễ sử dụng)

> **Bản dịch tiếng Việt của tài liệu:** `2026.HW03.GUI Usability_En.pdf` (9 trang).  
> **Quy ước:** Các thuật ngữ tiếng Anh chuyên ngành được giữ nguyên, kèm nghĩa tiếng Việt trong ngoặc đơn ở lần sử dụng và tại những chỗ cần làm rõ. Các mã FR, IA, G9, tên công cụ, đường dẫn và định dạng tệp được giữ nguyên.

## 1. General Information (Thông tin chung)

| Nội dung | Chi tiết |
|---|---|
| Exercise ID (Mã bài tập) | HW03-AI |
| Duration (Thời lượng) | 10 giờ |
| Deadline (Hạn nộp) | Xem tại liên kết nộp bài trên Moodle |
| Form (Hình thức) | Individual Assignment (Bài tập cá nhân) |
| Submission (Nộp bài) | Moodle (báo cáo) |
| Lecturers & TAs (Giảng viên và trợ giảng) | TS. Lam Quang Vu / TS. Tran Duy Hoang / ThS. Tran Thi Bich Hanh / ThS. Truong Phuoc Loc / ThS. Ho Tuan Thanh |
| Contact (Liên hệ) | lqvu@fit.hcmus.edu.vn / tdhoang@fit.hcmus.edu.vn / ttbhanh@fit.hcmus.edu.vn / tploc@fit.hcmus.edu.vn / hthanh@fit.hcmus.edu.vn |
| AI Policy (Chính sách sử dụng AI) | Open (Cho phép sử dụng AI) — **bắt buộc** có bản khai báo và đính kèm AI Audit Report (Báo cáo kiểm toán việc sử dụng AI) |
| Required Bloom-AI Level (Mức Bloom-AI yêu cầu) | G9.1 → G9.6, tùy bài tập (xem CLO Mapping — Bảng ánh xạ chuẩn đầu ra học phần) |

## 2. Guiding Principles (Nguyên tắc định hướng)

Các nguyên tắc dưới đây quy định cách bạn cần thực hiện xuyên suốt chuỗi bài tập của học phần. Hãy đọc kỹ trước khi bắt đầu, vì bài nộp sẽ được đánh giá dựa trên các nguyên tắc này.

- **AI-First strategy (Chiến lược ưu tiên AI):** Bạn bắt buộc áp dụng AI vào các kỹ thuật testing (kiểm thử) đã học trên lớp. Tuy nhiên, điều này **không** có nghĩa là chỉ đưa ra một prompt (câu lệnh/yêu cầu gửi cho AI) chung chung như “hãy tạo GUI checklist (danh sách kiểm tra giao diện đồ họa) và tìm các vấn đề usability (tính dễ sử dụng) trong ứng dụng này”. Thay vào đó, bạn phải hướng dẫn AI qua từng bước của kỹ thuật đúng như đã được giảng dạy, sử dụng AI như một trợ lý có phương pháp, không phải một black box (hộp đen).
- **Human review (Rà soát bởi con người):** Bạn, với tư cách sinh viên, phải kiểm tra cẩn thận mọi kết quả do AI tạo ra. Bạn hoàn toàn chịu trách nhiệm về tính chính xác của các kết quả đó. Cần thực hiện các chỉnh sửa và tinh chỉnh cần thiết; **không được** nộp nguyên kết quả AI mà chưa rà soát.
- **AI Audit Report (Báo cáo kiểm toán việc sử dụng AI):** Toàn bộ quá trình dùng AI phải được ghi lại trong một log (nhật ký) đầy đủ. Bạn được khuyến khích xây dựng Agent Skills (các kỹ năng dành cho tác nhân AI) để tự động thực hiện những hoạt động này đối với các bài tập tương tự. Nếu không sử dụng AI, bạn vẫn phải khai báo rõ ràng.
- **Documentation (Tài liệu hóa):** Toàn bộ quá trình thực hiện phải được ghi chép ở định dạng văn bản, chẳng hạn Markdown (ngôn ngữ đánh dấu văn bản nhẹ).
- **Quality over completion (Ưu tiên chất lượng hơn việc chỉ hoàn thành):** Bài làm không chỉ được chấm dựa trên mức độ hoàn thành mà còn dựa trên số lượng và chất lượng các deliverables (sản phẩm bàn giao): checklist (danh sách kiểm tra), thiết kế và phân tích đánh giá usability (tính dễ sử dụng), bug reports (báo cáo lỗi), screenshots (ảnh chụp màn hình), danh sách người tham gia và các liên kết tham chiếu.

## 3. Learning Outcomes (Kết quả học tập)

Sau khi hoàn thành bài tập, bạn có thể:

- Thiết kế và áp dụng GUI checklist (danh sách kiểm tra giao diện đồ họa), kết hợp với usability evaluation (đánh giá tính dễ sử dụng), dựa trên các yêu cầu về user interface (giao diện người dùng) của SUT (System Under Test — hệ thống được kiểm thử).
- Thu thập và phân tích usability feedback (phản hồi về tính dễ sử dụng) từ người dùng thật.
- Thực hiện cross-browser testing (kiểm thử đa trình duyệt) và cross-platform testing (kiểm thử đa nền tảng) trên web frontend (giao diện web phía người dùng) và mobile app (ứng dụng di động) của SUT.
- Thể hiện năng lực Bloom-AI ở mức G9.3 — Analyse (Phân tích) và G9.4 — Collaborate with AI for exploratory testing (Hợp tác với AI để kiểm thử khám phá).

## 4. System Under Test – SUT (Hệ thống được kiểm thử)

**SUT:** EShop — ứng dụng demo e-commerce (thương mại điện tử) của Việt Nam, được thiết kế để thực hành testing (kiểm thử).

**Repository (Kho mã nguồn):** https://github.com/ttbhanh/eshop-sut

Các chức năng của ứng dụng được chia thành các pool (nhóm chức năng) sau:

### Pool A — Authentication, Categories, and Products (Xác thực, danh mục và sản phẩm)

- **FR-01:** Account registration (Đăng ký tài khoản).
- **FR-02:** Login and account lockout (Đăng nhập và khóa tài khoản).
- **FR-03:** Forgot password and password reset — two steps (Quên mật khẩu và đặt lại mật khẩu — hai bước).
- **FR-04:** Personal profile management (Quản lý hồ sơ cá nhân).
- **FR-05:** Product listing and search (Danh sách và tìm kiếm sản phẩm).
- **FR-06:** Product detail view (Xem chi tiết sản phẩm).

### Pool B — Shopping Cart and Checkout (Giỏ hàng và thanh toán/đặt hàng)

- **FR-07:** Shopping cart (Giỏ hàng).
- **FR-08:** Checkout (Quy trình thanh toán/đặt hàng).
- **FR-09:** Discount coupons (Mã giảm giá).
- **FR-10:** Order state machine (Máy trạng thái đơn hàng).
- **FR-11:** Order history view — user (Xem lịch sử đơn hàng — người dùng).

### Pool C — Web Admin (Trang quản trị web)

- **FR-12:** Access control (Kiểm soát quyền truy cập).
- **FR-13:** Dashboard (Bảng điều khiển/tổng quan).
- **FR-14:** Category management — CRUD (Quản lý danh mục — Create/Read/Update/Delete: tạo/đọc/cập nhật/xóa).
- **FR-15:** Product management — CRUD (Quản lý sản phẩm — tạo/đọc/cập nhật/xóa).
- **FR-16:** Product import from CSV (Nhập sản phẩm từ tệp CSV — Comma-Separated Values, dữ liệu phân tách bằng dấu phẩy).
- **FR-17:** Coupon management — CRUD (Quản lý mã giảm giá — tạo/đọc/cập nhật/xóa).
- **FR-18:** Order management — admin (Quản lý đơn hàng — quản trị viên).
- **FR-19:** User management — admin (Quản lý người dùng — quản trị viên).

### Pool D — Mobile App (Ứng dụng di động)

Ngoài các functional requirements — FR (yêu cầu chức năng) nói trên, bài tập này tập trung vào user interface — UI (giao diện người dùng). Tài liệu đặc tả không gán mã FR cho các vấn đề liên quan đến giao diện. Vì vậy, trong bài này, chúng được tổ chức thành các interface aspects — IA (khía cạnh giao diện) sau. Các mã IA được định nghĩa để tham chiếu trong checklist; chúng là **các khía cạnh giao diện cần kiểm thử**, **không phải** các yêu cầu chức năng được đánh số.

- **IA-01:** General UI standards (Các tiêu chuẩn giao diện chung).
- **IA-02:** Forms (Các biểu mẫu).
- **IA-03:** Navigation (Điều hướng).
- **IA-04:** Feedback / state (Phản hồi / trạng thái).

## 5. Scope Selection (Lựa chọn phạm vi)

Bài tập này tập trung vào user interface (giao diện người dùng) của SUT. Bạn có thể chọn các screen (màn hình) và user flow (luồng thao tác người dùng) để thực hiện, miễn đáp ứng yêu cầu tối thiểu của từng task (nhiệm vụ).

- **Đối với GUI checklist (danh sách kiểm tra giao diện):** Có thể chọn một hoặc nhiều màn hình của SUT, ví dụ Home (Trang chủ), Cart (Giỏ hàng), Checkout (Thanh toán/đặt hàng), Admin Dashboard (Bảng điều khiển quản trị) hoặc một màn hình Mobile (Di động). **Tối thiểu một màn hình**; tuy nhiên, một màn hình đơn lẻ khó tạo ra 40 mục kiểm tra thực sự có ý nghĩa. Vì vậy, bạn được khuyến khích mạnh mẽ kiểm thử nhiều màn hình nhằm đạt đủ interface coverage (độ bao phủ giao diện). Chỉ kiểm thử một màn hình vẫn được phép, nhưng dễ dẫn đến các mục kiểm tra nông hoặc lặp lại.
- **Đối với usability evaluation (đánh giá tính dễ sử dụng):** Chọn một end-to-end flow (luồng thao tác đầu-cuối), ví dụ Sign-up → Add to cart → Checkout with a coupon (Đăng ký → Thêm vào giỏ hàng → Thanh toán/đặt hàng bằng mã giảm giá). Luồng này sẽ trở thành task scenario (kịch bản nhiệm vụ) để người tham gia thực hiện ở Task 2.

**Trong mỗi nhóm, các thành viên không được chọn trùng nhau:** không có hai thành viên nào được chọn cùng một primary screen (màn hình chính được chọn) cho GUI checklist hoặc cùng một usability flow (luồng thao tác được đánh giá tính dễ sử dụng).

## 6. Requirements (Yêu cầu)

Với mỗi nhiệm vụ dưới đây, hãy ghi lại quy trình thực hiện trong main report (báo cáo chính) và đính kèm các evidence (minh chứng) được yêu cầu.

### Task 1 — GUI Checklist (Danh sách kiểm tra giao diện đồ họa)

1. Thiết kế một checklist **hơn 40 mục** bao phủ đầy đủ cả bốn interface aspects (khía cạnh giao diện) của SUT: general UI standards (tiêu chuẩn giao diện chung, IA-01), forms (biểu mẫu, IA-02), navigation (điều hướng, IA-03), feedback/state (phản hồi/trạng thái, IA-04). Trước khi bắt đầu, hãy xem lại các bài giảng liên quan đến GUI checklist. Dùng một AI tool (công cụ AI) để tạo bộ mục ban đầu, sau đó rà soát và tự bổ sung các mục khác. Bạn được khuyến khích vượt mức tối thiểu: độ bao phủ càng đầy đủ và càng ít lặp lại thì càng tốt.
2. Rà soát có tính phản biện đối với các mục do AI tạo ra và thêm vào checklist những mục AI bỏ sót. **Với mỗi mục do bạn bổ sung, giải thích vì sao AI bỏ sót**, chẳng hạn do chất lượng input prompt (câu lệnh đầu vào), giới hạn của AI model (mô hình AI), hoặc đặc điểm riêng của giao diện được chọn. Những vấn đề AI thường bỏ qua gồm accessibility (khả năng tiếp cận), right-to-left — RTL layout (bố cục từ phải sang trái) và dark mode (chế độ tối); đây chỉ là ví dụ, bạn có thể bổ sung các khía cạnh khác.
3. Execute the checklist (thực thi danh sách kiểm tra) trên SUT — giai đoạn test execution (thực thi kiểm thử) — và đánh dấu từng mục là **Passed (Đạt)** hoặc **Failed (Không đạt)**. Thêm cột **Notes (Ghi chú)** để ghi lý do không đạt cho mỗi mục Failed. **Chỉ đính kèm screenshots (ảnh chụp màn hình) cho các mục Failed.**
4. Báo cáo tất cả bugs (lỗi) tìm thấy ở cả **Markdown report (báo cáo Markdown)** và trang **GitHub Issues (trình quản lý vấn đề/lỗi trên GitHub)**. Nhớ đính kèm screenshot lỗi trong mỗi GitHub issue (mục báo lỗi trên GitHub).

### Task 2 — Usability Evaluation (Đánh giá tính dễ sử dụng)

Bạn sẽ thực hiện một moderated usability evaluation (đánh giá tính dễ sử dụng có người điều phối) với small sample (mẫu nhỏ), áp dụng cho **một end-to-end flow (luồng đầu-cuối)** đã chọn ở mục 5, cùng **bảy (7) người tham gia thật** — **bảy phiên, mỗi người một phiên**. Hãy xem lại các bài giảng liên quan đến usability evaluation trước khi bắt đầu.

#### Phase 1 — Plan & prepare (Giai đoạn 1 — Lập kế hoạch và chuẩn bị)

1. **Define your objectives (Xác định mục tiêu):** Nêu rõ điều muốn tìm hiểu, ví dụ người dùng gặp navigation bottlenecks (điểm nghẽn điều hướng) ở đâu trong luồng đã chọn, hoặc họ tự tin đến mức nào khi hoàn thành luồng đó.
2. **Write the task scenario (Viết kịch bản nhiệm vụ):** Biến luồng đã chọn thành một kịch bản thực tế, hướng tới mục tiêu, ví dụ: “Tìm một chiếc áo khoác mùa đông dưới 500.000 đồng và thanh toán bằng mã giảm giá”. **Hãy đưa cho người tham gia một mục tiêu, không phải hướng dẫn từng bước.**
3. **Prepare the instruments (Chuẩn bị công cụ đo lường):** Chuẩn bị một standard usability scale (thang đo tiêu chuẩn về tính dễ sử dụng) để người tham gia điền sau mỗi phiên — **SUS (System Usability Scale — Thang đo tính dễ sử dụng của hệ thống)** hoặc **UEQ-S (User Experience Questionnaire – Short — Bảng câu hỏi trải nghiệm người dùng bản ngắn)**; cũng có thể dùng custom scale (thang đo tự thiết kế) nếu có văn bản giải thích rõ ràng lý do. Đồng thời chuẩn bị một bộ open-ended probe questions (câu hỏi gợi mở, đào sâu) ngắn, bao phủ tối thiểu: clarity (mức độ rõ ràng), error recovery (khả năng khắc phục lỗi), speed (tốc độ) và trust (sự tin tưởng).
4. **Recruit seven real participants (Tuyển bảy người tham gia thật):** Họ phải phù hợp với target user profile (hồ sơ người dùng mục tiêu), có contact details (thông tin liên hệ) có thể kiểm chứng như Zalo, email hoặc số điện thoại, với **bốn chữ số ở giữa được che đi**. Người tham gia phải **ở ngoài lớp học này**; sinh viên đang học HW03 **không đủ điều kiện**. Ưu tiên người không thuộc ngành IT (công nghệ thông tin) hoặc không làm tester (người kiểm thử) để nhận phản hồi chân thực, nhưng đây không phải yêu cầu bắt buộc.
5. **Run a pilot session (Chạy một phiên thử nghiệm):** Thực hiện cùng một người nhằm phát hiện kịch bản chưa rõ, luồng bị lỗi hoặc vấn đề về thời gian; chỉnh sửa trước khi tiến hành các phiên chính thức.

#### Phase 2 — Conduct the sessions (Giai đoạn 2 — Tiến hành các phiên, mỗi người một phiên)

1. **Set the stage (Thiết lập bối cảnh):** Nói với người tham gia rằng bạn đang kiểm thử sản phẩm, **không phải kiểm tra năng lực của họ**, và đề nghị họ **think aloud (nói thành lời suy nghĩ)** trong lúc thao tác.
2. **Observe neutrally (Quan sát trung lập):** Không gợi ý theo hướng dẫn dắt hoặc giải thích giao diện; chỉ can thiệp nếu người tham gia hoàn toàn bế tắc.
3. **Capture evidence (Thu thập minh chứng):** Screen recording (ghi hình màn hình), audio recording (ghi âm, nếu được đồng ý) và ghi structured notes (ghi chú có cấu trúc) về friction points (điểm gây cản trở), errors (lỗi), hesitations (sự do dự) và verbalised frustration (sự khó chịu được người tham gia nói ra).
4. **Close the session (Kết thúc phiên):** Yêu cầu người tham gia hoàn thành thang SUS / UEQ-S, rồi đặt các probe questions (câu hỏi đào sâu) để tìm hiểu những khó khăn bạn đã quan sát.

#### Phase 3 — Analyse & report (Giai đoạn 3 — Phân tích và báo cáo)

1. **Score (Chấm điểm)** kết quả SUS / UEQ-S của cả bảy người tham gia.
2. **Synthesise your notes (Tổng hợp ghi chú):** Gom nhóm các pain points (điểm khó khăn) tương tự nhau và phân biệt isolated bugs (lỗi riêng lẻ) với systemic design issues (vấn đề thiết kế mang tính hệ thống).
3. **Prioritise by severity (Ưu tiên theo mức độ nghiêm trọng):** Ví dụ, phân biệt blockers (vấn đề chặn hoàn thành nhiệm vụ) và minor visual complaints (phàn nàn nhỏ về hình thức hiển thị).
4. Báo cáo các genuine bugs (lỗi thực sự) ở cả báo cáo Markdown và trang GitHub Issues, kèm screenshot cho mỗi issue.
5. TA (trợ giảng) có thể gọi ngẫu nhiên **hai (2) người tham gia** để xác minh. **Mạo danh người tham gia dẫn đến 0 điểm cho Task 2.**

### Task 3 — Cross-Browser / Cross-Platform (Kiểm thử đa trình duyệt / đa nền tảng)

1. Thực hiện **Task 1 trên ít nhất ba (3) nền tảng**.
2. Rất ưu tiên dùng bản trial (dùng thử) của **BrowserStack** hoặc **LambdaTest**. Nếu hết hạn dùng thử, có thể thay bằng cloud testing tool (công cụ kiểm thử trên đám mây) khác, chẳng hạn **Sauce Labs** hoặc **CrossBrowserTesting**, hoặc dùng real physical devices (thiết bị vật lý thật), với điều kiện screenshots phải hiển thị rõ **tên browser (trình duyệt) / OS (hệ điều hành) / device (thiết bị)** cùng **localhost URL (địa chỉ URL localhost)** của SUT. Bạn có trách nhiệm tự đăng ký quyền truy cập bản dùng thử.
3. Bao phủ web frontend (giao diện web) trên **Chrome, Firefox và Safari (hoặc Android Chrome)**.
4. Bạn cũng có thể kiểm thử mobile app của SUT qua **Expo Go** trên điện thoại thật. Expo Go được tính là **một nền tảng hợp lệ**, có thể thay thế một trong ba nền tảng trình duyệt bắt buộc (ví dụ thay Safari); đây **không chỉ là phần cộng thêm**, mà được tính vào yêu cầu ba nền tảng.
5. **Mọi screenshot phải có overlay (lớp chữ phủ lên ảnh) hiển thị username (tên người dùng) dưới dạng email sinh viên của bạn.**

## 7. Agent Skill (Kỹ năng dành cho tác nhân AI)

Bạn được khuyến khích xây dựng **Agent Skills (các kỹ năng có thể tái sử dụng cho tác nhân AI)** thực hiện các hoạt động GUI checklist và usability evaluation, nhằm áp dụng lại trên những màn hình và luồng khác trong các nhiệm vụ kiểm thử sau này.

Nộp các skills (kỹ năng) cùng **demonstration videos (video minh họa)** dưới dạng **YouTube links (liên kết YouTube)**, thể hiện từ đầu đến cuối cách bạn dùng skills trên một màn hình hoặc luồng hoàn chỉnh.

## 8. Allowed Tools and Bloom-AI Level (Công cụ được phép và mức Bloom-AI)

Bạn được sử dụng các công cụ sau và **phải khai báo chúng trong AI Audit Report**:

- Bất kỳ **AI tool (công cụ AI)** nào bạn chọn, ví dụ ChatGPT, Claude, Gemini, Copilot, Cursor.
- Bản trial (dùng thử) của **BrowserStack** hoặc **LambdaTest**.

Mức Bloom-AI bắt buộc cho bài này là **G9.3 — Analyse (Phân tích)** và **G9.4 — Collaborate (Hợp tác)**.

## 9. AI Audit Report — Mandatory Appendix (Báo cáo kiểm toán AI — Phụ lục bắt buộc)

Đính kèm **AI Audit Report** dưới dạng appendix (phụ lục). Có thể dùng nội dung từ các **AI Templates (mẫu biểu AI)** đã được cung cấp nếu cần.

- Nếu **không sử dụng AI**, khai báo nguyên văn: **"I do not use any AI help in this exercise."** (Tôi không sử dụng bất kỳ sự hỗ trợ nào từ AI trong bài tập này.)
- Nếu **có sử dụng AI**, khai báo nguyên văn: **"I use AI tools for the following tasks,"** (Tôi sử dụng các công cụ AI cho những nhiệm vụ sau), và ghi lại các thông tin sau **cho mỗi lần tương tác**:
  - **Name of the AI tool (Tên công cụ AI)**.
  - **Date and time (Ngày và giờ)**.
  - **Your prompt (Prompt/câu lệnh bạn đã nhập)**.
  - **The AI output (Kết quả AI trả về)**.

Để đơn giản hóa quy trình này, bạn được khuyến khích tạo một **skill (kỹ năng)** hoặc **rule (quy tắc)** có thể tự động trích xuất các thông tin trên sau mỗi phiên sử dụng AI.

## 10. AI Critique — 200–300 words, Mandatory (Bài phản biện AI — 200–300 từ, bắt buộc)

Viết một đoạn **200–300 từ** để **critique the AI (phản biện/đánh giá hạn chế của AI)**, trả lời các câu hỏi:

- AI đã đưa ra điều gì sai, biased (thiên lệch) hoặc incomplete (chưa đầy đủ)?
- Vì sao AI không phát hiện được vấn đề đó?
- Bạn đã học được nguyên tắc nào về **collaborating with AI (hợp tác với AI)** trong quá trình làm bài?

Có thể dùng nội dung các **AI Templates (mẫu AI)** được cung cấp nếu cần.

## 11. Anti-AI-Cheat Constraints (Ràng buộc chống gian lận bằng AI)

Bài tập này dựa trên **người tham gia thật** và **các lần chạy kiểm thử thực tế trên nhiều nền tảng**. Các nội dung sau **không được tạo bằng AI hoặc ngụy tạo**, và TA (trợ giảng) sẽ xác minh khi chấm:

- Danh sách **7 người tham gia** (tên và Zalo / số điện thoại, trong đó **bốn chữ số giữa được che**). TA có thể gọi ngẫu nhiên hai người.
- **Cross-platform screenshots (ảnh chụp kiểm thử đa nền tảng)** phải cho thấy **student ID (mã số sinh viên)** và **full name (họ tên đầy đủ)** của bạn trong form (biểu mẫu).

> **Lưu ý khi đọc yêu cầu ảnh:** Task 3 còn quy định mỗi screenshot phải có overlay (lớp phủ) username dưới dạng email sinh viên. Hai yêu cầu trên đều xuất hiện trong đề gốc và đều cần được lưu ý khi chuẩn bị minh chứng.

## 12. Git Commit Log (Nhật ký commit Git)

- Tạo **một Git commit (bản ghi thay đổi trong Git) mới cho mỗi bước** của quy trình kiểm thử, ví dụ: thiết kế checklist, thực thi checklist, ghi nhận bug, từng usability session (phiên đánh giá tính dễ sử dụng) và bước phân tích.
- Cung cấp **Git commit log (nhật ký các commit)** dưới định dạng tệp văn bản.

## 13. Oral Defense (Bảo vệ vấn đáp)

**30% sinh viên được chọn ngẫu nhiên** có thể được mời tham gia một buổi **oral defense (bảo vệ vấn đáp)** kéo dài **5–7 phút** trong tuần sau hạn nộp, nhằm giải thích cách họ thực hiện bài tập.

## 14. Submission Regulations (Quy định nộp bài)

**Quy cách tên tệp:**

```text
<StudentID>_HW03_AI_GUIUsability_<SelfAssessedGrade>.zip
```

- **StudentID (Mã số sinh viên):** mã số sinh viên của bạn.
- **SelfAssessedGrade (Điểm tự đánh giá):** số có **3 chữ số** trong khoảng **[000, 100]**.
- **Ví dụ:** `25127001_HW03_AI_GUIUsability_090.zip`.

**Các nội dung bắt buộc trong tệp `.zip`:**

1. **Main report (Báo cáo chính)** ở cả định dạng **Markdown + PDF**, gồm GUI checklist report (báo cáo danh sách kiểm tra giao diện) và usability evaluation report (báo cáo đánh giá tính dễ sử dụng).
2. **Bug report (Báo cáo lỗi)**, với screenshots (ảnh chụp lỗi) trên trang **GitHub Issues**.
3. **AI Critique (Bài phản biện AI)** và **AI Audit Report (Báo cáo kiểm toán AI)** ở cả định dạng **Markdown + PDF**.
4. **Git commit log (Nhật ký commit Git)** dưới dạng tệp văn bản.
5. **Excel checklist (Danh sách kiểm tra dạng Excel)** với **hơn 40 mục** và **test summary (bản tổng hợp kết quả kiểm thử)**.
6. **Usability-session evidence (Minh chứng của các phiên đánh giá tính dễ sử dụng)**, gồm task scenario (kịch bản nhiệm vụ), observation notes (ghi chú quan sát), SUS / UEQ-S responses (câu trả lời thang đo), severity-ranked findings (các phát hiện được xếp hạng theo độ nghiêm trọng), screen recordings (video quay màn hình, nếu có), kèm **bảng danh sách 7 người tham gia**.
7. **Cross-browser / cross-platform screenshots (Ảnh chụp kiểm thử đa trình duyệt/đa nền tảng)**.
8. **`README.md`**, chứa **self-assessment table (bảng tự đánh giá)** ở mục 15 và **test summary report (báo cáo tổng kết kiểm thử)** với: số lượng screens / flows (màn hình / luồng) đã kiểm thử; số checklist items (mục kiểm tra) đã thiết kế, thực thi, đạt và không đạt; số bugs (lỗi); số người tham gia; và demo videos (video minh họa).
9. Các tài liệu hỗ trợ khác (nếu có).

**Nộp bài trên Moodle.** Hạn nộp được ghi tại liên kết nộp bài.

## 15. Assessment Template (Mẫu bảng đánh giá)

| STT | Tiêu chí | Điểm tối đa | Self-Assessed Grade (Điểm tự đánh giá) |
|---:|---|---:|---|
| 1 | **Task 1 — GUI Checklist** (thiết kế + thực thi + bug report/báo cáo lỗi) | 30 | |
| 2 | **Task 2 — Usability Evaluation** (task scenario/kịch bản + 7 sessions/phiên + phân tích) | 40 | |
| 3 | **Task 3 — Cross-Browser / Cross-Platform** (kiểm thử trên ≥ 3 nền tảng) | 20 | |
| 4 | **Agent Skills** (kỹ năng cho tác nhân AI) | 10 | |
| | **Total (Tổng cộng)** | **100** | |

## 16. References (Tài liệu tham khảo)

Giữ nguyên tên tài liệu và nguồn để tiện tra cứu:

- **ISTQB Foundation Level Syllabus** (Đề cương chứng chỉ ISTQB cấp độ nền tảng), phiên bản mới nhất.
- **Hardman, P. (2025). _A Post-AI Learning Taxonomy_** (Một hệ phân loại học tập hậu AI).
- **Fuster Rabella, M. (2025). _OECD Education Working Paper No. 338_** (Tài liệu nghiên cứu giáo dục OECD số 338).
- **Anthropic (2025). _Building Reliable AI Test Agents_** (Xây dựng các tác nhân AI kiểm thử đáng tin cậy) — engineering blog (blog kỹ thuật).
- **DeepEval & Promptfoo documentation** (Tài liệu của DeepEval và Promptfoo) — LLM testing frameworks (các bộ công cụ kiểm thử mô hình ngôn ngữ lớn).

## 17. Other Regulations (Quy định khác)

- **Không được nộp bài trễ.**
- **Thiếu bất kỳ tài liệu bắt buộc nào sẽ bị 0 điểm.**
- **Sao chép giữa các sinh viên — bao gồm cả prompts (các câu lệnh gửi cho AI) — khiến cả hai bên đều bị 0 điểm.**
