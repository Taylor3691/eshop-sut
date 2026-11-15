# Kế hoạch đánh giá khả dụng

- **SUT:** <tên> — <URL>
- **Hình thức:** đánh giá có điều phối (moderated), mẫu nhỏ: <n> người tham gia (P1–Pn) + 1 phiên pilot, mỗi người một phiên, nói to suy nghĩ (think-aloud)
- **Flow:** <B1> → <B2> → … → <Bn>
- **Công cụ đo:** SUS (sau phiên) + chỉ số theo bước (hoàn thành, thời gian, lỗi, số lần trợ giúp) + câu hỏi probe
- **Ghi nhận:** <quay màn hình khi người tham gia đồng ý / không quay vì …>; người điều phối ghi phiếu (`session-slip-TEMPLATE.txt`) rồi chép vào `sessions/Px/notes.md`, nhập số liệu vào `sus-and-metrics.xlsx`

---

## 1. Mục tiêu

Câu hỏi chính: **<người dùng mục tiêu> có tự <hoàn thành mục tiêu> mà không cần hướng dẫn không? Họ tự tin đến đâu?**

| # | Mục tiêu cần trả lời | Đo bằng |
|---|---|---|
| O1 | Hoàn thành từng bước không cần trợ giúp; bước nào tắc nhất | Tỉ lệ Y / A / N theo bước, số lần trợ giúp |
| O2 | Tìm đúng chỗ làm việc (menu, dòng trong bảng) — điểm nghẽn điều hướng | Số lần mở nhầm, thời gian tìm, lời nói khi phân vân |
| O3 | Form đủ rõ để nhập đúng ngay lần đầu | Số lỗi nhập, dữ liệu sai được lưu, số lần sửa lại |
| O4 | Nhận ra và tự sửa khi nhập sai | Hành vi sau lỗi; probe error recovery |
| O5 | Tin rằng thao tác đã thành công | Probe trust; hành vi kiểm tra lại |
| O6 | Mức khả dụng tổng thể | SUS trung bình so với mốc 68 (tham khảo, mẫu nhỏ) |

---

## 2. Flow & tiêu chí hoàn thành từng bước

**Y** = đạt tiêu chí không cần trợ giúp; **A** = cần gợi ý mức 2–3 (mục 7.4); **N** = bỏ cuộc, hết thời gian tối đa, hoặc lưu dữ liệu sai mà không tự sửa.

| Bước | Hành động | Tiêu chí hoàn thành (kiểm được trên giao diện / dữ liệu) | Thời gian mục tiêu | Thời gian tối đa |
|---|---|---|---|---|
| 1 | | | | |
| — | **Toàn bộ flow** | Đạt cả <n> bước | | |

Ghi chú khi chấm:
- Dữ liệu được lưu nhưng **sai** → bước đó **N**; nếu người tham gia tự phát hiện và sửa trong thời gian tối đa thì **Y** kèm ghi chú "tự sửa".
- Thời gian mỗi bước tính từ lúc bắt đầu tìm chỗ làm bước đó đến khi đạt tiêu chí; bấm giờ liên tục để tổng các bước bằng thời lượng phiên.
- Lỗi đã biết của SUT làm không thể đạt tiêu chí → **N (do lỗi SUT)** kèm mã bug, không tính là lỗi người dùng.

---

## 3. Hồ sơ người tham gia mục tiêu

| Tiêu chí | Yêu cầu |
|---|---|
| Đối tượng | |
| Độ tuổi | |
| Kỹ năng máy tính | |
| Kinh nghiệm | Pha trộn: ít nhất <k> người đã dùng <loại hệ thống>, ít nhất <k> người chưa dùng |
| Ưu tiên | Người không làm IT / kiểm thử |
| Loại trừ | <người trong lớp>; người đã từng dùng SUT; người làm pilot |
| Liên hệ | Zalo / email / SĐT xác minh được (che 4 số giữa) |

---

## 4. Task scenario

### 4.1. Lời dẫn (đọc to, đưa thẻ)

> <Bối cảnh vai trò>. Hãy dùng <hệ thống> để:
> 1. <Mục tiêu 1 — nói bằng lời của người dùng, không dùng nhãn trên giao diện>
> 2. …
> Anh/chị có thể làm theo thứ tự mình thấy hợp lý. Khi nghĩ mình đã xong, hãy nói "Tôi xong rồi".

### 4.2. Thẻ thông tin

| Thông tin | Giá trị |
|---|---|
| Địa chỉ | |
| Tài khoản / mật khẩu | |

### 4.3. Nguyên tắc viết scenario (đã rà soát)

- Chỉ nêu **mục tiêu** và dữ liệu; không chỉ đường, không nói bấm vào đâu.
- Không dùng đúng nhãn trên giao diện (tên nút, tên menu); dùng cách nói của người dùng.
- Nhận diện bản ghi bằng thông tin người dùng thật sự có (ví dụ địa chỉ giao hàng), không bằng mã nội bộ.
- Viết dữ liệu theo thói quen thật (ví dụ giá "890.000 ₫") để quan sát cách nhập.

