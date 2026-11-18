# Phân Tích Bài Tập HW05 – Performance Testing

> **Sinh viên:** Nguyễn Hữu Phúc – MSSV: 23120157  
> **Ngày phân tích:** 2026-11-18  
> **Hệ thống kiểm thử (SUT):** EShop  
> **Repository:** https://github.com/ttbhanh/eshop-sut

---

## 1. Tổng Quan Bài Tập

HW05 yêu cầu thực hiện **Performance Testing** toàn diện cho hệ thống EShop sử dụng Apache JMeter. Bài tập gồm 3 task chính và 1 phần Agent Skill.

- **Mã bài tập:** HW05-AI
- **Thời gian ước tính:** 10 giờ
- **Hình thức:** Bài tập cá nhân
- **Nộp bài:** Moodle (report) + GitHub (code/test plans)
- **Chính sách AI:** Open — bắt buộc AI Audit Report

---

## 2. Các Task và Yêu Cầu Chi Tiết

### Task 1: Performance Testing (70 điểm)

#### 1.1 Load Testing (30 điểm)
- Thiết kế và thực thi Load Test Plan bằng Apache JMeter
- Sử dụng **end-to-end workflow** bao gồm 3 nhóm endpoint:
  - **Auth-heavy**: Login, authentication
  - **Read-heavy**: Danh sách sản phẩm, chi tiết sản phẩm, tìm kiếm
  - **Transactional**: Thêm giỏ hàng, checkout
- Yêu cầu kỹ thuật:
  - Virtual users, ramp-up, think-time phù hợp
  - CSV Data Set Config cho test data
  - JWT token extraction động
  - Business assertions
  - **Listener bắt buộc: Summary Report**
- Tên file: `23120157_Load_YYYYMMDD.jmx`

#### 1.2 Stress Testing (20 điểm)
- Cùng workflow như Load Test
- Tải tăng dần (stepped workload)
- Xác định maximum sustainable load
- Xử lý account lockout
- **Listener bắt buộc: Aggregate Report**
- Tên file: `23120157_Stress_YYYYMMDD.jmx`

#### 1.3 Spike Testing (20 điểm)
- Cùng workflow
- Baseline → spike đột ngột → peak → recovery
- **Listener bắt buộc: View Results Tree**
- Tên file: `23120157_Spike_YYYYMMDD.jmx`

#### 1.4 Endurance / Soak Testing
- Thời gian: 10–15 phút
- Xác định maximum stable RPS, memory ceiling

#### 1.5 Yêu Cầu Evidence
- 3 raw JTL files
- 3 HTML Dashboard folders
- Resource-monitor screenshots (JMeter + backend cùng frame)
- Hardware report (dxdiag screenshot + spec table)
- Video demo ≥6 phút (YouTube unlisted, giọng Việt)
- Account lockout reset documentation

### Task 2: AI Analysis & Misinterpretation Hunt (10 điểm)
- Phân tích file JTL thực (Load, Stress, Spike, Endurance)
- Tính: Total/Success/Failed requests, Avg/Median/Min/Max, p90/p95/p99, RPS, Error rate
- Misinterpretation Hunt: phát hiện AI sai metric
- Optimization Review: Feasible / Hallucinated / Needs verification

### Task 3: Continuous Performance Testing (10 điểm)
- Mô hình CI/CD giám sát commits
- p95 regression detection
- Flowchart Mermaid
- Trade-off discussion

### Agent Skill (10 điểm)
- Skill `performance-testing-skill`
- Toàn lifecycle performance testing
- Script `analyze-jtl.py`
- Video demo Agent Skill

---

## 3. Tiêu Chí Đánh Giá (Rubric)

| Tiêu chí | Điểm tối đa |
|----------|-------------|
| Load Testing | 30 |
| Stress Testing | 20 |
| Spike Testing | 20 |
| Task 2 – AI Analysis and Misinterpretation Hunt | 10 |
| Task 3 – Continuous Performance Testing | 10 |
| Agent Skills | 10 |
| **Tổng** | **100** |

---

## 4. Ràng Buộc Chống Gian Lận (Anti-AI-Cheat)

1. Tên file test plan phải đúng format `{StudentID}_{ScenarioType}_{YYYYMMDD}`
2. Raw .jtl log files phải đầy đủ (không chỉ summary)
3. Demo video phải có JMeter + resource monitor cùng frame, giọng sinh viên
4. Hardware report hostname phải khớp với các bài tập trước

