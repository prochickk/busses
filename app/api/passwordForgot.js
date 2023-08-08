import client from "./client";

const passwordForgot = (email) => client.get("/passwordForgot", email);

const passwordReset = (emailpassword, onUploadProgress) => client.put("/passwordForgot", emailpassword, { 
        onUploadProgress: (progress) =>
          onUploadProgress(progress.loaded / progress.total)
});

export default {
    passwordReset,
    passwordForgot,
};
