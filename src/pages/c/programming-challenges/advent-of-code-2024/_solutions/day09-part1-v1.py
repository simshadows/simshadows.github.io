#!/usr/bin/env python3

from sys import stdin
from itertools import chain

diskmap = stdin.readline().strip()

disk = list(chain(*([None if (i % 2) else (i >> 1)]*int(v) for i, v in enumerate(diskmap))))
i = 0
while i < len(disk):
    if disk[i] is None:
        while disk[-1] is None:
            disk.pop()
        disk[i] = disk.pop()
    i += 1
print(sum(i * v for i, v in enumerate(disk)))
