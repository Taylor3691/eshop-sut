# Phân tích kết quả

- **Dữ liệu:** 7 phiên chính thức P1–P7, ngày 15/11/2026 (`sessions/Px/notes.md`, `sus-and-metrics.xlsx`). Phiên Pilot dùng để chỉnh kế hoạch (`plan.md` mục 9.2), **không tính** vào các số liệu dưới đây.
- **Flow:** B1 Đăng nhập → B2 Tạo danh mục → B3 Thêm sản phẩm → B4 Tạo mã giảm giá → B5 Cập nhật trạng thái đơn → B6 Đăng xuất. Tiêu chí hoàn thành, thời gian mục tiêu và thời gian tối đa theo `plan.md` mục 2.
- **Mã quan sát:** H = hesitation, E = error, F = friction (`plan.md` mục 7.4). Mức độ trong ghi chú quan sát: 1 = nhẹ, 2 = vừa, 3 = nặng.
- Trích dẫn ghi theo dạng *Px mm:ss* (dòng quan sát) hoặc *Px C2* (câu probe).

---

## 1. Điểm SUS

| Người tham gia | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Điểm SUS | Mức chấp nhận (Bangor et al.) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| P1 | 4 | 3 | 3 | 2 | 4 | 4 | 4 | 3 | 4 | 2 | 62.5 | Marginal |
| P2 | 3 | 4 | 3 | 1 | 3 | 4 | 4 | 3 | 4 | 2 | 57.5 | Marginal |
| P3 | 2 | 4 | 2 | 3 | 3 | 3 | 3 | 4 | 2 | 3 | 37.5 | Not acceptable |
| P4 | 4 | 2 | 4 | 1 | 4 | 3 | 5 | 2 | 4 | 1 | 80.0 | Acceptable |
| P5 | 3 | 4 | 3 | 2 | 3 | 4 | 4 | 3 | 3 | 2 | 52.5 | Marginal |
| P6 | 4 | 3 | 3 | 2 | 4 | 3 | 3 | 3 | 3 | 2 | 60.0 | Marginal |
| P7 | 3 | 4 | 2 | 2 | 3 | 4 | 3 | 4 | 3 | 3 | 42.5 | Not acceptable |

| Thống kê | Giá trị |
|---|---|
| Trung bình | **56.07** |
| Độ lệch chuẩn | 13.98 |
| Trung vị | 57.5 |
| Min / Max | 37.5 (P3) / 80.0 (P4) |
| Khoảng tin cậy 95% (t, df = 6) | 43.1 – 69.0 |

**Nhận xét:**
- Điểm trung bình 56.07 **thấp hơn mốc trung bình 68** (Sauro). Theo thang mức chấp nhận của Bangor et al. (2009), điểm này nằm trong vùng **Marginal** (50–70). Theo thang tính từ, nó nằm giữa "OK" (50.9) và "Good" (71.4), gần "OK" hơn.
- Chỉ 1/7 người (P4) đạt vùng Acceptable (> 70). 2/7 người (P3, P7) ở vùng Not acceptable (< 50).
- Mẫu chỉ có 7 người nên khoảng tin cậy rộng (43.1–69.0). Cận trên vẫn chạm mốc 68, nên kết luận "dưới trung bình" chỉ mang tính tham khảo, đúng như `plan.md` mục 1 (O6).

**Đóng góp trung bình từng câu** (thang 0–4 sau khi quy đổi; càng cao càng tốt):

| Câu | Nội dung (rút gọn) | Điểm gốc TB | Đóng góp TB |
|---|---|---|---|
| Q6 | Có quá nhiều chỗ không nhất quán | 3.57 | **1.43** (thấp nhất) |
| Q2 | Phức tạp không cần thiết | 3.43 | 1.57 |
| Q3 | Dễ sử dụng | 2.86 | 1.86 |
| Q8 | Rườm rà, khó thao tác | 3.14 | 1.86 |
| Q1 | Muốn dùng thường xuyên | 3.29 | 2.29 |
| Q9 | Tự tin khi dùng | 3.29 | 2.29 |
| Q5 | Chức năng kết hợp hợp lý | 3.43 | 2.43 |
| Q7 | Mọi người học nhanh | 3.71 | 2.71 |
| Q10 | Phải học nhiều thứ trước | 2.14 | 2.86 |
| Q4 | Cần người kỹ thuật hỗ trợ | 1.86 | **3.14** (cao nhất) |

