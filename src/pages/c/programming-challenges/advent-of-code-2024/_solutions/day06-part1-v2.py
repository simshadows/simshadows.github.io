#!/usr/bin/env python3

from sys import stdin
from itertools import chain

grid = [list(s.strip()) + [" "] for s in stdin.readlines()]
grid.append([" "]*len(grid[0]))
(di, dj) = (-1, 0)
(i, j) = [(i, lst.index("^")) for i, lst in enumerate(grid) if ("^" in lst)][0]

while grid[i][j] != " ":
    grid[i][j] = "X"
    if grid[i + di][j + dj] == "#":
        (di, dj) = (dj, -di)
    (i, j) = (i + di, j + dj)
print(sum((x == "X") for x in chain(*grid)))
