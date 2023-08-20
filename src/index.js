import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getGallery } from './axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { notifyInit } from './notify';
import { creatMarkup } from './markup';
import { startLoader, stopLoader, stopGallery } from './loader';


const formSearch = document.querySelector('.search-form');
formSearch.addEventListener('submit', handlerForm);
const gallery = document.querySelector('.gallery');
const target = document.querySelector('.target')
document.querySelector('.load-more').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

let word = '';
let perPage = 40;
let page = 1;
let totalPage = 0;

function handlerForm(evt) {
  evt.preventDefault();
  gallery.innerHTML = '';
  page = 1;

  const data = new FormData(evt.currentTarget);
  word = JSON.stringify(data.get("searchQuery").trim());
  document.querySelector('.footer').classList.remove('open');
    
    getGallery(word, page)
    
      .then(data => {
        
          const arr = data.hits;
          totalPage = Math.ceil(data.totalHits / perPage);

            if (data.total == 0) {
              Notify.warning('Sorry, there are no images matching your search query. Please try again.', notifyInit);
              
          };
          if (arr.length <= data.totalHits) {

            creatMarkup(arr);
            observer.observe(target);

            setTimeout(() => {
              document.querySelector('.footer').classList.add('open');
              document.querySelector('.message').textContent = `Hooray! We found ${data.totalHits} images.`;
              formSearch.reset();
            }, 3000);
          }
          
        })
      .catch(err => console.log(err));
};

const options = {
  // root: по умолчанию window, но можно задать любой элемент-контейнер
  root: null,
  rootMargin: "0px",
  threshold: 1,
}
const observer = new IntersectionObserver(handelerPagination, options)

function handelerPagination(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;

        getGallery(word, page)
          .then(data => {

            startLoader();

            const arr = data.hits;
            creatMarkup(arr);

            stopLoader();

            if (page >= totalPage) {
              observer.unobserve(entry.target);
            
              stopGallery()
            }
          })
        .catch(err => console.log(err));
    }
  });
};
