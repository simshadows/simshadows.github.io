#include <iostream>
#include <vector>
#include <functional>

int main() {
    long n, k;
    std::cin >> n >> k;

    std::vector<long> skips;
    for (long i = 0; i < n; ++i) skips.push_back(i);
    const std::function<long(long)> canonical = [&](const long i){
        if (i != skips[i]) skips[i] = canonical(skips[i]);
        return skips[i];
    };

    long cur = 0;
    for (long i = 0; i < n; ++i) {
        cur = canonical((cur + 1) % n);
        std::cout << cur + 1 << std::endl;
        skips[cur] = canonical((cur + 1) % n);
        cur = skips[cur];
    }
    return 0;
}
