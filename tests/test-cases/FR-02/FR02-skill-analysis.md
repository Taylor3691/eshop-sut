# FR-02 — Domain Testing & BVA Analysis

> Oracle: `README.md`, FR-02. This document applies the `domain-testing-bva` workflow. The individual case files are indexed in [README.md](README.md); the source case table remains in [FR02_test_cases.md](FR02_test_cases.md), and previous execution results remain in [FR02-test-report.md](../../test-summary/FR-02/FR02-test-report.md).

## 1. Requirement Analysis

### Requirement
- ID: FR-02
- Feature: Đăng nhập và khóa tài khoản
- Module: Authentication / Authorization

### Functional Rules
1. Người dùng nhập email và mật khẩu để đăng nhập.
2. Mỗi lần đăng nhập sai liên tiếp làm bộ đếm tăng đúng 1.
3. Sai từ 3 lần liên tiếp thì tài khoản bị khóa tạm thời 30 giây.
4. Đăng nhập thất bại phải có thông báo phù hợp, không để lộ chi tiết nguyên nhân.
5. Đăng nhập thành công trả JWT; client lưu token và gửi qua `Authorization: Bearer <token>` cho request cần xác thực.
6. Input email trên giao diện dùng `type="email"` và HTML5 validation.

### Preconditions
- Có tài khoản đã đăng ký; các tài liệu hiện dùng `test@eshop.com`.
- Các ca JWT cần API yêu cầu đăng nhập.
- Cần kiểm soát trạng thái bộ đếm/khóa để chạy lại có thể tái lập.

### Inputs
| Variable | Type | Description | Constraint |
|---|---|---|---|
| Email | String / HTML input | Định danh đăng nhập | Định dạng email và tài khoản đã đăng ký; không có giới hạn độ dài được nêu |
| Password | String | Bí mật đăng nhập | Phải khớp tài khoản; không có policy độ dài/độ mạnh được nêu |
| Failed-attempt count/delta | Integer / state | Lần sai liên tiếp và mức tăng | Mỗi lần sai tăng đúng 1; ngưỡng khóa là 3 |
| Elapsed lock time | Duration | Thời gian từ lúc khóa | Khóa 30 giây; điểm đúng 30 giây chưa rõ |
| JWT / Authorization | String / header | Token và cách gửi | Thành công trả JWT, request gửi Bearer |

### Expected Outputs / Behaviors
- Đăng nhập đúng tạo JWT; thất bại không tạo JWT.
- Sai liên tiếp tăng đúng 1; đạt 3 lần kích hoạt khóa 30 giây.
- Email không đúng định dạng bị HTML5 form từ chối.
- Thất bại trả thông báo phù hợp và không tiết lộ thông tin nhạy cảm/nguyên nhân nội bộ.
- Client lưu và gửi JWT theo scheme Bearer.

### Assumptions
- Các lần sai “liên tiếp” được đánh giá theo trạng thái tài khoản; quy tắc reset cần xác nhận.
- Tài khoản seed chỉ dùng trong môi trường test.

### Ambiguities
- Không rõ bộ đếm reset sau đăng nhập thành công, sau hết khóa hay theo cách khác.
- Không rõ tại đúng 30.000 giây đã mở khóa hay phải qua mốc này.
- Không nêu thời hạn JWT, response status cụ thể, giới hạn độ dài email/password, hoặc SLA hiệu năng.
- “Không để lộ chi tiết nguyên nhân” chưa định nghĩa chính xác nội dung thông báo khóa được phép.

## 2. Domain Analysis

