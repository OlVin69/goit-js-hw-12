
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getPhotos } from "./js/apiphoto";
import { renderGallery } from "./js/render";
import { scrollGallery } from "./js/scroll";

const formEl = document.querySelector(".js-search-form");
const loader = document.querySelector(".loader");
const listEl = document.querySelector(".js-gallery");
const btnMore = document.querySelector(".js-loadmore");
const target = document.querySelector('.js-backdrop');

let page = 1;
let query = "";

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

formEl.addEventListener("submit", onSubmit);

btnMore.addEventListener("click", loadMoreData);

async function onSubmit(event) {
  event.preventDefault();
  listEl.innerHTML = "";
  btnMore.classList.add("is-hidden");

  page = 1;
  query = event.target.elements["search_field"].value.trim();
  
  loaderPlay();

  if (!query) {
    loaderStop();
    listEl.innerHTML = "";
    btnMore.classList.add("is-hidden");
    return iziToast.info({
      messageColor: 'rgb(255, 255, 255)',
      backgroundColor: 'blue',
      timeout: '5000',
      message: "Please fill out search field",
      position: 'center',
    });
  };

  

  try {
    const { data: { hits, totalHits } } = await getPhotos(query, page);
    if (hits.length > 0) {
     listEl.innerHTML = renderGallery(hits);
      lightbox.refresh();
      
      btnMore.classList.remove("is-hidden");

    if (page * 40 >= totalHits) {
      btnMore.classList.add("is-hidden");
      iziToast.info({
      messageColor: 'rgb(255, 255, 255)',
      backgroundColor: 'blue',
      timeout: '5000',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'bottomCenter',
    });
    }
    } else {
      btnMore.classList.add("is-hidden");
      iziToast.error({
                        messageColor: "rgb(255, 255, 255)",
                        backgroundColor: "red",
                        timeout:"5000",
                        message: "Sorry, there are no images matching your search query. Please try again.",
                        position: "center",
                });
   }

  } catch (error) {
    iziToast.error({   title: Error,
                        messageColor: "rgb(255, 255, 255)",
                        backgroundColor: "red",
                        timeout:"3000",
                        position: "topRight",
                });
  }
  finally { loaderStop(); }; 

  event.target.reset();
};

async function loadMoreData() {
  page += 1;
  
  loaderPlay();
  try {
    const { data: { hits, totalHits } } = await getPhotos(query, page);

      listEl.insertAdjacentHTML('beforeend', renderGallery(hits));
      lightbox.refresh();
      
      btnMore.classList.remove("is-hidden");

    if (page * 40 >= totalHits) {
        
        btnMore.classList.add("is-hidden");

        iziToast.info({
      messageColor: 'rgb(255, 255, 255)',
      backgroundColor: 'red',
      timeout: '6000',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'bottomCenter',
    });
    };
  } catch (error) {
    iziToast.error({   title: Error,
                        messageColor: "rgb(255, 255, 255)",
                        backgroundColor: "red",
                        timeout:"3000",
                        position: "topRight",
                });
  }
   finally { loaderStop() };  
};

function loaderPlay() {
  loader.classList.remove("hidden");
  target.classList.remove('is-hidden');
};

function loaderStop() {
  loader.classList.add("hidden");
  target.classList.add('is-hidden');
};




  