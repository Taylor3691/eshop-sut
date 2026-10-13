# HW02 — Domain Testing và Boundary Value Analysis

Bài làm kiểm thử EShop với **4 features**, mỗi feature thuộc một pool. README tổng hợp self-assessment, kết quả test runs và demo video theo mục 14–15 của [đề HW02](../ref/2026.HW02.Domain%20Testing_En.pdf).

## Self-assessment

Giữ tiêu chí và thang điểm theo Assessment Template trong đề. Cột **Self-Assessed Grade** dành cho sinh viên điền sau khi review bài làm.

| No. | Criteria | Grade | Self-Assessed Grade |
|---|---|---:|---|
| 1 | Feature A (Domain + Boundary) — Profile web | 25 | [Điền] |
| 2 | Feature B (Domain + Boundary) — Order State Machine | 25 | [Điền] |
| 3 | Feature C (Domain + Boundary) — Product CRUD | 25 | [Điền] |
| 4 | Feature D (Mobile, Domain + Boundary) — Profile mobile | 15 | [Điền] |
| 5 | Agent Skills | 10 | [Điền] |
| **Total** | | **100** | **[Điền]** |

## Test summary report

Kết quả dưới đây được tổng hợp từ bốn test runs hiện hành. Tester đã xác nhận execute toàn bộ suite; các test runs được cập nhật kết quả ngày **2026-10-13**.

| Chỉ số | Số lượng |
|---|---:|
| Features được kiểm thử | **4** |
| Test cases designed | **67** |
| Test cases executed | **67** |
| Passed | **52** |
| Failed | **15** |
| Not yet executed (Not Run) | **0** |
| Blocked | **0** |
| Bugs đã ghi nhận trên GitHub Issues | **15** |

### Kết quả theo feature

| Pool | Feature / Requirement | Designed | Executed | Passed | Failed | Not Run | Blocked | Bugs |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| A | Profile web — FR-04 | 11 | 11 | 6 | 5 | 0 | 0 | 5 |
| B | Order State Machine — FR-10 | 18 | 18 | 15 | 3 | 0 | 0 | 3 |
| C | Product CRUD — FR-15 | 24 | 24 | 20 | 4 | 0 | 0 | 4 |
| D | Profile mobile — FR-04 / FR-20 | 14 | 14 | 11 | 3 | 0 | 0 | 3 |
| **Total** | **4 features** | **67** | **67** | **52** | **15** | **0** | **0** | **15** |

Suite gồm **24 BVA cases** và **43 EP cases**. Pool B áp dụng EP và state transition testing; BVA là N/A vì status không có numeric boundary được requirement xác định.

Execution rate của suite hiện hành là **100%**; pass rate là **77,61%**. Các số liệu áp dụng cho 67 cases đã chọn trong [manual testing scope](../tests/test-summary/manual-testing-scope.md), không thể hiện toàn bộ requirement coverage của EShop. Số bugs là số GitHub Issues tương ứng 15 failed cases; chưa gộp theo root cause.

### Test runs và bug references

| Pool | Test run | GitHub Issues |
|---|---|---|
| A | [Pool A test run](../tests/test-runs/pool-a-test-run.md) | [#8](https://github.com/Taylor3691/eshop-sut/issues/8), [#9](https://github.com/Taylor3691/eshop-sut/issues/9), [#10](https://github.com/Taylor3691/eshop-sut/issues/10), [#11](https://github.com/Taylor3691/eshop-sut/issues/11), [#12](https://github.com/Taylor3691/eshop-sut/issues/12) |
| B | [Pool B test run](../tests/test-runs/pool-b-test-run.md) | [#17](https://github.com/Taylor3691/eshop-sut/issues/17), [#18](https://github.com/Taylor3691/eshop-sut/issues/18), [#19](https://github.com/Taylor3691/eshop-sut/issues/19) |
| C | [Pool C test run](../tests/test-runs/pool-c-test-run.md) | [#29](https://github.com/Taylor3691/eshop-sut/issues/29), [#30](https://github.com/Taylor3691/eshop-sut/issues/30), [#31](https://github.com/Taylor3691/eshop-sut/issues/31), [#32](https://github.com/Taylor3691/eshop-sut/issues/32) |
| D | [Pool D test run](../tests/test-runs/pool-d-test-run.md) | [#35](https://github.com/Taylor3691/eshop-sut/issues/35), [#36](https://github.com/Taylor3691/eshop-sut/issues/36), [#37](https://github.com/Taylor3691/eshop-sut/issues/37) |

Chi tiết mapping Requirement → Partition → Test Case nằm trong [traceability matrix](../tests/test-summary/traceability-matrix.md). Lịch sử commits đã export tại [git-commit-log.txt](git-commit-log.txt).

## Demo videos

| Demo | YouTube link |
|---|---|
| HW02 demo | [Xem video demo HW02](https://youtu.be/l0w55pQkhjo) |

Agent Skill của bài làm: [domain-testing-bva / SKILL.md](../.agents/skills/domain-testing-bva/SKILL.md).
