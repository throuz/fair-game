import { ethers } from "ethers";
import { StoreContext } from "../store";
import { useContext, useEffect, useState } from "react";
import useFairGameContract from "../hooks/useFairGameContract";

const Balance = () => {
  const { store } = useContext(StoreContext);
  const { accountStatus } = store;
  const fairGameContract = useFairGameContract();
  const [balance, setBalance] = useState("--");

  useEffect(() => {
    (async () => {
      try {
        if (accountStatus === "connected") {
          const accounts = await ethereum.request({ method: "eth_accounts" });
          const userBalance = await fairGameContract.users(accounts[0]);
          const formatedUserBalance = ethers.utils.formatEther(userBalance);
          setBalance(Number(formatedUserBalance).toFixed(8));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [accountStatus]);

  return <h2>{`${balance} BNB`}</h2>;
};

export default Balance;
