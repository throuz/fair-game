import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1>FAIR GAME</h1>
      <div className="card">
        <button>Connect</button>
        <h2>26.5786532 BNB</h2>
        <input type="number" placeholder="Please enter deposit amount" />
        <button>Deposit</button>
        <input type="number" placeholder="Please enter withdrawal amount" />
        <button>Withdrawal</button>
      </div>
      <div className="card">
        <input type="number" placeholder="Please enter bet amount" />
        <button>Bet</button>
      </div>
    </div>
  );
};

export default App;
