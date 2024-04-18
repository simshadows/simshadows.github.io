package main

import (
    "fmt"
    "sync"
    "time"
)

func main() {
    var m sync.Mutex
    v := 0

    producer := func() {
        for i := 0; i < 3; i++ {
            m.Lock()
            tmp := v + 1
            time.Sleep(time.Millisecond)
            fmt.Println(tmp)
            v = tmp
            m.Unlock()
        }
    }

    go producer()
    go producer()
    go producer()

    time.Sleep(time.Second)
}
