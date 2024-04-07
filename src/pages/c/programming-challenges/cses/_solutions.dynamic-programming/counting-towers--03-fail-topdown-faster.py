#!/usr/bin/env python3

from sys import stdin, setrecursionlimit
from functools import cache

setrecursionlimit(int(2e6))

MOD = int(1e9 + 7)

stdin.readline()
tests = [int(s) for s in stdin.readlines()]

@cache
def solution_dp(n):
    assert n >= 0
    if n <= 1:
        return 2 if n else 1
    return (helper_dp(n) + solution_cumulative(n - 1)) % MOD

@cache
def solution_cumulative(n):
    assert n >= 0
    return (solution_cumulative(n - 1) + solution_dp(n) if n else solution_dp(0)) % MOD

@cache
def helper_dp(n):
    assert n > 0
    if n == 1:
        return 1
    return (solution_cumulative(n - 1) + (2 * helper_cumulative(n - 1))) % MOD

@cache
def helper_cumulative(n):
    assert n > 0
    return (helper_dp(1) if (n == 1) else (helper_dp(n - 1) + helper_dp(n))) % MOD

for height in tests:
    print(solution_dp(height))
