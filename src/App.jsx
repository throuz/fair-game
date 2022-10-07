import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1>FAIR GAME</h1>
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
        <span>Please choose a strategy to auto bet or bet manually</span>
        <button>Martingale</button>
        <button>Anti-Martingale</button>
        <input type="number" placeholder="Please enter bet amount" />
        <button>Bet</button>
      </div>
      <div className="card">
        <h2>History</h2>
        <div className="history-list">
          <div className="history-msg">
            <span>Win</span>
            <span>0.00000001</span>
            <span>12:10:13</span>
          </div>
          <div className="history-msg">
            <span>Lose</span>
            <span>0.00000001</span>
            <span>12:10:13</span>
          </div>
          <div className="history-msg">
            <span>Win</span>
            <span>0.00000001</span>
            <span>12:10:13</span>
          </div>
          <div className="history-msg">
            <span>Lose</span>
            <span>0.00000001</span>
            <span>12:10:13</span>
          </div>
          <div className="history-msg">
            <span>Win</span>
            <span>0.00000001</span>
            <span>12:10:13</span>
          </div>
          <div className="history-msg">
            <span>Lose</span>
            <span>0.00000001</span>
            <span>12:10:13</span>
          </div>
          <div className="history-msg">
            <span>Win</span>
            <span>0.00000001</span>
            <span>12:10:13</span>
          </div>
          <div className="history-msg">
            <span>Lose</span>
            <span>0.00000001</span>
            <span>12:10:13</span>
          </div>
        </div>
      </div>
      <div className="card">
        <h2>How to play</h2>
        <h3>Manual Bet</h3>
        <span className="text-left">
          Enter the desired bet amount and click the bet button.
        </span>
        <h3>Auto Bet</h3>
        <span className="text-left">
          Choose a strategy and enter the bet amount, then click the bet button.
          <br />
          There are currently two strategies to choose from:
        </span>
        <h4>Martingale:</h4>
        <span className="text-left">
          If win, next bet amount is initial bet amount, if lose, next bet is
          double previous bet amount.
        </span>
        <span>E.g: Initial bet amount is 0.01 ETH</span>
        <table>
          <tr>
            <th>Status</th>
            <th>Amount</th>
            <th>Next Amount</th>
          </tr>
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
        </table>
        <h4>Anti-Martingale:</h4>
        <span className="text-left">
          If win, next bet amount is double previous bet amount, if lose, next
          bet is initial bet amount.
        </span>
        <span>E.g: Initial bet amount is 0.01 ETH</span>
        <table>
          <tr>
            <th>Status</th>
            <th>Amount</th>
            <th>Next Amount</th>
          </tr>
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
        </table>
      </div>
    </div>
  );
};

export default App;
