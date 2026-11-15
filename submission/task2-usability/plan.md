# Kế hoạch đánh giá khả dụng

- **SUT:** EShop Web Admin — http://localhost:5174
- **Hình thức:** đánh giá có điều phối (moderated), mẫu nhỏ: 7 người tham gia (P1–P7) + 1 phiên pilot, mỗi người một phiên, nói to suy nghĩ (think-aloud)
- **Flow:** Đăng nhập Admin → Tạo danh mục → Thêm sản phẩm → Tạo mã giảm giá → Cập nhật trạng thái đơn đang chờ → Đăng xuất (theo `submission/README.md`)
- **Công cụ đo:** SUS (sau phiên) + chỉ số theo bước (hoàn thành, thời gian, lỗi, số lần trợ giúp) + câu hỏi probe
- **Ghi nhận:** quay màn hình + âm thanh (khi người tham gia đồng ý), ghi chú theo `session-notes-TEMPLATE.md`, nhập số liệu vào `sus-and-metrics.xlsx`

---

## 1. Mục tiêu

Câu hỏi chính: **Một chủ shop lần đầu dùng EShop Admin có tự đưa được một mặt hàng mới lên bán, tạo khuyến mãi và xử lý đơn mà không cần ai hướng dẫn không? Họ thấy tự tin đến đâu?**

| # | Mục tiêu cần trả lời | Đo bằng |
|---|---|---|
| O1 | Người dùng có hoàn thành từng bước của flow mà không cần trợ giúp không; bước nào gây tắc nhiều nhất | Tỷ lệ hoàn thành theo bước (Y / Assisted / N), số lần trợ giúp |
| O2 | Người dùng có tìm đúng chỗ để làm việc (đúng mục trên sidebar, đúng đơn trong bảng) không — các điểm nghẽn điều hướng | Quan sát: số lần mở nhầm mục, thời gian tìm, lời nói khi phân vân |
| O3 | Form tạo danh mục / sản phẩm / mã giảm giá có đủ rõ để nhập đúng ngay lần đầu không (đặc biệt các ô không có nhãn ở form mã giảm giá — ô Đơn tối thiểu hiện sẵn số `0` nên chữ gợi ý bị che, ô Số lần dùng hiện sẵn `1` — và ô chọn danh mục chọn sẵn) | Số lỗi nhập, dữ liệu sai được lưu (sai danh mục, sai giá, sai ngày), số lần sửa lại |
| O4 | Khi nhập sai hoặc không chắc đã lưu chưa, người dùng có nhận ra và tự sửa được không | Quan sát hành vi sau lỗi; probe error recovery |
| O5 | Người dùng có tin rằng thao tác đã thành công (đã lưu, đã duyệt đơn, đã đăng xuất) không | Probe trust; hành vi kiểm tra lại (tải lại trang, quay lại bảng) |
| O6 | Mức khả dụng tổng thể so với ngưỡng chuẩn | Điểm SUS trung bình của 7 người, so với mốc 68 (mang tính tham khảo vì mẫu nhỏ) |

---

## 2. Flow & tiêu chí hoàn thành từng bước

Dữ liệu người tham gia cần nhập được in sẵn trên **thẻ thông tin** (mục 4). Một bước được tính **Hoàn thành (Y)** khi đạt đủ tiêu chí dưới đây mà không có trợ giúp; **Assisted** khi người điều phối phải gợi ý (mức 2 hoặc 3, xem mục 7.4); **N** khi bỏ cuộc hoặc hết thời gian tối đa.

