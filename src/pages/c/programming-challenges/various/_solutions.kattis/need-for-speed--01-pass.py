#!/usr/bin/env python3

from sys import stdin

(n, t) = [int(s) for s in stdin.readline().strip().split()]
data = [[int(x) for x in s.strip().split()] for s in stdin.readlines()]

"""
speed = dist / time
time = dist / speed
"""

(lo, hi) = (float(-1e7), float(1e7))
#print(lo, hi)
#(lo, hi) = (-1000.0, 1000.0)
#for _ in range(8):
#while True:
while hi - lo >= 1e-7:
    #print(lo, hi)
    c = (hi + lo) / 2
    this_t = 0
    for dist, speed in data:
        speed2 = speed + c
        if speed2 <= 0:
            this_t = 2 * t  # arbitrary large value
            break
        this_t += dist / speed2
    if abs(this_t - t) <= 1e-7:
        break
    elif this_t > t:
        lo = c
    else:
        hi = c

print((hi + lo) / 2)

