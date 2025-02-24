#!/usr/bin/env python3

from sys import stdin
from itertools import product, combinations

rules, updates = "".join(stdin.readlines()).strip().split("\n\n")
rules = [s.split("|") for s in rules.split()]
print(sum(
    int(update[len(update) >> 1])
    for update in [s.split(",") for s in updates.split()]
    if not any((x, y) == (b, a) for (x, y), (a, b) in product(rules, combinations(update, 2)))
))
