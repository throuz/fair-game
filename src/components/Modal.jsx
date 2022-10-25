import "./Modal.css";
import { StoreContext } from "../store";
import { useContext } from "react";
import ConnectButton from "./ConnectButton";

const Modal = () => {
  const { store, setStore } = useContext(StoreContext);
  const { status, modalShow } = store;

  const onCloseClick = () => {
    setStore({ ...store, modalShow: false });
  };

  const textMap = {
    metaMaskRequired: "Please install MetaMask",
    notConnected: "Please connect MetaMask",
  };

  return (
    <div className="modal" style={{ display: modalShow ? "block" : "none" }}>
      <div className="modal-content">
        <span className="close" onClick={onCloseClick}>
          &times;
        </span>
        <p>{textMap[status]}</p>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Modal;
