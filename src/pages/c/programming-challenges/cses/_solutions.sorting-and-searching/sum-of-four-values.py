#!/usr/bin/env python3

from itertools import combinations, product
from collections import defaultdict

def run():
    (_, target) = [int(x) for x in input().strip().split()]
    nums = [(int(x), i) for i, x in enumerate(input().strip().split()) if (int(x) - 1 < target)]
    nums.sort()

    lowest_i = 0
    while (len(nums) >= 4) and (nums[0][0] + nums[1][0] + nums[2][0] + nums[-1][0] > target):
        nums.pop()
    for i, (v, _) in enumerate(nums[:-3]):
        if target - nums[-1][0] - nums[-2][0] - nums[-3][0] - v <= 0:
            break
        lowest_i = i

    pairs = defaultdict(list)
    for (v1, i1), (v2, i2) in combinations(nums[lowest_i:], 2):
        pairs[v1 + v2].append((i1, i2))
    pairs = list(pairs.items())
    pairs.sort(key=lambda x: x[0])

    (lo, hi) = (0, len(pairs) - 1)
    while lo <= hi:
        x = pairs[lo][0] + pairs[hi][0]
        if x > target:
            hi -= 1
        elif x < target:
            lo += 1
        else:
            check = set()
            for (i1, i2), (i3, i4) in product(pairs[lo][1], pairs[hi][1]):
                check.clear()
                check.update((i1, i2, i3, i4))
                if len(check) == 4:
                    print(*(i + 1 for i in check))
                    return
            hi -= 1 # arbitrary
    print("IMPOSSIBLE")
run()
