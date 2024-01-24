#!/usr/bin/env python3

input()
sticks = sorted(int(s) for s in input().strip().split())

cost = sum(sticks)
prev = 0
for i, stick in enumerate(sticks):
    dif = (stick - prev) * ((2 * i) - len(sticks))
    if dif > 0:
        break # short circuit
    cost += dif
    prev = stick
print(cost)
