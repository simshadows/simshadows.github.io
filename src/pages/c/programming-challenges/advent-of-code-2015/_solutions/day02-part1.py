#!/usr/bin/env python3

from sys import stdin

dims = [[int(x) for x in s.strip().split("x")] for s in stdin.readlines()]
partial_areas = [sorted([a*b, a*c, b*c]) for a, b, c in dims]
print(sum((2 * (x + y + z) + x) for x, y, z in partial_areas))
