import { createContext, useEffect, useState } from "react";
import formatEther from "./utils/formatEther";
import useFairGameContract from "./hooks/useFairGameContract";

export const StoreContext = createContext(null);

export default ({ children }) => {
  const fairGameContract = useFairGameContract();

  const history = JSON.parse(localStorage.getItem("history"));

  const [store, setStore] = useState({
    status: "metaMaskRequired",
    address: null,
    balance: null,
    history: history ?? [],
    modalShow: false,
    modalText: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const { ethereum } = window;
        if (ethereum && ethereum.isMetaMask) {
          setStore({ ...store, status: "notConnected" });
          const accounts = await ethereum.request({ method: "eth_accounts" });
          if (accounts[0]) {
            const userBalance = await fairGameContract.users(accounts[0]);
            setStore({
              ...store,
              status: "connected",
              address: accounts[0],
              balance: formatEther(userBalance),
            });
          }
        }
      } catch (error) {
        if (error.reason) {
          setStore({
            ...store,
            modalShow: true,
            modalText: error.reason,
          });
        } else {
          setStore({
            ...store,
            modalShow: true,
            modalText: "Unknown error",
          });
        }
      }
    })();
  }, []);

  const value = { store, setStore };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
