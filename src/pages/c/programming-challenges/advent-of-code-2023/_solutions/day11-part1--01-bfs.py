#!/usr/bin/env python3

from sys import stdin
from heapq import heappush, heappop
from itertools import product

def expand_space(galaxymap):
    (rows, cols) = (len(galaxymap), len(galaxymap[0]))
    for row in reversed(range(rows)):
        if all(c == "." for c in galaxymap[row]):
            galaxymap.insert(row, ["."]*len(galaxymap[0]))
    rows = len(galaxymap)
    for col in reversed(range(cols)):
        if all(galaxymap[row][col] == "." for row in range(rows)):
            for lst in galaxymap:
                lst.insert(col, ".")

def sum_paths(galaxymap, pairs_seen, init):
    pq = [(0, *init)]
    seen = set()
    solution = 0
    while len(pq):
        (dist, i, j) = heappop(pq)
        if ((i, j) in seen) or (i < 0) or (j < 0) \
                or (i >= len(galaxymap)) or (j >= len(galaxymap[0])):
            continue
        seen.add((i, j))
        if (galaxymap[i][j] == "#") and ((init, (i, j)) not in pairs_seen):
            solution += dist
            pairs_seen.add((init, (i, j)))
            pairs_seen.add(((i, j), init))
        for ii, jj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            heappush(pq, (dist + 1, i + ii, j + jj))
    return solution

def run(f):
    galaxymap = [list(s.strip()) for s in f.readlines()]
    expand_space(galaxymap)

    solution = 0
    pairs_seen = set()
    for i, j in product(range(len(galaxymap)), range(len(galaxymap[0]))):
        if galaxymap[i][j] == "#":
            galaxymap[i][j] = "."
            solution += sum_paths(galaxymap, pairs_seen, (i, j))
            galaxymap[i][j] = "#"
    print(solution)

run(stdin)
