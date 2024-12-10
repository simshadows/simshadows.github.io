#!/usr/bin/env python3

from sys import stdin
from itertools import chain
from heapq import heappush, heappop, heapify

diskmap = [int(x) for x in stdin.readline().strip()]

disk = []   # [ID, ...]
heap = []   # [(position, length), ...]
allocs = [] # [(position, length), ...]
for i, v in enumerate(diskmap):
    if i % 2 and v != 0:
        heap.append((len(disk), v))
        disk += [None]*v
    else:
        allocs.append((len(disk), v))
        disk += [i >> 1]*v
heapify(heap)

for i1, len1 in reversed(allocs):
    if heap[0][1] >= len1:
        (i2, len2) = heappop(heap)
        for j in range(i2, i2 + len1):
            if disk[j] != None:
                raise RuntimeError()
            disk[j] = disk[i1]
        for j in range(i1, i1 + len1):
            if disk[j] != disk[i2]:
                raise RuntimeError()
            disk[j] = None
        if len2 > len1:
            heappush(heap, (i2 + len1, len2 - len1))
    print(disk)

print(disk)
print(heap)
print(sum(i * v for i, v in enumerate(disk) if (v is not None)))
