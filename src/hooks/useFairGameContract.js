import { abi } from "../utils/FairGame.json";
import { ethers } from "ethers";

const useFairGameContract = () => {
  const { ethereum } = window;
  if (ethereum && ethereum.isMetaMask) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const fairGameContract = new ethers.Contract(
      "0x25629526244AE93c786FD4b471AC89c92c8D6Ef7",
      abi,
      signer
    );
    return fairGameContract;
  }
  return null;
};

export default useFairGameContract;
