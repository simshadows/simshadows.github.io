#!/usr/bin/env python3

from sys import stdin, setrecursionlimit
from functools import cache
from math import inf, isinf

setrecursionlimit(int(2e6))

(_, target) = [int(s) for s in stdin.readline().strip().split()]
coins = [int(s) for s in stdin.readline().strip().split()]

@cache
def dp(v):
    if v < 0:
        return inf
    elif v == 0:
        return 0
    return 1 + min(dp(v - coin) for coin in coins)

solution = dp(target)
print(-1 if isinf(solution) else solution)
