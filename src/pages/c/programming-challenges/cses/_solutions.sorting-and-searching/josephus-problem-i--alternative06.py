#!/usr/bin/env python3

n = int(input())

cur = list(range(1, n + 1))
do_print = False
while len(cur):
    lo = 0
    for hi in range(len(cur)):
        if do_print:
            print(cur[hi])
        else:
            cur[lo] = cur[hi]
            lo += 1
        do_print = (do_print == False)
    del cur[lo:]
