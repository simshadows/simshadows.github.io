#!/usr/bin/env python3

(_, _, k) = [int(x) for x in input().strip().split()]
desired_sizes = sorted(int(x) for x in input().strip().split())
apt_sizes = sorted(int(x) for x in input().strip().split())

solution = 0
while len(desired_sizes) and len(apt_sizes):
    if apt_sizes[-1] > desired_sizes[-1] + k:
        apt_sizes.pop()
    elif apt_sizes[-1] < desired_sizes[-1] - k:
        desired_sizes.pop()
    else:
        solution += 1
        apt_sizes.pop()
        desired_sizes.pop()
print(solution)
