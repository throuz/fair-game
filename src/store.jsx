import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import useFairGameContract from "./hooks/useFairGameContract";

export const StoreContext = createContext(null);

export default ({ children }) => {
  const fairGameContract = useFairGameContract();
  const [store, setStore] = useState({
    status: "metaMaskRequired",
    address: null,
    balance: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const { ethereum } = window;
        if (ethereum && ethereum.isMetaMask) {
          setStore({
            status: "notConnected",
            address: null,
            balance: null,
          });
          const accounts = await ethereum.request({ method: "eth_accounts" });
          if (accounts[0]) {
            const userBalance = await fairGameContract.users(accounts[0]);
            setStore({
              status: "connected",
              address: accounts[0],
              balance: Number(ethers.utils.formatEther(userBalance)).toFixed(8),
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const value = { store, setStore };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
