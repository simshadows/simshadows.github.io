#!/usr/bin/env python3

from sys import stdin
from itertools import product

arr = [s.strip() + "." for s in stdin.readlines()]
arr.append("."*len(arr[0]))

def found(i, j, di, dj, pos):
    return (pos == 4) or ((arr[i][j] == "XMAS"[pos]) and found(i+di, j+dj, di, dj, pos+1))

it = product(range(len(arr)), range(len(arr[0])), [-1, 0, 1], [-1, 0, 1])
print(sum(found(i, j, di, dj, 0) for i, j, di, dj in it if (di != 0 or dj != 0)))