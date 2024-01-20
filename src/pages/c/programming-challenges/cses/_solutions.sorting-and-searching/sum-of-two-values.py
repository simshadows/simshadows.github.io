#!/usr/bin/env python3

from collections import defaultdict

(_, x) = [int(s) for s in input().strip().split()]
arr = sorted((int(s), i + 1) for i, s in enumerate(input().strip().split()))
# i+1 because it's 1-indexed for some reason

(lo, hi) = (0, len(arr) - 1)
while (hi > lo) and (arr[hi][0] + arr[lo][0] != x):
    if arr[hi][0] + arr[lo][0] > x:
        hi -= 1
    else:
        lo += 1
print(f"{arr[lo][1]} {arr[hi][1]}" if (hi > lo) else "IMPOSSIBLE")
