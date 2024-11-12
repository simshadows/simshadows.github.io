#!/usr/bin/env python3

from sys import stdin, setrecursionlimit
from itertools import product

setrecursionlimit(10000)

NUM_STEPS = 64

def run(f):
    garden_map = ["#" + s.strip() + "#" for s in f.readlines()]
    garden_map.insert(0, "#"*len(garden_map[0]))
    garden_map.append("#"*len(garden_map[0]))
    (len1, len2) = (len(garden_map), len(garden_map[0]))

    start = None
    for i, j in product(range(len1), range(len2)):
        if garden_map[i][j] == "S":
            start = (i, j)
            break
    if start == None:
        raise RuntimeError()

    seen = set()
    solution = set()
    def bfs(i, j, steps_remaining):
        if ((i, j, steps_remaining) in seen) or (garden_map[i][j] == "#"):
            return
        seen.add((i, j, steps_remaining))
        if steps_remaining == 0:
            solution.add((i, j))
            return
        for ii, jj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            bfs(i + ii, j + jj, steps_remaining - 1)
    bfs(*start, NUM_STEPS)
    print(len(solution))

run(stdin)
