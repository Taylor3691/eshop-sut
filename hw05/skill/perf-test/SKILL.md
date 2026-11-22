---
name: perf-test
description: Thiết kế, chạy và phân tích performance test (Load, Stress, Spike, Soak) bằng JMeter cho một nhóm endpoint REST, rồi phân tích file .jtl bằng số tính từ dữ liệu thô và kiểm tra p95 regression. Dùng khi người dùng muốn kiểm thử hiệu năng một nhóm API mới, sinh test plan JMeter, chạy thử, phân tích .jtl, tìm ngưỡng chịu tải, review phân tích của AI, hoặc so p95 với baseline.
---

# perf-test: quy trình kiểm thử hiệu năng có AI hỗ trợ

Skill đóng gói quy trình đã làm trong HW05 (EShop) để áp dụng cho **nhóm endpoint khác**. Nguyên tắc: AI làm từng bước theo kỹ thuật, **người review sau mỗi bước** theo [`references/pitfalls.md`](references/pitfalls.md); mọi con số trong báo cáo phải lấy từ file `.jtl` thô.

## Khi nào dùng

- Kiểm thử hiệu năng một nhóm API mới (auth, read-heavy, transactional).
- Sinh hoặc review test plan JMeter.
- Phân tích file `.jtl`, tìm ngưỡng chịu tải, đối chiếu với report HTML.
- So p95 của lần chạy mới với baseline.

## Yêu cầu

- JMeter 5.6+ (`brew install jmeter`); với Stress/Spike dùng Stepping/Ultimate Thread Group cần plugin `jpgc-casutg`.
- Python 3.9+, `curl`, `lsof`; SUT chạy được trên máy (mặc định EShop backend cổng 3000).

## Cấu trúc

| Đường dẫn | Vai trò |
|---|---|
| `scripts/reset_sut.sh` | Đưa SUT về trạng thái sạch: dừng process cổng, khởi động lại, chờ health check, tạo dữ liệu test. Cấu hình qua biến môi trường (`BACKEND_DIR`, `START_CMD`, `PORT`, `HEALTH_URL`, `SEED_CMD`) |
| `scripts/create_users.sh` | Tạo N tài khoản qua API đăng ký, ghi `data/users.csv` (`COUNT`, `PREFIX`, `DOMAIN`, `PASSWORD`, `WORKDIR`) |
| `scripts/shrink_plan.py` | Tạo bản rút gọn của plan (Thread Group thường/Stepping/Ultimate) để chạy thử, không sửa plan gốc |
| `scripts/jtl_analyze.py` | Phân tích `.jtl`/`.jtl.gz`: percentile chính xác theo label, theo cửa sổ thời gian, ghép RAM, đối chiếu `statistics.json` |
| `scripts/record_node_rss.sh` | Ghi RAM của process SUT mỗi 5 s trong lúc chạy dài (Soak) |
| `scripts/p95_regression.py` | Tạo baseline (trung vị nhiều lần chạy) và kiểm tra p95 regression; exit 0 pass, 1 regression, 2 chạy lại, 3 lỗi đầu vào |
| `templates/plan_template.jmx` | Khung plan: CSV, trích token, bỏ vòng khi lỗi, assertion JSON, setUp kiểm tra lockout, tham số `-J` |
| `templates/prompts.md` | Prompt mẫu cho từng bước |
| `references/pitfalls.md` | Checklist các bẫy đã gặp (thiết kế, môi trường, phân tích, cổng regression) |

Đặt `SKILL` = đường dẫn thư mục skill này. Mỗi nhóm endpoint dùng một **thư mục làm việc** riêng (gọi là `WORK`), chứa `data/`, `results/`, `reports/`, `evidence/`; chạy các lệnh từ `WORK`.

## Quy trình

Sau **mỗi** bước có dùng AI: ghi AI Audit Log (tool, giờ thật bằng `date`, prompt nguyên văn, output); commit theo bước.

### Bước 1 – Phân tích nhóm endpoint
Đọc code các route trong nhóm. Dùng prompt bước 1 trong `templates/prompts.md`. Kết quả: bảng method/URL/header/body/response/giá trị trích xuất cho từng bước, phân loại auth/read/transactional, danh sách hành vi ảnh hưởng tải.
**Review:** đối chiếu với code; chú ý A1, A4, A5 trong `pitfalls.md`. Gọi thử từng API bằng curl.

### Bước 2 – Dữ liệu CSV
Prompt bước 2. Tạo dữ liệu:
```bash
cd "$WORK" && COUNT=200 bash "$SKILL/scripts/create_users.sh"
```
**Review:** A6 (dữ liệu dính bug chức năng).

### Bước 3 – Tham số kịch bản
Prompt bước 3. **Review:** A7, A8, A9: ước lượng req/s mỗi thread = số request mỗi vòng ÷ (think-time + thời gian xử lý); so với năng lực server.

