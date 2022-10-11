import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1 className="title">FAIR GAME</h1>
      <div className="container">
        <div className="card">
          <h2>Information</h2>
          <button>Connect</button>
          <h2>26.57865327 BNB</h2>
          <input type="number" placeholder="Please enter deposit amount" />
          <button>Deposit</button>
          <input type="number" placeholder="Please enter withdrawal amount" />
          <button>Withdrawal</button>
        </div>
        <div className="card">
          <h2>Bet</h2>
          <span>Please choose a strategy</span>
          <button>No Strategy</button>
          <button>Martingale</button>
          <button>Anti-Martingale</button>
          <h2>--</h2>
          <input type="number" placeholder="Please enter bet amount" />
          <button>Bet</button>
        </div>
        <div className="card">
          <h2>History</h2>
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Amount</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Win</td>
                <td>0.00000001</td>
                <td>12:10:13</td>
              </tr>
              <tr>
                <td>Lose</td>
                <td>0.00000001</td>
                <td>12:10:13</td>
              </tr>
              <tr>
                <td>Win</td>
                <td>0.00000001</td>
                <td>12:10:13</td>
              </tr>
              <tr>
                <td>Lose</td>
                <td>0.00000001</td>
                <td>12:10:13</td>
              </tr>
              <tr>
                <td>Win</td>
                <td>0.00000001</td>
                <td>12:10:13</td>
              </tr>
              <tr>
                <td>Lose</td>
                <td>0.00000001</td>
                <td>12:10:13</td>
              </tr>
              <tr>
                <td>Win</td>
                <td>0.00000001</td>
                <td>12:10:13</td>
              </tr>
              <tr>
                <td>Lose</td>
                <td>0.00000001</td>
                <td>12:10:13</td>
              </tr>
              <tr>
                <td>Win</td>
                <td>0.00000001</td>
                <td>12:10:13</td>
              </tr>
              <tr>
                <td>Lose</td>
                <td>0.00000001</td>
                <td>12:10:13</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card">
          <h2>How to play</h2>
          <span className="text-left">
            Enter the desired bet amount and click the bet button, if the number
            is greater than 50, is win and you will get double bet amount. Every
            bet has a 50% chance of winning. There are three strategies to
            choose from:
          </span>
          <h3>No Strategy</h3>
          <span>Manual betting, required for each bet.</span>
          <h3>Martingale</h3>
          <span className="text-left">
            Automatic betting, which can be stopped at any time. If win, next
            bet amount is initial bet amount, if lose, next bet is double
            previous bet amount.
          </span>
          <span>E.g: Initial bet amount is 0.01 ETH</span>
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Amount</th>
                <th>Next Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Win</td>
                <td>0.01</td>
                <td>0.01</td>
              </tr>
              <tr>
                <td>Lose</td>
                <td>0.01</td>
                <td>0.02</td>
              </tr>
              <tr>
                <td>Lose</td>
                <td>0.02</td>
                <td>0.04</td>
              </tr>
              <tr>
                <td>Lose</td>
                <td>0.04</td>
                <td>0.08</td>
              </tr>
              <tr>
                <td>Win</td>
                <td>0.08</td>
                <td>0.01</td>
              </tr>
              <tr>
                <td>Win</td>
                <td>0.01</td>
                <td>0.01</td>
              </tr>
            </tbody>
          </table>
          <h3>Anti-Martingale</h3>
          <span className="text-left">
            Automatic betting, which can be stopped at any time. If win, next
            bet amount is double previous bet amount, if lose, next bet is
            initial bet amount.
          </span>
          <span>E.g: Initial bet amount is 0.01 ETH</span>
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Amount</th>
                <th>Next Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Win</td>
                <td>0.01</td>
                <td>0.02</td>
              </tr>
              <tr>
                <td>Lose</td>
                <td>0.02</td>
                <td>0.01</td>
              </tr>
              <tr>
                <td>Lose</td>
                <td>0.01</td>
                <td>0.01</td>
              </tr>
              <tr>
                <td>Win</td>
                <td>0.01</td>
                <td>0.02</td>
              </tr>
              <tr>
                <td>Win</td>
                <td>0.02</td>
                <td>0.04</td>
              </tr>
              <tr>
                <td>Win</td>
                <td>0.04</td>
                <td>0.08</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
