#!/usr/bin/env python3

from sys import stdin

def run(f):
    sections = [s.split(":") for s in f.readlines()]
    sections = {k.strip(): int("".join(v.strip().split())) for k, v in sections}

    (time_limit, dist_record) = (sections["Time"], sections["Distance"])

    combos = 0
    for hold_time in range(1, time_limit):
        dist_travelled = (time_limit - hold_time) * hold_time
        if dist_travelled > dist_record:
            combos += 1

    print(combos)

run(stdin)
