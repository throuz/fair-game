import { ethers } from "ethers";

export default (numberStr) =>
  Number(ethers.utils.formatEther(numberStr)).toFixed(4);
