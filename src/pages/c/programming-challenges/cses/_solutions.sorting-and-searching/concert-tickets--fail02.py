#!/usr/bin/env python3

input()
tickets = sorted(int(x) for x in input().strip().split())
bids = sorted((int(x), i) for i, x in enumerate(input().strip().split()))

results = [None]*len(bids)
for bid, i in reversed(bids):
    while len(tickets) and (tickets[-1] > bid):
        tickets.pop()
    results[i] = tickets.pop() if len(tickets) else -1
print("\n".join(str(x) for x in results))
