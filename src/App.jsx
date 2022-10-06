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
        <h2>Game</h2>
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
    </div>
  );
};

export default App;
