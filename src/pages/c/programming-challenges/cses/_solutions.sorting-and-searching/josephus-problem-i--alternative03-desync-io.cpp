#include <iostream>
#include <set>

int main() {
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(NULL);
    std::cout.tie(NULL);

    long n, k;
    std::cin >> n >> k;

    std::set<long> nums;
    for (long i = 0; i < n; ++i) nums.insert(i);

    auto it = nums.begin();
    while (nums.size()) {
        ++it;
        if (it == nums.end()) it = nums.begin();
        long v0 = *it;
        std::cout << v0 + 1 << std::endl;
        ++it;
        if (it == nums.end()) it = nums.begin();
        long v1 = *it;
        nums.erase(v0);
        it = nums.find(v1);
    }
    return 0;
}
