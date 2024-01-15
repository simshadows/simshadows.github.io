#!/usr/bin/env python3

FAC9 = 1*2*3*4*5*6*7*8*9
 
n = int(input())

def include(_head, _trailing):
    while _head % 10 == 0:
        _trailing += 1
        _head //= 10
    return (_head % 10, _trailing)

(fac9_head, fac9_trailing) = include(FAC9, 0)
(head, trailing, place) = (1, 0, 0)
while n:
    k = 1
    while k <= n - 10:
        (head, trailing) = include(head * fac9_head, trailing + fac9_trailing)
        trailing += fac9_trailing * place * 9
        k += 10
    while k <= n:
        if k % 10:
            (head, trailing) = include(head * k, trailing)
            trailing += place
        k += 1
    place += 1
    n //= 10
print(trailing)

