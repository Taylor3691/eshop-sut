# Agent Skill: Xây dựng Cypress Test Script từ Test Case

## Mục tiêu

Đọc các test case Markdown trong `test/test-cases/`, đối chiếu với source hiện tại và tạo Cypress E2E spec tương ứng trong `test/test-scripts/`. Mỗi spec phải có thể chạy được khi môi trường đã được cung cấp, hoặc được đánh dấu `it.skip()` với nguyên nhân có thể hành động được.

Skill phân biệt rõ hai phạm vi:

- **Sinh/cập nhật spec**: chỉ tạo script và các fixture/helper thuộc `test/test-scripts/`; không tự cài dependency, sửa cấu hình hay source ứng dụng.
- **Hoàn thiện môi trường chạy**: chỉ thực hiện khi người dùng nói rõ cho phép cài Cypress hoặc sửa `package.json`/Cypress config. Khi đó, tạo cấu hình tối thiểu để Cypress phát hiện được toàn bộ spec và không ghi credential vào repository.

Luồng ánh xạ bắt buộc:

```text
test/test-cases/<Loại kiểm thử>/FeatureX/<TC-ID>.md
  -> test/test-scripts/<Loại kiểm thử>/FeatureX/<TC-ID>.cy.js
```

Ví dụ: `test/test-cases/DomainTesting/Feature1/TC-REG-001.md` tạo `test/test-scripts/DomainTesting/Feature1/TC-REG-001.cy.js`.

## Đầu vào và truy vết

Mỗi testcase hợp lệ phải có các phần: tiêu đề `# <TC-ID>: ...`, `Requirement ID`, `Module / Test type / Technique`, `Preconditions`, `Test data`, `Test steps`, `Expected result`, `Status / Related Bugs`.

Mỗi spec:

- có đúng một `it()` hoặc `it.skip()` chứa đúng `TC-ID`;
- giữ nguyên loại kiểm thử, feature và tên `<TC-ID>.cy.js`;
- mở đầu bằng các comment truy vết:

```js
// Source: test/test-cases/<Loại kiểm thử>/FeatureX/<TC-ID>.md
// Requirement: <Requirement ID>
// Technique: <Technique>
```

`Status / Related Bugs` trong testcase chỉ là dữ liệu quản lý; không được tự ý sửa khi tạo script.

## Bảo toàn Test data bắt buộc

`Test data`, `Preconditions`, `Test steps` và `Expected result` trong testcase nguồn là nguồn sự thật. Script phải giữ nguyên giá trị và ngữ nghĩa của chúng, gồm cả giá trị rỗng, `null`, giá trị biên, coupon code, email, password, tên sản phẩm, số lượng và trạng thái dữ liệu.

Không được thay thế hoặc tự sinh Test data chỉ để script tiện chạy, bao gồm dùng `Date.now()`, `Math.random()`, UUID, timestamp, faker, email/password/coupon/sản phẩm khác hoặc dữ liệu “tương đương”. Setup chỉ được phép tái tạo đúng precondition mà testcase đã mô tả hoặc dẫn chiếu rõ; không được làm thay đổi dữ liệu đầu vào chính của testcase.

Trước khi tạo một test active, thực hiện cổng đối chiếu dữ liệu:

1. Đối chiếu từng giá trị trong `Test data` với giá trị được nhập qua UI, gửi qua API, fixture và helper.
2. Xác minh fixture/helper tái tạo đúng `Preconditions` của testcase.
3. Xác minh không có dữ liệu sinh động hoặc mapping thay thế dữ liệu testcase.
4. Chỉ dùng mapping khi testcase hoặc tài liệu Test data mà testcase dẫn chiếu định danh rõ giá trị cần dùng.

Nếu chưa thể bảo toàn hoặc tái tạo an toàn Test data/Preconditions, tạo `it.skip()` cho đúng TC-ID và ghi rõ trường/tiền đề còn thiếu cùng lý do. Không tạo test active bằng dữ liệu thay thế.

