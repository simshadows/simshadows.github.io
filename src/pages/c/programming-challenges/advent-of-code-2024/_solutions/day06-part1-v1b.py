#!/usr/bin/env python3

from sys import stdin
from itertools import chain

grid = [list(s.strip()) + [" "] for s in stdin.readlines()]
grid.append([" "]*len(grid[0]))
(i, j, di, dj) = (None, None, -1, 0)
for _i, lst in enumerate(grid):
    for _j, v in enumerate(lst):
        if v == "^":
            (i, j) = (_i, _j)
            break

while grid[i][j] != " ":
    grid[i][j] = "X"
    if grid[i + di][j + dj] == "#":
        (di, dj) = (dj, -di)
    (i, j) = (i + di, j + dj)
print(sum((x == "X") for x in chain(*grid)))
