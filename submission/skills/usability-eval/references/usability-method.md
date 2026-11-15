# Phương pháp đánh giá khả dụng (moderated, mẫu nhỏ)

## 1. Vì sao chọn SUS

- Thang chuẩn (Brooke, 1996), được kiểm chứng, ổn định khi mẫu nhỏ (Tullis & Stetson, 2004).
- Có mốc so sánh: trung bình ngành ≈ **68** (Sauro). Mức chấp nhận (Bangor, Kortum & Miller, 2009): < 50 Not acceptable, 50–70 Marginal, > 70 Acceptable.
- Đo đúng thứ cần đo với công cụ làm việc (dễ dùng, dễ học, tự tin). UEQ-S có một nửa câu về cảm xúc / hấp dẫn, ít giá trị với trang quản trị.
- 10 câu, khoảng 2 phút.
- Mẫu 5–8 người: luôn báo kèm độ lệch chuẩn và khoảng tin cậy 95% (t), kết luận "tham khảo".

## 2. Viết scenario

- Đưa **mục tiêu**, không đưa các bước. Thứ tự do người tham gia tự chọn.
- Không dùng đúng nhãn trên giao diện (nếu nút ghi "Thêm mới" thì scenario nói "đưa … lên"). Dùng nhãn trong scenario là đang chỉ đường.
- Dữ liệu cần nhập để trên một **thẻ thông tin** riêng.
- Viết dữ liệu theo thói quen thật để lộ ra vấn đề thật (giá có dấu chấm nghìn, ngày dd/mm/yyyy).
- Có ít nhất một mục tiêu mà cách "hoàn thành sai" trông giống "hoàn thành đúng" (ví dụ đóng tab thay vì đăng xuất). Đây là chỗ đo được trust.
- Pilot để kiểm thời gian và độ rõ của lời dẫn. Hành vi "sai" do giao diện gây ra (mở nhầm menu, gõ sai định dạng) là **phát hiện**, không phải lý do sửa scenario.

## 3. Điều phối phiên

**Lời giới thiệu (đọc gần nguyên văn):**
> "Hôm nay em đang thử nghiệm **<hệ thống>**, chứ **không phải kiểm tra anh/chị**. Không có đúng hay sai; nếu anh/chị gặp khó khăn thì đó chính là chỗ cần sửa. Trong lúc làm, anh/chị cứ **nói to những gì mình đang nghĩ**. Em sẽ hạn chế trả lời câu hỏi trong lúc làm; cuối buổi em sẽ giải đáp hết. Em sẽ ghi chép (và ghi hình nếu anh/chị đồng ý); anh/chị được ghi bằng mã số, không ghi tên."

Cho tập nói to 1 phút trên một trang web quen thuộc trước khi bắt đầu.

**Câu nhắc trung lập:**
- Im lặng > 10 giây: "Anh/chị đang nghĩ gì vậy?"
- "Bấm cái này phải không?": "Anh/chị nghĩ sao?"
- Ngạc nhiên: "Điều đó có giống anh/chị mong đợi không?"
- "Xong rồi": "Làm sao anh/chị biết là xong rồi?"

**Không được nói:** tên nút, tên menu, "đúng rồi", "sai rồi".

**Mức can thiệp** (chỉ khi quá thời gian tối đa của bước, sai 3 lần liên tiếp, hoặc người tham gia xin trợ giúp):

| Mức | Cách gợi ý | Ghi nhận |
|---|---|---|
| 1 | Nhắc lại mục tiêu của bước | Không tính trợ giúp |
| 2 | Gợi ý vùng màn hình ("thử xem các mục bên trái") | A, +1 trợ giúp |
| 3 | Chỉ trực tiếp chỗ cần làm | A, +1 trợ giúp; tính N nếu vẫn không làm được |

**Phiên online:** cho người tham gia điều khiển máy từ xa. Không để họ đọc thao tác cho người điều phối bấm hộ, vì như vậy không quan sát được do dự và bấm nhầm.

**Thứ tự cuối phiên:** dừng giờ (không nhận xét kết quả) → ghi nhanh trạng thái dữ liệu để chấm → SUS → probe (bắt đầu từ chỗ đã quan sát) → giải đáp thắc mắc → xác nhận liên hệ.

**Checklist trước phiên:** reset dữ liệu · trình duyệt mới, chưa đăng nhập, zoom 100% · in thẻ, phiếu ghi, bảng SUS · đồng hồ bấm giờ.
**Checklist sau phiên:** chép phiếu (`slip_to_notes.py`) · `check_sessions.py` · commit riêng cho phiên · reset dữ liệu.

