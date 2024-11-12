#!/usr/bin/env python3

from sys import stdin, setrecursionlimit
from itertools import chain

def run(f):
    grid = [s.strip() for s in f.readlines()]
    setrecursionlimit(len(grid) * len(grid[0]))

    # grid of sets of unit directional vectors (i, j)
    seen = [[set() for _ in range(len(grid[0]))] for _ in range(len(grid))]

    def travel(i, j, i_dir, j_dir):
        if (i < 0) or (i >= len(grid)) \
                or (j < 0) or (j >= len(grid[0])) \
                or (i_dir, j_dir) in seen[i][j]:
            return
        seen[i][j].add((i_dir, j_dir))
        c = grid[i][j]
        if c == ".":
            travel(i + i_dir, j + j_dir, i_dir, j_dir)
        elif c == "|":
            if j_dir:
                travel(i + 1, j,  1, 0)
                travel(i - 1, j, -1, 0)
            else:
                travel(i + i_dir, j + j_dir, i_dir, j_dir)
        elif c == "-":
            if i_dir:
                travel(i, j + 1, 0,  1)
                travel(i, j - 1, 0, -1)
            else:
                travel(i + i_dir, j + j_dir, i_dir, j_dir)
        elif c == "/":
            travel(i - j_dir, j - i_dir, -j_dir, -i_dir)
        else: # "\"
            travel(i + j_dir, j + i_dir, j_dir, i_dir)
    travel(0, 0, 0, 1)

    print(sum(len(x) > 0 for x in chain(*seen)))

run(stdin)
