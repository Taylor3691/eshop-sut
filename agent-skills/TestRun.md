# Agent Skill: Chạy Cypress, lập Test Run, Bug Report, Issue và Traceability Matrix

## 1. Mục tiêu

Skill này dùng để chạy thật toàn bộ Cypress spec trong `test/test-scripts/`, thu kết quả theo từng testcase và đồng bộ các đầu ra sau:

```text
test/test-runs/BVA.md
test/test-runs/DomainTesting.md

test/Bug-reports/BVA/<Feature>/<TC-ID>.md
test/Bug-reports/DomainTesting/<Feature>/<TC-ID>.md
test/Bug-reports/Screenshot/<TC-ID>.png
test/Bug-reports/Issue/<BUG-ID>.md

test/test-summary/Traceability_matrix.md
```

Mọi kết quả, actual result, environment và evidence phải đến từ lần chạy dự án/Cypress thực tế. Không suy diễn Pass/Fail, không tạo ảnh bằng AI, không dựng ảnh giả và không dùng kết quả tĩnh của source code thay cho kết quả chạy.

Không sửa testcase, test script hoặc source ứng dụng để ép test pass. Không cập nhật `Status / Related Bugs` trong testcase nguồn chỉ vì đã chạy test.

Không chạy một spec khi Test data hoặc Preconditions trong spec/helper/fixture không khớp testcase nguồn. Không tự sửa script, thay dữ liệu, tạo fixture thay thế hoặc điều chỉnh testcase để vượt qua kiểm tra này.

## 2. Input và ánh xạ bắt buộc

Đọc tất cả file `.cy.js` trong `test/test-scripts/` và testcase Markdown tương ứng trong `test/test-cases/`.

Ánh xạ nhóm chạy:

```text
test/test-scripts/BVATesting/**
  -> test/test-runs/BVA.md
  -> test/Bug-reports/BVA/**

test/test-scripts/DomainTesting/**
  -> test/test-runs/DomainTesting.md
  -> test/Bug-reports/DomainTesting/**
```

Ánh xạ chi tiết phải giữ nguyên Feature và TC-ID:

```text
test/test-scripts/BVATesting/Feature7/TC-BVA-FR07-001.cy.js
  -> test/Bug-reports/BVA/Feature7/TC-BVA-FR07-001.md

test/test-scripts/DomainTesting/Feature17/TC-COUPON-001.cy.js
  -> test/Bug-reports/DomainTesting/Feature17/TC-COUPON-001.md
```

Mỗi spec phải ánh xạ đúng một báo cáo chi tiết. Lấy Requirement, Module, Test steps và Expected result từ testcase nguồn; lấy Result, Actual result và Evidence từ lần chạy thực tế. Nếu không tìm được testcase nguồn hoặc TC-ID không khớp, không đoán dữ liệu: ghi testcase đó là `Blocked` và nêu lỗi traceability.

## 3. Nguyên tắc không suy diễn

- `Pass` chỉ khi testcase thật sự được Cypress thực thi và tất cả assertion đều đạt.
- `Fail` chỉ khi testcase thật sự được thực thi và Cypress ghi nhận failure của test/assertion/hành vi được kiểm tra.
- `Blocked` khi không thể thực thi hoặc xác minh do dependency, config, server, URL, credential, dữ liệu, selector/setup, `it.skip()` hoặc lỗi môi trường.
- Không coi exit code toàn suite là kết quả của từng testcase. Phải đọc kết quả có cấu trúc theo từng spec/test từ Cypress Module API hoặc reporter máy đọc được.
- Không biến lỗi khởi động server, mất kết nối hay thiếu credential thành bug sản phẩm.
- Không tự chạy lại test fail để che lỗi. Nếu có retry do Cypress config, ghi nhận số lần thử và kết quả cuối theo dữ liệu Cypress; không xóa dấu vết retry khỏi Note.
- Test bị skip/pending được ghi là `Blocked`, không phải `Pass`.

## 4. Kiểm tra trước khi chạy

Trước khi khởi động dự án, kiểm tra và ghi nhận:

1. Tổng số spec và danh sách TC-ID dự kiến.
2. `package.json`, lockfile, phiên bản Node, Cypress dependency/binary và `cypress.config.*`.
3. `specPattern` có phát hiện `test/test-scripts/**/*.cy.js` hay không.
4. Hướng dẫn khởi động backend, `frontend-web`, `frontend-admin` trong repository.
5. URL/port thực tế, health endpoint hoặc dấu hiệu sẵn sàng của từng dịch vụ.
6. Các biến môi trường mà spec đang dùng:
   - `CYPRESS_WEB_BASE_URL`
   - `CYPRESS_ADMIN_BASE_URL`
   - `CYPRESS_ADMIN_EMAIL`
   - `CYPRESS_ADMIN_PASSWORD`
