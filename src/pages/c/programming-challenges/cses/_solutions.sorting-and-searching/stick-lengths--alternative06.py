#!/usr/bin/env python3

input()
sticks = sorted(int(s) for s in input().strip().split())

print(sum(abs(stick - sticks[len(sticks) // 2]) for stick in sticks))
