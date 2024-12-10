#!/usr/bin/env python3

from sys import stdin

def dfs(i, j, v):
    if v == 9:
        return 1
    it = ((i + di, j + dj) for di, dj in [(1, 0), (-1, 0), (0, 1), (0, -1)])
    return sum(dfs(_i, _j, v + 1) for _i, _j in it if (tmap[_i][_j] == v + 1))

tmap = [[int(c) for c in s.strip()] + [11] for s in stdin.readlines()]
tmap.append([11]*len(tmap[0]))
print(sum(sum(dfs(i, j, 0) for j, v in enumerate(s) if (v == 0)) for i, s in enumerate(tmap)))
