#include <algorithm>
#include <iostream>
#include <vector>
#include <map>
#include <limits>
#include <ranges>
#include <queue>

typedef std::tuple<long, long, long> Tup3; // (start, end, index)
typedef std::pair<long, long> Range; // (start, end)

struct RangeNode {
    long start;
    long end;
    long idx;
    std::map<long, *RangeNode> subnodes; // start node --> RangeNode
};

// Only works if `ranges` is sorted.
std::map<long, long> makeStartsCumulativeCountReversed(std::vector<Tup3> ranges) {
    std::map<long, long> cumCount;
    cumCount.emplace(std::get<1>(*ranges.rbegin()) + 1, 0);

    long prevStart = std::get<0>(*ranges.rbegin());
    long curCount = 0;
    for (auto &[start, _, __] : std::ranges::reverse_view(ranges)) {
        if (start != prevStart) {
            cumCount.emplace(prevStart, curCount);
            prevStart = start;
        }
        ++curCount;
    }
    cumCount.emplace(prevStart, curCount);

    for (auto &v : cumCount) {
        std::cout << v.first << " " << v.second << std::endl;
    }
    std::cout << std::endl;
    return cumCount;
}

int main() {
    int n;
    std::cin >> n;

    std::vector<Tup3> ranges;
    //std::unordered_map<long, std::vector<Tup3>> groupedMap; // grouped[start] = ranges subset
    //std::unordered_map<long, std::unordered_map<long, long>> cnt; // cnt[start][end] = count
    for (int i = 0; i < n; ++i) {
        long start, end;
        std::cin >> start >> end;

        ranges.emplace_back(start, end, i);
        //groupedMap[start].emplace_back(start, end, i);
        //++cnt[start][end];
    }

    std::sort(ranges.begin(), ranges.end(),
        [](auto a, auto b){return std::get<0>(a) < std::get<0>(b);}
    );
    std::map<long, long> cumCount = makeStartsCumulativeCountReversed(ranges);
    std::vector<long> solution(n, 0);
    for (auto &[start, end, i] : ranges) {
        // TODO: This is obviously wrong. Needs more work.
        solution[i] = cumCount.lower_bound(start)->second - cumCount.upper_bound(end)->second;
    }

    for (auto &v : solution) {
        std::cout << v << std::endl;
    }

    return 0;
}
