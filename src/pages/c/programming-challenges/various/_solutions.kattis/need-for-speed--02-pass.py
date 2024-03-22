#!/usr/bin/env python3

from sys import stdin

(n, t) = [int(s) for s in stdin.readline().strip().split()]
data = [[int(x) for x in s.strip().split()] for s in stdin.readlines()]

(lo, hi) = (float(-1e7), float(1e7))
while hi - lo >= 1e-7:
    c = (hi + lo) / 2
    real_t = 0
    for dist, speed in data:
        real_speed = speed + c
        if real_speed <= 0:
            real_t = 2 * t  # arbitrary large value
            break
        # speed = dist / time  -->  time = dist / speed
        real_t += dist / real_speed
    if real_t > t:
        lo = c
    else:
        hi = c

print(lo)
