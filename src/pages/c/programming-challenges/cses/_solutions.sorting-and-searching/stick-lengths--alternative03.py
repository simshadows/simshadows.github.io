#!/usr/bin/env python3

from itertools import accumulate
from math import inf

input()
sticks = sorted(int(s) for s in input().strip().split())

sums = list(accumulate(sticks, initial=0))

solution = inf
for i, stick in enumerate(sticks):
    left_cost = (i * stick) - sums[i]
    right_cost = (sums[-1] - sums[i + 1]) - ((len(sticks) - i - 1) * stick)
    solution = min(solution, left_cost + right_cost)
print(0 if (len(sticks) == 1) else solution)
