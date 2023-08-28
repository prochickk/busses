import client from "./client";

const login = (email, password) => client.post("/auth", { email, password });
const userDelete = (email, password) => client.delete("/auth", { email, password });

export default {
  login,
  userDelete,
};
