#!/usr/bin/env python3

from sys import stdin#, setrecursionlimit
from itertools import chain, product

TILE_CONVERTER = {
    (-1,  0): {"S", "|", "L", "J"},
    ( 1,  0): {"S", "|", "7", "F"},
    ( 0, -1): {"S", "-", "J", "7"},
    ( 0,  1): {"S", "-", "L", "F"},
    ( 0,  0): {"S", "|", "-", "L", "J", "F", "7"},
}

def run(f):
    pipemap = [s.strip() for s in f.readlines()]

    start = None
    for i, j in enumerate(s.find("S") for s in pipemap):
        if j >= 0:
            start = (i, j)
            break

    expanded_map = [["."]*(3*len(pipemap[0])) for _ in range(3 * len(pipemap))]
    for i, row in enumerate(pipemap):
        for j, c in enumerate(row):
            if c != ".":
                (i2, j2) = ((i*3) + 1, (j*3) + 1)
                for (i3, j3), symbols in TILE_CONVERTER.items():
                    if c in symbols:
                        expanded_map[i2 + i3][j2 + j3] = "X"
    start = ((start[0]*3) + 1, (start[1]*3) + 1)

    #setrecursionlimit(len(expanded_map) * len(expanded_map[0]))

    print()
    print("\n".join("".join(x) for x in expanded_map))

    # The code below only works because we know for sure that 'S' passes through
    # just one loop and has no ambiguity. This is confirmed by just inspecting
    # the input file visually.

    # Can't do recursion because we'll literally crash CPython lmao
    def floodfill(i, j, to_replace, new_char):
        stack = [(i, j)]
        while len(stack):
            (i, j) = stack.pop()
            if (i < 0) or (j < 0) \
                    or (i >= len(expanded_map)) or (j >= len(expanded_map[0])) \
                    or expanded_map[i][j] not in to_replace:
                continue
            expanded_map[i][j] = new_char
            for ii, jj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                stack.append((i + ii, j + jj))
    floodfill(*start, {"X"}, "Y")
    floodfill(0, 0, {".", "X"}, "Y")

    print("\n".join("".join(x) for x in expanded_map))

    solution = 0
    for i, j in product(range(len(pipemap)), range(len(pipemap[0]))):
        solution += expanded_map[(i*3) + 1][(j*3) + 1] != "Y"
    print()
    print(solution)

run(stdin)
