#!/usr/bin/env python3

from sys import stdin
from itertools import product

arr = [s.strip() for s in stdin.readlines()]

def found(i, j):
    return arr[i+1][j+1] == "A" \
        and "SSMMSSM".count(arr[i][j] + arr[i+2][j] + arr[i+2][j+2] + arr[i][j+2])
print(sum(found(i, j) for i, j in product(range(len(arr) - 2), range(len(arr[0]) - 2))))
