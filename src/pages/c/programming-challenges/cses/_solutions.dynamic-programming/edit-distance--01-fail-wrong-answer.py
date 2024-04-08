#!/usr/bin/env python3

from functools import cache

(s1, s2) = (input(), input())

@cache
def dp(i, j):
    if (i < 0) or (j < 0):
        return max(0, i + j + 1)
    elif s1[i] == s2[j]:
        return dp(i - 1, j - 1)
    return 1 + min(dp(i - 1, j), dp(i, j - 1))

print(dp(len(s1) - 1, len(s2) - 1))
