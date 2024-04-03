#!/usr/bin/env python3

from sys import stdin

MOD = int(1e9 + 7)

(_, max_v) = [int(s) for s in stdin.readline().strip().split()]
desc = [int(s) for s in stdin.readline().strip().split()]

tab = [[0]*(max_v + 2) for _ in range(len(desc))]

if desc[0] == 0:
    tab[0] = [0, *(1 for _ in range(max_v)), 0]
else:
    tab[0][desc[0]] = 1

for i, known_v in enumerate(desc[1:], start=1):
    it = range(1, max_v + 1) if (known_v == 0) else (known_v,)
    for v in it:
        tab[i][v] = (tab[i - 1][v] + tab[i - 1][v - 1] + tab[i - 1][v + 1]) % MOD

print(sum(tab[-1]) % MOD)
