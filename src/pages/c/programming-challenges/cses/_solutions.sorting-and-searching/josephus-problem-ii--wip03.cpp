#include <iostream>
#include <vector>
#include <functional>

const int BIGSKIPLEN = 5;

int main() {
    long n, k;
    std::cin >> n >> k;

    long remaining = n;
    std::vector<long> skips;
    for (long i = 0; i < n; ++i) skips.push_back(i);
    const std::function<long(long)> canonical = [&](const long i){
        if (i != skips[i]) skips[i] = canonical(skips[i]);
        return skips[i];
    };

    std::vector<long> fwd;
    std::vector<long> bck;
    std::vector<long> fwdlens;
    for (long i = 0; i < n; ++i) {
        if (i % BIGSKIPLEN) {
            fwd.push_back(-1);
            bck.push_back(-1);
            fwdlens.push_back(-1);
        } else {
            bck.push_back((i + n - BIGSKIPLEN) % n);
            // TODO
            if (i + BIGSKIPLEN >= n) {
                // TODO
                fwd.push_back(0);
                fwdlens.push_back(0);
            }
        }
    }


    long cur = 0;
    for (long i = 0; i < n; ++i) {
        cur = canonical((cur + 1) % n);
        std::cout << cur + 1 << std::endl;
        skips[cur] = canonical((cur + 1) % n);
        cur = skips[cur];
    }
    return 0;
}
