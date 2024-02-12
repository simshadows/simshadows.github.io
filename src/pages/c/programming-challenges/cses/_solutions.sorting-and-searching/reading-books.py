#!/usr/bin/env python3

input()
books = sorted(int(s) for s in input().strip().split())

(kotivalo, justiina) = (0, 0)
for duration in reversed(books):
    if kotivalo > justiina:
        justiina += duration
    else:
        kotivalo += duration
print(max(kotivalo, justiina))
