#!/usr/bin/env python3

from sys import stdin
from heapq import heappush, heappop

stdin.readline()
bookings = sorted(
    (*(int(x) for x in s.strip().split()), i)  # (start, end, i)
    for i, s in enumerate(stdin.readlines())
)

solution = [None]*len(bookings)
rooms_pq = [bookings[0][0]]  # [earliest acceptable start, ...]
rooms_batches = {bookings[0][0]: [1]}  # {earliest acceptable start: indices, ...}
last_room = 1
for start, end, i in bookings:
    earliest_start = rooms_pq[0]
    if earliest_start <= start:
        room_number = rooms_batches[earliest_start].pop()
        if len(rooms_batches[earliest_start]) == 0:
            del rooms_batches[earliest_start]
            heappop(rooms_pq)
    else:
        last_room += 1
        room_number = last_room

    solution[i] = str(room_number)

    new_earliest_start = end + 1
    if new_earliest_start in rooms_batches:
        rooms_batches[new_earliest_start].append(room_number)
    else:
        heappush(rooms_pq, new_earliest_start)
        rooms_batches[new_earliest_start] = [room_number]
print(last_room)
print(" ".join(solution))
