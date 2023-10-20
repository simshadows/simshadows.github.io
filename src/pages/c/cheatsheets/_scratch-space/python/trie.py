from collections import defaultdict

print("This code isn't intended to be run. It's just a reference for later.")

# These are all my own work, tested on leetcode.
# <https://leetcode.com/problems/implement-trie-prefix-tree/>

class Trie1:
    __slots__ = ["_root"]
    _DEAD = {}

    def __init__(self):
        op = lambda: defaultdict(op)
        self._root = op()

    def add(self, s):
        reduce(lambda cur, c: cur[c], s, self._root)[""] = True

    def has(self, s):
        op = lambda cur, c: cur[c] if (c in cur) else self._DEAD
        return "" in reduce(op, s, self._root)

    def starts_with(self, prefix):
        op = lambda cur, c: cur[c] if (c in cur) else self._DEAD
        return reduce(op, prefix, self._root) is not self._DEAD

class Trie2:
    __slots__ = ["_root"]

    def __init__(self):
        op = lambda: defaultdict(op)
        self._root = op()

    def add(self, s):
        reduce(lambda cur, c: cur[c], s, self._root)[""] = True

    def has(self, s):
        cur = self._root
        for c in s:
            if c not in cur:
                return False
            cur = cur[c]
        return "" in cur

    def starts_with(self, prefix):
        cur = self._root
        for c in prefix:
            if c not in cur:
                return False
            cur = cur[c]
        return True

