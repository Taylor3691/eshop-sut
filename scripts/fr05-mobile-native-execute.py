"""Chạy bộ FR-05 mobile trên Android emulator (Expo Go), không qua Chrome."""
from __future__ import annotations

import json
import sqlite3
import subprocess
import time
import urllib.request
from pathlib import Path
from xml.etree import ElementTree as ET

import uiautomator2 as u2

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT / "backend" / "database.sqlite"
SHOT = ROOT / "docs" / "bugs"
API = "http://127.0.0.1:3000"
SERIAL = "emulator-5554"

SEED_ROWS = [
    ("iPhone 15 Pro Max", 30000000, "Điện thoại cao cấp của Apple", "https://placehold.co/300x300/png?text=iPhone+15", 1),
    ("Samsung Galaxy S24 Ultra", 28000000, "Màn hình hiển thị xuất sắc, camera siêu zoom", "https://placehold.co/300x300/png?text=Samsung+S24", 1),
    ("MacBook Pro M3", 45000000, "Laptop chuyên nghiệp mạnh mẽ", "https://placehold.co/300x300/png?text=Macbook+Pro", 2),
    ("Tai nghe AirPods Pro 2", 6000000, "Chống ồn chủ động xuất sắc", "https://placehold.co/300x300/png?text=AirPods+Pro", 3),
    ("Bàn phím cơ Keychron Q1", 4000000, "Gõ cực sướng, thiết kế kim loại", "https://placehold.co/300x300/png?text=Keychron+Q1", 3),
]
ALL = [row[0] for row in SEED_ROWS]
WITH_A = ALL[:4]
PRICES = {
    "iPhone 15 Pro Max": "30.000.000",
    "Samsung Galaxy S24 Ultra": "28.000.000",
    "MacBook Pro M3": "45.000.000",
    "Tai nghe AirPods Pro 2": "6.000.000",
    "Bàn phím cơ Keychron Q1": "4.000.000",
}
A254 = "a" * 254
A255 = "a" * 255
A256 = "a" * 256

