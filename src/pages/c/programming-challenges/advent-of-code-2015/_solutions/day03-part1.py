#!/usr/bin/env python3

from sys import stdin
from itertools import accumulate

DIRS = {"^": (-1, 0), "v": (1, 0), ">": (0, 1), "<": (0, -1)}

instrs = [DIRS[x] for x in stdin.readline().strip()]
print(len(set(accumulate(instrs, lambda ac, v: (ac[0] + v[0], ac[1] + v[1]), initial=(0, 0)))))
