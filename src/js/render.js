export function renderGallery(arr) {
  return arr.map(( image) => {
      const { webformatURL, largeImageURL, tags, likes, views, comments, downloads,  } = image;

       return `
        <li class="gallery-item">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}"  >
          </a>
          <div class="gallery-item-info">
            <div class="info">
            <p><b>Likes</b></p>
            <p>${likes}</p>
            </div>
            <div class="info">
            <p><b>Views</b></p>
            <p>${views}</p>
            </div>
            <div class="info">
            <p><b>Comments</b></p>
            <p>${comments}</p>
            </div>
            <div class="info">
            <p><b>Downloads</b></p>
            <p>${downloads}</p>
            </div>
          </div>
        </li>
      `;
    }).join("");
};