import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

export default ({ children }) => {
  const [store, setStore] = useState({ accountStatus: "metaMaskRequired" });

  useEffect(() => {
    (async () => {
      try {
        const { ethereum } = window;
        if (ethereum && ethereum.isMetaMask) {
          setStore({ accountStatus: "notConnected" });
          const accounts = await ethereum.request({ method: "eth_accounts" });
          if (accounts[0]) {
            setStore({ accountStatus: "connected", account: accounts[0] });
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
