#!/usr/bin/env python3

from sys import stdin
from heapq import heappush, heappop
from collections import deque

stdin.readline()
bookings = sorted(
    (*(int(x) for x in s.strip().split()), i)  # (start, end, i)
    for i, s in enumerate(stdin.readlines())
)

# earliest acceptable starts
rooms_q = deque(sorted({end + 1 for _, end, _ in bookings}))
rooms_q.appendleft(bookings[0][0])

# {earliest acceptable start: indices, ...}
rooms_batches = {earliest_start: [] for earliest_start in rooms_q}
rooms_batches[bookings[0][0]].append(1)

last_room = 1
solution = [None]*len(bookings)
for start, end, i in bookings:
    earliest_start = rooms_q[0]
    if earliest_start <= start:
        room_number = rooms_batches[earliest_start].pop()
        if len(rooms_batches[earliest_start]) == 0:
            rooms_q.popleft()
    else:
        last_room += 1
        room_number = last_room

    solution[i] = str(room_number)

    new_earliest_start = end + 1
    rooms_batches[end + 1].append(room_number)
print(last_room)
print(" ".join(solution))
