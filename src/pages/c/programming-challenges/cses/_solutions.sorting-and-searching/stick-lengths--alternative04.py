#!/usr/bin/env python3

input()
sticks = sorted(int(s) for s in input().strip().split())

cost = sum(sticks)
solution = cost
prev = 0
for i, stick in enumerate(sticks):
    cost += (stick - prev) * ((2 * i) - len(sticks))
    solution = min(solution, cost)
    prev = stick
print(solution)
