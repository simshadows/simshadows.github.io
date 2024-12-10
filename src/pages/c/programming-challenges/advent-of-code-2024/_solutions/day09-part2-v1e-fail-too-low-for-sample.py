#!/usr/bin/env python3

from sys import stdin

#diskmap = [((None if i % 2 else i >> 1), int(x)) for i, x in enumerate(stdin.readline().strip())]

diskmap = [int(x) for x in stdin.readline().strip()]

disk = []   # [ID, ...]
allocs = [] # [(ID, position, length), ...]
for i, v in enumerate(diskmap):
    if i % 2 and v != 0:
        disk += [None]*v
    else:
        allocs.append((i >> 1, len(disk), v))
        disk += [i >> 1]*v

while len(allocs):
    (a_id, a_pos, a_len) = allocs.pop()
    (empty_pos, empty_size) = (0, 0)
    for i, v in enumerate(disk[:a_pos]):
        if v is None:
            empty_size += 1
        else:
            (empty_pos, empty_size) = (i + 1, 0)
        if empty_size >= a_len:
            break

    if empty_size != a_len:
        (empty_pos, empty_size) = (a_pos, a_len)
        while (empty_pos > 0) and (disk[empty_pos - 1] is None):
            empty_pos -= 1
    for i in range(a_pos, a_pos + a_len):
        disk[i] = None
    for i in range(empty_pos, empty_pos + a_len):
        disk[i] = a_id

print(allocs)

print(disk)
print(sum(i * v for i, v in enumerate(disk) if (v is not None)))
