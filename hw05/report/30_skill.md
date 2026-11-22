- **Skill:** [`skill/perf-test/`](skill/perf-test/) (liên kết sẵn vào `.claude/skills/perf-test` để Claude Code nhận skill)
- **Video demo (YouTube, Unlisted):** https://youtu.be/aPxXErQeGD0
- **Demo trên nhóm endpoint khác:** [`skill-demo/search/`](skill-demo/search/)

### Nội dung skill

Skill đóng gói quy trình của HW05 để áp dụng cho nhóm endpoint mới. [`SKILL.md`](skill/perf-test/SKILL.md) mô tả 9 bước (phân tích endpoint → CSV → tham số → sinh plan từ khung → review → chạy thử → chạy thật → phân tích → cổng p95), mỗi bước có lệnh cụ thể và mục review bắt buộc.

| Thành phần | Vai trò |
|---|---|
| `scripts/jtl_analyze.py` | Percentile chính xác từ cột `elapsed` (đọc được `.jtl.gz`, file hàng trăm MB), bảng theo label và theo cửa sổ thời gian kèm số thread, ghép RAM, `--compare` chỉ ra chỗ `statistics.json` lệch |
| `scripts/shrink_plan.py` | Rút gọn plan bất kỳ (Thread Group thường, Stepping, Ultimate) để chạy thử |
| `scripts/reset_sut.sh` | Đưa SUT về trạng thái sạch trước mỗi lần chạy (dừng, khởi động lại, health check, tạo dữ liệu) |
| `scripts/create_users.sh`, `record_node_rss.sh`, `p95_regression.py` | Tổng quát hóa từ HW05 |
| `templates/plan_template.jmx` | Khung plan tham số hóa bằng `-J` (threads, duration, think-time, host, port, file CSV) |
| `templates/prompts.md` | Prompt từng bước, rút từ AILOG |
| `references/pitfalls.md` | **29 bẫy** đã gặp trong HW05 (thiết kế plan, môi trường, phân tích, cổng regression), mỗi bẫy có cách xử lý và bằng chứng |

### Demo: nhóm endpoint read-heavy (tìm kiếm và danh mục)

Luồng `GET /api/categories` → `GET /api/products?search=` → `GET /api/products/:id`, plan `skill-demo/search/23120175_SearchLoad_20261122.jmx` (30 thread, 120 s, think-time 0–50 ms).

| Kết quả | Giá trị (từ `jtl_analyze.py`) |
|---|---|
| Request | 185.571, 0 lỗi |
| p95 / p99 gộp | 2 ms / 3 ms |
| Throughput ổn định | ≈ 1.610 request/giây (30 thread) |
| Bug phát hiện | Từ khóa có dấu nháy đơn làm `GET /api/products?search=` trả **HTTP 500** kèm HTML `SQLITE_ERROR` (chuỗi tìm kiếm được nối trực tiếp vào câu SQL) |

Chi tiết: [`skill-demo/search/ANALYSIS.md`](skill-demo/search/ANALYSIS.md), [`skill-demo/search/REVIEW.md`](skill-demo/search/REVIEW.md).
