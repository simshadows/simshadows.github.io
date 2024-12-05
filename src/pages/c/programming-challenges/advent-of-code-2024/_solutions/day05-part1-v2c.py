#!/usr/bin/env python3

from sys import stdin
from itertools import product, combinations

rules, updates = "".join(stdin.readlines()).strip().split("\n\n")
rules = [s.split("|") for s in rules.split()]
updates = [s.split(",") for s in updates.split()]
print(sum(
    int(update[len(update) >> 1]) for update in updates
    if not any((x, y) == (b, a) for (x, y), (a, b) in product(rules, combinations(update, 2)))
))
