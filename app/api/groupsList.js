import client from "./client";

const endpoint = "/groupsList";

const getLists = () => {
    return client.get(endpoint, {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });
  };  

export default {
    getLists,
  };