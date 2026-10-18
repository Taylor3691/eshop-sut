---
name: fr-domain-testing
description: >-
  Runs the HW02 domain-testing procedure for one EShop functional requirement:
  input variables, equivalence partitions, on/off/in/out points, 3-value boundary analysis,
  base-choice test cases, live execution, and observed bug reports. Use when
  the user asks to test an FR, do domain testing, input space partitioning,
  equivalence partitioning, boundary value analysis, write or run test cases,
  or file bugs for a feature in this repo.
---

# Domain testing cho một FR

Làm đúng một FR, đúng bước người dùng vừa yêu cầu. Chưa được yêu cầu bước sau thì dừng, không viết sẵn test case hay bug.

Oracle là câu trong `README.md`. Code chỉ cho biết input thật và kết quả đang chạy. Expected không được viết theo cách code đang làm.

Tài liệu tiếng Việt, trong `docs/fr-XX/`; cùng FR trên mobile dùng `docs/fr-XX-mobile/` để không ghi đè bộ web.

## Trước khi viết

1. Đọc mục FR trong `README.md`. Đọc thêm mục UI hoặc bảo mật mà FR đó dẫn tới.
2. Đọc màn hình và route tương ứng, kể cả query trên URL trang.
3. Đọc handler API mà màn hình gọi. Chỉ tính query parameter mà handler thực sự đọc.
4. Đọc schema và seed trong `backend/database.js` cho dữ liệu mà kết quả phụ thuộc vào.

## Các bước

### 1. Input space partitioning

File: `docs/fr-XX/01-input-space-partitioning.md`.

Liệt kê:

- Mọi ô nhập trên UI và lúc nào giá trị được gửi.
- Mọi query trên URL trang và trên API.
- Biến trạng thái dữ liệu làm đổi kết quả (ẩn/hiện, tồn kho, dấu trong tên, v.v.). Nếu cột không tồn tại, ghi rõ nó không ảnh hưởng được.

Bảng mỗi biến: tên, kiểu, ràng buộc theo spec, ràng buộc trong code. Hai cột ràng buộc tách nhau.

Chưa chia miền, chưa chọn giá trị, chưa viết test case.

### 2. Equivalence partitioning

File: `docs/fr-XX/02-equivalence-partitioning.md`. Chỉ dùng biến đã chốt ở bước 1.

- **VEC:** spec mô tả cách xử lý bình thường.
- **IEC:** vi phạm ràng buộc được spec nêu rõ. Spec im lặng không có nghĩa invalid; ghi rõ điểm cần xác nhận.

Mỗi lớp có mã (`KW-VEC-01`) và một giá trị đại diện. Các lớp của cùng một đặc tính thì rời nhau. Một giá trị được thuộc nhiều đặc tính; chia theo đặc tính, không dồn vào một danh sách phẳng.

Không tách thêm lớp khi spec không phân biệt (ví dụ tiền tố, giữa tên, hậu tố là một lớp nếu spec chỉ nói "tìm theo tên"). Không gộp hai lớp khi hành vi spec hoặc dữ liệu seed khác nhau (ASCII và chữ có dấu; `%`, `_`, `'`).

Giá trị đại diện lấy từ seed khi kết quả phụ thuộc dữ liệu đang có.

Mọi biến trạng thái dữ liệu ghi ở bước 1 là "có làm đổi kết quả" (ví dụ số dòng trong bảng) phải có lớp ở bước này. Không bỏ rơi biến giữa bước 1 và bước 2.

Với FR trên mobile (Pool D), không chép bộ web. Thêm đặc tính riêng của thiết bị mà spec cho phép chấm, ví dụ độ rộng màn (điện thoại nhỏ, thường, tablet). Ranh giới nhóm thiết bị là giả định, phải ghi rõ.

### 3. Chọn điểm on/off/in/out và boundary value analysis

File: `docs/fr-XX/03-boundary-value-analysis.md`. Miền lấy từ bước 2. File có hai phần, làm phần A trước.

**Phần A — domain testing: on/off/in/out.** Với mỗi biên của biến có thứ tự, lập bảng bốn điểm và TC phủ:

- On: nằm đúng trên biên.
- Off: gần biên nhất ở phía bên kia. Biên đóng (`≥`, `≤`) thì off nằm ngoài miền; biên mở (`>`, `<`) thì off nằm trong miền, còn on nằm ngoài miền.
- In, out: giá trị điển hình trong và ngoài miền, không sát biên. Nếu miền không âm thì out có thể trùng off; ghi rõ.

