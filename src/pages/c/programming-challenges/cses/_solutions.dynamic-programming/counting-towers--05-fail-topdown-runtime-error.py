#!/usr/bin/env python3

from sys import stdin, setrecursionlimit
from functools import cache

setrecursionlimit(int(2e6))

MOD = int(1e9 + 7)

stdin.readline()
tests = [int(s) for s in stdin.readlines()]

@cache
def f_val(n):
    assert n >= 0
    if n <= 1:
        return 2 if n else 1
    return (s_val(n) + f_cum(n - 1)) % MOD

@cache
def f_cum(n):
    assert n >= 0
    return ((f_cum(n - 1) + f_val(n)) if n else f_val(0)) % MOD

@cache
def s_val(n):
    assert n > 0
    if n == 1:
        return 1
    return (f_cum(n - 1) + (2 * s_cum(n - 1))) % MOD

@cache
def s_cum(n):
    assert n > 0
    return (s_val(1) if (n == 1) else (s_cum(n - 1) + s_val(n))) % MOD

for height in tests:
    print(f_val(height))
