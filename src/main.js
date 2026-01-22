import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  loadMoreBtn,
} from './js/render-functions';
const form = document.querySelector('.form');
let totalPages = 0;
let query = '';
let page = 1;

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onMoreClick);
async function onFormSubmit(event) {
  event.preventDefault();
  query = event.target.elements['search-text'].value.trim();
  if (query === '') {
    iziToast.error({
      message: 'Please fill in the search field',
      position: 'topRight',
    });
    return;
  }
  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();
  try {
    const data = await getImagesByQuery(query, page);
    const images = data.hits;
    if (images.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }
    createGallery(images);
    totalPages = Math.ceil(data.totalHits / 15);
    if (page < totalPages) {
      showLoadMoreButton();
    }
  } catch {
    iziToast.error({
      message: 'Something went wrong. Please try again later',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
async function onMoreClick() {
  page += 1;
  hideLoadMoreButton();
  showLoader();
  try {
    const data = await getImagesByQuery(query, page);
    const images = data.hits;
    createGallery(images);
    smoothScroll();
    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch {
    iziToast.error({
      message: 'Something went wrong. Please try again later',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const card = document.querySelector('.gallery-item');
  const cardHeight = card.getBoundingClientRect().height;
  window.scrollBy({ top: cardHeight * 3, behavior: 'smooth' });
}
