#!/usr/bin/env python3

from sys import stdin, setrecursionlimit
from functools import cache

setrecursionlimit(int(2e6))

MOD = int(1e9 + 7)

stdin.readline()
tests = [int(s) for s in stdin.readlines()]

@cache
def dp(a, b):
    if (a == 0) and (b == 0):
        return 1
    elif (a < 0) or (b < 0):
        raise RuntimeError()

    solution = 0
    if a == b:
        for x in range(a):
            solution += dp(a, x) + dp(x, x)
    elif b < a:
        for x in range(a):
            solution += dp(x, b)
    else:
        return dp(b, a)
    return solution % MOD

for height in tests:
    print(dp(height, height))
