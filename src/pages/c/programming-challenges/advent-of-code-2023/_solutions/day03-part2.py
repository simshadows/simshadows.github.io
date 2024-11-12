#!/usr/bin/env python3

from sys import stdin
from itertools import product
from collections import defaultdict

def run(f):
    grid = [x.strip() + "." for x in f]
    (len1, len2) = (len(grid), len(grid[0]))
    grid.append("." * len2)
    gear_adjs = defaultdict(list) # "gear adjacencies", {(i, j): [part nums]}
    for i, row in enumerate(grid):
        (num, gears) = (0, set())
        for j, v in enumerate(row):
            if v.isdigit():
                num = (num * 10) + int(v)
                for i2, j2 in product((i - 1, i, i + 1), (j - 1, j, j + 1)):
                    (i2, j2) = (i2 % len1, j2 % len2)
                    if grid[i2][j2] == "*":
                        gears.add((i2, j2))
            else:
                for i2, j2 in gears:
                    gear_adjs[(i2, j2)].append(num)
                (num, gears) = (0, set())
    print(sum(x[0] * x[1] for x in gear_adjs.values() if len(x) == 2))

run(stdin)
