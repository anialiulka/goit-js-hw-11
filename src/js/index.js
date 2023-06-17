import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.load-more');

const API_KEY = '37360238-906099131e02ce03408024f3e';

let per_page = 40;
let page = 1;
let searchWord = null;
let imagesTaken = null;

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';

  page = 1;
  imagesTaken = 0;

  const {
    elements: { searchQuery },
  } = event.currentTarget;

  searchWord = searchQuery.value;

  if (searchWord === '') {
    return;
  } else {
    fetchImages(searchWord).then(({ totalHits, hits }) => {
      imagesTaken = 0;

      if (hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      } else imagesTaken += hits.length;
      renderGallery(hits);

      if (hits.length >= totalHits) {
        page = 0;
      } else page += 1;
      if (page > 1) {
        loader.classList.remove('hidden');
      }
      showTotal(totalHits);
    });
  }
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
    gallery.insertAdjacentHTML('afterbegin', markup);
  } else gallery.insertAdjacentHTML('beforeend', markup);

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
  fetchImages(searchWord).then(({ hits, totalHits }) => {
    imagesTaken += hits.length;
    page += 1;
    renderGallery(hits);
    if (imagesTaken >= totalHits) {
      loader.classList.add('hidden');
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
}