Người tham gia **không thấy cần hỗ trợ kỹ thuật hay phải học nhiều** (Q4, Q10 cao), nhưng thấy trang **thiếu nhất quán và phức tạp không cần thiết** (Q6, Q2 thấp). Điều này khớp với quan sát: mọi người đều tự đi hết flow, nhưng mất thời gian ở những ô không có nhãn, có giá trị sẵn hoặc không báo lỗi (mục 3).

**Theo kinh nghiệm quản trị** (`participants.md`): nhóm đã từng dùng trang quản lý bán hàng (P1, P4, P5, P6) có SUS trung bình **63.75**. Nhóm chưa dùng (P2, P3, P7) có trung bình **45.83**. Hai người có điểm thấp nhất (P3, P7) đều thuộc nhóm chưa dùng. Mỗi nhóm chỉ có 3–4 người nên đây chỉ là xu hướng, không phải kết luận.

---

## 2. Task metrics

### 2.1. Theo bước

| Bước | Hoàn thành Y / A / N | Thời gian TB (giây) | Trung vị | Min – Max | Vượt mục tiêu | Vượt tối đa | Tổng lỗi (số người có lỗi) | Trợ giúp |
|---|---|---|---|---|---|---|---|---|
| B1 Đăng nhập (mục tiêu ≤ 60, tối đa 180) | 7 / 0 / 0 | 59.3 | 50 | 35 – 95 | 3/7 | 0/7 | 1 (1) | 0 |
| B2 Danh mục (≤ 60, 180) | 7 / 0 / 0 | 123.9 | 130 | 55 – 200 | 6/7 | 1/7 (P7) | 4 (4) | 0 |
| B3 Sản phẩm (≤ 120, 420) | 6 / 0 / 1 | 212.6 | 210 | 150 – 280 | 7/7 | 0/7 | 6 (5) | 0 |
| B4 Mã giảm giá (≤ 180, 480) | 6 / 0 / 1 | 259.3 | 245 | 200 – 340 | 7/7 | 0/7 | 2 (2) | 0 |
| B5 Đơn hàng (≤ 120, 240) | 7 / 0 / 0 | 114.0 | 118 | 70 – 150 | 3/7 | 0/7 | 0 (0) | 0 |
| B6 Đăng xuất (≤ 30, 120) | 6 / 1 / 0 | 50.3 | 40 | 32 – 88 | 7/7 | 0/7 | 0 (0) | 1 |

### 2.2. Theo người tham gia

| Người tham gia | B1 | B2 | B3 | B4 | B5 | B6 | Tổng thời gian | Tổng lỗi | Trợ giúp |
|---|---|---|---|---|---|---|---|---|---|
| P1 | Y | Y | Y | Y | Y | Y | 11:56 | 1 | 0 |
| P2 | Y | Y | Y | Y | Y | Y | 13:14 | 1 | 0 |
| P3 | Y | Y | **N** | **N** | Y | **A** | 15:08 | 4 | 1 |
| P4 | Y | Y | Y | Y | Y | Y | 9:02 | 0 | 0 |
| P5 | Y | Y | Y | Y | Y | Y | 11:50 | 1 | 0 |
| P6 | Y | Y | Y | Y | Y | Y | 15:32 | 4 | 0 |
| P7 | Y | Y | Y | Y | Y | Y | 18:53 | 2 | 0 |

**Toàn bộ flow:** 6/7 người đạt cả 6 bước mà không cần trợ giúp. Thời gian trung bình là 13:39 (trung vị 13:14). Chỉ P4 đạt mục tiêu ≤ 10 phút; cả 7 người đều xong trong giới hạn 30 phút.

