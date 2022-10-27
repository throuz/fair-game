import "./Modal.css";
import { StoreContext } from "../store";
import { useContext } from "react";

const Modal = () => {
  const { store, setStore } = useContext(StoreContext);
  const { modalShow, modalText } = store;

  const onCloseClick = () => {
    setStore({ ...store, modalShow: false, modalText: null });
  };

  return (
    <div className="modal" style={{ display: modalShow ? "block" : "none" }}>
      <div className="modal-content">
        <h3 className="modal-content-text">{modalText}</h3>
        <button onClick={onCloseClick}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
