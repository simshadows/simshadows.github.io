#!/usr/bin/env python3

from sys import stdin

stdin.readline()
tests = [s.strip().split() for s in stdin.readlines()]

for y, x in tests:
    (y, x) = (int(y) - 1, int(x) - 1)
    layer = max(y, x)
    count_prev_layers = layer * layer

    if layer % 2:
        # odd layer --> downwards
        if y < x:
            # vertical section
            print(count_prev_layers + 1 + y)
        else:
            # horizontal section
            print(count_prev_layers + (layer * 2) + 1 - x)
    else:
        # even layer --> upwards
        if y < x:
            # vertical section
            print(count_prev_layers + (layer * 2) + 1 - y)
        else:
            # horizontal section
            print(count_prev_layers + 1 + x)
