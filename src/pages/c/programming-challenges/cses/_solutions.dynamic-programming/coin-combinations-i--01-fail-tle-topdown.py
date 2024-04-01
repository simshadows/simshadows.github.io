#!/usr/bin/env python3

from sys import stdin, setrecursionlimit
from functools import cache

setrecursionlimit(int(2e6))

MOD = int(1e9 + 7)

(_, target_sum) = [int(s) for s in stdin.readline().strip().split()]
coins = [int(s) for s in stdin.readline().strip().split()]

@cache
def dp(v):
    if v < 0:
        return 0
    elif v == 0:
        return 1
    return sum(dp(v - coin) for coin in coins) % MOD

print(dp(target_sum))
