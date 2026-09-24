/* global basicLightbox */

const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const chevronLeftSvg = `<svg class="lightbox__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const chevronRightSvg = `<svg class="lightbox__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const closeIconSvg = `<svg class="lightbox__icon lightbox__icon--close" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;

const buildLightboxHtml = (index, total) => {
  const { original, description } = images[index];
  return `<div class="lightbox" role="dialog" aria-modal="true" aria-label="Image preview">
  <p class="lightbox__counter" aria-live="polite"><span class="lightbox__counter-current">${index + 1}</span><span class="lightbox__counter-sep">/</span><span class="lightbox__counter-total">${total}</span></p>
  <button type="button" class="lightbox__close" data-lightbox="close" aria-label="Close">${closeIconSvg}</button>
  <button type="button" class="lightbox__nav lightbox__nav--prev" data-lightbox="prev" aria-label="Previous image">${chevronLeftSvg}</button>
  <button type="button" class="lightbox__nav lightbox__nav--next" data-lightbox="next" aria-label="Next image">${chevronRightSvg}</button>
  <div class="lightbox__frame">
    <img class="lightbox__image" src="${original}" width="800" height="600" alt="${description}" />
  </div>
</div>`;
};

const openLightbox = startIndex => {
  let currentIndex = startIndex;
  const total = images.length;
  const html = buildLightboxHtml(currentIndex, total);
  let onKey = null;

  const lightbox = basicLightbox.create(html, {
    className: 'basicLightbox--fullscreen',
    onShow: instance => {
      const root = instance.element();
      const lightboxEl = root.querySelector('.lightbox');
      if (!lightboxEl) {
        return;
      }

      const imageEl = lightboxEl.querySelector('.lightbox__image');
      const counterCurrentEl = lightboxEl.querySelector(
        '.lightbox__counter-current'
      );
      const btnClose = lightboxEl.querySelector('[data-lightbox="close"]');
      const btnPrev = lightboxEl.querySelector('[data-lightbox="prev"]');
      const btnNext = lightboxEl.querySelector('[data-lightbox="next"]');

      const update = () => {
        const { original, description } = images[currentIndex];
        imageEl.src = original;
        imageEl.alt = description;
        if (counterCurrentEl) {
          counterCurrentEl.textContent = String(currentIndex + 1);
        }
      };

      const goPrev = () => {
        currentIndex = (currentIndex - 1 + total) % total;
        update();
      };

      const goNext = () => {
        currentIndex = (currentIndex + 1) % total;
        update();
      };

      const onControlClick = event => {
        event.stopPropagation();
      };

      lightboxEl.addEventListener('click', onControlClick);

      const handleClose = event => {
        event.stopPropagation();
        instance.close();
      };

      const handlePrev = event => {
        event.stopPropagation();
        goPrev();
      };

      const handleNext = event => {
        event.stopPropagation();
        goNext();
      };

      btnClose.addEventListener('click', handleClose);
      btnPrev.addEventListener('click', handlePrev);
      btnNext.addEventListener('click', handleNext);

      onKey = event => {
        if (event.key === 'Escape') {
          instance.close();
        } else if (event.key === 'ArrowLeft') {
          goPrev();
        } else if (event.key === 'ArrowRight') {
          goNext();
        }
      };
      document.addEventListener('keydown', onKey);

      instance._cleanup = () => {
        document.removeEventListener('keydown', onKey);
        lightboxEl.removeEventListener('click', onControlClick);
        btnClose.removeEventListener('click', handleClose);
        btnPrev.removeEventListener('click', handlePrev);
        btnNext.removeEventListener('click', handleNext);
        onKey = null;
      };
    },
    onClose: instance => {
      if (typeof instance._cleanup === 'function') {
        instance._cleanup();
      }
    },
  });

  lightbox.show();
};

const createGalleryItemMarkup = (
  { preview, original, description },
  itemIndex
) => {
  return `<li class="gallery-item" data-index="${itemIndex}">
  <a class="gallery-link" href="${original}">
    <img
      class="gallery-image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
};

const galleryRef = document.querySelector('.gallery');
const galleryItemsMarkup = images
  .map((item, index) => createGalleryItemMarkup(item, index))
  .join('');

galleryRef.insertAdjacentHTML('beforeend', galleryItemsMarkup);

const onGalleryListClick = event => {
  const link = event.target.closest('.gallery-link');
  if (!link) {
    return;
  }
  event.preventDefault();

  const item = link.closest('.gallery-item');
  if (!item) {
    return;
  }

  const startIndex = Number.parseInt(item.dataset.index, 10);
  if (Number.isNaN(startIndex)) {
    return;
  }

  openLightbox(startIndex);
};

galleryRef.addEventListener('click', onGalleryListClick);