Miền liệt kê (role, trạng thái, đuôi file, lớp ký tự) không có on/off. BVA không thay được phần này.

**Phần B — BVA 3 giá trị.**

Với biên đóng `[Min, Max]`, lấy đủ `Min-1`, `Min`, `Min+1`, `Max-1`, `Max`, `Max+1`. Ghi số cụ thể và mã biên.

Nếu spec không có Max thì ghi không có biên trên được xác nhận. Không lấy giới hạn tên sản phẩm làm giới hạn từ khóa. Ràng buộc từ FR khác chỉ dùng khi spec xác nhận phạm vi áp dụng; nếu chưa rõ, ghi giả định và kiểm thử thăm dò. Chức năng không tồn tại (ví dụ phân trang FR-05) là không áp dụng, không sinh test BLOCKED phụ thuộc L. ID là định danh: kiểm tra quan hệ bằng/khác, không áp BVA số học. Miền số thực không có giá trị dương nhỏ nhất; công bố bước lấy mẫu.

Đếm độ dài theo số ký tự. Chuỗi biên dùng ký tự ASCII lặp lại.

### 4. Test cases

File: `docs/fr-XX/04-test-cases.md`.

Bảng: TC ID, miền/biên được phủ, precondition, test data, steps, expected result.

- **Hợp lệ:** base choice. Chọn một mức chuẩn. Mỗi lớp hoặc biên hợp lệ khác được phủ bằng một test, chỉ đổi yếu tố đó.
- **Không hợp lệ:** đúng một dữ liệu sai. Trường còn lại ở mức chuẩn. Không nhét hai lỗi vào một test.

Expected trích hành vi README. Không suy ra case-sensitive chỉ vì spec không yêu cầu case-insensitive. Query thừa là kiểm thử bổ sung với giả định được công bố, không tính là miền chức năng. Phân biệt lỗi đã xác nhận với lệch giả định và quan sát thăm dò.

Giá trị trong bảng là giá trị logic. Ghi rõ test đi UI hay API. Test UI dùng chuỗi người dùng gõ, không encode trước.

### 5. Chạy thật

Viết script trong `scripts/`, bắn đúng test data bước 4 vào UI hoặc API đang chạy local. In Actual cạnh Expected. Ghi `docs/fr-XX/05-execution-results.md`.

Không chấm PASS/FAIL bằng cách đọc code. Oracle vẫn là README. Test phụ thuộc giới hạn chưa có thì ghi BLOCKED, không gán số.

Script sinh file kết quả sẽ ghi đè cả file. Sau mỗi lần chạy, thêm lại mục "Tóm tắt lệch" do người viết: nhóm FAIL theo nguyên nhân và mã bug.

Test summary tách test chức năng khỏi kiểm tra bổ sung (query thừa, độ bền). Không cộng kiểm tra bổ sung vào số PASS của chức năng.

Ảnh bằng chứng phải cho thấy chỗ lỗi, không chỉ thông báo thành công. Với lỗi dữ liệu, chụp sau khi tải lại danh sách hoặc mở trang chi tiết. Với lỗi DOM (`alt`, `h1`) thì chèn chú thích ghi giá trị DOM và nói rõ chú thích do script chèn. Mỗi bug một ảnh riêng; mở ảnh ra xem và so mã băm để chắc các ảnh không trùng nhau. Chỉ chụp test FAIL.

### 6. Bug report

Chỉ sau khi đã chạy và thấy lệch spec. Làm theo rule bug report: một bug một mục trong `docs/bug-report.md`, ảnh trong `docs/bugs/`, một issue trên `Taylor3691/eshop-sut`.

Không lập bug khi spec không cấm hành vi đó. Không bịa bug. Không ghi lỗi AI bỏ sót test vào bug report.

Ảnh trên issue là Markdown trỏ tới file đã có trên nhánh remote. Đường dẫn tương đối không hiện thành hình.

## Commit

Mỗi bước xong thì một commit, theo rule commit từng bước. Message có mã FR và tên bước. Prompt không phải một bước thì không commit.

## Mẫu đã làm

FR-05 nằm ở `docs/fr-05/`. Dùng nó làm mẫu bố cục và cách đặt mã, không chép nhận định hay danh sách test của FR-05 sang FR khác hoặc sang bản mobile.
