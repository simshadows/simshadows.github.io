#!/usr/bin/env python3

from heapq import heapify, heappush, heappop

(_, prod_target) = [int(s) for s in input().strip().split()]
machines = sorted(int(s) for s in input().strip().split())

next_free = [(dur, dur) for dur in machines]  # [(new total duration, machine duration), ...]
heapify(next_free)

total_dur = 0
for _ in range(prod_target):
    (new_total_dur, machine_dur) = heappop(next_free)
    total_dur = max(total_dur, new_total_dur)
    heappush(next_free, (new_total_dur + machine_dur, machine_dur))
print(total_dur)
