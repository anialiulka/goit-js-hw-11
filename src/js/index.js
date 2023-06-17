// import { fetchImages, fetchMoreImages, page } from './api';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '37360238-906099131e02ce03408024f3e';

let per_page = 40;
let page = 1;
let test = null;

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.load-more');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  page = 1;

  const {
    elements: { searchQuery },
  } = event.currentTarget;

  test = searchQuery.value;

  fetchImages(test).then(({ total, hits }) => {
    console.log(hits);

    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else renderGallery(hits);
    page += 1;
    if (page > 1) {
      loader.classList.remove('hidden');
    }
    showTotal(total);
  });
}
async function fetchImages(searchQuery) {
  try {
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: `${searchQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page,
      page,
    });
    const url = `https://pixabay.com/api/?${searchParams}`;

    return fetch(url).then(response => {
      console.log(response.json);
      return response.json();
    });
  } catch (error) {
    console.error(error);
  }
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
<a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" class="main-image" /></a>
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
  if (page === 1) {
    gallery.innerHTML = markup;
  } else gallery.innerHTML += markup;
  new SimpleLightbox('.photo-card a', {
    captionDelay: 250,
    captionsData: 'alt',
  });
}

function showTotal(total) {
  Notiflix.Notify.success(`Hooray! We found ${total} images.`);
}

loader.addEventListener('click', loadMore);

function loadMore(event) {
  event.preventDefault();
  fetchImages(test).then(({ hits }) => {
    console.log(hits);
    renderGallery(hits);
    page += 1;
  });
}
