#!/usr/bin/env python3

from sys import stdin
from re import findall
from operator import mul

lines = "".join(stdin.readlines())

solution = 0
do_mul = True
for s, do, _ in findall(r"(mul\([0-9]{1,3},[0-9]{1,3}\))|(do\(\))|(don't\(\))", lines):
    if not s:
        do_mul = do
    elif do_mul:
        solution += eval(a)
print(solution)
