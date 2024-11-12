#!/usr/bin/env python3

from sys import stdin
from itertools import product, combinations

EXPANSION = 1000000 - 1

def run(f):
    galaxymap = [s.strip() for s in f.readlines()]
    galaxies = []
    for i, j in product(range(len(galaxymap)), range(len(galaxymap[0]))):
        if galaxymap[i][j] == "#":
            galaxies.append((i, j))

    empty_rows = [
        i for i in range(len(galaxymap))
        if all(c == "." for c in galaxymap[i])
    ]
    empty_cols = [
        j for j in range(len(galaxymap[0]))
        if all(galaxymap[i][j] == "." for i in range(len(galaxymap)))
    ]

    # Apply expansion
    galaxies = [
        (
            i + (EXPANSION * sum(i > ii for ii in empty_rows)),
            j + (EXPANSION * sum(j > jj for jj in empty_cols)),
        )
        for i, j in galaxies
    ]

    print(sum(
        abs(i2 - i1) + abs(j2 - j1)
        for (i1, j1), (i2, j2) in combinations(galaxies, 2)
    ))

run(stdin)
