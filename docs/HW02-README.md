# HW02 — README

File này là README nộp bài, tách khỏi `README.md` ở gốc repo. File gốc là đặc tả EShop, không phải báo cáo bài tập.

Sinh viên: Huỳnh Thái Toàn. MSSV: 23120175.

## Self-assessment

Bảng theo mục 15 của đề. Cột Grade là điểm tối đa. Cột Self-Assessed Grade do sinh viên điền trước khi nộp.


| No. | Criteria                                                     | Grade | Self-Assessed Grade |
| --- | ------------------------------------------------------------ | ----- | ------------------- |
| 1   | Feature A (Domain + Boundary) — FR-05 web, Pool A            | 25    | 25                  |
| 2   | Feature B (Domain + Boundary) — FR-11, Pool B                | 25    | 25                  |
| 3   | Feature C (Domain + Boundary) — FR-16, Pool C                | 25    | 25                  |
| 4   | Feature D (Mobile, Domain + Boundary) — FR-05 mobile, Pool D | 15    | 15                  |
| 5   | Agent Skills                                                 | 10    | 10                  |
|     | Total                                                        | 100   | 100                 |




## Test summary report

Bốn chức năng: FR-05 web, FR-11, FR-16, FR-05 mobile.

Số dưới đây là bộ test case đã viết trong `04-test-cases.md` của từng chức năng. Case trong AI gap analysis chưa được thêm vào bảng đó và chưa chạy, nên không tính vào các số này.


| Chức năng    | Designed | Executed | Passed | Failed | Not yet executed |
| ------------ | -------- | -------- | ------ | ------ | ---------------- |
| FR-05 web    | 46       | 41       | 25     | 16     | 5                |
| FR-11        | 27       | 27       | 23     | 4      | 0                |
| FR-16        | 24       | 24       | 13     | 11     | 0                |
| FR-05 mobile | 23       | 21       | 6      | 15     | 2                |
| Tổng         | 120      | 113      | 67     | 46     | 7                |


Not yet executed là các test BLOCKED:

- FR-05 web, 5 test phân trang (TC-23, TC-24, TC-25, TC-26, TC-46). Spec không có `Limit`, nên precondition còn ký hiệu `L`.
- FR-05 mobile, TC-15 và TC-16. Chrome cắt dấu cách cuối URL. Chưa chạy trên điện thoại thật.

Số bug đã ghi trong `docs/bug-report.md`: 22 (BUG-01 đến BUG-22, GitHub issue #44–#65).

Demo video của skill `.cursor/skills/fr-domain-testing/SKILL.md`: https://youtu.be/b0SKlX8yYJU