## Ánh xạ trường requirement, UI và API

Tên trường trong requirement/Test data là tên chuẩn để truy vết, ví dụ `type`, `discount_value`, `expired_at`, `min_order_amount` và `max_uses_per_user`. Nhãn tiếng Việt trên UI chỉ là cách hiển thị; ghi rõ mapping đã xác minh khi script dùng nhãn đó, nhưng không đổi giá trị kỹ thuật trong Test data.

Khi cần tìm control, ưu tiên bằng chứng source theo thứ tự: `data-testid`/`data-cy`, `id` hoặc `name`, label truy cập được (`label`, `aria-label`, `role`), rồi placeholder thực tế. Không dùng vị trí input, CSS class trình bày, index hoặc text suy đoán làm selector. Placeholder chỉ là fallback khi source xác nhận chính xác và script phải đặt selector trong đúng form/module để tránh trùng lặp.

Với select có nhãn hiển thị khác enum kỹ thuật, chọn theo `value` đã xác minh (ví dụ `percent` hoặc `fixed`) và chỉ assert tiếng Việt khi đang kiểm tra UI. Với placeholder thay đổi theo lựa chọn type, chọn type trước rồi mới tìm input theo placeholder phù hợp.

Nếu testcase kiểm dữ liệu mà UI chủ ý không cho nhập (ví dụ type rỗng hoặc ngoài tập), chỉ tạo API-level test khi testcase nêu rõ đường API và source xác minh endpoint/payload. Không thao tác DOM bằng JavaScript để giả lập giá trị ngoài UI; nếu thiếu căn cứ API, dùng `it.skip()`.

## Khảo sát trước khi viết

Trước khi tạo hoặc cập nhật spec, kiểm tra source và cấu hình thực tế để xác minh:

1. Route, phần tử UI, thông báo, request/response trong frontend phù hợp (`frontend-web`, `frontend-admin` hoặc ứng dụng web liên quan).
2. Endpoint, method, payload, xác thực, seed data và cơ chế reset/cleanup trong backend.
3. `package.json`, lockfile, Cypress config, helper, fixture và convention hiện có.
4. URL của từng frontend; không đoán port hoặc dùng một `baseUrl` cho hai ứng dụng khác nhau.
5. File spec đích đã tồn tại hay chưa; không ghi đè phần chỉnh tay khi chưa hiểu cách hợp nhất an toàn.

Không tự bịa selector, endpoint, dữ liệu nền, thông báo hoặc expected result. Không dùng production data hay secret thật.

## Quy tắc Cypress chung

- Framework là Cypress E2E, file JavaScript có hậu tố `.cy.js`.
- Mỗi test chạy độc lập. Setup và cleanup phải dùng UI, API hoặc helper đã được source xác nhận.
- Dùng `cy.intercept()` trước hành động tạo request và `cy.wait('@alias')` khi cần đồng bộ; không dùng `cy.wait(<mili-giây>)`.
- Chỉ dùng `cy.request()` cho setup/cleanup hoặc API test khi endpoint tương ứng có trong backend.
- Không dùng `it.only`, `describe.only`, `{ force: true }` hoặc assertion luôn đúng để che lỗi.
- Không trộn tùy tiện `async/await` với command chain Cypress.
- Tuân thủ thứ tự selector tại mục **Ánh xạ trường requirement, UI và API**. Không thêm `data-cy` vào app nếu nhiệm vụ không cho phép sửa app.
- Một expected result phải có ít nhất một assertion có thể quan sát. Dùng `.should()` để tận dụng retry tự động của Cypress.

## Credential không nhạy cảm cho luồng admin

Test admin không được hard-code email, mật khẩu, token hoặc đọc secret từ source code/fixture. Dùng biến môi trường Cypress:

```js
const adminEmail = Cypress.env('ADMIN_EMAIL')
const adminPassword = Cypress.env('ADMIN_PASSWORD')
const hasAdminCredentials = Boolean(adminEmail && adminPassword)
const adminIt = hasAdminCredentials ? it : it.skip
```

