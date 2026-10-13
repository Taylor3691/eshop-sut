# HW02 — Domain Testing và Boundary Value Analysis cho EShop

> **Bản nháp để tiếp tục chỉnh sửa.** Các phần phân tích, test summary và danh sách GitHub Issues được tổng hợp từ tài liệu hiện có. Các mục `[TODO]` cần người thực hiện bổ sung và review trước khi nộp. Đây chưa phải bản report cuối cùng.

| Thông tin | Nội dung |
|---|---|
| Họ và tên | [TODO: điền họ tên] |
| Student ID | [TODO: điền MSSV] |
| Lớp / Nhóm | [TODO: điền lớp và nhóm] |
| Bài tập | HW02 — AI-supported Domain Testing & BVA |
| System Under Test (SUT) | EShop |
| Repository | [Taylor3691/eshop-sut](https://github.com/Taylor3691/eshop-sut) |
| Tester trong test runs | `vt-toan` |
| Ngày lập bản nháp | 2026-10-13 |
| Ngày cập nhật bản nháp | 2026-10-14 |
| Human reviewer / Ngày review | [TODO] |
| Self-assessed grade | [TODO: 000–100, hoàn thiện ở mục 10] |

## 1. Mục tiêu, nguồn tài liệu và phạm vi

### 1.1. Mục tiêu

Bài làm áp dụng Domain Testing, Equivalence Partitioning (EP) và Boundary Value Analysis (BVA) để thiết kế test cases cho bốn feature của EShop. AI hỗ trợ phân tích theo từng bước; người thực hiện đối chiếu requirement, review test cases, execute bằng UI và cung cấp Actual Result cùng screenshots. Khi Result khác Expected Result, defect được ghi nhận bằng GitHub Issue theo template trong tài liệu môn học.

Chuỗi traceability sử dụng trong bài:

`Requirement → Domain → Equivalence Partition → Boundary / BVA Value → Test Case → Test Run → GitHub Issue`

Trong suite hiện hành có **67 test cases: 24 BVA và 43 EP**. Tester xác nhận đã execute toàn bộ; test runs ghi nhận **52 Pass, 15 Fail, 0 Blocked và 0 Not Run**. Mỗi failed case đã có Related Bug, tổng cộng **15 GitHub Issues**. Đây là số Issue theo test case, chưa phải số root cause độc lập đã được xác định.

### 1.2. Nguồn tài liệu và test oracle

| Nguồn | Vai trò trong bài làm |
|---|---|
| [Đề HW02](ref/2026.HW02.Domain%20Testing_En.pdf) | Yêu cầu chọn feature, phân tích Domain/BVA, AI Audit, AI Critique, Git history và submission |
| [Tài liệu quản lý test cases](ref/03%20-%20github_testcase_management.pptx.pdf) | Cách tổ chức test cases và test runs |
| [Tài liệu quản lý bugs](ref/03%20-%20github_bug_management.pptx.pdf) | Template cho **body của GitHub Issue** |
| [README của EShop](README.md) | Test oracle cho functional requirements và security requirements |
| [API specification](api_specification.md) | Tham khảo cấu trúc API và các dependency; suite hiện hành execute qua UI |
| [Setup guide](setup_guide.md) | Tham khảo cách thiết lập SUT |
| [Skill Domain Testing & BVA](.agents/skills/domain-testing-bva/SKILL.md) | Quy trình phân tích từng bước, traceability, review và AI gap candidates |

Expected Result được lấy từ requirement trong README. Hành vi lỗi của implementation không được dùng để thay đổi requirement. Công việc trong report là kiểm thử và ghi nhận defects; chưa có fix hoặc retest sau fix được ghi nhận trong phạm vi này.

### 1.3. Bốn feature được chọn

| Pool | Feature | Requirement chính | UI sử dụng | Test cases |
|---|---|---|---|---:|
| A | Quản lý hồ sơ cá nhân trên web | FR-04; SEC-04 | Customer web | 11 |
| B | Order State Machine | FR-10; FR-12; FR-18; SEC-03 | Customer web và Admin web | 18 |
| C | Product CRUD | FR-15; FR-12; SEC-03 | Admin web | 24 |
| D | Quản lý hồ sơ trên mobile | FR-04; FR-20; SEC-04 | Mobile app; có web trong case đồng bộ dữ liệu | 14 |

[TODO: xác nhận phân công feature trong nhóm và việc không trùng feature với thành viên khác theo đề bài.]

Suite được điều chỉnh theo yêu cầu thao tác thủ công: A/B/C execute trên web, D execute trên mobile app. Trong lần chuyển phạm vi từ 100 cases, 67 cases được giữ và 33 cases chỉ thực hiện được bằng request tự tạo được loại khỏi suite hiện hành. Test Case IDs được giữ nguyên nên có khoảng trống trong dãy số. Lý do từng case bị loại được ghi tại [manual-testing-scope.md](tests/test-summary/manual-testing-scope.md).

Phạm vi này chưa bao phủ request giả mạo, JWT bị sửa, selector trỏ tài nguyên người khác, body thiếu trường hoặc `null`. Một nút bị ẩn hay một input bị UI chặn chỉ chứng minh hành vi của UI được quan sát; chưa đủ để kết luận server chống được request tự tạo.

## 2. Môi trường và dữ liệu kiểm thử

### 2.1. Môi trường

| Thành phần | Thông tin đã biết | Thông tin cần bổ sung cho đợt execution |
|---|---|---|
| Backend | Node.js / Express / SQLite; địa chỉ mặc định `http://localhost:3000` | [TODO: Node version, SUT commit/build, cấu hình thực tế] |
| Customer web | React / Vite; địa chỉ mặc định `http://localhost:5173` | [TODO: OS, browser và version] |
| Admin web | React / Vite; địa chỉ mặc định `http://localhost:5174` | [TODO: OS, browser và version] |
| Mobile | React Native / Expo; backend dùng chung với web | [TODO: thiết bị/emulator, OS version, app/Expo version, API_URL] |
| Ngày / Đợt chạy | Test runs được cập nhật kết quả ngày 2026-10-13 | [TODO: ngày, giờ và timezone của execution thực tế] |
| Tài khoản thực tế | Tester được ghi là `vt-toan` | [TODO: tài khoản A/B/M đã dùng và role, không điền token] |

Ngày cập nhật tài liệu không tự xác định ngày execute. Thông tin môi trường trong [lịch sử Pool A](tests/test-runs/pool-a-history-before-manual-steps.md) thuộc đợt trước; không áp dụng cho toàn bộ bốn test runs hiện hành nếu chưa xác nhận.

### 2.2. Fixtures và nguyên tắc chuẩn bị

Tài khoản A/B dùng cho các scenario của customer; M dùng cho admin. Các sản phẩm P/Q/R và đơn hàng ở những trạng thái cần thử được chuẩn bị theo README của từng pool. Dữ liệu danh nghĩa là fixtures phục vụ kiểm thử, không phải giới hạn nghiệp vụ mới.

| Pool | Hướng dẫn fixtures và test inventory |
|---|---|
| A | [Profile web README](tests/test-cases/profile-web/README.md) |
| B | [Order state README](tests/test-cases/order-state/README.md) |
| C | [Product CRUD README](tests/test-cases/product-crud/README.md) |
| D | [Profile mobile README](tests/test-cases/profile-mobile/README.md) |

Trước mỗi case cần kiểm tra preconditions và ghi nhận dữ liệu ban đầu. Khi thử một invalid input, các input khác giữ ở giá trị danh nghĩa để hạn chế nhiều lỗi validation cùng lúc. Sau thao tác lưu, đối chiếu thông báo và dữ liệu khi mở lại/tải lại/đăng nhập lại theo Test Steps. Nếu không đạt preconditions hoặc không đến được bước cần thử, Result phải là `Blocked` với lý do cụ thể.

Backend startup reset và reseed database theo hướng dẫn dự án. Do đó không khởi động lại backend giữa bước thay đổi dữ liệu và bước đối chiếu persistence; nếu phải reset thì ghi rõ và chuẩn bị lại fixtures.

## 3. Phương pháp Domain Testing và BVA

### 3.1. Quy trình thiết kế

| Bước | Công việc | Output cần review |
|---|---|---|
| 1. Requirement Analysis | Trích functional rules, preconditions, inputs và Expected Result từ test oracle | Requirement IDs; assumptions; ambiguities |
| 2. Domain Analysis | Xác định valid/invalid domain, kiểu dữ liệu và dependency giữa các biến | Domain table |
| 3. Equivalence Partitions | Tách các nhóm có cùng ý nghĩa xử lý; chọn representative value | Partition IDs và mapping về requirement |
| 4. Boundary Analysis | Xác định lower/upper boundary và tính inclusive/exclusive khi có miền có thứ tự | Boundary table; lý do N/A nếu không có boundary |
| 5. BVA Values | Chọn giá trị tại boundary, ngay dưới và ngay trên | Test data và Expected Result tương ứng |
| 6. Test Case Design | Viết preconditions, Test Data, Test Steps và Expected Result quan sát được | Một file cho mỗi test case, giữ ID ổn định |
| 7. Coverage Review | Kiểm tra mapping và phần chưa có test case | Traceability matrix; coverage gaps |
| 8. Execution & Reporting | Tester execute; cập nhật Result, Note và Related Bug | Test runs; screenshots; GitHub Issues |
| 9. Human Review & AI Gaps | Review suy luận AI, evidence, assumption và các case có thể còn thiếu | Review record và AI gap analysis |

AI được dùng để hỗ trợ theo từng giai đoạn. Các analysis files giữ cấu trúc từ Requirement Analysis đến AI Gap Candidates, giúp người review kiểm tra cách suy ra test cases. Exact prompts và AI outputs phải lấy từ lịch sử tương tác trong AI Audit; không tái tạo prompt giả từ bảng quy trình này.

### 3.2. Cách áp dụng BVA

Với phone, requirement xác định độ dài **10–11 chữ số**, bao gồm hai đầu. Vì hai boundary liền nhau, các giá trị phân biệt cần thử là **9, 10, 11, 12**; các giá trị trùng từ hai bộ lân cận boundary không cần lặp lại. Prefix `0` và toàn chữ số được giữ ổn định khi thử độ dài.

Với product name, requirement xác định không rỗng và tối đa **255 ký tự**. Suite dùng ASCII để kiểm soát độ dài, chọn **0, 1, 2, 254, 255, 256** cho create. Edit có **0, 1, 255, 256**; hai giá trị 2 và 254 chưa có case edit riêng.

Với price, requirement là **price > 0**. Bộ **-1, 0, 1** kiểm tra lân cận threshold 0 trên lát cắt số nguyên. Requirement chưa quy định precision, bước tăng giá hay upper limit; **1 không được coi là giá dương nhỏ nhất được phép**. BVA cho giá thập phân cần làm rõ precision trước khi chọn các giá trị sát 0.

Order status là miền categorical. Các trạng thái có quan hệ chuyển đổi nghiệp vụ nhưng không tạo ra một khoảng số để áp dụng BVA. Pool B vì vậy dùng EP và state transition testing, ghi BVA là **N/A**.

## 4. Phân tích và kết quả theo feature

### 4.1. Pool A — Profile web

#### Requirement Analysis

FR-04 cho phép người dùng đã đăng nhập cập nhật Họ Tên, Số điện thoại và Địa chỉ giao hàng của chính mình. Email không được thay đổi. Phone hợp lệ bắt đầu bằng `0`, có 10–11 chữ số. SEC-04 yêu cầu nội dung user nhập khi hiển thị trên UI được escape đúng cách.

Preconditions: tài khoản customer đăng nhập được, có dữ liệu hồ sơ ban đầu để đối chiếu. Case guest dùng phiên riêng chưa đăng nhập. Case markup cần chuỗi đã lưu đến đúng điểm hiển thị để đánh giá renderer; chỉ alert lưu thành công không chứng minh lỗi render.

#### Domain Analysis và Equivalence Partitions

| Domain / Partition IDs | Valid / Invalid condition | Representative / Case |
|---|---|---|
| Phone — EP-PW-01 | Valid: prefix `0`, toàn digits, dài 10–11 | `0912345678`, `09123456789`; A-001/002 |
| Phone length — EP-PW-02/03 | Invalid: dưới 10 hoặc trên 11, các điều kiện khác hợp lệ | 9 và 12 digits; A-003/004 |
| Phone prefix — EP-PW-04 | Invalid: dài hợp lệ nhưng không bắt đầu bằng `0` | `1912345678`; A-010 |
| Phone characters — EP-PW-05 | Invalid: chứa chữ cái | `09123A5678`; A-012 |
| Name / Address / Owner — EP-PW-06/07/14 | Valid: sửa các trường được phép của chính mình | Dữ liệu danh nghĩa; A-028 |
| Email — EP-PW-08/09 | Xem được email; thao tác thay email phải bị chặn | A-015 |
| Session — EP-PW-20 | Invalid: chưa đăng nhập mà mở hồ sơ | A-016 |
| Display — EP-PW-18/19 | Chuỗi giống HTML nếu được lưu phải hiển thị như text | A-025/026 |

#### Boundary Analysis và BVA Values

| Độ dài phone | Test value | Expected Result | Test Case | Result |
|---:|---|---|---|---|
| 9 | `091234567` | Từ chối | A-003 | Pass |
| 10 | `0912345678` | Chấp nhận | A-001 | Fail |
| 11 | `09123456789` | Chấp nhận | A-002 | Fail |
| 12 | `091234567890` | Từ chối | A-004 | Pass |

#### Test design, execution và coverage

Pool A có **11 cases: 4 BVA + 7 EP**, kết quả **6 Pass / 5 Fail**. Hai valid phone boundaries bị từ chối, phone có prefix sai được chấp nhận, và hai case name/address hiển thị markup được tester xác nhận thành chữ in đậm/có định dạng sau khi mở lại. Email, guest access, invalid length/characters và thao tác cập nhật danh nghĩa được ghi Pass trong test run.

Có **13/20 partitions** được đại diện trong thiết kế. Chưa kiểm tra JWT giả, selector hồ sơ người khác và việc tự gửi role từ client. Requirement chưa có giới hạn độ dài name/address nên không tự tạo BVA cho hai trường này.

Chi tiết: [Analysis](tests/test-summary/profile-web-analysis.md) · [Test cases](tests/test-cases/profile-web/README.md) · [Test run](tests/test-runs/pool-a-test-run.md).

### 4.2. Pool B — Order State Machine

#### Requirement Analysis

FR-10 quy định chuỗi `pending → confirmed → shipping → delivered`, do admin thực hiện các bước tiến. User/admin có thể hủy khi `pending` hoặc `confirmed`. User không được hủy khi `shipping`. `delivered` và `canceled` là final states; không được chuyển sang trạng thái khác. FR-12/FR-18/SEC-03 giới hạn chức năng quản trị cho admin.

Preconditions: chuẩn bị đơn thuộc đúng customer, đúng trạng thái ban đầu và các phiên customer/admin cần thiết. Với stale page, giữ trang customer chưa tải lại trong khi admin thay đổi trạng thái, sau đó thử thao tác từ trang cũ.

#### Domain Analysis và Equivalence Partitions

Domain phụ thuộc tổ hợp **actor role × current state × target state × ownership × trạng thái hiển thị của UI**. Không thể đánh giá quyền hủy chỉ dựa vào target `canceled` mà bỏ qua current state.

| Partition IDs | Tổ hợp / Điều kiện | Expected Result | Cases đại diện |
|---|---|---|---|
| EP-OS-01/02/03 | Admin đi theo `pending → confirmed → shipping → delivered` | Cho phép từng bước đúng thứ tự | B-041 |
| EP-OS-04/05 | Admin hủy `pending` / `confirmed` | Cho phép | B-004/005 |
| EP-OS-06/07/08 | Nhảy bước hoặc lùi trạng thái | Chặn chuyển đổi | B-006/008/009/011 |
| EP-OS-09/10 | Rời `delivered` / `canceled` | Chặn vì final state | B-012/015/016/019 |
| EP-OS-11/12 | User hủy own `pending` / `confirmed` | Cho phép | B-046/021 |
| EP-OS-13/14 | User hủy own `shipping` / `delivered` | Từ chối | B-022/023/051 |
| EP-OS-22 | User thao tác đơn của mình | Chỉ tác động đúng đơn trong scenario | B-021/046 |
| EP-OS-31 | Customer thử vào quản lý đơn trên admin UI | Từ chối quyền quản trị | B-025 |

#### Boundary Analysis và BVA Values

**BVA: N/A.** Không có giới hạn số hoặc miền có thứ tự được requirement xác định cho status. ID đơn hàng không được dùng làm boundary giả. Các điểm chuyển đổi được kiểm tra bằng state transition testing.

#### Test design, execution và coverage

Pool B có **18 EP cases**, kết quả **15 Pass / 3 Fail**. Defects được ghi nhận: admin chuyển `canceled → delivered`, customer hủy khi đơn đã `shipping`, và customer thao tác hủy từ stale page sau khi admin chuyển đơn sang `shipping`. Happy path B-041 và stale admin scenario B-052 được ghi Pass.

Có **16/31 partitions** được đại diện. Suite chưa bao phủ mọi cặp transition hoặc request bypass UI. Một số Pass cho invalid transition được quan sát qua việc không có nút thao tác; kết luận giới hạn ở UI. Scenario stale page sử dụng thao tác nối tiếp, chưa chứng minh hành vi của hai request đồng thời.

Ambiguities còn mở: README nói chỉ admin có thể thao tác khi `shipping`, trong khi state diagram không có nhánh admin hủy `shipping`; Expected Result cho thao tác gửi lại đúng trạng thái cũ cũng chưa được xác định đầy đủ. Không dùng hai điểm này để suy ra defect khi chưa làm rõ oracle.

Chi tiết: [Analysis](tests/test-summary/order-state-analysis.md) · [Test cases](tests/test-cases/order-state/README.md) · [Test run](tests/test-runs/pool-b-test-run.md).

### 4.3. Pool C — Product CRUD

#### Requirement Analysis

FR-15 cho phép admin Thêm/Xem/Sửa/Xóa sản phẩm. Name bắt buộc và tối đa 255 ký tự; price bắt buộc, là số dương; category bắt buộc chọn từ danh sách có sẵn. Edit chỉ được thay đổi sản phẩm đang chọn. FR-12/SEC-03 giới hạn chức năng quản trị cho admin.

Preconditions: admin đăng nhập, có categories và các sản phẩm P/Q/R để thử và so sánh. Create và edit được kiểm tra riêng vì có thể đi qua luồng xử lý khác nhau. Khi đọc lại dữ liệu qua form Sửa, không bấm Lưu trong bước quan sát.

#### Domain Analysis và Equivalence Partitions

| Variable | Valid domain | Invalid domain / Điều kiện cần kiểm tra |
|---|---|---|
| Name | Có nội dung, dài tối đa 255; fixtures ASCII dài 1–255 | Rỗng; dài trên 255 |
| Price | Numeric và `> 0` | Âm; 0; non-numeric khi thử nhập qua UI |
| Category | Category có trong danh sách | Chưa chọn; category không tồn tại chưa được thử bằng request |
| Actor | Admin sử dụng chức năng quản lý | Customer thử truy cập admin UI |
| Edit target | Chỉ sản phẩm được chọn bị thay đổi | Dữ liệu form/selection cũ làm thay đổi sản phẩm khác |
| CRUD operation | Create/read/update/delete đúng sản phẩm | Operation thất bại hoặc dữ liệu không giữ đúng sau tải lại |

Partitions chi tiết và các đại diện được giữ trong analysis file. Suite dùng EP cho nominal CRUD, thử non-numeric input, customer access và chuyển lựa chọn P sang Q. Khoảng trắng, Unicode và việc category bị xóa trong lúc edit chưa được coi là đã bao phủ.

#### Boundary Analysis và BVA Values

| Operation / Variable | Test values | Expected Result | Test Cases | Result |
|---|---|---|---|---|
| Create / name.length | 0, 1, 2, 254, 255, 256 ASCII characters | Từ chối 0/256; chấp nhận 1/2/254/255 | C-001–006 | 6 Pass |
| Edit / name.length | 0, 1, 255, 256 ASCII characters | Từ chối 0/256; chấp nhận 1/255 | C-013/014/017/018 | 4 Pass |
| Create / price | -1, 0, 1 | Từ chối -1/0; chấp nhận 1 | C-025/026/027 | Fail / Fail / Pass |
| Edit / price | 0, 1, -1 | Từ chối 0/-1; chấp nhận 1 | C-032/033/034 | Fail / Pass / Fail |

Name được thử tại min, max và phía ngoài hai boundary. Price có exclusive lower boundary tại 0 và chưa có upper boundary trong requirement. Bộ giá trị số nguyên không thay thế việc phân tích precision của giá thập phân.

#### Test design, execution và coverage

Pool C có **24 cases: 16 BVA + 8 EP**, kết quả **20 Pass / 4 Fail**. Cả create và edit đều chấp nhận giá -1 hoặc 0, vi phạm FR-15. Các name boundaries, giá 1 và các EP cases còn lại được ghi Pass.

Có **17/30 partitions** được đại diện. Chưa kiểm tra request thiếu trường/null, category ID không tồn tại, JWT giả và resource ID giả. Việc UI không nhận ký tự `abc` không chứng minh server từ chối một body non-numeric tự tạo. Các test name dùng ASCII cũng chưa chứng minh đúng cách đếm mọi chuỗi Unicode.

Chi tiết: [Analysis](tests/test-summary/product-crud-analysis.md) · [Test cases](tests/test-cases/product-crud/README.md) · [Test run](tests/test-runs/pool-c-test-run.md).

### 4.4. Pool D — Profile mobile

#### Requirement Analysis

FR-04 kết hợp FR-20 yêu cầu chức năng hồ sơ trên mobile: sửa tên, phone, địa chỉ; email không sửa được. Phone bắt đầu bằng `0`, dài 10–11 chữ số. SEC-04 yêu cầu hiển thị input an toàn. Sau logout hoặc đổi tài khoản, thao tác phải gắn với đúng người dùng hiện tại.

Preconditions: mobile app kết nối backend, tài khoản A/B sẵn sàng. D-030 cập nhật hồ sơ qua customer web rồi đăng nhập lại mobile để đối chiếu dữ liệu; phần quan sát mobile vẫn thực hiện trong app.

#### Domain Analysis và Equivalence Partitions

| Partition IDs | Domain / Điều kiện | Cases đại diện |
|---|---|---|
| EP-PM-01 | Valid phone: prefix `0`, toàn digits, dài 10–11 | D-002/003 |
| EP-PM-02/03 | Invalid phone length: 9 / 12 digits | D-001/004 |
| EP-PM-04 | Invalid phone prefix | D-005 |
| EP-PM-05 | Phone có non-digit | D-006 |
| EP-PM-06/07/15 | Dữ liệu tên/địa chỉ danh nghĩa, đúng owner | D-013/018/030 |
| EP-PM-08 | Thử sửa email trên native UI | D-014 |
| EP-PM-17/18/19 | Guest, sau logout, đổi A sang B | D-016/017/018 |
| EP-PM-20/21 | Markup-like name/address phải hiển thị an toàn | D-028/029 |

#### Boundary Analysis và BVA Values

| Độ dài phone | Test value | Expected Result | Test Case | Result |
|---:|---|---|---|---|
| 9 | `091234567` | Từ chối | D-001 | Pass |
| 10 | `0912345678` | Chấp nhận | D-002 | Fail |
| 11 | `09123456789` | Chấp nhận | D-003 | Fail |
| 12 | `091234567890` | Từ chối | D-004 | Pass |

#### Test design, execution và coverage

Pool D có **14 cases: 4 BVA + 10 EP**, kết quả **11 Pass / 3 Fail**. Hai valid phone boundaries bị từ chối và phone không bắt đầu bằng `0` được chấp nhận. Email, guest/logout/switch account, cập nhật danh nghĩa, hiển thị markup an toàn và scenario web → mobile được ghi Pass.

Có **14/21 partitions** được đại diện. Chưa kiểm tra JWT bị sửa, request chọn owner khác, toàn bộ Android/iOS versions, offline hoặc session expiry. Kết quả mobile được ghi nhận riêng; không lấy kết quả web để suy ra mobile Pass. Phone defects tương tự Pool A là dấu hiệu cần điều tra, chưa đủ để khẳng định chung một root cause.

Chi tiết: [Analysis](tests/test-summary/profile-mobile-analysis.md) · [Test cases](tests/test-cases/profile-mobile/README.md) · [Test run](tests/test-runs/pool-d-test-run.md).

## 5. Test execution summary và traceability

### 5.1. Kết quả suite hiện hành

| Pool | Total | BVA | EP | Pass | Fail | Blocked | Not Run |
|---|---:|---:|---:|---:|---:|---:|---:|
| A | 11 | 4 | 7 | 6 | 5 | 0 | 0 |
| B | 18 | 0 | 18 | 15 | 3 | 0 | 0 |
| C | 24 | 16 | 8 | 20 | 4 | 0 | 0 |
| D | 14 | 4 | 10 | 11 | 3 | 0 | 0 |
| **Tổng** | **67** | **24** | **43** | **52** | **15** | **0** | **0** |

Execution rate của suite đã chọn là **67/67 = 100%**. Pass rate là **52/67 ≈ 77,61%**, fail rate là **15/67 ≈ 22,39%**. Các tỷ lệ này mô tả suite hiện hành; không phải tỷ lệ correctness hoặc requirement coverage của toàn hệ thống.

Theo quy ước test runs, mọi Pass có `Note = None`; Fail giữ Actual Result và Related Bug. Nguồn kết quả execution là các file trong `tests/test-runs/`. Trường `Status / Related Bugs` trong test case design có thể vẫn là `Not Run / None`; không dùng trường design đó thay thế test run hiện hành.

### 5.2. Coverage theo thiết kế

| Pool | Partitions có case đại diện | Partitions đã xác định | Chưa có đại diện |
|---|---:|---:|---:|
| A | 13 | 20 | 7 |
| B | 16 | 31 | 15 |
| C | 17 | 30 | 13 |
| D | 14 | 21 | 7 |

Một test case có thể đại diện nhiều partitions; nhiều case BVA cũng có thể nằm trong cùng valid partition. Vì vậy số partitions không bằng số test cases. Bảng trên mô tả design coverage trong analysis files; mức độ evidence của execution còn phụ thuộc screenshots và ghi chép tester.

[Traceability matrix](tests/test-summary/traceability-matrix.md) cung cấp mapping chi tiết cho toàn bộ 67 cases. Các phần chưa covered vẫn được giữ trong analysis files để tránh hiểu nhầm suite thủ công đã bao phủ hết requirement.

### 5.3. Ví dụ traceability

| Requirement | Domain / Partition | Boundary / Condition | Test Case | Test Run | Issue |
|---|---|---|---|---|---|
| FR-04 | Phone / EP-PW-01 | Valid lower boundary: 10 digits | [TC-PROFILE-WEB-001](tests/test-cases/profile-web/TC-PROFILE-WEB-001.md) | [Pool A: Fail](tests/test-runs/pool-a-test-run.md) | [#8](https://github.com/Taylor3691/eshop-sut/issues/8) |
| FR-10 | Final state / EP-OS-10 | `canceled → delivered` bị cấm | [TC-ORDER-STATE-019](tests/test-cases/order-state/TC-ORDER-STATE-019.md) | [Pool B: Fail](tests/test-runs/pool-b-test-run.md) | [#17](https://github.com/Taylor3691/eshop-sut/issues/17) |
| FR-15 | Price | Exclusive threshold 0 | [TC-PRODUCT-CRUD-026](tests/test-cases/product-crud/TC-PRODUCT-CRUD-026.md) | [Pool C: Fail](tests/test-runs/pool-c-test-run.md) | [#30](https://github.com/Taylor3691/eshop-sut/issues/30) |
| FR-04 / FR-20 | Phone / EP-PM-01 | Valid upper boundary: 11 digits | [TC-PROFILE-MOBILE-003](tests/test-cases/profile-mobile/TC-PROFILE-MOBILE-003.md) | [Pool D: Fail](tests/test-runs/pool-d-test-run.md) | [#36](https://github.com/Taylor3691/eshop-sut/issues/36) |

## 6. Bug summary và evidence

### 6.1. Các defects được ghi nhận

Chi tiết preconditions, Steps to Reproduce, Expected Result, Actual Result và screenshots nằm trong **body của GitHub Issue** theo template tài liệu. Bảng này là phần tổng hợp trong main report. Các IDs rút gọn A/B/C/D dưới đây tương ứng đầy đủ với Test Case ID trong test run của từng pool.

| Pool / Case | Expected Result | Actual Result được ghi nhận | GitHub Issue | Evidence trong workspace |
|---|---|---|---|---|
| A-001 | Chấp nhận phone 10 digits bắt đầu `0` | Alert từ chối valid phone | [#8](https://github.com/Taylor3691/eshop-sut/issues/8) | [pool-a-1.png](bug-images/pool-a-1.png) |
| A-002 | Chấp nhận phone 11 digits bắt đầu `0` | Alert từ chối valid phone | [#9](https://github.com/Taylor3691/eshop-sut/issues/9) | [pool-a-2.png](bug-images/pool-a-2.png) |
| A-010 | Từ chối phone có prefix khác `0` | Hiển thị alert cập nhật thành công | [#10](https://github.com/Taylor3691/eshop-sut/issues/10) | [pool-a-10.png](bug-images/pool-a-10.png) |
| A-025 | Name markup hiển thị dạng text an toàn | Tester xác nhận hiển thị chữ in đậm/có định dạng sau mở lại | [#11](https://github.com/Taylor3691/eshop-sut/issues/11) | [pool-a-25.png](bug-images/pool-a-25.png); cần bổ sung ảnh render |
| A-026 | Address markup hiển thị dạng text an toàn | Tester xác nhận hiển thị chữ in đậm/có định dạng sau mở lại | [#12](https://github.com/Taylor3691/eshop-sut/issues/12) | Chưa có screenshot trong `bug-images/`; tester đã xác nhận Actual Result |
| B-019 | Final state `canceled` giữ nguyên | Chuyển được sang `delivered` | [#17](https://github.com/Taylor3691/eshop-sut/issues/17) | [Trước](bug-images/pool-b-19_1.png) · [Sau](bug-images/pool-b-19_2.png) |
| B-022 | User không được hủy đơn `shipping` | Hiển thị alert hủy thành công | [#18](https://github.com/Taylor3691/eshop-sut/issues/18) | [pool-b-22.png](bug-images/pool-b-22.png) |
| B-051 | Stale page không cho hủy nếu current state đã `shipping` | Hiển thị alert hủy thành công từ trang cũ | [#19](https://github.com/Taylor3691/eshop-sut/issues/19) | [Trang cũ](bug-images/pool-b-51_1.png) · [Admin](bug-images/pool-b-51_2.png) · [Alert](bug-images/pool-b-51_3.png) |
| C-025 | Create từ chối price -1 | Tạo thành công, mở Sửa đọc lại thấy -1 | [#29](https://github.com/Taylor3691/eshop-sut/issues/29) | [pool-c-25.png](bug-images/pool-c-25.png) |
| C-026 | Create từ chối price 0 | Tạo thành công, mở Sửa đọc lại thấy 0 | [#30](https://github.com/Taylor3691/eshop-sut/issues/30) | [pool-c-26.png](bug-images/pool-c-26.png) |
| C-032 | Edit từ chối price 0 | Hiển thị alert cập nhật thành công | [#31](https://github.com/Taylor3691/eshop-sut/issues/31) | [pool-c-32.png](bug-images/pool-c-32.png) |
| C-034 | Edit từ chối price -1 | Hiển thị alert cập nhật thành công | [#32](https://github.com/Taylor3691/eshop-sut/issues/32) | [pool-c-34.png](bug-images/pool-c-34.png) |
| D-002 | Chấp nhận phone 10 digits bắt đầu `0` | Alert từ chối valid phone | [#35](https://github.com/Taylor3691/eshop-sut/issues/35) | [pool-d-2.jpg](bug-images/pool-d-2.jpg) |
| D-003 | Chấp nhận phone 11 digits bắt đầu `0` | Alert từ chối valid phone | [#36](https://github.com/Taylor3691/eshop-sut/issues/36) | [pool-d-3.jpg](bug-images/pool-d-3.jpg) |
| D-005 | Từ chối phone có prefix khác `0` | Hiển thị alert cập nhật thành công | [#37](https://github.com/Taylor3691/eshop-sut/issues/37) | [pool-d-5.jpg](bug-images/pool-d-5.jpg) |

### 6.2. Giới hạn evidence và biến thể execution

**A-025/A-026:** tester đã xác nhận Actual Result là chữ in đậm/có định dạng. Screenshot A-025 chỉ thể hiện input markup và alert lưu thành công, chưa chụp điểm render sau mở lại. A-026 chưa có screenshot. Report giữ Result tester cung cấp, đồng thời ghi rõ evidence cần bổ sung. Kết quả này chưa chứng minh JavaScript đã được execute.

**A-010:** dữ liệu trong ảnh là `1234567890`, còn representative của design là `1912345678`. Cả hai cùng valid length, toàn digits và invalid prefix nên thuộc cùng partition. Ảnh thể hiện alert thành công; chưa có ảnh sau tải lại để chứng minh persistence riêng cho case này.

**B-019:** hai ảnh cho thấy cùng đơn từ `canceled` sang `delivered`, hỗ trợ đối chiếu trước/sau. **B-022/B-051:** ảnh có alert hủy thành công nhưng chưa có screenshot sau tải lại để xác nhận final persisted state. B-051 được chụp với trang customer cũ hiển thị `pending`, trong khi design mô tả trang cũ ở `confirmed`. Đây là biến thể stale page cùng mục tiêu kiểm tra; cần ghi nhận sự khác nhau, không nói ảnh thể hiện đúng trạng thái `confirmed`.

**C-025/C-026:** cả hai ảnh đang ở form Sửa. Tester đã xác nhận sản phẩm được **thêm mới thành công**, sau đó mở Sửa để đọc lại giá. Vì vậy ảnh là evidence readback cho create, không được đổi case thành edit. **C-032/C-034:** ảnh cho thấy alert cập nhật thành công; cần bổ sung readback sau tải lại nếu muốn chứng minh persistence đầy đủ.

**D-002/D-003/D-005:** dialog che phần input phone. Giá trị test data được xác định từ test case và ghi nhận tester; không suy rằng screenshots tự thể hiện đầy đủ giá trị đã nhập. Device model, OS version và app version cần được bổ sung vào environment.

### 6.3. Nhận xét về defects

Các defects tập trung ở ba nhóm: phone validation, order state/role rules và product price validation; Pool A còn có unsafe markup rendering theo xác nhận của tester. BVA phát hiện vấn đề ngay tại valid phone boundaries và exclusive price threshold. State transition testing phát hiện việc rời final state và thao tác không hợp lệ sau khi trạng thái đơn thay đổi.

Các Issue tương tự giữa create/edit hoặc web/mobile vẫn được giữ riêng theo failed test case. Chưa có phân tích source code xác nhận root cause, nên chưa gộp các Issue thành một bug chung. [TODO: cập nhật triage, fix version và retest results nếu có trong giai đoạn tiếp theo.]

## 7. AI support, human review và AI gap analysis

### 7.1. Vai trò AI và người thực hiện

AI hỗ trợ đọc tài liệu, phân tích domain/partitions/boundaries, tổ chức test cases, rà traceability, tổng hợp test runs và soạn GitHub Issues. Tester cung cấp kết quả manual execution, screenshots và các xác nhận bổ sung khi screenshot chưa đủ mô tả Actual Result.

Các xác nhận được dùng trong report gồm: A-025/A-026 hiển thị nội dung HTML thành chữ in đậm/có định dạng; C-025/C-026 đã create thành công và ảnh chụp khi mở lại Sửa. Những xác nhận này bổ sung ngữ cảnh mà screenshot riêng lẻ không thể hiện đầy đủ.

Việc tester xác nhận đã execute toàn bộ suite không tự thay thế human review đối với thiết kế Domain/BVA. Reviewer cần kiểm tra requirement interpretation, Expected Result, fixtures và giới hạn coverage trước khi hoàn thiện bài nộp.

### 7.2. Các điểm đã điều chỉnh trong quá trình làm

| Điểm cần review | Điều chỉnh / Cách xử lý | Bài học về sử dụng AI |
|---|---|---|
| Test design chưa phù hợp thao tác thủ công | Giữ 67 cases và loại 33 request-only cases trong lần đổi scope | Prompt cần xác định execution channel và khả năng của tester |
| Template bug bị hiểu thành tài liệu riêng | Dùng template cho body GitHub Issue theo yêu cầu đã làm rõ | Xác định đúng deliverable trước khi tạo artifact |
| Nhầm chấp nhận input HTML với lỗi hiển thị | Ghi nhận lỗi render dựa trên xác nhận tester; đánh dấu thiếu ảnh render | Expected Result phải kiểm tra đúng điểm hiển thị, không chỉ alert |
| Ảnh C-025/C-026 nằm ở form Sửa | Ghi rõ ảnh là readback sau create theo xác nhận tester | Screenshot cần có ngữ cảnh workflow |
| Stale page B-051 khác trạng thái trong design | Ghi nhận variant `pending` và giới hạn của thao tác nối tiếp | Không mô tả evidence vượt quá nội dung quan sát được |

Những điểm trên là điều chỉnh workflow hoặc giới hạn suy luận/evidence. Không tự coi chúng là bugs mà AI đã bỏ sót nếu chưa có review xác nhận một missed test case hay defect cụ thể.

### 7.3. AI gap candidates và coverage gaps

| Candidate / Gap | Căn cứ trong tài liệu hiện có | Nguyên nhân có thể liên quan | Hành động review tiếp theo |
|---|---|---|---|
| Request bypass UI, JWT/role/owner manipulation | Các partitions còn uncovered sau khi chuyển manual scope | Giới hạn execution channel đã chọn | Nếu mở rộng scope, bổ sung API/security tests và Expected Result có nguồn |
| Price thập phân sát 0 | BVA hiện chỉ dùng -1/0/1; requirement thiếu precision | Specification chưa đủ xác định bước boundary | Làm rõ precision rồi thiết kế thêm case; không tự chọn min price |
| Edit name length 2 và 254 | Create có hai giá trị này, edit chưa có case riêng | Tradeoff giảm suite và đối xứng create/edit chưa đầy đủ | Review giá trị bổ sung coverage và quyết định bổ sung case |
| Name whitespace/Unicode | Fixtures BVA hiện dùng ASCII | Cách đếm/normalize ký tự chưa được đặc tả đầy đủ | Làm rõ rule trước khi gán Pass/Fail oracle |
| Category bị xóa khi form edit còn mở | Đã được nêu như gap trong product analysis | Dependency thay đổi theo thời gian chưa có scenario thực thi | Chuẩn bị scenario và xác định requirement về category membership |
| Concurrent order updates | B-051/B-052 là thao tác nối tiếp với stale page | Thiết kế stale UI chưa bao phủ simultaneous requests | Nếu cần, bổ sung concurrency test riêng, không suy từ case hiện có |
| Mobile offline/session expiry/đa thiết bị | Chưa có coverage và metadata cho toàn bộ nền tảng | Giới hạn môi trường và thời lượng kiểm thử | Bổ sung environment matrix và scenario theo ưu tiên |
| Render/persistence evidence chưa đầy đủ | Các giới hạn được liệt kê ở mục 6.2 | Screenshot chỉ chụp một thời điểm; context chưa được lưu đầy đủ | Chụp đúng điểm quan sát, đối chiếu sau reload và cập nhật Issue |

Đây là **gap candidates hoặc giới hạn coverage**, chưa phải defects mới đã được xác nhận. [TODO: reviewer đánh dấu candidate nào là actual AI gap, thêm missed case/bug, lý do AI bỏ sót và Issue mới nếu có.]

### 7.4. Human review record

| Nội dung review | Trạng thái | Reviewer / Ghi chú |
|---|---|---|
| Requirement mapping và Expected Result đúng test oracle | [TODO] | [TODO] |
| Domain/EP/BVA không có giới hạn tự suy diễn | [TODO] | [TODO] |
| Fixtures và Test Steps tái hiện được trên UI | [TODO] | [TODO] |
| Results và Issue descriptions phù hợp evidence | [TODO] | [TODO] |
| Các uncovered partitions được giải thích | [TODO] | [TODO] |
| AI gap candidates được phân loại sau review | [TODO] | [TODO] |

## 8. Agent Skill và lịch sử Git

### 8.1. Agent Skill

Skill [domain-testing-bva](.agents/skills/domain-testing-bva/SKILL.md) hướng dẫn phân tích theo chuỗi requirement → domain → partition → boundary → test case → human review. Skill yêu cầu không tự đặt business limits, chỉ dùng BVA cho miền có thứ tự, giữ assumptions/ambiguities và phân biệt AI gap candidate với gap đã xác nhận.

Artifacts của bốn pool đã được tổ chức theo các phase này. [TODO: kiểm tra bộ skill nộp kèm; bổ sung YouTube link cho demo end-to-end và thời điểm minh họa từng phase theo yêu cầu HW02.]

### 8.2. Các mốc Git phục vụ đối chiếu

| Commit | Nội dung liên quan |
|---|---|
| `64dfa7f` | Chuyển test cases sang manual web/mobile scope hiện hành |
| `95fac73` | Cập nhật kết quả và Note Pool A |
| `b1be42c` | Cập nhật kết quả và Note Pool B |
| `716a834` | Cập nhật kết quả và Note Pool C |
| `60d7912` | Cập nhật kết quả và Note Pool D |
| `4fa5384` | Liên kết GitHub Issues vào test run Pool A |
| `5e1bc25` | Liên kết GitHub Issues vào test run Pool B |
| `021ddf0` | Liên kết GitHub Issues vào test run Pool C |
| `49fcc20` | Liên kết GitHub Issues vào test run Pool D |

Bảng chỉ liệt kê các mốc tổng hợp gần nhất, không thay thế full Git log hoặc evidence commit cho từng phase. [TODO: export Git log dạng text từ branch bài làm sau khi hoàn thiện; đối chiếu commit cho từng bước của từng feature theo đề bài.]

## 9. AI Declaration, AI Audit và AI Critique

### 9.1. AI Declaration — bản nháp cần người nộp xác nhận

Bài làm có sử dụng Codex để hỗ trợ phân tích requirements, Domain Testing/BVA, tổ chức tài liệu kiểm thử, tổng hợp kết quả và soạn nội dung GitHub Issues/main report. Manual execution results và các xác nhận Actual Result do tester cung cấp. Người nộp cần review các output, kiểm tra evidence và chịu trách nhiệm về nội dung cuối cùng.

[TODO: bổ sung đúng tên/model của mọi AI tool đã dùng, phạm vi hỗ trợ thực tế; sửa declaration theo quá trình làm của bản thân và xác nhận trước khi nộp.]

### 9.2. AI Audit appendix — chưa hoàn thiện

Đề HW02 yêu cầu ghi lại từng interaction: tool name, ngày/giờ, exact prompt và AI output. Bảng dưới là mục lục để bổ sung từ lịch sử hội thoại thực tế, không phải audit log đã hoàn chỉnh.

| Interaction / Phase | Tool / Model | Timestamp + Timezone | Exact Prompt | AI Output | Human Review / Điều chỉnh |
|---|---|---|---|---|---|
| Phân tích requirements của từng pool | [TODO] | [TODO] | [TODO: chép nguyên văn] | [TODO: lưu output đầy đủ] | [TODO] |
| Domain và EP của từng pool | [TODO] | [TODO] | [TODO] | [TODO] | [TODO] |
| Boundary và BVA của từng pool | [TODO] | [TODO] | [TODO] | [TODO] | [TODO] |
| Test case generation và coverage review | [TODO] | [TODO] | [TODO] | [TODO] | [TODO] |
| Điều chỉnh manual scope | [TODO] | [TODO] | [TODO] | [TODO] | [TODO] |
| Test run summary và bug Issues | [TODO] | [TODO] | [TODO] | [TODO] | [TODO] |
| Main report draft và review | [TODO] | [TODO] | [TODO] | [TODO] | [TODO] |

[TODO: tách hoặc đính kèm AI Audit đầy đủ ở dạng Markdown và PDF theo submission yêu cầu; thêm dòng cho từng interaction thực tế, không chỉ một dòng cho mỗi phase.]

### 9.3. AI Critique — dành cho người thực hiện viết

**[TODO: viết 200–300 words, review số từ trước khi nộp.]**

Nội dung cần trả lời dựa trên trải nghiệm thực tế:

1. Output AI nào sai, thiếu, có bias hoặc chưa phù hợp requirement/workflow? Nêu ví dụ cụ thể và cách đã sửa.
2. AI bỏ sót case/bug nào đã được human review xác nhận? Nếu chỉ là coverage gap, phân biệt rõ và giải thích giới hạn prompt, tool hoặc độ phức tạp.
3. Nguyên tắc testing nào rút ra sau khi đối chiếu AI output với requirement và evidence?

Có thể dùng các điểm ở mục 7.2/7.3 làm nguồn tham khảo. Không trình bày candidate chưa kiểm thử thành bug đã phát hiện, và không nhận đã review một output khi chưa thực hiện review.

## 10. Self-assessment và checklist hoàn thiện bài nộp

### 10.1. Self-assessment

| Tiêu chí theo HW02 | Điểm tối đa | Tự đánh giá | Căn cứ / Nội dung còn thiếu |
|---|---:|---|---|
| Mục A trong rubric | 25 | [TODO] | [TODO: đối chiếu tiêu chí chi tiết trong đề và ghi evidence tương ứng] |
| Mục B trong rubric | 25 | [TODO] | [TODO: đối chiếu tiêu chí chi tiết trong đề và ghi evidence tương ứng] |
| Mục C trong rubric | 25 | [TODO] | [TODO: đối chiếu tiêu chí chi tiết trong đề và ghi evidence tương ứng] |
| Mục D trong rubric | 15 | [TODO] | [TODO: đối chiếu tiêu chí chi tiết trong đề và ghi evidence tương ứng] |
| Agent Skills | 10 | [TODO] | Skill hiện có; cần review submission và demo link |
| **Tổng** | **100** | **[TODO]** | Chỉ chấm sau khi đối chiếu rubric đầy đủ trong đề |

### 10.2. Checklist trước khi nộp

- [ ] Điền thông tin sinh viên/nhóm và xác nhận phân công feature.
- [ ] Bổ sung execution date, SUT commit/build, OS/browser/device/app versions và fixtures thực tế cho bốn test runs.
- [ ] Hoàn thiện human review và xác nhận các AI gap candidates.
- [ ] Bổ sung screenshots render A-025/A-026 và evidence readback còn thiếu như mục 6.2.
- [ ] Kiểm tra body, screenshots và links của 15 GitHub Issues; đảm bảo người chấm truy cập được repository.
- [ ] Review main report, cập nhật nếu test cases/results thay đổi và export bản PDF.
- [ ] Hoàn thiện AI Declaration, AI Audit từng interaction và AI Critique 200–300 words; xuất Markdown/PDF theo đề.
- [ ] Export full Git log thành file text và kiểm tra evidence commit cho từng phase của từng feature.
- [ ] Nộp skill và bổ sung link YouTube demo end-to-end theo yêu cầu HW02.
- [ ] Chuẩn bị README của submission gồm self-assessment, test summary, hướng dẫn mở artifacts và demo links.
- [ ] Đóng gói ZIP theo mẫu `<StudentID>_HW02_AI_DomainTesting_<SelfAssessedGrade>.zip`; grade dùng ba chữ số, ví dụ `090`.
- [ ] Đối chiếu đầy đủ yêu cầu và deadline trên Moodle trước khi nộp.

### 10.3. Artifact index

| Artifact | Vị trí |
|---|---|
| Main report Markdown | [HW02_MAIN_REPORT.md](HW02_MAIN_REPORT.md) |
| Main report PDF | [TODO: export sau khi review] |
| Domain/EP/BVA analyses | [tests/test-summary/](tests/test-summary/) |
| Full test cases và fixtures | [tests/test-cases/](tests/test-cases/) |
| Traceability matrix | [traceability-matrix.md](tests/test-summary/traceability-matrix.md) |
| Bốn test runs hiện hành | [Pool A](tests/test-runs/pool-a-test-run.md) · [Pool B](tests/test-runs/pool-b-test-run.md) · [Pool C](tests/test-runs/pool-c-test-run.md) · [Pool D](tests/test-runs/pool-d-test-run.md) |
| Bug screenshots | [bug-images/](bug-images/) |
| Bug reports | 15 GitHub Issue bodies được liên kết ở mục 6.1 |
| Agent Skill | [SKILL.md](.agents/skills/domain-testing-bva/SKILL.md) |
| AI Audit / AI Critique MD + PDF | [TODO: hoàn thiện appendix hoặc tài liệu đính kèm] |
| Full Git log text | [TODO: export khi chốt bài] |
| Submission README / Demo link | [TODO] |
