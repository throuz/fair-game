import { StoreContext } from "../store";
import { useContext } from "react";

const useErrorHandle = () => {
  const { store, setStore } = useContext(StoreContext);

  const errorHandle = (error) => {
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
  };

  return errorHandle;
};

export default useErrorHandle;