---

## 5. Môi Trường và Phần Cứng

### 5.1 Hardware

| Thành phần | Thông số |
|-----------|---------|
| CPU | 13th Gen Intel Core i7-1355U (10 cores, 12 logical processors) |
| RAM | 15.7 GB |
| Storage | Micron MTFDKCD512TFK SSD 477 GB |
| OS | Microsoft Windows 11 Home Single Language (Build 10.0.26200) |

### 5.2 Software

| Phần mềm | Phiên bản | Đường dẫn |
|----------|----------|----------|
| Node.js | v22.20.0 | — |
| npm | 11.7.0 | — |
| Java | 21.0.11 LTS | — |
| Apache JMeter | 5.6.3 | `D:\apache-jmeter-5.6.3\apache-jmeter-5.6.3\bin\jmeter.bat` |

### 5.3 EShop SUT

| Thành phần | Công nghệ | Port |
|-----------|----------|------|
| Backend API | Node.js + Express + SQLite | 3000 |
| Frontend Web | React 19 + Vite 8 | 5173 |
| Frontend Admin | React 19 + Vite 8 | 5174 |

### 5.4 Test Accounts

| Vai trò | Email | Password |
|---------|-------|----------|
| Admin | admin@eshop.com | Admin123! |
| User | test@eshop.com | Test1234! |

### 5.5 Seed Data (Products)

| ID | Tên | Giá (₫) | Category |
|----|-----|---------|----------|
| 1 | iPhone 15 Pro Max | 30,000,000 | 1 (Điện thoại) |
| 2 | Samsung Galaxy S24 Ultra | 28,000,000 | 1 (Điện thoại) |
| 3 | MacBook Pro M3 | 45,000,000 | 2 (Laptop) |
| 4 | Tai nghe AirPods Pro 2 | 6,000,000 | 3 (Phụ kiện) |
| 5 | Bàn phím cơ Keychron Q1 | 4,000,000 | 3 (Phụ kiện) |

---

## 6. Phát Hiện Quan Trọng Từ Source Code

### 6.1 Account Lockout Bug (server.js:54)
```javascript
const newAttempts = user.login_attempts + 2; // BUG: tăng 2 thay vì 1
```
- Mỗi lần sai password → `login_attempts` tăng **2** (đặc tả yêu cầu tăng 1)
- Chỉ cần **1 lần sai** → attempts = 2, lần sai thứ 2 → 4 ≥ 3 → bị khóa
- Lockout duration: 180,000ms = **3 phút** (đặc tả nói 30 giây)
- **Impact:** Tuyệt đối KHÔNG submit sai password trong test plans

### 6.2 Cart lưu trong Memory (server.js:14)
```javascript
const userCarts = {}; // In-memory, không persist
```
- Restart backend = mất toàn bộ cart data
- Mỗi virtual user cần add to cart trước khi checkout trong cùng session

### 6.3 Product Price Bug (server.js:162)
```javascript
if (row.id % 2 === 0) row.price = row.price.toString(); // ID chẵn → price thành string
```

### 6.4 Database Reset on Start (database.js:117)
```javascript
initDatabase(); // DROP tất cả bảng → reseed mỗi khi import
```
- Backend restart = database hoàn toàn mới
- Orders sẽ tích lũy trong database cho đến khi restart

---

## 7. Prerequisites Checklist

### ✅ Đã Có
- [x] Node.js v22.20.0
- [x] npm 11.7.0
- [x] Java 21.0.11 LTS
- [x] Apache JMeter 5.6.3
- [x] EShop repository (branch `hw5/phuc`)
- [x] Source code đầy đủ (backend, frontend-web, frontend-admin)

### ⚠️ Cần Thực Hiện
- [ ] `npm ci` trong `backend/` để cài dependencies
- [ ] Khởi động backend trước khi chạy test
- [ ] Tạo CSV test data files
- [ ] Thêm JMeter vào PATH hoặc dùng full path

### ❗ Lưu Ý
- Chỉ cần test backend API (port 3000), không cần frontend
- Account lockout cần xử lý cẩn thận
- Database tích lũy orders → cân nhắc restart giữa test runs

