#!/usr/bin/env python3

from sys import stdin
from itertools import pairwise

def run(f):
    seqs = [[int(x) for x in s.split()] for s in f.readlines()]

    solution = 0
    for seq in seqs:
        diffs = [seq.copy()]
        while any(x != 0 for x in diffs[-1]):
            diffs.append([b - a for a, b in pairwise(diffs[-1])])
        next_diff = 0
        for i in reversed(range(len(diffs) - 1)):
            next_diff = diffs[i][-1] + next_diff
            diffs[i].append(next_diff)
        solution += diffs[0][-1]
    print(solution)

run(stdin)
