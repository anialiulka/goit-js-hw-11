// import { fetchImages } from './api';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const input = document.querySelector('input');

const API_KEY = '37360238-906099131e02ce03408024f3e';

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  console.log(searchQuery.value);
  fetchImages(searchQuery.value).then(({ total, hits }) => {
    console.log(hits);
    renderGallery(hits);
  });
}

function fetchImages(searchQuery) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: `${searchQuery}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const url = `https://pixabay.com/api/?${searchParams}`;
  console.log(searchParams.toString());
  return fetch(url)
    .then(response => {
      console.log(response.json);
      return response.json();
    })
    .catch(error => {
      console.log('Error:', error);
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
