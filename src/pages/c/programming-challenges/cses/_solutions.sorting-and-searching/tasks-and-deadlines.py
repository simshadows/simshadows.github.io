#!/usr/bin/env python3

from sys import stdin

stdin.readline()
tasks = sorted(tuple(int(x) for x in s.strip().split()) for s in stdin.readlines())

(t, total_reward) = (0, 0)
for duration, deadline in tasks:
    t += duration
    total_reward += deadline - t
print(total_reward)
