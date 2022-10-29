const chainParamsMap = {
  development: {
    chainId: "0x61",
    chainName: "BSC testnet",
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    nativeCurrency: {
      name: "Test BNB",
      symbol: "tBNB",
      decimals: 18,
    },
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
  production: {},
};

export default chainParamsMap[import.meta.env.MODE];
