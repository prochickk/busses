import client from "./client";

const endpoint = "/regions";

const getRegions = (driver) => client.get(endpoint + "?driverGroup=" + driver.group);

export default {
    getRegions,
  };