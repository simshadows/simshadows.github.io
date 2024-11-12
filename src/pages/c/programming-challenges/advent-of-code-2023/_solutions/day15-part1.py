#!/usr/bin/env python3

from sys import stdin
from itertools import product

def run(f):
    strs = f.readlines()[0].strip().split(",")

    solution = 0
    for s in strs:
        cur_hash = 0
        for c in s:
            cur_hash = ((cur_hash + ord(c)) * 17) % 256
        solution += cur_hash
    print(solution)

run(stdin)
