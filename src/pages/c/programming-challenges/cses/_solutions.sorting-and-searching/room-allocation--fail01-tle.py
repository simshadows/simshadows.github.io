#!/usr/bin/env python3

from sys import stdin
from heapq import heappush, heappop

stdin.readline()
bookings = sorted(
    (*(int(x) for x in s.strip().split()), i)  # (start, end, i)
    for i, s in enumerate(stdin.readlines())
)

solution = [None]*len(bookings)
rooms_pq = [(bookings[0][0], 1)]  # [(earliest acceptable start, room number), ...]
for start, end, i in bookings:
    if rooms_pq[0][0] <= start:
        (_, room_number) = heappop(rooms_pq)
    else:
        room_number = len(rooms_pq) + 1
    solution[i] = str(room_number)
    heappush(rooms_pq, (end + 1, room_number))
print(len(rooms_pq))
print(" ".join(solution))
