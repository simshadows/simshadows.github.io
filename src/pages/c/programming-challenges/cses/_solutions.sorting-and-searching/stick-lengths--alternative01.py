#!/usr/bin/env python3

from itertools import accumulate, pairwise
from math import inf, isinf

input()
sticks = sorted(int(s) for s in input().strip().split())

def op_right(acc, cur):
    (i, (prev_v, v)) = cur
    return acc + ((prev_v - v) * i)
costsr = list(accumulate(
    enumerate(pairwise(reversed(sticks)), start=1),
    op_right,
    initial=0,
))

costl = 0
solution = inf
for i, (prev_v, v) in enumerate(pairwise(sticks), start=1):
    costl += (v - prev_v) * i
    solution = min(solution, costl + costsr[-1 - i])
print(0 if isinf(solution) else solution)
