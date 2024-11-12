#!/usr/bin/env python3

from sys import stdin, setrecursionlimit
from itertools import chain

CONNECTIONS = {
    (-1,  0): {"S", "|", "L", "J"},
    ( 1,  0): {"S", "|", "7", "F"},
    ( 0, -1): {"S", "-", "J", "7"},
    ( 0,  1): {"S", "-", "L", "F"},
}

def run(f):
    pipemap = [s.strip() + "." for s in f.readlines()]
    pipemap.append("."*len(pipemap[0]))

    start = None
    for row, col in enumerate(s.find("S") for s in pipemap):
        if col >= 0:
            start = (row, col)
            break

    dummy = len(pipemap) * len(pipemap[0])
    distances = [[dummy]*len(pipemap[0]) for _ in range(len(pipemap))]

    setrecursionlimit(dummy)
    def dfs(i, j, dist):
        if distances[i][j] <= dist:
            return
        distances[i][j] = dist
        for (ii, jj), symbols in CONNECTIONS.items():
            if (pipemap[i][j] in symbols) and (pipemap[i + ii][j + jj] in CONNECTIONS[(-ii, -jj)]):
                dfs(i + ii, j + jj, dist + 1)
    dfs(*start, 0)
    print(max(x for x in chain(*distances) if (x < dummy)))

run(stdin)
