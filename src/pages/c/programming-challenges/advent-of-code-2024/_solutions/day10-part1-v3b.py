#!/usr/bin/env python3

from sys import stdin
from itertools import chain

def dfs(i, j):
    if tmap[i][j] == 9:
        return {(i, j)}
    it = ((i + di, j + dj) for di, dj in [(1, 0), (-1, 0), (0, 1), (0, -1)])
    return set(chain(*(dfs(ii, jj) for ii, jj in it if (tmap[ii][jj] == tmap[i][j] + 1))))

tmap = [[int(c) for c in s.strip()] + [11] for s in stdin.readlines()]
tmap.append([11]*len(tmap[0]))
print(sum(sum(len(dfs(i, j)) for j, v in enumerate(s) if (v == 0)) for i, s in enumerate(tmap)))
