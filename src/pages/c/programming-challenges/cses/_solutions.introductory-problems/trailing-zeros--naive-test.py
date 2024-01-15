#!/usr/bin/env python3

FAC9 = 1*2*3*4*5*6*7*8*9
 
n = int(input())

def include(_head, _trailing):
    while _head % 10 == 0:
        _trailing += 1
        _head //= 10
    return (_head % 10, _trailing)

v = 1
for k in range(1, n + 1):
    v *= k
(_, trailing) = include(v, 0)
print(trailing)

