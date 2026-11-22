# Ma Trận Truy Xuất Yêu Cầu (Requirement Traceability Matrix)

> **Sinh viên:** Nguyễn Hữu Phúc – MSSV: 23120157  
> **Ngày tạo:** 2026-11-18  
> **Bài tập:** HW05 – Performance Testing

---

## 1. Task 1: Performance Testing (70 điểm)

| Req ID | Yêu cầu bài tập | Vị trí triển khai | Bằng chứng yêu cầu | Phương pháp xác minh | Trạng thái |
|--------|-----------------|-------------------|--------------------|--------------------|-----------|
| T1-01 | Load Test Plan (.jmx) | `test-plans/23120157_Load_YYYYMMDD.jmx` | File JMX hợp lệ | Mở trong JMeter, kiểm tra XML | NOT STARTED |
| T1-02 | Stress Test Plan (.jmx) | `test-plans/23120157_Stress_YYYYMMDD.jmx` | File JMX hợp lệ | Mở trong JMeter, kiểm tra XML | NOT STARTED |
| T1-03 | Spike Test Plan (.jmx) | `test-plans/23120157_Spike_YYYYMMDD.jmx` | File JMX hợp lệ | Mở trong JMeter, kiểm tra XML | NOT STARTED |
| T1-04 | Cùng end-to-end workflow cho cả 3 test | Cả 3 file JMX | So sánh workflow steps | Kiểm tra Thread Group structure | NOT STARTED |
| T1-05 | 3 nhóm endpoint (Auth, Read, Transactional) | Cả 3 file JMX | HTTP Request samplers | Kiểm tra samplers trong JMX | NOT STARTED |
| T1-06 | CSV Data Set Config | `test-data/users.csv` | File CSV + JMX config | Kiểm tra CSV variable references | NOT STARTED |
| T1-07 | Dynamic JWT token extraction | JMX – JSON Extractor | Extractor config | Kiểm tra JSON path | NOT STARTED |
| T1-08 | Authorization header truyền token | JMX – HTTP Header Manager | Header config | Kiểm tra `Authorization: Bearer ${token}` | NOT STARTED |
| T1-09 | Business assertions | JMX – Response Assertion | Assertion elements | Kiểm tra assertion conditions | NOT STARTED |
| T1-10 | Think-time giữa requests | JMX – Timer elements | Timer config | Kiểm tra timer values | NOT STARTED |
| T1-11 | Load Test: Summary Report listener | JMX – Summary Report | Listener element | Kiểm tra Listener type | NOT STARTED |
| T1-12 | Stress Test: Aggregate Report listener | JMX – Aggregate Report | Listener element | Kiểm tra Listener type | NOT STARTED |
| T1-13 | Spike Test: View Results Tree listener | JMX – View Results Tree | Listener element | Kiểm tra Listener type | NOT STARTED |
| T1-14 | Load Test raw JTL file | `results/Load.jtl` | File JTL có dữ liệu thực | Kiểm tra nội dung JTL | NOT STARTED |
| T1-15 | Stress Test raw JTL file | `results/Stress.jtl` | File JTL có dữ liệu thực | Kiểm tra nội dung JTL | NOT STARTED |
| T1-16 | Spike Test raw JTL file | `results/Spike.jtl` | File JTL có dữ liệu thực | Kiểm tra nội dung JTL | NOT STARTED |
| T1-17 | Load Test HTML Dashboard | `html-reports/Load/` | Folder HTML report | Mở index.html | NOT STARTED |
| T1-18 | Stress Test HTML Dashboard | `html-reports/Stress/` | Folder HTML report | Mở index.html | NOT STARTED |
| T1-19 | Spike Test HTML Dashboard | `html-reports/Spike/` | Folder HTML report | Mở index.html | NOT STARTED |
| T1-20 | Resource-monitor evidence (Load) | `evidence/Load/` | Screenshots JMeter + backend cùng frame | Kiểm tra file ảnh | NOT STARTED |
| T1-21 | Resource-monitor evidence (Stress) | `evidence/Stress/` | Screenshots JMeter + backend cùng frame | Kiểm tra file ảnh | NOT STARTED |
| T1-22 | Resource-monitor evidence (Spike) | `evidence/Spike/` | Screenshots JMeter + backend cùng frame | Kiểm tra file ảnh | NOT STARTED |
| T1-23 | Hardware report + spec table | `evidence/Hardware/` | dxdiag screenshot + bảng thông số | Kiểm tra hostname | IN PROGRESS |
| T1-24 | Account-lockout reset documentation | `docs/execution-procedure.md` | Reset procedure | Kiểm tra steps | NOT STARTED |
| T1-25 | Endurance test (~10-15 phút) | `results/Endurance.jtl` | JTL + report | Kiểm tra duration ≥10 min | IN PROGRESS |
| T1-26 | Endurance threshold (concrete numbers) | `docs/endurance-test-report.md` | Max stable RPS, memory | Kiểm tra metrics | IN PROGRESS |
| T1-27 | Human review documentation | `analysis/test-plan-review.md` | Review findings | Kiểm tra corrections | NOT STARTED |
| T1-28 | AI design mistakes documentation | `analysis/ai-design-mistakes.md` | Mistakes + fixes | Kiểm tra evidence | NOT STARTED |
| T1-29 | Demo video Task 1 (≥6 phút, YouTube) | YouTube unlisted | Video link | Mở link, kiểm tra duration | NOT STARTED |
| T1-30 | File naming convention đúng | Tất cả JMX files | `{MSSV}_{Type}_{YYYYMMDD}` | Kiểm tra tên file | NOT STARTED |

