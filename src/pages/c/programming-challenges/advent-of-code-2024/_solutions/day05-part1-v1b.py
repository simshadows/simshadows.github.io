#!/usr/bin/env python3

from sys import stdin
from itertools import product, combinations
from collections import defaultdict

_rules, updates = "".join(stdin.readlines()).strip().split("\n\n")
rules = defaultdict(set)
for a, b in (s.split("|") for s in _rules.split()):
    rules[a].add(b)

solution = 0
for update in updates.split():
    update = update.split(",")
    if not any((a in rules[b]) for a, b in combinations(update, 2)):
        solution += int(update[len(update) >> 1])
print(solution)
