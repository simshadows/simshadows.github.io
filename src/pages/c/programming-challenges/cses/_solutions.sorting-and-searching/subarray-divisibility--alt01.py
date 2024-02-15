#!/usr/bin/env python3

from itertools import accumulate

input()
nums = [int(s) for s in input().strip().split()]

target = len(nums)
accs = sorted((v % target, i) for (i, v) in enumerate(accumulate(nums, initial=0)))

(lo, hi) = (0, 1)
(lo_acc, lo_count) = (accs[0][0], 1)
def inc_lo():
    global lo, lo_acc, lo_count
    lo += 1
    # TODO: do we need to reprocess lo_acc and lo_count always lol
    if lo_acc == accs[lo][0]:
        lo_count += 1
    else:
        lo_acc = accs[lo][0]
        lo_count = 1

solution = 0
while hi < len(accs):
    v = accs[hi][0] - accs[lo][0]
    if (v < 0) or (lo == hi):
        hi += 1
    elif v > 0:
        inc_lo()
    elif (accs[lo + 1][0] == lo_acc) and (accs[lo + 1][1] < accs[hi][1]):
        inc_lo()
    else:
        if accs[lo][1] < accs[hi][1]:
            solution += lo_count
        hi += 1
print(solution)
