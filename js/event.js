document.addEventListener('DOMContentLoaded', () => {
    const leftSlider = document.querySelector('.left-slider');
    const leftSliderImages = leftSlider.querySelectorAll('.gallery-img');
    const rightArrow = leftSlider.querySelector('.fa-angle-right');
    const leftArrow = leftSlider.querySelector('.fa-angle-left');

    leftSliderImages.forEach((image) => image.addEventListener('click', showFullScreenImage));
});

const showFullScreenImage = () => {
    const darkOverlay = createHTMLElement('div', 'overlay', null);
    document.body.prepend(darkOverlay);

    darkOverlay.addEventListener('click', closeFullScreenImage.bind(null, darkOverlay));
};

const closeFullScreenImage = (darkOverlay) => {
    removeHTMLElement(darkOverlay);
};