| Variable | Data Type | Valid Domain | Invalid Domain(s) | Constraints / Notes |
|---|---|---|---|---|
| Email | String | Đúng định dạng, tài khoản tồn tại | Rỗng, sai định dạng, không tồn tại | HTML `type=email` là yêu cầu UI |
| Password | String | Khớp với tài khoản | Rỗng, không khớp | Không tự tạo giới hạn độ dài |
| Failed-attempt delta | Integer | +1 sau mỗi lần sai | +0, +2 trở lên | Phải xác định trạng thái đầu |
| Consecutive failures | Integer | 0–2 chưa khóa; từ 3 khóa | Khóa sai ngưỡng | Threshold = 3 |
| Elapsed lock time | Duration | Trong 30s bị khóa; sau 30s được thử lại | Mở sớm hoặc còn khóa quá hạn | Đúng 30s chưa rõ |
| Authentication result | State | Credential đúng, không bị khóa | Credential sai hoặc đang khóa | Thành công tạo JWT |
| JWT / Authorization | String / HTTP header | Token hợp lệ qua Bearer | Thiếu, rỗng, sai scheme/token | JWT expiry không quy định |
| Failure output | HTTP/JSON/UI | Từ chối, không token, thông báo phù hợp | Lộ chi tiết nhạy cảm/nội bộ | Status cụ thể cần đối chiếu API contract |

## 3. Equivalence Partitions

| Partition ID | Variable | Class | Condition | Representative | Requirement / Existing Cases |
|---|---|---|---|---|---|
| EP-01 | Email | VALID | Đúng định dạng và đã đăng ký | `test@eshop.com` | FR-02 / TC-FR-02-LOGIN-005 |
| EP-02 | Email | INVALID | Rỗng | `""` | FR-02 / 001, 030 |
| EP-03 | Email | INVALID | Sai định dạng/thiếu domain | `test`, `user@` | FR-02 / 002, 003, 031 |
| EP-04 | Email | INVALID | Đúng định dạng nhưng chưa đăng ký | `unknown@example.com` | FR-02 / 004 |
| EP-05 | Password | VALID | Khớp tài khoản | Password hợp lệ | FR-02 / 005 |
| EP-06 | Password | INVALID | Rỗng hoặc không khớp | `""`, `WrongPass123!` | FR-02 / 006, 007 |
| EP-07 | Failed-attempt delta | VALID | Mỗi lần sai tăng đúng +1 | 0 → 1 | FR-02 / 007, 009 |
| EP-08 | Failed-attempt delta | INVALID | Tăng 0 hoặc hơn 1 | 0 → 0 / 0 → 2 | FR-02 / 010, 011 |
| EP-09 | Failure count | VALID | Dưới 3, chưa khóa | 2 lần | FR-02 / 012 |
| EP-10 | Failure count | VALID | Đạt/vượt 3, phải khóa | 3, 4 lần | FR-02 / 013, 014 |
| EP-11 | Lock time | VALID | Vẫn trong hạn khóa | 29s | FR-02 / 015 |
| EP-12 | Lock time | AMBIGUOUS | Chính xác mốc hết hạn | 30s | FR-02 / 016; clarify inclusiveness |
| EP-13 | Lock time | VALID | Đã qua thời hạn | 31s | FR-02 / 017 |
| EP-14 | JWT | VALID | Token hợp lệ, Bearer được chấp nhận | `Bearer <valid-token>` | FR-02 / 022, 027, 043 |
| EP-15 | JWT | INVALID | Thiếu/rỗng/sai scheme/token sai | No header / invalid token | FR-02 / 025, 026, 028, 034, 035, 044, 045 |
| EP-16 | Failure output | VALID | Lỗi chung, không lộ chi tiết | Lỗi đăng nhập chung | FR-02 / 037, 039–042 |
| EP-17 | Failure output | INVALID | Lộ password hoặc thiếu trạng thái khóa | Password plaintext / no lock message | FR-02 / 036, 038 |

## 4. Boundary Analysis

| Variable | Boundary | Inclusiveness | Requirement | Notes |
|---|---:|---|---|---|
| Consecutive failures | 3 | Từ 3 trở lên khóa | FR-02 | 2 lần chưa đạt ngưỡng |
| Failed-attempt delta | +1 | Chính xác +1 | FR-02 | Kiểm tra sau một lần sai |
| Lock duration | 30 seconds | 29s bị khóa; sau 30s mở; tại 30s chưa rõ | FR-02 | Cần quyết định inclusiveness |
| Email format | N/A | Không áp dụng BVA số học | FR-02 | Dùng EP |
| Password length, JWT expiry, performance | Không được quy định | Không áp dụng | FR-02 | Không tự suy diễn ngưỡng |

