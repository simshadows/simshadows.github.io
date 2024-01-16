#include <iostream>

int main() {
    int n;
    std::cin >> n;

    unsigned long long head = 1;
    int trailing = 0;
    for (int k = 1; k <= n; ++k) {
        //std::cout << k << std::endl;
        head *= k;
        while (!(head % 10)) {
            ++trailing;
            head /= 10;
        }
        head = head % 1000000000;
    }
    std::cout << trailing << std::endl;
    return 0;
}

