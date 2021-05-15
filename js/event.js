document.addEventListener('DOMContentLoaded', () => {
    const leftSlider = document.querySelector('.left-slider');
    const leftSliderImageContainers = leftSlider.querySelectorAll('.image-container');
    const leftSliderImages = leftSlider.querySelectorAll('.gallery-img');
    const rightSlider = document.querySelector('.right-slider');
    const rightSliderImageContainer = rightSlider.querySelectorAll('.right-container');
    const rightSliderImages = rightSlider.querySelectorAll('.right-img');
    const rightArrow = leftSlider.querySelector('.fa-angle-right');
    const leftArrow = leftSlider.querySelector('.fa-angle-left');

    leftSliderImages.forEach((image) => image.addEventListener('click', showFullScreenImage));
    rightArrow.addEventListener('click', slideToTheRight.bind(null, [...leftSliderImageContainers]));
    leftArrow.addEventListener('click', slideToTheLeft.bind(null, [...leftSliderImageContainers]));
});

const showFullScreenImage = () => {
    const darkOverlay = createHTMLElement('div', 'overlay', null);
    document.body.prepend(darkOverlay);

    darkOverlay.addEventListener('click', closeFullScreenImage.bind(null, darkOverlay));
};

const closeFullScreenImage = (darkOverlay) => {
    removeHTMLElement(darkOverlay);
};

const slideToTheRight = (containers) => {
    const previousContainer = containers.find(container => container.classList.contains('previous-container'));
    const currentContainer = containers.find(container => container.classList.contains('current-container'));
    const nextContainer = containers.find(container => container.classList.contains('next-container'));

    previousContainer.classList.remove('previous-container');
    previousContainer.classList.add('next-container');
    
    currentContainer.classList.remove('current-container');
    currentContainer.classList.add('previous-container');

    nextContainer.classList.remove('next-container');
    nextContainer.classList.add('current-container');
};

const slideToTheLeft = (containers) => {
    const previousContainer = containers.find(container => container.classList.contains('previous-container'));
    const currentContainer = containers.find(container => container.classList.contains('current-container'));
    const nextContainer = containers.find(container => container.classList.contains('next-container'));

    previousContainer.classList.remove('previous-container');
    previousContainer.classList.add('current-container');
    
    currentContainer.classList.remove('current-container');
    currentContainer.classList.add('next-container');

    nextContainer.classList.remove('next-container');
    nextContainer.classList.add('previous-container');
};
