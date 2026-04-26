#!/usr/bin/env python3
"""
FRETCRAFT VALIDATOR v2.0
Run before every build session and after every data change.
Catches: broken refs, dead ends, gate gaps, arch issues, JS syntax errors.
Usage: python3 fretcraft_validator.py [path/to/file.html]
"""
import re, sys

path = sys.argv[1] if len(sys.argv) > 1 else '/mnt/user-data/outputs/guitar-skill-tree.html'
content = open(path).read()
scripts = re.findall(r'<script[^>]*>(.*?)</script>', content, re.DOTALL)
s = scripts[0]
nodes_section = s[s.find('var NODES'):s.find('var ARCHETYPES')]
arch_section  = s[s.find('var ARCHETYPES'):s.find('// ── Node role')]

# ── Parse ──────────────────────────────────────────────────────────
node_map = {}
for m in re.finditer(
    r"id:'([^']+)',\s*x:([^,]+),\s*y:([^,]+),\s*l:(\d),\s*br:'([^']+)'[^}]*?(?:gate:(true))?\s*[^}]*?parents:\[([^\]]*)\]",
    nodes_section):
    nid = m.group(1)
    node_map[nid] = {
        'x':float(m.group(2)),'y':float(m.group(3)),
        'l':int(m.group(4)),'br':m.group(5),
        'gate':m.group(6)=='true',
        'parents':re.findall(r"'([^']+)'",m.group(7))
    }
defined = set(node_map.keys())

arch_data = {}
for m in re.finditer(
    r"id:'([^']+)'[\s\S]*?core:\[([\s\S]*?)\][\s\S]*?useful:\[([\s\S]*?)\]",
    arch_section):
    arch_data[m.group(1)] = {
        'core':  re.findall(r"'([^']+)'",m.group(2)),
        'useful':re.findall(r"'([^']+)'",m.group(3)),
    }

cross_pairs = []
if 'var CROSS_HINTS' in s:
    ch = s[s.find('var CROSS_HINTS'):s.find('];',s.find('var CROSS_HINTS'))+2]
    cross_pairs = re.findall(r"\['([^']+)'\s*,\s*'([^']+)'\]", ch)

errors, warnings = [], []

# ── CHECK 1: Brace / paren balance ────────────────────────────────
bd = s.count('{') - s.count('}')
pd = s.count('(') - s.count(')')
if bd != 0: errors.append(f"BRACE IMBALANCE: {bd:+d}")
if pd != 0: errors.append(f"PAREN IMBALANCE: {pd:+d}")

# ── CHECK 2a: Unescaped apostrophes in JS string literals ─────────
lines = s.split('\n')
for i, line in enumerate(lines, 1):
    for m in re.finditer(r"(\w)'(\w)", line):
        before = line[:m.start()]
        if before.count("'") % 2 == 1:
            errors.append(f"UNESCAPED APOSTROPHE line {i}: ...{line.strip()[:70]}...")

# ── CHECK 2b: Odd quote count per line (broken string concatenation) ─
lines = s.split('\n')
for i, line in enumerate(lines, 1):
    for m in re.finditer(r"(\w)'(\w)", line):
        before = line[:m.start()]
        if before.count("'") % 2 == 1:  # inside a string
            errors.append(f"UNESCAPED APOSTROPHE line {i}: ...{line.strip()[:70]}...")

for i, line in enumerate(lines, 1):
    stripped = line.strip()
    if not stripped or stripped.startswith('//'): continue
    sq = len(re.findall(r"(?<!\\)'", stripped))
    if sq % 2 != 0:
        errors.append(f"ODD QUOTE COUNT line {i} ({sq} quotes): ...{stripped[:65]}...")

# ── CHECK 3: Parent refs ───────────────────────────────────────────
for nid, nd in node_map.items():
    for pid in nd['parents']:
        if pid not in defined:
            errors.append(f"BROKEN PARENT: '{nid}' → missing '{pid}'")

# ── CHECK 4: Archetype refs ────────────────────────────────────────
for arch_id, arch in arch_data.items():
    for nid in arch['core'] + arch['useful']:
        if nid not in defined:
            errors.append(f"BROKEN ARCH REF: [{arch_id}] → missing node '{nid}'")

# ── CHECK 5: CROSS_HINTS refs ──────────────────────────────────────
for a, b in cross_pairs:
    if a not in defined: errors.append(f"BROKEN CROSS_HINT: '{a}' not defined")
    if b not in defined: errors.append(f"BROKEN CROSS_HINT: '{b}' not defined")

# ── CHECK 6: Dead-end non-gate nodes ──────────────────────────────
all_parents = set()
for nd in node_map.values(): all_parents.update(nd['parents'])
intentional_leaves = {'mastery','minor_scales','extended_harm','relative_pitch'}
for nid, nd in node_map.items():
    if not nd['gate'] and nid not in all_parents and nid not in intentional_leaves:
        warnings.append(f"DEAD END: '{nid}' (l{nd['l']}, {nd['br']}) — no children")

# ── CHECK 7: Gates in archetype cores ─────────────────────────────
for arch_id, arch in arch_data.items():
    bad = [n for n in arch['core'] if n in node_map and node_map[n]['gate']]
    if bad:
        errors.append(f"GATE IN CORE [{arch_id}]: {bad}")

# ── CHECK 8: Option 2 soft prereqs ────────────────────────────────
for node_id, required_parent in [('notation','intervals'),('blues_sc','pitch_match')]:
    nd = node_map.get(node_id, {})
    if required_parent not in nd.get('parents', []):
        errors.append(f"MISSING SOFT PREREQ: '{node_id}' needs '{required_parent}' as parent")

# ── CHECK 9: Branch consistency ────────────────────────────────────
expected_branches = {'rhythm','technique','fretboard','harmony','lead',
                     'gate','theory','eartraining'}
actual_branches = set(nd['br'] for nd in node_map.values())
for br in (expected_branches - actual_branches):
    warnings.append(f"EMPTY BRANCH (no nodes): '{br}'")
for br in (actual_branches - expected_branches):
    warnings.append(f"UNEXPECTED BRANCH: '{br}'")

# ── REPORT ─────────────────────────────────────────────────────────
from collections import defaultdict
branch_counts = defaultdict(int)
for nd in node_map.values(): branch_counts[nd['br']] += 1

print("=" * 58)
print("  FRETCRAFT VALIDATOR v2.0")
print("=" * 58)
print(f"  File:        {path.split('/')[-1]}")
print(f"  Size:        {len(content)//1024}KB")
print(f"  Nodes:       {len(node_map)}")
print(f"  Archetypes:  {len(arch_data)}")
print(f"  CrossHints:  {len(cross_pairs)}")
print(f"\n  Node counts by branch:")
for br, ct in sorted(branch_counts.items()):
    print(f"    {br:12s}: {ct}")

if errors:
    print(f"\n  ❌ ERRORS ({len(errors)}) — fix before rendering:")
    for e in errors: print(f"     {e}")
else:
    print(f"\n  ✅ ERRORS: none")

if warnings:
    print(f"\n  ⚠  WARNINGS ({len(warnings)}):")
    for w in warnings: print(f"     {w}")
else:
    print(f"\n  ✅ WARNINGS: none")

print("=" * 58)
sys.exit(1 if errors else 0)
