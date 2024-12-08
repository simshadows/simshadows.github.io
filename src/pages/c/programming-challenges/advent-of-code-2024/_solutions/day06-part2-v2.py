#!/usr/bin/env python3

from sys import stdin
from itertools import chain

DIRS = {"U": "R", "R": "D", "D": "L", "L": "U"}

grid = [list(s.strip()) + [" "] for s in stdin.readlines()]
grid.append([" "]*len(grid[0]))
(si, sj, d, di, dj) = (None, None, "U", -1, 0)  # s = "start", d = "direction"
for _i, lst in enumerate(grid):
    for _j, v in enumerate(lst):
        if v == "^":
            (si, sj) = (_i, _j)
            break

(i, j) = (si, sj)
possible_positions = set()
while grid[i][j] != " ":
    if grid[i + di][j + dj] == "#":
        (di, dj, d) = (dj, -di, DIRS[d])
    possible_positions.add((i, j))
    (i, j) = (i + di, j + dj)
possible_positions.discard((si, sj))

def has_cycle(bi, bj):  # b = "barrier position"
    if grid[bi][bj] == " ":
        raise RuntimeError()
    grid2 = [lst.copy() for lst in grid]
    grid2[bi][bj] = "#"
    (i, j, d, di, dj) = (si, sj, "U", -1, 0)
    while True:
        while grid2[i + di][j + dj] == "#":
            (di, dj, d) = (dj, -di, DIRS[d])
        if grid2[i + di][j + dj] == " ":
            break
        if grid2[i][j] == d:
            return True
        grid2[i][j] = d
        (i, j) = (i + di, j + dj)
    return False
print(sum(has_cycle(bi, bj) for bi, bj in possible_positions))
