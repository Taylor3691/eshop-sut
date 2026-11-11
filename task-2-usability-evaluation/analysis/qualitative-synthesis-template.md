# Tổng hợp Định tính & Phân tích Điểm nghẽn Trải nghiệm (Qualitative Synthesis Template)

> **Mô tả:** Biểu mẫu tổng hợp dữ liệu định tính từ ghi chép quan sát của 07 phiên kiểm thử (Think-Aloud notes, nhật ký hành vi, và câu trả lời phỏng vấn sâu).  
> Giúp gom cụm các vấn đề tương đồng (Affinity Diagramming), phân biệt lỗi cá biệt với vấn đề thiết kế mang tính hệ thống, và xếp thứ tự ưu tiên xử lý.

---

## 1. Bản đồ Gom cụm Điểm nghẽn theo Chủ đề (Thematic Affinity Grouping)

### Chủ đề 1: Đăng nhập & Duy trì Trạng thái Phiên (FR-02)
- **Tần suất bắt gặp:** `.. / 7 người tham gia`
- **Mô tả hiện tượng:** `[Ghi nhận khó khăn khi đăng nhập, thông báo lỗi thiếu rõ ràng hoặc quên mật khẩu]`
- **Bằng chứng trích dẫn:**
  - P##: *"[Trích dẫn lời người dùng]"*
- **Phân loại bản chất:** `Lỗi chức năng / Vấn đề thiết kế hệ thống / Thao tác người dùng`
- **Mức độ nghiêm trọng:** `Nghiêm trọng (Blocker) / Vừa / Nhẹ`

### Chủ đề 2: Tương tác Giỏ hàng & Điều chỉnh Số lượng (FR-07)
- **Tần suất bắt gặp:** `.. / 7 người tham gia`
- **Mô tả hiện tượng:** `[Khó khăn khi tăng giảm số lượng, thiếu hộp thoại xác nhận khi xóa, nhãn tổng tiền]`
- **Bằng chứng trích dẫn:**
  - P##: *"[Trích dẫn lời người dùng]"*
- **Phân loại bản chất:** `Vấn đề thiết kế hệ thống (Systemic Design Issue)`
- **Mức độ nghiêm trọng:** `...`

### Chủ đề 3: Trải nghiệm Nhập & Áp dụng Mã Giảm Giá (FR-09)
- **Tần suất bắt gặp:** `.. / 7 người tham gia`
- **Mô tả hiện tượng:** `[Không tìm thấy ô nhập coupon, mã không ăn, thông báo lỗi mơ hồ, không rõ số tiền giảm]`
- **Bằng chứng trích dẫn:**
  - P##: *"[Trích dẫn lời người dùng]"*
- **Phân loại bản chất:** `...`
- **Mức độ nghiêm trọng:** `...`

### Chủ đề 4: Tóm tắt Đơn hàng & Thanh toán (FR-08)
- **Tần suất bắt gặp:** `.. / 7 người tham gia`
- **Mô tả hiện tượng:** `[Thiếu tóm tắt danh sách sản phẩm trước khi thanh toán, lo sợ bị trừ tiền sai]`
- **Bằng chứng trích dẫn:**
  - P##: *"[Trích dẫn lời người dùng]"*
- **Phân loại bản chất:** `...`
- **Mức độ nghiêm trọng:** `...`

### Chủ đề 5: Theo dõi Đơn hàng & Trạng thái Đơn (FR-10, FR-11)
- **Tần suất bắt gặp:** `.. / 7 người tham gia`
- **Mô tả hiện tượng:** `[Khó tìm trang lịch sử đơn, trạng thái hiển thị tiếng Anh/tiếng Việt lẫn lộn, màu sắc không rõ]`
- **Bằng chứng trích dẫn:**
  - P##: *"[Trích dẫn lời người dùng]"*
- **Phân loại bản chất:** `...`
- **Mức độ nghiêm trọng:** `...`

---

## 2. Phân biệt Lỗi Cá biệt vs Vấn đề Thiết kế Mang tính Hệ thống

| Vấn đề phát hiện | Số người gặp phải | Phân loại (Systemic vs Isolated) | Biện giải nguyên nhân | Hướng xử lý đề xuất |
|---|:---:|:---:|---|---|
| `[Vấn đề A]` | `> 3/7` | **Hệ thống (Systemic)** | Thiết kế UI gây nhầm lẫn chung cho đa số người dùng. | Cần tái thiết kế luồng/thành phần UI. |
| `[Vấn đề B]` | `1/7` | **Cá biệt (Isolated)** | Do thói quen cá nhân hoặc sơ suất thao tác của một người. | Theo dõi thêm hoặc bổ sung tooltip trợ giúp. |
| `[Vấn đề C]` | `> 4/7` | **Lỗi vi phạm SRS (Bug)** | Tính năng hoạt động sai so với tài liệu đặc tả `README.md`. | Tạo Bug Report & tạo GitHub Issue để sửa code. |

---

## 3. Ma trận Đánh giá Mức độ Nghiêm trọng (Severity Matrix - Nielsen Norman Group)

| Mức độ | Định nghĩa trong Usability | Danh sách vấn đề phát hiện | Đề xuất ưu tiên |
|---|---|---|:---:|
| **4 - Usability Catastrophe** | Thảm họa: Ngăn chặn hoàn toàn người dùng hoàn thành nhiệm vụ (Blocker). | `...` | `P1 - Khắc phục ngay lập tức` |
| **3 - Major Usability Problem** | Vấn đề lớn: Gây trì hoãn nặng nề, khiến người dùng ức chế cao độ nhưng vẫn gượng ép hoàn thành được. | `...` | `P2 - Cần xử lý sớm` |
| **2 - Minor Usability Problem** | Vấn đề nhỏ: Gây ngập ngừng, khó chịu nhẹ nhưng người dùng tự vượt qua được dễ dàng. | `...` | `P3 - Khắc phục trong bản cập nhật kế tiếp` |
| **1 - Cosmetic Problem Only** | Thẩm mỹ thuần túy: Sai chính tả, căn lề chưa đẹp, không ảnh hưởng thao tác. | `...` | `P4 - Xử lý khi có thời gian` |

