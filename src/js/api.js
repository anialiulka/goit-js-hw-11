// const API_KEY = '37360238-906099131e02ce03408024f3e';

// let per_page = 40;
// export let page = 1;

// export async function fetchImages(searchQuery) {
//   try {
//     const searchParams = new URLSearchParams({
//       key: API_KEY,
//       q: `${searchQuery}`,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       per_page,
//       page,
//     });
//     const url = `https://pixabay.com/api/?${searchParams}`;
//     console.log(searchParams.toString());

//     return fetch(url).then(response => {
//       console.log(response.json);
//       return response.json();
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// export async function fetchMoreImages() {}