7. Cơ chế seed/reset database và phạm vi dữ liệu bị thay đổi khi chạy server/test.
8. Browser sẽ dùng, browser version, OS, URL và Git commit/build.

Không in credential, token hoặc mật khẩu vào terminal, report, screenshot hay log. Giữ password command ở chế độ không log và che thông tin nhạy cảm nếu có nguy cơ xuất hiện trong ảnh.

Nếu Cypress/dependency/config còn thiếu và nhiệm vụ hiện tại chưa cho phép cài hoặc sửa cấu hình, không tự thay đổi `package.json`, lockfile hay config. Báo blocker và ghi các spec bị ảnh hưởng là `Blocked`. Nếu người dùng đã cho phép hoàn thiện môi trường chạy, chỉ tạo thay đổi tối thiểu, kiểm tra discovery trước khi chạy suite và báo rõ các file cấu hình đã thay đổi.

Không chạy trên production data. Nếu thao tác khởi động sẽ xóa/reset database hoặc dữ liệu không phải test, phải xác minh đúng test environment và xin quyền khi tác động đó chưa nằm rõ trong phạm vi được giao.

### 4.1. Cổng kiểm tra bất biến Test data

Trước khi khởi động server hoặc gọi Cypress, đối chiếu từng spec với testcase Markdown tương ứng, gồm cả helper và fixture mà spec sử dụng.

Kiểm tra tối thiểu:

1. Mọi giá trị trong `Test data` được dùng trong UI/API/script phải khớp nguyên văn testcase: email, password, coupon code, product, số lượng, giá trị biên, giá trị rỗng và trạng thái dữ liệu.
2. Setup tái tạo đúng `Preconditions`; không được thay dữ liệu kiểm thử bằng dữ liệu seed “tương đương”.
3. Không có `Date.now()`, `Math.random()`, UUID, timestamp, faker hoặc cơ chế sinh động khác dùng để thay Test data.
4. Mọi mapping như “Sản phẩm A/B” phải được testcase hoặc tài liệu Test data mà testcase dẫn chiếu định danh rõ; bằng chứng source về seed không tự nó cho phép thay thế Test data.
5. Test steps và Expected result trong spec vẫn tương ứng testcase nguồn.

Nếu phát hiện lệch dữ liệu, đánh dấu chính spec đó là `Blocked` trước khi chạy, với Note nêu rõ `<trường/tiền đề>`, giá trị trong testcase và giá trị/mapping phát hiện trong script. Không chạy spec đó, không sửa script trong lúc chạy, không tạo screenshot và không tạo Issue sản phẩm. Vẫn có thể chạy các spec khác đã vượt cổng kiểm tra.

Không sử dụng kết quả của lần chạy cũ cho một spec đã phát hiện lệch Test data. Báo cáo, evidence, Issue và dòng Traceability của spec đó phải được thay bằng trạng thái `Blocked` của lần kiểm tra hiện tại.

## 5. Khởi động dự án và chạy Cypress thật

1. Khởi động đúng các dịch vụ mà nhóm spec cần, theo script/hướng dẫn của repository.
2. Chỉ quản lý và dừng các process do lần chạy này tạo ra; không dừng process có sẵn của người dùng.
3. Chờ từng dịch vụ sẵn sàng bằng kiểm tra HTTP/port có giới hạn thời gian. Không dùng sleep dài cố định để giả định server đã sẵn sàng.
4. Xác nhận URL chạy khớp các biến môi trường; không đoán port.
5. Chạy toàn bộ spec bằng `cypress run` hoặc Cypress Module API. Ưu tiên một lần chạy chung để giữ nhất quán môi trường và artifact.
6. Thu dữ liệu có cấu trúc cho từng test: spec path, TC-ID, state, attempts, duration, error message/stack rút gọn, browser và URL. Đây là nguồn sự thật để phân loại `Pass`/`Fail`/`Blocked`.
7. Sau khi có kết quả cấu trúc, thu screenshot evidence theo mục **7**. Với testcase `Pass`, chỉ hoàn tất evidence khi Cypress Runner đã hiển thị trạng thái cuối có dấu `✓` cho đúng TC-ID.
8. Sau khi thu đủ artifact, dừng an toàn các dịch vụ mà skill đã khởi động.

