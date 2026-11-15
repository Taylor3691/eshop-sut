# Main Report — HW03 GUI & Usability

## 1. Giới thiệu & phạm vi
## 2. Task 1 — GUI Checklist

**Phạm vi:** 5 màn hình của EShop Web Admin (http://localhost:5174). Màn hình chính là Quản lý Sản phẩm (danh sách, thêm, sửa, xóa, Import CSV); các màn hình phụ là Admin Login, Dashboard, Quản lý Danh mục và Quản lý Mã giảm giá.

Tài liệu nằm trong `task1-checklist/`:
- `ui-inventory.md`: bảng thành phần giao diện và 15 giải đáp đặc tả
- `checklist-draft.md`: bản nháp AI sinh, 109 mục
- `checklist-filtered.md`: bản đã lọc, 58 mục, cộng 12 mục tự thêm
- `checklist.xlsx`: sheet Checklist, Test Summary và Cross-Platform
- `execution-observations.md`: quan sát khi chạy
- `screenshots/failed/`: ảnh của các mục Failed

### 2.1 Thiết kế (AI + review)

Checklist được làm qua 4 bước. Prompt và kết quả của từng bước ghi trong AI Audit Report, mục #02–#10.

1. **Liệt kê thành phần giao diện** (`ui-inventory.md`).
   - AI được cung cấp đặc tả (FR-12 → FR-17, FR-21 → FR-24), định nghĩa IA-01 → IA-04 trong đề và mã nguồn `frontend-admin/src/App.jsx`. AI liệt kê form, trường nhập, nút, bảng, menu và thông báo của từng màn hình, ghi kèm mã FR và nhóm IA.
   - AI cũng ghi riêng **15 điểm đặc tả không nói rõ**, ví dụ: `<h1>` trong ứng dụng một trang, thuật ngữ nào được giữ tiếng Anh, màu nút, dạng thông báo lỗi, xóa có cần hỏi lại không, định dạng tiền.
   - Người kiểm thử tự quyết định cho từng điểm, thành **15 giải đáp** ("GĐ 1"–"GĐ 15"). Các giải đáp này được dùng làm căn cứ chấm Pass/Fail khi đặc tả không quy định. Phần nào không có trong đặc tả thì dựa vào best practice (Nielsen, WCAG).
2. **AI sinh bản nháp** theo từng nhóm IA. Mỗi mục được viết dưới dạng tiêu chí cần đạt (không viết thành lỗi), có cách kiểm, điều kiện Pass và căn cứ (FR, GĐ hoặc BP). Kết quả là **109 mục** (`checklist-draft.md`): IA-01 có 26, IA-02 có 41, IA-03 có 15, IA-04 có 27.
3. **Review và lọc** còn **58 mục** (`checklist-filtered.md`, cột "ID cũ" truy vết về bản nháp). Lý do loại:
   - mục kiểm thử chức năng chứ không phải giao diện (khóa 30 giây, trùng tên, phép tính Dashboard);
   - mục trùng nên gộp vào mục khác;
   - mục giá trị thấp hoặc quá chi tiết;
   - mục không áp dụng (breadcrumb không bắt buộc ở admin, không có form nhiều bước nên không có Step Indicator).
4. **Bổ sung 12 mục AI bỏ sót** (mục 2.2), tổng cộng **70 mục**. Toàn bộ được chuyển vào sheet Checklist trong `checklist.xlsx`, với các cột ID, IA, Màn hình, Mục kiểm tra, Tiêu chí Pass, Tham chiếu, Nguồn (AI/Human), Lý do AI bỏ sót, Kết quả, Notes, Screenshot, Bug ID.

| Nhóm | Nháp AI | Sau lọc (AI) | Tự thêm | Tổng |
|---|---|---|---|---|
| IA-01 General UI standards | 26 | 14 | 7 | 21 |
| IA-02 Forms | 41 | 22 | 3 | 25 |
| IA-03 Navigation | 15 | 7 | 1 | 8 |
| IA-04 Feedback / State | 27 | 15 | 1 | 16 |
| **Tổng** | **109** | **58** | **12** | **70** |

### 2.2 Mục AI bỏ sót & lý do

| ID | IA | Mục kiểm tra | Lý do AI bỏ sót | Kết quả |
|---|---|---|---|---|
| GUI-01-15 | IA-01 | Bố cục không vỡ ở màn hình hẹp (1024px, 768px) | AI chỉ đọc code, không hiển thị giao diện ở nhiều kích thước; prompt không nêu kích thước cần hỗ trợ | Failed |
| GUI-01-16 | IA-01 | Phóng to 200% vẫn dùng được | Như trên: chỉ thấy khi hiển thị thật, không suy ra được từ class Tailwind | Failed |
| GUI-01-17 | IA-01 | Đọc được khi bật dark mode | Đặc tả không nhắc dark mode; code không có class `dark:` nên AI không có gì để phân tích | Passed |
| GUI-01-18 | IA-01 | Bố cục chịu được chiều chữ phải sang trái (RTL) | Giao diện chỉ có tiếng Việt nên AI coi RTL nằm ngoài phạm vi | Passed |
| GUI-01-19 | IA-01 | Độ tương phản chữ/nền ≥ 4.5:1 | AI xét màu theo ý nghĩa (đỏ = nguy hiểm) như FR-21, không tính tỉ lệ tương phản vì cần màu sau khi hiển thị | Failed |
| GUI-01-20 | IA-01 | Dữ liệu dài không làm vỡ bảng | AI kiểm giới hạn 255 ký tự ở form, không xét dữ liệu đó hiện ra trong bảng thế nào | Failed |
| GUI-01-21 | IA-01 | Tiêu đề tab trình duyệt mô tả màn đang mở | `<title>` và favicon nằm trong `index.html`, prompt chỉ đưa `App.jsx` | Failed |
| GUI-02-23 | IA-02 | Dữ liệu người dùng nhập được hiển thị an toàn, không render HTML | Yêu cầu nằm ở mục Bảo mật (SEC-04), không nằm trong phần đặc tả đưa cho AI | Passed |
| GUI-02-24 | IA-02 | Cuộn chuột trên ô số không làm đổi giá trị | Đây là hành vi mặc định của trình duyệt với `type="number"`, chỉ lộ ra khi thao tác thật | Failed |
| GUI-02-25 | IA-02 | Ô nhập hỗ trợ nhập nhanh (con trỏ tự vào ô, có `autocomplete`) | AI bám sát FR-22; các thuộc tính hỗ trợ nhập liệu không có trong đặc tả | Failed |
| GUI-03-08 | IA-03 | Điều hướng vẫn dùng được trên màn hình hẹp | Như GUI-01-15: AI không hiển thị ở nhiều kích thước | Passed |
| GUI-04-16 | IA-04 | Trình đọc màn hình đọc được thông báo lỗi | AI không mô phỏng công nghệ hỗ trợ; prompt không yêu cầu kiểm accessibility | Passed |

**Các lý do AI bỏ sót gom lại thành 3 nhóm:**
- **Giới hạn của đầu vào (prompt):** prompt chỉ đưa `App.jsx` và một phần đặc tả, nên AI không thấy `index.html` và mục Bảo mật SEC-04.
- **Giới hạn của AI:** AI chỉ phân tích mã nguồn tĩnh, không hiển thị giao diện, không thao tác thật và không dùng công nghệ hỗ trợ. Vì vậy AI bỏ qua responsive, zoom, độ tương phản, cuộn chuột trên ô số và trình đọc màn hình.
- **Đặc điểm của giao diện:** chỉ có tiếng Việt, không có dark mode và đặc tả không nhắc tới. AI coi RTL và dark mode là ngoài phạm vi, trong khi đây chính là hai khía cạnh đề bài nêu là AI hay bỏ sót.

**7/12 mục tự thêm bị Failed**, sinh ra 6 bug (BUG-27, 28, 29, 31, 32, 33). Như vậy phần review của người kiểm thử phát hiện thêm lỗi thật, không chỉ làm checklist dài hơn.

### 2.3 Kết quả thực thi

**Cách chạy:**
- Dữ liệu được reset bằng `scripts/start-sut.sh` + `scripts/seed-hw03.sh 3`.
- 70 mục được chạy bằng script Playwright (`scripts/hw03-run-checklist.mjs`, Chrome 157 headless, 1366×768, vi-VN) theo 4 pha: mục chỉ cần xem → form → môi trường đặc biệt (mạng chậm, cửa sổ hẹp, zoom) → bảng rỗng và dừng backend. Riêng GUI-04-16 được kiểm tay bằng VoiceOver.
- Script chụp 115 ảnh bằng chứng và chỉ ghi lại **quan sát**, không kết luận Pass/Fail (`execution-observations.md`).
- **Người kiểm thử xem từng ảnh và quyết định Passed/Failed.** Kết quả được điền vào cột Kết quả và Notes của `checklist.xlsx`. Ảnh của các mục Failed được chép sang `screenshots/failed/` (77 ảnh cho 44 mục) và ghi tên ở cột Screenshot. Mục Passed không kèm ảnh.

| Nhóm | Designed | Executed | Passed | Failed | Pass rate |
|---|---|---|---|---|---|
| IA-01 General UI standards | 21 | 21 | 8 | 13 | 38.1% |
| IA-02 Forms | 25 | 25 | 6 | 19 | 24.0% |
| IA-03 Navigation | 8 | 8 | 7 | 1 | 87.5% |
| IA-04 Feedback / State | 16 | 16 | 5 | 11 | 31.3% |
| **Tổng** | **70** | **70** | **26** | **44** | **37.1%** |

**Nhận xét:**
- **Forms (IA-02) yếu nhất:**
  - Không trường nào có nhãn hay dấu `*`, chỉ có placeholder.
  - Ô có giá trị sẵn (0, 1) làm mất placeholder.
  - Form sản phẩm và form mã giảm giá gần như không kiểm tra dữ liệu (giá ≤ 0 hoặc số lẻ, phần trăm > 100, ngày đã qua).
  - Import CSV nhận file sai định dạng, sai header hoặc file rỗng mà không báo lỗi.
- **Feedback / State (IA-04):**
  - Xóa ngay, không hỏi lại.
  - Bấm đôi nút submit tạo bản ghi trùng.
  - Không có trạng thái đang tải và không có thông báo khi bảng rỗng.
  - Lỗi hiển thị dạng chuỗi kỹ thuật ("SQLITE_CONSTRAINT…", "Network Error").
  - Sửa một sản phẩm thì mọi dòng trong bảng đổi theo tên mới.
- **General UI (IA-01):**
  - Không có `<h1>` riêng cho từng màn.
  - Còn chữ tiếng Anh (Login, Password).
  - Định dạng tiền không thống nhất, doanh thu trên Dashboard gấp đôi giá trị thực.
  - Không dùng được sidebar bằng bàn phím.
  - Responsive, zoom 200% và độ tương phản đều không đạt.
- **Navigation (IA-03) tốt nhất:** sidebar highlight đúng mục, điều hướng sau đăng nhập/đăng xuất đúng, và chặn truy cập khi chưa đăng nhập. Mục Failed duy nhất là các tab không có URL riêng, nên F5 quay về Dashboard và Back thoát khỏi ứng dụng.

### 2.4 Bug

44 mục Failed được gom thành **33 bug theo nguyên nhân** (mỗi bug một nguyên nhân): **15 Major, 14 Minor, 4 Trivial**.
- **Gộp và tách theo nguyên nhân:** nhiều mục có chung nguyên nhân thì gộp thành một bug. Ví dụ, BUG-17 (thiếu nhãn và dấu `*`) gồm GUI-02-01 và GUI-02-02. Ngược lại, một mục có hai nguyên nhân thì tách thành hai bug. Ví dụ, GUI-01-10 tách thành BUG-01 (doanh thu gấp đôi) và BUG-19 (định dạng tiền).
- **File bug:** mỗi bug là một file `bugs/BUG-xx.md` theo `BUG-TEMPLATE.md`, gồm: nguồn (ID checklist), màn hình, môi trường, severity/priority kèm lý do, tham chiếu FR/GĐ/BP, bước tái hiện, kết quả mong đợi trích đặc tả, kết quả thực tế và ảnh.
- **GitHub Issues:** 25 issue mới (#126–#150, nhãn `hw03`, `module: admin`, kèm ảnh). Có 8 bug trùng với issue đã có trong repo (#23, #29, #57, #59, #60, #61/#63, #71, #84/#89): những bug này ghi số issue cũ, không tạo issue mới. Quan sát mới của BUG-07, BUG-09, BUG-12 được bổ sung bằng comment.
- **Truy vết:** cột Bug ID trong `checklist.xlsx` liên kết mỗi mục Failed với bug và issue tương ứng.

**Các bug Major:**

| ID | Tiêu đề | Nguồn | Issue |
|---|---|---|---|
| BUG-01 | [Dashboard] Tổng doanh thu gấp đôi tổng tiền các đơn đã giao | GUI-01-10 | #71 (trùng) |
| BUG-02 | [Sản phẩm] Import CSV thêm cả dòng không hợp lệ, không rollback, báo cáo không có lỗi theo dòng | GUI-04-13 | #61, #63 (trùng) |
| BUG-03 | [Sản phẩm] Sau khi sửa một sản phẩm, mọi dòng trong bảng hiển thị cùng tên mới | GUI-04-04 | #126 |
| BUG-04 | [Danh mục, Sản phẩm, Mã giảm giá] Bấm "Xóa" xóa ngay, không có hộp thoại xác nhận | GUI-04-06 | #127 |
| BUG-05 | [Danh mục] Xóa được danh mục đang có sản phẩm, không chặn và không cảnh báo | GUI-04-07 | #128 |
| BUG-06 | [Danh mục, Login] Nút submit không bị khóa khi đang gửi, bấm đôi tạo bản ghi trùng | GUI-04-02 | #129 |
| BUG-07 | [Sản phẩm] Form lưu được giá trống, 0, âm, số lẻ và tên dài hơn 255 ký tự | GUI-02-11, 02-12, 02-13, 02-03 | #29 (trùng) |
| BUG-08 | [Danh mục] Thêm được danh mục có tên trống hoặc chỉ có khoảng trắng | GUI-02-10, 02-03 | #23 (trùng) |
| BUG-09 | [Mã giảm giá] Form tạo mã không kiểm tra dữ liệu | GUI-02-19 → 02-22, 02-03 | #89, #84 (trùng) |
| BUG-10 | [Sản phẩm] Import CSV tách sai trường có dấu phẩy trong nháy kép | GUI-04-12 | #57 (trùng) |
| BUG-11 | [Sản phẩm] Import CSV chấp nhận file sai header | GUI-02-18 | #60 (trùng) |
| BUG-13 | [Nhiều màn hình] Thông báo lỗi hiển thị chuỗi kỹ thuật, tiếng Anh, viết tắt | GUI-01-04, 02-03, 04-09 | #130 |
| BUG-14 | [Nhiều màn hình] Lỗi tải dữ liệu và hết phiên bị bỏ qua, không có thông báo | GUI-04-09, 04-11 | #131 |
| BUG-16 | [Sidebar] Không dùng bàn phím để chuyển tab hoặc đăng xuất được | GUI-01-13 | #133 |
| BUG-17 | [Nhiều màn hình] Trường nhập không có nhãn và không có dấu * | GUI-02-01, 02-02 | #134 |

Danh sách đầy đủ 33 bug (cùng 14 Minor và 4 Trivial) nằm trong `bugs/README.md`. Bảng này cũng có BUG-34, BUG-35 từ Task 2 (mục 3.9).
## 3. Task 2 — Usability Evaluation

Đánh giá có người điều phối (moderated), mẫu nhỏ: 7 người tham gia (P1–P7), mỗi người một phiên, nói to suy nghĩ trong lúc làm (think-aloud), cộng thêm 1 phiên pilot. Tất cả các phiên diễn ra ngày 15/11/2026 trên EShop Web Admin (http://localhost:5174). Tài liệu chi tiết nằm trong `task2-usability/`: `plan.md` (kế hoạch, công cụ đo), `participants.md`, `pilot/notes.md`, `sessions/P1–P7/notes.md`, `sus-and-metrics.xlsx`, `analysis.md`.

### 3.1 Mục tiêu và flow

**Câu hỏi chính:** một chủ shop lần đầu dùng EShop Admin có tự đưa được mặt hàng mới lên bán, tạo khuyến mãi và xử lý đơn mà không cần ai hướng dẫn không, và họ tự tin đến đâu? Câu hỏi này được tách thành 6 mục tiêu O1–O6 (`plan.md` mục 1): tỉ lệ hoàn thành, điểm nghẽn điều hướng, độ rõ của form, khả năng nhận ra và sửa lỗi, niềm tin rằng thao tác đã thành công, và điểm SUS so với mốc 68.

**Flow:** B1 Đăng nhập → B2 Tạo danh mục → B3 Thêm sản phẩm → B4 Tạo mã giảm giá → B5 Cập nhật trạng thái đơn đang chờ → B6 Đăng xuất. Mỗi bước có tiêu chí hoàn thành kiểm được trên giao diện, thời gian mục tiêu và thời gian tối đa (`plan.md` mục 2). Ví dụ: ở B3, sản phẩm phải thuộc danh mục "Đồ mùa đông", không phải danh mục chọn sẵn; ở B6, chỉ đóng tab thì tính là không đạt.

### 3.2 Task scenario

Người tham gia nhận một **mục tiêu**, không nhận các bước cần bấm:

> Anh/chị là chủ một cửa hàng thời trang nhỏ đang bán online trên trang EShop. Trời bắt đầu lạnh, anh/chị muốn mở bán một nhóm hàng mùa đông mới, tung một chương trình khuyến mãi để kéo khách, đồng thời xử lý một đơn khách vừa đặt đang chờ anh/chị duyệt. […] Khi xong việc, rời khỏi trang quản trị sao cho người khác dùng chung máy không vào được tài khoản của anh/chị.

Dữ liệu cần nhập in trên một **thẻ thông tin**: tài khoản; nhóm hàng "Đồ mùa đông"; "Áo khoác lông vũ" giá 890.000 ₫; mã WINTER15 giảm 15% cho đơn từ 500.000 ₫, hạn 31/12/2026, mỗi khách 2 lần; đơn giao tới 45 Lê Lợi, Q.1, TP.HCM. Nguyên tắc viết scenario (`plan.md` mục 4.3):
- Không dùng đúng nhãn trên giao diện như "Thêm mới", "Tạo mã", "Xác nhận", "Đăng xuất"; thay bằng cách nói của người bán hàng.
- Đơn cần duyệt được nhận diện bằng địa chỉ chứ không bằng mã đơn.
- Giá viết theo thói quen của người Việt (có dấu chấm) để quan sát cách người tham gia nhập vào ô số.

### 3.3 Công cụ đo

- **SUS** (bản tiếng Việt, 10 câu, thang 1–5), làm ngay sau scenario. Lý do chọn SUS thay cho UEQ-S (`plan.md` mục 5.1):
  - SUS là thang chuẩn, đã được kiểm chứng và ổn định khi mẫu nhỏ.
  - Có mốc so sánh là 68.
  - Các câu hỏi đo đúng những gì quan trọng với một công cụ làm việc: dễ dùng, dễ học, tự tin khi dùng. Trong khi đó, một nửa số câu của UEQ-S đo cảm xúc và sự hấp dẫn, ít giá trị với trang quản trị.
  - Chỉ 10 câu, làm khoảng 2 phút.
- **Chỉ số theo bước:** hoàn thành (Y / A = có trợ giúp / N), thời gian (giây), số lỗi, số lần trợ giúp (`plan.md` mục 5.3).
- **15 câu probe** chia theo 4 chủ đề: clarity (C1–C4), error recovery (E1–E3), speed (S1–S3), trust (T1–T4), cộng câu tổng kết W1. Mỗi phiên hỏi ít nhất 1 câu cho mỗi chủ đề (`plan.md` mục 6).
- **Bảng quan sát:** thời điểm, bước, hành vi, lời nói nguyên văn, loại (H = hesitation, E = error, F = friction) và mức độ 1–3.

### 3.4 Người tham gia

| Mã | Nghề nghiệp | Tuổi | Kinh nghiệm trang quản lý bán hàng | Hình thức |
|---|---|---|---|---|
| P1 | SV năm 4 Kinh doanh quốc tế | 21 | Đã dùng (Sapo) | Online (Google Meet) |
| P2 | SV năm 3 Kế toán - Kiểm toán | 20 | Chưa dùng | Offline |
| P3 | SV năm 4 Ngôn ngữ Anh | 21 | Chưa dùng | Online (Google Meet) |
| P4 | SV năm 4 Hệ thống thông tin | 21 | Đã dùng (đồ án quản lý bán hàng) | Offline |
| P5 | SV năm 4 Marketing | 21 | Đã dùng (fanpage) | Online (Google Meet) |
| P6 | SV năm 3 Quản trị kinh doanh | 20 | Đã dùng | Offline |
| P7 | SV năm 4 Tài chính - Ngân hàng | 21 | Chưa dùng | Online (Google Meet) |

- Tất cả là người ngoài lớp HW03. Họ tên và số điện thoại (đã che 4 số giữa) ghi trong `participants.md` để TA gọi xác minh; báo cáo chỉ dùng mã P1–P7.
- Có 4 người đã từng dùng và 3 người chưa từng dùng trang quản lý bán hàng, đúng yêu cầu pha trộn ở `plan.md` mục 3.
- 6/7 người không học IT. P4 học Hệ thống thông tin, nên các câu trả lời của P4 dùng thuật ngữ kỹ thuật (placeholder, select, submit).
- Phiên pilot do một người khác thực hiện (không nằm trong P1–P7).

### 3.5 Cách tiến hành

1. **Chuẩn bị:** trước mỗi phiên, reset dữ liệu bằng `scripts/start-sut.sh` + `scripts/seed-hw03.sh 3` (3 đơn "Chờ xác nhận"). Mở Chrome cửa sổ 1366×768 ở màn đăng nhập.
2. **Pilot** (13:00): flow chạy trọn trên dữ liệu reset, cả 6 bước đều trong thời gian tối đa. Sau pilot có hai chỉnh sửa (`plan.md` mục 9.2): thêm cách bấm giờ trực tiếp khi không quay video, và quy định mã F chỉ dùng cho friction. Lời dẫn và thẻ được giữ nguyên, vì việc mở nhầm Sản phẩm hay gõ "890.000" chính là hành vi cần quan sát.
3. **Trong phiên:** giới thiệu rằng đang kiểm thử sản phẩm chứ không kiểm tra người dùng, cho tập nói to 1 phút, rồi đọc lời dẫn và đưa thẻ. Người điều phối quan sát trung lập: không gọi tên nút hay mục menu, không nói "đúng rồi" hay "sai rồi". Chỉ can thiệp theo 3 mức gợi ý khi người tham gia thật sự bế tắc (`plan.md` mục 7.4). Phiên online thì người tham gia điều khiển máy từ xa, người điều phối không bấm hộ.
4. **Ghi nhận:** các phiên **không quay màn hình**. Người điều phối bấm giờ từng bước và ghi phiếu trong phiên (mốc thời gian, hành vi, lời nói nguyên văn), sau đó chép vào `sessions/Px/notes.md`. Lý do không quay màn hình: **người tham gia không muốn chia sẻ bản ghi màn hình**, nên dữ liệu chỉ được ghi bằng phiếu ghi chép.
5. **Kết thúc phiên:** làm SUS trước, sau đó hỏi probe, bắt đầu từ những chỗ đã quan sát thấy khó khăn trong phiên.
6. **Sau phiên:** nhập SUS và chỉ số vào `sus-and-metrics.xlsx`. Mỗi phiên có một commit riêng (`test(hw03): usability session Px`).

### 3.6 Kết quả SUS

| | P1 | P2 | P3 | P4 | P5 | P6 | P7 |
|---|---|---|---|---|---|---|---|
| SUS | 62.5 | 57.5 | 37.5 | 80.0 | 52.5 | 60.0 | 42.5 |

- **Trung bình 56.07** (SD 13.98, trung vị 57.5, min 37.5, max 80.0, khoảng tin cậy 95% là 43.1–69.0). Điểm này thấp hơn mốc 68 và thuộc vùng **Marginal** theo thang mức chấp nhận của Bangor et al. (2009). Chỉ P4 đạt vùng Acceptable (> 70); P3 và P7 dưới 50.
- **Theo từng câu:** điểm thấp nhất là Q6 (thiếu nhất quán) và Q2 (phức tạp không cần thiết); điểm cao nhất là Q4 (không cần người kỹ thuật hỗ trợ) và Q10 (không phải học nhiều). Nghĩa là người dùng tự đi hết flow được, nhưng thấy các form rối và thiếu nhất quán.
- **Theo kinh nghiệm:** nhóm đã từng dùng trang quản lý bán hàng có trung bình 63.75, nhóm chưa dùng 45.83. Mỗi nhóm chỉ có 3–4 người nên đây chỉ là xu hướng.

### 3.7 Chỉ số theo bước

| Bước | Y / A / N | Thời gian TB (giây) | Mục tiêu / tối đa (giây) | Vượt mục tiêu | Lỗi (số người) | Trợ giúp |
|---|---|---|---|---|---|---|
| B1 Đăng nhập | 7 / 0 / 0 | 59.3 | 60 / 180 | 3/7 | 1 (1) | 0 |
| B2 Danh mục | 7 / 0 / 0 | 123.9 | 60 / 180 | 6/7 | 4 (4) | 0 |
| B3 Sản phẩm | 6 / 0 / 1 | 212.6 | 120 / 420 | 7/7 | 6 (5) | 0 |
| B4 Mã giảm giá | 6 / 0 / 1 | 259.3 | 180 / 480 | 7/7 | 2 (2) | 0 |
| B5 Đơn hàng | 7 / 0 / 0 | 114.0 | 120 / 240 | 3/7 | 0 (0) | 0 |
| B6 Đăng xuất | 6 / 1 / 0 | 50.3 | 30 / 120 | 7/7 | 0 (0) | 1 |

- **6/7 người hoàn thành cả flow mà không cần trợ giúp.** Thời gian trung bình 13:39 cho cả flow; chỉ P4 đạt mục tiêu ≤ 10 phút.
- **P3 là người duy nhất không đạt bước nào đó:** P3 lưu sản phẩm vào danh mục "Điện thoại" (B3 = N), lưu mã với đơn tối thiểu 0 và số lần 1 (B4 = N), và cần một gợi ý mức 2 mới tìm thấy nút Đăng xuất (B6 = A).
- **B3 và B4 là hai bước tắc nhất:** cả 7 người đều vượt thời gian mục tiêu ở hai bước này. Trong 80 dòng quan sát có 4 dòng mức 3, và cả 4 đều thuộc form sản phẩm hoặc form mã giảm giá.
- **Ghi chú dữ liệu:** B2 của P7 mất 200 giây, vượt thời gian tối đa 180 giây nhưng phiếu ghi Y. Người điều phối đã xem lại và giữ Y, vì P7 vẫn tự hoàn thành bước này đúng tiêu chí mà không cần trợ giúp (`analysis.md` mục 2).

### 3.8 Các vấn đề và mức độ nghiêm trọng

Các quan sát được gom thành 10 nhóm (I1–I10, `analysis.md` mục 3) và xếp hạng theo thang Nielsen 0–4, dựa trên tần suất, tác động và tính lặp lại:

| Nhóm | Vấn đề | Tần suất | Severity | Bug |
|---|---|---|---|---|
| I1 | Hai ô mã giảm giá có sẵn số 0 và 1, không có nhãn; P3 lưu sai điều kiện mã | 7/7 | **4** | BUG-17 |
| I2 | Ô danh mục chọn sẵn "Điện thoại", không có nhãn; P3 lưu sai nhóm | 7/7 | **3** | BUG-23, BUG-17 |
| I3 | Bảng sản phẩm không có cột danh mục, không kiểm lại được nhóm | 7/7 | **3** | **BUG-34** (mới) |
| I4 | Ô giá nhận "890.000" thành số thập phân mà không cảnh báo | 5/7 | **3** | BUG-07 |
| I7 | Nghĩ đóng tab là đã đăng xuất; P3 cần trợ giúp | 2/7 | **3** | Không ghi bug (đề xuất) |
| I5 | "Danh mục" khác với cách gọi "nhóm hàng", mở nhầm Sản phẩm | 4/7 | 2 | Không ghi bug |
| I6 | Nút Hủy nằm sát ngay dưới nút Xác nhận | 7/7 | 2 | **BUG-35** (mới) |
| I9 | Chữ tiếng Anh trên giao diện (Login, Password, Choose File) | 4/7 | 2 | BUG-21 |
| I8 | Ô ngày không nhận kiểu gõ 31/12/2026 | 1/7 | 2 | Không tái hiện được |
| I10 | Không có ô tìm hoặc lọc đơn | 6/7 nhắc tới | 1 | Không ghi bug (yêu cầu tính năng) |

- **Vấn đề chặn việc hoàn thành task (blocker):** chỉ có I1 và I2. Hai nhóm này gây ra hai bước N duy nhất trong toàn bộ 42 lượt bước. I3 khiến lỗi của I2 không bị phát hiện sau khi lưu.
- **Bug riêng lẻ và vấn đề thiết kế:** I1, I2, I3, I4, I6, I8, I9 là bug riêng lẻ, sửa được tại chỗ. Năm vấn đề thiết kế lặp lại ở nhiều màn hình (`analysis.md` mục 4.2):
  - D1: form dựa vào placeholder và không báo khi nhập sai;
  - D2: sau khi lưu, giao diện không hiện lại đủ dữ liệu vừa lưu;
  - D3: từ ngữ chưa khớp với cách nghĩ của chủ shop;
  - D4: thao tác không quay lại được đặt sát thao tác chính;
  - D5: kết thúc phiên đăng nhập không rõ ràng.
- **Điểm làm tốt:** đăng nhập sai có thông báo; bảng mã giảm giá hiện đủ các giá trị đã lưu; trạng thái đơn đổi ngay trên đúng dòng (7/7 người chắc đã duyệt đúng đơn ở câu T2).
- **Đề xuất cải tiến** (`analysis.md` mục 6), ưu tiên cao nhất:
  1. Thêm nhãn luôn hiện cho mọi ô và bỏ giá trị 0 / 1 có sẵn — cả 7 người cùng đề xuất ở câu W1.
  2. Để ô danh mục trống và bắt buộc phải chọn.
  3. Thêm cột danh mục vào bảng sản phẩm.
  4. Cảnh báo khi nhập giá có số thập phân.

### 3.9 Bug

| ID | Tiêu đề | Severity | Issue |
|---|---|---|---|
| BUG-34 | [Quản lý Sản phẩm] Bảng sản phẩm không có cột danh mục, không kiểm lại được sản phẩm thuộc nhóm nào | Major | [#188](https://github.com/Taylor3691/eshop-sut/issues/188) |
| BUG-35 | [Quản lý Đơn hàng] Nút "Hủy" màu xám, nằm sát ngay dưới "Xác nhận" và hủy đơn ngay không hỏi lại | Major | [#189](https://github.com/Taylor3691/eshop-sut/issues/189) |

- **Cách xác nhận:** cả hai bug được tái hiện lại trên SUT bằng Playwright (Chrome 157, 1366×768). Ảnh nằm trong `task2-usability/screenshots/` và được đính vào issue.
- **Bug đã có từ Task 1:** I1, I2, I4, I9 cùng nguyên nhân với BUG-17, BUG-23, BUG-07, BUG-21. Không tạo bug trùng; bằng chứng từ phiên usability được bổ sung vào file bug và comment vào issue #134, #140, #29, #138.
- **Không ghi bug:**
  - I7: spec không yêu cầu phiên phải kết thúc khi đóng tab; nút "Đăng xuất" đúng FR-23.
  - I8: gõ thử 4 kiểu ngày trên Chrome 157 đều được nhận đúng.
  - I5, I10: là đề xuất về từ ngữ và tính năng, không trái spec.
## 4. Task 3 — Cross-Browser

### 4.1 Nền tảng

| Mã | Trình duyệt | Hệ điều hành | Ảnh |
|---|---|---|---|
| CH | Google Chrome 157.0.8103.51 (arm64) | macOS 27.2 | `task3-crossplatform/chrome/` (25 ảnh) |
| FF | Firefox 153.0.4 (aarch64), giao diện tiếng Việt | macOS 27.2 | `task3-crossplatform/firefox/` (26 ảnh) |
| SF | Safari 27.2 | macOS 27.2 | `task3-crossplatform/safari/` (26 ảnh) |

Phiên bản từng trình duyệt có ảnh màn About (`ABOUT_CH`, `ABOUT_FF`, `ABOUT_SF`). Mọi ảnh chụp toàn màn hình, thấy cùng lúc tên trình duyệt, thanh địa chỉ `localhost:5174` và ghi chú Stickies có email, MSSV, họ tên sinh viên.

### 4.2 Lý do dùng trình duyệt thật thay cho BrowserStack

BrowserStack Live Free Trial chỉ cho mỗi thiết bị dùng tối đa **1 phút** ("Each device is available for up to 1 minute during Free Trial"); hết thời gian, phiên bị đóng ("Your session was closed as the available free trial minutes on this device are over"). Một phút không đủ chạy dù chỉ một màn hình của checklist. Ảnh bằng chứng: `task3-crossplatform/browserstack/BS_trial-limit.png`, `BS_session-closed.png`.

Đề cho phép thay thế: "…or use real physical devices, provided your screenshots clearly show the browser / OS / device name alongside the SUT's localhost URL". Vì vậy checklist được chạy trên Chrome, Firefox và Safari cài trên máy macOS thật.

### 4.3 Cách làm

1. **Chọn mục chạy lại** (`task3-crossplatform/run-plan.md`): 22 mục của Task 1 có thể khác nhau giữa trình duyệt (nhóm A) — font tiếng Việt, định dạng số tiền, thứ tự Tab và viền focus, bong bóng kiểm tra `required` / `min`, ô `date` và ô `number`, hộp chọn file, hộp thoại `alert()`, bố cục ở cửa sổ hẹp, zoom 200%, dark mode, tiêu đề tab.
2. **Dữ liệu giống nhau**: trước mỗi trình duyệt chạy `scripts/start-sut.sh` rồi `scripts/seed-hw03.sh 3` (DB mẫu + 3 đơn chờ).
3. **Thiết lập riêng cho Safari**: bật *Settings → Advanced → Press Tab to highlight each item on a webpage* (mặc định Safari không cho Tab dừng ở nút/link) và *Show full website address* (để thanh địa chỉ hiện đủ cổng `:5174`).
4. **Thực thi và chụp ảnh**: đi theo cùng một kịch bản 26 bước trên cả 3 trình duyệt; tên ảnh `<ID>_<CH|FF|SF>.png`. Thao tác trên trình duyệt được thực hiện với trợ giúp của AI điều khiển máy tính (Codex qua Orca computer use, Claude Code), ảnh chụp bằng `screencapture` của macOS; mọi ảnh được mở lại kiểm tra, ảnh không thể hiện đúng nội dung bị xóa và chụp lại (chi tiết khai trong AI Audit Report).
5. **Ghi kết quả**: sheet **Cross-Platform** trong `task1-checklist/checklist.xlsx` (Passed / Failed / N/A cho từng trình duyệt, kèm ghi chú khác biệt và Bug ID). 48 mục còn lại ghi N/A kèm lý do: nhóm B là logic JavaScript/React dùng chung, không phụ thuộc engine trình duyệt; nhóm C cần điều kiện đặc biệt (DevTools giả lập mạng, VoiceOver, dừng backend…). Ba mục có thể khác giữa trình duyệt nhưng chưa chạy lại (GUI-01-12, GUI-03-04, GUI-03-06) được ghi rõ là chưa chạy.

### 4.4 Bảng tổng hợp (22 mục nhóm A)

| ID | Mục kiểm tra | Task 1 | CH | FF | SF |
|---|---|---|---|---|---|
| GUI-01-02 | Chữ ở màn Login là tiếng Việt | Failed | Failed | Failed | Failed |
| GUI-01-03 | Nhãn, nút, cột bảng là tiếng Việt | Failed | Failed | Failed | Failed |
| GUI-01-04 | Thông báo lỗi tiếng Việt, không có chuỗi kỹ thuật | Failed | Failed | Failed | Failed |
| GUI-01-09 | Cột Giá theo định dạng vi-VN | Failed | Failed | Failed | Failed |
| GUI-01-10 | Số tiền không đổi theo ngôn ngữ trình duyệt | Failed | Failed | Failed | Failed |
| GUI-01-11 | Thứ tự Tab ở Login | Passed | Passed | Passed | Passed |
| GUI-01-13 | Menu và Đăng xuất dùng được bằng bàn phím | Failed | Failed | Failed | Failed |
| GUI-01-14 | Viền focus nhìn thấy rõ | Passed | Passed | Passed | Passed |
| GUI-01-15 | Bố cục không vỡ ở màn hình hẹp | Failed | Failed | Failed | Failed |
| GUI-01-16 | Phóng to 200% vẫn dùng được | Failed | Passed | Passed | Passed |
| GUI-01-17 | Đọc được khi bật dark mode | Passed | Passed | Passed | Passed |
| GUI-01-21 | Tiêu đề tab mô tả màn đang mở | Failed | Failed | Failed | Failed |
| GUI-02-07 | Ô Mật khẩu che ký tự | Passed | Passed | Passed | Passed |
| GUI-02-08 | Để trống trường bắt buộc ở Login thì không gửi | Failed | Failed | Failed | Failed |
| GUI-02-11 | Tên sản phẩm bắt buộc | Failed | Passed | Passed | Passed |
| GUI-02-13 | Giá là số nguyên > 0 (thử 1000.5) | Failed | Failed | Failed | Failed |
| GUI-02-17 | Ô chọn file chỉ nhận .csv | Failed | Failed | Failed | Failed |
| GUI-02-21 | Đơn tối thiểu ≥ 0, số lần ≥ 1 | Failed | Failed | Failed | Failed |
| GUI-02-22 | Ngày hết hạn phải sau hôm nay | Failed | Failed | Failed | Failed |
| GUI-02-24 | Cuộn chuột trên ô số không đổi giá trị | Failed | **Failed** | **Passed** | **Passed** |
| GUI-04-06 | Hộp thoại xác nhận trước khi xóa | Failed | Failed | Failed | Failed |
| GUI-04-10 | Tài khoản không phải admin nhận thông báo rõ | Passed | Passed | Passed | Passed |
| | **Tổng** | 5 P / 17 F | 7 P / 15 F | 8 P / 14 F | 8 P / 14 F |

Ghi chú khi đọc bảng:
- **GUI-01-16 và GUI-02-11** khác Task 1 không phải do trình duyệt: Task 3 chỉ kiểm phần nhìn thấy được ở từng trình duyệt (zoom 200% ở màn Login / Mã giảm giá; để trống Tên thì có bong bóng `required`). Lỗi Task 1 tìm thấy ở màn hoặc trường hợp khác vẫn giữ nguyên: ở 200%, nút "Import…" của màn Sản phẩm bị cắt mép phải; để trống Giá vẫn lưu được sản phẩm.
- **GUI-02-21**: cả 3 trình duyệt đều chặn Số lần = 0 bằng bong bóng của trình duyệt, nhưng Đơn tối thiểu = -1 vẫn được lưu (mã QA3 hiện "-1 ₫" trên Firefox và Safari).
- Thông báo của trình duyệt khác nhau về ngôn ngữ: Chrome và Safari hiện tiếng Anh ("Please fill out this field.", "Value must be greater than or equal to 1."), Firefox hiện tiếng Việt ("Vui lòng điền vào trường này.", "Vui lòng chọn một giá trị không nhỏ hơn 1.") vì giao diện Firefox là tiếng Việt. Ứng dụng không tự đặt thông báo nên ngôn ngữ phụ thuộc trình duyệt.

### 4.5 Hai khác biệt giữa các trình duyệt

**1. Định dạng số tiền đổi theo ngôn ngữ trình duyệt (GUI-01-10) — bổ sung vào BUG-19 ([#136](https://github.com/Taylor3691/eshop-sut/issues/136))**

Cùng dữ liệu seed, bảng Mã giảm giá hiển thị:

| Trình duyệt | Đơn tối thiểu của SAVE10 |
|---|---|
| Chrome | 300,000 ₫ |
| Firefox (giao diện tiếng Việt) | 300.000 ₫ |
| Safari | 300,000 ₫ |

Nguyên nhân: giao diện gọi `toLocaleString()` không truyền locale, nên định dạng lấy theo ngôn ngữ của trình duyệt. Người dùng Chrome/Safari tiếng Anh thấy dấu phẩy, trái với yêu cầu định dạng vi-VN `1.234.567 ₫`. Cột Giá ở màn Sản phẩm thì in thô `30000000 ₫` trên cả 3 trình duyệt. Đề xuất: dùng `toLocaleString('vi-VN')` (hoặc `Intl.NumberFormat('vi-VN')`) ở mọi chỗ hiển thị tiền.

Ảnh: `chrome/GUI-01-10-2_CH.png`, `firefox/GUI-01-10-2_FF.png`, `safari/GUI-01-10-2_SF.png`.

**2. Cuộn chuột trên ô số làm đổi giá trị, chỉ xảy ra trên Chrome (GUI-02-24) — bổ sung vào BUG-31 ([#148](https://github.com/Taylor3691/eshop-sut/issues/148))**

Nhập 100000 vào ô Giá, giữ con trỏ trên ô và cuộn chuột lên 3 nấc:

| Trình duyệt | Kết quả |
|---|---|
| Chrome | 100000 → 100003 (giá trị bị đổi) |
| Firefox | giữ 100000 |
| Safari | giữ 100000 (cùng sự kiện cuộn đó vẫn cuộn được trang) |

Đây là hành vi mặc định của Chrome với `<input type="number">` đang được focus. Người quản trị có thể vô tình lưu sai giá khi cuộn trang lúc con trỏ nằm trên ô số. Đề xuất: chặn sự kiện `wheel` trên các ô số (hoặc bỏ focus ô khi cuộn) để hành vi thống nhất giữa các trình duyệt.

Ảnh: `chrome/GUI-02-24_CH.png`, `firefox/GUI-02-24_FF.png`, `safari/GUI-02-24_SF.png`.

Không có bug mới chỉ xuất hiện trên Firefox hoặc Safari; hai khác biệt trên được ghi bổ sung vào bug đã có từ Task 1 thay vì tạo bug trùng.
## 5. Agent Skills
## 6. Kết luận
## Phụ lục: AI Audit Report, AI Critique, Git log
