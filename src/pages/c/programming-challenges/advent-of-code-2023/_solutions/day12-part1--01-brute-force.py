#!/usr/bin/env python3

from sys import stdin
from itertools import product

OK = "."
BAD = "#"
UNKNOWN = "?"

def run(f):
    solution = 0
    for s in f.readlines():
        (springs, groups) = s.split()
        springs = list(springs)
        groups = tuple(int(x) for x in groups.split(","))

        num_wildcards = springs.count(UNKNOWN)
        for wildcards in product(OK + BAD, repeat=num_wildcards):
            wildcards = list(wildcards)
            springs2 = springs.copy()
            for i in range(len(springs2)):
                if springs2[i] == UNKNOWN:
                    springs2[i] = wildcards.pop()
            if groups == tuple(len(x) for x in "".join(springs2).replace(".", " ").split()):
                solution += 1
    print(solution)

run(stdin)
