import "./Game.css";
import { ethers } from "ethers";
import { StoreContext } from "../store";
import { useContext, useEffect, useState } from "react";
import AmountInput from "./AmountInput";
import formatEther from "../utils/formatEther";
import useFairGameContract from "../hooks/useFairGameContract";
import useInterval from "../hooks/useInterval";

const Game = () => {
  const { store, setStore } = useContext(StoreContext);
  const { status, address, balance, history } = store;
  const fairGameContract = useFairGameContract();
  const [strategy, setStrategy] = useState("noStrategy");
  const [betResult, setBetResult] = useState("--");
  const [demoMartingaleBetting, setDemoMartingaleBetting] = useState(false);
  const [demoAntiMartingaleBetting, setDemoAntiMartingaleBetting] =
    useState(false);
  const [martingaleBetting, setMartingaleBetting] = useState(false);
  const [antiMartingaleBetting, setAntiMartingaleBetting] = useState(false);
  const [initialAmount, setInitialAmount] = useState("");
  const [amount, setAmount] = useState("");
  const [isAmountValid, setIsAmountValid] = useState(true);

  useInterval(
    () => {
      if (amount && isAmountValid && Number(amount) <= Number(balance)) {
        const isWin = Math.random() > 0.5;
        const newHistory = history.slice(0, 29);
        newHistory.unshift({
          status: isWin ? "Win" : "Lose",
          amount: Number(amount).toFixed(8),
          time: new Date().toLocaleTimeString(),
        });
        localStorage.setItem("history", JSON.stringify(newHistory));
        if (isWin) {
          setStore({
            ...store,
            balance: (Number(balance) + Number(amount)).toFixed(8),
            history: newHistory,
          });
          setBetResult("win");
          setAmount(initialAmount);
        } else {
          setStore({
            ...store,
            balance: (Number(balance) - Number(amount)).toFixed(8),
            history: newHistory,
          });
          setBetResult("lose");
          setAmount(String(amount * 2));
        }
      } else {
        setIsAmountValid(false);
        setDemoMartingaleBetting(false);
      }
    },
    demoMartingaleBetting ? 100 : null
  );

  useInterval(
    () => {
      if (amount && isAmountValid && Number(amount) <= Number(balance)) {
        const isWin = Math.random() > 0.5;
        const newHistory = history.slice(0, 29);
        newHistory.unshift({
          status: isWin ? "Win" : "Lose",
          amount: Number(amount).toFixed(8),
          time: new Date().toLocaleTimeString(),
        });
        localStorage.setItem("history", JSON.stringify(newHistory));
        if (isWin) {
          setStore({
            ...store,
            balance: (Number(balance) + Number(amount)).toFixed(8),
            history: newHistory,
          });
          setBetResult("win");
          setAmount(String(amount * 2));
        } else {
          setStore({
            ...store,
            balance: (Number(balance) - Number(amount)).toFixed(8),
            history: newHistory,
          });
          setBetResult("lose");
          setAmount(initialAmount);
        }
      } else {
        setIsAmountValid(false);
        setDemoAntiMartingaleBetting(false);
      }
    },
    demoAntiMartingaleBetting ? 100 : null
  );

  useEffect(() => {
    (async () => {
      try {
        if (martingaleBetting) {
          if (Number(amount) < Number(balance)) {
            const betTxn = await fairGameContract.bet(
              ethers.utils.parseEther(amount)
            );
            await betTxn.wait();
            const userBalance = await fairGameContract.users(address);
            const newBalance = formatEther(userBalance);
            const isWin = Number(newBalance) > Number(balance);
            const newHistory = history.slice(0, 29);
            newHistory.unshift({
              status: isWin ? "Win" : "Lose",
              amount: Number(amount).toFixed(8),
              time: new Date().toLocaleTimeString(),
            });
            localStorage.setItem("history", JSON.stringify(newHistory));
            setStore({ ...store, balance: newBalance, history: newHistory });
            if (isWin) {
              setBetResult("win");
              setAmount(initialAmount);
            } else {
              setBetResult("lose");
              setAmount(String(amount * 2));
            }
          } else {
            setIsAmountValid(false);
          }
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
          if (Number(amount) < Number(balance)) {
            const betTxn = await fairGameContract.bet(
              ethers.utils.parseEther(amount)
            );
            await betTxn.wait();
            const userBalance = await fairGameContract.users(address);
            const newBalance = formatEther(userBalance);
            const isWin = Number(newBalance) > Number(balance);
            const newHistory = history.slice(0, 29);
            newHistory.unshift({
              status: isWin ? "Win" : "Lose",
              amount: Number(amount).toFixed(8),
              time: new Date().toLocaleTimeString(),
            });
            localStorage.setItem("history", JSON.stringify(newHistory));
            setStore({ ...store, balance: newBalance, history: newHistory });
            if (isWin) {
              setBetResult("win");
              setAmount(String(amount * 2));
            } else {
              setBetResult("lose");
              setAmount(initialAmount);
            }
          } else {
            setIsAmountValid(false);
          }
        }
      } catch (error) {
        console.log(error);
        setAntiMartingaleBetting(false);
      }
    })();
  }, [balance, antiMartingaleBetting]);

  const onAmountInputChange = (e) => {
    const newAmount = e.target.value;
    setIsAmountValid(
      Number(newAmount) > 0 && /^[0-9]+(.[0-9]{0,8})?$/.test(newAmount)
    );
    setInitialAmount(newAmount);
    setAmount(newAmount);
  };

  const onBetClickMap = {
    noStrategy: async () => {
      try {
        if (status === "demo") {
          if (amount && isAmountValid && Number(amount) <= Number(balance)) {
            const isWin = Math.random() > 0.5;
            const newHistory = history.slice(0, 29);
            newHistory.unshift({
              status: isWin ? "Win" : "Lose",
              amount: Number(amount).toFixed(8),
              time: new Date().toLocaleTimeString(),
            });
            localStorage.setItem("history", JSON.stringify(newHistory));
            if (isWin) {
              setStore({
                ...store,
                balance: (Number(balance) + Number(amount)).toFixed(8),
                history: newHistory,
              });
              setBetResult("win");
            } else {
              setStore({
                ...store,
                balance: (Number(balance) - Number(amount)).toFixed(8),
                history: newHistory,
              });
              setBetResult("lose");
            }
          } else {
            setIsAmountValid(false);
          }
        }
        if (status === "metaMaskRequired" || status === "notConnected") {
          setStore({ ...store, modalShow: true });
        }
        if (status === "connected") {
          if (amount && isAmountValid) {
            if (Number(amount) < Number(balance)) {
              const betTxn = await fairGameContract.bet(
                ethers.utils.parseEther(amount)
              );
              await betTxn.wait();
              const userBalance = await fairGameContract.users(address);
              const newBalance = formatEther(userBalance);
              const isWin = Number(newBalance) > Number(balance);
              const newHistory = history.slice(0, 29);
              newHistory.unshift({
                status: isWin ? "Win" : "Lose",
                amount: Number(amount).toFixed(8),
                time: new Date().toLocaleTimeString(),
              });
              localStorage.setItem("history", JSON.stringify(newHistory));
              setStore({ ...store, balance: newBalance, history: newHistory });
              if (isWin) {
                setBetResult("win");
              } else {
                setBetResult("lose");
              }
            } else {
              setIsAmountValid(false);
            }
          } else {
            setIsAmountValid(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    martingale: () => {
      if (status === "demo") {
        if (demoMartingaleBetting) {
          setDemoMartingaleBetting(false);
        } else {
          setDemoMartingaleBetting(true);
        }
      }
      if (status === "metaMaskRequired" || status === "notConnected") {
        setStore({ ...store, modalShow: true });
      }
      if (status === "connected") {
        if (amount && isAmountValid) {
          setMartingaleBetting(true);
        } else {
          setIsAmountValid(false);
        }
      }
    },
    antiMartingale: () => {
      if (status === "demo") {
        if (demoAntiMartingaleBetting) {
          setDemoAntiMartingaleBetting(false);
        } else {
          setDemoAntiMartingaleBetting(true);
        }
      }
      if (status === "metaMaskRequired" || status === "notConnected") {
        setStore({ ...store, modalShow: true });
      }
      if (status === "connected") {
        if (amount && isAmountValid) {
          setAntiMartingaleBetting(true);
        } else {
          setIsAmountValid(false);
        }
      }
    },
  };

  const isBetting =
    demoMartingaleBetting ||
    demoAntiMartingaleBetting ||
    martingaleBetting ||
    antiMartingaleBetting;

  return (
    <div className="card">
      <h2>Game</h2>
      <div className="strategy-btn-group">
        <button
          className={`strategy-btn ${
            strategy === "noStrategy" ? "active-strategy-btn" : ""
          }`}
          disabled={isBetting}
          onClick={() => setStrategy("noStrategy")}
        >
          No Strategy
        </button>
        <button
          className={`strategy-btn ${
            strategy === "martingale" ? "active-strategy-btn" : ""
          }`}
          disabled={isBetting}
          onClick={() => setStrategy("martingale")}
        >
          Martingale
        </button>
        <button
          className={`strategy-btn ${
            strategy === "antiMartingale" ? "active-strategy-btn" : ""
          }`}
          disabled={isBetting}
          onClick={() => setStrategy("antiMartingale")}
        >
          Anti-Martingale
        </button>
      </div>
      <h2 className={betResult === "--" ? "" : `${betResult}-text`}>
        {betResult.charAt(0).toUpperCase() + betResult.slice(1)}
      </h2>
      <AmountInput
        amount={amount}
        onAmountInputChange={onAmountInputChange}
        isAmountValid={isAmountValid}
      />
      <button onClick={onBetClickMap[strategy]}>
        {isBetting ? "Stop Bet" : "Bet"}
      </button>
    </div>
  );
};

export default Game;