| Bước | Hành động | Tiêu chí hoàn thành (kiểm trên giao diện / dữ liệu sau phiên) | Thời gian mục tiêu | Thời gian tối đa |
|---|---|---|---|---|
| 1 | Đăng nhập Admin | Vào được màn quản trị (thấy sidebar "EShop Admin") bằng tài khoản trên thẻ | ≤ 1 phút | 3 phút |
| 2 | Tạo danh mục | Bảng danh mục có **đúng 1** dòng "Đồ mùa đông" (không trùng, không có danh mục trống phát sinh) | ≤ 1 phút | 3 phút |
| 3 | Thêm sản phẩm | Bảng sản phẩm có "Áo khoác lông vũ", giá **890000**, thuộc danh mục **Đồ mùa đông** (không phải danh mục chọn sẵn), có mô tả | ≤ 2 phút | 7 phút |
| 4 | Tạo mã giảm giá | Bảng mã có **WINTER15**: loại phần trăm, giá trị 15, đơn tối thiểu 500000, hết hạn 31/12/2026, **2 lần/người** | ≤ 3 phút | 8 phút |
| 5 | Cập nhật trạng thái đơn đang chờ | Đơn giao tới **45 Lê Lợi, Q.1, TP.HCM** chuyển sang **"Đã xác nhận"**; các đơn khác giữ nguyên (không bị hủy nhầm) | ≤ 2 phút | 4 phút |
| 6 | Đăng xuất | Bấm đăng xuất và màn hình quay về trang đăng nhập. Chỉ đóng tab / đóng trình duyệt → **N** (token vẫn lưu trong `localStorage`, mở lại trang vẫn vào thẳng trang quản trị) | ≤ 30 giây | 2 phút |
| — | **Toàn bộ flow** | Đạt cả 6 bước | ≤ 10 phút | 30 phút |

Ghi chú khi chấm:
- Dữ liệu được lưu nhưng **sai** (ví dụ sản phẩm vào danh mục "Điện thoại", ngày hết hạn sai) → bước đó **không đạt**, ghi là lỗi nhập; nếu người tham gia tự phát hiện và sửa trong thời gian tối đa thì tính **Y** kèm ghi chú "tự sửa".
- Thời gian mỗi bước tính từ lúc người tham gia bắt đầu tìm chỗ thực hiện bước đó đến khi đạt tiêu chí, đo trên video.
- Lỗi đã biết của SUT có thể xuất hiện trong phiên (ví dụ bảng sản phẩm hiện sai tên sau khi sửa — BUG-03, xóa không xác nhận — BUG-04). Nếu lỗi SUT làm người tham gia không thể đạt tiêu chí, ghi **N (do lỗi SUT)** và mã bug, không tính là lỗi người dùng.

---

## 3. Hồ sơ người tham gia mục tiêu

**Persona:** người bán hàng / quản lý cửa hàng nhỏ cần tự cập nhật hàng hóa, khuyến mãi và đơn hàng trên trang quản trị web.

| Tiêu chí | Yêu cầu |
|---|---|
| Đối tượng | Chủ shop, nhân viên bán hàng online, nhân viên văn phòng / kế toán có làm việc với danh sách hàng hóa hoặc đơn hàng |
| Độ tuổi | 18–55 |
| Kỹ năng máy tính | Dùng trình duyệt web hằng ngày, đã từng điền form trên web (mua hàng, khai báo…) |
| Kinh nghiệm quản trị | Pha trộn: **ít nhất 3 người** đã từng dùng trang quản lý bán hàng (Shopee Seller Centre, Haravan, Sapo, KiotViet, Google Sheets quản lý kho…), **ít nhất 3 người** chưa từng dùng |
| Ưu tiên | Người không làm IT / không làm kiểm thử phần mềm |
| Loại trừ | Sinh viên đang học HW03; người đã từng xem hoặc dùng EShop; người tham gia pilot không được làm phiên chính thức |
| Liên hệ | Zalo / email / số điện thoại có thể xác minh (che 4 số giữa khi ghi vào `participants.md`); đồng ý để TA gọi xác minh |
| Đồng ý | Đồng ý tham gia và (nếu được) ghi hình màn hình + âm thanh; chỉ dùng mã P1–P7 trong báo cáo |

Bảng tuyển chọn được ghi trong `participants.md` (mã, nghề nghiệp, tuổi, mức dùng máy tính, kinh nghiệm quản trị, liên hệ đã che).

---

## 4. Task scenario

### 4.1. Lời dẫn (người điều phối đọc to, đồng thời đưa thẻ cho người tham gia)

