#!/usr/bin/env python3

input()
sticks = [int(s) for s in input().strip().split()]

avg = sum(sticks) // len(sticks)
print(sum(abs(stick - avg) for stick in sticks))
