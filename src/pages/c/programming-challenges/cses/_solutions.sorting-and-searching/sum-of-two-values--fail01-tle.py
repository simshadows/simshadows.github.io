#!/usr/bin/env python3

from collections import defaultdict

(_, x) = [int(s) for s in input().strip().split()]
arr = [(int(s), i) for i, s in enumerate(input().strip().split())]

buckets = defaultdict(list)
for v, i in arr:
    buckets[v].append(i + 1) # i+1 because one-indexed for some reason

def run():
    for v in buckets.keys():
        other = x - v
        if other == v:
            if len(buckets[v]) > 1:
                return f"{buckets[v][0]} {buckets[v][1]}"
        elif other in buckets:
            return f"{buckets[v][0]} {buckets[other][0]}"
    return "IMPOSSIBLE"

print(run())
