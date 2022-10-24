import "./Game.css";
import { ethers } from "ethers";
import { StoreContext } from "../store";
import { useContext, useEffect, useState } from "react";
import AmountInput from "./AmountInput";
import useFairGameContract from "../hooks/useFairGameContract";

const Game = () => {
  const { store, setStore } = useContext(StoreContext);
  const { status, address, balance } = store;
  const fairGameContract = useFairGameContract();
  const [strategy, setStrategy] = useState("noStrategy");
  const [martingaleBetting, setMartingaleBetting] = useState(false);
  const [antiMartingaleBetting, setAntiMartingaleBetting] = useState(false);
  const [initialAmount, setInitialAmount] = useState("");
  const [amount, setAmount] = useState("");
  const [isAmountValid, setIsAmountValid] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (martingaleBetting) {
          const betTxn = await fairGameContract.bet(
            ethers.utils.parseEther(amount)
          );
          await betTxn.wait();
          const userBalance = await fairGameContract.users(address);
          if (userBalance > balance) {
            setAmount(initialAmount);
          } else {
            setAmount(String(amount * 2));
          }
          setStore({
            ...store,
            balance: Number(ethers.utils.formatEther(userBalance)).toFixed(8),
          });
        }
      } catch (error) {
        console.log(error);
        setMartingaleBetting(false);
      }
    })();
  }, [balance, martingaleBetting]);

  useEffect(() => {
    (async () => {
      try {
        if (antiMartingaleBetting) {
          const betTxn = await fairGameContract.bet(
            ethers.utils.parseEther(amount)
          );
          await betTxn.wait();
          const userBalance = await fairGameContract.users(address);
          if (userBalance > balance) {
            setAmount(String(amount * 2));
          } else {
            setAmount(initialAmount);
          }
          setStore({
            ...store,
            balance: Number(ethers.utils.formatEther(userBalance)).toFixed(8),
          });
        }
      } catch (error) {
        console.log(error);
        setAntiMartingaleBetting(false);
      }
    })();
  }, [balance, antiMartingaleBetting]);

  const onAmountInputChange = (e) => {
    const newAmount = e.target.value;
    setIsAmountValid(newAmount > 0 && /^[0-9]+(.[0-9]{0,8})?$/.test(newAmount));
    setInitialAmount(newAmount);
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
    martingale: () => {
      if (status === "connected") {
        if (amount && isAmountValid) {
          setMartingaleBetting(!martingaleBetting);
        }
      }
    },
    antiMartingale: () => {
      if (status === "connected") {
        if (amount && isAmountValid) {
          setAntiMartingaleBetting(!antiMartingaleBetting);
        }
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
