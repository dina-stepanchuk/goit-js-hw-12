import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);
function onFormSubmit(event) {
  event.preventDefault();
  const query = event.target.elements['search-text'].value.trim();
  if (query === '') {
    iziToast.error({
      message: 'Please fill in the search field',
      position: 'topRight',
    });
    return;
  }
  clearGallery();
  showLoader();

  setTimeout(() => {
    getImagesByQuery(query)
      .then(data => {
        const images = data.hits;
        if (images.length === 0) {
          iziToast.warning({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            color: 'red',
            position: 'topRight',
          });
          return;
        }
        createGallery(images);
      })
      .catch(error => {
        iziToast.error({
          message: 'Something went wrong. Please try again later',
          position: 'topRight',
        });
      })
      .finally(() => {
        hideLoader();
      });
  }, 1000);
}
