#!/usr/bin/env python3

from sys import stdin
from itertools import pairwise

reports = [[int(x) for x in s.split()] for s in stdin.readlines()]
reports = [r for r in reports if (r == sorted(r) or r == sorted(r, reverse=True))]
print(sum(all(0 < abs(a - b) < 4 for a, b in pairwise(r)) for r in reports))
