#!/usr/bin/env python3
 
n = int(input())
nums = [int(s) for s in input().split()]
 
sum_all = (n * (1 + n)) // 2
print(sum_all - sum(nums))