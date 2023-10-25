import client from "./client";

const endpoint = "/payment";

export const paymentIntent = (subDetails, locations, user) => {
const data = new FormData();
data.append("group", subDetails.groupList);
data.append("userId", user.userId);
data.append("userNumber", user.mobileNumber);
data.append("groupId", subDetails.id);
data.append("price", subDetails.monthlyPrice);
data.append("university", locations.params.universities.university);
data.append("section", locations.params.sections.section);
data.append("region", locations.params.regions.name);

return client.post(endpoint + '/intents', data);
}; 
  

export default {
    paymentIntent,
  };