#!/usr/bin/env python3

from sys import stdin
from functools import reduce
from itertools import product
from operator import add, mul

arr = [s.split(":") for s in stdin.readlines()]
arr = [(int(lhs), [int(x) for x in rhs.split()]) for lhs, rhs in arr]
#for lhs, rhs in arr:
#    for ops in product([add], *([[add, mul]] * (len(rhs) - 1))):
#        print(ops)
print(sum(
    any(
        reduce((lambda ac, cur: cur[0](ac, cur[1])), zip(ops, rhs), 0) == lhs
        for ops in product([add], *([[add, mul]] * (len(rhs) - 1)))
    )
    for lhs, rhs in arr
))
    
