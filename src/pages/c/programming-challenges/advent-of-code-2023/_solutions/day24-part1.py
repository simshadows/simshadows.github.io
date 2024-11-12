#!/usr/bin/env python3

from sys import stdin
from itertools import combinations

#LOWER = 7
#UPPER = 27
LOWER = 200000000000000
UPPER = 400000000000000

def paths_intersect_within_bounds(p0, v0, p1, v1):
    denom = (v0[0] * v1[1]) - (v0[1] * v1[0])
    if denom == 0:
        # case 1: parallel lines
        t0_x = (p1[0] - p0[0]) / v0[0]
        t0_y = (p1[1] - p0[1]) / v0[1]
        t1_x = (p0[0] - p1[0]) / v1[0]
        #t1_y = (p0[1] - p1[1]) / v1[1] # don't need this one
        return (t0_x == t0_y) and ((t0_x >= 0) or (t1_x >= 0))
    else:
        # case 2: non-parallel lines
        num = (v0[1] * (p1[0] - p0[0])) - (v0[0] * (p1[1] - p0[1]))
        t1 = num / denom
        i = 0 if v0[0] else 1
        t0 = (p1[i] - p0[i] + (v1[i] * t1)) / v0[i]
        if (t0 < 0) or (t1 < 0):
            return False # Intersection is in the past
        x1 = (p1[0] + (v1[0] * t1), p1[1] + (v1[1] * t1))
        return (LOWER <= x1[0] <= UPPER) and (LOWER <= x1[1] <= UPPER)

def run(f):
    stones = [
        [[int(y.strip()) for y in x.strip().split(",")] for x in s.strip().split("@")]
        for s in f.readlines()
    ]
    if any(all(x == 0 for x in v) for _, v in stones):
        raise RuntimeError(f"We expect no zero velocities.")

    print(sum(paths_intersect_within_bounds(*a, *b) for a, b in combinations(stones, 2)))
    print("Note: You may need to change constants depending on test case.")

run(stdin)
