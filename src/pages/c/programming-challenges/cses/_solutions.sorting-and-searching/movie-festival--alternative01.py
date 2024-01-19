#!/usr/bin/env python3

from sys import stdin

stdin.readline()
intervals = sorted([int(x) for x in s.strip().split()] for s in stdin.readlines())

(prev_b, solution) = (0, 0)
for (a, b) in intervals:
    if a >= prev_b:
        prev_b = b
        solution += 1
    elif b < prev_b:
        prev_b = b
print(solution)
