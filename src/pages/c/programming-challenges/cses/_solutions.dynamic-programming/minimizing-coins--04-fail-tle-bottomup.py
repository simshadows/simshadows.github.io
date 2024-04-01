#!/usr/bin/env python3

from sys import stdin, setrecursionlimit
from math import inf, isinf

setrecursionlimit(int(2e6))

(_, target) = [int(s) for s in stdin.readline().strip().split()]
coins = sorted(int(s) for s in stdin.readline().strip().split())

tab = [None]*(target + 1)
tab[0] = 0

# We attempt to quickly precompute a bunch of trivial table entries
if len(coins) > 1:
    base_val = 0
    base_coins = 0
    while base_val <= target:
        tab[base_val] = base_coins
        for coin in coins[:-1]:
            if base_val + coin > target:
                break
            tab[base_val + coin] = base_coins + 1
        base_val += coins[-1]
        base_coins += 1

def dp(v):
    tab[v] = 1 + min((
        (dp(v - coin) if (tab[v - coin] is None) else tab[v - coin])
        for coin in coins if v >= coin
    ), default=inf)
    return tab[v]

dp(target)
print(-1 if isinf(tab[-1]) else tab[-1])
