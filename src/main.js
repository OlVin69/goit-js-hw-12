
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const formEl = document.querySelector(".form");
const searchInput = document.querySelector(".search-input")
const loader = document.querySelector(".loader");
const gallery = document.querySelector(".gallery");


const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});



formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();

  if (!query) {
    return;
  }

  loader.classList.remove("hidden")
  gallery.innerHTML = "";
  searchInput.value= "";

  fetchImages(query)
    .then(({ hits }) => {
      renderGallery(hits);
    })
    .catch((error) => console.log(error))
    .finally(() => { loader.classList.add("hidden") }); 
});


function fetchImages(query) {
  const url = `https://pixabay.com/api/?key=41700733-d920d8ba94f63c82daa7e2416&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    
}

  function renderGallery(hits) {
  if (hits.length > 0) {
    const galleryHTML = hits.reduce((html, image) => {
      const { webformatURL, largeImageURL, tags, likes, views, comments, downloads,  } = image;

      return html + `
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
    }, '');

    gallery.insertAdjacentHTML("beforeend", galleryHTML);
    lightbox.refresh(); 
  } else {
    iziToast.error({
                        messageColor: "rgb(255, 255, 255)",
                        backgroundColor: "red",
                        timeout:"3000",
                        message: "Sorry, there are no images matching your search query. Please try again.",
                        position: "center",
                });
    };
};
    
  