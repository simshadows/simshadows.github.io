#!/usr/bin/env python3

from sys import stdin
from itertools import product

arr = [s.strip() + "." for s in stdin.readlines()]
arr.append("."*len(arr[0]))
(len1, len2) = (len(arr), len(arr[0]))

def found(i, j, di, dj, pos):
    if pos == 4:
        return True
    return (arr[i][j] == "XMAS"[pos]) and found(i + di, j + dj, di, dj, pos + 1)

DIRS = [(di, dj) for di, dj in product([-1, 0, 1], repeat=2) if (di != 0 or dj != 0)]
print(sum(found(i, j, di, dj, 0) for i, j, (di, dj) in product(range(len1), range(len2), DIRS)))