Nếu khởi động thất bại, vẫn tạo báo cáo `Blocked` cho các spec bị ảnh hưởng với nguyên nhân thực tế. Không tạo Issue sản phẩm từ lỗi môi trường.

## 6. Chuẩn hóa Result
### Bằng chứng bắt buộc để xác nhận Pass

Không được kết luận `Pass` chỉ vì:
- các command/assertion trung gian hiển thị màu xanh;
- request API trả về HTTP 200;
- UI hiển thị đúng ở một thời điểm;
- screenshot được chụp trong lúc test vẫn đang chạy.

Chỉ được ghi `Pass` khi có bằng chứng trạng thái cuối cùng của testcase từ Cypress, tối thiểu một trong các dạng sau:

1. Cypress Runner hiển thị dấu `✓` tại đúng testcase và bộ đếm `Passed` tăng tương ứng.
2. Kết quả `cypress run` hoặc reporter máy đọc được ghi nhận testcase có `state = passed`.
3. Cypress Module API trả về testcase/attempt cuối cùng có trạng thái `passed`.

Nếu screenshot được dùng làm evidence cho `Pass`, ảnh phải thể hiện rõ trạng thái cuối cùng của testcase, ưu tiên bao gồm:
- dấu `✓` trước testcase;
- bộ đếm số test Passed;
- không còn trạng thái đang chạy tại thời điểm chụp.

Nếu chỉ có command log hoặc assertion trung gian mà chưa có trạng thái cuối cùng, không được suy ra `Pass`.

Ánh xạ trạng thái Cypress sang Result:

| Trạng thái thực tế | Result |
|---|---|
| Test thực thi và đạt tất cả assertion | `Pass` |
| Test thực thi và Cypress ghi nhận failure | `Fail` |
| Pending, skipped, không discovery được hoặc không đủ điều kiện chạy | `Blocked` |

Nếu spec không xuất hiện trong kết quả Cypress dù nằm trong danh sách dự kiến, ghi `Blocked` với Note `Cypress không discovery hoặc không trả kết quả cho spec`, không tự coi là Pass.

Spec không vượt cổng kiểm tra bất biến Test data cũng là `Blocked`; đây là lỗi traceability/test automation, không phải Fail sản phẩm.

## 7. Chụp screenshot evidence

Ảnh phải được chụp từ chính phiên chạy Cypress/dự án thật. Không dùng công cụ sinh ảnh, không dựng lại UI sau khi chạy và không dùng ảnh của testcase khác.

Đích cuối cùng:

```text
test/Bug-reports/Screenshot/<TC-ID>.png
```

### Evidence cho Pass

Kết quả `Pass` vẫn được xác nhận bằng trạng thái cuối `passed` từ Cypress Module API/reporter. Tuy nhiên, screenshot Pass phải là ảnh của **Cypress Runner sau khi testcase hoàn tất**, trong đó thấy rõ dấu `✓` hoặc bộ đếm Passed cuối cùng ứng với đúng TC-ID. Ảnh UI hoặc Command Log trung gian không thay thế được bằng chứng này.

Không dùng `cy.screenshot()` trong testcase, `beforeEach` hoặc `afterEach` làm evidence Pass: tại thời điểm đó Cypress chưa xác nhận trạng thái cuối của testcase. Hook tạm chỉ có thể dùng để thu ảnh ứng dụng hoặc ảnh failure bổ sung, không được liên kết như screenshot Pass cuối cùng.

Sau khi reporter/Module API cho biết testcase `passed`, chạy hoặc mở Cypress ở chế độ có giao diện để lấy ảnh Runner:

1. mở đúng spec (mỗi spec chứa một TC-ID);
2. chờ Runner hoàn tất và xác nhận TC-ID có dấu `✓`/Passed;
3. dùng công cụ điều khiển UI được người dùng cho phép để chụp cửa sổ Runner, không chụp ảnh dựng lại;
4. kiểm tra ảnh không hiển thị password, token hoặc dữ liệu nhạy cảm;
5. lưu ảnh staging theo TC-ID.

Nếu không có quyền điều khiển UI, không có desktop/headed browser, hoặc không thể chụp Runner sau trạng thái cuối, không tạo ảnh thay thế và không tuyên bố TestRun hoàn tất. Báo rõ evidence Pass còn thiếu; không đổi một testcase đã `passed` thành bug sản phẩm chỉ vì thiếu điều kiện thu evidence.

