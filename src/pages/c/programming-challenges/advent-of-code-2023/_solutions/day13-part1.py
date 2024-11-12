#!/usr/bin/env python3

from sys import stdin
from itertools import product

def run(f):
    patterns = [s.split() for s in "".join(f.readlines()).split("\n\n")]

    solution = 0
    for pattern in patterns:
        is_horz_refl = [True]*(len(pattern[0]) - 1)
        is_vert_refl = [True]*(len(pattern) - 1)
        for i, j in product(range(len(pattern)), range(len(pattern[0]))):
            c = pattern[i][j]
            # check horizontal reflections
            for j_midline in range(j, len(pattern[0])):
                j_refl = j_midline + (j_midline - j) + 1
                if j_refl >= len(pattern[0]):
                    break
                elif c != pattern[i][j_refl]:
                    is_horz_refl[j_midline] = False
            # check vertical reflections
            for i_midline in range(i, len(pattern)):
                i_refl = i_midline + (i_midline - i) + 1
                if i_refl >= len(pattern):
                    break
                elif c != pattern[i_refl][j]:
                    is_vert_refl[i_midline] = False
        solution += sum(i + 1 for i, v in enumerate(is_horz_refl) if v)
        solution += sum(i + 1 for i, v in enumerate(is_vert_refl) if v) * 100
    print(solution)

run(stdin)
