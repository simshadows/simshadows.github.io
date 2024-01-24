#!/usr/bin/env python3

input()
sticks = [int(s) for s in input().strip().split()]

avg = sum(sticks) // len(sticks)
print(min(
    sum(abs(stick - avg) for stick in sticks),
    sum(abs(stick - avg - 1) for stick in sticks),
))
