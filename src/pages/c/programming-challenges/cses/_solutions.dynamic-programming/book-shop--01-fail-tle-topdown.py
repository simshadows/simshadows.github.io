#!/usr/bin/env python3

from sys import stdin, setrecursionlimit
from functools import cache

setrecursionlimit(int(2e6))

(_, max_sum) = [int(s) for s in stdin.readline().strip().split()]
costs = [int(s) for s in stdin.readline().strip().split()]
pages = [int(s) for s in stdin.readline().strip().split()]

@cache
def dp(i, cur_max_sum):
    if cur_max_sum < 0:
        return -1e6  # arbitrary small number
    elif i == -1:
        return 0
    return max(
        dp(i - 1, cur_max_sum - costs[i]) + pages[i],
        dp(i - 1, cur_max_sum),
    )

print(dp(len(costs) - 1, max_sum))
