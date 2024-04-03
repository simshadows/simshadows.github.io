#!/usr/bin/env python3

from sys import stdin, setrecursionlimit

setrecursionlimit(int(2e6))

MOD = int(1e9 + 7)

n = int(stdin.readline())
grid = [s.strip() for s in stdin.readlines()]

memo = [[None]*n for _ in range(n)]
memo[0][0] = 1

def dp(i, j):
    if (i < 0) or (j < 0) or grid[i][j] == '*':
        return 0
    elif memo[i][j] is None:
        memo[i][j] = (dp(i - 1, j) + dp(i, j - 1)) % MOD
    return memo[i][j]

print(dp(n - 1, n - 1))
