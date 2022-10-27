import client from "./client";

const endpoint = "/listings";

const getListings = (user) => client.get("/listings?userId=" + user[1].userId + "&day=" + user[0]);

export const addListing = (listing) => {
  const data = new FormData();
  data.append("typeCateLabelListing", listing.tripType);
  data.append("timeCateLabelListing", listing.tripTime);
  data.append("addressCateIdListing", listing.address);
  data.append("addressRegionListing", listing.addressRegion);
  data.append("dayCateLabelListing", listing.tripDay);
  data.append("descriptionListing", listing.description);
  data.append("groupListing", listing.user.group);
  data.append("useId", listing.user.userId);

  return client.post(endpoint, data);
};
export const deleteListing = (listing, onUploadProgress) => {

  return client.delete("/listings?listingId=" + listing.item.idListing, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });

};

export default {
  deleteListing,
  addListing,
  getListings,
};
