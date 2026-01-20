import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '54229947-cd8105fd48042137517a5f764';

export function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data);
}
