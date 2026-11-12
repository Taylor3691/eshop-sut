# HW03 — Quy tắc làm việc

## Ghi AI Audit Log sau mỗi bước

Sau khi hoàn thành mỗi yêu cầu của người dùng (một bước), **trước khi trả lời xong**, thêm một mục mới vào cuối file `submission/ai/ai-audit-log.md` (trên khối comment mẫu) theo đúng định dạng:

```markdown
## #NN — <Tên bước ngắn gọn>

- **AI tool:** Claude Code (<tên model đang chạy>)
- **Date & time:** <YYYY-MM-DD HH:MM> (lấy bằng lệnh `date "+%Y-%m-%d %H:%M"`)
- **Prompt:** <nguyên văn tin nhắn của người dùng, không sửa, không tóm tắt>
- **AI output:**
  - <tóm tắt kết quả: đã làm gì, phát hiện gì>
  - <danh sách file đã tạo/sửa, dạng đường dẫn tương đối>

---
```

Quy định:
- `NN` = số thứ tự tiếp theo sau mục cuối cùng trong file (2 chữ số: 02, 03, ...).
- Mỗi tin nhắn yêu cầu của người dùng là một mục, kể cả prompt sửa nhỏ.
- Không ghi lại chính việc ghi log. Không thêm mục "nhận xét", "đánh giá" hay trường nào khác ngoài 4 trường trên.
- Không ghi dữ liệu cá nhân của người tham gia (tên, số điện thoại) vào log; chỉ dùng mã P1–P7.
- Nếu người dùng nói "không log" cho một tin nhắn cụ thể thì bỏ qua tin nhắn đó.
- Sau khi ghi, nhắc người dùng một dòng ngắn: đã ghi mục #NN.
