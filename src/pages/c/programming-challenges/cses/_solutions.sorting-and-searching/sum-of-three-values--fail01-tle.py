#!/usr/bin/env python3

from itertools import combinations
from collections import defaultdict

def run():
    (_, target) = [int(x) for x in input().strip().split()]
    nums = [int(x) for x in input().strip().split()]

    pairs = defaultdict(list)
    for (i, a), (j, b) in combinations(enumerate(nums), 2):
        c = target - a - b
        if c > 0:
            pairs[c].append((i, j))

    for i, v in enumerate(nums):
        if v in pairs:
            for ii, jj in pairs[v]:
                if i != ii and i != jj:
                    print(i + 1, ii + 1, jj + 1)
                    return
    print("IMPOSSIBLE")
run()
