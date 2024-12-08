#!/usr/bin/env python3

from sys import stdin
from collections import defaultdict
from itertools import chain, combinations

grid = [s.strip() for s in stdin.readlines()]
antennae = defaultdict(list)
for i, s in enumerate(grid):
    for j, v in enumerate(s):
        if v != ".":
            antennae[v].append((i, j))

antinodes = set()
for (i1, j1), (i2, j2) in chain(*(combinations(v, 2) for k, v in antennae.items())):
    antinodes.add((i2 + i2 - i1, j2 + j2 - j1))
    antinodes.add((i1 - (i2 - i1), j1 - (j2 - j1)))
print(sum((0 <= i < len(grid) and 0 <= j < len(grid[0])) for i, j in antinodes))
