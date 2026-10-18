# FR-02 - Login and Account Lock: Test Case Index

**39 test cases** were split from [FR02_test_cases.md](FR02_test_cases.md) after removing duplicate cases documented in the existing report: `TC-FR-02-LOGIN-008`, `TC-FR-02-LOGIN-018`, `TC-FR-02-LOGIN-019`, `TC-FR-02-LOGIN-020`, `TC-FR-02-LOGIN-024`, `TC-FR-02-LOGIN-033`.

## How to use

- Each case has an individual `TC-FR02-NNN.md` file and starts as Not Run.
- Prepare the exact account counter/lock state before running lock cases.
- Backend startup resets/reseeds SQLite; use an isolated test environment.
- The expected behavior at exactly 30 seconds remains ambiguous as documented in the analysis.

## Test Cases

| ID | Objective | Technique | File |
|---|---|---|---|
| TC-FR-02-LOGIN-001 | Kiểm tra email rỗng | Equivalence Partitioning | [TC-FR-02-LOGIN-001.md](TC-FR-02-LOGIN-001.md) |
| TC-FR-02-LOGIN-002 | Kiểm tra email sai định dạng | Equivalence Partitioning | [TC-FR-02-LOGIN-002.md](TC-FR-02-LOGIN-002.md) |
| TC-FR-02-LOGIN-003 | Kiểm tra email thiếu domain | Equivalence Partitioning | [TC-FR-02-LOGIN-003.md](TC-FR-02-LOGIN-003.md) |
| TC-FR-02-LOGIN-004 | Kiểm tra email hợp lệ nhưng chưa đăng ký | Equivalence Partitioning | [TC-FR-02-LOGIN-004.md](TC-FR-02-LOGIN-004.md) |
| TC-FR-02-LOGIN-005 | Kiểm tra email hợp lệ đã đăng ký | Equivalence Partitioning | [TC-FR-02-LOGIN-005.md](TC-FR-02-LOGIN-005.md) |
| TC-FR-02-LOGIN-006 | Kiểm tra mật khẩu rỗng | Equivalence Partitioning | [TC-FR-02-LOGIN-006.md](TC-FR-02-LOGIN-006.md) |
| TC-FR-02-LOGIN-007 | Kiểm tra mật khẩu không khớp | Equivalence Partitioning | [TC-FR-02-LOGIN-007.md](TC-FR-02-LOGIN-007.md) |
| TC-FR-02-LOGIN-009 | Kiểm tra bộ đếm tăng đúng 1 | Boundary Value Analysis | [TC-FR-02-LOGIN-009.md](TC-FR-02-LOGIN-009.md) |
| TC-FR-02-LOGIN-010 | Kiểm tra bộ đếm không được giữ nguyên | Boundary Value Analysis | [TC-FR-02-LOGIN-010.md](TC-FR-02-LOGIN-010.md) |
| TC-FR-02-LOGIN-011 | Kiểm tra bộ đếm không tăng nhiều hơn 1 | Boundary Value Analysis | [TC-FR-02-LOGIN-011.md](TC-FR-02-LOGIN-011.md) |
| TC-FR-02-LOGIN-012 | Kiểm tra chưa đạt ngưỡng khóa | Boundary Value Analysis | [TC-FR-02-LOGIN-012.md](TC-FR-02-LOGIN-012.md) |
| TC-FR-02-LOGIN-013 | Kiểm tra đúng ngưỡng khóa | Boundary Value Analysis | [TC-FR-02-LOGIN-013.md](TC-FR-02-LOGIN-013.md) |
| TC-FR-02-LOGIN-014 | Kiểm tra vượt ngưỡng khóa | Boundary Value Analysis | [TC-FR-02-LOGIN-014.md](TC-FR-02-LOGIN-014.md) |
| TC-FR-02-LOGIN-015 | Kiểm tra tài khoản còn khóa ở giây 29 | Boundary Value Analysis | [TC-FR-02-LOGIN-015.md](TC-FR-02-LOGIN-015.md) |
| TC-FR-02-LOGIN-016 | Kiểm tra tại đúng mốc 30 giây | Boundary Value Analysis | [TC-FR-02-LOGIN-016.md](TC-FR-02-LOGIN-016.md) |
| TC-FR-02-LOGIN-017 | Kiểm tra sau khi hết thời gian khóa | Boundary Value Analysis | [TC-FR-02-LOGIN-017.md](TC-FR-02-LOGIN-017.md) |
| TC-FR-02-LOGIN-021 | Kiểm tra tài khoản đang bị khóa | Equivalence Partitioning | [TC-FR-02-LOGIN-021.md](TC-FR-02-LOGIN-021.md) |
| TC-FR-02-LOGIN-022 | Kiểm tra JWT hợp lệ | Equivalence Partitioning | [TC-FR-02-LOGIN-022.md](TC-FR-02-LOGIN-022.md) |
| TC-FR-02-LOGIN-023 | Kiểm tra JWT rỗng | Equivalence Partitioning | [TC-FR-02-LOGIN-023.md](TC-FR-02-LOGIN-023.md) |
| TC-FR-02-LOGIN-025 | Kiểm tra header không có token | Equivalence Partitioning | [TC-FR-02-LOGIN-025.md](TC-FR-02-LOGIN-025.md) |
| TC-FR-02-LOGIN-026 | Kiểm tra header sai scheme | Equivalence Partitioning | [TC-FR-02-LOGIN-026.md](TC-FR-02-LOGIN-026.md) |
| TC-FR-02-LOGIN-027 | Kiểm tra header Bearer hợp lệ | Equivalence Partitioning | [TC-FR-02-LOGIN-027.md](TC-FR-02-LOGIN-027.md) |
| TC-FR-02-LOGIN-028 | Kiểm tra token không hợp lệ | Equivalence Partitioning | [TC-FR-02-LOGIN-028.md](TC-FR-02-LOGIN-028.md) |
| TC-FR-02-LOGIN-029 | Kiểm tra trường email dùng HTML5 email | Equivalence Partitioning | [TC-FR-02-LOGIN-029.md](TC-FR-02-LOGIN-029.md) |
| TC-FR-02-LOGIN-030 | Kiểm tra HTML5 với email rỗng | Equivalence Partitioning | [TC-FR-02-LOGIN-030.md](TC-FR-02-LOGIN-030.md) |
| TC-FR-02-LOGIN-031 | Kiểm tra HTML5 với chuỗi không phải email | Equivalence Partitioning | [TC-FR-02-LOGIN-031.md](TC-FR-02-LOGIN-031.md) |
| TC-FR-02-LOGIN-032 | Kiểm tra HTML5 với email hợp lệ | Equivalence Partitioning | [TC-FR-02-LOGIN-032.md](TC-FR-02-LOGIN-032.md) |
| TC-FR-02-LOGIN-034 | Kiểm tra response thành công thiếu JWT | Equivalence Partitioning | [TC-FR-02-LOGIN-034.md](TC-FR-02-LOGIN-034.md) |
| TC-FR-02-LOGIN-035 | Kiểm tra response thành công có JWT rỗng | Equivalence Partitioning | [TC-FR-02-LOGIN-035.md](TC-FR-02-LOGIN-035.md) |
| TC-FR-02-LOGIN-036 | Kiểm tra response không chứa mật khẩu | Equivalence Partitioning | [TC-FR-02-LOGIN-036.md](TC-FR-02-LOGIN-036.md) |
| TC-FR-02-LOGIN-037 | Kiểm tra thông báo lỗi đăng nhập chung | Equivalence Partitioning | [TC-FR-02-LOGIN-037.md](TC-FR-02-LOGIN-037.md) |
| TC-FR-02-LOGIN-038 | Kiểm tra thông báo tài khoản bị khóa | Equivalence Partitioning | [TC-FR-02-LOGIN-038.md](TC-FR-02-LOGIN-038.md) |
| TC-FR-02-LOGIN-039 | Kiểm tra lỗi không làm lộ email | Equivalence Partitioning | [TC-FR-02-LOGIN-039.md](TC-FR-02-LOGIN-039.md) |
| TC-FR-02-LOGIN-040 | Kiểm tra lỗi không làm lộ số lần sai | Equivalence Partitioning | [TC-FR-02-LOGIN-040.md](TC-FR-02-LOGIN-040.md) |
| TC-FR-02-LOGIN-041 | Kiểm tra lỗi không chứa thông tin kỹ thuật | Equivalence Partitioning | [TC-FR-02-LOGIN-041.md](TC-FR-02-LOGIN-041.md) |
| TC-FR-02-LOGIN-042 | Kiểm tra đăng nhập sai luôn có phản hồi lỗi | Equivalence Partitioning | [TC-FR-02-LOGIN-042.md](TC-FR-02-LOGIN-042.md) |
| TC-FR-02-LOGIN-043 | Kiểm tra client gửi Bearer header | Equivalence Partitioning | [TC-FR-02-LOGIN-043.md](TC-FR-02-LOGIN-043.md) |
| TC-FR-02-LOGIN-044 | Kiểm tra client không gửi header rỗng | Equivalence Partitioning | [TC-FR-02-LOGIN-044.md](TC-FR-02-LOGIN-044.md) |
| TC-FR-02-LOGIN-045 | Kiểm tra client từ chối token không hợp lệ | Equivalence Partitioning | [TC-FR-02-LOGIN-045.md](TC-FR-02-LOGIN-045.md) |

## Sources and existing results

- Requirement oracle: project `README.md`, FR-02.
- Domain/BVA analysis, coverage, review items, and AI gap candidates: [FR02-skill-analysis.md](FR02-skill-analysis.md).
- Existing execution report: [FR02-test-report.md](../../test-summary/FR-02/FR02-test-report.md).
- These individual case files are Not Run; previous observations were not copied as new execution results.
