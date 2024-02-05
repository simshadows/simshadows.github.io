#!/usr/bin/env python3

from heapq import heapify, heappush, heappop

(_, prod_target) = [int(s) for s in input().strip().split()]
machines = sorted(int(s) for s in input().strip().split())

#
# Binary search for an estimate
#

total_durs = [0]*len(machines)  # modify later
prod_remaining = prod_target    # modify later

est_total_dur = 0
bitmask = 1 << 31
while bitmask:
    new_est_total_dur = est_total_dur | bitmask
    new_total_durs = []
    new_prod_remaining = prod_target
    for machine_dur in machines:
        prod = new_est_total_dur // machine_dur
        new_prod_remaining -= prod
        if new_prod_remaining <= 0:
            break
        new_total_durs.append(prod * machine_dur)
    if new_prod_remaining > 0:
        est_total_dur = new_est_total_dur
        total_durs = new_total_durs
        prod_remaining = new_prod_remaining
    bitmask >>= 1

#
# Heap-based algo to get the rest
#

# [(new total duration, machine duration), ...]
next_free = [(tot_dur + m_dur, m_dur) for m_dur, tot_dur in zip(machines, total_durs)]
heapify(next_free)

overall_dur = 0  # works since we assume there's always remaining product
for _ in range(prod_remaining):
    (new_total_dur, machine_dur) = heappop(next_free)
    overall_dur = max(overall_dur, new_total_dur)
    heappush(next_free, (new_total_dur + machine_dur, machine_dur))
print(overall_dur)
