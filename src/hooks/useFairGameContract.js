import { abi } from "../utils/FairGame.json";
import { ethers } from "ethers";
import contractAddress from "../utils/contractAddress";

const useFairGameContract = () => {
  const { ethereum } = window;
  if (ethereum && ethereum.isMetaMask) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const fairGameContract = new ethers.Contract(contractAddress, abi, signer);
    return fairGameContract;
  }
  return null;
};

export default useFairGameContract;
