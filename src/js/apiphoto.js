import axios from "axios";

  export function getPhotos(query, page) {

  const API_KEY = "41700733-d920d8ba94f63c82daa7e2416";
  axios.defaults.baseURL = "https://pixabay.com/api/";
  
  return axios.get("", {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: 40,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
    },
  });
};