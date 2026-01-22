import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '54229947-cd8105fd48042137517a5f764';

export async function getImagesByQuery(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      page,
      per_page: 15,
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return response.data;
}