> Anh/chị là chủ một cửa hàng thời trang nhỏ đang bán online trên trang EShop. Trời bắt đầu lạnh, anh/chị muốn mở bán một nhóm hàng mùa đông mới, tung một chương trình khuyến mãi để kéo khách, đồng thời xử lý một đơn khách vừa đặt đang chờ anh/chị duyệt.
>
> Hãy dùng trang quản trị của cửa hàng để:
> 1. Đưa nhóm hàng **Đồ mùa đông** lên cửa hàng và bày bán trong nhóm đó mặt hàng **Áo khoác lông vũ** theo thông tin trên thẻ.
> 2. Chuẩn bị mã khuyến mãi **WINTER15** cho chương trình mùa đông theo điều kiện trên thẻ.
> 3. Duyệt đơn của khách giao tới **45 Lê Lợi, Q.1, TP.HCM** để kho bắt đầu chuẩn bị hàng.
> 4. Khi xong việc, rời khỏi trang quản trị sao cho người khác dùng chung máy không vào được tài khoản của anh/chị.
>
> Anh/chị có thể làm theo thứ tự mình thấy hợp lý. Khi nghĩ mình đã xong, hãy nói "Tôi xong rồi".

### 4.2. Thẻ thông tin (in ra hoặc mở ở màn hình phụ)

| Thông tin | Giá trị |
|---|---|
| Địa chỉ trang quản trị | http://localhost:5174 |
| Tài khoản | `admin@eshop.com` |
| Mật khẩu | `Admin123!` |
| Nhóm hàng mới | Đồ mùa đông |
| Mặt hàng | Áo khoác lông vũ — giá bán **890.000 ₫** — mô tả: "Áo khoác lông vũ siêu nhẹ, giữ ấm tốt" |
| Mã khuyến mãi | **WINTER15** — giảm **15%** cho đơn từ **500.000 ₫** — dùng đến hết **31/12/2026** — mỗi khách dùng **2 lần** |
| Đơn cần duyệt | Đơn giao tới **45 Lê Lợi, Q.1, TP.HCM** |

### 4.3. Nguyên tắc viết scenario (đã rà soát)

- Chỉ nêu **mục tiêu** và dữ liệu; không chỉ đường, không nói bấm vào đâu, không đánh số theo thứ tự màn hình.
- Không dùng đúng nhãn trên giao diện: không dùng "Thêm mới", "Lưu sản phẩm", "Tạo mã", "Xác nhận", "Đăng xuất", "Login", "Mã Giảm Giá", "Đơn hàng"; thay bằng cách nói của người bán hàng ("đưa nhóm hàng lên", "bày bán", "chuẩn bị mã khuyến mãi", "duyệt đơn", "rời khỏi trang quản trị").
- Đơn cần duyệt được nhận diện bằng **địa chỉ giao hàng** (thông tin chủ shop thường có), không bằng mã đơn, để quan sát việc tìm đúng dòng trong bảng.
- Giá viết theo cách người Việt quen (890.000 ₫) để quan sát cách người tham gia nhập vào ô số.
- Bước 1 (đăng nhập) không nêu trong danh sách việc cần làm vì là điều kiện tự nhiên để vào trang quản trị; tài khoản có sẵn trên thẻ.

---

## 5. Công cụ đo (SUS + task metrics) — lý do chọn

### 5.1. Vì sao chọn SUS

| Lý do | Giải thích |
|---|---|
| Chuẩn hóa, được kiểm chứng | SUS (Brooke, 1996) là thang đo khả dụng được dùng rộng rãi nhất và ổn định hơn các thang khác khi mẫu nhỏ (Tullis & Stetson, 2004: khoảng 12 người đã cho kết luận đúng ~90%). Với 7 người, điểm SUS được báo cáo kèm độ lệch chuẩn và diễn giải thận trọng, kết hợp số liệu hành vi |
| Có mốc so sánh | Điểm trung bình ngành ≈ **68**; có thang diễn giải (dưới 50: kém, 68: trung bình, trên 80: tốt) để kết luận rõ ràng |
| Đo đúng thứ cần đo | Trang quản trị là công cụ làm việc: điều quan trọng là dễ dùng, dễ học, tự tin khi dùng — đúng các khía cạnh SUS hỏi. UEQ-S có một nửa số câu về khía cạnh cảm xúc / hấp dẫn (hedonic), ít giá trị với công cụ quản trị |
| Nhanh, không mệt | 10 câu, khoảng 2 phút, làm ngay sau phiên khi trải nghiệm còn mới |
| Bổ trợ bằng số liệu hành vi | SUS cho cảm nhận chủ quan; kết hợp với tỷ lệ hoàn thành, thời gian, số lỗi, số lần trợ giúp theo từng bước (sheet *Task metrics*) để thấy chỗ cụ thể gây khó |

