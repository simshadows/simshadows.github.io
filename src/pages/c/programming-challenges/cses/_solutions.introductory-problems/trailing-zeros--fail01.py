#!/usr/bin/env python3

"""
too slow
"""
 
n = int(input())

(head, trailing_zeroes) = (1, 0)
for k in range(1, n + 1):
    head *= k
    while head % 10 == 0:
        trailing_zeroes += 1
        head //= 10
    head %= 10
print(trailing_zeroes)

