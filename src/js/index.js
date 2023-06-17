import { fetchImages, fetchMoreImages } from './api';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.load-more');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  console.log(searchQuery.value);
  fetchImages(searchQuery.value).then(({ total, hits }) => {
    loader.classList.remove('hidden');
    console.log(hits);
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else renderGallery(hits);
    showTotal(total);
  });
}

function renderGallery(pictures) {
  const markup = pictures
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" class="main-image" />
  <div class="info">
    <p class="info-item">
      <b> <span class="material-symbols-outlined">
thumb_up
</span> Likes:  ${likes}</b>
    </p>
    <p class="info-item">
      <b> <span class="material-symbols-outlined">
groups
</span> Views:  ${views}</b>
    </p>
    <p class="info-item">
      <b> <span class="material-symbols-outlined">
reviews
</span> Comments:  ${comments}</b>
    </p>
    <p class="info-item">
      <b> <span class="material-symbols-outlined">
download
</span> Downloads: ${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');

  gallery.innerHTML = markup;
}

function showTotal(total) {
  Notiflix.Notify.success(`Hooray! We found ${total} images.`);
}

loader.addEventListener('click', onLoaderClick);

function onLoaderClick(event) {
  fetchMoreImages();
}
