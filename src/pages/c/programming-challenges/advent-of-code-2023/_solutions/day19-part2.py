#!/usr/bin/env python3

from sys import stdin

LOW_BOUND = 1
HIGH_BOUND = 4001

def new_range():
    return {s: [LOW_BOUND, HIGH_BOUND] for s in "xmas"}
def copy_range(x):
    return {k: v.copy() for k, v in x.items()}
def range_union(a, b): # can return None if empty union
    ret = {k: [max(a[k][0], b[k][0]), min(a[k][1], b[k][1])] for k in a.keys()}
    if any(hi <= lo for lo, hi in ret.values()):
        return None
    return ret

def parse_rules(raw_rules):
    out = []
    cur1 = new_range()
    raw_rules = raw_rules.split(",")
    for raw_rule in raw_rules:
        if ":" in raw_rule:
            (condition, label) = raw_rule.split(":")
            cur2 = copy_range(cur1)
            if "<" in condition:
                (var, boundary) = condition.split("<")
                boundary = int(boundary)
                cur2[var] = [cur1[var][0], boundary]
                cur1[var] = [boundary, cur1[var][1]]
                out.append((label, cur2))
            elif ">" in condition:
                (var, boundary) = condition.split(">")
                boundary = int(boundary)
                cur2[var] = [boundary + 1, cur1[var][1]]
                cur1[var] = [cur1[var][0], boundary + 1]
                out.append((label, cur2))
            else:
                raise RuntimeError("Unexpected operator")

            if (cur1[var][1] <= cur1[var][0]) or (cur2[var][1] <= cur2[var][0]):
                raise RuntimeError("Bad range")
        else:
            out.append((raw_rule, cur1))
    return out

def run(f):
    (workflows, _) = "".join(f.readlines()).strip().split("\n\n")

    workflows = [s.split("{") for s in workflows.split()]
    workflows = {k: parse_rules(v[:-1]) for k, v in workflows}

    accepted_ranges = []

    total_combos = 0
    def dfs(label, cur_range):
        nonlocal total_combos
        for nxt_label, condition_range in workflows[label]:
            union = range_union(cur_range, condition_range)
            if (not union) or (nxt_label == "R"):
                continue
            elif nxt_label == "A":
                accepted_ranges.append(union)
                # reduce is unnecessarily complicated for this, but it works lol
                #total_combos += reduce(
                #    lambda ac, cur: ac * (cur[1] - cur[0]),
                #    union.values(),
                #    1
                #)
                total_combos += (
                    (union["x"][1] - union["x"][0])
                    * (union["m"][1] - union["m"][0])
                    * (union["a"][1] - union["a"][0])
                    * (union["s"][1] - union["s"][0])
                )
            else:
                dfs(nxt_label, union)
    dfs("in", new_range())

    print(total_combos)

run(stdin)
