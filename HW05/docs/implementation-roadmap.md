# Lộ Trình Triển Khai HW05 – Performance Testing

> **Sinh viên:** Nguyễn Hữu Phúc – MSSV: 23120157  
> **Ngày tạo:** 2026-11-18  
> **Ước tính tổng thời gian:** 10 giờ (theo đề bài)

---

## Tổng Quan Lộ Trình

Bài tập được chia thành **16 prompt/phase**, thực hiện tuần tự. Mỗi phase chờ duyệt trước khi sang phase tiếp theo.

```
Phase 1  ──► Phase 2  ──► Phase 3  ──► Phase 4  ──► Phase 5  ──► Phase 6
(Khởi tạo)  (Skill)     (API)       (Load)      (Stress)    (Spike)
    │
    ▼
Phase 7  ──► Phase 8  ──► Phase 9  ──► Phase 10 ──► Phase 11 ──► Phase 12
(Review)    (Execute)   (Endurance) (AI Analysis) (Continuous) (Skill hoàn thiện)
    │
    ▼
Phase 13 ──► Phase 14 ──► Phase 15 ──► Phase 16
(AI Audit)  (Report)    (Video/Git)  (Final Audit)
```

---

## Phase 1: Khởi Tạo Workspace và Phân Tích Bài Tập ✅ ĐANG THỰC HIỆN

**Prompt:** 01  
**Mục tiêu:** Hiểu rõ yêu cầu, chuẩn bị workspace, xác định prerequisites.

| # | Nhiệm vụ | Trạng thái |
|---|---------|-----------|
| 1.1 | Đọc và trích xuất yêu cầu từ PDF | ✅ Hoàn thành |
| 1.2 | Xác định deliverables, tiêu chí, ràng buộc | ✅ Hoàn thành |
| 1.3 | Kiểm tra cấu trúc project hiện tại | ✅ Hoàn thành |
| 1.4 | Xác nhận EShop repository có sẵn | ✅ Hoàn thành (branch hw5/phuc) |
| 1.5 | Kiểm tra công cụ và môi trường | ✅ Hoàn thành |
| 1.6 | Xác định dependencies thiếu | ✅ Hoàn thành |
| 1.7 | Tạo lộ trình triển khai (file này) | ✅ Hoàn thành |
| 1.8 | Tạo ma trận truy xuất yêu cầu | ✅ Hoàn thành |
| 1.9 | Tạo cấu trúc thư mục HW05 | ✅ Hoàn thành |

**Deliverables:**
- `HW05/docs/assignment-analysis.md`
- `HW05/docs/requirement-traceability.md`
- `HW05/docs/implementation-roadmap.md` (file này)
- `HW05/README.md`

---

## Phase 2: Tạo Agent Skill Foundation ⬜ CHƯA BẮT ĐẦU

**Prompt:** 02  
**Mục tiêu:** Tạo Agent Skill `performance-testing-skill` với cấu trúc chuẩn.

| # | Nhiệm vụ | Trạng thái |
|---|---------|-----------|
| 2.1 | Kiểm tra convention Agent Skill hiện có | ⬜ |
| 2.2 | Tạo SKILL.md với metadata và workflows | ⬜ |
| 2.3 | Tạo references (7 file tham khảo) | ⬜ |
| 2.4 | Tạo templates (JMX, CSV, report) | ⬜ |
| 2.5 | Tạo scripts cơ bản (analyze-jtl.py, validate-jtl.py) | ⬜ |

**Deliverables:**
- `performance-testing-skill/SKILL.md`
- `performance-testing-skill/references/*.md`
- `performance-testing-skill/templates/*`
- `performance-testing-skill/scripts/*`

---

## Phase 3: Phân Tích API và Thiết Kế Workflow ⬜ CHƯA BẮT ĐẦU

**Prompt:** 03  
**Mục tiêu:** Phân tích toàn bộ API backend, thiết kế end-to-end workflow.

| # | Nhiệm vụ | Trạng thái |
|---|---------|-----------|
| 3.1 | Phân tích source code backend (routes, middleware) | ⬜ |
| 3.2 | Xác định actual API endpoints | ⬜ |
| 3.3 | Document mỗi endpoint chi tiết | ⬜ |
| 3.4 | Xác minh cơ chế authentication/authorization | ⬜ |
| 3.5 | Kiểm tra login lockout behavior | ⬜ |
| 3.6 | Xác định test accounts và product data | ⬜ |
| 3.7 | Thiết kế end-to-end workflow (3 endpoint groups) | ⬜ |
| 3.8 | Thiết kế test data strategy | ⬜ |

