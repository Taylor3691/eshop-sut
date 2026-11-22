#!/usr/bin/env python3
"""Tạo bản rút gọn của một JMeter test plan để chạy thử nhanh, không sửa file gốc.

Hỗ trợ: Thread Group thường, Stepping Thread Group và Ultimate Thread Group (plugin jpgc-casutg),
Uniform Random Timer / Constant Timer. CSV Data Set dùng đường dẫn tương đối sẽ được trỏ về
thư mục của plan gốc để bản rút gọn vẫn đọc được dữ liệu.

Ví dụ:
  python3 shrink_plan.py plan.jmx /tmp/smoke.jmx                       # 3 thread, 30 s
  python3 shrink_plan.py plan.jmx /tmp/pr.jmx --threads 30 --duration 90 --think 0,50
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


def set_prop(xml: str, name: str, value: str) -> tuple[str, int]:
    pattern = re.compile(r'(<(?:stringProp|boolProp|intProp) name="' + re.escape(name) + r'">)([^<]*)(<)')
    return pattern.subn(lambda m: m.group(1) + value + m.group(3), xml)


def shrink(xml: str, threads: int, duration: int, ramp: int, think: tuple[int, int] | None, src_dir: Path) -> tuple[str, list[str]]:
    notes: list[str] = []

    # Thread Group thường (bỏ qua setUp/tearDown vì chúng có num_threads riêng trong khối của chúng)
    def tg(m: re.Match) -> str:
        block = m.group(0)
        block, _ = set_prop(block, "ThreadGroup.num_threads", str(threads))
        block, _ = set_prop(block, "ThreadGroup.ramp_time", str(ramp))
        block, n = set_prop(block, "ThreadGroup.duration", str(duration))
        block, _ = set_prop(block, "ThreadGroup.scheduler", "true")
        block, _ = set_prop(block, "LoopController.continue_forever", "true")
        block, _ = set_prop(block, "LoopController.loops", "-1")
        notes.append(f"ThreadGroup: {threads} thread, ramp {ramp} s, {duration} s")
        return block

    xml = re.sub(r'<ThreadGroup [^>]*>.*?</ThreadGroup>', tg, xml, flags=re.S)

    # Stepping Thread Group: một bậc duy nhất
    def stepping(m: re.Match) -> str:
        block = m.group(0)
        for name, value in [("ThreadGroup.num_threads", threads), ("Start users count", threads),
                            ("Start users count burst", 0), ("Start users period", 1),
                            ("rampUp", ramp), ("flighttime", duration),
                            ("Stop users count", threads), ("Stop users period", 1)]:
            block, _ = set_prop(block, name, str(value))
        notes.append(f"SteppingThreadGroup: 1 bậc {threads} thread, giữ {duration} s")
        return block

    xml = re.sub(r'<kg\.apc\.jmeter\.threads\.SteppingThreadGroup .*?</kg\.apc\.jmeter\.threads\.SteppingThreadGroup>',
                 stepping, xml, flags=re.S)

    # Ultimate Thread Group: một dòng
    def ultimate(m: re.Match) -> str:
        block = m.group(0)
        row = ('<collectionProp name="ultimatethreadgroupdata"><collectionProp name="0">'
               + "".join(f'<stringProp name="{i}">{v}</stringProp>' for i, v in enumerate([threads, 0, ramp, duration, 1]))
               + "</collectionProp></collectionProp>")
        block = re.sub(r'<collectionProp name="ultimatethreadgroupdata">.*?</collectionProp>\s*</collectionProp>',
                       row, block, count=1, flags=re.S)
        notes.append(f"UltimateThreadGroup: 1 dòng {threads} thread, giữ {duration} s")
        return block

    xml = re.sub(r'<kg\.apc\.jmeter\.threads\.UltimateThreadGroup .*?</kg\.apc\.jmeter\.threads\.UltimateThreadGroup>',
                 ultimate, xml, flags=re.S)

    if think is not None:
        lo, hi = think
        xml, n1 = set_prop(xml, "ConstantTimer.delay", str(lo))
        xml, n2 = set_prop(xml, "RandomTimer.range", str(hi - lo))
        notes.append(f"Timer: {n1} delay = {lo} ms, {n2} range = {hi - lo} ms")

    # CSV Data Set: đường dẫn tương đối -> tuyệt đối theo thư mục plan gốc
    def csv_path(m: re.Match) -> str:
        path = m.group(2)
        if path and not path.startswith(("/", "$")):
            path = str((src_dir / path).resolve())
        return m.group(1) + path + m.group(3)

    xml = re.sub(r'(<stringProp name="filename">)([^<]*\.csv)(<)', csv_path, xml)
    return xml, notes


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("src", type=Path)
    ap.add_argument("dst", type=Path)
    ap.add_argument("--threads", type=int, default=3)
    ap.add_argument("--duration", type=int, default=30)
    ap.add_argument("--ramp", type=int, default=3)
    ap.add_argument("--think", default=None, help="min,max ms cho Uniform Random Timer, ví dụ 0,50")
    args = ap.parse_args()
    think = tuple(int(x) for x in args.think.split(",")) if args.think else None
    xml = args.src.read_text(encoding="utf-8")
    out, notes = shrink(xml, args.threads, args.duration, args.ramp, think, args.src.parent.resolve())
    if not notes:
        print("Không tìm thấy Thread Group nào để rút gọn.", file=sys.stderr)
        return 1
    args.dst.parent.mkdir(parents=True, exist_ok=True)
    args.dst.write_text(out, encoding="utf-8")
    for n in notes:
        print(n)
    print(f"Đã ghi {args.dst}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
