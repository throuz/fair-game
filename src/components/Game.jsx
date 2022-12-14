import "./Game.css";
import { ethers } from "ethers";
import { StoreContext } from "../store";
import { useContext, useEffect, useState } from "react";
import AmountInput from "./AmountInput";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import formatEther from "../utils/formatEther";
import useErrorHandle from "../hooks/useErrorHandle";
import useFairGameContract from "../hooks/useFairGameContract";
import useInterval from "../hooks/useInterval";

const Game = () => {
  const errorHandle = useErrorHandle();
  const { store, setStore } = useContext(StoreContext);
  const { status, address, balance, history } = store;
  const fairGameContract = useFairGameContract();
  const [strategy, setStrategy] = useState("noStrategy");
  const [betStatus, setBetStatus] = useState("--");
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
        setBetStatus("waiting");
        const isWin = Math.random() > 0.5;
        const newHistory = history.slice(0, 29);
        newHistory.unshift({
          status: isWin ? "Win" : "Lose",
          amount: Number(amount).toFixed(4),
          time: new Date().toLocaleTimeString(),
        });
        localStorage.setItem("history", JSON.stringify(newHistory));
        if (isWin) {
          setStore({
            ...store,
            balance: (Number(balance) + Number(amount)).toFixed(4),
            history: newHistory,
          });
          setBetStatus("win");
          setAmount(initialAmount);
        } else {
          setStore({
            ...store,
            balance: (Number(balance) - Number(amount)).toFixed(4),
            history: newHistory,
          });
          setBetStatus("lose");
          setAmount(String(amount * 2));
        }
      } else {
        setBetStatus("--");
        setIsAmountValid(false);
        setDemoMartingaleBetting(false);
      }
    },
    demoMartingaleBetting ? 100 : null
  );

  useInterval(
    () => {
      if (amount && isAmountValid && Number(amount) <= Number(balance)) {
        setBetStatus("waiting");
        const isWin = Math.random() > 0.5;
        const newHistory = history.slice(0, 29);
        newHistory.unshift({
          status: isWin ? "Win" : "Lose",
          amount: Number(amount).toFixed(4),
          time: new Date().toLocaleTimeString(),
        });
        localStorage.setItem("history", JSON.stringify(newHistory));
        if (isWin) {
          setStore({
            ...store,
            balance: (Number(balance) + Number(amount)).toFixed(4),
            history: newHistory,
          });
          setBetStatus("win");
          setAmount(String(amount * 2));
        } else {
          setStore({
            ...store,
            balance: (Number(balance) - Number(amount)).toFixed(4),
            history: newHistory,
          });
          setBetStatus("lose");
          setAmount(initialAmount);
        }
      } else {
        setBetStatus("--");
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
            setBetStatus("waiting");
            await betTxn.wait();
            const userBalance = await fairGameContract.users(address);
            const newBalance = formatEther(userBalance);
            const isWin = Number(newBalance) > Number(balance);
            const newHistory = history.slice(0, 29);
            newHistory.unshift({
              status: isWin ? "Win" : "Lose",
              amount: Number(amount).toFixed(4),
              time: new Date().toLocaleTimeString(),
            });
            localStorage.setItem("history", JSON.stringify(newHistory));
            setStore({ ...store, balance: newBalance, history: newHistory });
            if (isWin) {
              setBetStatus("win");
              setAmount(initialAmount);
            } else {
              setBetStatus("lose");
              setAmount(String(amount * 2));
            }
          } else {
            setIsAmountValid(false);
          }
        }
      } catch (error) {
        errorHandle(error);
        setBetStatus("--");
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
            setBetStatus("waiting");
            await betTxn.wait();
            const userBalance = await fairGameContract.users(address);
            const newBalance = formatEther(userBalance);
            const isWin = Number(newBalance) > Number(balance);
            const newHistory = history.slice(0, 29);
            newHistory.unshift({
              status: isWin ? "Win" : "Lose",
              amount: Number(amount).toFixed(4),
              time: new Date().toLocaleTimeString(),
            });
            localStorage.setItem("history", JSON.stringify(newHistory));
            setStore({ ...store, balance: newBalance, history: newHistory });
            if (isWin) {
              setBetStatus("win");
              setAmount(String(amount * 2));
            } else {
              setBetStatus("lose");
              setAmount(initialAmount);
            }
          } else {
            setIsAmountValid(false);
          }
        }
      } catch (error) {
        errorHandle(error);
        setBetStatus("--");
        setAntiMartingaleBetting(false);
      }
    })();
  }, [balance, antiMartingaleBetting]);

  const onAmountInputChange = (e) => {
    const newAmount = e.target.value;
    setIsAmountValid(
      Number(newAmount) > 0 && /^[0-9]+(.[0-9]{0,4})?$/.test(newAmount)
    );
    setInitialAmount(newAmount);
    setAmount(newAmount);
  };

  const onBetClickMap = {
    noStrategy: async () => {
      try {
        if (status === "demo") {
          if (amount && isAmountValid && Number(amount) <= Number(balance)) {
            setBetStatus("waiting");
            const isWin = Math.random() > 0.5;
            const newHistory = history.slice(0, 29);
            newHistory.unshift({
              status: isWin ? "Win" : "Lose",
              amount: Number(amount).toFixed(4),
              time: new Date().toLocaleTimeString(),
            });
            localStorage.setItem("history", JSON.stringify(newHistory));
            if (isWin) {
              setStore({
                ...store,
                balance: (Number(balance) + Number(amount)).toFixed(4),
                history: newHistory,
              });
              setBetStatus("win");
            } else {
              setStore({
                ...store,
                balance: (Number(balance) - Number(amount)).toFixed(4),
                history: newHistory,
              });
              setBetStatus("lose");
            }
          } else {
            setBetStatus("--");
            setIsAmountValid(false);
          }
        }
        if (status === "metaMaskRequired") {
          setStore({
            ...store,
            modalShow: true,
            modalText: "Please install MetaMask",
          });
        }
        if (status === "notConnected") {
          setStore({
            ...store,
            modalShow: true,
            modalText: "Please connect MetaMask",
          });
        }
        if (status === "connected") {
          if (amount && isAmountValid) {
            if (Number(amount) < Number(balance)) {
              const betTxn = await fairGameContract.bet(
                ethers.utils.parseEther(amount)
              );
              setBetStatus("waiting");
              await betTxn.wait();
              const userBalance = await fairGameContract.users(address);
              const newBalance = formatEther(userBalance);
              const isWin = Number(newBalance) > Number(balance);
              const newHistory = history.slice(0, 29);
              newHistory.unshift({
                status: isWin ? "Win" : "Lose",
                amount: Number(amount).toFixed(4),
                time: new Date().toLocaleTimeString(),
              });
              localStorage.setItem("history", JSON.stringify(newHistory));
              setStore({ ...store, balance: newBalance, history: newHistory });
              if (isWin) {
                setBetStatus("win");
              } else {
                setBetStatus("lose");
              }
            } else {
              setIsAmountValid(false);
            }
          } else {
            setIsAmountValid(false);
          }
        }
      } catch (error) {
        errorHandle(error);
        setBetStatus("--");
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
      if (status === "metaMaskRequired") {
        setStore({
          ...store,
          modalShow: true,
          modalText: "Please install MetaMask",
        });
      }
      if (status === "notConnected") {
        setStore({
          ...store,
          modalShow: true,
          modalText: "Please connect MetaMask",
        });
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
      if (status === "metaMaskRequired") {
        setStore({
          ...store,
          modalShow: true,
          modalText: "Please install MetaMask",
        });
      }
      if (status === "notConnected") {
        setStore({
          ...store,
          modalShow: true,
          modalText: "Please connect MetaMask",
        });
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
    <section className="card">
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
      <h2 className={betStatus === "--" ? "" : `${betStatus}-text`}>
        {capitalizeFirstLetter(betStatus)}
      </h2>
      <AmountInput
        amount={amount}
        onAmountInputChange={onAmountInputChange}
        isAmountValid={isAmountValid}
      />
      <button onClick={onBetClickMap[strategy]}>
        {isBetting ? "Stop Auto Bet" : "Bet"}
      </button>
    </section>
  );
};

export default Game;
