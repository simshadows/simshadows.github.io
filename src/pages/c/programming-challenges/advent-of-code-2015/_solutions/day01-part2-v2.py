#!/usr/bin/env python3

from sys import stdin
from itertools import accumulate

it = accumulate(stdin.readline(), (lambda ac, v: ac + (1 if (v == "(") else -1)), initial=0)
print(list(it).index(-1))
