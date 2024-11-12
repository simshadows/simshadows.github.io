#!/usr/bin/env python3

from sys import stdin
from itertools import product

def run(f):
    digplan = [s.strip().split() for s in f.readlines()]
    digplan = [(_dir, int(_len)) for _dir, _len, _ in digplan]

    dugouts = {(0, 0)} # set of coordinates
    (i, j) = (0, 0)
    for _dir, _len in digplan:
        for _ in range(_len):
            if _dir == "U":
                i -= 1
            elif _dir == "D":
                i += 1
            elif _dir == "L":
                j -= 1
            elif _dir == "R":
                j += 1
            dugouts.add((i, j))

    i_lo_bound = min(i for i, _ in dugouts) - 1
    i_hi_bound = max(i for i, _ in dugouts) + 1
    j_lo_bound = min(j for _, j in dugouts) - 1
    j_hi_bound = max(j for _, j in dugouts) + 1

    nondugout = set()
    to_visit = [(i_lo_bound, j_lo_bound)] # initial coords guaranteed to be outside
    def floodfill_nondugout(i, j):
        if (i < i_lo_bound) or (i > i_hi_bound) \
                or (j < j_lo_bound) or (j > j_hi_bound) \
                or ((i, j) in dugouts) or ((i, j) in nondugout):
            return
        nondugout.add((i, j))
        for ii, jj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            to_visit.append((i + ii, j + jj))
    while len(to_visit):
        floodfill_nondugout(*to_visit.pop())

    print(sum(
        (i, j) not in nondugout
        for i, j in product(range(i_lo_bound, i_hi_bound + 1), range(j_lo_bound, j_hi_bound + 1))
    ))

run(stdin)
