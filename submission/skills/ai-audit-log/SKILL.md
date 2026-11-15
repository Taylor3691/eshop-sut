---
name: ai-audit-log
description: Ghi một mục vào AI Audit Log (tên AI tool, ngày giờ, prompt nguyên văn, AI output) sau mỗi yêu cầu của người dùng trong bài tập. Dùng khi dự án yêu cầu nộp AI Audit Report, hoặc khi người dùng nhắc "ghi log", "audit log".
---

# AI Audit Log

Đề HW03 yêu cầu mỗi lần dùng AI phải có: tên AI tool, ngày giờ, prompt, AI output. Đề cũng khuyến khích làm một skill/rule tự trích các thông tin này sau mỗi phiên AI. Skill này là bản tổng quát của rule trong `CLAUDE.md` của dự án.

## Khi nào ghi

- Sau khi xong **mỗi tin nhắn yêu cầu** của người dùng (kể cả yêu cầu nhỏ như "commit"), **trước khi trả lời xong**.
- Bỏ qua nếu người dùng nói "không log" / "ko ghi log" cho tin nhắn đó.
- Không ghi lại chính việc ghi log.

## Cách ghi

1. Mở file log (mặc định `submission/ai/ai-audit-log.md`), tìm số mục cuối cùng `## #NN`, lấy số tiếp theo (2 chữ số).
2. Lấy giờ thật bằng lệnh `date "+%Y-%m-%d %H:%M"`, không tự đoán.
3. Chèn mục mới **ngay trên** khối comment mẫu ở cuối file:

```markdown
## #NN — <Tên bước ngắn gọn>

- **AI tool:** <tên tool> (<tên model đang chạy>)
- **Date & time:** <YYYY-MM-DD HH:MM>
- **Prompt:** <nguyên văn tin nhắn của người dùng, không sửa, không tóm tắt>
- **AI output:**
  - <đã làm gì, phát hiện gì; số liệu chính>
  - <phát hiện ngoài phạm vi hoặc điều cần người dùng quyết, nếu có>
  - File: <đường dẫn tương đối các file đã tạo/sửa>

---
```

4. Báo người dùng một dòng: "Đã ghi mục #NN".

## Quy định

- Chỉ 4 trường trên, không thêm "nhận xét", "đánh giá".
- Prompt có dán dữ liệu dài (phiếu ghi phiên, log): ghi nguyên văn phần yêu cầu, phần dữ liệu ghi "(kèm <loại dữ liệu> dán nguyên văn)".
- Không ghi dữ liệu cá nhân của người tham gia (tên, số điện thoại); chỉ dùng mã P1–Pn.
- AI output phải trung thực: bước nào bỏ qua, thất bại hoặc chưa kiểm chứng thì ghi đúng như vậy.
