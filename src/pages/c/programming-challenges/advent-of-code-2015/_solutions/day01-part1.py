#!/usr/bin/env python3

from sys import stdin
from functools import reduce

print(reduce(lambda ac, v: (ac + (1 if v == "(" else -1)), stdin.readline().strip(), 0))