### Evidence cho Fail và Blocked

- Test `Fail` phải có screenshot failure thật từ Cypress hoặc ảnh Runner/ứng dụng ở thời điểm failure hữu ích nhất. Với API-heavy test, ưu tiên Runner để thấy Command Log và lỗi cuối.
- Test `Blocked` trước khi thực thi không được có ảnh giả. Phần Evidence phải ghi `Không có screenshot vì testcase chưa được thực thi` cùng blocker.
- Khi chạy lại, ảnh mới nhất của cùng TC-ID được phép thay thế ảnh cũ sau khi đã xác nhận đúng testcase.

Không dùng trực tiếp `test/Bug-reports/Screenshot/` làm thư mục staging nếu Cypress có thể xóa `screenshotsFolder` khi bắt đầu run. Chụp vào staging an toàn, sau đó:

1. đối chiếu screenshot với spec, TC-ID và trạng thái cuối;
2. chọn ảnh thật phù hợp nhất;
3. sao chép/đổi tên thành `test/Bug-reports/Screenshot/<TC-ID>.png`;
4. xác minh file tồn tại và mở được trước khi ghi link vào Markdown.

Ảnh failure tự động của Cypress có thể có tên dài hoặc hậu tố `(failed)`; phải chuẩn hóa sau run, không suy đoán liên kết chỉ từ tên gần giống.

## 8. Báo cáo tổng hợp trong `test/test-runs/`

Tạo hoặc cập nhật:

```text
test/test-runs/BVA.md
test/test-runs/DomainTesting.md
```

Mỗi file là bảng Markdown:

```md
| Test Case ID | Module | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| TC-... | ... | Danh | Pass | None | ... |
```

Quy tắc:

- `Tester` luôn là `Danh`.
- Mỗi spec tương ứng đúng một dòng, không trùng TC-ID.
- `Module` lấy từ testcase nguồn.
- `Result` chỉ dùng `Pass`, `Fail`, `Blocked`.
- `Related Bug` là một hoặc nhiều link tới Issue tương ứng nếu Fail; không có Issue thì `None`.
- Link Issue từ `test/test-runs/*.md` dùng dạng `../Bug-reports/Issue/<BUG-ID>.md`.
- `Note` ghi ngắn gọn error thực tế, retry hoặc blocker; escape ký tự `|` và xuống dòng để không làm vỡ bảng.
- File phản ánh lần chạy mới nhất: cập nhật dòng theo TC-ID, không append dòng trùng.

## 9. Báo cáo chi tiết một-một trong `test/Bug-reports/`

Mỗi spec tạo/cập nhật một file Markdown ở nhóm và Feature tương ứng. Dùng cấu trúc:

```md
Title: [BUG][<Module>] <Mô tả lỗi>

## Found by Test Case
<TC-ID>

## Requirement liên quan
<Requirement ID>

## Severity / Priority
<Severity> / <Priority>

## Environment
- Browser: <tên và version thực tế>
- OS: <OS thực tế>
- URL: <URL thực tế>
- Build/commit: <commit/build thực tế>

## Steps to reproduce
1. ...
2. ...

## Expected result
<Expected result từ testcase nguồn>

## Actual result
<Kết quả quan sát từ lần chạy>

## Evidence
![Evidence <TC-ID>](../../Screenshot/<TC-ID>.png)
```

Điều chỉnh theo Result:

- `Fail`: Title bắt đầu `[BUG]`; Actual result mô tả failure thực tế; link screenshot thật; Severity/Priority chỉ đánh giá khi có căn cứ nhất quán, nếu chưa đủ dùng `TBD / TBD`.
- `Pass`: Title bắt đầu `[PASS]`; `Severity / Priority` là `N/A / N/A`; Actual result ghi hành vi thực tế khớp expected; vẫn dẫn screenshot thật.
- `Blocked`: Title bắt đầu `[BLOCKED]`; `Severity / Priority` là `N/A / N/A`; Actual result ghi blocker; Evidence ghi không có screenshot nếu test chưa thực thi.

Steps to reproduce lấy từ testcase và chỉ bổ sung bước môi trường đã thực hiện thật. Không biến stack trace thành actual result; dùng thông báo ngắn, quan sát được và giữ chi tiết kỹ thuật cần thiết trong Note.

## 10. Tạo và quản lý Issue

Chỉ tạo Issue khi Result là `Fail`. Không tạo Issue cho `Pass`, `Blocked`, `Skipped`, lỗi setup hoặc lỗi môi trường.

