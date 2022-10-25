import "./Information.css";
import { ethers } from "ethers";
import { StoreContext } from "../store";
import { useContext, useState } from "react";
import AmountInput from "./AmountInput";
import Balance from "./Balance";
import ConnectButton from "./ConnectButton";
import useFairGameContract from "../hooks/useFairGameContract";

const Information = () => {
  const { store, setStore } = useContext(StoreContext);
  const { status, address, balance } = store;
  const fairGameContract = useFairGameContract();
  const [amount, setAmount] = useState("");
  const [isAmountValid, setIsAmountValid] = useState(true);

  const onAmountInputChange = (e) => {
    const newAmount = e.target.value;
    setIsAmountValid(
      Number(newAmount) > 0 && /^[0-9]+(.[0-9]{0,8})?$/.test(newAmount)
    );
    setAmount(newAmount);
  };

  const onDepositClick = async () => {
    try {
      if (status === "connected") {
        if (amount && isAmountValid) {
          const metaMaskBalance = await ethereum.request({
            method: "eth_getBalance",
            params: [address],
          });
          if (
            Number(amount) <= Number(ethers.utils.formatEther(metaMaskBalance))
          ) {
            const depositTxn = await fairGameContract.deposit({
              value: ethers.utils.parseEther(amount),
            });
            await depositTxn.wait();
            const userBalance = await fairGameContract.users(address);
            setStore({
              ...store,
              balance: Number(ethers.utils.formatEther(userBalance)).toFixed(8),
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
      if (status === "connected") {
        if (amount && isAmountValid) {
          if (Number(amount) <= balance) {
            const withdrawTxn = await fairGameContract.withdraw(
              ethers.utils.parseEther(amount)
            );
            await withdrawTxn.wait();
            const userBalance = await fairGameContract.users(address);
            setStore({
              ...store,
              balance: Number(ethers.utils.formatEther(userBalance)).toFixed(8),
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
