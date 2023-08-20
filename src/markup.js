import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');



export function creatMarkup(arr) {

    const markup = arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 

    `<div class="photo-card">
    <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo"/></a>
    <div class="info">
    <p class="info-item"><b>Likes</b>${likes}</p>
    <p class="info-item"><b>Views</b>${views}</p>
    <p class="info-item"><b>Comments</b>${comments}</p>
    <p class="info-item"><b>Downloads</b>${downloads}</p>
    </div>
    </div>`).join('');

    gallery.insertAdjacentHTML('beforeend', markup);

    const lightbox = new SimpleLightbox('.gallery a', {
        captions: true,
        captionsData: 'alt',
        captionDelay: 250,
    });

    lightbox.refresh();
};

// ********************************Infinity scroll ********************** \\
// const selectors = {
//   container: document.querySelector(".js-movie-list"),
//   guard: document.querySelector(".js-guard"),
// };

// const options = {
//   root: null,
//   rootMargin: "300px",
//   threshold: 0,
// };

// const observer = new IntersectionObserver(handlerPagination, options);
// let page = 1;

// serviceMovie()
//   .then((data) => {
//     selectors.container.insertAdjacentHTML("beforeend",createMarkup(data.results));

//     if (data.page < data.total_pages) {
//       observer.observe(selectors.guard);
//     }
//   })
//   .catch((err) => console.log(err));


// function handlerPagination(entries, observer) {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       page += 1;
//       serviceMovie(page)
//         .then((data) => {
//           selectors.container.insertAdjacentHTML("beforeend", createMarkup(data.results));

//           if (data.page >= 500) {
//             observer.unobserve(entry.target);
//           }
//         })
//         .catch((err) => console.log(err));
//     }
//   });
// }


// function serviceMovie(page = 1) {
//   const BASE_URL = "https://api.themoviedb.org/3";
//   const END_POINT = "/trending/movie/week";
//   const API_KEY = "345007f9ab440e5b86cef51be6397df1";
//   return fetch(`${BASE_URL}${END_POINT}?api_key=${API_KEY}&page=${page}`).then(
//     (resp) => {
//       if (!resp.ok) {
//         throw new Error(resp.statusText);
//       }

//       return resp.json();
//     }
//   );
// }

// function createMarkup(arr) {
//   return arr
//     .map(
//       ({ poster_path, release_date, original_title, vote_average }) => `
//         <li class="movie-card">
//           <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}" />
//           <div class="movie-info">
//               <h2>${original_title}</h2>
//               <p>Release Date: ${release_date}</p>
//               <p>Vote Average: ${vote_average}</p>
//           </div>
//          </li>`
//     )
//     .join("");
// }
