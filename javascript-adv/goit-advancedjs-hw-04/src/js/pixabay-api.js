import axios from "axios";

const API_URL = "https://pixabay.com/api/";
const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY ?? "";
const IMAGES_PER_PAGE = 15;

const requestParams = {
  image_type: "photo",
  orientation: "horizontal",
  safesearch: true,
  per_page: IMAGES_PER_PAGE,
};

export async function getImagesByQuery(query, page) {
  if (!API_KEY) {
    throw new Error("MISSING_PIXABAY_API_KEY");
  }

  const response = await axios.get(API_URL, {
    params: {
      key: API_KEY,
      q: query,
      page,
      ...requestParams,
    },
  });

  return response.data;
}
