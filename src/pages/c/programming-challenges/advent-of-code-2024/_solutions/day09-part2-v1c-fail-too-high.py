#!/usr/bin/env python3

from sys import stdin
from itertools import chain
from heapq import heappush, heappop, heapify

diskmap = [int(x) for x in stdin.readline().strip()]

disk = []   # [ID, ...]
pq = []     # [(-length, position), ...]
allocs = [] # [(length, position), ...]
for i, v in enumerate(diskmap):
    if i % 2 and v != 0:
        pq.append((-v, len(disk)))
        disk += [None]*v
    else:
        allocs.append((v, len(disk)))
        disk += [i >> 1]*v
heapify(pq)

for len1, i1 in reversed(allocs):
    if -pq[0][0] >= len1:
        (len2, i2) = heappop(pq)
        len2 = -len2
        if i1 <= i2:
            continue
        for j in range(i2, i2 + len1):
            if disk[j] != None:
                raise RuntimeError()
            disk[j] = disk[i1]
        for j in range(i1, i1 + len1):
            if disk[j] != disk[i2]:
                raise RuntimeError()
            disk[j] = None
        if len2 > len1:
            heappush(pq, (-(len2 - len1), i2 + len1))
    else:
        # we try to left-shift the allocation
        j = i1 - 1
        while (j >= 0) and (disk[j] is None):
            disk[j] = disk[j + 1]
            disk[j + len1] = None

print(sum(i * v for i, v in enumerate(disk) if (v is not None)))
