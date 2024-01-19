#include <iostream>
#include <vector>

int main() {
    long n;
    std::cin >> n;

    std::vector<std::pair<long, int>> difs;
    for (long i = 0; i < n; ++i) {
        long start, end;
        std::cin >> start >> end;
        difs.emplace_back(start, 1);
        difs.emplace_back(end, -1);
    }
    std::sort(difs.begin(), difs.end());

    long cur_t = 0;
    long cur_cust = 0;
    long prev_max = 0;
    for (auto [t, v] : difs) {
        if (t != cur_t) {
            prev_max = std::max(prev_max, cur_cust);
            cur_t = t;
        }
        cur_cust += v;
    }
    std::cout << std::max(prev_max, cur_cust) << std::endl;
    return 0;
}
