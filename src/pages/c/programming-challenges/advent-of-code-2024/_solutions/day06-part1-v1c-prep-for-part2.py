#!/usr/bin/env python3

from sys import stdin
from itertools import chain

DIRS = {"U": "R", "R": "D", "D": "L", "L": "U"}

grid = [list(s.strip()) + [" "] for s in stdin.readlines()]
grid.append([" "]*len(grid[0]))
(i, j, d, di, dj) = (None, None, "U", -1, 0)
for _i, lst in enumerate(grid):
    for _j, v in enumerate(lst):
        if v == "^":
            (i, j) = (_i, _j)
            break

possible_positions = set()
while grid[i + di][j + dj] != " ":
    if grid[i + di][j + dj] == "#":
        (di, dj, d) = (dj, -di, DIRS[d])
    possible_positions.add((i, j))
    (i, j) = (i + di, j + dj)
possible_positions.add((i, j))
print(len(possible_positions))
