"""Tạo nội dung nghiên cứu giả lập bằng tiếng Việt; không phải dữ liệu người thật."""
import json
from pathlib import Path
from statistics import mean, median

ROOT = Path(__file__).resolve().parents[2]
RESULTS = json.loads((ROOT / "evidence/simulated-runs/run-results.json").read_text(encoding="utf-8"))
people = [
    dict(focus="kinh doanh", shopping="mua sắm trực tuyến không thường xuyên", trait="đọc kỹ nhãn trước khi thao tác", story="Tiêu đề trang đăng nhập khiến persona tưởng đây là trang đăng ký; persona dừng lại đọc nhãn rồi tiếp tục. Sau đó persona tự hỏi tổng giỏ hàng đã tính mã giảm giá chưa.", pause="Dừng ở tiêu đề đăng nhập và nhãn Username; so sánh tổng tiền trước và sau mã giảm giá.", error="Trong kịch bản, persona ban đầu hiểu nhầm trang đăng nhập là đăng ký, sau đó nhận ra thao tác đăng nhập.", answers=[3,3,3,2,3,2,3,2,3,3], clarity="Thoạt đầu tôi tưởng đây là trang đăng ký. Tôi hiểu khoản tiết kiệm hơn sau khi thấy mức giảm hiện ra.", recovery="Nếu đăng nhập lỗi, tôi sẽ kiểm tra lại email; nhãn hiện tại chưa giúp tôi nhận ra ngay.", speed="Luồng giả định có vẻ làm được, nhưng tôi sẽ dừng lại để đọc tổng tiền.", trust="Tôi muốn tổng tiền cuối được nhắc lại rõ ràng trước khi xác nhận."),
    dict(focus="kinh tế", shopping="mua sắm trực tuyến thường xuyên", trait="chú ý ưu đãi và trạng thái đơn", story="Persona mở giỏ, kiểm tra sản phẩm rồi tìm ô nhập mã giảm giá. Persona nhận thấy khoản giảm và xác nhận đơn.", pause="Tìm ô nhập mã trong chốc lát rồi kiểm tra tổng tiền cuối.", error="Không có lỗi trong kịch bản giả định; persona nhận ra trạng thái thành công và mục lịch sử đơn hàng.", answers=[4,2,4,2,4,2,4,2,4,2], clarity="Số tiền được giảm và tổng tiền cuối là phản hồi rõ nhất.", recovery="Nếu mã bị từ chối, tôi sẽ sửa mã rồi áp dụng lại.", speed="Nhiệm vụ giả định diễn ra nhanh khi giỏ đã có sản phẩm.", trust="Thấy đơn trong lịch sử sẽ giúp tôi yên tâm, nhưng tôi muốn tổng tiền chỉ đọc."),
    dict(focus="thiết kế", shopping="ít mua sắm trực tuyến", trait="cần chỉ dẫn và tín hiệu mô tả rõ", story="Persona khó đọc phần chữ tiếng Việt bị lỗi hiển thị, nhập thử mã giảm giá rồi xem phản hồi trước khi đi tiếp.", pause="Dừng vài lần ở tiêu đề khó đọc, nút áp dụng mã và trạng thái đơn.", error="Trong kịch bản, persona gõ sai mã một lần, đọc thông báo, sửa mã rồi tiếp tục.", answers=[2,4,2,4,2,4,2,4,2,4], clarity="Một số nhãn khó đọc; tôi không chắc mình đang ở trang nào.", recovery="Thông báo lỗi chỉ hữu ích nếu nói rõ tôi cần sửa gì.", speed="Tôi sẽ chậm hơn vì cần xem kỹ từng bước.", trust="Tôi sẽ kiểm tra chi tiết đơn trước khi rời tài khoản."),
    dict(focus="kỹ thuật", shopping="mua sắm trực tuyến ở mức vừa phải", trait="kiểm tra phép tính giá", story="Persona thao tác nhanh ở đăng nhập và giỏ hàng nhưng nghi ngại vì tổng tiền thanh toán có thể chỉnh sửa. Persona đối chiếu lại với giỏ rồi mới tiếp tục.", pause="Dừng ở trường tổng tiền có thể chỉnh sửa và kiểm tra lại khoản giảm.", error="Không có lỗi nhập giả định; persona ngập ngừng vì có thể sửa số tiền.", answers=[3,4,2,3,3,4,2,3,4,3], clarity="Danh sách sản phẩm hữu ích, nhưng tổng tiền sửa được khiến cách tính chưa rõ ràng.", recovery="Nếu tổng tiền có vẻ sai, tôi sẽ quay lại giỏ để đối chiếu.", speed="Hầu hết trang có vẻ nhanh; việc kiểm tra phép tính làm mất thêm thời gian.", trust="Tôi tin lịch sử đơn hàng hơn một ô tổng tiền có thể chỉnh sửa."),
    dict(focus="truyền thông", shopping="thường mua sắm trên điện thoại", trait="mong đợi huy hiệu giỏ và điều hướng gọn", story="Persona mong thấy huy hiệu số lượng trên giỏ, nhìn thanh đầu trang rồi chọn liên kết giỏ hàng. Khi thanh toán, persona kiểm tra khoản giảm đã được tính chưa.", pause="Tìm huy hiệu số lượng trên thanh đầu trang và xem lại tóm tắt giỏ.", error="Không có lỗi giả định; persona nhận xét tín hiệu số lượng giỏ không rõ có thể khiến phải kiểm tra lại.", answers=[4,1,4,2,4,2,5,1,4,2], clarity="Tôi muốn thấy số lượng trong giỏ thật rõ và khoản tiết kiệm được tách bạch.", recovery="Nếu thấy gì đó không ổn, tôi sẽ quay lại giỏ để kiểm tra số lượng.", speed="Luồng giả định nhanh nếu tín hiệu điều hướng dễ thấy.", trust="Mã đơn và trạng thái rõ ràng sẽ khiến tôi yên tâm hơn."),
    dict(focus="giáo dục", shopping="mua sắm trực tuyến không thường xuyên", trait="muốn xác nhận trước thao tác khó hoàn tác", story="Persona đọc kỹ từng trang, kiểm tra mã giảm giá đã áp dụng chưa rồi chờ tín hiệu thành công rõ ràng trước khi xem như xong.", pause="Dừng ở phản hồi mã giảm giá và nút xác nhận thanh toán cuối.", error="Trong kịch bản, persona gõ sai mã một lần, thấy lỗi, nhập lại mã rồi tiếp tục.", answers=[2,3,2,3,2,3,2,3,2,3], clarity="Tôi cần tổng tiền cuối và chữ trên nút dễ hiểu.", recovery="Thông báo mã lỗi cụ thể sẽ giúp tôi biết cần sửa mã hay giá trị đơn hàng.", speed="Tôi sẽ dành thời gian kiểm tra thay vì thao tác nhanh.", trust="Tôi muốn thấy đơn hàng và một thao tác đăng xuất rõ ràng."),
    dict(focus="luật", shopping="mua sắm trực tuyến thường xuyên", trait="kiểm tra trạng thái và an toàn tài khoản", story="Persona xem việc xác minh lịch sử đơn là cần thiết, kiểm tra dòng đơn sau thanh toán rồi tìm thao tác đăng xuất.", pause="Kiểm tra trạng thái đơn và dừng trước nhãn đăng xuất chưa rõ nghĩa.", error="Không có lỗi tác vụ giả định; cách ghi nhãn đăng xuất làm kết thúc luồng kém rõ.", answers=[5,2,4,2,4,1,4,2,5,2], clarity="Tôi muốn trạng thái đơn hàng và thao tác đăng xuất được ghi rõ.", recovery="Nếu mã giảm giá lỗi, tôi sẽ xem lý do trước khi thử mã khác.", speed="Luồng có vẻ hiệu quả khi trạng thái tiếp theo dễ nhận ra.", trust="Có đơn trong lịch sử giúp tôi yên tâm, nhưng xác nhận cuối cần nêu đúng tổng tiền."),
]
questions = [
    "Tôi nghĩ rằng mình muốn sử dụng hệ thống này thường xuyên.",
    "Tôi thấy hệ thống này phức tạp một cách không cần thiết.",
    "Tôi thấy hệ thống này dễ sử dụng.",
    "Tôi nghĩ mình cần người có chuyên môn kỹ thuật hỗ trợ để sử dụng hệ thống này.",
    "Tôi thấy các chức năng trong hệ thống được tích hợp tốt.",
    "Tôi thấy hệ thống có quá nhiều điểm không nhất quán.",
    "Tôi nghĩ hầu hết mọi người sẽ học cách sử dụng hệ thống này rất nhanh.",
    "Tôi thấy hệ thống này rất cồng kềnh khi sử dụng.",
    "Tôi cảm thấy tự tin khi sử dụng hệ thống.",
    "Tôi cần học nhiều điều trước khi có thể bắt đầu sử dụng hệ thống này.",
]

