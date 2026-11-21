# Task 3 – Thí nghiệm kiểm chứng cổng p95 (`p95_regression.py`, tầng PR)

- **Máy:** `CT-TOAN-HUYNH` (MacBook Air M5). Thí nghiệm lặp **2 lần độc lập**:
  - **Lần 1:** 2026-11-22 00:59 → 01:13 (màn hình bị khóa khi kết thúc nên không có ảnh), dữ liệu [`results/t3/run1/`](results/t3/run1/)
  - **Lần 2:** 2026-11-22 01:15 → 01:30 (có ảnh), dữ liệu [`results/t3/run2/`](results/t3/run2/), ảnh [`evidence/t3/`](evidence/t3/)
- **Plan:** bản rút gọn của `23120175_Load_20261121.jmx` giống job `pr-short` trong `.github/workflows/perf.yml`: 30 thread, ramp-up 10 s, 90 s, think-time 0–50 ms, chạy với `-Jhttpclient.reset_state_on_thread_group_iteration=false`
- **Mỗi lần chạy JMeter:** khởi động lại backend (DB seed lại, reset lockout, xóa `userCarts`), chạy `create_users.sh`, rồi chạy plan
- **Regression giả:** bản sao backend trong thư mục tạm, checkout trả response sau **5 ms** (`setTimeout`), xem [`results/t3/slow_checkout.patch`](results/t3/slow_checkout.patch). Code backend trong repo **không** bị sửa.
- **Script thí nghiệm:** [`results/t3/run_experiment.sh`](results/t3/run_experiment.sh)

## Kịch bản (mỗi lần lặp)

| Bước | Lần chạy | Backend | Lệnh kiểm tra | Kỳ vọng |
|---|---|---|---|---|
| 1 | `base_1` … `base_5` | gốc | `baseline` (trung vị 5 lần) | tạo baseline |
| 2 | `unchanged` | gốc | `check` | **pass** (không báo động giả) |
| 3 | `slow_1` | chậm +5 ms | `check` | **cần chạy lại** (exit 2) |
| 4 | `slow_2` | chậm +5 ms | `check --confirm` | **regression** (exit 1) |

## Kết quả

### Độ nhiễu p95 giữa 5 lần baseline (ms)

| Label | Lần 1 | Lần 2 |
|---|---|---|
| 01_Login | 2, 2, 2, 2, 3 | 2, 2, 2, 2, 2 |
| 02_ProductDetail | 2, 2, 2, 2, 3 | 2, 2, 2, 2, 2 |
| 03_AddToCart | 1, 1, 1, 1, 1 | 1, 1, 1, 1, 1 |
| 04_ApplyCoupon | 3, 3, 3, 3, 4 | 3, 3, 3, 3, 3 |
| 05_Checkout | 3, 3, 3, 3, 4 | 2, 2, 3, 3, 3 |

Trong cả 10 lần chạy không đổi code, p95 mỗi label dao động **tối đa 1 ms**.

### Kết quả kiểm tra

| Lần chạy | Exit (lần 1 / lần 2) | p95 `05_Checkout`, baseline 3 ms (lần 1 / lần 2) | Label khác lệch nhiều nhất | Kết luận |
|---|---|---|---|---|
| `unchanged` | **0 / 0** | 4 (+1) / 3 (0) | lần 1: 4 label +1; lần 2: 0 | pass |
| `slow_1` | **2 / 2** | **9 (+6) / 9 (+6)** | lần 1: `04_ApplyCoupon` **+2**; lần 2: +1 | cần chạy lại |
| `slow_2 --confirm` | **1 / 1** | **9 (+6) / 8 (+5)** | +1 | **regression ở `05_Checkout`** |

p99 `05_Checkout`: baseline 4 ms → 10–11 ms khi chậm.

### Throughput luồng chính (request/giây)

| Lần | base_1 | base_2 | base_3 | base_4 | base_5 | unchanged | slow_1 | slow_2 |
|---|---|---|---|---|---|---|---|---|
| 1 | 1.265 | 1.270 | 1.268 | 1.271 | 1.185 | 1.180 | 1.133 | 1.132 |
| 2 | 1.277 | 1.278 | 1.249 | 1.186 | 1.185 | 1.186 | 1.135 | 1.220 |

## Nhận định

1. **Cổng bắt đúng regression +5 ms ở cả 2 lần lặp**, đúng label `05_Checkout` (p95 3 → 8–9 ms), qua đúng hai bước: lần đầu yêu cầu chạy lại, lần xác nhận báo regression.
2. **Không báo động giả** ở cả 2 lần chạy không đổi code. Nhưng ở lần 1, 4/5 label lệch đúng +1 ms, là mức tối đa còn được coi là đạt: **biên an toàn mỏng**. Lần 2 không lệch.
3. **Bước chạy lại có tác dụng thật:** ở lần 1, `04_ApplyCoupon` (không bị sửa) lệch +2 ms trong `slow_1`; nếu chặn ngay lần đầu sẽ đổ lỗi sai label. Lần xác nhận đưa nó về +1 ms.
4. **Độ trễ đo được +5 đến +6 ms** khi cấy 5 ms: `setTimeout` của Node có độ phân giải ~1 ms.
5. **Throughput không dùng được làm tiêu chí ở tầng PR:** giữa các lần không đổi code dao động tới −7% (1.277 → 1.185 request/giây), trong khi regression giả chỉ làm giảm ~4%; `slow_2` lần 2 (1.220) còn cao hơn `unchanged` (1.186).
6. **Ngưỡng phát hiện tối thiểu:** lệch ≥ 3 ms bị chặn; +2 ms chỉ cảnh báo; +1 ms không phân biệt được với nhiễu.

## Hạn chế

- 2 lần lặp, tổng 12 lần chạy không đổi code; chưa đủ để ước lượng chính xác tỉ lệ báo động giả.
- Cùng một máy laptop không quạt; số liệu không áp dụng cho runner CI khác loại máy.
- Mới thử regression ở một API và một mức (+5 ms).

## Ảnh bằng chứng (lần 2)

- [`evidence/t3/t3_01_baseline_running.png`](evidence/t3/t3_01_baseline_running.png): đang chạy baseline, log thí nghiệm và htop (`node server.js`)
- [`evidence/t3/t3_02_slow_running.png`](evidence/t3/t3_02_slow_running.png): đang chạy với backend chậm
- [`evidence/t3/t3_03_results.png`](evidence/t3/t3_03_results.png): bảng p95 5 lần baseline và kết quả 3 lần kiểm tra (exit 0 / 2 / 1)