**Deliverables:**
- `docs/api-inventory.md`
- `docs/workflow-design.md`
- `docs/test-data-design.md`

---

## Phase 4: Thiết Kế Load Test Plan ⬜ CHƯA BẮT ĐẦU

**Prompt:** 04  
**Mục tiêu:** Tạo JMeter Load Test Plan hoàn chỉnh.

| # | Nhiệm vụ | Trạng thái |
|---|---------|-----------|
| 4.1 | Xác định số virtual users phù hợp | ⬜ |
| 4.2 | Cấu hình ramp-up, duration, think-time | ⬜ |
| 4.3 | Tạo CSV Data Set Config | ⬜ |
| 4.4 | Cấu hình JWT token extraction | ⬜ |
| 4.5 | Thêm assertions | ⬜ |
| 4.6 | Thêm Summary Report listener | ⬜ |
| 4.7 | Generate JMX file | ⬜ |
| 4.8 | Viết tài liệu thiết kế | ⬜ |

**Deliverables:**
- `test-plans/23120157_Load_20261118.jmx`
- `test-data/users.csv`
- `docs/load-test-design.md`

---

## Phase 5: Thiết Kế Stress Test Plan ⬜ CHƯA BẮT ĐẦU

**Prompt:** 05  
**Mục tiêu:** Tạo Stress Test Plan với tải tăng dần.

| # | Nhiệm vụ | Trạng thái |
|---|---------|-----------|
| 5.1 | Thiết kế stepped workload strategy | ⬜ |
| 5.2 | Cấu hình multiple load stages | ⬜ |
| 5.3 | Xử lý account lockout | ⬜ |
| 5.4 | Thêm Aggregate Report listener | ⬜ |
| 5.5 | Generate JMX file | ⬜ |

**Deliverables:**
- `test-plans/23120157_Stress_20261118.jmx`
- `docs/stress-test-design.md`

---

## Phase 6: Thiết Kế Spike Test Plan ⬜ CHƯA BẮT ĐẦU

**Prompt:** 06  
**Mục tiêu:** Tạo Spike Test Plan với tải tăng đột ngột.

| # | Nhiệm vụ | Trạng thái |
|---|---------|-----------|
| 6.1 | Xác định baseline và spike workload | ⬜ |
| 6.2 | Cấu hình spike duration và recovery period | ⬜ |
| 6.3 | Thêm View Results Tree listener | ⬜ |
| 6.4 | Generate JMX file | ⬜ |

**Deliverables:**
- `test-plans/23120157_Spike_20261118.jmx`
- `docs/spike-test-design.md`

---

## Phase 7: Review và Validate Test Plans ⬜ CHƯA BẮT ĐẦU

**Prompt:** 07  
**Mục tiêu:** Kiểm tra độc lập tất cả test plans, phát hiện lỗi AI.

| # | Nhiệm vụ | Trạng thái |
|---|---------|-----------|
| 7.1 | Validate JMX XML | ⬜ |
| 7.2 | Kiểm tra endpoint paths, HTTP methods | ⬜ |
| 7.3 | Kiểm tra CSV, auth, assertions | ⬜ |
| 7.4 | Kiểm tra Listener uniqueness | ⬜ |
| 7.5 | Phát hiện AI design mistakes | ⬜ |
| 7.6 | Sửa lỗi đã xác nhận | ⬜ |

**Deliverables:**
- `analysis/test-plan-review.md`
- `analysis/ai-design-mistakes.md`

---

## Phase 8: Thực Thi Performance Tests ⬜ CHƯA BẮT ĐẦU

**Prompt:** 08  
**Mục tiêu:** Chạy tất cả test plans, thu thập evidence.

| # | Nhiệm vụ | Trạng thái |
|---|---------|-----------|
| 8.1 | Chuẩn bị môi trường (backend, DB, accounts) | ⬜ |
| 8.2 | Chạy Load Test (JMeter non-GUI) | ⬜ |
| 8.3 | Chạy Stress Test | ⬜ |
| 8.4 | Chạy Spike Test | ⬜ |
| 8.5 | Thu thập screenshots, JTL, HTML reports | ⬜ |
| 8.6 | Reset account lockout giữa các test | ⬜ |

**Deliverables:**
- `results/*.jtl`
- `html-reports/*/`
- `evidence/*/`
- `docs/execution-procedure.md`
- `results/execution-manifest.md`

**⚠️ Hành động thủ công cần thiết:**
- Chụp screenshots JMeter + resource monitor cùng frame
- Chụp hardware report (dxdiag)

---

## Phase 9: Endurance / Soak Testing ⬜ CHƯA BẮT ĐẦU

