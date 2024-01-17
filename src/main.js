
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";


const formEl = document.querySelector(".js-search-form");
const loader = document.querySelector(".loader");
const listEl = document.querySelector(".js-gallery");
const btnMore = document.querySelector(".js-loadmore");

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

  const query = event.target.elements["search_field"].value.trim();
  
  loaderPlay();

  if (!query) {
    loaderStop();
    listEl.innerHTML = "";
    return iziToast.info({
      messageColor: 'rgb(255, 255, 255)',
      backgroundColor: 'blue',
      timeout: '5000',
      message: "Please fill out search field",
      position: 'center',
    });
  };

  listEl.innerHTML = "";

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
      timeout: '6000',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'bottomCenter',
    });
    }
    } else {
      iziToast.error({
                        messageColor: "rgb(255, 255, 255)",
                        backgroundColor: "red",
                        timeout:"3000",
                        message: "Sorry, there are no images matching your search query. Please try again.",
                        position: "center",
                });
   }

  } catch (error) {
    console.error(error.message);
  }
  finally { loaderStop(); }; 

  event.target.reset();
};

function getPhotos(query, page) {

  const API_KEY = "41700733-d920d8ba94f63c82daa7e2416";
  axios.defaults.baseURL = "https://pixabay.com/api/";
  
  return axios.get("", {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: 40,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
    },
  });
};

  function renderGallery(arr) {
  return arr.map(( image) => {
      const { webformatURL, largeImageURL, tags, likes, views, comments, downloads,  } = image;

       return `
        <li class="gallery-item">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" " >
          </a>
          <div class="gallery-item-info">
            <div>
            <p><b>Likes</b></p>
            <p>${likes}</p>
            </div>
            <div>
            <p><b>Views</b></p>
            <p>${views}</p>
            </div>
            <div>
            <p><b>Comments</b></p>
            <p>${comments}</p>
            </div>
            <div>
            <p><b>Downloads</b></p>
            <p>${downloads}</p>
            </div>
          </div>
        </li>
      `;
    }).join("");
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
      backgroundColor: 'blue',
      timeout: '6000',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'bottomCenter',
    });
    };
  } catch (error) {
    console.error(error.message);
  }
   finally { loaderStop() };  
};
  

function loaderPlay() {
  loader.classList.remove("hidden");
};

function loaderStop() {
  loader.classList.add("hidden");
};


    
  