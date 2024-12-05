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

key_fn = cmp_to_key(lambda a, b: 1 if (a in rules[b]) else -1)
print(sum(
    sorted(update, key=key_fn)[len(update) >> 1] for update in updates
    if any((a in rules[b]) for a, b in combinations(update, 2))
))
