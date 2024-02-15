#!/usr/bin/env python3

from collections import Counter

(_, k) = [int(s) for s in input().strip().split()]
nums = [int(s) for s in input().strip().split()]

(lo, hi) = (0, 0)
cnt = Counter(nums[:1])
solution = 0
while hi < len(nums):
    if len(cnt) <= k:
        solution += hi - lo + 1
        hi += 1
        if hi < len(nums):
            cnt[nums[hi]] += 1
    else:
        if cnt[nums[lo]] == 1:
            del cnt[nums[lo]]
        else:
            cnt[nums[lo]] -= 1
        lo += 1
print(solution)
