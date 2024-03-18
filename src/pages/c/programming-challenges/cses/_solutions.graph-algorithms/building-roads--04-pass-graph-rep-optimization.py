#!/usr/bin/env python3

from sys import stdin

(n, _) = [int(s) for s in stdin.readline().split()]

graph = [[] for _ in range(n + 1)]  # 0th index isn't used
for s in stdin.readlines():
    (a, b) = tuple(int(x) for x in s.split())
    graph[a].append(b)
    graph[b].append(a)

unseen = set(range(2, n + 1))

def dfs(i):
    stack = [i]
    while len(stack):
        i = stack[-1]
        if len(graph[i]):
            j = graph[i].pop()
            if j in unseen:
                unseen.remove(j)
                stack.append(j)
        else:
            stack.pop()

solution = []

dfs(1)
while len(unseen):
    i = unseen.pop()
    solution.append((1, i))
    dfs(i)

print(len(solution))
print("\n".join(f"{a} {b}" for a, b in solution))
