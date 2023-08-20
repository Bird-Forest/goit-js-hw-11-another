
const selectors = {
    container: document.querySelector('.js-movie-list'),
    guard: document.querySelector('.js-guard'),
}

const options = {
    root: null,
    rootMargin: "300px",
    threshold: 0,
};

const observer = new IntersectionObserver(handelerPagination, options);
let page = 1;
// let counterObserv = 0;
function handelerPagination(entries, observer) {
    entries.forEach(entry => {

        // counterObserv += 1;
        // console.log('IntersectionObserver', counterObserv);
        if (entry.isIntersecting) {
            page += 1;
            serviceMovie(page)
                .then(data => {
                    selectors.container.insertAdjacentHTML('beforeend', createMarkup(data.results))
                    if (data.page >= 500) {
                        observer.unobserve(entry.target);
                    }
                })
                .catch(err => console.log(err))
        }
    });
}

serviceMovie()
    .then(data => {
        selectors.container.insertAdjacentHTML('beforeend', createMarkup(data.results))
        if (data.page < data.total_pages) {
            observer.observe(selectors.guard);
        }
    })
    .catch(() => location.href = './error.html')



function createMarkup(arr) {
    return arr.map(({ poster_path, release_date, original_title, vote_average }) => `
    <li>
        <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}" />
        <h2>${original_title}</h2>
        <p>${release_date}</p>
        <p>${vote_average}</p>
    </li>`)
        .join('')

}

console.log(history);
function serviceMovie(page = 1) {
    const BASE_URL = 'https://api.themoviedb.org/3';
    const END_POINT = '/trending/movie/week';
    const API_KEY = "345007f9ab440e5b86cef51be6397df1";
    return fetch(`${BASE_URL}${END_POINT}?api_key=${API_KEY}&page=${page}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(resp.statusText);
            }

            return resp.json();
        })
}
