#!/usr/bin/env python3

from sys import stdin

tmap = [[int(c) for c in s.strip()] + [11] for s in stdin.readlines()]
tmap.append([11]*len(tmap[0]))

def dfs(i, j, expected):
    if tmap[i][j] != expected:
        return 0
    if expected == 9:
        return 1
    it = ((i + di, j + dj) for di, dj in [(1, 0), (-1, 0), (0, 1), (0, -1)])
    return sum(dfs(_i, _j, expected + 1) for _i, _j in it)

print(tmap)
print()
print(dfs(0, 2, 0))
print()
print(sum(sum(dfs(i, j, 0) for j, c in enumerate(s)) for i, s in enumerate(tmap)))

