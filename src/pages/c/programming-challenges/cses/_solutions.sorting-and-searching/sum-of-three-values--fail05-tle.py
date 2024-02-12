#!/usr/bin/env python3

def run():
    (_, target) = [int(x) for x in input().strip().split()]
    nums = [(int(x), i) for i, x in enumerate(input().strip().split())]
    nums.sort()

    max_num = nums[-1][0]

    pairs = {}
    for j, (v1, i1) in enumerate(nums):
        if v1 in pairs:
            print(i1 + 1, pairs[v1][0] + 1, pairs[v1][1] + 1)
            return
        v3_partial = target - v1
        for v2, i2 in nums[:j]:
            v3 = v3_partial - v2
            if v3 < v1:
                break
            elif v3 <= max_num:
                pairs[v3] = (i1, i2)
    print("IMPOSSIBLE")
run()