---

## 5. Công cụ đo

### 5.1. SUS (tiếng Việt, thang 1 = Hoàn toàn không đồng ý … 5 = Hoàn toàn đồng ý)

| # | Câu hỏi |
|---|---|
| Q1 | Tôi nghĩ rằng tôi sẽ muốn dùng <hệ thống> này thường xuyên. |
| Q2 | Tôi thấy <hệ thống> này phức tạp một cách không cần thiết. |
| Q3 | Tôi thấy <hệ thống> này dễ sử dụng. |
| Q4 | Tôi nghĩ tôi cần người có hiểu biết kỹ thuật hỗ trợ mới dùng được <hệ thống> này. |
| Q5 | Tôi thấy các chức năng của <hệ thống> này được kết hợp với nhau hợp lý. |
| Q6 | Tôi thấy <hệ thống> này có quá nhiều chỗ không nhất quán. |
| Q7 | Tôi nghĩ hầu hết mọi người sẽ học cách dùng <hệ thống> này rất nhanh. |
| Q8 | Tôi thấy <hệ thống> này rất rườm rà, khó thao tác. |
| Q9 | Tôi cảm thấy rất tự tin khi dùng <hệ thống> này. |
| Q10 | Tôi phải học nhiều thứ trước khi có thể dùng được <hệ thống> này. |

Tính điểm: câu lẻ (điểm − 1), câu chẵn (5 − điểm), tổng × 2,5 → 0–100 (đã cài trong `sus-and-metrics.xlsx`).

### 5.2. Chỉ số theo bước (sheet *Task metrics*)

| Chỉ số | Cách ghi |
|---|---|
| Hoàn thành | Y / A / N (mục 2) |
| Thời gian | giây, bấm giờ trực tiếp |
| Số lỗi | mỗi lần nhập sai, bấm nhầm mục, lưu dữ liệu sai, phải làm lại |
| Số lần trợ giúp | số gợi ý mức 2–3 (mục 7.4) |

---

## 6. Câu hỏi probe (clarity · error recovery · speed · trust)

Hỏi **sau** SUS, ưu tiên hỏi về điều đã quan sát được. Mỗi phiên ít nhất 1 câu mỗi chủ đề.

| # | Chủ đề | Câu hỏi | Hỏi thêm |
|---|---|---|---|
| C1 | Clarity | Khi mới vào, anh/chị làm sao biết phải bắt đầu từ đâu? | Có chỗ nào phải đoán không? |
| C2 | Clarity | Khi điền <form khó nhất>, anh/chị có biết từng ô dùng để nhập gì không? | Lúc đó dựa vào đâu để đoán? |
| C3 | Clarity | <Câu về lựa chọn / giá trị mặc định quan sát được> | |
| C4 | Clarity | Có từ ngữ hoặc nhãn nào làm anh/chị thấy lạ không? | |
| E1 | Error recovery | Có lúc nào anh/chị nghĩ mình vừa làm sai không? Lúc đó đã làm gì? | Trang có cho biết sai ở đâu không? |
| E2 | Error recovery | (Nếu có thông báo lỗi) Thông báo đó có giúp biết phải sửa gì không? | |
| E3 | Error recovery | Nếu lỡ nhập sai hoặc xóa nhầm, anh/chị sẽ sửa lại bằng cách nào? | |
| S1 | Speed | Phần nào nhanh, phần nào mất thời gian hơn anh/chị nghĩ? | Vì sao? |
| S2 | Speed | Tìm đúng <bản ghi> trong danh sách có dễ không? | Nếu có hàng trăm thì sao? |
| S3 | Speed | Có bước nào thừa hoặc phải làm lặp lại không? | |
| T1 | Trust | Sau khi lưu, anh/chị có chắc đã được lưu đúng không? Điều gì làm anh/chị chắc? | |
| T2 | Trust | Anh/chị có chắc đã thao tác đúng bản ghi và không động vào bản ghi khác? | |
| T3 | Trust | Anh/chị có yên tâm giao <hệ thống> này cho người khác dùng hằng ngày không? | |
| T4 | Trust | Khi rời khỏi trang, anh/chị có chắc tài khoản đã an toàn không? | Chỉ đóng tab đã đủ chưa? |
| W1 | Tổng kết | Nếu được sửa một điều, anh/chị sẽ sửa gì đầu tiên? | |

---

## 7. Quy trình buổi test (moderator script)

Xem `references/usability-method.md` mục 3 cho lời giới thiệu, câu nhắc trung lập, mức can thiệp và checklist trước / sau phiên. Ghi lại ở đây phần đã điều chỉnh cho dự án này.

---

## 8. Chuẩn bị môi trường

| Việc | Lệnh / thao tác | Kết quả cần có |
|---|---|---|
| Reset dữ liệu | | |
| Kiểm tra trước phiên | | |

---

## 9. Pilot & các chỉnh sửa

| # | Vấn đề phát hiện khi pilot | Chỉnh sửa | Mục bị ảnh hưởng |
|---|---|---|---|
