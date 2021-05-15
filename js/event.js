document.addEventListener('DOMContentLoaded', () => {
    const leftSlider = document.querySelector('.left-slider');
    const leftSliderImageContainers = leftSlider.querySelectorAll('.image-container');
    const leftSliderImages = leftSlider.querySelectorAll('.gallery-img');
    const rightSlider = document.querySelector('.right-slider');
    const rightSliderImageContainers = rightSlider.querySelectorAll('.right-container');
    const rightSliderImages = rightSlider.querySelectorAll('.right-img');
    const rightArrow = leftSlider.querySelector('.fa-angle-right');
    const leftArrow = leftSlider.querySelector('.fa-angle-left');

    leftSliderImages.forEach((image) => image.addEventListener('click', showFullScreenImage));
    rightArrow.addEventListener('click', slideToTheRight.bind(null, [...leftSliderImageContainers], [...rightSliderImageContainers]));
    leftArrow.addEventListener('click', slideToTheLeft.bind(null, [...leftSliderImageContainers], [...rightSliderImageContainers]));
});

const showFullScreenImage = () => {
    const darkOverlay = createHTMLElement('div', 'overlay', null);
    document.body.prepend(darkOverlay);

    darkOverlay.addEventListener('click', closeFullScreenImage.bind(null, darkOverlay));
};

const closeFullScreenImage = (darkOverlay) => {
    removeHTMLElement(darkOverlay);
};

const slideToTheRight = (leftSliderContainers, rightSliderContainers) => {
    const previousContainer = leftSliderContainers.find(container => container.classList.contains('previous-container'));
    const currentContainer = leftSliderContainers.find(container => container.classList.contains('current-container'));
    const nextContainer = leftSliderContainers.find(container => container.classList.contains('next-container'));
    const previousRightSliderContainer = rightSliderContainers.find(container => container.classList.contains('previous'));
    const currentRightSliderContainer = rightSliderContainers.find(container => container.classList.contains('current'));
    const nextRightSliderContainer = rightSliderContainers.find(container => container.classList.contains('next'));

    previousContainer.classList.remove('previous-container');
    previousContainer.classList.add('next-container');

    previousRightSliderContainer.classList.remove('previous');
    previousRightSliderContainer.classList.add('next');
    
    currentContainer.classList.remove('current-container');
    currentContainer.classList.add('previous-container');

    currentRightSliderContainer.classList.remove('current');
    currentRightSliderContainer.classList.add('previous');

    nextContainer.classList.remove('next-container');
    nextContainer.classList.add('current-container');

    nextRightSliderContainer.classList.remove('next');
    nextRightSliderContainer.classList.add('current');
};

const slideToTheLeft = (leftSliderContainers, rightSliderContainers) => {
    const previousContainer = leftSliderContainers.find(container => container.classList.contains('previous-container'));
    const currentContainer = leftSliderContainers.find(container => container.classList.contains('current-container'));
    const nextContainer = leftSliderContainers.find(container => container.classList.contains('next-container'));
    const previousRightSliderContainer = rightSliderContainers.find(container => container.classList.contains('previous'));
    const currentRightSliderContainer = rightSliderContainers.find(container => container.classList.contains('current'));
    const nextRightSliderContainer = rightSliderContainers.find(container => container.classList.contains('next'));

    previousContainer.classList.remove('previous-container');
    previousContainer.classList.add('current-container');

    previousRightSliderContainer.classList.remove('previous');
    previousRightSliderContainer.classList.add('current');
    
    currentContainer.classList.remove('current-container');
    currentContainer.classList.add('next-container');

    currentRightSliderContainer.classList.remove('current');
    currentRightSliderContainer.classList.add('next');

    nextContainer.classList.remove('next-container');
    nextContainer.classList.add('previous-container');

    nextRightSliderContainer.classList.remove('next');
    nextRightSliderContainer.classList.add('previous');
};
