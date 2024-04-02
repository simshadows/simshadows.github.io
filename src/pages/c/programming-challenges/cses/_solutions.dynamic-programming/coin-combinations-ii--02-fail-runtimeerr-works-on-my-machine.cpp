#include <iostream>
#include <vector>

constexpr long MOD = 1e9 + 7;

int main() {
    long n, targetSum;
    std::cin >> n >> targetSum;

    std::vector<long> coins;
    for (long i = 0; i < n; ++i) {
        long tmp;
        std::cin >> tmp;
        coins.push_back(tmp);
    }

    std::vector<std::vector<long>> tab(coins.size() + 1, std::vector<long>(targetSum + 1, 0));
    tab[0][0] = 1;

    for (unsigned long i = 1; i <= coins.size(); ++i) {
        const long coin = coins[i - 1];
        for (long offset = 0; offset < coin; ++offset) {
            long acc = 0;
            for (long j = offset; j <= targetSum; j += coin) {
                acc = (acc + tab[i - 1][j]) % MOD;
                tab[i][j] = acc;
            }
        }
    }

    std::cout << tab[coins.size()][targetSum] << std::endl;
    return 0;
}
