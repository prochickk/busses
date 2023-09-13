import Constants from "expo-constants";

// const settings = {
//   dev: {
//     apiUrl: "https://hafel.onrender.com/api",
//   },
//   staging: {
//     apiUrl: "https://hafel.onrender.com/api",
//   },
//   prod: {
//     apiUrl: "https://hafel.onrender.com/api",
//   },
// };

// AlJalsa
// const settings = {
//   dev: {
//     apiUrl: "http://192.168.1.223:9000/api",
//   },
//   staging: {
//     apiUrl: "http://192.168.1.223:9000/api",
//   },
//   prod: {
//     apiUrl: "http://192.168.1.223:9000/api",
//   },
// };


// Adeer tower
// const settings = {
//   dev: {
//     apiUrl: "http://172.16.1.111:9000/api",
//   },
//   staging: {
//     apiUrl: "http://172.16.1.111:9000/api",
//   },
//   prod: {
//     apiUrl: "http://172.16.1.111:9000/api",
//   },
// };

// Adeer tower Ethernet
const settings = {
  dev: {
    apiUrl: "http://172.16.1.151:9000/api",
  },
  staging: {
    apiUrl: "http://172.16.1.151:9000/api",
  },
  prod: {
    apiUrl: "http://172.16.1.151:9000/api",
  },
};

//My Iphone
// const settings = {
//   dev: {
//     apiUrl: "http://172.20.10.8:9000/api",
//   },
//   staging: {
//     apiUrl: "http://172.20.10.8:9000/api",
//   },
//   prod: {
//     apiUrl: "http://172.20.10.8:9000/api",
//   },
// };

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
