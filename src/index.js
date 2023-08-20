import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getGallery } from './axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { notifyInit } from './notify';
import { creatMarkup } from './markup';
import { startLoader, stopLoader, stopGallery } from './loader';

// const btnLoadMore = document.querySelector('.load-more');
// btnLoadMore.addEventListener('click', onShowGallery);


const formSearch = document.querySelector('.search-form');
formSearch.addEventListener('submit', handlerForm);
const gallery = document.querySelector('.gallery');
console.log(gallery)
const target = document.querySelector('.target')

let word = '';
let perPage = 40;

const options = {
  // root: по умолчанию window, но можно задать любой элемент-контейнер
  root: null,
  rootMargin: "300px",
  threshold: 0,
}
const observer = new IntersectionObserver(handelerPagination, options)

let page = 1;
let totalPage = 0;

function handlerForm(evt) {
    evt.preventDefault();
    gallery.innerHTML = '';
    page = 1;

    const data = new FormData(evt.currentTarget);
    word = JSON.stringify(data.get("searchQuery").trim());
    
    getGallery(word, page)
        .then(data => {

            if (data.total == 0) {
                Notify.warning('Sorry, there are no images matching your search query. Please try again.', notifyInit);
          }
          totalPage = Math.ceil(data.totalHits / perPage);
          console.log(totalPage)

          const arr = data.hits;
          creatMarkup(arr);
          if (page < totalPage) {
            observer.observe(target);
          }
            console.log('1 functuin')
        })
        .catch(err => console.log(err));
    
    // formSearch.reset();
};

function handelerPagination(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry)
      page += 1;
      console.log(page);
        getGallery(word, page)
          .then(data => {
            const arr = data.hits;
            creatMarkup(arr);
            if (page >= totalPage) {
              observer.unobserve(entry.target);
            }
          })
          .catch(err => console.log(err));
    }
  });
};
