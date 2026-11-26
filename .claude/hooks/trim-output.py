#!/usr/bin/env python3
"""PostToolUse(Bash): trim noisy install/build/test output to the last 30 lines
plus any earlier error lines, before it enters the model's context."""
import json, re, sys

NOISY = re.compile(r'\b(npm|pnpm|yarn|bun|pip3?|uv|poetry|cargo|go|mvn|gradle|make|apt(-get)?|brew)\b'
                   r'.*\b(install|ci|add|build|test|run|compile|update|upgrade|sync)\b'
                   r'|\b(pytest|jest|vitest|mocha|tsc|webpack|vite|next|playwright)\b', re.I)
ERR = re.compile(r'\bERR!?|error|fail|fatal|exception|traceback|panic|denied|not found|warn', re.I)
TAIL, MAX_ERR, MIN_LINES = 30, 40, 60

def trim(text):
    lines = text.splitlines()
    if len(lines) <= MIN_LINES:
        return text
    head, tail = lines[:-TAIL], lines[-TAIL:]
    errs = [l for l in head if ERR.search(l)][-MAX_ERR:]
    out = [f"[trimmed {len(head)} lines; {len(errs)} earlier error/warn lines kept]"]
    return "\n".join(out + errs + (["[... last %d lines ...]" % TAIL] if errs else []) + tail)

def main():
    d = json.load(sys.stdin)
    cmd = (d.get("tool_input") or {}).get("command", "")
    resp = d.get("tool_response")
    if not NOISY.search(cmd) or not isinstance(resp, dict):
        return
    new = dict(resp)
    changed = False
    for k in ("stdout", "stderr"):
        if isinstance(resp.get(k), str):
            t = trim(resp[k]); changed |= t != resp[k]; new[k] = t
    if changed:
        print(json.dumps({"hookSpecificOutput": {"hookEventName": "PostToolUse",
                                                 "updatedToolOutput": new}}))

if __name__ == "__main__":
    try: main()
    except Exception: pass  # never break a tool call