**Nhận xét:**
- **B3 và B4 là hai bước tắc nhất.** Cả 7/7 người vượt thời gian mục tiêu ở hai bước này. Đây cũng là hai bước duy nhất có kết quả N: P3 lưu sản phẩm vào nhóm "Điện thoại" và lưu mã với đơn tối thiểu 0, số lần 1. P3 không nhận ra mình đã lưu sai (mục 3, I1 và I2).
- **B2 có nhiều lỗi điều hướng nhất:** 4/7 người (P2, P3, P6, P7) mở Sản phẩm trước khi sang Danh mục (I5).
- **B5 không có lỗi nào**, nhưng 7/7 người đều do dự trước cặp nút Xác nhận / Hủy (I6).
- **B6:** mọi người đều vượt mục tiêu 30 giây. P3 cần một gợi ý mức 2 mới tìm thấy nút Đăng xuất (I7).
- **Tổng cộng 80 dòng quan sát:** 55 H, 13 F, 12 E. Mức độ: 37 dòng mức 1, 39 dòng mức 2, 4 dòng mức 3. Cả 4 dòng mức 3 đều thuộc form sản phẩm và form mã giảm giá (P3 06:40, P3 08:20, P3 11:05, P7 09:50).

> **Ghi chú dữ liệu:** B2 của P7 mất 200 giây, vượt thời gian tối đa 180 giây (`plan.md` mục 2) nhưng phiếu ghi là **Y**. Bảng trên giữ nguyên như phiếu, người điều phối cần xác nhận lại.

---

## 3. Nhóm vấn đề (affinity)

Các quan sát và câu trả lời probe được gom theo nguyên nhân. Mỗi nhóm có một mã (I1–I10) để dùng ở các mục sau.

### I1. Form mã giảm giá: hai ô có sẵn số 0 và 1, không có nhãn

- **Gặp ở:** 7/7 người (P1 06:10, P2 06:30, P3 08:20, P4 04:20, P5 06:10, P6 08:10, P7 09:50). Câu C2 của cả 7 người đều nhắc tới chỗ này.
- **Hậu quả:** P3 giữ nguyên 0 và 1 rồi lưu, nên B4 = N: *"Trong ô có số rồi. Em tưởng trang đã điền giúp."* (P3 08:20). 6 người còn lại phải dò tiêu đề cột của bảng bên dưới mới biết ô nào là gì (P2 08:10, P5 07:50, P7 11:30).
- **Trích dẫn:** *"Hai ô có số mà không có tên. Em không dám bấm."* (P7 09:50, mức 3); *"Value có sẵn nên placeholder mất. Người không biết sẽ giữ 0 và 1."* (P4 04:20).
- **Đề xuất của người tham gia:** W1 của P1, P2, P3, P4, P5, P6, P7 đều nhắc tới việc bỏ số có sẵn hoặc ghi tên ô.

### I2. Ô chọn nhóm hàng đã chọn sẵn "Điện thoại" và không có nhãn

- **Gặp ở:** 7/7 người nhận thấy (P1 04:50, P2 04:50, P3 06:40, P4 03:10, P5 04:20, P6 06:20, P7 08:10).
- **Hậu quả:** P3 không biết đó là ô chọn nhóm nên để nguyên, sản phẩm bị lưu vào "Điện thoại", B3 = N: *"Ô này không có tên. Em không biết có phải nhóm hàng không, em để vậy."* (P3 06:40, mức 3). 6 người còn lại tự đổi trước khi lưu.

### I3. Bảng sản phẩm không có cột nhóm hàng nên không kiểm lại được

