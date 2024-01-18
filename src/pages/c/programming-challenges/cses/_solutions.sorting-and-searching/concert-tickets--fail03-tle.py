#!/usr/bin/env python3

from bisect import bisect_right

input()
tickets = sorted(int(x) for x in input().strip().split())
bids = [int(x) for x in input().strip().split()]

for bid in bids:
    i = bisect_right(tickets, bid)
    if i == 0:
        print(-1)
    else:
        print(tickets.pop(i - 1))

