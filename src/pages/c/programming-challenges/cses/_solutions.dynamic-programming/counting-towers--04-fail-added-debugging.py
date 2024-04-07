#!/usr/bin/env python3

from sys import stdin, setrecursionlimit
from functools import cache

setrecursionlimit(int(2e6))

MOD = int(1e9 + 7)

stdin.readline()
tests = [int(s) for s in stdin.readlines()]

@cache
def dp(n):
    assert n >= 0
    if n <= 1:
        return 2 if n else 1
    return (helper_dp(n) + cumulative(n - 1)) % MOD

@cache
def cumulative(n):
    assert n >= 0
    return ((cumulative(n - 1) + dp(n)) if n else dp(0)) % MOD

@cache
def helper_dp(n):
    assert n > 0
    if n == 1:
        return 1
    return (cumulative(n - 1) + (2 * helper_cumulative(n - 1))) % MOD

@cache
def helper_cumulative(n):
    assert n > 0
    # OH MY GOD I MADE A TYPO HERE
    #return (helper_dp(1) if (n == 1) else (helper_dp(n - 1) + helper_dp(n))) % MOD
    return (helper_dp(1) if (n == 1) else (helper_cumulative(n - 1) + helper_dp(n))) % MOD

for height in tests:
    print(dp(height))

#################################
# Everything below is debugging #
#################################

@cache
def original_dp(a, b):
    if (a == 0) and (b == 0):
        return 1
    elif (a < 0) or (b < 0):
        raise RuntimeError()

    solution = 0
    if a == b:
        for x in range(a):
            solution += original_dp(a, x) + original_dp(x, x)
    elif b < a:
        for x in range(a):
            solution += original_dp(x, b)
    else:
        return original_dp(b, a)
    return solution % MOD

print()
print("should be:")
print(8)
print(2864)
print(640403945)

print()
for t in range(7):
    cap_s = sum(original_dp(t, x) for x in range(t))

    print(t, "|", original_dp(t, t), cap_s, "|", dp(t), cumulative(t), "|", helper_dp(t) if t else "", helper_cumulative(t) if t else "")
