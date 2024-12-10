#!/usr/bin/env python3

from sys import stdin
from itertools import accumulate

DIRS = {"^": (-1, 0), "v": (1, 0), ">": (0, 1), "<": (0, -1)}

seen = {(0, 0)}
(santa_i, santa_j) = (0, 0)
(robo_i, robo_j) = (0, 0)
for i, c in enumerate(stdin.readline().strip()):
    (di, dj) = DIRS[c]
    if i % 2:
        (santa_i, santa_j) = (santa_i + di, santa_j + dj)
        seen.add((santa_i, santa_j))
    else:
        (robo_i, robo_j) = (robo_i + di, robo_j + dj)
        seen.add((robo_i, robo_j))
print(len(seen))