Sau đó dùng `adminIt('[TC-ID] ...', () => { ... })`. Mật khẩu luôn nhập với `{ log: false }`.

Tên biến chuẩn:

- `CYPRESS_ADMIN_EMAIL`
- `CYPRESS_ADMIN_PASSWORD`
- `CYPRESS_WEB_BASE_URL`
- `CYPRESS_ADMIN_BASE_URL`

Chỉ người chạy/CI cung cấp giá trị qua environment secrets. Không tạo file `.env` có secret, không commit secret và không thay thế chúng bằng credential seed có trong source. Nếu thiếu một biến bắt buộc, tạo `it.skip()` với comment nêu đúng tên biến còn thiếu; không đánh dấu là test pass.

Khi source xác nhận luồng login, có thể trích helper `loginAsAdmin()` vào `test/test-scripts/support/` và dùng `cy.session()` nếu session của ứng dụng cho phép. Helper không được che giấu credential hoặc làm mất truy vết TC-ID.

## Fixture sản phẩm và trạng thái giỏ hàng

`Sản phẩm A`, `Sản phẩm B` và mọi dữ liệu fixture đều là Test data. Chỉ tạo fixture khi testcase hoặc tài liệu Test data mà testcase dẫn chiếu định danh rõ sản phẩm/trạng thái chính xác; fixture phải chép đúng định danh đó và ghi chú nguồn đối chiếu.

Không được chọn sản phẩm đầu tiên từ UI/API, suy đoán “Sản phẩm A”, map sang seed product “tương đương” hoặc dùng dữ liệu giả. Nếu không có mapping được định danh rõ, dùng `it.skip()` và nêu thiếu mapping nào.

Với testcase giỏ hàng, fixture chỉ tái tạo đúng `Preconditions` và Test data đã nêu (sản phẩm, số lượng, giá trị, trạng thái). Cleanup được phép khi an toàn nhưng không được làm thay đổi dữ liệu kiểm thử của testcase.

## Phân biệt thiếu implementation và thiếu căn cứ tự động hóa

Không được chuyển một lỗi sản phẩm thành `it.skip()` chỉ vì source chưa hiện thực expected result.

- Nếu testcase mô tả được thao tác và kỳ vọng quan sát được (ví dụ nút `+`/`-`, xác nhận xóa, số lượng hàng), dùng chính text/semantics trong testcase cùng với setup đã xác nhận để viết active test. Nếu UI chưa có hoặc hành vi sai, test phải **Fail** khi chạy; đó là phát hiện hợp lệ.
- Nếu không có cách nào thiết lập trạng thái, xác định phần tử thao tác, hoặc quan sát kết quả mà không bịa dữ liệu/selector, dùng `it.skip()` và ghi bằng chứng còn thiếu.
- Với dialog có nội dung chưa được requirement nêu cụ thể, chỉ assert sự hiện diện/trạng thái và hành vi được yêu cầu; không đoán text của dialog.

Ví dụ, nếu source có nút `Xóa` nhưng không có bước xác nhận, test có thể click nút đã xác nhận và assert item vẫn còn khi testcase yêu cầu xác nhận trước khi xóa. Test fail sẽ phản ánh lỗi thiếu dialog; không skip chỉ vì dialog chưa tồn tại.

## URL và cấu hình chạy Cypress

Spec của web và admin phải lấy URL từ `Cypress.env('WEB_BASE_URL')` và `Cypress.env('ADMIN_BASE_URL')` tương ứng. Không hard-code URL/port chưa được source hoặc môi trường chạy xác nhận.

Nếu người dùng chỉ yêu cầu sinh script, không tự cài Cypress, tạo `cypress.config.*`, sửa `package.json`, lockfile hoặc source ứng dụng. Báo rõ phần môi trường còn thiếu.

Nếu người dùng **cho phép hoàn thiện môi trường chạy**, thực hiện theo thứ tự:

