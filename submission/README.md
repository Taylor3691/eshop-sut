# HW03 – GUI & Usability — <Họ tên> – <MSSV>

**SUT:** EShop Web Admin (http://localhost:5174) · **Nhóm tab:** Th.Toàn

## Phạm vi
- **Task 1:** Màn hình chính — Quản lý Sản phẩm (danh sách, thêm/sửa/xóa, Import CSV). Màn hình phụ — Admin Login, Dashboard, Quản lý Danh mục, Quản lý Mã giảm giá.
- **Task 2:** Đăng nhập Admin → Tạo danh mục → Thêm sản phẩm → Tạo mã giảm giá → Cập nhật trạng thái đơn đang chờ → Đăng xuất.
- **Task 3:** Chrome · Firefox · Safari trên macOS (trình duyệt thật; BrowserStack Free Trial giới hạn 1 phút/thiết bị).

## Test Summary
| Chỉ số | Giá trị |
|---|---|
| Số màn hình (Task 1) | 5 |
| Số flow (Task 2) | 1 |
| Checklist: designed / executed / passed / failed | 70 / 70 / 26 / 44 (AI 58 + tự thêm 12) |
| Số bug (GUI / usability / cross-platform) | 33 / _ / 0 mới (2 khác biệt giữa trình duyệt bổ sung vào BUG-19, BUG-31) |
| Số người tham gia | 7 (+1 pilot) |
| Điểm SUS trung bình | _ |
| Số nền tảng | 3 — Chrome, Firefox, Safari trên macOS (BrowserStack Free Trial chỉ 1 phút/thiết bị, có ảnh bằng chứng) |
| Demo video (Agent Skills) | <link YouTube> |
| GitHub Issues | [label:hw03](https://github.com/Taylor3691/eshop-sut/issues?q=label%3Ahw03) (25 issue mới) + 10 issue có sẵn bị trùng; bảng đầy đủ ở [bugs/README.md](bugs/README.md) |

## Self-Assessment
| No. | Criteria | Grade | Self-Assessed |
|---|---|---|---|
| 1 | Task 1 — GUI Checklist (design + execution + bug report) | 30 | |
| 2 | Task 2 — Usability Evaluation (task scenario + 7 sessions + analysis) | 40 | |
| 3 | Task 3 — Cross-Browser / Cross-Platform (≥ 3 platforms) | 20 | |
| 4 | Agent Skills | 10 | |
| | **Total** | **100** | |

## Cấu trúc thư mục
| Thư mục | Nội dung |
|---|---|
| `report/` | Main report (.md + .pdf) |
| `task1-checklist/` | checklist.xlsx (Checklist, Test Summary, Cross-Platform), ui-inventory, checklist-draft/filtered, execution-observations, screenshots/failed |
| `task2-usability/` | plan, scenario, participants, pilot, sessions/P1–P7, sus-and-metrics.xlsx, analysis |
| `task3-crossplatform/` | Ảnh chụp theo từng trình duyệt |
| `bugs/` | Bug report (.md) + link GitHub Issues |
| `ai/` | AI Audit Log, AI Critique (.md + .pdf) |
| `skills/` | Agent Skills (SKILL.md) |
| `test-data/` | Dữ liệu thử (CSV import) |
| `git-log.txt` | Git commit log |
