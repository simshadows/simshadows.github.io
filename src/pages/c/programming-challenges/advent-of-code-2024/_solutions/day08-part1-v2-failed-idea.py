#!/usr/bin/env python3

from sys import stdin
from collections import defaultdict
from itertools import chain, combinations

grid = "".join(s.strip() for s in stdin.readlines())
antennae = defaultdict(list)
for i, v in enumerate(grid):
    if v != ".":
        antennae[v].append(i)

antinodes = set()
for i, j in chain(*(combinations(v, 2) for k, v in antennae.items())):
    antinodes.add(j + j - i)
    antinodes.add((i - (j - i)))
print(sum(0 <= i < len(grid) for i in antinodes))
