#!/usr/bin/env python3

from sys import stdin

stdin.readline()
test_cases = [[int(x) for x in s.strip().split()] for s in stdin.readlines()]

for a, b in test_cases:
    print("YES" if (((a + b) % 3 == 0) and (max(a, b) <= 2 * min(a, b))) else "NO")

