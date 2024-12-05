#!/usr/bin/env python3

from sys import stdin
from itertools import combinations
from functools import cmp_to_key
from collections import defaultdict

_rules, updates = "".join(stdin.readlines()).strip().split("\n\n")
rules = defaultdict(set)
for a, b in (s.split("|") for s in _rules.split()):
    rules[int(a)].add(int(b))
updates = [[int(x) for x in s.split(",")] for s in updates.split()]

def cmp(a, b):
    if b in rules[a]:
        return -1
    elif a in rules[b]:
        return 1
    else:
        return 0

solution = 0
for update in updates:
    if any((a in rules[b]) for a, b in combinations(update, 2)):
        update.sort(key=cmp_to_key(cmp))
        solution += update[len(update) >> 1]
print(solution)
