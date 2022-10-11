const Game = () => {
  return (
    <div className="card">
      <h2>Game</h2>
      <button>No Strategy</button>
      <button>Martingale</button>
      <button>Anti-Martingale</button>
      <h2>--</h2>
      <input type="number" placeholder="Please enter bet amount" />
      <button>Bet</button>
    </div>
  );
};

export default Game;
