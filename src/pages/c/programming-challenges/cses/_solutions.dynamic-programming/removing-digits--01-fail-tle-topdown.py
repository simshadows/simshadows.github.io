#!/usr/bin/env python3

from sys import setrecursionlimit
from functools import cache

setrecursionlimit(int(2e6))

n = int(input())

@cache
def dp(v):
    if v == 0:
        return 0
    solution = n  # arbitrary large number
    v2 = v
    while v2 > 0:
        digit = v2 % 10
        if digit:
            solution = min(solution, dp(v - digit))
        v2 //= 10
    return 1 + solution

print(dp(n))
