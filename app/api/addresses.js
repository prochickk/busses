import client from "./client";

const endpoint = "/addresses";

const getAddresses = (user) => client.get("/addresses?userId=" + user.userId);

export const addAddress = (address, onUploadProgress) => {
  const data = new FormData();
  data.append("name", address.name);
  data.append("nearLocCateLabel", address.nearLocCate.name);
  data.append("useId", address.user.userId);
  data.append("location", JSON.stringify(address.location));
  
  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};
export const deleteAddress = (address, onUploadProgress) => {

  return client.delete("/addresses?addressId=" + address.item.idAddress, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });

};

export default {
  deleteAddress,
  addAddress,
  getAddresses,
};
