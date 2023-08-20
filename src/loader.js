// const btnLoadMore = document.querySelector('.load-more');

export const startLoader = (() => {
    document.querySelector('.backdrop').classList.remove('is-hidden');
});

export const stopLoader = (() => {
    setTimeout(() => {
        document.querySelector('.backdrop').classList.add('is-hidden');
    }, 1000);
});

export const stopGallery = (() => {
    document.querySelector('.backdrop').classList.add('is-hidden');
    document.querySelector('.message').textContent = "We're sorry, but you've reached the end of search results.";
    setTimeout(() => {
        document.querySelector('.footer').classList.remove('open')
    }, 10000);
});
