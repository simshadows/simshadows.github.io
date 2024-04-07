#!/usr/bin/env python3

from sys import stdin, setrecursionlimit
from functools import cache

setrecursionlimit(int(2e6))

MOD = int(1e9 + 7)

stdin.readline()
tests = [int(s) for s in stdin.readlines()]

@cache
def dp(col, row):  # --> (this count, cumulative count)
    if (col == 0) and (row == 0):
        return 1
    elif (col < 0) or (row < 0):
        return 0
    solution = 0
    for row2 in range(0, row + 1):
        for col2 in range(0, col + 1):
            if (row2 == 0) and (col2 == 0):
                solution += 1
            else:
                solution += dp(col, row2 - 1) + dp(col2 - 1, row) - dp(col2 - 1, row2 - 1)
    return solution % MOD

print("test 1, expecting 2")
print(dp(1, 0))
print("test 2, expecting 8")
print(dp(1, 1))
print("test 3")
print(dp(1, 2))
print()

print(0, 0, dp(0, 0))
print(1, 0, dp(1, 0))
print(0, 1, dp(0, 1))
print(1, 1, dp(1, 1))
print()
print(0, 2, dp(0, 2))
print(1, 1, dp(1, 1))
print(0, 1, dp(0, 1))
print()

for height in tests:
    print(dp(1, height - 1))
