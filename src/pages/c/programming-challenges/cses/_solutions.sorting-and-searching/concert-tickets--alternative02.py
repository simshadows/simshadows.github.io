#!/usr/bin/env python3

from bisect import bisect_right

input()
tickets = sorted(int(x) for x in input().strip().split())
bids = [int(x) for x in input().strip().split()]

skips = list(range(len(tickets)))
def canonical(i):
    if i < 0:
        return i
    elif i != skips[i]:
        skips[i] = canonical(skips[i])
    return skips[i]

for bid in bids:
    i = canonical(bisect_right(tickets, bid) - 1)
    if i == -1:
        print(-1)
    else:
        print(tickets[i])
        skips[i] = canonical(i - 1)
