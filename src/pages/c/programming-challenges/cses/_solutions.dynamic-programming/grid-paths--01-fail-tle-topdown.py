#!/usr/bin/env python3

from sys import stdin, setrecursionlimit
from functools import cache

setrecursionlimit(int(2e6))

MOD = int(1e9 + 7)

n = int(stdin.readline())
grid = [s.strip() for s in stdin.readlines()]

@cache
def dp(i, j):
    if (i < 0) or (j < 0) or grid[i][j] == '*':
        return 0
    elif (i == 0) and (j == 0):
        return 1
    return (dp(i - 1, j) + dp(i, j - 1)) % MOD

print(dp(n - 1, n - 1))
