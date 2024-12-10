#!/usr/bin/env python3

from sys import stdin
from itertools import accumulate

DIRS = {"^": (-1, 0), "v": (1, 0), ">": (0, 1), "<": (0, -1)}

seen = {(0, 0)}
santa = [0, 0]
robo = [0, 0]
for i, c in enumerate(stdin.readline().strip()):
    agent = santa if (i % 2) else robo
    agent[0] += DIRS[c][0]
    agent[1] += DIRS[c][1]
    seen.add(tuple(agent))
print(len(seen))
