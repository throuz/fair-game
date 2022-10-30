const chainParamsMap = {
  development: {
    chainId: "0x61",
    chainName: "BSC Testnet",
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    nativeCurrency: {
      name: "Test BNB",
      symbol: "tBNB",
      decimals: 18,
    },
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
  production: {
    chainId: "0x38",
    chainName: "BSC Mainnet",
    rpcUrls: ["https://bsc-dataseed1.binance.org"],
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    blockExplorerUrls: ["https://bscscan.com"],
  },
};

export default chainParamsMap[import.meta.env.MODE];
