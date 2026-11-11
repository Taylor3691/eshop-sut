# Phiếu Khảo sát Thang đo Khả năng Sử dụng Hệ thống (System Usability Scale - SUS)

> **Mô tả:** Thang đo SUS chuẩn của John Brooke (1986) gồm 10 câu hỏi với thang đo Likert 5 mức độ:  
> `1: Hoàn toàn không đồng ý` | `2: Không đồng ý` | `3: Trung lập / Bình thường` | `4: Đồng ý` | `5: Hoàn toàn đồng ý`.  
> Người tham gia điền phiếu này ngay sau khi hoàn thành phiên kiểm thử.

---

## 1. Thông tin Phiên kiểm thử

- **Mã người tham gia:** `P01` | `P02` | `P03` | `P04` | `P05` | `P06` | `P07` (hoặc `P00 - Pilot`)
- **Họ và tên:** `[Họ và tên người tham gia]`
- **Thời gian thực hiện:** `YYYY-MM-DD HH:mm`
- **Người điều phối:** `[Tên điều phối viên]`

---

## 2. Bảng 10 Câu hỏi Chuẩn SUS

Vui lòng đánh dấu mức độ đồng ý của bạn với từng phát biểu dưới đây (từ 1 đến 5):

| STT | Phát biểu đánh giá (SUS Item) | 1 (Rất không đồng ý) | 2 (Không đồng ý) | 3 (Trung lập) | 4 (Đồng ý) | 5 (Rất đồng ý) | Điểm thô ($R_i$) |
|:---:|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **Q01** | Tôi nghĩ rằng tôi sẽ thích sử dụng hệ thống EShop này thường xuyên. *(I think that I would like to use this system frequently.)* | [ ] | [ ] | [ ] | [ ] | [ ] | ` ` |
| **Q02** | Tôi thấy hệ thống này phức tạp một cách không cần thiết. *(I found the system unnecessarily complex.)* | [ ] | [ ] | [ ] | [ ] | [ ] | ` ` |
| **Q03** | Tôi nghĩ rằng hệ thống này rất dễ sử dụng. *(I thought the system was easy to use.)* | [ ] | [ ] | [ ] | [ ] | [ ] | ` ` |
| **Q04** | Tôi nghĩ rằng tôi cần sự hỗ trợ của chuyên gia kỹ thuật để có thể sử dụng hệ thống này. *(I think that I would need the support of a technical person to be able to use this system.)* | [ ] | [ ] | [ ] | [ ] | [ ] | ` ` |
| **Q05** | Tôi nhận thấy các chức năng khác nhau trong hệ thống được tích hợp rất tốt và nhất quán. *(I found the various functions in this system were well integrated.)* | [ ] | [ ] | [ ] | [ ] | [ ] | ` ` |
| **Q06** | Tôi thấy có quá nhiều điểm bất nhất / không đồng bộ trong hệ thống này. *(I thought there was too much inconsistency in this system.)* | [ ] | [ ] | [ ] | [ ] | [ ] | ` ` |
| **Q07** | Tôi tin rằng hầu hết mọi người sẽ học được cách sử dụng hệ thống này rất nhanh chóng. *(I would imagine that most people would learn to use this system very quickly.)* | [ ] | [ ] | [ ] | [ ] | [ ] | ` ` |
| **Q08** | Tôi thấy hệ thống này rất cồng kềnh, bất tiện khi thao tác. *(I found the system very cumbersome to use.)* | [ ] | [ ] | [ ] | [ ] | [ ] | ` ` |
| **Q09** | Tôi cảm thấy rất tự tin và an tâm khi sử dụng hệ thống này. *(I felt very confident using the system.)* | [ ] | [ ] | [ ] | [ ] | [ ] | ` ` |
| **Q10** | Tôi cần phải học hỏi thêm rất nhiều điều trước khi có thể sử dụng thành thạo hệ thống này. *(I needed to learn a lot of things before I could get going with this system.)* | [ ] | [ ] | [ ] | [ ] | [ ] | ` ` |

---

## 3. Hướng dẫn và Công thức Tính điểm Chuẩn (Scoring Algorithm)

Để tính điểm chuẩn SUS từ 0 đến 100:

1. **Với các câu hỏi số lẻ (Q01, Q03, Q05, Q07, Q09 - Tích cực):**  
   $$C_i = R_i - 1$$
2. **Với các câu hỏi số chẵn (Q02, Q04, Q06, Q08, Q10 - Tiêu cực):**  
   $$C_i = 5 - R_i$$
3. **Tổng điểm đóng góp:**  
   $$S_{sum} = \sum_{i=1}^{10} C_i$$ (khoảng giá trị từ 0 đến 40)
4. **Điểm SUS quy đổi (Thang 100):**  
   $$SUS = S_{sum} \times 2.5$$

---

## 4. Thang Đối chiếu Tiêu chuẩn (Benchmark Interpretation)

Theo nghiên cứu thực nghiệm của Bangor, Kortum & Miller (2008):
- **Điểm trung bình tiêu chuẩn ngành:** `68.0 điểm`
- **Mức đánh giá xếp loại (Grade Scale):**
  - **90 – 100:** Hạng **A+** (Xuất sắc tuyệt hảo - Best Imaginable)
  - **80 – 89:** Hạng **A** (Rất tốt - Excellent)
  - **70 – 79:** Hạng **B** (Tốt - Good)
  - **60 – 69:** Hạng **C** (Trung bình / Ranh giới - OK / Marginal)
  - **50 – 59:** Hạng **D** (Kém - Poor)
  - **0 – 49:** Hạng **F** (Không thể chấp nhận - Worst Imaginable)
- **Vùng chấp nhận (Acceptability Range):**
  - $\ge 70$: Chấp nhận được (Acceptable)
  - $50 - 69$: Ranh giới biên (Marginal)
  - $< 50$: Không thể chấp nhận (Not Acceptable)

