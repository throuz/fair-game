import "./Game.css";
import { ethers } from "ethers";
import { StoreContext } from "../store";
import { useContext, useState } from "react";
import AmountInput from "./AmountInput";
import useFairGameContract from "../hooks/useFairGameContract";

const Game = () => {
  const { store, setStore } = useContext(StoreContext);
  const { status, address } = store;
  const fairGameContract = useFairGameContract();
  const [strategy, setStrategy] = useState("noStrategy");
  const [amount, setAmount] = useState("");
  const [isAmountValid, setIsAmountValid] = useState(true);

  const onAmountInputChange = (e) => {
    const newAmount = e.target.value;
    setIsAmountValid(newAmount > 0 && /^[0-9]+(.[0-9]{0,8})?$/.test(newAmount));
    setAmount(newAmount);
  };

  const onBetClickMap = {
    noStrategy: async () => {
      try {
        if (status === "connected") {
          if (amount && isAmountValid) {
            const betTxn = await fairGameContract.bet(
              ethers.utils.parseEther(amount)
            );
            await betTxn.wait();
            const userBalance = await fairGameContract.users(address);
            setStore({
              ...store,
              balance: Number(ethers.utils.formatEther(userBalance)).toFixed(8),
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    martingale: async () => {
      try {
        if (status === "connected") {
          if (amount && isAmountValid) {
            const betTxn = await fairGameContract.bet(
              ethers.utils.parseEther(amount)
            );
            await betTxn.wait();
            const userBalance = await fairGameContract.users(address);
            setStore({
              ...store,
              balance: Number(ethers.utils.formatEther(userBalance)).toFixed(8),
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    antiMartingale: async () => {
      try {
        if (status === "connected") {
          if (amount && isAmountValid) {
            const betTxn = await fairGameContract.bet(
              ethers.utils.parseEther(amount)
            );
            await betTxn.wait();
            const userBalance = await fairGameContract.users(address);
            setStore({
              ...store,
              balance: Number(ethers.utils.formatEther(userBalance)).toFixed(8),
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  };

  return (
    <div className="card">
      <h2>Game</h2>
      <div className="strategy-btn-group">
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
      </div>
      <h2>--</h2>
      <AmountInput
        amount={amount}
        onAmountInputChange={onAmountInputChange}
        isAmountValid={isAmountValid}
      />
      <button onClick={onBetClickMap[strategy]}>Bet</button>
    </div>
  );
};

export default Game;
