#!/usr/bin/env python3

def run():
    (_, target) = [int(x) for x in input().strip().split()]
    nums = [(int(x), i) for i, x in enumerate(input().strip().split()) if (int(x) - 1 < target)]
    nums.sort()

    lo = 0
    while (len(nums) >= 3) and (nums[0][0] + nums[1][0] + nums[-1][0] > target):
        nums.pop()
    for i, (v, _) in enumerate(nums[:-2]):
        if target - nums[-1][0] - nums[-2][0] - v <= 0:
            break
        lo = i

    max_num = nums[-1][0]

    pairs = {}
    for hi, (v1, i1) in enumerate(nums):
        if v1 in pairs:
            print(i1 + 1, pairs[v1][0] + 1, pairs[v1][1] + 1)
            return
        v3_partial = target - v1
        for v2, i2 in nums[lo:hi]:
            v3 = v3_partial - v2
            if v3 < v1:
                break
            pairs[v3] = (i1, i2)
    print("IMPOSSIBLE")
run()
