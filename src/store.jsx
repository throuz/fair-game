import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

export default ({ children }) => {
  const [store, setStore] = useState({ accountStatus: "metaMaskRequired" });

  useEffect(() => {
    (async () => {
      const { ethereum } = window;
      if (ethereum && ethereum.isMetaMask) {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        const account = accounts[0];
        if (account) {
          setStore({ accountStatus: "connected", account });
        } else {
          setStore({ accountStatus: "notConnected" });
        }
      }
    })();
  }, []);

  const value = { store, setStore };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
