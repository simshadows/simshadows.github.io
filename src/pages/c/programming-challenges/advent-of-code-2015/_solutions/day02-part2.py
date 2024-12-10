#!/usr/bin/env python3

from sys import stdin

dims = [[int(x) for x in s.strip().split("x")] for s in stdin.readlines()]
print(sum((2 * min(a+b, a+c, b+c)) + (a * b * c)for a, b, c in dims))
