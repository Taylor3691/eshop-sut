# HW05 – Performance Testing

> **Sinh viên:** Nguyễn Hữu Phúc – MSSV: 23120157  
> **Môn học:** Kiểm thử Phần mềm (Software Testing)  
> **Hệ thống kiểm thử (SUT):** EShop  
> **Repository:** https://github.com/ttbhanh/eshop-sut  
> **Branch:** `hw5/phuc`

---

## Tổng Quan

Bài tập HW05 thực hiện **Performance Testing** toàn diện cho hệ thống EShop, bao gồm Load Testing, Stress Testing, Spike Testing, và Endurance Testing sử dụng Apache JMeter.

---

## Hệ Thống Kiểm Thử (SUT)

| Thành phần | Công nghệ | Port |
|-----------|----------|------|
| Backend API | Node.js + Express + SQLite | 3000 |
| Frontend Web | React 19 + Vite 8 + Tailwind CSS | 5173 |
| Frontend Admin | React 19 + Vite 8 + Tailwind CSS | 5174 |

---

## Môi Trường Kiểm Thử

| Thành phần | Thông số |
|-----------|---------|
| CPU | 13th Gen Intel Core i7-1355U (10 cores, 12 threads) |
| RAM | 15.7 GB |
| Storage | Micron SSD 477 GB |
| OS | Windows 11 Home (Build 10.0.26200) |
| Node.js | v22.20.0 |
| Java | 21.0.11 LTS |
| Apache JMeter | 5.6.3 |

---

## Nhóm Endpoint Kiểm Thử

| Nhóm | Endpoints | Mô tả |
|------|----------|-------|
| Auth-heavy | `POST /api/login` | Đăng nhập, JWT token |
| Read-heavy | `GET /api/products`, `GET /api/products/:id` | Danh sách và chi tiết sản phẩm |
| Transactional | `POST /api/cart`, `POST /api/checkout` | Giỏ hàng và thanh toán |

---

## Workflow End-to-End

```
Login → Search Products → View Product Detail → Add to Cart → Checkout
```

---

## Các Kịch Bản Kiểm Thử

| Kịch bản | File | Listener/Report |
|----------|------|----------------|
| Load Testing | `23120157_Load_YYYYMMDD.jmx` | Summary Report |
| Stress Testing | `23120157_Stress_YYYYMMDD.jmx` | Aggregate Report |
| Spike Testing | `23120157_Spike_YYYYMMDD.jmx` | View Results Tree |
| Endurance Testing | (cùng workflow) | — |

---

## Kết Quả Kiểm Thử

> ⚠️ **Chưa thực thi.** Kết quả sẽ được cập nhật sau khi chạy test.

| Metric | Load | Stress | Spike | Endurance |
|--------|------|--------|-------|-----------|
| Virtual Users | — | — | — | — |
| Duration | — | — | — | — |
| Avg Response Time | — | — | — | — |
| p95 Response Time | — | — | — | — |
| Throughput (RPS) | — | — | — | — |
| Error Rate | — | — | — | — |

---

## Endurance Threshold

> ⚠️ **Chưa xác định.** Sẽ được cập nhật sau endurance test.

- Maximum stable RPS: —
- Memory ceiling: —

---

## Bugs và Performance Issues

> ⚠️ **Chưa kiểm thử.** Số lượng bugs sẽ được cập nhật sau khi chạy test.

- Số bugs xác nhận: —
- Số performance issues: —

---

## Agent Skill

- **Tên:** `performance-testing-skill`
- **Mô tả:** Skill tái sử dụng cho performance testing lifecycle, hỗ trợ API discovery, JMeter test plan generation, JTL analysis, và report generation.
- **Video demo:** *(chưa có)*

---

## Demo Video

- **Task 1 Video:** *(chưa quay — tối thiểu 6 phút, giọng Việt, YouTube unlisted)*
- **Agent Skill Video:** *(chưa quay)*

---

## Tự Đánh Giá

| Tiêu chí | Điểm tối đa | Điểm tự đánh giá |
|----------|-------------|------------------|
| Load Testing | 30 | — |
| Stress Testing | 20 | — |
| Spike Testing | 20 | — |
| Task 2 – AI Analysis and Misinterpretation Hunt | 10 | — |
| Task 3 – Continuous Performance Testing | 10 | — |
| Agent Skills | 10 | — |
| **Tổng** | **100** | **—** |

> ⚠️ Điểm tự đánh giá sẽ được cập nhật sau khi hoàn thành tất cả tasks.

---

## Cấu Trúc Thư Mục

```
HW05/
├── README.md                    ← File này
├── docs/
│   ├── assignment-analysis.md
│   ├── requirement-traceability.md
│   └── implementation-roadmap.md
├── report/
├── test-plans/
├── test-data/
├── results/
├── html-reports/
├── evidence/
│   ├── Load/
│   ├── Stress/
│   ├── Spike/
│   ├── Endurance/
│   └── Hardware/
├── analysis/
├── continuous-testing/
├── agent-skill/
├── video/
├── git/
└── bugs/
```

---

*Cập nhật lần cuối: 2026-11-18*

