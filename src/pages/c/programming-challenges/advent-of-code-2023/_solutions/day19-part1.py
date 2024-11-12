#!/usr/bin/env python3

from sys import stdin
from collections import defaultdict

def evaluate_destination(raw_rules, part_data):
    for raw_rule in raw_rules:
        if ":" in raw_rule:
            (condition, send_to) = raw_rule.split(":")
            condition = condition.replace("x", str(part_data["x"]))
            condition = condition.replace("m", str(part_data["m"]))
            condition = condition.replace("a", str(part_data["a"]))
            condition = condition.replace("s", str(part_data["s"]))
            if eval(condition):
                return send_to
        else:
            return raw_rule
    raise RuntimeError()

def run(f):
    (workflows, parts) = "".join(f.readlines()).strip().split("\n\n")

    workflows = [s.split("{") for s in workflows.split()]
    workflows = {k: v[:-1].split(",") for k, v in workflows}

    parts = [[x.split("=") for x in s[1:-1].split(",")] for s in parts.split()]
    parts = [{k: int(v) for k, v in x} for x in parts]

    progress = defaultdict(set)
    progress["in"] = set(range(len(parts)))
    
    accepted = []

    while any(len(x) for x in progress.values()):
        progress2 = defaultdict(set)
        for workflow_id, cur_parts in progress.items():
            raw_rules = workflows[workflow_id]
            for part_id in cur_parts:
                send_to = evaluate_destination(raw_rules, parts[part_id])
                if send_to == "A":
                    accepted.append(parts[part_id])
                elif send_to != "R":
                    progress2[send_to].add(part_id)
        progress = progress2

    print(sum(sum(part.values()) for part in accepted))

run(stdin)
