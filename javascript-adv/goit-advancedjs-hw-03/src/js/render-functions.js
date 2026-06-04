import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function createGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  const safeTags = escapeHtml(tags);

  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${escapeHtml(largeImageURL)}">
        <img class="gallery-image" src="${escapeHtml(webformatURL)}" alt="${safeTags}" loading="lazy" />
        <ul class="image-stats">
          <li class="image-stat">
            <span class="image-stat-label">Likes</span>
            <span class="image-stat-value">${escapeHtml(likes)}</span>
          </li>
          <li class="image-stat">
            <span class="image-stat-label">Views</span>
            <span class="image-stat-value">${escapeHtml(views)}</span>
          </li>
          <li class="image-stat">
            <span class="image-stat-label">Comments</span>
            <span class="image-stat-value">${escapeHtml(comments)}</span>
          </li>
          <li class="image-stat">
            <span class="image-stat-label">Downloads</span>
            <span class="image-stat-value">${escapeHtml(downloads)}</span>
          </li>
        </ul>
      </a>
    </li>
  `;
}

export function createGallery(images) {
  gallery.insertAdjacentHTML(
    'beforeend',
    images.map(createGalleryItem).join('')
  );
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}
