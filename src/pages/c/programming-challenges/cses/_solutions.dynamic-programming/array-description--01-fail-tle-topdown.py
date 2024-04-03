#!/usr/bin/env python3

from sys import stdin, setrecursionlimit
from functools import cache

setrecursionlimit(int(2e6))

MOD = int(1e9 + 7)

(_, max_v) = [int(s) for s in stdin.readline().strip().split()]
desc = [int(s) for s in stdin.readline().strip().split()]

@cache
def dp(i, v):
    if (v <= 0) or (v > max_v) or ((desc[i] != 0) and (desc[i] != v)):
        return 0
    return 1 if (i == 0) else ((dp(i - 1, v) + dp(i - 1, v - 1) + dp(i - 1, v + 1)) % MOD)

print(sum(dp(len(desc) - 1, v) for v in range(1, max_v + 1)) % MOD)
