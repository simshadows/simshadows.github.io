#!/usr/bin/env python3

from sys import stdin
from itertools import chain, product

TARGET_ITERATIONS = 1000000000

def rotate_grid(rockmap):
    new_map = []
    for j in range(len(rockmap[0])):
        new_row = []
        new_map.append(new_row)
        for i in reversed(range(len(rockmap))):
            new_row.append(rockmap[i][j])
    return new_map

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

def calculate_load(rockmap):
    return sum(
        len(rockmap) - i
        for i, j in product(range(len(rockmap)), range(len(rockmap[0])))
        if rockmap[i][j] == "O"
    )

def run(f):
    rockmap = [list(s.strip()) for s in f.readlines()]
    latest_i = {} # {stringified map: latest iteration}
    history = [] # loads

    dist = 0
    end_iteration = None
    for i in range(TARGET_ITERATIONS):
        for _ in range(4):
            push_north(rockmap)
            rockmap = rotate_grid(rockmap)
        s = "".join(chain(*rockmap))
        history.append(calculate_load(rockmap))
        if s in latest_i:
            dist = i - latest_i[s]
            end_iteration = i
            break
        latest_i[s] = i

    # we assume we actually do find a repeat
    # (not going to bother dealing with the edge case of no periodicity)
    if end_iteration is None:
        raise RuntimeError()

    repeated = history[-dist:] # just get the repeated section
    #print(repeated)
    print(repeated[(TARGET_ITERATIONS - end_iteration - 2) % len(repeated)])

run(stdin)
