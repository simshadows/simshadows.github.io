function L() {
    return <td style="background: #aaf;">left</td>;
}
function R() {
    return <td style="background: #faa;">right</td>;
}

export default function ValveGrayCodes() {
    return <table class="general">
        <thead>
            <tr>
                <th></th>
                <th>Valve 1</th>
                <th>Valve 2</th>
                <th>Valve 3</th>
                <th>Valve 4</th>
                <th>Valve 5</th>
            </tr>
        </thead>
        <tbody>
            <tr><th>Attempt 1</th>  <R/><R/><R/><R/><R/> </tr>
            <tr><th>Attempt 2</th>  <R/><R/><R/><R/><L/> </tr>
            <tr><th>Attempt 3</th>  <R/><R/><R/><L/><L/> </tr>
            <tr><th>Attempt 4</th>  <R/><R/><R/><L/><R/> </tr>
            <tr><th>Attempt 5</th>  <R/><R/><L/><L/><R/> </tr>
            <tr><th>Attempt 6</th>  <R/><R/><L/><L/><L/> </tr>
            <tr><th>Attempt 7</th>  <R/><R/><L/><R/><L/> </tr>
            <tr><th>Attempt 8</th>  <R/><R/><L/><R/><R/> <td>Success</td></tr>
            <tr><th>Attempt 9</th>  <R/><L/><L/><R/><R/> </tr>
            <tr><th>Attempt 10</th> <R/><L/><L/><R/><L/> </tr>
            <tr><th>Attempt 11</th> <R/><L/><L/><L/><L/> </tr>
            <tr><th>Attempt 12</th> <R/><L/><L/><L/><R/> </tr>
            <tr><th>Attempt 13</th> <R/><L/><R/><L/><R/> </tr>
            <tr><th>Attempt 14</th> <R/><L/><R/><L/><L/> </tr>
            <tr><th>Attempt 15</th> <R/><L/><R/><R/><L/> </tr>
            <tr><th>Attempt 16</th> <R/><L/><R/><R/><R/> </tr>
            <tr><th>Attempt 17</th> <L/><L/><R/><R/><R/> </tr>
            <tr><th>Attempt 18</th> <L/><L/><R/><R/><L/> </tr>
            <tr><th>Attempt 19</th> <L/><L/><R/><L/><L/> </tr>
            <tr><th>Attempt 20</th> <L/><L/><R/><L/><R/> </tr>
            <tr><th>Attempt 21</th> <L/><L/><L/><L/><R/> </tr>
            <tr><th>Attempt 22</th> <L/><L/><L/><L/><L/> </tr>
            <tr><th>Attempt 23</th> <L/><L/><L/><R/><L/> </tr>
            <tr><th>Attempt 24</th> <L/><L/><L/><R/><R/> </tr>
            <tr><th>Attempt 25</th> <L/><R/><L/><R/><R/> </tr>
            <tr><th>Attempt 26</th> <L/><R/><L/><R/><L/> </tr>
            <tr><th>Attempt 27</th> <L/><R/><L/><L/><L/> </tr>
            <tr><th>Attempt 28</th> <L/><R/><L/><L/><R/> </tr>
            <tr><th>Attempt 29</th> <L/><R/><R/><L/><R/> </tr>
            <tr><th>Attempt 30</th> <L/><R/><R/><L/><L/> </tr>
            <tr><th>Attempt 31</th> <L/><R/><R/><R/><L/> </tr>
            <tr><th>Attempt 32</th> <L/><R/><R/><R/><R/> </tr>
        </tbody>
    </table>;
}

