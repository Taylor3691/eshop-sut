#!/bin/bash
for p in 3000 5173 5174; do lsof -ti tcp:$p | xargs kill 2>/dev/null; done; echo "Đã dừng SUT."
