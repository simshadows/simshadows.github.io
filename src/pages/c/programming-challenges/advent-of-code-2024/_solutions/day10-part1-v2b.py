#!/usr/bin/env python3

from sys import stdin
from itertools import chain

tmap = [[int(c) for c in s.strip()] + [11] for s in stdin.readlines()]
tmap.append([11]*len(tmap[0]))

def dfs(i, j, expected):
    if tmap[i][j] != expected:
        return set()
    if expected == 9:
        return {(i, j)}
    it = ((i + di, j + dj) for di, dj in [(1, 0), (-1, 0), (0, 1), (0, -1)])
    return set(chain(*(dfs(ii, jj, expected + 1) for ii, jj in it)))

print(sum(sum(len(dfs(i, j, 0)) for j, c in enumerate(s)) for i, s in enumerate(tmap)))
