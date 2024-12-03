#!/usr/bin/env python3

from sys import stdin
from itertools import pairwise

solution = 0
for s in stdin.readlines():
    report = [int(x) for x in s.split()]
    for i in range(len(report) + 1):
        r = report[:i] + report[i+1:]
        if (r == sorted(r) or r == sorted(r, reverse=True)) \
                and all(0 < abs(a - b) < 4 for a, b in pairwise(r)):
            solution += 1
            break
print(solution)
