#!/usr/bin/env python3

from sys import stdin
from itertools import product

def run(f):
    solution = 0
    grid = [list(x.strip()) + ["."] for x in f]
    (len1, len2) = (len(grid), len(grid[0]))
    grid.append(["."] * len2)
    for i, row in enumerate(grid):
        (num, is_part_num) = (0, False)
        for j, v in enumerate(row):
            if v.isdigit():
                num = (num * 10) + int(v)
                for i2, j2 in product((i - 1, i, i + 1), (j - 1, j, j + 1)):
                    (i2, j2) = (i2 % len1, j2 % len2)
                    if (not grid[i2][j2].isdigit()) and (grid[i2][j2] != "."):
                        is_part_num = True
            else:
                if is_part_num:
                    solution += num
                (num, is_part_num) = (0, False)
    print(solution)

run(stdin)
