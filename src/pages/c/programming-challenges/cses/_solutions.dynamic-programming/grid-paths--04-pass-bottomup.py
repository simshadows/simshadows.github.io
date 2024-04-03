#!/usr/bin/env python3

from sys import stdin

MOD = int(1e9 + 7)

n = int(stdin.readline())
grid = ["*"*(n + 1), *("*" + s.strip() for s in stdin.readlines())]

tab = [[0]*(n + 1) for _ in range(n + 1)]
tab[0][1] = 1  # intentionally initialized the cell adjacent to the starting cell

for i in range(1, n + 1):
    for j in range(1, n + 1):
        if grid[i][j] == '.':
            tab[i][j] = (tab[i - 1][j] + tab[i][j - 1]) % MOD

print(tab[-1][-1])
