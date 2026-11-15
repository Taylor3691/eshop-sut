---
name: usability-eval
description: Lập kế hoạch, ghi nhận và phân tích một đánh giá khả dụng có điều phối (moderated, think-aloud, 5–8 người) cho một flow end-to-end, dùng SUS, chỉ số theo bước và câu hỏi probe. Dùng khi người dùng muốn viết kế hoạch / scenario usability, chép phiếu ghi phiên vào notes và bảng SUS, kiểm dữ liệu phiên, phân tích kết quả, xếp severity Nielsen, hoặc ghi bug từ phiên usability.
---

# Usability Evaluation

Quy trình 5 bước, rút ra từ HW03 (EShop Web Admin, flow 6 bước, 7 người + pilot, SUS 56.07). AI hỗ trợ lập kế hoạch, chép dữ liệu, tính toán và viết phân tích. **Mọi dữ liệu phiên (người tham gia, lời nói, SUS, thời gian) phải đến từ người điều phối, AI không được tạo ra.**

Đọc `references/usability-method.md` trước khi bắt đầu.

## Đầu vào cần hỏi người dùng (nếu chưa có)

1. Flow cần đánh giá (các bước) và SUT (URL, tài khoản, cách reset dữ liệu).
2. Người dùng mục tiêu (persona), số người tham gia (mặc định 7) và yêu cầu pha trộn kinh nghiệm.
3. Thư mục đầu ra (mặc định `submission/task2-usability/`).
4. Công cụ đo (mặc định SUS; UEQ-S hoặc thang khác thì cần lý do).

## Bước 1 — Kế hoạch và công cụ

- Tạo `plan.md` từ `templates/plan-TEMPLATE.md`: mục tiêu O1–O6, tiêu chí hoàn thành từng bước (kiểm được trên giao diện, có thời gian mục tiêu và tối đa), hồ sơ người tham gia, scenario + thẻ thông tin, SUS, 15 câu probe (C/E/S/T + W1), quy trình điều phối, chuẩn bị môi trường.
- Rà scenario theo `references/usability-method.md` mục 2. Nhất là: **không dùng đúng nhãn trên giao diện** (đối chiếu với mã nguồn hoặc giao diện để chắc chắn).
- Chép sang thư mục đầu ra: `templates/sus-and-metrics.xlsx` (đổi tên bước ở sheet Task metrics), `templates/session-notes-TEMPLATE.md`, `templates/session-slip-TEMPLATE.txt` (phiếu ghi in ra hoặc mở khi điều phối), `templates/participants-TEMPLATE.md`.
- ⛔ **Dừng.** Người dùng duyệt plan. Danh sách người tham gia do người dùng tự tuyển và tự điền.

## Bước 2 — Pilot

- Người dùng chạy pilot và dán phiếu ghi. Chép bằng:
  ```bash
  python3 scripts/slip_to_notes.py --slips phieu.txt --task-dir <thư mục> --xlsx <thư mục>/sus-and-metrics.xlsx
  ```
  (phiên `PHIÊN: Pilot` ghi vào `pilot/notes.md`, xlsx ghi vào dòng Pilot, không tính vào Mean).
- Đề xuất chỉnh sửa dựa trên pilot (thời gian, phiếu ghi, cách đo) và ghi vào `plan.md` mục 9 dạng bảng `Vấn đề | Chỉnh sửa | Mục bị ảnh hưởng`. Hành vi "sai" do giao diện gây ra là phát hiện, không sửa scenario để tránh nó.
- ⛔ **Dừng.** Người dùng quyết định chỉnh gì.

## Bước 3 — Chép từng phiên

- Mỗi khi người dùng dán phiếu một hoặc nhiều phiên:
  1. `slip_to_notes.py` (như trên). **Chỉ chép, không thêm.** Ô trống trong phiếu thì để trống. Không sửa lời nói, kể cả khi thấy có thể ghi nhầm.
  2. `python3 scripts/check_sessions.py --task-dir <thư mục> --max <tối đa từng bước>` để kiểm: tổng thời gian = thời lượng phiên, mốc quan sát nằm đúng bước, mã loại hợp lệ, vượt thời gian tối đa mà ghi Y, có trợ giúp mà ghi Y, đủ chủ đề probe.
  3. Báo điểm SUS từng người. Liệt kê mọi điểm bất thường (kể cả điều phiếu tự mâu thuẫn, ví dụ phiên qua Zalo nhưng quan sát ghi "Meet") và **hỏi người dùng**, không tự sửa.
- Mỗi phiên một commit riêng nếu dự án yêu cầu.

## Bước 4 — Phân tích

- Tính số liệu:
  ```bash
  python3 scripts/analyze.py --task-dir <thư mục> --target <mục tiêu từng bước> --max <tối đa từng bước> \
      --group "Đã dùng=P1,P4" --group "Chưa dùng=P2,P3"
  ```
  Dán output vào mục 1–2 của `analysis.md` (từ `templates/analysis-TEMPLATE.md`), rồi viết nhận xét dưới mỗi bảng.
- Viết mục 3–6 theo `references/usability-method.md` mục 5: gom nhóm theo nguyên nhân (I1…), bug riêng lẻ và vấn đề thiết kế (D1…), severity Nielsen 0–4 có lý do, đề xuất theo ưu tiên kèm W1. Mỗi khẳng định phải có mốc thời gian hoặc mã câu probe.
- Đối chiếu từng nhóm với danh sách bug đã có (nếu có Task GUI checklist) để biết nhóm nào đã có bug.

## Bước 5 — Ghi bug từ phiên usability

- Với mỗi nhóm có thể là bug: **tái hiện trên SUT** (Playwright hoặc tay), chụp ảnh vào `screenshots/`.
- Quyết định theo `references/usability-method.md` mục 6. Có ba hướng:
  - **Bug mới:** viết file bug và tạo GitHub issue.
  - **Trùng nguyên nhân với bug cũ:** thêm mục bằng chứng vào file bug cũ và comment vào issue cũ.
  - **Không ghi bug:** nêu lý do (không tái hiện được, không trái đặc tả, là yêu cầu tính năng).
- Ghi bảng quyết định vào cuối `analysis.md`.
- Phát hiện ngoài phạm vi trong lúc tái hiện (ví dụ một trạng thái trái đặc tả) thì báo người dùng, không tự ghi.

## Nguyên tắc

- Không tạo dữ liệu phiên. Không đoán thay người điều phối (lý do không quay video, ý nghĩa mã trong phiếu, bước có đạt hay không).
- Chỉ dùng mã P1–Pn ngoài `participants.md`.
- Số liệu trong báo cáo phải lấy từ output của script hoặc đọc lại file, không nhớ lại.
- Sau mỗi bước, ghi một mục vào AI Audit Log nếu dự án yêu cầu (xem skill `ai-audit-log`).