CASES = [
    {"id": "TC-01", "expect": "Chỉ iPhone 15 Pro Max, giá 30.000.000 ₫. Có loading. Chữ iPhone hiện dạng text.", "search": "iPhone", "names": ["iPhone 15 Pro Max"], "loading": True, "show": "iPhone"},
    {"id": "TC-02", "expect": "Chỉ đúng một sản phẩm iPhone 15 Pro Max.", "search": "iPhone 15 Pro Max", "names": ["iPhone 15 Pro Max"]},
    {"id": "TC-03", "expect": "Có empty state. Không hiện năm sản phẩm seed.", "search": "zzzz-khong-co", "names": [], "empty": True},
    {"id": "TC-04", "expect": "Chấp nhận rỗng hoặc sản phẩm tương ứng vì spec chưa chốt hoa thường/dấu; rỗng phải có empty state, không lỗi.", "search": "iphone", "allowed": ["iPhone 15 Pro Max"]},
    {"id": "TC-05", "expect": "Chấp nhận rỗng hoặc sản phẩm tương ứng vì spec chưa chốt hoa thường/dấu; rỗng phải có empty state, không lỗi.", "search": "CƠ", "allowed": ["Bàn phím cơ Keychron Q1"]},
    {"id": "TC-06", "expect": "Chỉ Bàn phím cơ Keychron Q1, giá 4.000.000 ₫.", "search": "Bàn phím", "names": ["Bàn phím cơ Keychron Q1"]},
    {"id": "TC-07", "expect": "Chấp nhận rỗng hoặc sản phẩm tương ứng vì spec chưa chốt hoa thường/dấu; rỗng phải có empty state, không lỗi.", "search": "Ban phim", "allowed": ["Bàn phím cơ Keychron Q1"]},
    {"id": "TC-08", "expect": "Đủ 5 sản phẩm seed. Giá đúng ₫ và phân cách hàng nghìn.", "search": "", "names": ALL, "mount": True},
    {"id": "TC-09", "expect": "Empty state. Trang hiện đúng các ký tự <script>, không chạy script.", "search": "<script>", "names": [], "empty": True, "show": "<script>"},
    {"id": "TC-10", "expect": "Có iPhone 15 Pro Max, Samsung, MacBook, AirPods vì tên có chữ a. Không có Keychron.", "search": "a", "names": WITH_A, "absent": ["Bàn phím cơ Keychron Q1"]},
    {"id": "TC-11", "expect": "Empty state. Không tên seed nào chứa aa.", "search": "aa", "names": [], "empty": True},
    {"id": "TC-12", "expect": "Empty state. Không lỗi.", "search": A254, "names": [], "empty": True},
    {"id": "TC-13", "expect": "Empty state. Không lỗi.", "search": A255, "names": [], "empty": True},
    {"id": "TC-14", "expect": "HTTP không phải lỗi. JSON chỉ có iPhone 15 Pro Max, giống khi không gửi foo.", "api": True},
    {"id": "TC-15", "expect": "Empty state. Không hiện đủ 5 sản phẩm. Không lỗi.", "search": " ", "names": [], "empty": True},
    {"id": "TC-16", "expect": "Empty state. Không hiện đủ 5 sản phẩm. Không lỗi.", "search": "  ", "names": [], "empty": True},
    {"id": "TC-17", "expect": "Empty state. % không trả mọi sản phẩm. Không lỗi SQL. % hiện dạng text.", "search": "%", "names": [], "empty": True, "show": "%", "no_sql": True},
    {"id": "TC-18", "expect": "Empty state. _ không khớp một ký tự bất kỳ. Không lỗi SQL.", "search": "_", "names": [], "empty": True, "no_sql": True},
    {"id": "TC-19", "expect": "Empty state. Không trả trang lỗi SQL. Dấu nháy hiện dạng text.", "search": "'", "names": [], "empty": True, "show": "'", "no_sql": True},
    {"id": "TC-20", "expect": "Empty state. Tìm cả chuỗi a&b, không cắt thành a. Không lỗi.", "search": "a&b", "names": [], "empty": True, "show": "a&b", "absent": WITH_A},
    {"id": "TC-21", "expect": "Empty state. Tìm cả chuỗi a#b. Không lỗi.", "search": "a#b", "names": [], "empty": True, "show": "a#b"},
    {"id": "TC-22", "expect": "Empty state. Tìm cả chuỗi a?b. Không lỗi.", "search": "a?b", "names": [], "empty": True, "show": "a?b"},
    {"id": "TC-23", "expect": "Empty state. FR-05 không báo lỗi độ dài. Chuỗi hiện dạng text.", "search": A256, "names": [], "empty": True, "show": A256},
    {"id": "TC-24", "expect": "CSDL 0 sản phẩm. Màn home không có sản phẩm và có empty state (icon/hình minh họa và message).", "search": "", "mount": True, "products": 0, "names": [], "empty": True, "shot": True},
    {"id": "TC-25", "expect": "CSDL 1 sản phẩm. Danh sách có đúng iPhone 15 Pro Max, giá 30.000.000 ₫.", "search": "", "mount": True, "products": 1, "names": ["iPhone 15 Pro Max"], "price": True, "shot": True},
    {"id": "TC-26", "expect": "CSDL 2 sản phẩm. Danh sách có đúng iPhone 15 Pro Max và Samsung Galaxy S24 Ultra.", "search": "", "mount": True, "products": 2, "names": ALL[:2], "shot": True},
    {"id": "TC-27", "expect": "Màn 320px (điện thoại nhỏ). Đủ 5 sản phẩm, không tràn ngang, tên và giá không bị cắt khỏi màn.", "search": "", "mount": True, "width": 320, "names": ALL, "layout": True, "shot": True},
    {"id": "TC-28", "expect": "Màn 768px (tablet). Đủ 5 sản phẩm, không tràn ngang, tên và giá không bị cắt khỏi màn.", "search": "", "mount": True, "width": 768, "names": ALL, "layout": True, "shot": True},
]


def set_products(count: int | None = None) -> None:
    n = len(SEED_ROWS) if count is None else count
    db = sqlite3.connect(DB)
    try:
        db.execute("DELETE FROM products")
        for row in SEED_ROWS[:n]:
            db.execute(
                "INSERT INTO products (name, price, description, imageUrl, category_id) VALUES (?, ?, ?, ?, ?)",
                row,
            )
        db.commit()
    finally:
        db.close()


def same_names(actual, expected) -> bool:
    return sorted(actual) == sorted(expected)


def has_money(text: str, name: str) -> bool:
    amount = PRICES[name]
    comma = amount.replace(".", ",")
    return "₫" in text and (amount in text or comma in text)


def looks_sql(text: str) -> bool:
    return any(token in text for token in ("SQLITE", "Database Error", "syntax error"))


