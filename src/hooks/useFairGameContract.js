import { abi } from "../utils/FairGame.json";
import { ethers } from "ethers";

const useFairGameContract = () => {
  const { ethereum } = window;
  if (ethereum && ethereum.isMetaMask) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const fairGameContract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi,
      signer
    );
    return fairGameContract;
  }
  return null;
};

export default useFairGameContract;
