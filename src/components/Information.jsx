import "./Information.css";
import { ethers } from "ethers";
import { StoreContext } from "../store";
import { useContext, useState } from "react";
import AmountInput from "./AmountInput";
import Balance from "./Balance";
import ConnectButton from "./ConnectButton";
import formatEther from "../utils/formatEther";
import useFairGameContract from "../hooks/useFairGameContract";

const Information = () => {
  const { store, setStore } = useContext(StoreContext);
  const { status, address, balance } = store;
  const fairGameContract = useFairGameContract();
  const [amount, setAmount] = useState("");
  const [isAmountValid, setIsAmountValid] = useState(true);

  const onSwitchAccountClick = async () => {
    if (status === "demo") {
      try {
        setStore({
          ...store,
          status: "metaMaskRequired",
          address: null,
          balance: null,
        });
        const { ethereum } = window;
        if (ethereum && ethereum.isMetaMask) {
          setStore({
            ...store,
            status: "notConnected",
            address: null,
            balance: null,
          });
          const accounts = await ethereum.request({ method: "eth_accounts" });
          if (accounts[0]) {
            const userBalance = await fairGameContract.users(accounts[0]);
            setStore({
              ...store,
              status: "connected",
              address: accounts[0],
              balance: formatEther(userBalance),
            });
          } else {
            const requestAccounts = await ethereum.request({
              method: "eth_requestAccounts",
            });
            const userBalance = await fairGameContract.users(
              requestAccounts[0]
            );
            setStore({
              ...store,
              status: "connected",
              address: requestAccounts[0],
              balance: formatEther(userBalance),
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setStore({
        ...store,
        status: "demo",
        balance: (10000).toFixed(8),
      });
    }
  };

  const onAmountInputChange = (e) => {
    const newAmount = e.target.value;
    setIsAmountValid(
      Number(newAmount) > 0 && /^[0-9]+(.[0-9]{0,8})?$/.test(newAmount)
    );
    setAmount(newAmount);
  };

  const onDepositClick = async () => {
    try {
      if (status === "demo") {
        if (amount && isAmountValid && Number(amount) <= 10000000) {
          setStore({
            ...store,
            balance: (Number(balance) + Number(amount)).toFixed(8),
          });
        } else {
          setIsAmountValid(false);
        }
      }
      if (status === "metaMaskRequired" || status === "notConnected") {
        setStore({ ...store, modalShow: true });
      }
      if (status === "connected") {
        if (amount && isAmountValid) {
          const metaMaskBalance = await ethereum.request({
            method: "eth_getBalance",
            params: [address],
          });
          if (Number(amount) <= formatEther(metaMaskBalance)) {
            const depositTxn = await fairGameContract.deposit({
              value: ethers.utils.parseEther(amount),
            });
            await depositTxn.wait();
            const userBalance = await fairGameContract.users(address);
            setStore({
              ...store,
              balance: formatEther(userBalance),
            });
            setAmount("");
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
  };

  const onWithdrawClick = async () => {
    try {
      if (status === "demo") {
        if (amount && isAmountValid && Number(amount) <= Number(balance)) {
          setStore({
            ...store,
            balance: (Number(balance) - Number(amount)).toFixed(8),
          });
        } else {
          setIsAmountValid(false);
        }
      }
      if (status === "metaMaskRequired" || status === "notConnected") {
        setStore({ ...store, modalShow: true });
      }
      if (status === "connected") {
        if (amount && isAmountValid) {
          if (Number(amount) <= Number(balance)) {
            const withdrawTxn = await fairGameContract.withdraw(
              ethers.utils.parseEther(amount)
            );
            await withdrawTxn.wait();
            const userBalance = await fairGameContract.users(address);
            setStore({
              ...store,
              balance: formatEther(userBalance),
            });
            setAmount("");
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
  };

  return (
    <div className="card">
      <h2>Information</h2>
      <ConnectButton />
      <button onClick={onSwitchAccountClick}>
        Switch to {status === "demo" ? "real" : "demo"} account
      </button>
      <Balance />
      <AmountInput
        amount={amount}
        onAmountInputChange={onAmountInputChange}
        isAmountValid={isAmountValid}
      />
      <div className="information-btn-group">
        <button onClick={onDepositClick}>Deposit</button>
        <button onClick={onWithdrawClick}>Withdraw</button>
      </div>
    </div>
  );
};

export default Information;