### 5.2. Bảng câu hỏi SUS (tiếng Việt, thang 1 = Hoàn toàn không đồng ý … 5 = Hoàn toàn đồng ý)

| # | Câu hỏi |
|---|---|
| Q1 | Tôi nghĩ rằng tôi sẽ muốn dùng trang quản trị này thường xuyên. |
| Q2 | Tôi thấy trang quản trị này phức tạp một cách không cần thiết. |
| Q3 | Tôi thấy trang quản trị này dễ sử dụng. |
| Q4 | Tôi nghĩ tôi cần người có hiểu biết kỹ thuật hỗ trợ mới dùng được trang này. |
| Q5 | Tôi thấy các chức năng của trang này được kết hợp với nhau hợp lý. |
| Q6 | Tôi thấy trang này có quá nhiều chỗ không nhất quán. |
| Q7 | Tôi nghĩ hầu hết mọi người sẽ học cách dùng trang này rất nhanh. |
| Q8 | Tôi thấy trang này rất rườm rà, khó thao tác. |
| Q9 | Tôi cảm thấy rất tự tin khi dùng trang này. |
| Q10 | Tôi phải học nhiều thứ trước khi có thể dùng được trang này. |

Cách tính (đã cài sẵn trong `sus-and-metrics.xlsx`): câu lẻ lấy (điểm − 1), câu chẵn lấy (5 − điểm), cộng lại nhân 2,5 → thang 0–100. Báo cáo trung bình, độ lệch chuẩn, min, max.

### 5.3. Chỉ số theo bước (sheet *Task metrics*)

| Chỉ số | Cách ghi |
|---|---|
| Hoàn thành | Y / Assisted / N (theo tiêu chí mục 2) |
| Thời gian | giây, đo trên video |
| Số lỗi | mỗi lần nhập sai, bấm nhầm mục, lưu dữ liệu sai, thao tác phải làm lại |
| Số lần trợ giúp | số gợi ý mức 2–3 của người điều phối (mục 7.4) |
| Ghi chú | hành vi đáng chú ý, mã bug nếu do lỗi SUT |

---

## 6. Câu hỏi probe (clarity · error recovery · speed · trust)

Hỏi **sau khi** người tham gia làm xong SUS. Câu hỏi mở, không gợi ý câu trả lời; ưu tiên hỏi về những gì đã thật sự quan sát được trong phiên ("Lúc anh/chị dừng lại ở…").

| # | Chủ đề | Câu hỏi | Hỏi thêm (nếu phù hợp) |
|---|---|---|---|
| C1 | Clarity | Khi mới vào trang quản trị, anh/chị làm sao biết phải bắt đầu từ đâu? | Có chỗ nào anh/chị phải đoán không? |
| C2 | Clarity | Khi điền thông tin mã khuyến mãi, anh/chị có biết từng ô dùng để nhập gì không? Ô nào khiến anh/chị phân vân? | Lúc đó anh/chị dựa vào đâu để đoán? Ô có sẵn số 0 / số 1 anh/chị hiểu là gì? |
| C3 | Clarity | Khi thêm áo khoác, anh/chị chọn nhóm hàng cho nó như thế nào? | Anh/chị có để ý nhóm hàng đã được chọn sẵn không? |
| C4 | Clarity | Có từ ngữ hoặc nhãn nào trên trang làm anh/chị thấy lạ hoặc khó hiểu không? | |
| E1 | Error recovery | Có lúc nào anh/chị nghĩ mình vừa làm sai không? Lúc đó anh/chị đã làm gì? | Trang có cho anh/chị biết sai ở đâu không? |
| E2 | Error recovery | (Nếu có thông báo lỗi trong phiên) Thông báo đó có giúp anh/chị biết phải sửa gì không? | Anh/chị diễn đạt lại thông báo đó bằng lời của mình được không? |
| E3 | Error recovery | Nếu lỡ nhập sai giá hoặc lỡ xóa nhầm một mặt hàng, anh/chị nghĩ mình sẽ sửa lại bằng cách nào? | |
| S1 | Speed | Phần nào anh/chị thấy làm nhanh, phần nào mất thời gian hơn anh/chị nghĩ? | Vì sao phần đó lâu? |
| S2 | Speed | Tìm đúng đơn cần duyệt trong danh sách có dễ không? | Nếu cửa hàng có hàng trăm đơn thì sao? |
| S3 | Speed | Có bước nào anh/chị thấy thừa hoặc phải làm lặp lại không? | |
| T1 | Trust | Sau khi lưu mặt hàng và mã khuyến mãi, anh/chị có chắc chắn chúng đã được lưu không? Điều gì làm anh/chị chắc (hoặc không chắc)? | Anh/chị có muốn kiểm tra lại không? |
| T2 | Trust | Anh/chị có chắc đơn của khách đã được duyệt đúng và không động vào đơn khác không? | |
| T3 | Trust | Anh/chị có yên tâm giao trang này cho nhân viên dùng hằng ngày không? Vì sao? | |
| T4 | Trust | Khi rời khỏi trang, anh/chị có chắc tài khoản đã an toàn không? | Anh/chị nghĩ chỉ đóng tab đã đủ chưa? |
| W1 | Tổng kết | Nếu được sửa một điều trên trang này, anh/chị sẽ sửa gì đầu tiên? | |