def sus_score(values):
    return 2.5 * sum(v - 1 if i % 2 == 0 else 5 - v for i, v in enumerate(values))

def vi_num(value):
    return f"{value:g}".replace(".", ",")

scores=[]
for result, person in zip(RESULTS, people):
    pid, name = result["id"], result["name"]
    folder = ROOT / "participants" / pid
    score = sus_score(person["answers"]); scores.append(score)
    localized_steps = "đăng nhập: ĐẠT, giỏ hàng: ĐẠT, áp dụng mã: ĐẠT, thanh toán: ĐẠT, xác minh đơn: ĐẠT, đăng xuất: ĐẠT"
    (folder/"participant-profile.md").write_text(f"""# Hồ sơ persona - {pid} (**SIMULATED DATA**)

> **DỮ LIỆU MÔ PHỎNG.** Hồ sơ hư cấu, không mô tả người thật. Tên, tuổi 21 và bối cảnh sinh viên theo yêu cầu; các thuộc tính khác được sáng tác.

- **Tên nhãn:** {name}
- **Tuổi / bối cảnh:** 21 / sinh viên
- **Ngành học giả định:** {person['focus']}
- **Thói quen mua sắm giả định:** {person['shopping']}
- **Mức tự tin giả định:** {['thấp','cao','thấp','trung bình','cao','thấp','cao'][int(pid[-1])-1]}
- **Đặc điểm hành vi giả định:** {person['trait']}
- **Liên hệ / đồng thuận:** Không áp dụng - persona hư cấu, không có người được tuyển dụng hoặc liên hệ.
""",encoding="utf-8")
    (folder/"session-notes.md").write_text(f"""# Ghi chú phiên - {pid} (**SIMULATED DATA**)

> Think-aloud và hành vi dưới đây là kịch bản hư cấu, không được nghe, quan sát hoặc trích xuất từ video Playwright. Video chỉ ghi thao tác tự động.

- **Persona:** {name}, 21 tuổi, sinh viên; đặc điểm giả định trong hồ sơ.
- **Chạy tự động thực tế:** Playwright Chromium, 2026-11-15; {localized_steps}.
- **Kịch bản hành vi hư cấu:** {person['story']}
- **Điểm ngập ngừng giả định:** {person['pause']}
- **Lỗi / phục hồi giả định:** {person['error']}
- **Lời nói mô phỏng:** “{person['clarity']}” - câu hư cấu, không phải trích dẫn thật.
- **Điều phối / đồng thuận / âm thanh:** Không áp dụng; không có người tham gia.
- **Thời lượng sử dụng:** Không đo người thật; thời gian automation không đại diện cho thời gian người dùng.
- **Bằng chứng trình duyệt:** `../../evidence/screenshots/{pid}-*.png`; `../../evidence/session-recordings/{pid}-simulated.webm`. Bằng chứng này không xác nhận kịch bản persona.
""",encoding="utf-8")
    (folder/"observation-log.md").write_text(f"""# Nhật ký quan sát - {pid} (**SIMULATED DATA**)

## A. Sự kiện Playwright quan sát trực tiếp

| Mốc | Kết quả automation | Screenshot |
|---|---|---|
| Đăng nhập | ĐẠT | `{pid}-01-login-home.png` |
| Giỏ hàng | ĐẠT | `{pid}-02-cart.png` |
| Áp dụng mã | ĐẠT | `{pid}-03-coupon-checkout.png` |
| Thanh toán | ĐẠT | `{pid}-04-checkout-success.png` |
| Xác minh đơn | ĐẠT | `{pid}-05-order-history.png` |
| Đăng xuất | ĐẠT - token localStorage đã bị xóa | `{pid}-06-logout.png` |

## B. Kịch bản hành vi tổng hợp (không phải quan sát thật)

- Ngập ngừng giả định: {person['pause']}
- Lỗi / khôi phục giả định: {person['error']}
- Think-aloud hư cấu: “{person['clarity']}”
- Hỗ trợ điều phối / cảm xúc thật: Không có dữ liệu.

Phần B là tình huống giả định, không phải phân tích video ở phần A.
""",encoding="utf-8")
    (folder/"sus-responses.md").write_text(f"""# Phiếu SUS - {pid} (**SIMULATED DATA**)

> **DỮ LIỆU MÔ PHỎNG:** Không có người trả lời. Mức 1-5 dưới đây được tạo để minh họa cách tính, không phải phép đo thực tế.

| # | Phát biểu SUS | Mức trả lời giả định (1-5) |
|---:|---|---:|
"""+''.join(f"| {i} | {q} | {v} |\n" for i,(q,v) in enumerate(zip(questions,person['answers']),1))+f"""
**Cách tính:** Câu lẻ trừ 1; câu chẵn lấy 5 trừ đáp án; tổng hiệu chỉnh nhân 2,5.

- Tổng hiệu chỉnh: {vi_num(score/2.5)}/40
- **Điểm SUS minh họa: {vi_num(score)}/100 (SIMULATED DATA).**
""",encoding="utf-8")
    (folder/"interview-responses.md").write_text(f"""# Câu trả lời phỏng vấn - {pid} (**SIMULATED DATA**)

> Câu trả lời được sáng tác cho persona; không phải phỏng vấn hoặc lời trích dẫn thật.

- **Độ rõ ràng:** “{person['clarity']}”
- **Khắc phục lỗi:** “{person['recovery']}”
- **Tốc độ:** “{person['speed']}”
- **Độ tin cậy:** “{person['trust']}”
- **Phỏng vấn / ghi âm / đồng thuận thật:** Không có.
""",encoding="utf-8")
    (folder/"session-summary.md").write_text(f"""# Tóm tắt phiên - {pid} (**SIMULATED DATA**)

- Persona hư cấu: **{name}**, 21 tuổi, sinh viên; {person['trait']}.
- Hành vi trong kịch bản giả định: {person['story']}
- Điểm ngập ngừng: {person['pause']}
- Lỗi và khôi phục: {person['error']}
- **Kết quả automation độc lập:** {localized_steps}.
- **Kết quả persona giả định:** Hoàn tất sau khó khăn đã mô tả; không phải kết quả do người tham gia tạo ra.
- Điểm SUS minh họa: **{vi_num(score)}/100, SIMULATED DATA**.
- Trả lời phỏng vấn tổng hợp: xem `interview-responses.md`.
""",encoding="utf-8")
    shots=['login-home','cart','coupon-checkout','checkout-success','order-history','logout']
    (folder/"evidence-index.md").write_text(f"""# Chỉ mục bằng chứng - {pid} (**SIMULATED DATA**)

## Bằng chứng trình duyệt thật từ Playwright

- `../../evidence/session-recordings/{pid}-simulated.webm`
"""+''.join(f"- `../../evidence/screenshots/{pid}-{i:02d}-{label}.png`\n" for i,label in enumerate(shots,1))+"""
## Nội dung giả định

Hồ sơ, lời nói, ngập ngừng, lỗi, phỏng vấn và câu trả lời SUS là dữ liệu được sáng tác. Ảnh/video chỉ ghi trạng thái trình duyệt do automation tạo ra, không xác minh hành vi persona.
""",encoding="utf-8")

