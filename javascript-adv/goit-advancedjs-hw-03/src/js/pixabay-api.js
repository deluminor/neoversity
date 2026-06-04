import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY ?? '';

const requestParams = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export function getImagesByQuery(query) {
  if (!API_KEY) {
    return Promise.reject(new Error('MISSING_PIXABAY_API_KEY'));
  }

  return axios
    .get(API_URL, {
      params: {
        key: API_KEY,
        q: query,
        ...requestParams,
      },
    })
    .then(response => response.data);
}
