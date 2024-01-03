#!/usr/bin/env python3

from sys import stdin

stdin.readline()
tests = [s.strip().split() for s in stdin.readlines()]

for y, x in tests:
    (y, x) = (int(y) - 1, int(x) - 1)
    layer = max(y, x)
    count_prev_layers = layer * layer
    if not (layer % 2):
        (y, x) = (x, y)

    if y < x:
        print(count_prev_layers + 1 + y)
    else:
        print(count_prev_layers + (layer * 2) + 1 - x)
