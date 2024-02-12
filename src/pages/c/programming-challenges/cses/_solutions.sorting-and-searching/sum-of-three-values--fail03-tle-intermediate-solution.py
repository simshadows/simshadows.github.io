#!/usr/bin/env python3

def run():
    (_, target) = [int(x) for x in input().strip().split()]
    nums = [(int(x), i) for i, x in enumerate(input().strip().split())]

    pairs = {}
    for v1, i1 in nums:
        if v1 in pairs:
            print(i1 + 1, pairs[v1][0] + 1, pairs[v1][1] + 1)
            return
        for v2, i2 in nums[:i1]:
            v3 = target - v1 - v2
            if v3 > 0:
                pairs[v3] = (i1, i2)
    print("IMPOSSIBLE")
run()
