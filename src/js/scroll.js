export  function scrollGallery() {
  const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height * 2;
  window.scrollBy({
    top: cardHeight,
    behavior: "smooth",
  });
};