Câu trả lời ghi vào bảng "Probe — câu trả lời" trong `sessions/Px/notes.md`, giữ nguyên lời người tham gia khi có thể.

---

## 7. Quy trình buổi test (moderator script)

Tổng thời gian dự kiến **40–60 phút** / phiên (chưa tính 5 phút chuẩn bị trước giờ); hẹn người tham gia **60 phút**.

| Giai đoạn | Thời lượng |
|---|---|
| Chuẩn bị môi trường (trước khi người tham gia đến) | 5 phút |
| Giới thiệu, đồng ý ghi hình, tập nói to | 5 phút |
| Thực hiện scenario | 10–30 phút |
| SUS | 3 phút |
| Probe + câu hỏi thêm | 10–15 phút |
| Cảm ơn, giải đáp thắc mắc, kết thúc | 3–5 phút |

### 7.1. Trước phiên (checklist người điều phối)

- [ ] Reset dữ liệu: `scripts/start-sut.sh` rồi `scripts/seed-hw03.sh 3` (mục 8)
- [ ] Mở Chrome cửa sổ mới ở trang http://localhost:5174, **chưa đăng nhập**; phóng to 100%, ẩn bookmark, đóng các tab khác
- [ ] Bật quay màn hình + micro, kiểm tra âm thanh
- [ ] In thẻ thông tin (mục 4.2), chuẩn bị bảng SUS (giấy hoặc Google Form) và file ghi chú `sessions/Px/notes.md`
- [ ] Đồng hồ bấm giờ / ghi mốc thời gian

### 7.2. Lời giới thiệu (đọc gần nguyên văn)

> "Cảm ơn anh/chị đã dành thời gian. Hôm nay em đang thử nghiệm **trang quản trị của một cửa hàng online**, chứ **không phải kiểm tra anh/chị**. Không có đúng hay sai; nếu anh/chị gặp khó khăn thì đó chính là chỗ trang web cần sửa, và đó là điều em cần biết nhất.
>
> Trong lúc làm, anh/chị cứ **nói to những gì mình đang nghĩ**: đang tìm gì, định bấm gì, thấy gì lạ, thấy khó chịu chỗ nào. Em sẽ hạn chế trả lời câu hỏi trong lúc anh/chị làm, vì em muốn xem trang web tự hướng dẫn người dùng tốt đến đâu; cuối buổi em sẽ giải đáp hết.
>
> Em xin phép **ghi lại màn hình và giọng nói** để xem lại khi phân tích; video chỉ dùng cho bài tập và anh/chị được ghi bằng mã số, không ghi tên. Anh/chị đồng ý chứ? Anh/chị có thể dừng bất cứ lúc nào."

→ Ghi "Đồng ý ghi hình: ☑" vào ghi chú. Nếu không đồng ý: chỉ ghi chú tay, không quay.

### 7.3. Tập nói to (1 phút)

> "Để quen với việc vừa làm vừa nói, anh/chị thử mở một trang web bất kỳ anh/chị hay dùng và nói to mình đang tìm gì nhé."

