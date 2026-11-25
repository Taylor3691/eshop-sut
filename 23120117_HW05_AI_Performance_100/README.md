# 23120117 - HW05 AI Performance Testing

## Thông tin bài nộp

- Student ID: `23120117`
- Self-assessed grade: `100/100`
- Public repository: <https://github.com/Taylor3691/eshop-sut>
- Branch: `DANH/HW5`
- Main report: [Main Report.md](Main%20Report.md)
- GitHub Issue drafts: [Bug Reports/GitHub Issues .md](Bug%20Reports/GitHub%20Issues%20.md)

## Test summary

| Scenario | Cấu hình chính | Kết quả chính |
|---|---|---|
| Load | 20 VU, 360 giây | 4.151 HTTP samples, p95 13 ms, 0,00% lỗi |
| Stress | tăng đến 120 VU, 300 giây | 13.538 HTTP samples, p95 12 ms, 0,00% lỗi; chưa thấy breakpoint |
| Spike | 10 -> 100 -> 10 VU, 180 giây | 4.233 HTTP samples, p95 14 ms, 0,00% lỗi; phục hồi sau burst |
| Endurance | 120 VU, hold 600 giây | 74,38 HTTP RPS, p95 11 ms, 0,00% lỗi, Working Set peak 87,97 MB |

Endpoint groups được bao phủ:

- auth-heavy: `POST /api/login`;
- read-heavy: `GET /api/products`, `GET /api/orders/my-orders`;
- transactional: `POST /api/cart`, `POST /api/checkout`.

Endurance threshold đã xác minh: **120 VU, 74,38 HTTP RPS, 14,72 workflow/s, Working Set cao nhất 87,97 MB**.

Số bug đã xác nhận bằng runtime evidence: **7**. Bảy lỗi được tái hiện bằng HTTP request thật trên backend tạm với SQLite tách biệt; ảnh chụp request/response nằm tại `Bug Reports/screenshots/`

Video demo YouTube:

Demo Agent Skills: https://youtu.be/ZubwHW6g3-g

Demo Load Testing: https://youtu.be/fH0G2dTVPBk

Demo Stress Testing: https://youtu.be/js4Ur_O3Xe4

Demo Spike Testing: https://youtu.be/GzXOPZ1gAJw

## Self-assessment

| STT | Tiêu chí đánh giá | Điểm tối đa | Điểm tự đánh giá |
|---:|---|---:|---:|
| 1 | Task 1 - Load testing | 30 | 30 |
| 2 | Task 1 - Stress testing | 20 | 20 |
| 3 | Task 1 - Spike testing | 20 | 20 |
| 4 | Task 2 - AI analysis + misinterpretation hunt | 10 | 10 |
| 5 | Task 3 - Continuous Performance Testing proposal | 10 | 10 |
| 6 | Agent Skills | 10 | 10 |
| | **Tổng** | **100** | **100** |

## Cấu trúc thư mục

```text
23120117_HW05_AI_Performance_100/
├── README.md
├── Main Report.md
├── Submission Checklist.md
├── Link-Github-Repository.txt
├── git-commit-log.txt
├── AI Critique/
│   └── AI Critique.md
├── AI Audit Report/
│   └── AI Audit Report.md
├── Bug Reports/
|   ├── screenshots/
│   └── GitHub Issues.md
├── Agent Skill/
│   └── task1-skills/
└── performance-tests/
    ├── task1/
    ├── task2/
    └── task3/
```

