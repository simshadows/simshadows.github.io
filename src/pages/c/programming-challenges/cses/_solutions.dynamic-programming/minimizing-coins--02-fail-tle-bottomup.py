#!/usr/bin/env python3

from sys import stdin
from math import inf, isinf

(_, target) = [int(s) for s in stdin.readline().strip().split()]
coins = [int(s) for s in stdin.readline().strip().split()]

tab = [0]*(target + 1)
for i in range(1, target + 1):
    tab[i] = 1 + min((tab[i - coin] for coin in coins if (coin <= i)), default=inf)

print(-1 if isinf(tab[target]) else tab[target])
