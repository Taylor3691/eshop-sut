# Re-running the simulated Playwright flow

Run from the repository root. Requires the backend and storefront on ports 3000 and 5173. **Backend startup reinitializes `backend/database.sqlite`;** confirm you have a restorable copy before starting it.

```powershell
$runner = Join-Path $env:TEMP 'eshop-playwright'
npm install --prefix $runner --no-save playwright@1.65.1
& (Join-Path $runner 'node_modules/.bin/playwright.cmd') install chromium
$env:PLAYWRIGHT_MODULE = Join-Path $runner 'node_modules/playwright'
node task-2-usability-evaluation/evidence/simulated-runs/run-flow.cjs
```

The runner creates one isolated browser context and synthetic account per label, then writes screenshots, videos, and `run-results.json`. Running it again appends new orders to the active backend database and replaces the same named evidence files. This automation is not a human usability study.

`generate_synthetic_research_data.py` writes fictional persona narratives, interviews, and SUS vectors. It does not control a browser or create evidence. All resulting responses are marked **SIMULATED DATA** and must not be presented as participant research.