Sau đó quay lại trang http://localhost:5174, đọc lời dẫn (mục 4.1), đưa thẻ thông tin, bắt đầu bấm giờ.

### 7.4. Trong khi người tham gia làm

**Quan sát trung lập:** không gật đầu / lắc đầu khi họ chọn, không chỉ màn hình, không giải thích giao diện. Ghi chú theo bảng quan sát (thời điểm, bước, hành vi, lời nói nguyên văn, loại: friction / error / hesitation / frustration, mức độ).

**Câu nhắc trung lập được dùng:**
- Khi họ im lặng > 10 giây: "Anh/chị đang nghĩ gì vậy?"
- Khi họ hỏi "Bấm cái này phải không?": "Anh/chị nghĩ sao?" / "Anh/chị cứ làm như cách anh/chị thường làm."
- Khi họ có vẻ ngạc nhiên: "Điều đó có giống anh/chị mong đợi không?"
- Khi họ nói đã xong một phần: "Làm sao anh/chị biết là xong rồi?"

**Không được nói:** tên nút, tên mục trên sidebar, "đúng rồi", "sai rồi", "gần đúng rồi".

**Mức can thiệp** (chỉ khi người tham gia thật sự bế tắc: đứng yên ở một bước quá thời gian tối đa ở mục 2, hoặc thử sai 3 lần liên tiếp, hoặc tự xin trợ giúp):

| Mức | Cách gợi ý | Ghi nhận |
|---|---|---|
| 1 | Nhắc lại mục tiêu: "Mình đang cần [mục tiêu của bước] — anh/chị thử nhìn lại màn hình xem?" | Không tính trợ giúp |
| 2 | Gợi ý vùng: "Anh/chị thử xem các mục ở bên trái màn hình." | Assisted, +1 trợ giúp |
| 3 | Chỉ trực tiếp chỗ cần làm để người tham gia làm tiếp các bước sau | Assisted, +1 trợ giúp; bước này tính N nếu vẫn không làm được |

Nếu SUT lỗi làm không thể tiếp tục (trang trắng, mất kết nối): tạm dừng giờ, khôi phục môi trường, ghi mã bug, cho làm tiếp từ bước đang dở.

### 7.5. Kết thúc scenario

Khi người tham gia nói "Tôi xong rồi" hoặc hết 30 phút (dù đang ở bước nào): dừng giờ, **không** sửa hay nhận xét kết quả. Người điều phối ghi nhanh trạng thái dữ liệu (danh mục, sản phẩm, mã, đơn) để chấm theo tiêu chí mục 2, hoặc chấm lại sau trên video.

### 7.6. SUS

> "Anh/chị vui lòng trả lời 10 câu này theo cảm nhận vừa rồi về trang quản trị; không cần nghĩ lâu, chọn mức gần nhất với cảm nhận đầu tiên."

Người điều phối không giải thích câu hỏi ngoài việc đọc lại câu nếu được hỏi.

### 7.7. Probe

Hỏi các câu ở mục 6, bắt đầu bằng những chỗ đã quan sát được trong phiên ("Lúc ở ô ngày hết hạn, em thấy anh/chị dừng khá lâu — lúc đó anh/chị đang nghĩ gì?"). Không cần hỏi đủ tất cả, nhưng **mỗi chủ đề clarity, error recovery, speed, trust ít nhất 1 câu**.

### 7.8. Kết thúc

> "Cảm ơn anh/chị rất nhiều. Những chỗ anh/chị thấy khó chính là những chỗ bọn em cần báo cáo để sửa. Anh/chị có câu hỏi gì về buổi hôm nay không?"

Giải đáp các thắc mắc trong phiên (lúc này mới được giải thích giao diện). Xác nhận lại thông tin liên hệ để TA có thể gọi xác minh.

### 7.9. Sau phiên (người điều phối)

- [ ] Lưu video vào `recordings/` (hoặc link nếu file lớn), ghi link vào `participants.md`
- [ ] Hoàn thiện `sessions/Px/notes.md` (quan sát, SUS, probe, nhận xét)
- [ ] Nhập SUS và chỉ số theo bước vào `sus-and-metrics.xlsx`
- [ ] Commit riêng cho phiên: `test(hw03): usability session Px`
- [ ] Reset dữ liệu trước phiên tiếp theo

---

