import { StoreContext } from "../store";
import { useContext } from "react";

const Balance = () => {
  const { store } = useContext(StoreContext);
  const { balance } = store;

  return <h2>{`${balance ?? "--"} BNB`}</h2>;
};

export default Balance;
