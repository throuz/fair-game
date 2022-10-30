const contractAddressMap = {
  development: "0x635E0B6b334BFBaE18D0F346C2D99D55078422b0",
  production: "0x73E8bE702063532dE9850167354d161D5950C57e",
};

export default contractAddressMap[import.meta.env.MODE];
