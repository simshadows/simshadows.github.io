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
        #springs = list("?".join([springs]*5))
        #groups = tuple(int(x) for x in groups.split(","))*5
        springs = list(springs) + ["."]
        groups = [0] + [int(x) for x in reversed(groups.split(","))]

        subsolution = 0
        def backtrack(i, is_contiguous_bads):
            nonlocal subsolution
            if i == len(springs):
                if (len(groups) == 1) and (groups[0] == 0):
                    subsolution += 1
                return
            elif springs[i] == UNKNOWN:
                springs[i] = OK
                backtrack(i, is_contiguous_bads)
                springs[i] = BAD
                backtrack(i, is_contiguous_bads)
                springs[i] = UNKNOWN
            elif springs[i] == OK:
                if is_contiguous_bads:
                    if groups[-1] != 0:
                        return
                    groups.pop()
                    if len(groups):
                        backtrack(i + 1, False)
                    groups.append(0)
                else:
                    backtrack(i + 1, False)
            else: # springs[1] == BAD
                if is_contiguous_bads and (groups[-1] == 0):
                    return
                groups[-1] -= 1
                backtrack(i + 1, True)
                groups[-1] += 1
        backtrack(0, False)
        solution += subsolution
    print(solution)

run(stdin)
