import { StoreContext } from "../store";
import { useContext } from "react";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

const useErrorHandle = () => {
  const { store, setStore } = useContext(StoreContext);

  const errorHandle = (error) => {
    if (error.reason) {
      setStore({
        ...store,
        modalShow: true,
        modalText: capitalizeFirstLetter(error.reason),
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
