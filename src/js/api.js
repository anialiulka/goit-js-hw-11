const axios = require('axios');

const API_KEY = '37360238-906099131e02ce03408024f3e';
const url = 'https://pixabay.com/api/';

// export function fetchImages() {
//   axios.get(`${url}?key={${API_KEY}}`, {
//     params: {
//       q: 'cat',
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//     },
//   });
// }
export function fetchImages() {
  return fetch(url)
    .then(response => {
      return response.json();
    })
    .catch(displayError);
}
