#!/usr/bin/env python3

from sys import stdin

diskmap = [int(x) for x in stdin.readline().strip()]

disk = []   # [ID, ...]
allocs = [] # [(ID, position, length), ...]
for i, v in enumerate(diskmap):
    if i % 2:
        disk += [None]*v
    elif v != 0:
        allocs.append((i >> 1, len(disk), v))
        disk += [i >> 1]*v

for a_id, a_pos, a_len in reversed(allocs):
    (empty_pos, empty_size) = (0, 0)
    for i, v in enumerate(disk[:a_pos]):
        if v is None:
            empty_size += 1
        else:
            (empty_pos, empty_size) = (i + 1, 0)
        if empty_size == a_len:
            for i in range(a_pos, a_pos + a_len):
                disk[i] = None
            for i in range(empty_pos, empty_pos + a_len):
                disk[i] = a_id
            break

print(sum(i * v for i, v in enumerate(disk) if (v is not None)))
