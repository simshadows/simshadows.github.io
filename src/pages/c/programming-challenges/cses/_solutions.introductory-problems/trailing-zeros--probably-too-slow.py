#!/usr/bin/env python3

n = int(input())

(head, trailing) = (1, 0)
for k in range(1, n + 1):
    head *= k
    while head % 10 == 0:
        trailing += 1
        head //= 10
print(trailing)