### Bước 4 – Sinh test plan
Prompt bước 4, đính kèm `templates/plan_template.jmx`. Plan mẫu nhận tham số qua `-J`:
`host, port, threads, rampup, duration, think_min, think_range, users_csv, products_csv, coupons_csv`.
Đặt tên `<MSSV>_<ScenarioType>_<YYYYMMDD>.jmx`; mỗi kịch bản một loại listener khác nhau nếu đề yêu cầu.

### Bước 5 – Review test plan (bắt buộc)
Cho AI tự soát (prompt bước 5), sau đó **người review theo toàn bộ mục A và B của `pitfalls.md`**. Lập bảng *AI sai/thiếu gì · sửa thế nào · vì sao AI bỏ sót (prompt / giới hạn model / đặc thù endpoint)*.

### Bước 6 – Chạy thử
```bash
bash "$SKILL/scripts/reset_sut.sh"
python3 "$SKILL/scripts/shrink_plan.py" plan.jmx /tmp/smoke.jmx --threads 3 --duration 30 --think 0,50
jmeter -n -t /tmp/smoke.jmx -l /tmp/smoke.jtl -Jhttpclient.reset_state_on_thread_group_iteration=false
python3 "$SKILL/scripts/jtl_analyze.py" /tmp/smoke.jtl
```
Kỳ vọng: luồng chính 0 lỗi; chỉ label `LOCK_*` fail nếu SUT có bug lockout.

### Bước 7 – Chạy thật và thu bằng chứng
Trước **mỗi** lần chạy: `reset_sut.sh`; xóa `.jtl` và thư mục report cũ (B3).
```bash
rm -rf results/<tên>.jtl reports/<tên>
jmeter -n -t plan.jmx -l results/<tên>.jtl -e -o reports/<tên> \
  -Jhttpclient.reset_state_on_thread_group_iteration=false [-Jthreads=... -Jduration=...]
```
Chạy dài (Soak): `WORKDIR="$WORK" JTL="$WORK/results/<tên>.jtl" bash "$SKILL/scripts/record_node_rss.sh"` ở terminal khác **trước** khi chạy JMeter. Dùng `caffeinate -d -i -u` để màn hình không khóa (B5).
Bằng chứng: ảnh JMeter + resource monitor cùng khung hình mỗi lần chạy; ảnh listener; video nếu đề yêu cầu. **Không dựng ảnh từ text.**
File `.jtl` > 100 MB: `gzip -k -9`, repo lưu bản `.gz` (B6).

### Bước 8 – Phân tích
```bash
python3 "$SKILL/scripts/jtl_analyze.py" results/<tên>.jtl --window 30 \
  --compare reports/<tên>/statistics.json [--rss results/node_rss.csv] [--markdown]
```
Đưa output cho AI (prompt bước 8). **Review theo mục C của `pitfalls.md`**; với mỗi chỗ AI đọc sai, trích giá trị đúng từ output của `jtl_analyze.py` và ghi file/cột nguồn. Phân loại từng đề xuất tối ưu là khả thi hay bịa, có căn cứ trong code/số liệu.

### Bước 9 – Cổng p95 regression (tuỳ chọn)
```bash
python3 "$SKILL/scripts/p95_regression.py" baseline results/base_{1..5}.jtl -o baseline.json --tier pr --machine <tên-máy>
python3 "$SKILL/scripts/p95_regression.py" check --baseline baseline.json --jtl results/new.jtl --tier pr --machine <tên-máy>
# exit 2 -> reset_sut.sh, chạy lại, thêm --confirm
```
Muốn kiểm chứng cổng: cấy độ trễ vào **bản sao** backend (không sửa code repo), xem mục D của `pitfalls.md`.

## Đầu ra chuẩn trong `WORK`

```
data/*.csv  ·  <MSSV>_<Scenario>_<YYYYMMDD>.jmx  ·  results/*.jtl(.gz)  ·  reports/<tên>/
evidence/*.png  ·  ANALYSIS.md (output jtl_analyze + review AI)  ·  REVIEW.md (bảng AI sai/sửa/vì sao)
```

## Quy tắc

- Không dùng percentile của `statistics.json` làm kết luận; luôn tính từ `.jtl` (C1).
- Không coi throughput trung bình cả bài là năng lực (C3).
- Giả thuyết phải ghi là giả thuyết, kèm cách kiểm chứng (C6).
- Không sửa code SUT trong repo để thử nghiệm; dùng bản sao.
- Không bịa bằng chứng: ảnh, `.jtl`, video phải từ lần chạy thật.

## Demo

- **Video (YouTube, Unlisted):** https://youtu.be/aPxXErQeGD0
- Dùng skill từ đầu đến cuối trên nhóm endpoint read-heavy (`GET /api/categories` → `GET /api/products?search=` → `GET /api/products/:id`). Kết quả: [`hw05/skill-demo/search/`](../../skill-demo/search/) (plan, CSV, `.jtl`, report HTML, `REVIEW.md`, `ANALYSIS.md`).
