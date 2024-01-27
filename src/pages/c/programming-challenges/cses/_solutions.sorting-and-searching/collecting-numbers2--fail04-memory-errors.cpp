#include <iostream>
#include <map>
#include <vector>
#include <unordered_map>

int main() {
    int n, m;
    std::cin >> n >> m;

    std::vector<long> nums;
    std::vector<std::pair<long, long>> ops;

    std::unordered_map<long, long> numsmap {
        {0, n},
        {n + 1, -1},
    };

    for (int i = 0; i < n; ++i) {
        long tmp;
        std::cin >> tmp;
        nums.push_back(tmp);
        numsmap.emplace(tmp, i);
    }
    for (int i = 0; i < m; ++i) {
        long tmp1, tmp2;
        std::cin >> tmp1 >> tmp2;
        ops.emplace_back(tmp1 - 1, tmp2 - 1); // -1 to convert to 0-indexed
    }

    // <start inclusive INVERTED, end exclusive NON-INVERTED>
    std::map<long, long> intervals;

    for (const auto &v : nums) {
        const auto it = intervals.upper_bound(-v);
        if ((it != intervals.end()) && (v == (-it->first) + it->second)) {
            ++it->second;
        } else {
            intervals.emplace(-v, 1);
        }
    }

    for (const auto &[a, b] : ops) {
        auto op1 = [&](const long &x){
            const auto it = intervals.lower_bound(-x);
            const auto [start, end] = *it;
            if ((-start > x) || (-start + end <= x)) {
                throw std::runtime_error("Failed sanity check.");
            }

            if (-start == x) {
                std::cout << "a.start" << std::endl;
                it->second = x + 1;
                if (end != x + 1) {
                    intervals.emplace(start - 1, end);
                }
                std::cout << "a.end" << std::endl;
            } else if (-start + end - 1 == x) {
                std::cout << "b.start" << std::endl;
                --it->second;
                intervals.emplace(-x, x + 1);
                std::cout << "b.end" << std::endl;
            } else {
                std::cout << "c.start" << std::endl;
                it->second = x;
                intervals.emplace(-(x + 1), end);
                intervals.emplace(-x, x + 1);
                std::cout << "c.end" << std::endl;
            }
        };
        op1(a);
        op1(b);

        std::swap(numsmap[a], numsmap[b]);

        auto op2 = [&](const long &x){
            std::cout << "d.start" << std::endl;
            const auto it1 = intervals.lower_bound(-x);
            if (numsmap[x - 1] < numsmap[x]) {
                const auto it2 = intervals.upper_bound(-x);
                it2->second = it1->second;
                intervals.erase(it1);
            }
            std::cout << "d.end" << std::endl;
        };
        auto op3 = [&](const long &x){
            std::cout << "e.start" << std::endl;
            const auto it1 = intervals.lower_bound(-x);
            if (numsmap[x + 1] > numsmap[x]) {
                const auto it2 = intervals.find(it1->second);
                it1->second = it2->second;
                intervals.erase(it2);
            }
            std::cout << "e.end" << std::endl;
        };
        op2(a);
        op2(b);
        op3(a);
        op3(b);

        std::cout << intervals.size() << std::endl;
    }
    return 0;
}
