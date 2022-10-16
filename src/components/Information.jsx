import "./Information.css";
import { ethers } from "ethers";
import { StoreContext } from "../store";
import { useContext, useState } from "react";
import Balance from "./Balance";
import ConnectButton from "./ConnectButton";
import useFairGameContract from "../hooks/useFairGameContract";

const Information = () => {
  const { store } = useContext(StoreContext);
  const { accountStatus } = store;
  const fairGameContract = useFairGameContract();
  const [amount, setAmount] = useState("");
  const [isAmountValid, setIsAmountValid] = useState(true);

  const onAmountInputChange = (e) => {
    const newAmount = e.target.value;
    setIsAmountValid(newAmount > 0 && /^[0-9]+(.[0-9]{0,8})?$/.test(newAmount));
    setAmount(newAmount);
  };

  const onDepositClick = async () => {
    try {
      if (accountStatus === "connected") {
        if (isAmountValid) {
          const depositTxn = await fairGameContract.deposit({
            value: ethers.utils.parseEther(amount),
          });
          await depositTxn.wait();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onWithdrawalClick = async () => {
    try {
      if (accountStatus === "connected") {
        if (isAmountValid) {
          const withdrawalTxn = await fairGameContract.withdrawal(
            ethers.utils.parseEther(amount)
          );
          await withdrawalTxn.wait();
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
      <div>
        <input
          type="number"
          placeholder="Please enter amount"
          value={amount}
          onChange={onAmountInputChange}
        />
        {!isAmountValid && (
          <div className="input-error-msg">Please enter a valid amount</div>
        )}
      </div>
      <div className="information-btn-group">
        <button onClick={onDepositClick}>Deposit</button>
        <button onClick={onWithdrawalClick}>Withdrawal</button>
      </div>
    </div>
  );
};

export default Information;