## 5. BVA Values

| Variable | Boundary | Test Value | Classification | Existing Case |
|---|---:|---:|---|---|
| Failure count | 3 | 2 | Hợp lệ: chưa khóa | TC-FR-02-LOGIN-012 |
| Failure count | 3 | 3 | Ngưỡng: phải khóa | TC-FR-02-LOGIN-013 |
| Failure count | 3 | 4 | Phải vẫn khóa | TC-FR-02-LOGIN-014 |
| Attempt delta | +1 | +0 | Không hợp lệ | TC-FR-02-LOGIN-010 |
| Attempt delta | +1 | +1 | Hợp lệ | TC-FR-02-LOGIN-009 |
| Attempt delta | +1 | +2 | Không hợp lệ | TC-FR-02-LOGIN-011 |
| Lock time | 30s | 29s | Còn bị khóa | TC-FR-02-LOGIN-015 |
| Lock time | 30s | 30s | Chưa phân loại: yêu cầu mơ hồ | TC-FR-02-LOGIN-016 |
| Lock time | 30s | 31s | Được thử lại | TC-FR-02-LOGIN-017 |

## 6. Generated Test Cases / Traceability

The [README index](README.md) links to 39 individual case files generated from [FR02_test_cases.md](FR02_test_cases.md), after removing the duplicate IDs documented in the report. These newly separated cases are Not Run. Previous actual results remain in [FR02-test-report.md](../../test-summary/FR-02/FR02-test-report.md) and are not copied as results of this set. Before running, reset each test account to the stated starting counter/lock state.

| Case Group | Existing Case IDs | Technique | Requirement |
|---|---|---|---|
| Email/password partitions | 001–007, 029–032 | Equivalence Partitioning | FR-02 login and HTML5 validation |
| Counter and lock boundaries | 007, 009–017, 021 | EP + BVA | FR-02 attempt counter / lock |
| JWT and authorization | 022–028, 034–035, 043–045 | Equivalence Partitioning | FR-02 token requirements |
| Failure message / sensitive output | 036–042 | Equivalence Partitioning | FR-02 failed-login response |

## 7. Coverage Summary

- Requirements analyzed: FR-02 login, counter, lock, failure response, JWT, HTML5 email.
- Variables identified: email, password, counter delta, failure count, lock duration, auth result, JWT/header, failure output.
- Equivalence partitions: 17 documented; each maps to existing cases or an explicit ambiguity.
- Boundaries: 3 failures, +1 counter delta, 30 seconds.
- BVA values considered: 2/3/4 failures; +0/+1/+2; 29/30/31 seconds.
- Existing execution: 39 unique cases, 27 PASS, 12 FAILED (per FR02-test-report.md).
- Gaps: exact 30s semantics and reset semantics unclear; no performance tests because no SLA.
- Assumption: test account state can be initialized and observed reliably.

## 8. Human Review Required

1. Define whether failed attempts reset after successful login and after lock expiry.
2. Decide whether login is allowed at exactly 30.000 seconds.
3. Define allowed lock message details and expected API status/body.
4. Confirm existing cases prove JWT validity, not only token presence.
5. Supply performance thresholds before performance test design.

## 9. AI Gap Candidates

### Candidate 1 — Counter reset
- Possible missed case: successful login following prior failures may reset or retain the counter.
- Why it may have been missed: FR-02 does not specify reset behavior.
- Human action required: Confirm behavior and add a case if specified.

### Candidate 2 — Exact lock expiry
- Possible missed case: behavior at exactly 30 seconds can differ from 29/31 seconds.
- Why it may have been missed: boundary inclusiveness is unspecified.
- Human action required: Decide and update TC-FR-02-LOGIN-016 expected result.

### Candidate 3 — Token expiration
- Possible missed case: expired JWT and additional malformed token variants.
- Why it may have been missed: FR-02 does not state token lifetime or detailed token policy.
- Human action required: Confirm API contract and add cases if required.
