import client from "./client";

const endpoint = "/times";

const getTimes = (type) => client.get(endpoint + "?type=" + type,
console.log("type timesApi", type));

export default {
    getTimes,
  };