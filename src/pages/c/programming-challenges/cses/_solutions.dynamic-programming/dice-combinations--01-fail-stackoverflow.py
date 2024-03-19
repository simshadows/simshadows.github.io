#!/usr/bin/env python3

from functools import cache

MOD = int(1e9 + 7)

n = int(input())

@cache
def dp(v):
    if v < 0:
        return 0
    elif v < 2:
        return 1
    return sum(dp(v - i) for i in range(1, 7)) % MOD

print(dp(n))
