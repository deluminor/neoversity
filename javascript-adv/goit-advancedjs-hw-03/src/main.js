import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const searchInput = form.elements['search-text'];

const messages = {
  emptyQuery: 'Please enter a search query.',
  noResults:
    'Sorry, there are no images matching your search query. Please try again!',
  requestFailed: 'Something went wrong. Please try again later.',
  missingApiKey: 'Pixabay API key is missing. Add VITE_PIXABAY_API_KEY.',
};

const toastOptions = {
  position: 'topRight',
  timeout: 3500,
  transitionIn: 'fadeInDown',
};

function showError(message) {
  iziToast.error({
    ...toastOptions,
    message,
  });
}

function handleSearchSubmit(event) {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    clearGallery();
    showError(messages.emptyQuery);
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(({ hits }) => {
      if (!hits.length) {
        showError(messages.noResults);
        return;
      }

      createGallery(hits);
    })
    .catch(error => {
      const message =
        error.message === 'MISSING_PIXABAY_API_KEY'
          ? messages.missingApiKey
          : messages.requestFailed;

      showError(message);
    })
    .finally(() => {
      hideLoader();
    });
}

form.addEventListener('submit', handleSearchSubmit);
