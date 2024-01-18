#!/usr/bin/env python3

input()
tickets = sorted(int(x) for x in input().strip().split())
bids = sorted(int(x) for x in input().strip().split())

for bid in reversed(bids):
    while len(tickets) and (tickets[-1] > bid):
        tickets.pop()
    if len(tickets):
        print(tickets.pop())
    else:
        print(-1)
