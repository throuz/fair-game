const contractAddressMap = {
  development: "0x635E0B6b334BFBaE18D0F346C2D99D55078422b0",
  production: "",
};

export default contractAddressMap[import.meta.env.MODE];
