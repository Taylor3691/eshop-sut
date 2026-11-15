"""Đọc / ghi file notes phiên usability (định dạng session-notes-TEMPLATE.md) — dùng chung cho các script."""
import re
from pathlib import Path

DEFAULT_THEMES = {"C": "Clarity", "E": "Error recovery", "S": "Speed", "T": "Trust", "W": "Tổng kết"}
OBS_HEADER = "| Thời điểm | Bước | Hành vi | Lời nói (nguyên văn) | Loại (friction/error/hesitation/frustration) | Mức độ |"
STEP_HEADER = "| Bước | Hoàn thành | Thời gian (giây) | Số lỗi | Số lần trợ giúp | Ghi chú |"


def sus_score(answers):
    """SUS: câu lẻ (điểm - 1), câu chẵn (5 - điểm), tổng x 2.5."""
    assert len(answers) == 10 and all(1 <= x <= 5 for x in answers), answers
    return sum((x - 1) if i % 2 == 0 else (5 - x) for i, x in enumerate(answers)) * 2.5


def to_sec(hms):
    parts = [int(x) for x in hms.split(":")]
    while len(parts) < 3:
        parts.insert(0, 0)
    return parts[0] * 3600 + parts[1] * 60 + parts[2]


def parse_notes(path):
    """Trả về dict: code, header (dict), obs (list), steps (list), sus (list|None), probe (list)."""
    t = Path(path).read_text(encoding="utf-8")
    d = {"path": str(path), "header": {}, "obs": [], "steps": [], "sus": None, "probe": []}
    m = re.search(r"^# Phiên (\S+) — (.*)$", t, re.M)
    d["code"], d["header"]["Ngày giờ"] = (m.group(1), m.group(2).strip()) if m else (Path(path).parent.name, "")
    for line in t.splitlines()[:6]:
        if line.startswith("- "):
            for part in line[2:].split(" · "):
                if ":" in part:
                    k, v = part.split(":", 1)
                    d["header"][k.strip()] = v.strip()
    for m in re.finditer(r"^\| (\d{1,2}:\d\d) \| (B\d+) \| (.*?) \| (\".*?\"|—|) \| (\w+) \| (\d) \|$", t, re.M):
        d["obs"].append({"t": m.group(1), "step": int(m.group(2)[1:]), "act": m.group(3), "quote": m.group(4),
                         "type": m.group(5), "sev": int(m.group(6))})
    for m in re.finditer(r"^\| (B(\d+) [^|]*?) \| (\S*) \| (\d+) \| (\d+) \| (\d+) \| (.*) \|$", t, re.M):
        d["steps"].append({"name": m.group(1), "n": int(m.group(2)), "done": m.group(3), "sec": int(m.group(4)),
                           "err": int(m.group(5)), "help": int(m.group(6)), "note": m.group(7)})
    m = re.search(r"^Q1 (\d) Q2 (\d) Q3 (\d) Q4 (\d) Q5 (\d) Q6 (\d) Q7 (\d) Q8 (\d) Q9 (\d) Q10 (\d)", t, re.M)
    if m:
        d["sus"] = [int(x) for x in m.groups()]
    for m in re.finditer(r"^\| ([A-Z]\d+) \| ([^|]+) \| (.*) \|$", t, re.M):
        d["probe"].append({"q": m.group(1), "theme": m.group(2).strip(), "a": m.group(3)})
    return d


def render_notes(code, header, obs, steps, sus, probe, themes=DEFAULT_THEMES):
    """Sinh nội dung notes.md theo session-notes-TEMPLATE.md. header: dict các trường của phiếu."""
    h = dict(header)
    when = h.pop("Ngày giờ", "")
    start, end, done = h.pop("Bắt đầu", ""), h.pop("Kết thúc", ""), h.pop("Hoàn thành task", "")
    info = [f"Người tham gia: {code}"] + [f"{k}: {v}" for k, v in h.items()]
    out = [f"# Phiên {code} — {when}", "",
           "- " + " · ".join(info),
           f"- Bắt đầu: {start} · Kết thúc: {end} · Hoàn thành task:{(' ' + done) if done else ''}", "",
           "## Ghi chú quan sát", OBS_HEADER, "|---|---|---|---|---|---|"]
    out += ["| " + " | ".join(o) + " |" for o in obs]
    out += ["", "### Kết quả từng bước", STEP_HEADER, "|---|---|---|---|---|---|"]
    out += ["| " + " | ".join(s) + " |" for s in steps]
    out += ["", "## SUS"]
    if sus:
        out.append(" ".join(f"Q{i + 1} {v}" for i, v in enumerate(sus)) + f" → Điểm: {sus_score(sus):g} (nhập vào sus-and-metrics.xlsx)")
    else:
        out.append("Q1 _ Q2 _ Q3 _ Q4 _ Q5 _ Q6 _ Q7 _ Q8 _ Q9 _ Q10 _ → Điểm: _ (nhập vào sus-and-metrics.xlsx)")
    out += ["", "## Probe — câu trả lời", "| Câu hỏi | Chủ đề | Trả lời |", "|---|---|---|"]
    out += [f"| {q} | {themes.get(q[0], '')} | {a} |" for q, a in probe]
    out += ["", "## Nhận xét của người điều phối", ""]
    return "\n".join(out)


def find_notes(task_dir, include_pilot=False):
    task_dir = Path(task_dir)
    files = sorted(task_dir.glob("sessions/*/notes.md"), key=lambda p: (len(p.parent.name), p.parent.name))
    if include_pilot and (task_dir / "pilot/notes.md").exists():
        files = [task_dir / "pilot/notes.md"] + files
    return files
