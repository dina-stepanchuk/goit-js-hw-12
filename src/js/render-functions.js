import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
            <a href="${largeImageURL}"
              ><img src="${webformatURL}" alt="${tags}" loading="lazy"
            /></a>
            <ul class="description">
              <li><p><span class="title-info">Likes</span>${likes}</p></li>
              <li><p><span class="title-info">Views</span>${views}</p></li>
              <li><p><span class="title-info">Comments</span>${comments}</p></li>
              <li><p><span class="title-info">Downloads</span>${downloads}</p></li>
            </ul>
          </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}