## 4. Ghi quan sát

| Trường | Cách ghi |
|---|---|
| Thời điểm | mm:ss tính từ lúc bắt đầu scenario |
| Bước | B1…Bn |
| Hành vi | Người tham gia làm gì (động từ + đối tượng), không diễn giải |
| Lời nói | Nguyên văn trong ngoặc kép; không sửa chính tả, không tóm tắt |
| Loại | **H** hesitation (dừng, phân vân) · **E** error (bấm nhầm, nhập sai, lưu sai) · **F** friction (làm được nhưng tốn công / phải tự xoay xở). Không dùng F cho frustration |
| Mức độ | 1 nhẹ · 2 vừa (mất thời gian, phải đoán) · 3 nặng (làm hỏng bước, lưu sai, cần trợ giúp) |

## 5. Phân tích

1. **Kiểm dữ liệu** bằng `check_sessions.py`. Mọi điểm lệch (ví dụ vượt thời gian tối đa nhưng ghi Y) phải để người điều phối quyết định, rồi ghi quyết định vào "Ghi chú dữ liệu".
2. **Số liệu** bằng `analyze.py`: SUS từng người, trung bình, SD, trung vị, min/max, CI 95%, đóng góp từng câu, so sánh nhóm; chỉ số theo bước và theo người; đếm quan sát.
3. **Gom nhóm (affinity):** đặt mọi dòng quan sát và câu trả lời probe cạnh nhau, gom theo **nguyên nhân trên giao diện** (không theo bước). Mỗi nhóm ghi: gặp ở bao nhiêu người (kèm mốc thời gian), hậu quả (bước nào N/A, dữ liệu sai nào được lưu), trích dẫn, đề xuất W1. Thêm mục "Điểm làm tốt".
4. **Bug riêng lẻ và vấn đề thiết kế:** bug riêng lẻ có một nguyên nhân, sửa được tại một chỗ. Vấn đề thiết kế lặp lại ở nhiều màn hình hoặc nhiều nhóm (ví dụ "form dựa vào placeholder và không báo lỗi").
5. **Severity Nielsen 0–4** chấm theo tần suất × tác động × tính lặp lại:

| Mức | Ý nghĩa | Gợi ý dùng |
|---|---|---|
| 0 | Không phải vấn đề khả dụng | |
| 1 | Chỉ thẩm mỹ | Nhắc tới nhưng không ảnh hưởng thao tác trong phiên |
| 2 | Nhỏ, ưu tiên thấp | Mất thời gian, ai cũng tự vượt qua |
| 3 | Lớn, ưu tiên cao | Nhiều người gặp và có nguy cơ lưu sai, hoặc ít người gặp nhưng cần trợ giúp / ảnh hưởng an toàn |
| 4 | Thảm họa, phải sửa trước khi phát hành | Gây bước N với dữ liệu sai được lưu mà người dùng không biết, và đa số người gặp |

6. **Đề xuất** theo thứ tự severity, ghi kèm ai đã đề xuất cùng ý (W1).

## 6. Ghi bug từ phiên usability

- Chỉ ghi bug khi **tái hiện được trên SUT** (chạy lại, chụp ảnh). Không tái hiện được thì ghi "không ghi bug" kèm lý do (ví dụ ô ngày nhận đúng mọi kiểu gõ khi thử lại).
- Có căn cứ: trái đặc tả (FR) hoặc giải đáp / best practice có tên. Yêu cầu tính năng mới (ô tìm kiếm) và góp ý từ ngữ không trái đặc tả thì giữ là đề xuất.
- Trùng nguyên nhân với bug đã có thì **không tạo bug mới**: thêm mục "Bằng chứng từ đánh giá khả dụng" vào file bug cũ và comment vào issue cũ.
- Mục bằng chứng trong bug gồm: số người gặp (kèm mốc thời gian), hậu quả trong phiên, 1–3 trích dẫn nguyên văn.

## 7. Bảo vệ dữ liệu người tham gia

- Họ tên và số điện thoại chỉ có trong `participants.md` (đã che 4 số giữa). Notes, phân tích, báo cáo, audit log và issue chỉ dùng mã P1–Pn.
- AI **không được** sinh người tham gia, lời nói, câu trả lời probe hay điểm SUS. Mọi dữ liệu phiên phải đến từ phiếu ghi của người điều phối.
