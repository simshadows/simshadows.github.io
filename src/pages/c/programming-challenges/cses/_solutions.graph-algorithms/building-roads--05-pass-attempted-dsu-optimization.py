#!/usr/bin/env python3

from sys import stdin

(n, _) = [int(s) for s in stdin.readline().split()]

graph = [[] for _ in range(n + 1)]  # index 0 isn't used
for s in stdin.readlines():
    (a, b) = tuple(int(x) for x in s.split())
    graph[a].append(b)
    graph[b].append(a)

skips = list(range(n + 1))  # index 0 isn't used
skips[1] = 2
def canonical(i):
    if i > n:
        return 0
    elif i != skips[i]:
        skips[i] = canonical(skips[i])
    return skips[i]

def dfs(i):
    stack = [i]
    while len(stack):
        i = stack[-1]
        if len(graph[i]):
            j = graph[i].pop()
            if skips[j] == j:
                skips[j] = canonical(j + 1)
                stack.append(j)
        else:
            stack.pop()

solution = []

dfs(1)
while canonical(1) != 0:
    i = canonical(1)
    solution.append((1, i))
    skips[i] = canonical(i + 1)
    dfs(i)

print(len(solution))
print("\n".join(f"{a} {b}" for a, b in solution))
