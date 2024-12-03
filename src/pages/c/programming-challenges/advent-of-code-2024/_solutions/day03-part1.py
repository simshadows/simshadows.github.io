#!/usr/bin/env python3

from sys import stdin
from re import findall
from operator import mul

lines = "".join(stdin.readlines())
print(sum(eval(s) for s in findall(r"mul\([0-9]{1,3},[0-9]{1,3}\)", lines)))
