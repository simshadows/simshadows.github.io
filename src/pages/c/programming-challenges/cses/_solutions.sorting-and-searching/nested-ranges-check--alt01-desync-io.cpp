#include <algorithm>
#include <iostream>
#include <vector>
#include <limits>
#include <ranges>

typedef std::tuple<long, long, long> Tup3;

int main() {
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(NULL);
    std::cout.tie(NULL);

    int n;
    std::cin >> n;

    std::unordered_map<long, std::vector<Tup3>> groupedMap; // grouped[start] = ranges subset
    std::unordered_map<long, std::unordered_map<long, long>> cnt; // cnt[start][end] = count
    for (int i = 0; i < n; ++i) {
        long start, end;
        std::cin >> start >> end;

        groupedMap[start].emplace_back(start, end, i);
        ++cnt[start][end];
    }

    // convert groupedMap to a vector, and sort both inner and outer
    std::vector<std::pair<long, std::vector<Tup3>>> grouped;
    for (auto &[start, lst] : groupedMap) {
        std::sort(lst.begin(), lst.end(),
            [](auto a, auto b){return std::get<1>(a) < std::get<1>(b);}
        );
        grouped.emplace_back(start, std::move(lst));
    }
    std::sort(grouped.begin(), grouped.end());

    // check if range contains another range
    std::vector<char> solution(n, '0');
    long cumMinEnd = std::numeric_limits<long>::max();
    for (auto &[start, lst] : std::ranges::reverse_view(grouped)) {
        for (auto &[_, end, i] : lst) {
            if ((cnt.at(start).at(end) > 1) || (end >= cumMinEnd)) {
                solution[i] = '1';
            }
            cumMinEnd = std::min(cumMinEnd, end);
        }
    }
    for (auto &c : solution) std::cout << c << " ";
    std::cout << std::endl;

    // check if range is contained in another range
    std::fill(solution.begin(), solution.end(), '0');
    long cumMaxEnd = 0;
    for (auto &[start, lst] : grouped) {
        for (auto &[_, end, i] : std::ranges::reverse_view(lst)) {
            if ((cnt.at(start).at(end) > 1) || (end <= cumMaxEnd)) {
                solution[i] = '1';
            }
            cumMaxEnd = std::max(cumMaxEnd, end);
        }
    }
    for (auto &c : solution) std::cout << c << " ";
    std::cout << std::endl;
    return 0;
}
