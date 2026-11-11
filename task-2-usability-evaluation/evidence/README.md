# Hướng dẫn Lưu trữ Bằng chứng Đánh giá Usability (Evidence Directory)

Thư mục này lưu trữ các bằng chứng thực nghiệm thu thập được từ 07 phiên kiểm thử người dùng thực tế trong HW03 Task 2.

> **QUY TẮC BẮT BUỘC (HW03 Section 11 - Anti-AI-Cheat Constraints):**  
> - Tuyệt đối không tạo bằng chứng nhân tạo, không dùng AI sinh ảnh giả lập, video giả hoặc kết quả trắc nghiệm không có thật.  
> - Bằng chứng phải xuất phát từ các phiên kiểm thử người dùng thực tế có ghi hình màn hình và âm thanh.  
> - Chỉ lưu ảnh chụp màn hình minh chứng cho các lỗi Usability hoặc vi phạm nghiệp vụ đã được xác minh.

---

## Cấu trúc thư mục con

```text
task-2-usability-evaluation/evidence/
├── session-recordings/      # Video ghi lại phiên kiểm thử (hoặc danh sách link video lưu trữ)
├── screenshots/             # Ảnh chụp màn hình các điểm nghẽn và lỗi Usability
└── github-issues/           # Bản sao lưu issue markdown và ảnh minh chứng tải lên GitHub
```

---

## Quy ước đặt tên tập tin bằng chứng

1. **Video ghi hình phiên:**
   - Định dạng: `session-P01.mp4`, `session-P02.mp4`, ... `session-P07.mp4` (và `session-P00-pilot.mp4`).
   - Nếu dung lượng video quá lớn vượt quá giới hạn Git, tạo tệp `RECORDINGS-INDEX.md` liệt kê đường dẫn lưu trữ đám mây an toàn (Google Drive / OneDrive) kèm phân quyền truy cập cho giảng viên và TA.

2. **Ảnh chụp màn hình lỗi (Screenshots):**
   - Đặt tên theo mã Bug ID hoặc mã phiên: `BUG-20261111-001-coupon-error.png`, `P01-cart-no-confirm.png`.

3. **Bản sao GitHub Issues:**
   - Định dạng: `BUG-20261111-###-issue.md`.

