#!/usr/bin/env bash
# Statusline: model · context used % · session cost (USD)
python3 -c '
import json,sys
d=json.load(sys.stdin)
m=(d.get("model") or {}).get("display_name","?")
cw=d.get("context_window") or {}
pct=cw.get("used_percentage")
pct="?" if pct is None else f"{pct:.0f}%"
cost=(d.get("cost") or {}).get("total_cost_usd") or 0
print(f"🧠 {m} · ctx {pct} · ${cost:.2f}")
'
