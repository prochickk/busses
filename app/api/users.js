import client from "./client";

const endpoint = "/users";

const getUser = (user) => client.get("/user/" + user.userId);

export const register = (userInfo) => {
    const data = new FormData();
    data.append("name", userInfo.name)
    data.append("email", userInfo.email)
    data.append("mobileNumber", userInfo.mobileNumber)
    data.append("groupCateLabel", userInfo.groupCate.groupList)
    data.append("password", userInfo.password)
    return client.post(endpoint, data);}

export default { register, getUser};