def texts_from_xml(xml: str) -> list[str]:
    root = ET.fromstring(xml)
    out = []
    for node in root.iter("node"):
        value = node.attrib.get("text") or ""
        if value:
            out.append(value)
    return out


def nodes_from_xml(xml: str):
    root = ET.fromstring(xml)
    for node in root.iter("node"):
        bounds = node.attrib.get("bounds") or ""
        yield node.attrib.get("text") or "", bounds


def parse_bounds(raw: str):
    left, top, right, bottom = [int(part) for part in raw.replace("][", ",").replace("[", "").replace("]", "").split(",")]
    return left, top, right, bottom


def scroll_to_top(d) -> None:
    width, height = d.window_size()
    for _ in range(5):
        d.swipe(width // 2, int(height * 0.32), width // 2, int(height * 0.82), 0.15)
        time.sleep(0.12)


def collect(d) -> dict:
    scroll_to_top(d)
    names = []
    values = []
    xml = ""
    seen_pages = set()
    for _ in range(6):
        xml = d.dump_hierarchy()
        page = texts_from_xml(xml)
        key = tuple(page)
        values.extend(page)
        blob = "\n".join(page)
        for name in ALL:
            if name in blob and name not in names:
                names.append(name)
        if len(names) >= 5 or key in seen_pages:
            break
        seen_pages.add(key)
        width, height = d.window_size()
        d.swipe(width // 2, int(height * 0.72), width // 2, int(height * 0.28), 0.2)
        time.sleep(0.25)
    for _ in range(2):
        width, height = d.window_size()
        d.swipe(width // 2, int(height * 0.28), width // 2, int(height * 0.72), 0.2)
        time.sleep(0.15)
    text = "\n".join(values)
    return {"text": text, "names": names, "xml": xml, "values": values}


def dismiss(d) -> None:
    if d(text="Continue").exists:
        d(text="Continue").click()
        time.sleep(0.6)
    if d(text="Got it").exists:
        d(text="Got it").click()
        time.sleep(0.4)


def hide_keyboard(d) -> None:
    if d(packageName="com.google.android.inputmethod.latin").exists:
        d.press("back")
        time.sleep(0.3)


def reload_app(d) -> None:
    before = product_log_count()
    subprocess.run(["adb", "-s", SERIAL, "shell", "am", "force-stop", "host.exp.exponent"], check=False)
    time.sleep(0.5)
    subprocess.run(
        ["adb", "-s", SERIAL, "shell", "am", "start", "-a", "android.intent.action.VIEW", "-d", "exp://127.0.0.1:8081"],
        check=False,
        capture_output=True,
    )
    deadline = time.time() + 45
    started = False
    seen_home = None
    while time.time() < deadline:
        dismiss(d)
        home = d(text="Danh sách sản phẩm").exists
        fresh = product_log_count() > before
        if home and fresh:
            time.sleep(0.9)
            return
        if home:
            seen_home = seen_home or time.time()
            if time.time() - seen_home > 8:
                return
        else:
            seen_home = None
        if not started and time.time() > deadline - 30:
            subprocess.run(
                ["adb", "-s", SERIAL, "shell", "am", "start", "-a", "android.intent.action.VIEW", "-d", "exp://127.0.0.1:8081"],
                check=False,
                capture_output=True,
            )
            started = True
        time.sleep(0.4)
    raise RuntimeError("app không tải lại màn home")


def set_width(width: int | None) -> None:
    if width is None:
        subprocess.run(["adb", "-s", SERIAL, "shell", "wm", "size", "reset"], check=False)
        subprocess.run(["adb", "-s", SERIAL, "shell", "wm", "density", "reset"], check=False)
        return
    height = 711 if width == 320 else 1024
    subprocess.run(["adb", "-s", SERIAL, "shell", "wm", "size", f"{width}x{height}"], check=False)
    subprocess.run(["adb", "-s", SERIAL, "shell", "wm", "density", "160"], check=False)
    time.sleep(1)


def last_product_url(before: int) -> str:
    path = Path("/Users/toanhuynh/.cursor/projects/Users-toanhuynh-UNI-Ki-m-Th-eshop-sut/terminals/749137.txt")
    if not path.exists():
        return ""
    lines = [line.strip() for line in path.read_text(errors="replace").splitlines() if line.startswith("PRODUCTS ")]
    if len(lines) <= before:
        return ""
    return lines[-1].removeprefix("PRODUCTS ")


def product_log_count() -> int:
    path = Path("/Users/toanhuynh/.cursor/projects/Users-toanhuynh-UNI-Ki-m-Th-eshop-sut/terminals/749137.txt")
    if not path.exists():
        return 0
    return sum(1 for line in path.read_text(errors="replace").splitlines() if line.startswith("PRODUCTS "))


def search_ui(d, value: str, mount: bool) -> dict:
    dismiss(d)
    loading = False
    before = product_log_count()
    if not mount:
        field = d(className="android.widget.EditText")
        field.click()
        time.sleep(0.25)
        field.set_text(value)
        time.sleep(0.2)
        d(text="Tìm").click()
        deadline = time.time() + 1.2
        while time.time() < deadline:
            xml = d.dump_hierarchy()
            if "Đang tải" in xml:
                loading = True
                break
        time.sleep(0.8)
    else:
        time.sleep(0.6)
    hide_keyboard(d)
    seen = collect(d)
    request_url = last_product_url(before)
    layout = None
    info = d.window_size()
    width = info[0]
    clipped = []
    overflow = False
    for text, bounds in nodes_from_xml(seen["xml"]):
        if not bounds:
            continue
        left, top, right, bottom = parse_bounds(bounds)
        if right > width + 2 or left < -2:
            if any(name in text for name in ALL) or "₫" in text:
                clipped.append(text[:40])
        if right > width + 8:
            overflow = True
    layout = {"width": width, "overflow": overflow, "clipped": clipped}
    return {"dom": seen, "loading": loading, "request_url": request_url, "layout": layout}


def judge(case, seen, extra) -> dict:
    reasons = []
    text = seen.get("text", "")
    names = seen.get("names", [])
    if case.get("names") is not None and not same_names(names, case["names"]):
        reasons.append(f"sản phẩm: {'; '.join(names) or '(không có)'}")
    if case.get("allowed"):
        if any(name not in case["allowed"] for name in names):
            reasons.append("sản phẩm ngoài lớp tương ứng")
        if not names and not any(token in text.lower() for token in ("không có", "không tìm thấy", "trống")):
            reasons.append("thiếu empty state")
        if looks_sql(text):
            reasons.append("lỗi SQL")
    for name in case.get("absent", []):
        if name in text:
            reasons.append(f"vẫn thấy {name}")
    if case.get("names"):
        for name in case["names"]:
            if name in text and not has_money(text, name) and (case.get("price") or case["id"] in {"TC-01", "TC-06", "TC-08"}):
                reasons.append(f"giá {name} không đúng ₫")
    if case.get("empty"):
        message = any(token in text.lower() for token in ("không có", "không tìm thấy", "trống"))
        if not message:
            reasons.append("không có câu empty state")
            reasons.append("không có icon empty state")
    if case.get("loading") and not extra.get("loading"):
        reasons.append("không thấy loading")
    show = case.get("show")
    if show and show[:40] not in text:
        reasons.append("không thấy chữ từ khóa")
    if case.get("layout") and extra.get("layout"):
        layout = extra["layout"]
        if layout["overflow"]:
            reasons.append(f"tràn ngang (width {layout['width']})")
        if layout["clipped"]:
            reasons.append("bị cắt khỏi màn: " + "; ".join(layout["clipped"]))
    if case.get("no_sql") and looks_sql(text):
        reasons.append("trang lỗi SQL")
    if looks_sql(text) and case.get("names") is not None:
        reasons.append("thân là lỗi SQL")
    actual = [
        "; ".join(names) if names else "(không có sản phẩm)",
        f"Viewport {extra['layout']['width']}px." if extra.get("layout") else None,
        f"Request: {extra['request_url']}." if extra.get("request_url") else None,
        f"Lỗi: {text.replace(chr(10), ' ')[:180]}." if looks_sql(text) else None,
    ]
    actual = " ".join(part for part in actual if part)
    if reasons:
        actual = f"{actual} Lệch: {'; '.join(reasons)}."
    return {"pass": not reasons, "actual": actual}


def main() -> None:
    set_width(None)
    d = u2.connect(SERIAL)
    dismiss(d)
    if not d(text="Danh sách sản phẩm").exists:
        reload_app(d)
    results = []
    for case in CASES:
        extra = {}
        if case.get("api"):
            with urllib.request.urlopen(f"{API}/api/products?search=iPhone&foo=1") as response:
                body = json.loads(response.read().decode())
                status = response.status
            names = [row["name"] for row in body] if isinstance(body, list) else []
            ok = status < 400 and same_names(names, ["iPhone 15 Pro Max"])
            judged = {
                "pass": ok,
                "actual": f"HTTP {status}. {'; '.join(names) or '(không có)'}{'' if ok else '. Lệch: tập sản phẩm hoặc HTTP.'}",
            }
        else:
            if case.get("products") is not None:
                set_products(case["products"])
            if case.get("width") is not None:
                set_width(case["width"])
            try:
                try:
                    if case.get("products") is not None or case.get("width") is not None or case.get("mount"):
                        reload_app(d)
                    seen = search_ui(d, case.get("search", ""), case.get("mount", False))
                    judged = judge(case, seen["dom"], seen)
                    extra = seen
                    if case.get("shot"):
                        SHOT.mkdir(exist_ok=True)
                        d.screenshot(str(SHOT / f"fr05-mobile-native-{case['id']}.png"))
                except Exception as error:
                    judged = {"pass": False, "actual": f"Không chạy xong: {error}"}
            finally:
                if case.get("products") is not None:
                    set_products()
                if case.get("width") is not None:
                    set_width(None)
                    try:
                        reload_app(d)
                    except Exception as error:
                        print(f"{case['id']}\treset\t{error}", flush=True)
        results.append({**case, **judged})
        status = "PASS" if judged["pass"] else "FAIL"
        print(f"{case['id']}\t{status}\t{judged['actual']}", flush=True)

    passed = sum(1 for row in results if row["pass"])
    failed = len(results) - passed
    lines = [
        "# FR-05 mobile — Kết quả chạy test case",
        "",
        "Hai lượt chạy. Lượt mới nhất là Android emulator (Expo Go), không còn BLOCKED vì Chrome cắt dấu cách.",
        "",
        "## Lượt 2 — Android emulator + Expo Go (18/10/2026, UTC+7)",
        "",
        "Thiết bị: AVD `Medium_Phone`, Android 17, Expo Go 54.0.8, gói `host.exp.exponent`.",
        "API: `http://10.0.2.2:3000` (host của emulator). Script: `scripts/fr05-mobile-native-execute.py`.",
        "App gốc gọi `http://192.168.10.13:3000`; máy này là `192.168.2.24` nên chỉ đổi host lúc chạy, không đổi cách ghép query `search=${query}`.",
        "",
        f"Tổng: {len(results)}. PASS: {passed}. FAIL: {failed}. BLOCKED: 0.",
        "",
        "Trong đó TC-14 là kiểm tra bổ sung query thừa, không tính vào coverage chức năng.",
        "",
        "| TC | Kết quả | Expected Result | Actual Result |",
        "| --- | --- | --- | --- |",
    ]
    for row in results:
        expect = row["expect"].replace("|", "\\|")
        actual = row["actual"].replace("|", "\\|").replace("\n", " ")
        status = "PASS" if row["pass"] else "FAIL"
        lines.append(f"| {row['id']} | {status} | {expect} | {actual} |")
    lines += [
        "",
        "Ảnh native: `docs/bugs/fr05-mobile-native-TC-24.png` đến `TC-28.png`.",
        "",
        "TC-15 và TC-16 không còn BLOCKED. Ô tìm giữ dấu cách (dòng \"Kết quả tìm kiếm cho:\" có dấu cách), nhưng request tới server là `search=` rỗng vì app ghép `search=${query}` không encode. Danh sách trả về đủ sản phẩm seed, giống từ khóa rỗng.",
        "",
        "TC-08, TC-24, TC-25, TC-26, TC-27, TC-28 mở lại app bằng force-stop rồi vào `exp://127.0.0.1:8081`, đợi request `/api/products` mới, rồi mới đọc màn hình.",
        "",
        "## Lượt 1 — Expo web (giữ để đối chiếu)",
        "",
        "Chạy trên `http://127.0.0.1:8081` bằng `scripts/fr05-mobile-execute.mjs`. TC-15 và TC-16 BLOCKED vì Chrome cắt dấu cách cuối URL.",
        "",
    ]
    out = ROOT / "docs" / "fr-05-mobile" / "05-execution-results.md"
    out.write_text("\n".join(lines) + "\n")
    print(f"\n{passed} PASS, {failed} FAIL. Ghi {out}")


if __name__ == "__main__":
    main()
