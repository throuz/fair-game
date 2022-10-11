import "./Game.css";
import { useState } from "react";

const Game = () => {
  const [strategy, setStrategy] = useState("noStrategy");

  return (
    <div className="card">
      <h2>Game</h2>
      <button
        className={`strategy-btn ${
          strategy === "noStrategy" ? "active-strategy-btn" : ""
        }`}
        onClick={() => setStrategy("noStrategy")}
      >
        No Strategy
      </button>
      <button
        className={`strategy-btn ${
          strategy === "martingale" ? "active-strategy-btn" : ""
        }`}
        onClick={() => setStrategy("martingale")}
      >
        Martingale
      </button>
      <button
        className={`strategy-btn ${
          strategy === "antiMartingale" ? "active-strategy-btn" : ""
        }`}
        onClick={() => setStrategy("antiMartingale")}
      >
        Anti-Martingale
      </button>
      <h2>--</h2>
      <input type="number" placeholder="Please enter bet amount" />
      <button>Bet</button>
    </div>
  );
};

export default Game;
