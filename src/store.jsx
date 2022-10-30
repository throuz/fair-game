import { createContext, useEffect, useState } from "react";
import chainParams from "./utils/chainParams";
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
    const errorHandle = (error) => {
      if (error.reason) {
        setStore({
          ...store,
          status: "notConnected",
          modalShow: true,
          modalText: capitalizeFirstLetter(error.reason),
        });
      } else {
        setStore({
          ...store,
          status: "notConnected",
          modalShow: true,
          modalText: "Unknown error",
        });
      }
    };

    (async () => {
      try {
        const { ethereum } = window;
        if (ethereum && ethereum.isMetaMask) {
          setStore({ ...store, status: "notConnected" });
          if (ethereum.chainId !== chainParams.chainId) {
            try {
              await ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: chainParams.chainId }],
              });
            } catch (error) {
              if (error.code === 4902) {
                try {
                  await ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [chainParams],
                  });
                } catch (error) {
                  errorHandle(error);
                }
              } else {
                errorHandle(error);
              }
            }
          } else {
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
        }
      } catch (error) {
        errorHandle(error);
      }
    })();
  }, []);

  const value = { store, setStore };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
