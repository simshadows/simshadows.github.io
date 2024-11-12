#!/usr/bin/env python3

from sys import stdin
from functools import cache
from itertools import product

OK = "."
BAD = "#"
UNKNOWN = "?"

def run(f):
    solution = 0
    for s in f.readlines():
        (springs, groups) = s.split()
        springs = ["."] + list("?".join([springs]*5))
        groups = [int(x) for x in groups.split(",")]*5

        # Returns number of combinations
        # `i` is the beginning of a subarray in `springs`
        # `j` is the beginning of a subarray in `groups`
        @cache
        def subproblem(i, j):
            if j == len(groups):
                return all((c != BAD) for c in springs[i:])
            elif len(springs) - i < groups[j] + 1:
                return 0 # not enough room
            elif springs[i] == BAD:
                return 0 # must not connect with previous group
            i += 1
            subsolution = 0
            for i in range(i, len(springs) - groups[j] + 1):
                s = springs[i : i + groups[j]]
                if all(c != OK for c in s):
                    subsolution += subproblem(i + groups[j], j + 1)
                if springs[i] == BAD:
                    break
            return subsolution
        solution += subproblem(0, 0)

    print(solution)

run(stdin)
