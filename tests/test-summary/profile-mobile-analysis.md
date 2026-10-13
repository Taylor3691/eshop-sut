# Pool D — FR-04 / FR-20: Hồ sơ cá nhân trên Mobile

Trạng thái: đã hoàn thành bản thiết kế theo 9 bước của skill `domain-testing-bva`, sẵn cho human review; chưa execute, chưa phê duyệt. Người dùng yêu cầu bắt đầu Pool D; chỉ dẫn này không xác nhận review/phê duyệt Pool A/B/C.

## Requirement Analysis

### Requirement

- ID: FR-04; FR-20 (phần Hồ sơ), SEC-02, SEC-04, SEC-06 liên quan trực tiếp.
- Feature: Quản lý hồ sơ cá nhân trên Mobile; tái sử dụng FR-04 theo lựa chọn đã ghi trong context.
- Module: PROFILE-MOBILE; giao diện React Native và API hồ sơ dùng chung.
- Oracle: [README FR-04](../../README.md#fr-04-quản-lý-hồ-sơ-cá-nhân), FR-20 và SEC trong README; [API mục 2](../../api_specification.md) cho endpoint/body.
- Template: `ref/03 - github_testcase_management.pptx.pdf`, trang 5–7; HW02 yêu cầu phân tích Domain/BVA và commit từng bước. Context và ref giữ local, không commit.
- Ngoài phạm vi: validation đăng ký/đăng nhập, giỏ hàng/checkout, lịch sử/hủy đơn dù cùng màn hình, toàn bộ GUI/security, Web/Admin và sửa code. Login/logout chỉ là điều kiện hoặc chuyển trạng thái cần cho hồ sơ.
- Pool D là lựa chọn feature Mobile đã được cho phép, không phải “mục thứ tư” trong danh sách Mobile của PDF.

### Functional Rules

R-PM-* là nhãn truy vết nội bộ, không tạo requirement mới.

| Nhãn | Quy tắc | Nguồn |
|---|---|---|
| R-PM-01 | Người đã đăng nhập sửa name, phone, địa chỉ mặc định của chính mình; dữ liệu lưu phải đọc lại được | FR-04; FR-20 |
| R-PM-02 | Phone bắt đầu bằng 0 và gồm 10–11 chữ số | FR-04 |
| R-PM-03 | Email không thể sửa qua UI Mobile | FR-04; FR-20 |
| R-PM-04 | Chỉ sửa hồ sơ của chủ thể đã xác thực; đổi tài khoản không được sửa nhầm người | FR-04 |
| R-PM-05 | Client không được tự đổi role | FR-04; SEC-06 |
| R-PM-06 | API hồ sơ bảo mật yêu cầu JWT hợp lệ | SEC-02 |
| R-PM-07 | Dữ liệu user đến điểm hiển thị được hiển thị an toàn | SEC-04 |

### Preconditions

- Tester chuẩn bị backend local, app Expo Go/emulator/thiết bị và API client đọc lại. Agent không khởi động SUT hoặc execute.
- Hai tài khoản user A/B khác nhau, baseline name/phone/address/email/role và ID thực đã xác minh; token runtime hợp lệ.
- Mobile và API client truy cập cùng backend/database. `API_URL` trong `frontend-mobile/App.js` hiện là địa chỉ LAN; tester kiểm tra cấu hình thực tế, không giả định localhost của điện thoại là máy backend.
- Fixture có kiểm soát độc lập với form đang kiểm thử; không dùng phone sai FR-04 để vượt validation.
- Không restart backend giữa thao tác/readback vì startup reset/reseed database; mỗi case khôi phục baseline độc lập.

### Inputs

| Variable | Type | Description | Constraint |
|---|---|---|---|
| name | Chuỗi native TextInput / JSON | Họ Tên | Cho phép sửa; chưa có giới hạn length/required/trim |
| phone | Chuỗi native TextInput / JSON | Số điện thoại | Prefix 0, 10–11 chữ số; không chuyển thành number làm mất 0 |
| shipping_address / ô Địa chỉ | Chuỗi | Địa chỉ giao hàng mặc định | Cho phép sửa; API chính thức dùng `shipping_address` |
| email UI | Chuỗi từ user hiện tại | Email chỉ đọc | Không sửa qua giao diện |
| role / extra selectors | Thuộc tính hoặc ID do client gửi thêm | Thử đổi quyền/chọn người khác | Không được đổi role hoặc ghi hồ sơ B bằng token A |
| Authorization | Header JWT | Chủ thể thao tác | Token hợp lệ cho API bảo mật |
| session / active account | Trạng thái | Chưa login, A, logout A, login B | Dữ liệu/ghi cập nhật phải thuộc đúng người đang login |
| entry / display surface | Native UI hoặc API companion | Gõ/dán, form/header | Keyboard không thay thế validation; không áp HTML DOM assertions |

### Expected Outputs / Behaviors

- Phone hợp lệ được chấp nhận; leading zero được giữ. Phone sai prefix/length/chứa ký tự khác chữ số không được lưu thành phone hợp lệ.
- Sửa từng trường hoặc ba trường lưu đúng profile; các trường không sửa, email/role và profile đối chứng giữ nguyên.
- Dùng GET có token hợp lệ và logout/login lại Mobile để phân biệt dữ liệu server với state cục bộ; chỉ thấy thông báo thành công hoặc rời/quay lại màn hình chưa đủ chứng minh persistence.
- Email không sửa bằng gõ/dán native; không yêu cầu `type=email`, `h1`, DOM/innerHTML hoặc vị trí lỗi browser.
- Thiếu/sai JWT không trả hồ sơ bảo mật hoặc sửa dữ liệu. Body/query không được ghi B bằng token A; server có thể từ chối hoặc bỏ qua selector nhưng không đổi sai chủ thể.
- Role không thể được nâng thành admin; được kiểm tra qua server và login mới.
- Chuỗi giống markup, nếu tới điểm hiển thị, là văn bản an toàn trên native UI; không thực thi/diễn giải markup thành nội dung hoạt động.
- Không ấn định mã HTTP, nguyên văn Alert/toast, maxLength, timeout, layout/keyboard height hoặc lưu token qua app restart.

### Assumptions

- AS-PM-01: Dùng chữ số ASCII để có oracle rõ cho phone; độ dài là độ dài chuỗi giữ nguyên leading zero. Không tự kết luận Unicode digits.
- AS-PM-02: Các tên/địa chỉ tiếng Việt thông thường trong fixture là dữ liệu được hỗ trợ; không suy ra mọi chuỗi/blank/null đều hợp lệ.
- AS-PM-03: “Cập nhật” nghĩa dữ liệu được lưu và phản ánh qua GET/login mới; không yêu cầu app tự refresh realtime khi server đổi trong phiên.
- AS-PM-04: Logout làm mất quyền sửa hồ sơ trong phiên Mobile; không yêu cầu thu hồi ngay JWT cũ trên server hoặc persistence token qua cold restart.
- AS-PM-05: Đối chiếu cùng ID, snapshot API và Mobile; các field không sửa giữ nguyên theo cập nhật hồ sơ, không yêu cầu partial PUT.
- AS-PM-06: Safe-render cases dùng fixture được chuẩn bị có kiểm soát nếu API không chấp nhận markup; kết quả display chỉ đánh giá khi dữ liệu thật sự đến điểm hiển thị.

### Ambiguities

| ID | Nội dung chưa rõ | Xử lý |
|---|---|---|
| AM-PM-01 | Name/address required, min/max length, blank/null, trim và xuống dòng | Chỉ nominal tiếng Việt; không invent BVA hoặc verdict cho multiline/blank |
| AM-PM-02 | Unicode digits; normalization/trim phone, định dạng quốc tế | BVA ASCII; negative nội bộ có letter/space/hyphen để không phụ thuộc trim đầu/cuối |
| AM-PM-03 | Exact response/schema/error placement; invalid form có atomic rollback mọi field không | Không đặt mã HTTP/wording hay thêm atomicity/concurrency case |
| AM-PM-04 | Email qua API, partial PUT, extra-field rejection | Email chỉ có UI oracle; body/query/role chỉ bảo vệ invariant, cho phép reject hoặc ignore |
| AM-PM-05 | Token expiry, lưu token khi restart, offline/retry, background refresh | Không dựng timeout/BVA hoặc kỳ vọng auto-login/realtime/revocation |
| AM-PM-06 | Danh sách OS/thiết bị được hỗ trợ, khác biệt clipboard/keyboard | Tester ghi OS/Expo/device; các native cases cần lặp trên nền tảng reviewer chọn, chưa tuyên bố cross-platform coverage |
| AM-PM-07 | API contract và Mobile implementation không khớp khi gửi địa chỉ; local UI state có thể che dữ liệu không lưu | Oracle là `shipping_address` và persistence; static observation chỉ định hướng checkpoint, chưa phải confirmed bug |
| AM-PM-08 | Markup có được chấp nhận làm name/address; chuẩn escape trên native | Chỉ đánh giá an toàn điểm hiển thị khi fixture tới nơi; không kết luận validation reject là Pass render |

### Static Review — điểm thiết kế riêng cho Mobile

- [App.js](../../frontend-mobile/App.js): `renderProfile` dùng native TextInput; email `editable={false}`, phone `keyboardType="phone-pad"`, địa chỉ multiline. Dán từ clipboard vẫn phải được kiểm tra bằng test dữ liệu; không suy ra keyboard chặn toàn bộ ký tự.
- `handleUpdateProfile` có regex phone khác FR-04; gửi `shippingAddress` trong body trong khi API specification dùng `shipping_address`; sau response cập nhật `user` cục bộ. Cases giữ Expected Result theo README/API.
- Login lấy user từ server và khởi tạo form; logout xóa user/token/các field. Persistence kiểm bằng login lại, không dựa app restart hoặc giả định AsyncStorage.
- API companions trực tiếp kiểm JWT/ownership/role; kết quả của chúng không thay kết quả validation/transport của native form, cũng không tự tính là Mobile UI coverage.

## Domain Analysis

| Variable | Data Type | Valid Domain | Invalid Domain(s) | Constraints / Notes |
|---|---|---|---|---|
| phone | Chuỗi ASCII | `0[0-9]{9,10}` theo requirement | Dưới 10 / trên 11 ký tự với prefix 0 và toàn chữ số; dài 10–11 nhưng prefix khác 0; chứa non-digit | Các lớp sai được cô lập bằng điều kiện phụ; rỗng thuộc dưới 10 |
| name | Chuỗi | Tên tiếng Việt thông thường, AS-PM-02 | Chưa xác định required/min/max/blank/trim | Chuỗi markup chỉ phân miền **hiển thị**, không mặc định valid input |
| shipping_address | Chuỗi | Địa chỉ tiếng Việt thông thường, AS-PM-02 | Chưa xác định length/blank/null/multiline | Form native phải lưu đúng trường API; không ép client state là server truth |
| email UI | Chuỗi chỉ đọc | Email hiện tại của user đăng nhập | Thao tác gõ/dán không được làm email đổi | Không suy ra email API immutable hoặc HTML type |
| role / quyền sửa | Thuộc tính enum | User giữ role `user`; không có UI tự đổi quyền | Client cố gửi `role=admin` | Không tạo BVA cho enum hoặc số hóa role |
| JWT | Header/claims | Token thật của A/B còn hợp lệ | Thiếu, sai định dạng, payload sửa ID nhưng giữ signature cũ | Không đặt expiry; API GET và PUT là các thao tác riêng |
| owner / selector | ID/chủ thể | Token A sửa A; token B sửa B | Token A yêu cầu chọn B qua body/query | ID runtime là identity, không phải numeric boundary |
| session | Trạng thái enum | Đã login A/B; B sau logout A | Chưa login hoặc đã logout mà còn được cập nhật profile | Không yêu cầu server revoke token cũ; chỉ native session |
| user content tại display | Chuỗi đã tới renderer | Plain text an toàn, kể cả giống markup | Diễn giải/thực thi dữ liệu user thành nội dung hoạt động | SEC-04 áp tại form/header native, không DOM; acceptance chưa rõ |
| entry method | Native gõ/dán; API companion | Cùng rule phone cho gõ/dán | Bypass validation vì paste hoặc phone-pad | Là kênh thực thi của các phone partitions, không tạo business partition mới |
| server data → form / after save | Snapshot theo ID | Form/login mới phản ánh profile hiện tại cùng backend | Chỉ local state đổi hoặc profile của chủ thể cũ lẫn sang user mới | Flow dependency, bao phủ bằng owner/session/name/address, không giả tạo length limit |

### Dependencies và miền kết hợp

- Prefix, digits và length phải đồng thời đúng. BVA length luôn giữ prefix 0 và ASCII digits; format-negative dài 10 để chỉ làm sai format.
- Mọi positive update giữ phone hợp lệ; không thay bằng phone sai để đi qua regex implementation.
- Name-only/address-only giữ các field khác baseline; three-field case dùng cả ba hợp lệ và đối chiếu A/B. Không giả định atomic rollback cho request đa lỗi.
- JWT, owner, role và session phụ thuộc nhau: token A chỉ cho sửa A, đổi sang B phải tải B và dùng token B.
- Persistence: GET là readback độc lập; login mới là native checkpoint. Đi ra/vào profile trong cùng phiên có thể chỉ đọc React state.
- API companions dùng body chính thức `name/phone/shipping_address`; case native không tự sửa payload do app gửi. Nếu valid phone bị chặn trước network, ghi điểm dừng và hạn chế downstream coverage.
- Safe-display fixture cần đến renderer; nếu không tới, không nhận là đã kiểm chứng SEC-04. Không xét “hiển thị an toàn” là một quy tắc chấp nhận mọi markup.

## Equivalence Partitions

| Partition ID | Variable | Class | Condition | Representative Value | Requirement |
|---|---|---|---|---|---|
| EP-PM-01 | phone | VALID | Bắt đầu 0, 10–11 ASCII digits | 0912345678 / 09123456789 | FR-04; FR-20 |
| EP-PM-02 | phone.length | INVALID | Rỗng hoặc <10; giá trị không rỗng vẫn giữ prefix 0/all-digits | 091234567 (9); chuỗi rỗng | FR-04; FR-20 |
| EP-PM-03 | phone.length | INVALID | >11; giữ prefix 0/all-digits | 091234567890 (12) | FR-04; FR-20 |
| EP-PM-04 | phone.prefix | INVALID | Dài 10–11/all-digits nhưng không bắt đầu 0 | 1912345678 | FR-04; FR-20 |
| EP-PM-05 | phone.characters | INVALID | Dài 10, bắt đầu 0, có non-digit | 0A12345678; 09123 5678; 09123-5678 | FR-04; FR-20 |
| EP-PM-06 | name | VALID | Tên thông thường theo AS-PM-02 | Lê Thị Mai | FR-04; FR-20 |
| EP-PM-07 | shipping_address | VALID | Địa chỉ thông thường theo AS-PM-02 | 35 Nguyễn Huệ, Phường Bến Nghé, TP.HCM | FR-04; FR-20 |
| EP-PM-08 | email UI | INVALID | Thử thay email qua native UI | mobile.changed@example.com | FR-04; FR-20 |
| EP-PM-09 | role UI | VALID | Chủ thể user không có thao tác tự đổi role | role=user | FR-04; FR-20; SEC-06 |
| EP-PM-10 | role client | INVALID | Gửi role khác từ client để nâng quyền | role=admin | FR-04; SEC-06 |
| EP-PM-11 | JWT | VALID | Token thật, hợp lệ của tài khoản hiện tại | TOKEN_A / TOKEN_B runtime | SEC-02 |
| EP-PM-12 | JWT | INVALID | Không có Authorization | Header vắng mặt | SEC-02 |
| EP-PM-13 | JWT | INVALID | Chuỗi không phải JWT hợp lệ | Bearer not-a-jwt | SEC-02 |
| EP-PM-14 | JWT | INVALID | Payload ID đổi nhưng chữ ký cũ | TOKEN_A_TAMPERED: id=B_ID | SEC-02; FR-04 |
| EP-PM-15 | owner | VALID | Chỉ đọc/sửa profile chính chủ | TOKEN_A → A_ID; TOKEN_B → B_ID | FR-04; FR-20 |
| EP-PM-16 | owner selector | INVALID | Token A nhưng selector body/query trỏ B | id=B_ID / user_id=B_ID | FR-04 |
| EP-PM-17 | session | INVALID | Chưa login mà yêu cầu profile update | Phiên app không user/token | FR-04; FR-20 |
| EP-PM-18 | session | INVALID | Đã logout A nhưng còn quyền/dữ liệu sửa A trong app | Logout → Hồ sơ | FR-04; FR-20; AS-PM-04 |
| EP-PM-19 | session / owner | VALID | Login B sau logout A; form/save chỉ tác động B | A → logout → B | FR-04; FR-20 |
| EP-PM-20 | name tại display | VALID | Markup-like string đã đến native renderer, phải an toàn | `<b>Tên thử</b>` | SEC-04; FR-20 |
| EP-PM-21 | address tại display | VALID | Markup-like address đã đến native renderer, phải an toàn | `<b>Địa chỉ thử</b>` | SEC-04; FR-20 |

21 partitions cho miền đã có oracle hoặc assumption ghi rõ. EP-PM-20/21 là VALID **tại domain hiển thị an toàn**, không khẳng định API/UI phải chấp nhận chuỗi markup. Name/address chưa có invalid input partitions với oracle đáng tin; AM-PM-01 giữ phần đó chưa xác định.

- EP-PM-08 phân loại **thao tác đổi email** INVALID; email hiện tại vẫn là dữ liệu hợp lệ và được quan sát trong các own-profile cases.
- EP-PM-09 thể hiện cấu hình quyền UI hợp lệ; negative client change nằm EP-PM-10. Không yêu cầu native app có TextInput role để thực hiện negative.
- EP-PM-12/13 mỗi lớp có GET và PUT để không dùng kết quả read thay update.
- EP-PM-16 có body và query representatives; reject/ignore được phép nếu không ghi B. Không áp “mọi extra field phải bị từ chối”.
- Entry method gõ/dán, việc thay từng field và đọc server/login mới là variation/interaction trong partitions sẵn có, không tạo lớp chỉ để tăng số đếm.

## Boundary Analysis

| Variable | Lower Boundary | Upper Boundary | Inclusiveness | Requirement | Notes |
|---|---:|---:|---|---|---|
| B-PM-01: phone.length | 10 | — | Inclusive | FR-04; FR-20 | ASCII string, bắt đầu 0, toàn digits; 9 ngay dưới; 11 ngay trên |
| B-PM-02: phone.length | — | 11 | Inclusive | FR-04; FR-20 | Cùng điều kiện; 10 ngay dưới; 12 ngay trên |

- Có 2 biên cho cùng miền integer length [10,11]. Prefix/digit validity là categorical; không làm BVA với giá trị số điện thoại hoặc số hóa ký tự 0/1.
- Name/address chưa có giới hạn. **AMBIGUITY:** Đặc tả không định nghĩa exact boundary; chưa thể hoàn tất BVA đáng tin cho các biến này (AM-PM-01).
- Email/role/JWT/owner/session/display/entry method không có ordered threshold trong phạm vi. Token expiry chưa có mốc thời gian nên không tạo BVA (AM-PM-05).
- Không đặt min/max ID, kích thước màn hình, keyboard height, thời gian network hoặc số retry. Platform differences ghi fixture/review, không tự biến thành boundary requirement.

## BVA Values

| Variable | Boundary | Test Value | Classification | Reason |
|---|---|---|---|---|
| phone.length | B-PM-01: min−1 | `091234567` (9) | INVALID / EP-PM-02 | Ngay dưới min=10 |
| phone.length | B-PM-01: min; B-PM-02: max−1 | `0912345678` (10) | VALID / EP-PM-01 | Tại min, ngay dưới max |
| phone.length | B-PM-01: min+1; B-PM-02: max | `09123456789` (11) | VALID / EP-PM-01 | Ngay trên min, tại max |
| phone.length | B-PM-02: max+1 | `091234567890` (12) | INVALID / EP-PM-03 | Ngay trên max=11 |

Robust BVA cho khoảng ngắn [10,11] rút thành **4 giá trị riêng biệt**, không tạo case trùng min+1/max hoặc max−1/min. Nominal dùng 10 trong cases EP; không có integer length nằm giữa 10 và 11.

- 4 cases BVA trên native form bằng gõ; đều giữ name/address baseline và phone ASCII bắt đầu 0. Leading zero phải tồn tại trong GET và login mới đối với positive cases.
- Dán phone hợp lệ dùng 11 chữ số là variation EP của native entry, không đếm thêm boundary.
- Empty phone là EP dưới min, không gọi là “biên mới”; letter/internal-space/hyphen có độ dài 10 và prefix đúng để cô lập format.
- Sau tinh gọn Pool A, API-negative phone BVA 007–008 còn active để reuse khi regression backend; positive 10/11 dùng UI 001–002 với GET/reload, không còn direct-API positive BVA. Không đếm lại là Pool D native coverage. Pool D trực tiếp kiểm native validation/persistence và API companions về auth/ownership/role.

## Generated Test Cases

- Bộ cases/fixture: [profile-mobile/README](../test-cases/profile-mobile/README.md).
- ID ổn định: TC-PROFILE-MOBILE-001–030; từng case một file, đúng 8 heading template, status `Not Run / None`.
- 30 cases: 4 BVA + 26 EP; 19 Native UI, 8 API companion, 2 Fixture → Native UI, 1 API → Native UI. Không đếm API companions là native save.
- 001–004: phone length 9/10/11/12 bằng native gõ; 005–009: prefix/letter/internal-space/hyphen/rỗng; 010: valid paste.
- 011–013: name-only/address-only/ba field và server persistence; 014–019: email, role UI, anonymous/logout/account-switch/load đúng profile.
- 020–027: API GET/PUT thiếu/sai JWT, role, selectors và JWT thay ID; 028–029: native safe display; 030: server update → fresh native login.
- Mỗi positive giữ phone đúng FR-04; input clipboard và API companion có kênh rõ. API metadata/GET/fresh login đủ phân biệt native local state với server.
- Chưa execute, chưa có bug evidence; case bị chặn trước request không chứng minh coverage downstream. Acceptance markup/unknown domains không được âm thầm biến thành requirement.

## Coverage Summary

- Requirements analyzed: FR-04, FR-20 (chỉ phần Hồ sơ), SEC-02, SEC-04, SEC-06; không tuyên bố bao phủ toàn bộ các FR/SEC liên quan.
- Variables identified: 11 nhóm trong Domain Analysis; entry method/data flow là dependencies của partitions, không invent business classes.
- Equivalence partitions: 21 (9 VALID, 12 INVALID).
- Partitions covered: 21/21 có thiết kế; EP-PM-06/07 dùng AS-PM-02, EP-PM-18 dùng AS-PM-04; EP-PM-20/21 có điều kiện dữ liệu đến renderer.
- Boundaries identified / covered: 2/2 phone-length; 4/4 giá trị riêng 9/10/11/12 trên native form.
- Test cases generated: 30 (4 BVA + 26 EP); 19 Native UI + 8 API companion + 2 Fixture → Native UI + 1 API → Native UI.
- Traceability: [ma trận chung](traceability-matrix.md#pool-d--fr-04--fr-20-hồ-sơ-mobile), mapping rule/partition/boundary/case và kênh. Sau tinh gọn Pool A/B/C, A/B/C/D có tổng 129 cases (96 EP + 33 BVA), tất cả Not Run / None.

### Checklist thiết kế

- [x] Inputs có thể kiểm thử đã phân tích; phần chưa xác định ghi ambiguity.
- [x] Các lớp valid/invalid đã xác định có case; không gọi unspecified name/address invalid domains là đã phủ.
- [x] Lower/upper và ngay dưới/trên covered; overlapping values 10/11 không nhân cases.
- [x] Phone prefix/digits/length, gõ/dán, name/address + valid phone, email/role, identity/session và server/native data flow được xét.
- [x] Mỗi case có requirement, technique, Test Data, steps, observable Expected Result; không lấy static implementation làm oracle.
- [x] API companions và fixture/display flows có kênh riêng; không kết luận native server contract đúng từ API body được gửi thủ công.
- [x] Status thiết kế không dùng Actual Result/Pass-Fail; chưa có execution/bug evidence.

### Potential Coverage Gaps

- Chưa có device/OS matrix, Unicode/blank/null/trim/length rules, expiry/retry/offline requirements hoặc acceptance markup; không thể khẳng định requirement coverage toàn bộ.
- Native phone validation có thể chặn valid update trước network; khi execute cần ghi checkpoint và giới hạn persistence/address coverage. Case 030 chỉ kiểm chiều server → Mobile, không thay native save.
- Safe-render 028/029 với markup vô hại chỉ kiểm native surfaces đã nêu; không exhaust payloads, WebView, screen khác hoặc platforms chưa chạy.
- Backend negative phone BVA reuse từ Pool A 007–008; direct-positive API BVA Pool A đã giảm ưu tiên. Không có Pool D duplicate API BVA. Reviewer cân nhắc regression nếu backend thay đổi.
- Chưa có concurrency/đa thiết bị, transaction rollback, partial PUT, email API mutation hoặc JWT revoked/expired coverage vì oracle chưa rõ hoặc ngoài phạm vi.

### Assumptions

AS-PM-01–06 được ghi tại Requirement Analysis; đặc biệt persistence bằng GET/login mới, ASCII phone và native logout không đồng nghĩa JWT revocation.

### Ambiguities Requiring Clarification

AM-PM-01–08 còn mở. Chưa có giới hạn name/address; transport `shipping_address` lấy theo API contract, acceptance/runtime và lỗi thực tế chỉ xác nhận khi người dùng execute. Chưa tự coi human review đã hoàn tất.

## Human Review Required

Thiết kế sẵn để reviewer kiểm tra, **chưa được phê duyệt**. Checklist này không phải kết quả review của con người.

1. Xác nhận lựa chọn Pool D là hồ sơ Mobile FR-04 liên hệ FR-20; không hiểu FR-20 là thêm toàn bộ login/cart/history vào phạm vi. Việc yêu cầu Pool D không xác nhận A/B/C đã review.
2. Kiểm tra R-PM-01–07 có diễn giải sai không; xác nhận AS-PM-01–06, đặc biệt ASCII digits, nominal name/address, server persistence và native logout.
3. Xác nhận 21 partitions không bỏ lớp quan trọng; name/address blank/null/trim/Unicode và phone normalization cần yêu cầu rõ trước khi thêm verdict.
4. Kiểm 2 boundaries inclusive 10/11 và 4 values 9/10/11/12; không đếm trùng min+1/max, không dùng integer phone/ID hoặc thêm maxLength từ code.
5. Kiểm native steps: gõ/dán, header lời chào, email readonly, “Thoát”, session A → B. Chọn OS/device matrix và ghi cách clipboard thực thi nếu nền tảng khác nhau.
6. Kiểm Expected Result và field mapping: dữ liệu phải đúng server `shipping_address`, GET/login mới theo ID. Không lấy regex/request/local state hiện tại làm oracle. Case update bị chặn phải ghi checkpoint và downstream limitation.
7. Đánh giá tính cần thiết của API companions 020–027 so với Pool A: giữ chúng nếu cần bộ Mobile/API độc lập; có thể reuse sau review nhưng không biến API results thành native coverage. Check rejects/ignore selectors/role chỉ theo invariant; email API/expiry chưa có oracle.
8. Kiểm 028/029 chỉ là safe-display probes có điều kiện; chuẩn bị fixture/khôi phục được và không dùng rejection trước render làm Pass. Đánh giá các risk chưa covered: supported OS, offline/retry, partial PUT, concurrency, token lifecycle.
9. Kiểm redundancy giữa native initial-load 019 và server-update → fresh-login 030: chúng có precondition/data-flow khác nhau; 030 không thay native save 011–013.
10. Reviewer quyết định chấp nhận/sửa từng ambiguity và test; chỉ ghi phê duyệt hoặc execution khi có review/evidence thật. Agent không tạo Actual Result/bug report hoặc AI Audit Report trong nhiệm vụ này.

## AI Gap Candidates

Các mục sau là **ứng viên thiếu coverage/thiếu oracle**, chưa phải AI gap được con người xác nhận hoặc bug SUT. Không phải AI Audit Report/log.

### Candidate 1 — Miền chuỗi và normalization chưa có oracle

- Possible missed case: Name/address blank/null/multiline/Unicode length; phone Unicode digits hoặc chuẩn hóa input đầu/cuối.
- Why it may have been missed: AM-PM-01/02 không định nghĩa required/length/trim/Unicode; current design chỉ ASCII phone và nominal text, không thể gán valid/invalid đáng tin.
- Human action required: Bổ sung rule rồi phân miền/cases; chỉ tạo BVA khi có exact boundary, không lấy giới hạn implementation làm requirement.

### Candidate 2 — Native validation che downstream persistence/transport

- Possible missed case: Quan sát request địa chỉ và dữ liệu server sau native update hợp lệ khi validation chặn trước network.
- Why it may have been missed: Static review cho thấy phone regex/payload khác oracle và user state đổi cục bộ. 011–013 đã thiết kế readback nhưng execution có thể dừng trước transport; 030 chỉ chiều server → Mobile.
- Human action required: Execute giữ phone hợp lệ, ghi checkpoint và hạn chế. Nếu native request chưa được gửi, không kết luận field mapping Pass; reviewer lên lịch kiểm lại khi đường update hợp lệ hoạt động, không bypass bằng phone sai hoặc sửa body để đánh Pass.

### Candidate 3 — Platform/clipboard matrix chưa được xác định

- Possible missed case: Khác biệt gõ/dán phone, email readonly và native markup display giữa các OS/device được hỗ trợ.
- Why it may have been missed: AM-PM-06 thiếu danh sách platform; thiết kế 006–010/014/028–029 chưa có execution trên thiết bị nào.
- Human action required: Chọn supported OS/device/Expo versions và lặp cases phù hợp, ghi evidence theo môi trường. Không tuyên bố cross-platform coverage từ nguồn React Native chung.

### Candidate 4 — Session lifecycle và failure recovery chưa có rule

- Possible missed case: Profile khi token hết hạn, app resume/cold restart, network mất trong save, retry hoặc refresh background.
- Why it may have been missed: AM-PM-05 không có expiry/timeout/storage/offline semantics; 017/018 chỉ kiểm logout và switch user bình thường.
- Human action required: Làm rõ desired behavior rồi thêm state/interaction cases; không tự đặt token TTL, auto-login, request retries hoặc rollback policy.

### Candidate 5 — Acceptance và phạm vi safe display

- Possible missed case: Đường native input → server → renderer với markup khác hoặc surface mới trong phạm vi hồ sơ.
- Why it may have been missed: AM-PM-08 chưa rõ acceptance; 028/029 dùng fixture/probe vô hại và chỉ form/header. Không chứng minh toàn bộ SEC-04 từ hai smoke cases.
- Human action required: Xác định rule acceptance và surfaces/platforms được hỗ trợ; bổ sung probes nếu có lý do. Chỉ xác nhận display coverage khi dữ liệu đã tới renderer, không dùng rejection trước đó làm bằng chứng.

### Kết quả bàn giao thiết kế

- Đã hoàn thành 9 bước của skill, 30 cases và ma trận; sẵn cho human review, chưa phê duyệt.
- Kiểm tra tài liệu: IDs/headings/status/technique/steps/data, literal BVA, JSON templates, 21 partition mappings, 2 boundary mappings, local links và số đếm A/B/C/D.
- Không khởi động backend/Expo, gọi API, thao tác app, execute test cases hoặc tạo evidence/confirmed bug. Không sửa mã ứng dụng, push hoặc tạo GitHub Issues.
