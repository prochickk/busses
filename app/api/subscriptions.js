import client from "./client";

const endpoint = "/subscriptions";

const getSubs = (user) => {
    return client.get(endpoint + 
        "?userId=" + user.userId, {
            onUploadProgress: (progress) =>
              onUploadProgress(progress.loaded / progress.total),
          });
  };  

export default {
    getSubs,
  };