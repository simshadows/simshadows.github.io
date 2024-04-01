#!/usr/bin/env python3

from sys import stdin, setrecursionlimit
from functools import cache

setrecursionlimit(int(2e6))

MOD = int(1e9 + 7)

(_, target_sum) = [int(s) for s in stdin.readline().strip().split()]
coins = [int(s) for s in stdin.readline().strip().split()]

@cache
def dp(i, x):
    if i == -1:
        return 1 if (x == 0) else 0
    elif x < 0:
        return 0
    j_max = x // coins[i]
    return sum(dp(i - 1, x - (j * coins[i])) for j in range(j_max + 1)) % MOD

print(dp(len(coins) - 1, target_sum))
