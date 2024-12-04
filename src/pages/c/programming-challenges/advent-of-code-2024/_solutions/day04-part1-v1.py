#!/usr/bin/env python3

from sys import stdin

arr1 = [s.strip() for s in stdin.readlines()]
arr2 = ["".join(arr1[i][j] for i in range(len(arr1))) for j in range(len(arr1[0]))]
if len(arr2) > len(arr1):
    (arr1, arr2) = (arr2, arr1)
(len1, len2) = (len(arr1), len(arr1[0]))

arr1b = [" "*len2]*len1 + arr1 + [" "*len2] + list(reversed(arr1)) + [" "*len2]*len1
arr3 = ["".join(arr1b[x + i][i] for i in range(len2)) for x in range((len1 * 3) + 1)]
print(sum(s.count("XMAS") + s.count("SAMX") for s in arr1 + arr2 + arr3))
