#!/usr/bin/env python3

from sys import stdin
from functools import cache

BLINKS = 75

@cache
def count_stones(num, blinks):
    if blinks == 0:
        return 1
    elif num == 0:
        return count_stones(1, blinks - 1)
    elif len(str(num)) % 2:
        return count_stones(num * 2024, blinks - 1)
    else:
        s = str(num)
        (left, right) = (int(s[:(len(s) >> 1)]), int(s[(len(s) >> 1):]))
        return count_stones(left, blinks - 1) + count_stones(right, blinks - 1)

stones = [int(x) for x in stdin.readline().split()]
print(sum(count_stones(v, BLINKS) for v in stones))
