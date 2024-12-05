#!/usr/bin/env python3

from sys import stdin
from itertools import combinations
from collections import defaultdict

_rules, updates = "".join(stdin.readlines()).strip().split("\n\n")
rules = defaultdict(set)
for a, b in (s.split("|") for s in _rules.split()):
    rules[a].add(b)

solution = 0
for update in updates.split():
    update = update.split(",")
    if any((a in rules[b]) for a, b in combinations(update, 2)):
        new_update = [update[0]]
        for new_v in update[1:]:
            for i, v in enumerate(new_update + [None]):
                if (v is None) or (v in rules[new_v]):
                    new_update.insert(i, new_v)
                    break
        solution += int(new_update[len(new_update) >> 1])
print(solution)