scoring="""# Bảng tính điểm SUS - **SIMULATED DATA**

> Không có người thật điền SUS. Các vector dưới đây được sáng tác; điểm tính đúng theo vector nhưng không đo tính dễ dùng thực tế.

| ID | Đáp án câu 1-10 | Tổng hiệu chỉnh /40 | SUS /100 |
|---|---|---:|---:|
"""
for result,person in zip(RESULTS,people):
    val=sus_score(person['answers']); scoring+=f"| {result['id']} | {', '.join(map(str,person['answers']))} | {vi_num(val/2.5)} | {vi_num(val)} |\n"
scoring+=f"\n- Trung bình giả lập: {mean(scores):.2f}".replace(".",",")+f"\n- Trung vị giả lập: {vi_num(median(scores))}\n- Khoảng giả lập: {vi_num(min(scores))}-{vi_num(max(scores))}\n- Đây chỉ là phép tính trên đáp án hư cấu; không dùng đối chiếu chuẩn hoặc kết luận về người dùng thật.\n"
(ROOT/"analysis/sus-scoring.md").write_text(scoring,encoding="utf-8")

qual="""# Tổng hợp định tính - **SIMULATED DATA**

> Hành vi và câu phỏng vấn được sáng tác, không phải quan sát thật. Tách riêng kết quả browser có thật với tình huống persona giả định.

## Kết quả automation quan sát trực tiếp

7/7 lượt Playwright vượt qua Đăng nhập, Giỏ hàng, Áp dụng mã, Thanh toán, Xác minh đơn và Đăng xuất. Kết quả chỉ thể hiện các thao tác được script hóa.

## Điểm khó giả định trong kịch bản persona

| Chủ đề | Persona | Mẫu tình huống hư cấu | Ưu tiên |
|---|---|---|---|
| Hiểu nhãn | P01, P03 | Tiêu đề giống trang đăng ký, chữ lỗi mã hóa, chưa rõ ý nghĩa biểu mẫu | Cao |
| Tin cậy giá | P01, P04, P07 | Kiểm tra lại phép tính giảm và lo ngại tổng thanh toán sửa được | Cao |
| Phục hồi lỗi | P03, P06 | Gõ sai mã giả định và cần hướng dẫn sửa cụ thể | Trung bình |
| Trạng thái điều hướng | P02, P05 | Tìm ô mã giảm giá và dấu hiệu số lượng trong giỏ | Trung bình |
| Tự tin hoàn tất | P06, P07 | Cần xác nhận rõ và nhãn đăng xuất dễ hiểu | Trung bình |

Số persona trong bảng là số kịch bản do tác giả tạo, không phải tần suất hoặc tỷ lệ người dùng.

## Lỗi giao diện quan sát được

| Phát hiện | Mức độ | Bằng chứng / yêu cầu |
|---|---|---|
| Chữ tiếng Việt bị lỗi hiển thị trên nhiều màn hình | Cao | BUG-SIM-001; ảnh chụp; FR-21 |
| Nhãn/tiêu đề đăng nhập gây hiểu nhầm, mật khẩu dạng văn bản | Cao | BUG-SIM-002; ảnh đăng nhập; FR-02, FR-22 |
| Tổng tiền checkout có thể chỉnh sửa | Trung bình | ảnh checkout; FR-08 yêu cầu tự tính |

## Khuyến nghị

1. Sửa mã hóa UTF-8 và rà soát toàn bộ nhãn tiếng Việt.
2. Sửa tiêu đề đăng nhập, nhãn trường, kiểu email/mật khẩu và nội dung nút.
3. Tính tổng tiền chuẩn ở phía máy chủ; hiển thị bảng chi tiết chỉ đọc, có khoản giảm.
4. Làm rõ lỗi mã giảm giá, số lượng giỏ, mã/trạng thái đơn và nút “Đăng xuất”.
5. Kiểm chứng mức ưu tiên bằng người tham gia thật trước khi suy rộng.

## Điểm SUS

Điểm trong `sus-scoring.md` được tính từ vector hư cấu. Không có trung bình thực nghiệm hoặc xếp loại usability hợp lệ.
"""
(ROOT/"analysis/qualitative-synthesis.md").write_text(qual,encoding="utf-8")
(ROOT/"analysis/usability-summary-report.md").write_text("# Báo cáo tổng kết đánh giá usability - **SIMULATED DATA**\n\n"+qual.split("\n\n",1)[1]+"\n\nĐây là bảy lượt Playwright tự động, không phải phiên có điều phối viên/người dùng. Hồ sơ, phản ứng, phỏng vấn và điểm SUS đều là dữ liệu giả lập. Báo cáo chính: `main-report.md`.\n",encoding="utf-8")
print('Da tao 7 bo ho so; SUS simulated=',scores,'mean=',f'{mean(scores):.2f}')
