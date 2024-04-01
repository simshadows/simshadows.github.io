#!/usr/bin/env python3

from sys import stdin
from math import inf, isinf

(_, target) = [int(s) for s in stdin.readline().strip().split()]
coins = sorted(int(s) for s in stdin.readline().strip().split())

tab = [inf]*(target + 1)
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

# And use the DP subproblem to fill in the gaps
if isinf(tab[-1]):
    for i in range(1, target + 1):
        if isinf(tab[i]):
            tab[i] = 1 + min((tab[i - coin] for coin in coins if (coin <= i)), default=inf)

print(-1 if isinf(tab[-1]) else tab[-1])
