#!/usr/bin/env python3

from sys import stdin
from re import findall
from operator import mul

lines = "".join(stdin.readlines())
matches = findall(r"(mul\([0-9]{1,3},[0-9]{1,3}\))|(do\(\))|(don't\(\))", lines)

solution = 0
do_mul = True
for a, b, c in matches:
    if a and do_mul:
        solution += eval(a)
    elif b:
        do_mul = True
    elif c:
        do_mul = False
print(solution)
