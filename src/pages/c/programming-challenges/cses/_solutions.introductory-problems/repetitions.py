#!/usr/bin/env python3

s = input()

prev = None
cur_len = 0
solution = 0
for c in s:
    if c == prev:
        cur_len += 1
    else:
        prev = c
        cur_len = 1
    solution = max(solution, cur_len)

print(solution)
