#!/usr/bin/env python3

from sys import stdin

BLINKS = 25

stones = [int(x) for x in stdin.readline().split()]
for _ in range(BLINKS):
    for i in reversed(range(len(stones))):
        if stones[i] == 0:
            stones[i] = 1
        elif len(str(stones[i])) % 2:
            stones[i] *= 2024
        else:
            s = str(stones[i])
            (left, right) = (int(s[:(len(s) >> 1)]), int(s[(len(s) >> 1):]))
            stones[i] = right
            stones.insert(i, left)

print(len(stones))
