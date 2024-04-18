package main

import (
    "fmt"
    "time"
)

func main() {
    v := 0

    producer := func() {
        for i := 0; i < 5; i++ {
            tmp := v + 1
            time.Sleep(time.Millisecond)
            fmt.Println(tmp)
            v = tmp
        }
    }

    go producer()
    go producer()
    go producer()

    time.Sleep(time.Second)
}