- **Gặp ở:** 7/7 người (P1 05:30; P4 03:50; C3 hoặc T1 của P2, P3, P4, P5, P6, P7).
- **Hậu quả:** Người dùng không tự phát hiện được lỗi I2. P3 tưởng đã xong (*"Thấy tên áo và mã hiện lên thì em tưởng đã xong."*, P3 T1). Câu T1 cho thấy niềm tin bị chia đôi: các giá trị hiện lại trên bảng (tên, giá, mã) thì chắc, còn nhóm hàng thì không: *"Nhóm của áo không hiện lại, nên phần đó em kém chắc hơn."* (P7 T1).
- **Đề xuất của người tham gia:** thêm cột danh mục vào bảng (W1 của P4, P7).

### I4. Ô giá nhận "890.000" thành số thập phân mà không cảnh báo

- **Gặp ở:** 5/7 người gõ 890.000 rồi phải tự sửa (P1 03:40, P3 05:20, P5 02:40, P6 04:20, P7 06:30). P2 và P4 biết trước nên tránh được (P2 03:40, P4 01:50).
- **Hậu quả:** Không ai lưu giá sai, nhưng việc sửa hoàn toàn dựa vào người dùng tự để ý: *"Ô nuốt dấu chấm thành số lẻ. Phải gõ 890000."* (P1 03:40); *"Trang không cảnh báo, em tự đếm chữ số."* (P7 E1). Người đã quen phần mềm bán hàng khác mang theo thói quen gõ dấu nghìn (P6 04:20 nhắc tới Kiot; P5 02:40 nhắc tới lúc đăng bài).

### I5. Chưa biết bắt đầu từ đâu: "Danh mục" không khớp với cách gọi "nhóm hàng"

- **Gặp ở:** 4/7 người mở nhầm Sản phẩm ở B2 (P2 01:30, P3 01:10, P6 01:50, P7 02:50). Có 2 người dừng ở các con số của Dashboard (P2 00:55, P7 01:40; P7 C1).
- **Hậu quả:** B2 có 4 lỗi, và 6/7 người vượt mục tiêu 60 giây. Ai cũng tự tìm ra Danh mục: *"Bên quầy em gọi là nhóm hàng. Ở đây em chưa thấy chữ đó."* (P6 01:50).
- **Ý phụ:** khối Import CSV / Choose File làm một số người nghĩ phải nhập hàng bằng file (P2 01:30, P2 C1, P2 E1 *"Có lúc suýt nhập nhầm chỗ file."*).

### I6. Nút Hủy nằm sát nút Xác nhận ở dòng đơn hàng

- **Gặp ở:** 7/7 người do dự (P1 10:10, P2 11:10, P3 11:40, P4 07:40, P5 09:50, P6 13:20, P7 15:30).
- **Hậu quả:** Không ai bấm nhầm (B5 không có lỗi nào), nhưng mọi người đều phải chậm lại để nhìn kỹ: *"Xác nhận với Hủy nằm sát. Em bấm nhầm là hủy đơn người ta."* (P1 10:10); *"Em sợ nút Hủy nên em nhìn kỹ trước khi bấm."* (P6 T2).

### I7. Nghĩ rằng đóng tab là đã đăng xuất

- **Gặp ở:** 2/7 người định đóng tab (P3 13:55, P7 17:50). Câu T4 của P1, P4, P5, P7 cho thấy họ biết đóng tab không an toàn, nhưng chỉ vì đã quen.
- **Hậu quả:** P3 cần gợi ý mức 2, B6 = A: *"Em tìm chữ Logout không thấy. Đóng tab là ra chưa?"* (P3 13:55). Theo `plan.md` mục 2, đóng tab thì token vẫn còn trong `localStorage`, nên phiên vẫn mở cho người dùng sau.

### I8. Ô ngày không nhận kiểu gõ 31/12/2026

- **Gặp ở:** 1/7 người (P6 10:50, tính là lỗi ở B4). Câu W1 của P6 đề nghị cho ô ngày nhận kiểu này.
- **Hậu quả:** P6 tự gõ lại 31122026 (P6 11:40). Những người khác gõ số liền thì được ngay (P3 09:40).

### I9. Chữ tiếng Anh trên giao diện

