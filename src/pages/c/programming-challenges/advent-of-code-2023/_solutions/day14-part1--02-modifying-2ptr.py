#!/usr/bin/env python3

from sys import stdin
from itertools import product

def push_north(rockmap):
    for j in range(len(rockmap[0])):
        empty_i = 0
        for i in range(len(rockmap)):
            c = rockmap[i][j]
            if c == "#":
                empty_i = i + 1
            elif c == "O":
                rockmap[i][j] = "."
                rockmap[empty_i][j] = "O"
                empty_i += 1

def run(f):
    rockmap = [list(s.strip()) for s in f.readlines()]
    push_north(rockmap)
    print(sum(
        len(rockmap) - i
        for i, j in product(range(len(rockmap)), range(len(rockmap[0])))
        if rockmap[i][j] == "O"
    ))

run(stdin)
