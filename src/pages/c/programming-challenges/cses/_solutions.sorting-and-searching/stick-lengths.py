#!/usr/bin/env python3

from itertools import accumulate, pairwise

input()
sticks = sorted(int(s) for s in input().strip().split())

def op_left(acc, cur):
    (i, (prev_v, v)) = cur
    return acc + ((v - prev_v) * i)
def op_right(acc, cur):
    (i, (prev_v, v)) = cur
    return acc + ((prev_v - v) * i)

costsl = accumulate(
    enumerate(pairwise(sticks), start=1),
    op_left,
    initial=0,
)
costsr = reversed(list(accumulate(
    enumerate(pairwise(reversed(sticks)), start=1),
    op_right,
    initial=0,
)))

print(min(a + b for a, b in zip(costsl, costsr)))
