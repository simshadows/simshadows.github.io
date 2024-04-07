#!/usr/bin/env python3

from sys import stdin, setrecursionlimit
from functools import cache

setrecursionlimit(int(2e6))

MOD = int(1e9 + 7)

stdin.readline()
tests = [int(s) for s in stdin.readlines()]

@cache
def dp(n):  # --> (dp, cum, helper_dp, helper_cum)
    #assert n >= 0
    if n <= 1:
        return (2, 3, 1, 1) if n else (1, 1, None, None)
    prev = dp(n - 1)
    cur_helper = (prev[1] + (2 * prev[3])) % MOD
    cur_dp = (cur_helper + prev[1]) % MOD
    return (
        cur_dp,
        (prev[1] + cur_dp) % MOD,
        cur_helper,
        (prev[3] + cur_helper) % MOD,
    )

for height in tests:
    print(dp(height)[0])