1. Chọn một Cypress project duy nhất phù hợp với cấu trúc repository; ưu tiên root dự án khi spec nằm tại `test/test-scripts/`.
2. Cài Cypress vào project đó và chỉ thêm script npm cần thiết để chạy/discovery.
3. Tạo/cập nhật config với `specPattern: 'test/test-scripts/**/*.cy.js'` và truyền URL qua environment variables, không nhúng secret.
4. Bảo đảm config không làm mất các thiết lập hiện có và xác minh `cypress run --list` hoặc lệnh discovery tương ứng.
5. Không tự khởi tạo hay xóa database; chỉ chạy server theo hướng dẫn project hoặc khi người dùng cho phép.

Một cấu hình chỉ minh họa hình dạng, không sao chép mù quáng khi module format hoặc cấu hình hiện có khác:

```js
e2e: {
  specPattern: 'test/test-scripts/**/*.cy.js',
}
```

## Mẫu cấu trúc spec

Thay toàn bộ route, selector, request và assertion bằng dữ liệu đã xác minh từ repository:

```js
// Source: test/test-cases/DomainTesting/Feature1/TC-REG-001.md
// Requirement: FR-01
// Technique: Equivalence Partitioning

describe('Feature1 - Đăng ký', () => {
  it('[TC-REG-001] Đăng ký thành công', () => {
    // Chép nguyên văn từ phần Test data của testcase nguồn.
    const email = '<email đúng nguyên văn từ Test data>'

    cy.intercept('POST', '**/api/register').as('register')
    cy.visit(`${Cypress.env('WEB_BASE_URL')}/register`)
    // Chỉ dùng selector đã kiểm chứng từ source.
    // ...thao tác UI...
    cy.wait('@register').its('response.statusCode').should('eq', 200)
  })
})
```

Không sao chép selector, URL hay HTTP status từ mẫu nếu source hiện tại không xác nhận chúng.

## Test bị chặn

Dùng đúng một `it.skip()` khi thiếu bắt buộc: cấu trúc testcase, URL chạy, credential qua environment, endpoint/selector có thể xác nhận, mapping fixture, quyền truy cập hoặc điều kiện setup không thể tái tạo an toàn.

Đặt comment ngay trên `it.skip()` theo mẫu:

```js
// Blocked: thiếu CYPRESS_ADMIN_EMAIL và CYPRESS_ADMIN_PASSWORD để đăng nhập admin qua môi trường chạy.
it.skip('[TC-ID] <tên testcase>', () => {})
```

Không để `TODO_SELECTOR`, URL giả hoặc assertion rỗng trong active test.

## Kiểm tra sau khi sinh

Trước khi báo cáo, kiểm tra:

- số testcase nguồn khớp số spec theo ánh xạ một-một;
- không thiếu/thừa TC-ID, path, source/requirement/technique comment;
- mỗi spec có đúng một `it()` hoặc `it.skip()` cho TC-ID;
- active test có setup, action và assertion phù hợp expected result;
- không có secret, selector/endpoint bịa, `it.only`, `describe.only`, hay `cy.wait(<số>)`;
- fixture/helper thực sự tồn tại và mapping của “Sản phẩm A/B” có bằng chứng source;
- mọi Test data/Preconditions trong spec, fixture và helper khớp nguyên văn testcase nguồn; không có dữ liệu sinh động hoặc dữ liệu thay thế;
- kiểm tra cú pháp JavaScript;
- nếu Cypress và môi trường sẵn sàng: kiểm tra discovery, sau đó chỉ chạy suite khi nhiệm vụ cho phép.

## Báo cáo bàn giao

Báo cáo ngắn gồm: số testcase đã đọc; số spec mới/cập nhật/giữ nguyên; số active và `it.skip`; fixture/helper đã tạo; các TC bị chặn cùng nguyên nhân; kết quả syntax/discovery/run; và dependency, URL server, credential hoặc quyền còn thiếu.

Việc sinh script không đồng nghĩa testcase đã chạy. Không cập nhật `Status / Related Bugs` trong testcase nguồn chỉ vì script được tạo.
