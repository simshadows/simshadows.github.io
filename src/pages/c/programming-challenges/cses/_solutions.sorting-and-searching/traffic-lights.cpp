#include <iostream>
#include <set>
#include <vector>

int main() {
    int x, n;
    std::vector<long> p;

    std::cin >> x >> n;
    for (int i = 0; i < n; ++i) {
        long tmp;
        std::cin >> tmp;
        p.push_back(tmp);
    }

    std::multiset<long> lengths {x};
    std::set<long> segments {0, x};
    for (const auto &mid : p) {
        auto it = segments.upper_bound(mid);
        const long hi = *it;
        const long lo = *(--it);
        lengths.erase(lengths.find(hi - lo));
        lengths.insert(mid - lo);
        lengths.insert(hi - mid);
        segments.insert(mid);
        std::cout << *lengths.rbegin() << std::endl;
    }
    return 0;
}
