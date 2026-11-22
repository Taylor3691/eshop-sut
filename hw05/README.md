# HW05 – Performance Testing · 23120175

- **Repo:** https://github.com/Taylor3691/eshop-sut (nhánh `hw05/toanhuynh`, thư mục `hw05/`)
- **Báo cáo chính:** [`REPORT.md`](REPORT.md) (bản PDF: `REPORT.pdf`)
- **AI Audit Report:** [`AILOG.md`](AILOG.md) · **AI Critique:** [`AI_CRITIQUE.md`](AI_CRITIQUE.md) (Phần 5 của báo cáo chính)
- **Video demo Task 1:** https://youtu.be/7uUt8abLXus
- **Video demo Agent Skill:** https://youtu.be/aPxXErQeGD0

## Bảng tự đánh giá

| No. | Criteria                                                                          | Grade   | Self-Assessed Grade |
| --- | --------------------------------------------------------------------------------- | ------- | ------------------- |
| 1   | Task 1 — Load testing                                                             | 30      | **29**              |
| 2   | Task 1 — Stress testing                                                           | 20      | **19**              |
| 3   | Task 1 — Spike testing                                                            | 20      | **20**              |
| 4   | Task 2 — AI analysis + misinterpretation hunt (with correct values from raw logs) | 10      | **10**              |
| 5   | Task 3 — Continuous Performance Testing proposal (G9.6)                           | 10      | **10**              |
| 6   | Agent Skills                                                                      | 10      | **10**              |
|     | **Total**                                                                         | **100** | **98**              |

## Tóm tắt kết quả kiểm thử

### Kịch bản đã chạy

Luồng mỗi virtual user: `POST /api/login` → `GET /api/products/:id` → `POST /api/cart` → `POST /api/apply-coupon` → `POST /api/checkout`, dữ liệu từ CSV (200 user, 5 sản phẩm, 2 mã giảm giá). Số liệu tính từ file `.jtl` thô, bỏ sample `LOCK_*`.

| Kịch bản | Test plan | Cấu hình | Request | Lỗi luồng chính | p95 | Kết quả |
|---|---|---|---|---|---|---|
| Load | [`23120175_Load_20261121.jmx`](23120175_Load_20261121.jmx) | 30 thread, ramp-up 60 s, 600 s, think-time 1–3 s; Aggregate Report | 10.739 | 0 | 4 ms | Đạt (p95 < 300 ms, lỗi < 1%), ổn định ≈18,9 req/s |
| Stress | [`23120175_Stress_20261121.jmx`](23120175_Stress_20261121.jmx) | Stepping 20 → 200 thread, think-time 0–50 ms; Summary Report | 1.852.603 | 0 | 2 ms | Đỉnh ≈8.930 req/s ở 200 thread, CPU `node` ≈101% |
| Spike | [`23120175_Spike_20261121.jmx`](23120175_Spike_20261121.jmx) | Ultimate: nền 20, spike +130 trong 10 s; View Results Tree | 14.473 | 0 | 4 ms | Không suy giảm, phục hồi ngay (biên độ spike nhỏ: ≈186 req/s) |
| Soak | [`23120175_Soak_20261121.jmx`](23120175_Soak_20261121.jmx) | 150 thread, 960 s, think-time 0–50 ms | 5.651.325 | 0 | 2 ms (gộp) | Suy giảm từ phút 8 |

### Nhóm endpoint đã phủ

| Nhóm | Endpoint |
|---|---|
| Auth-heavy | `POST /api/login` (kèm setUp kiểm tra khóa tài khoản FR-02) |
| Read-heavy | `GET /api/products/:id`; demo skill thêm `GET /api/categories`, `GET /api/products?search=` |
| Transactional | `POST /api/cart`, `POST /api/apply-coupon`, `POST /api/checkout` |

### Ngưỡng chịu tải (endurance threshold)

| Chỉ số | Giá trị |
|---|---|
| RPS ổn định tối đa | **≈ 6.800 request/giây** (phút 1–7 của Soak), p95 2 ms, p99 3 ms |
| RPS duy trì 15 phút | **≈ 5.000–5.500 request/giây**, p95 ≤ 27 ms, p99 ≈ 190–236 ms, 0 lỗi |
| Bắt đầu suy giảm | Phút thứ 8: throughput −20%, p99 tăng ≈70 lần |
| Memory ceiling quan sát | RSS `node` **79 → 329 MB** (≈ 9–10 MB/phút), chưa chạm trần |
| Điểm bão hòa (đo riêng, không think-time) | ≈ 11.400 request/giây ở ≈50 thread |

Chi tiết: [`SOAK_RESULT.md`](SOAK_RESULT.md).

### Bug và vấn đề hiệu năng

**5 issue mới** trên GitHub (nhãn `hw05`) + **4 bug xác nhận lại** + 1 bug phát hiện khi demo skill. Chi tiết: [`BUG_REPORTS.md`](BUG_REPORTS.md).