- **Gặp ở:** P1 00:18, P3 (C1, S1, W1, và 13:55 khi tìm chữ "Logout"), P4 00:10, P6 C4.
- **Hậu quả:** Không ai bị chặn ở B1. P3 nói rõ chỗ nào hiểu tiếng Anh thì làm nhanh, chỗ nào không thì chậm (P3 S1). W1 của P3 là *"Viết tiếng Việt lên từng ô, và đừng điền sẵn số."*

### I10. Không có ô tìm hoặc lọc đơn hàng

- **Gặp ở:** câu S2 của 6/7 người (P1, P2, P4, P5, P6, P7).
- **Hậu quả:** Với 3 đơn thì không ảnh hưởng (B5 TB 114 giây, không có lỗi). Đây là lo ngại khi số đơn tăng lên: *"Đông như ca tối thì em cần ô tìm."* (P6 S2).

### Điểm làm tốt (không cần sửa)

- **Đăng nhập sai có báo lỗi** và người dùng tự sửa được (P6 00:25, P6 E2).
- **Bảng mã giảm giá hiện đủ các giá trị đã lưu**, nên ai đọc lại đều kiểm được (P1 09:35, P2 10:30, P4 07:05, P5 09:15).
- **Trạng thái đơn đổi ngay trên đúng dòng**, cả 7/7 người đều chắc đơn đã được duyệt đúng (T2).
- **Nút Đăng xuất màu đỏ ở cuối cột trái** được 6/7 người tự tìm thấy.

---

## 4. Bug riêng lẻ vs. vấn đề thiết kế hệ thống

### 4.1. Bug riêng lẻ (một nguyên nhân, sửa được tại chỗ)

