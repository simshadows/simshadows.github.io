#!/usr/bin/env python3

from sys import stdin

pairs = [tuple(map(int, s.split())) for s in stdin.readlines()]

(a, b) = (sorted([x[0] for x in pairs]), sorted([x[1] for x in pairs]))
print(sum(abs(x - y) for (x, y) in zip(a, b)))
