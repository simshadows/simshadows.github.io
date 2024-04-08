#!/usr/bin/env python3

(s1, s2) = (input(), input())

tab = [[i]*(len(s2) + 1) for i in range(1, len(s1) + 1)]
# extra row and column, useful for negative indexing
tab.append(list(range(1, len(s2) + 2)))
tab[-1][-1] = 0

for i in range(len(s1)):
    for j in range(len(s2)):
        if s1[i] == s2[j]:
            tab[i][j] = tab[i - 1][j - 1]
        else:
            tab[i][j] = 1 + min(tab[i - 1][j - 1], tab[i - 1][j], tab[i][j - 1])

print(tab[-2][-2])