## 2. Task 2: AI Analysis & Misinterpretation Hunt (10 điểm)

| Req ID | Yêu cầu bài tập | Vị trí triển khai | Bằng chứng yêu cầu | Phương pháp xác minh | Trạng thái |
|--------|-----------------|-------------------|--------------------|--------------------|-----------|
| T2-01 | AI Analysis từ JTL thực | `analysis/AI_Analysis.md` | Metric calculations | So sánh với JTL raw | NOT STARTED |
| T2-02 | Metric calculations chính xác | `analysis/AI_Analysis.md` | Avg, Median, p90, p95, p99, RPS | Tính lại từ JTL | NOT STARTED |
| T2-03 | Misinterpretation Hunt | `analysis/Misinterpretation_Hunt.md` | AI errors documented | AI statement vs raw value | NOT STARTED |
| T2-04 | Raw values cited cho mỗi error | `analysis/Misinterpretation_Hunt.md` | Specific JTL samples | Cross-reference JTL | NOT STARTED |
| T2-05 | Optimization recommendations | `analysis/Optimization_Review.md` | Categorized recommendations | Verify against source code | NOT STARTED |
| T2-06 | Feasible/Hallucinated/Needs verification | `analysis/Optimization_Review.md` | Classification table | Verify against EShop architecture | NOT STARTED |

## 3. Task 3: Continuous Performance Testing (10 điểm)

| Req ID | Yêu cầu bài tập | Vị trí triển khai | Bằng chứng yêu cầu | Phương pháp xác minh | Trạng thái |
|--------|-----------------|-------------------|--------------------|--------------------|-----------|
| T3-01 | Commit monitoring proposal | `continuous-testing/proposal.md` | Technical proposal | Kiểm tra nội dung | NOT STARTED |
| T3-02 | Conditional performance-test execution | `continuous-testing/proposal.md` | Decision logic | Kiểm tra rule description | NOT STARTED |
| T3-03 | p95 regression detection rule | `continuous-testing/proposal.md` | Rule + threshold | Kiểm tra formula | NOT STARTED |
| T3-04 | Flowchart (Mermaid) | `continuous-testing/flowchart.md` | Mermaid diagram | Render diagram | NOT STARTED |
| T3-05 | Cost and false-alarm trade-off | `continuous-testing/proposal.md` | Discussion section | Kiểm tra nội dung | NOT STARTED |

## 4. Agent Skill (10 điểm)

| Req ID | Yêu cầu bài tập | Vị trí triển khai | Bằng chứng yêu cầu | Phương pháp xác minh | Trạng thái |
|--------|-----------------|-------------------|--------------------|--------------------|-----------|
| AS-01 | Valid SKILL.md | `performance-testing-skill/SKILL.md` | SKILL file | Kiểm tra format | NOT STARTED |
| AS-02 | Reusable workflows | SKILL.md workflows section | Workflow descriptions | Kiểm tra generality | NOT STARTED |
| AS-03 | References và templates | `performance-testing-skill/references/` | Reference files | Kiểm tra files | NOT STARTED |
| AS-04 | JTL analysis script | `performance-testing-skill/scripts/analyze-jtl.py` | Python script | Chạy script | NOT STARTED |
| AS-05 | Validation report | `agent-skill/skill-validation-report.md` | Test results | Kiểm tra validation | NOT STARTED |
| AS-06 | Demo video Agent Skill | YouTube unlisted | Video link | Mở link | NOT STARTED |

## 5. Documentation Bắt Buộc

| Req ID | Yêu cầu bài tập | Vị trí triển khai | Bằng chứng yêu cầu | Phương pháp xác minh | Trạng thái |
|--------|-----------------|-------------------|--------------------|--------------------|-----------|
| D-01 | Main report Markdown | `report/HW05_Report.md` | Report file | Kiểm tra 20 sections | NOT STARTED |
| D-02 | Main report PDF | `report/HW05_Report.pdf` | PDF file | Mở và đọc | NOT STARTED |
| D-03 | AI Critique (200-300 words English) | `report/AI_Critique.md` + `.pdf` | Word count 200-300 | Đếm từ | NOT STARTED |
| D-04 | AI Audit Report | `report/AI_Audit_Report.md` + `.pdf` | Audit entries | Kiểm tra interactions | NOT STARTED |
| D-05 | README.md với self-assessment | `HW05/README.md` | README file | Kiểm tra rubric table | NOT STARTED |
| D-06 | Git commit log | `git/commit-log.txt` | Commit history | `git log` verify | NOT STARTED |
| D-07 | Bug reports | `bugs/bug-reports.md` | Bug descriptions | Verify against results | NOT STARTED |
| D-08 | Final ZIP | `23120157_HW05_AI_Performance_XXX.zip` | ZIP archive | Extract and verify | NOT STARTED |

---

## Thống Kê Trạng Thái

| Trạng thái | Số lượng |
|-----------|---------|
| NOT STARTED | 50 |
| IN PROGRESS | 3 |
| COMPLETED | 0 |
| BLOCKED | 0 |
| **Tổng** | **53** |

---

*Ma trận này sẽ được cập nhật sau mỗi prompt/phase hoàn thành.*

