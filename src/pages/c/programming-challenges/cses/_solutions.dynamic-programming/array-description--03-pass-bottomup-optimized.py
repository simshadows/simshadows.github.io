#!/usr/bin/env python3

from sys import stdin

MOD = int(1e9 + 7)

(_, max_v) = [int(s) for s in stdin.readline().strip().split()]
desc = [int(s) for s in stdin.readline().strip().split()]

#tab0 = ASSIGNED LATER
tab1 = [0]*(max_v + 2)

if desc[0] == 0:
    tab0 = [0, *(1 for _ in range(max_v)), 0]
else:
    tab0 = [0]*(max_v + 2)
    tab0[desc[0]] = 1

for i, known_v in enumerate(desc[1:], start=1):
    if known_v == 0:
        for v in range(1, max_v + 1):
            tab1[v] = (tab0[v] + tab0[v - 1] + tab0[v + 1]) % MOD
    else:
        tab1 = [0]*(max_v + 2)
        tab1[known_v] = (tab0[known_v] + tab0[known_v - 1] + tab0[known_v + 1]) % MOD
    (tab0, tab1) = (tab1, tab0)

print(sum(tab0) % MOD)