| Issue | Nội dung | Loại |
|---|---|---|
| [#225](https://github.com/Taylor3691/eshop-sut/issues/225) | Khóa tài khoản sau 2 lần sai thay vì 3 | Chức năng |
| [#226](https://github.com/Taylor3691/eshop-sut/issues/226) | Lộ stack trace HTML khi JSON không hợp lệ | Bảo mật |
| [#227](https://github.com/Taylor3691/eshop-sut/issues/227) | `GET /api/products/:id` trả 200 `{}` khi không tồn tại | Chức năng |
| [#228](https://github.com/Taylor3691/eshop-sut/issues/228) | `price` dạng chuỗi với sản phẩm id chẵn | Chức năng |
| [#229](https://github.com/Taylor3691/eshop-sut/issues/229) | RAM tăng liên tục do `userCarts` không giải phóng | **Hiệu năng** |
| #20, #34, #68, #70 (đã có) | Coupon % tính sai; checkout tin `total_amount` của client; giỏ không xóa sau checkout | Xác nhận lại |
| (chưa tạo issue) | Tìm kiếm có dấu nháy đơn trả HTTP 500 `SQLITE_ERROR` (SQL injection) | Bảo mật, từ demo skill |

## Danh mục bài nộp

| Yêu cầu (mục 14 của đề) | File |
|---|---|
| Báo cáo chính (Markdown + PDF) | [`REPORT.md`](REPORT.md), `REPORT.pdf` |
| Link repo GitHub | https://github.com/Taylor3691/eshop-sut/tree/hw05/toanhuynh/hw05 |
| 3 test plan (+ Soak) | `23120175_{Load,Stress,Spike,Soak}_20261121.jmx` |
| Dữ liệu CSV | [`data/`](data/) |
| 3 file `.jtl` thô + 3 thư mục HTML report | `results/load.jtl`, `results/spike.jtl`, `results/stress.jtl` (trong zip: `stress.jtl.xz`, giải nén ra đúng file gốc 233 MB); [`reports/`](reports/). Soak: xem mục bên dưới |
| Ảnh resource monitor và phần cứng | [`evidence/load/`](evidence/load/), [`evidence/stress/`](evidence/stress/), [`evidence/spike/`](evidence/spike/), [`evidence/soak/`](evidence/soak/), [`evidence/listeners/`](evidence/listeners/), [`evidence/hardware/`](evidence/hardware/) |
| Video demo (Unlisted) | Task 1: https://youtu.be/7uUt8abLXus · Skill: https://youtu.be/aPxXErQeGD0 |
| AI Critique + AI Audit Report (Markdown + PDF) | [`AI_CRITIQUE.md`](AI_CRITIQUE.md), [`AILOG.md`](AILOG.md) (Phần 5, 6 của `REPORT.md`) |
| Git commit log | `git_log.txt` |
| Bug report + ảnh trang Issues | [`BUG_REPORTS.md`](BUG_REPORTS.md), [`evidence/bugs/`](evidence/bugs/), [`evidence/issues/`](evidence/issues/) (ảnh chụp trang GitHub của #225–#229) |
| Agent Skill + video | [`skill/perf-test/`](skill/perf-test/), [`skill-demo/search/`](skill-demo/search/) |
| Tài liệu hỗ trợ | [`REVIEW_TESTPLANS.md`](REVIEW_TESTPLANS.md), [`REPORT_TASK2.md`](REPORT_TASK2.md), [`REPORT_TASK3.md`](REPORT_TASK3.md), [`T3_EXPERIMENT.md`](T3_EXPERIMENT.md), [`PERF_PIPELINE_FLOW.md`](PERF_PIPELINE_FLOW.md), [`scripts/`](scripts/), [`ci/perf.yml`](ci/perf.yml) |

## Nộp trên Moodle (giới hạn 20 MB)

File zip `23120175_HW05_AI_Performance_098.zip` chứa toàn bộ bài nộp, trừ các phần dưới đây (quá lớn) được để trên GitHub:

| Phần | Lý do | Link |
|---|---|---|
| `soak.jtl` (Soak, 681 MB thô) | Không thuộc 3 file `.jtl` bắt buộc; quá lớn | [`results/soak.jtl.gz`](https://github.com/Taylor3691/eshop-sut/blob/hw05/toanhuynh/hw05/results/soak.jtl.gz) (35 MB, giải nén ra đúng file gốc) |
| Báo cáo HTML và ảnh của Soak | Đi kèm lần chạy Soak | [`reports/soak/`](https://github.com/Taylor3691/eshop-sut/tree/hw05/toanhuynh/hw05/reports/soak), [`evidence/soak/`](https://github.com/Taylor3691/eshop-sut/tree/hw05/toanhuynh/hw05/evidence/soak) |
| `.jtl` thí nghiệm Task 3 (16 file) | 11 MB | [`results/t3/`](https://github.com/Taylor3691/eshop-sut/tree/hw05/toanhuynh/hw05/results/t3) (zip giữ baseline, kết quả `check_*.txt`, log) |
| `.jtl` và báo cáo HTML của demo skill | 26 MB | [`skill-demo/search/`](https://github.com/Taylor3691/eshop-sut/tree/hw05/toanhuynh/hw05/skill-demo/search) (zip giữ plan, CSV, `ANALYSIS.md`, `REVIEW.md`, `AILOG.md`) |

Trong zip:
- `results/stress.jtl.xz`: bản nén xz của `stress.jtl`; giải nén bằng `xz -dk results/stress.jtl.xz` (hoặc 7-Zip trên Windows).
- Ảnh trong `evidence/` được chuyển sang JPEG (chất lượng 70, cạnh dài tối đa 1800 px) để vừa dung lượng; bản PNG gốc ở [`evidence/`](https://github.com/Taylor3691/eshop-sut/tree/hw05/toanhuynh/hw05/evidence) trên GitHub.

## Chạy lại

```bash
# 1. Backend sạch + 200 user test
bash hw05/skill/perf-test/scripts/reset_sut.sh
# 2. Chạy một kịch bản (từ thư mục hw05)
cd hw05 && jmeter -n -t 23120175_Load_20261121.jmx -l results/load.jtl -e -o reports/load \
  -Jhttpclient.reset_state_on_thread_group_iteration=false
# 3. Phân tích từ .jtl thô
python3 skill/perf-test/scripts/jtl_analyze.py results/load.jtl --window 60
```

Yêu cầu: JMeter 5.6+ với plugin `jpgc-casutg` (Stress/Spike), Node.js, Python 3.
