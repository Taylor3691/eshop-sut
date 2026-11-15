#!/usr/bin/env python3
"""Tính số liệu cho analysis.md (mục 1 SUS, mục 2 task metrics) từ notes các phiên. Không tính pilot.

In ra Markdown để dán vào analysis.md. Phần định tính (gom nhóm vấn đề, severity, đề xuất) vẫn do
người phân tích viết, dựa trên bảng đếm quan sát ở cuối output.

Dùng:
    python3 analyze.py --task-dir submission/task2-usability \
        --target 60,60,120,180,120,30 --max 180,180,420,480,240,120 \
        [--group "Đã dùng=P1,P4,P5,P6" --group "Chưa dùng=P2,P3,P7"] [--out sections.md]
"""
import argparse, math, statistics as st, sys
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from notes_lib import find_notes, parse_notes, sus_score  # noqa: E402

# t tới hạn hai phía 95% theo bậc tự do
T95 = {1: 12.706, 2: 4.303, 3: 3.182, 4: 2.776, 5: 2.571, 6: 2.447, 7: 2.365, 8: 2.306, 9: 2.262, 10: 2.228,
       11: 2.201, 12: 2.179, 13: 2.160, 14: 2.145, 15: 2.131, 16: 2.120, 17: 2.110, 18: 2.101, 19: 2.093, 20: 2.086,
       25: 2.060, 30: 2.042}
SUS_Q = ["Muốn dùng thường xuyên", "Phức tạp không cần thiết", "Dễ sử dụng", "Cần người kỹ thuật hỗ trợ",
         "Chức năng kết hợp hợp lý", "Nhiều chỗ không nhất quán", "Mọi người học nhanh", "Rườm rà, khó thao tác",
         "Tự tin khi dùng", "Phải học nhiều thứ trước"]


def accept(s):  # Bangor, Kortum & Miller (2009)
    return "Acceptable" if s > 70 else ("Marginal" if s >= 50 else "Not acceptable")


