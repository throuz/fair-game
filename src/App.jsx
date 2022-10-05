import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1>FAIR GAME</h1>
      <div className="card">
        <button>Connect</button>
        <h2>Balance: 26.5786532</h2>
        <input type="number" />
        <button>Deposit</button>
        <input type="number" />
        <button>Withdrawal</button>
      </div>
      <div className="card">
        <input type="number" />
        <button>Bet</button>
      </div>
    </div>
  );
};

export default App;
