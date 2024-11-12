#!/usr/bin/env python3

from sys import stdin

def run(f):
    rockmap = [s.strip() for s in f.readlines()]

    solution = 0
    for j in range(len(rockmap[0])):
        empty_i = 0
        for i in range(len(rockmap)):
            c = rockmap[i][j]
            if c == "#":
                empty_i = i + 1
            elif c == "O":
                solution += len(rockmap) - empty_i
                empty_i += 1
    print(solution)

run(stdin)