Thư mục:

```text
test/Bug-reports/Issue/
```

Một lỗi độc lập tạo một file. Tên file phải ổn định và tương quan với requirement/module/lỗi, ví dụ:

```text
BUG-FR07-CART-MISSING-QUANTITY-CONTROLS.md
BUG-FR17-COUPON-INVALID-DISCOUNT-ACCEPTED.md
```

Không mặc định một Fail bằng một Issue:

- Nhiều testcase cùng chứng minh một lỗi quan sát được thì liên kết chung một Issue.
- Một testcase chứng minh nhiều lỗi độc lập có thể liên kết nhiều Issue.
- Gộp lỗi dựa trên cùng hành vi sai, trigger và expected/actual; không bịa root cause để gộp.
- Trước khi tạo, tìm Issue hiện có theo requirement, module, title, testcase liên quan và hành vi actual để tránh trùng.
- Không xóa Issue cũ chỉ vì lần chạy mới không tái hiện; cập nhật lifecycle theo bằng chứng.

Format Issue bắt buộc:

```md
---
name: Bug Report
title: "[BUG]: <Tiêu đề lỗi>"
labels: ["type: bug", "status: Open"]
---

## Mô tả lỗi
<Mô tả lỗi và các testcase phát hiện>

## Môi trường
- Browser: <tên và version thực tế>
- OS: <OS thực tế>
- URL: <URL thực tế>
- Build/commit: <commit/build thực tế>

## Steps to reproduce
1. ...
2. ...
3. ...

## Actual result
<Actual result thực tế>

## Expected result
<Expected result>

## Evidence
![Evidence <TC-ID>](../Screenshot/<TC-ID>.png)
```

Nếu Issue được chứng minh bởi nhiều testcase, liệt kê TC-ID trong `## Mô tả lỗi` và dẫn từng screenshot thật trong `## Evidence`. Issue mới luôn có `status: Open`.

## 11. Status duy nhất được phép

Trong Issue và Traceability Matrix chỉ sử dụng bốn Status sau, giữ đúng cách viết:

| Điều kiện | Status |
|---|---|
| Test Pass hoặc bug đã retest thành công | `Done` |
| Bug đã được sửa và đang chờ chạy lại | `Ready for retest` |
| Test Fail, bug chưa được sửa hoặc vẫn tái hiện | `Open` |
| Không thể chạy hoặc xác minh | `Blocked` |

Không dùng `New`, `N/A`, `Closed` hoặc trạng thái khác cho cột/label Status.

Quy tắc chuyển trạng thái:

- Issue vừa tạo từ Fail: `Open`.
- Retest vẫn Fail: giữ `Open`.
- Có bằng chứng lỗi đã được sửa nhưng chưa chạy retest: `Ready for retest`.
- Retest Pass: `Done`.
- Retest không thể thực hiện: `Blocked`.
- Testcase Pass không liên quan Issue: `Done` trong Traceability Matrix.
- Không tự chuyển sang `Ready for retest` chỉ vì source thay đổi; cần bằng chứng sửa lỗi hoặc trạng thái đã được người dùng cung cấp.

Khi đổi trạng thái Issue, cập nhật label frontmatter thành một trong `status: Open`, `status: Ready for retest`, `status: Done`, `status: Blocked` và giữ nguyên nội dung/evidence lịch sử cần thiết.

## 12. Traceability Matrix

Tạo hoặc cập nhật:

```text
test/test-summary/Traceability_matrix.md
```

Format:

```md
# Traceability Matrix: Requirement - Test Case - Bug

| Requirement | Testcase | Result | Bug Issue | Status |
|---|---|---|---|---|
| FR-07 | TC-CART-004 | Fail | [BUG-FR07-CART-MISSING-QUANTITY-CONTROLS](../Bug-reports/Issue/BUG-FR07-CART-MISSING-QUANTITY-CONTROLS.md) | Open |
| FR-07 | TC-CART-009 | Pass | None | Done |
| FR-17 | TC-COUPON-001 | Blocked | None | Blocked |
```

Quy tắc:

