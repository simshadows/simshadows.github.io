#!/usr/bin/env python3

input()
arr = [int(s) for s in input().strip().split()]

(solution, cur_sum, min_sum) = (arr[0], 0, 0)
for v in arr:
    cur_sum += v
    solution = max(solution, cur_sum - min_sum)
    min_sum = min(min_sum, cur_sum)
print(solution)
