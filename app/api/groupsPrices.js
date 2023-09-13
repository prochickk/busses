import client from "./client";

const endpoint = "/groupsPrices";

const getPrices = (input) => {
    return client.get(endpoint + 
        "?region=" + input.regions.name + 
        '&section=' + input.sections.section +
        '&university=' + input.universities.university, {
            onUploadProgress: (progress) =>
              onUploadProgress(progress.loaded / progress.total),
          });
  };  

export default {
    getPrices,
  };