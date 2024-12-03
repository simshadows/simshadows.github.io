#!/usr/bin/env python3

from sys import stdin
from itertools import pairwise

def is_safe(r):
    return (r == sorted(r) or r == sorted(r, reverse=True)) \
        and all(0 < abs(a - b) < 4 for a, b in pairwise(r))

reports = [[int(x) for x in s.split()] for s in stdin.readlines()]
print(sum(any(is_safe(r[:i] + r[i+1:]) for i in range(len(r) + 1)) for r in reports))
