# Tóm tắt điểm SUS

## Quy tắc tính

- Câu lẻ: `đáp án - 1`.
- Câu chẵn: `5 - đáp án`.
- Điểm SUS: tổng hiệu chỉnh × `2,5`.

## Điểm từng participant

| ID | Tổng hiệu chỉnh /40 | SUS /100 | Trạng thái |
|---|---:|---:|---|
| P01 | 23 | 57,5 | Đủ 10 câu; dữ liệu mô phỏng |
| P02 | 30 | 75 | Đủ 10 câu; dữ liệu mô phỏng |
| P03 | 10 | 25 | Đủ 10 câu; dữ liệu mô phỏng |
| P04 | 17 | 42,5 | Đủ 10 câu; dữ liệu mô phỏng |
| P05 | 33 | 82,5 | Đủ 10 câu; dữ liệu mô phỏng |
| P06 | 15 | 37,5 | Đủ 10 câu; dữ liệu mô phỏng |
| P07 | 33 | 82,5 | Đủ 10 câu; dữ liệu mô phỏng |

Tất cả 7 điểm đều nằm trong khoảng hợp lệ **0–100**.

## Trung bình

Tổng điểm: `57,5 + 75 + 25 + 42,5 + 82,5 + 37,5 + 82,5 = 402,5`.

Số phiếu đầy đủ: `7`.

**SUS trung bình = 402,5 / 7 = 57,50/100.**

Điểm 57,50 là trung bình của **bộ dữ liệu mô phỏng**, không phải benchmark
usability của người dùng thật. So với mốc tham khảo 68, bộ mô phỏng nằm dưới
mốc này; chỉ nên dùng để ưu tiên các giả thuyết cần kiểm chứng.

## Kiểm tra dữ liệu

- Mỗi participant có đúng 10 đáp án.
- Mọi đáp án đều thuộc 1–5.
- Không có phiếu bị loại vì thiếu câu trả lời.
- Không có giá trị ngoài 0–100 sau chuyển đổi.
- Không trộn kết quả Playwright PASS vào phép tính SUS.

## Lưu ý về nguồn

Các tệp SUS đều ghi **SIMULATED DATA** và mức trả lời là giả định cho persona.
Vì vậy báo cáo này gọi đây là “SUS mô phỏng” dù phép tính đầy đủ và tái lập
được. Không được trình bày 57,50 như điểm đo từ bảy người thật.
