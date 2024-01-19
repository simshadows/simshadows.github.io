#!/usr/bin/env python3

from sys import stdin
from collections import Counter

stdin.readline()
customers = [[int(t) for t in s.strip().split()] for s in stdin.readlines()]

difs = Counter(t for t, _ in customers)
difs.subtract(t for _, t in customers)
difs = sorted(difs.items())

(cur, solution) = (0, 0)
for _, v in difs:
    cur += v
    solution = max(cur, solution)
print(solution)