## 8. Chuẩn bị môi trường (reset dữ liệu: `scripts/start-sut.sh` rồi `scripts/seed-hw03.sh 3`)

| Việc | Lệnh / thao tác | Kết quả cần có |
|---|---|---|
| Khởi động và reset dữ liệu | `scripts/start-sut.sh` | Backend tạo lại CSDL mẫu: 3 danh mục (Điện thoại, Laptop, Phụ kiện), coupon SAVE10, BIGBUY, VIP100, EXPIRED; 3 trang trả về HTTP 200 |
| Tạo đơn chờ duyệt | `scripts/seed-hw03.sh 3` | 3 đơn `pending` của Test User: 12 Nguyễn Huệ, Q.1, TP.HCM; **45 Lê Lợi, Q.1, TP.HCM**; 8 Trần Hưng Đạo, Hà Nội |
| Kiểm tra trước phiên | Mở http://localhost:5174 | Đang ở màn đăng nhập; chưa có danh mục "Đồ mùa đông", sản phẩm "Áo khoác lông vũ", mã "WINTER15" |
| Trình duyệt | Chrome, cửa sổ mới, zoom 100%, độ phân giải ≥ 1366×768 | Giống nhau ở mọi phiên |

Phiên online (nếu người tham gia ở xa): người điều phối chia sẻ màn hình và cho người tham gia điều khiển từ xa (Google Meet / Zalo / UltraViewer) — ghi rõ hình thức trong `participants.md`. Không dùng cách người tham gia đọc thao tác để người điều phối bấm hộ: khi đó không quan sát được do dự, bấm nhầm, và người điều phối đã can thiệp vào thao tác (trái mục 7.4).

---

## 9. Pilot & các chỉnh sửa

Chạy 1 phiên pilot với một người ngoài danh sách P1–P7, theo đúng quy trình ở mục 7, để kiểm tra:
- Lời dẫn và thẻ thông tin có đủ rõ (người tham gia có hiểu việc cần làm mà không cần hỏi lại) không;
- Flow có chạy được trọn vẹn trên dữ liệu reset không;
- Thời gian thực tế so với dự kiến (mục 2, mục 7);
- Câu hỏi SUS / probe có câu nào khó hiểu không.

### 9.1. Điều chỉnh trước pilot (ước lượng lại thời gian, chưa có dữ liệu pilot)

Khi rà lại kế hoạch, khung 30–45 phút / phiên không còn thời gian đệm: tổng các mức tối đa đã là 44 phút. Các điểm dễ vượt giờ (đối chiếu với giao diện thật):

| Điểm | Lý do | Điều chỉnh |
|---|---|---|
| Bước 3 — Thêm sản phẩm | Giá 890.000 khó nhập vào ô số; danh mục bị chọn sẵn mà bảng sản phẩm không có cột danh mục nên khó tự phát hiện sai | Thời gian tối đa 5 → **7 phút** |
| Bước 4 — Tạo mã giảm giá | Các ô không có nhãn; bảng mã không có nút Sửa, nhập sai phải xóa và tạo lại | Thời gian tối đa 6 → **8 phút** |
| Toàn bộ scenario | Hai bước trên có thể đẩy scenario quá 25 phút, làm mất bước đơn hàng / đăng xuất | 25 → **30 phút** (tổng tối đa các bước: 27 phút) |
| Probe | Hỏi đủ 4 chủ đề kèm câu hỏi thêm thường quá 10 phút | 8–10 → **10–15 phút** |
| Kết thúc | Còn phần giải đáp thắc mắc của người tham gia | 1 → **3–5 phút** |
| Tổng phiên | | 30–45 → **40–60 phút**, hẹn 60 phút |

Các bước đăng nhập, tạo danh mục, tìm đơn trong 3 đơn chờ, đăng xuất và phần SUS giữ nguyên thời gian. Các con số trên sẽ được kiểm chứng bằng pilot (mục 9.2).

### 9.2. Kết quả pilot và chỉnh sửa sau pilot

Kết quả và các chỉnh sửa sau pilot ghi tại `pilot/notes.md` và tóm tắt vào bảng dưới đây (điền sau khi chạy pilot).

| # | Vấn đề phát hiện khi pilot | Chỉnh sửa | Mục bị ảnh hưởng |
|---|---|---|---|
| | | | |
