#!/usr/bin/env python3

from sys import stdin

stdin.readline()
tests = [s.strip().split() for s in stdin.readlines()]

for y, x in tests:
    (y, x) = (int(y) - 1, int(x) - 1)
    layer = max(y, x)
    if not (layer % 2):
        (y, x) = (x, y)

    print((layer * layer) + 1 + (y if (y < x) else ((layer * 2) - x)))
