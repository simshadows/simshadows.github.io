#!/usr/bin/env python3

from sys import stdin

def dfs(i, j):
    it = ((i + di, j + dj) for di, dj in [(1, 0), (-1, 0), (0, 1), (0, -1)])
    return 1 if (m[i][j] == 9) else sum(dfs(_i, _j) for _i, _j in it if (m[_i][_j] == m[i][j] + 1))

m = [[int(c) for c in s.strip()] + [11] for s in stdin.readlines()]
m.append([11]*len(m[0]))
print(sum(sum(dfs(i, j) for j, v in enumerate(s) if (v == 0)) for i, s in enumerate(m)))
