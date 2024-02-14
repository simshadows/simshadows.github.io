#include <iostream>
#include <vector>
#include <unordered_map>

int main() {
    long n, target;
    std::cin >> n >> target;

    std::vector<long> nums;
    for (long i = 0; i < n; ++i) {
        long v;
        std::cin >> v;
        nums.push_back(v);
    }

    std::unordered_map<long, long> leftsums;
    leftsums.emplace(0, 1);

    long acc = 0;
    long solution = 0;
    for (const auto &v : nums) {
        acc += v;
        const long x = acc - target;
        if (leftsums.contains(x)) solution += leftsums.at(x);
        ++leftsums[acc];
    }
    std::cout << solution << std::endl;
    return 0;
}
