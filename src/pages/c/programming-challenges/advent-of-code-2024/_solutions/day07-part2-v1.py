#!/usr/bin/env python3

from sys import stdin
from functools import reduce
from itertools import product
from operator import add, mul

conc = lambda a, b: int(str(a) + str(b))

arr = [s.split(":") for s in stdin.readlines()]
arr = [(int(lhs), [int(x) for x in rhs.split()]) for lhs, rhs in arr]
print(sum(
    lhs for lhs, rhs in arr
    if any(
        reduce((lambda ac, cur: cur[0](ac, cur[1])), zip(ops, rhs), 0) == lhs
        for ops in product([add], *([[add, mul, conc]] * (len(rhs) - 1)))
    )
))
