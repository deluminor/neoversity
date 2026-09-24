import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  clearGallery,
  createGallery,
  hideLoadMoreButton,
  hideLoader,
  showLoadMoreButton,
  showLoader,
} from "./js/render-functions.js";

const IMAGES_PER_PAGE = 15;
const FIRST_PAGE = 1;
const LOAD_MORE_BUTTON_TEXT = "Load more";
const LOAD_MORE_LOADING_TEXT = "Loading...";

const form = document.querySelector(".form");
const searchInput = form.elements["search-text"];
const searchButton = form.querySelector(".search-button");
const loadMoreButton = document.querySelector(".load-more-button");

const state = {
  query: "",
  page: FIRST_PAGE,
  totalHits: 0,
};

const messages = {
  emptyQuery: "Please enter a search query.",
  noResults:
    "Sorry, there are no images matching your search query. Please try again!",
  requestFailed: "Something went wrong. Please try again later.",
  missingApiKey: "Pixabay API key is missing. Add VITE_PIXABAY_API_KEY.",
  endOfResults: "We're sorry, but you've reached the end of search results.",
};

const toastOptions = {
  position: "topRight",
  timeout: 3500,
  transitionIn: "fadeInDown",
};

function showError(message) {
  iziToast.error({
    ...toastOptions,
    message,
  });
}

function showInfo(message) {
  iziToast.info({
    ...toastOptions,
    message,
  });
}

function hasMoreImages() {
  return state.page * IMAGES_PER_PAGE < state.totalHits;
}

function setLoadMoreButtonLoading(isLoading) {
  loadMoreButton.textContent = isLoading
    ? LOAD_MORE_LOADING_TEXT
    : LOAD_MORE_BUTTON_TEXT;
  loadMoreButton.classList.toggle("is-loading", isLoading);
}

function setLoading(isLoading, options = {}) {
  const { isLoadMore = false } = options;

  searchButton.disabled = isLoading;
  loadMoreButton.disabled = isLoading;

  if (isLoading) {
    if (isLoadMore) {
      setLoadMoreButtonLoading(true);
      showLoadMoreButton();
      hideLoader();
      return;
    }

    setLoadMoreButtonLoading(false);
    showLoader();
    hideLoadMoreButton();
    return;
  }

  hideLoader();
  setLoadMoreButtonLoading(false);

  if (state.totalHits > 0 && hasMoreImages()) {
    showLoadMoreButton();
  }
}

function resetSearch(query) {
  state.query = query;
  state.page = FIRST_PAGE;
  state.totalHits = 0;
  clearGallery();
  hideLoadMoreButton();
  setLoadMoreButtonLoading(false);
}

function syncLoadMoreVisibility() {
  if (hasMoreImages()) {
    showLoadMoreButton();
    return;
  }

  hideLoadMoreButton();
  showInfo(messages.endOfResults);
}

async function loadImages(options = {}) {
  setLoading(true, options);

  try {
    const { hits, totalHits } = await getImagesByQuery(state.query, state.page);
    state.totalHits = totalHits;

    if (!hits.length) {
      showError(messages.noResults);
      return;
    }

    createGallery(hits);
    syncLoadMoreVisibility();
  } catch (error) {
    const message =
      error.message === "MISSING_PIXABAY_API_KEY"
        ? messages.missingApiKey
        : messages.requestFailed;

    showError(message);
  } finally {
    setLoading(false);
  }
}

async function handleSearchSubmit(event) {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    resetSearch("");
    showError(messages.emptyQuery);
    return;
  }

  resetSearch(query);
  await loadImages();
}

async function handleLoadMoreClick() {
  state.page += 1;
  await loadImages({ isLoadMore: true });
}

form.addEventListener("submit", handleSearchSubmit);
loadMoreButton.addEventListener("click", handleLoadMoreClick);