**Prompt:** 09  
**Mục tiêu:** Chạy endurance test 10–15 phút, xác định threshold.

**Deliverables:**
- `results/Endurance.jtl`
- `evidence/Endurance/`
- `docs/endurance-test-report.md`

---

## Phase 10: AI Analysis & Misinterpretation Hunt ⬜ CHƯA BẮT ĐẦU

**Prompt:** 10  
**Mục tiêu:** Phân tích JTL, phát hiện AI sai, đề xuất tối ưu.

**Deliverables:**
- `analysis/AI_Analysis.md`
- `analysis/Misinterpretation_Hunt.md`
- `analysis/Optimization_Review.md`

---

## Phase 11: Continuous Performance Testing Proposal ⬜ CHƯA BẮT ĐẦU

**Prompt:** 11  
**Mục tiêu:** Đề xuất mô hình CI/CD cho performance testing.

**Deliverables:**
- `continuous-testing/proposal.md`
- `continuous-testing/flowchart.md`

---

## Phase 12: Hoàn Thiện Agent Skill ⬜ CHƯA BẮT ĐẦU

**Prompt:** 12  
**Mục tiêu:** Tích hợp toàn bộ workflow vào Agent Skill.

**Deliverables:**
- `performance-testing-skill/` (cập nhật)
- `agent-skill/skill-validation-report.md`

---

## Phase 13: AI Audit Report & AI Critique ⬜ CHƯA BẮT ĐẦU

**Prompt:** 13  
**Mục tiêu:** Tạo báo cáo kiểm toán AI và bài phê bình.

**Deliverables:**
- `report/AI_Audit_Report.md` + `.pdf`
- `report/AI_Critique.md` + `.pdf`

---

## Phase 14: Báo Cáo Chính và README ⬜ CHƯA BẮT ĐẦU

**Prompt:** 14  
**Mục tiêu:** Tạo báo cáo HW05 đầy đủ và README.

**Deliverables:**
- `report/HW05_Report.md` + `.pdf`
- `HW05/README.md` (cập nhật với self-assessment)

---

## Phase 15: Video, Bug Reports, Git Log ⬜ CHƯA BẮT ĐẦU

**Prompt:** 15  
**Mục tiêu:** Chuẩn bị video checklist, bug reports, git log.

**Deliverables:**
- `video/recording-checklist.md`
- `video/video-links.md`
- `bugs/bug-reports.md`
- `git/commit-log.txt`

**⚠️ Hành động thủ công bắt buộc:**
- Quay video demo (≥6 phút, giọng Việt)
- Upload YouTube unlisted
- Quay video Agent Skill demo

---

## Phase 16: Final Audit và Đóng Gói ⬜ CHƯA BẮT ĐẦU

**Prompt:** 16  
**Mục tiêu:** Kiểm tra toàn bộ, tạo ZIP nộp bài.

**Deliverables:**
- `docs/final-submission-audit.md`
- `23120157_HW05_AI_Performance_XXX.zip`

---

## Tóm Tắt Tiến Độ

| Phase | Mô tả | Trạng thái |
|-------|-------|-----------|
| 1 | Khởi tạo workspace | ✅ ĐANG HOÀN THÀNH |
| 2 | Agent Skill foundation | ⬜ CHƯA BẮT ĐẦU |
| 3 | Phân tích API và workflow | ⬜ CHƯA BẮT ĐẦU |
| 4 | Load Test Plan | ⬜ CHƯA BẮT ĐẦU |
| 5 | Stress Test Plan | ⬜ CHƯA BẮT ĐẦU |
| 6 | Spike Test Plan | ⬜ CHƯA BẮT ĐẦU |
| 7 | Review test plans | ⬜ CHƯA BẮT ĐẦU |
| 8 | Thực thi tests | ⬜ CHƯA BẮT ĐẦU |
| 9 | Endurance testing | ⬜ CHƯA BẮT ĐẦU |
| 10 | AI Analysis | ⬜ CHƯA BẮT ĐẦU |
| 11 | Continuous testing | ⬜ CHƯA BẮT ĐẦU |
| 12 | Hoàn thiện Skill | ⬜ CHƯA BẮT ĐẦU |
| 13 | AI Audit & Critique | ⬜ CHƯA BẮT ĐẦU |
| 14 | Báo cáo chính | ⬜ CHƯA BẮT ĐẦU |
| 15 | Video, bugs, git | ⬜ CHƯA BẮT ĐẦU |
| 16 | Final audit & ZIP | ⬜ CHƯA BẮT ĐẦU |

**Tiến độ tổng thể: 1/16 phases (6%)**