def mmss(s):
    return f"{int(s) // 60}:{int(s) % 60:02d}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--task-dir", required=True)
    ap.add_argument("--target", help="thời gian mục tiêu từng bước (giây)")
    ap.add_argument("--max", help="thời gian tối đa từng bước (giây)")
    ap.add_argument("--group", action="append", default=[], help='"Tên nhóm=P1,P2"')
    ap.add_argument("--out")
    a = ap.parse_args()

    S = [parse_notes(f) for f in find_notes(a.task_dir)]
    S = [d for d in S if d["sus"] and d["steps"]]
    if not S:
        sys.exit("Không có phiên nào đủ SUS và bảng bước.")
    tg = [int(x) for x in a.target.split(",")] if a.target else None
    mx = [int(x) for x in a.max.split(",")] if a.max else None
    L = []
    w = L.append

    # ---- 1. SUS
    sc = {d["code"]: sus_score(d["sus"]) for d in S}
    vals = list(sc.values())
    w("## 1. Điểm SUS\n")
    w("| Người tham gia | " + " | ".join(f"Q{i}" for i in range(1, 11)) + " | Điểm SUS | Mức chấp nhận (Bangor et al.) |")
    w("|---|" + "---|" * 12)
    for d in S:
        w(f"| {d['code']} | " + " | ".join(map(str, d["sus"])) + f" | {sc[d['code']]:.1f} | {accept(sc[d['code']])} |")
    n = len(vals)
    mean = st.mean(vals)
    w("\n| Thống kê | Giá trị |\n|---|---|")
    w(f"| Trung bình | **{mean:.2f}** |")
    if n > 1:
        sd = st.stdev(vals)
        t = T95.get(n - 1) or T95[max(k for k in T95 if k <= n - 1)]
        half = t * sd / math.sqrt(n)
        w(f"| Độ lệch chuẩn | {sd:.2f} |")
        w(f"| Trung vị | {st.median(vals):g} |")
        w(f"| Min / Max | {min(vals):g} ({min(sc, key=sc.get)}) / {max(vals):g} ({max(sc, key=sc.get)}) |")
        w(f"| Khoảng tin cậy 95% (t, df = {n - 1}) | {mean - half:.1f} – {mean + half:.1f} |")
    w(f"\nSo với mốc 68 (Sauro): {'cao hơn' if mean > 68 else 'thấp hơn'}; vùng {accept(mean)}. "
      f"Acceptable {sum(v > 70 for v in vals)}/{n}, Marginal {sum(50 <= v <= 70 for v in vals)}/{n}, "
      f"Not acceptable {sum(v < 50 for v in vals)}/{n}.\n")
    w("**Đóng góp trung bình từng câu** (0–4, càng cao càng tốt):\n")
    w("| Câu | Nội dung (rút gọn) | Điểm gốc TB | Đóng góp TB |\n|---|---|---|---|")
    rows = []
    for q in range(10):
        raw = [d["sus"][q] for d in S]
        con = [(x - 1) if q % 2 == 0 else (5 - x) for x in raw]
        rows.append((st.mean(con), q, st.mean(raw)))
    for c, q, r in sorted(rows):
        w(f"| Q{q + 1} | {SUS_Q[q]} | {r:.2f} | {c:.2f} |")
    for g in a.group:
        name, codes = g.split("=", 1)
        gv = [sc[c] for c in codes.split(",") if c in sc]
        if gv:
            w(f"\nNhóm **{name}** ({', '.join(c for c in codes.split(',') if c in sc)}): SUS TB **{st.mean(gv):.2f}** (n = {len(gv)})")

    # ---- 2. Task metrics
    k = max(len(d["steps"]) for d in S)
    w("\n## 2. Task metrics\n\n### 2.1. Theo bước\n")
    w("| Bước | Y / A / N | TB (giây) | Trung vị | Min – Max | Vượt mục tiêu | Vượt tối đa | Lỗi (số người) | Trợ giúp |")
    w("|---|---|---|---|---|---|---|---|---|")
    for i in range(k):
        xs = [d["steps"][i] for d in S if i < len(d["steps"])]
        t = [x["sec"] for x in xs]
        dn = Counter("A" if x["done"] == "Assisted" else x["done"] for x in xs)
        over_t = f"{sum(v > tg[i] for v in t)}/{len(t)}" if tg and i < len(tg) else "—"
        over_m = f"{sum(v > mx[i] for v in t)}/{len(t)}" if mx and i < len(mx) else "—"
        lim = f" (≤ {tg[i]}, tối đa {mx[i]})" if tg and mx and i < min(len(tg), len(mx)) else ""
        w(f"| {xs[0]['name']}{lim} | {dn['Y']} / {dn['A']} / {dn['N']} | {st.mean(t):.1f} | {st.median(t):g} | "
          f"{min(t)} – {max(t)} | {over_t} | {over_m} | {sum(x['err'] for x in xs)} ({sum(x['err'] > 0 for x in xs)}) | "
          f"{sum(x['help'] for x in xs)} |")
    w("\n### 2.2. Theo người tham gia\n")
    w("| Người tham gia | " + " | ".join(f"B{i + 1}" for i in range(k)) + " | Tổng thời gian | Tổng lỗi | Trợ giúp |")
    w("|---|" + "---|" * (k + 3))
    tot = []
    for d in S:
        s = sum(x["sec"] for x in d["steps"])
        tot.append(s)
        cells = [(x["done"] if x["done"] == "Y" else f"**{x['done']}**") for x in d["steps"]]
        w(f"| {d['code']} | " + " | ".join(cells) + f" | {mmss(s)} | {sum(x['err'] for x in d['steps'])} | "
          f"{sum(x['help'] for x in d['steps'])} |")
    full = sum(all(x["done"] == "Y" for x in d["steps"]) for d in S)
    w(f"\nToàn bộ flow: {full}/{n} người đạt mọi bước không cần trợ giúp. Thời gian TB {mmss(st.mean(tot))} "
      f"(trung vị {mmss(st.median(tot))}, min {mmss(min(tot))}, max {mmss(max(tot))}).")

    # ---- Đếm quan sát (để viết mục 3)
    obs = [(d["code"], o) for d in S for o in d["obs"]]
    w(f"\n### Đếm quan sát (dùng khi viết mục 3)\n\nTổng {len(obs)} dòng. Theo loại: "
      + ", ".join(f"{t} {c}" for t, c in Counter(o["type"] for _, o in obs).most_common())
      + ". Theo mức độ: " + ", ".join(f"mức {s}: {c}" for s, c in sorted(Counter(o["sev"] for _, o in obs).items())) + ".\n")
    w("| Bước | " + " | ".join(sorted({o["type"] for _, o in obs})) + " |")
    w("|---|" + "---|" * len({o["type"] for _, o in obs}))
    for i in range(1, k + 1):
        c = Counter(o["type"] for _, o in obs if o["step"] == i)
        w(f"| B{i} | " + " | ".join(str(c[t]) for t in sorted({o['type'] for _, o in obs})) + " |")
    sev3 = [f"{p} {o['t']} (B{o['step']})" for p, o in obs if o["sev"] == 3]
    if sev3:
        w(f"\nQuan sát mức 3: {', '.join(sev3)}.")

    text = "\n".join(L) + "\n"
    if a.out:
        Path(a.out).write_text(text, encoding="utf-8")
        print(f"Đã ghi {a.out}")
    else:
        print(text)


if __name__ == "__main__":
    main()
