#!/usr/bin/env python3

def run():
    (_, target) = [int(x) for x in input().strip().split()]
    nums = [int(x) for x in input().strip().split()]

    pairs = {}
    for i1, v1 in enumerate(nums):
        if v1 in pairs:
            print(i1 + 1, pairs[v1][0] + 1, pairs[v1][1] + 1)
            return
        for i2, v2 in enumerate(nums[:i1]):
            v3 = target - v1 - v2
            if v3 > 0:
                pairs[v3] = (i1, i2)
    print("IMPOSSIBLE")
run()
