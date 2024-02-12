#!/usr/bin/env python3

def run():
    (_, target) = [int(x) for x in input().strip().split()]
    nums = [(int(x), i) for i, x in enumerate(input().strip().split()) if (int(x) - 1 < target)]
    nums.sort()

    lowest_i = 0
    while (len(nums) >= 3) and (nums[0][0] + nums[1][0] + nums[-1][0] > target):
        nums.pop()
    for i, (v, _) in enumerate(nums[:-2]):
        if target - nums[-1][0] - nums[-2][0] - v <= 0:
            break
        lowest_i = i

    for i, (v, pos1) in enumerate(nums[lowest_i:], start=lowest_i):
        (lo, hi) = (lowest_i, len(nums) - 1)
        while lo < hi:
            x = v + nums[lo][0] + nums[hi][0]
            if (x > target) or (hi == i):
                hi -= 1
            elif (x < target) or (lo == i):
                lo += 1
            else:
                print(pos1 + 1, nums[lo][1] + 1, nums[hi][1] + 1)
                return
    print("IMPOSSIBLE")
run()