- Mỗi testcase/spec có đúng một dòng, không trùng TC-ID.
- `Requirement` và `Testcase` lấy từ testcase/spec đã đối chiếu.
- `Result` lấy từ lần chạy thực tế và chỉ dùng `Pass`, `Fail`, `Blocked`.
- `Bug Issue` chứa link tới một hoặc nhiều file Issue; không có Issue thì `None`.
- Link từ `test/test-summary/Traceability_matrix.md` dùng `../Bug-reports/Issue/<BUG-ID>.md`.
- `Status` chỉ dùng `Done`, `Ready for retest`, `Open`, `Blocked` theo quy tắc ở trên.
- Nếu nhiều Issue, phân tách các link bằng `<br>` để không phá cấu trúc bảng.
- Sắp xếp ổn định theo Requirement, nhóm kiểm thử, Feature và TC-ID để diff dễ đọc.

## 13. Cập nhật an toàn và tính lặp lại

- Đọc file đích hiện có trước khi ghi; bảo toàn thông tin Issue/lịch sử không thuộc lần chạy hiện tại.
- Báo cáo test run, báo cáo chi tiết, screenshot và dòng matrix của cùng TC-ID được cập nhật theo lần chạy mới nhất, không nhân bản.
- Không xóa file/report/Issue không còn ánh xạ nếu chưa xác nhận đó là artifact thừa.
- Không ghi link tới screenshot hoặc Issue không tồn tại.
- Sau khi ghi, kiểm tra mọi đường dẫn Markdown tương đối từ chính file chứa link.
- Không ghi đè thay đổi thủ công chưa hiểu rõ; nếu không thể hợp nhất an toàn, giữ file và báo xung đột.

## 14. Kiểm tra chất lượng bắt buộc

Sau khi chạy và sinh báo cáo, xác minh:

1. Số spec nguồn bằng số dòng tổng hợp trong `BVA.md` cộng `DomainTesting.md`.
2. Mỗi spec có đúng một báo cáo chi tiết ở BVA hoặc DomainTesting.
3. Không thiếu/thừa TC-ID giữa spec, báo cáo tổng hợp và Traceability Matrix.
4. Mỗi test đã thực thi có screenshot `<TC-ID>.png` mở được; ảnh Pass phải thể hiện Cypress Runner sau trạng thái cuối với dấu `✓`/Passed cho đúng TC-ID; Blocked chưa chạy không có ảnh giả.
5. Mỗi Result Fail có ít nhất một Issue hợp lệ và Related Bug/Bug Issue trỏ đúng file.
6. Không Issue nào được tạo chỉ từ Pass/Blocked/lỗi môi trường.
7. Issue không bị trùng cho cùng một lỗi.
8. Tất cả Status thuộc đúng tập `Done`, `Ready for retest`, `Open`, `Blocked`.
9. Tester trong hai bảng test run luôn là `Danh`.
10. Markdown table không vỡ do ký tự `|`, xuống dòng hoặc link.
11. Environment trong report khớp browser, OS, URL, commit/build của lần chạy.
12. Không có credential/token/password trong Markdown, log được trích hoặc screenshot.
13. Mọi spec đã chạy đều vượt cổng kiểm tra bất biến Test data; mọi spec lệch dữ liệu được ghi `Blocked`, không có screenshot giả và không có Issue sản phẩm.
14. Mọi testcase có Result `Pass` phải có nguồn xác nhận trạng thái cuối cùng từ Cypress (`state = passed`, reporter/Module API hoặc Runner đã hoàn tất) và screenshot Runner sau trạng thái cuối có dấu `✓`/Passed cho đúng TC-ID. Screenshot Pass không được chỉ thể hiện command/assertion trung gian.

Nếu một kiểm tra không đạt, không tuyên bố hoàn tất. Sửa artifact khi có thể; nếu thiếu quyền hoặc môi trường, báo chính xác blocker.

## 15. Báo cáo bàn giao

Sau khi hoàn tất, báo cáo ngắn gọn:

- tổng số spec dự kiến, discovered và đã thực thi;
- số `Pass`, `Fail`, `Blocked`;
- số screenshot thật đã tạo/cập nhật;
- số báo cáo chi tiết BVA/DomainTesting đã tạo/cập nhật;
- số Issue mới, Issue cập nhật, Issue được gộp và trạng thái của chúng;
- số dòng Traceability Matrix;
- browser/version, OS, URL, build/commit của lần chạy;
- kết quả kiểm tra link, Markdown và traceability;
- dependency, config, server, credential hoặc dữ liệu còn là blocker;
- số spec bị `Blocked` do lệch Test data, cùng TC-ID và trường/tiền đề lệch;
- các process do skill khởi động đã được dừng hay vẫn cần giữ theo yêu cầu người dùng.

Không nói “đã chạy thành công” nếu mới chỉ kiểm tra cú pháp/discovery hoặc nếu toàn bộ test bị Blocked.