| Nhóm | Mô tả | Liên quan bug đã có (Task 1) |
|---|---|---|
| I1 | Ô Đơn tối thiểu và Số lần có giá trị sẵn 0 / 1, che mất placeholder, không có nhãn | BUG-17 (#134) — đã ghi ô có giá trị mặc định không còn placeholder |
| I2 | Ô chọn danh mục chọn sẵn danh mục đầu, không có lựa chọn gợi ý | BUG-23 (#140); thiếu nhãn — BUG-17 (#134) |
| I3 | Bảng sản phẩm không có cột danh mục | **BUG-34 (mới)** |
| I4 | Ô giá nhận số thập phân (890.000 → 890) mà không cảnh báo | BUG-07 (#29) — form lưu được giá số lẻ |
| I6 | Nút Hủy màu xám (không phải đỏ như FR-21), sát ngay dưới Xác nhận, hủy đơn ngay không hỏi lại | **BUG-35 (mới)** |
| I8 | Ô ngày không nhận kiểu gõ 31/12/2026 | **Không ghi bug.** Đã kiểm lại trên Chrome 157 (ô trống, bấm vào phần ngày rồi gõ): cả "31/12/2026", "31122026", "31-12-2026" và "31.12.2026" đều được nhận là 2026-12-31. Ô dùng `input type="date"` gốc của trình duyệt. Không tái hiện được lỗi P6 gặp; phiên không quay màn hình nên không xác định được P6 đã thao tác thế nào. |
| I9 | Chữ tiếng Anh: Login, Email, Password, Choose File, Import CSV | BUG-21 (#138) |

### 4.2. Vấn đề thiết kế hệ thống (lặp lại ở nhiều màn hình hoặc nhiều bước)

| # | Vấn đề | Nhóm liên quan | Bằng chứng |
|---|---|---|---|
| D1 | **Form dựa vào placeholder thay cho nhãn, lại không kiểm tra hay báo lỗi khi nhập.** Cả ba form (sản phẩm, mã giảm giá, ô ngày) đều để dữ liệu sai được lưu mà không có câu báo nào. | I1, I2, I4, I8 | Cả 4 dòng quan sát mức 3; 2 bước N của P3; *"Lúc sai giá và sai ngày thì không có câu nào."* (P6 E2) |
| D2 | **Sau khi lưu, trang không hiện lại đủ những gì đã lưu**, nên người dùng không tự kiểm được và tin nhầm là đã xong. | I3 (cùng một phần I2) | T1 của 7/7 người; P3 không phát hiện được lỗi của chính mình |
| D3 | **Từ ngữ và cách sắp xếp chưa khớp với cách nghĩ của chủ shop:** "Danh mục" thay cho "nhóm hàng", chữ tiếng Anh, Dashboard không chỉ ra việc đầu tiên cần làm, khối Import CSV nổi bật. | I5, I9 | 4/7 lỗi ở B2; Q6 và Q2 có điểm SUS thấp nhất |
| D4 | **Thao tác không đảo ngược được đặt sát thao tác chính, không có lớp bảo vệ.** | I6 / BUG-35 (cùng kiểu với BUG-04: xóa không hỏi lại) | 7/7 người do dự ở B5 |
| D5 | **Việc kết thúc phiên không rõ ràng:** đóng tab không đăng xuất, và nút đăng xuất không phải chữ mà người dùng tìm. | I7 | 2/7 định đóng tab; P3 cần trợ giúp |

Nhóm I10 (thiếu ô tìm đơn) là **yêu cầu tính năng** cho lúc có nhiều đơn hơn, chưa phải lỗi gặp trong phiên.

---

## 5. Xếp hạng severity (Nielsen 0–4)

Thang Nielsen: 0 = không phải vấn đề khả dụng, 1 = chỉ thẩm mỹ, 2 = nhỏ (ưu tiên thấp), 3 = lớn (ưu tiên cao), 4 = thảm họa (phải sửa trước khi phát hành). Mức được chấm theo ba yếu tố: **tần suất** (số người gặp), **tác động** (có làm hỏng bước hoặc lưu sai dữ liệu không) và **tính lặp lại** (người đã biết có còn bị lại không).

| Hạng | Nhóm | Vấn đề | Tần suất | Tác động | Severity |
|---|---|---|---|---|---|
| 1 | I1 | Ô mã giảm giá có sẵn 0 / 1, không có nhãn | 7/7 | Lưu sai điều kiện mã mà không biết (P3, B4 = N); mọi người còn lại phải đoán ô | **4** |
| 2 | I2 | Danh mục chọn sẵn "Điện thoại", không có nhãn | 7/7 thấy, 1/7 lưu sai | Sản phẩm vào sai nhóm mà không biết (P3, B3 = N) | **3** |
| 3 | I3 | Bảng sản phẩm không có cột danh mục | 7/7 | Không kiểm được nhóm, nên lỗi I2 không bị phát hiện; giảm niềm tin (T1) | **3** |
| 4 | I4 | Ô giá nhận 890.000 mà không cảnh báo | 5/7 | Có nguy cơ lưu giá 890 ₫; trong phiên ai cũng tự sửa được | **3** |
| 5 | I7 | Đóng tab không đăng xuất, khó tìm chữ đăng xuất | 2/7 | Phiên admin vẫn mở trên máy dùng chung; P3 cần trợ giúp (B6 = A) | **3** |
| 6 | I5 | "Danh mục" khác "nhóm hàng", mở nhầm Sản phẩm | 4/7 | Mất thời gian (B2 TB 124 giây so với mục tiêu 60), ai cũng tự tìm ra | **2** |
| 7 | I6 | Nút Hủy sát nút Xác nhận | 7/7 | Do dự, chưa ai bấm nhầm; nhưng bấm nhầm thì hủy đơn của khách | **2** |
| 8 | I9 | Chữ tiếng Anh trên giao diện | 4/7 nhắc tới | Chậm hơn với người ít dùng tiếng Anh, không chặn bước nào | **2** |
| 9 | I8 | Ô ngày không nhận 31/12/2026 | 1/7 | 1 lỗi, tự sửa được | **2** |
| 10 | I10 | Không có ô tìm / lọc đơn | 6/7 nhắc tới | Chưa ảnh hưởng với 3 đơn | **1** |

**Chặn hoàn thành task (blocker):** chỉ có I1 và I2. Đây là hai nguyên nhân của hai bước N trong toàn bộ 42 lượt bước (7 người × 6 bước). Cả hai cùng thuộc vấn đề thiết kế D1, và I3 (D2) làm chúng không bị phát hiện.

---

## 6. Đề xuất cải tiến

Sắp theo thứ tự ưu tiên ở mục 5. Cột cuối là người tham gia đã đề xuất cùng ý ở câu W1.

| Ưu tiên | Đề xuất | Giải quyết | Người tham gia đề xuất (W1) |
|---|---|---|---|
| 1 | Thêm nhãn luôn hiện cho mọi ô ở form mã giảm giá ("Đơn tối thiểu (₫)", "Số lần dùng / khách"); bỏ giá trị 0 / 1 có sẵn, chỉ dùng placeholder làm ví dụ | I1, D1 | P1, P2, P3, P4, P5, P6, P7 |
| 2 | Ô danh mục để trống với lựa chọn "— Chọn danh mục —" và bắt buộc phải chọn; thêm nhãn "Danh mục" | I2, D1 | — |
| 3 | Thêm cột Danh mục vào bảng sản phẩm; sau khi lưu hiện thông báo tóm tắt những gì đã lưu | I3, D2 | P4, P7 |
| 4 | Ô giá: chặn hoặc cảnh báo khi nhập số thập phân, hoặc tự hiểu dấu chấm là dấu nghìn; hiện số tiền định dạng vi-VN ngay dưới ô (ví dụ "890.000 ₫") | I4, D1 | — |
| 5 | Ghi chữ "Đăng xuất" rõ ràng trên thanh đầu trang; cân nhắc hết phiên khi đóng tab (lưu token trong `sessionStorage`) | I7, D5 | — |
| 6 | Đổi tên hoặc thêm chú thích cho mục menu (ví dụ "Danh mục (nhóm hàng)"); trên Dashboard thêm lối tắt cho việc thường làm (thêm danh mục, thêm sản phẩm); thu gọn khối Import CSV | I5, D3 | — |
| 7 | Tách nút Hủy khỏi nút Xác nhận (khác màu, cách xa nhau, hoặc đưa vào menu "Thêm"), và hỏi lại trước khi hủy đơn | I6, D4 | — |
| 8 | Việt hóa các chữ còn lại: Login, Email, Password, Choose File, Import CSV | I9, D3 | P3 |
| 9 | Cho ô ngày nhận kiểu gõ dd/mm/yyyy có dấu gạch, hoặc ghi rõ cách gõ | I8, D1 | P6 |
| 10 | Thêm ô tìm đơn theo địa chỉ, tên khách hoặc mã đơn, và lọc theo trạng thái | I10 | — |

**Bug ghi từ Task 2** (`../bugs/README.md`):

| Nhóm | Quyết định | Lý do |
|---|---|---|
| I3 | **BUG-34 (mới)** | Không xem được dữ liệu bắt buộc (danh mục) của sản phẩm; làm lỗi I2 không bị phát hiện (P3) |
| I6 | **BUG-35 (mới)** | Nút hủy không dùng màu đỏ (trái FR-21); hủy đưa đơn sang trạng thái kết thúc (FR-10) mà không hỏi lại |
| I1, I2, I4, I9 | Bổ sung bằng chứng vào BUG-17, BUG-23, BUG-07, BUG-21 | Cùng nguyên nhân với bug đã có từ Task 1, không tạo bug trùng |
| I5 | Không ghi bug | Tên mục "Danh mục" không sai spec; là đề xuất về từ ngữ (ưu tiên 6) |
| I7 | Không ghi bug | Không có yêu cầu nào bắt phiên phải kết thúc khi đóng tab; nút "Đăng xuất" đúng nhãn (FR-23), màu đỏ, 6/7 người tự tìm thấy. Giữ là đề xuất (ưu tiên 5) |
| I8 | Không ghi bug | Không tái hiện được trên Chrome 157 (mục 4.1) |
| I10 | Không ghi bug | Yêu cầu tính năng, không có trong spec |
