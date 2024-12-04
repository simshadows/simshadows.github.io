#!/usr/bin/env python3

from sys import stdin
from itertools import product

arr = [s.strip() for s in stdin.readlines()]

def found(i, j):
    return arr[i][j] == "A" \
        and "SSMMSSM".count(arr[i+1][j+1] + arr[i+1][j-1] + arr[i-1][j-1] + arr[i-1][j+1])
print(sum(found(i, j) for i, j in product(range(1, len(arr) - 1), range(1, len(arr[0]) - 1))))
