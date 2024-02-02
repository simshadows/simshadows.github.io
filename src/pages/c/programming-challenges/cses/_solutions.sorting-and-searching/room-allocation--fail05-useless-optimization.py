#!/usr/bin/env python3

from sys import stdin
from heapq import heappush, heappop

stdin.readline()
bookings = sorted(
    (*(int(x) for x in s.strip().split()), i)  # (start, end, i)
    for i, s in enumerate(stdin.readlines())
)

# earliest acceptable starts
rooms_q_head = 0
rooms_q = [end + 1 for _, end, _ in bookings]
rooms_q.append(bookings[0][0])
rooms_q.sort()
# prune duplicates
lo = 0
for hi in range(1, len(rooms_q)):
    if rooms_q[lo] != rooms_q[hi]:
        lo += 1
        rooms_q[lo] = rooms_q[hi]
del rooms_q[lo+1:]

# {earliest acceptable start: indices, ...}
rooms_batches = {earliest_start: [] for earliest_start in rooms_q}
rooms_batches[bookings[0][0]].append(1)

last_room = 1
solution = [None]*len(bookings)
for start, end, i in bookings:
    earliest_start = rooms_q[rooms_q_head]
    if earliest_start <= start:
        room_number = rooms_batches[earliest_start].pop()
        if len(rooms_batches[earliest_start]) == 0:
            rooms_q_head += 1
    else:
        last_room += 1
        room_number = last_room

    solution[i] = str(room_number)

    new_earliest_start = end + 1
    rooms_batches[end + 1].append(room_number)
print(last_room)
print(" ".join(solution))
