document.addEventListener('DOMContentLoaded', () => {
    const leftSlider = document.querySelector('.left-slider');
    const leftSliderImageContainers = leftSlider.querySelectorAll('.image-container');
    const leftSliderImages = leftSlider.querySelectorAll('.gallery-img');
    const rightSlider = document.querySelector('.right-slider');
    const rightSliderImageContainers = rightSlider.querySelectorAll('.right-container');
    const rightSliderImages = rightSlider.querySelectorAll('.right-img');
    const rightArrow = leftSlider.querySelector('.fa-angle-right');
    const leftArrow = leftSlider.querySelector('.fa-angle-left');

    leftSliderImages.forEach((image) => image.addEventListener('click', showFullScreenImage.bind(null, image, leftSlider, rightSlider)));
    rightArrow.addEventListener('click', slideToTheRight.bind(null, [...leftSliderImageContainers], [...rightSliderImageContainers]));
    leftArrow.addEventListener('click', slideToTheLeft.bind(null, [...leftSliderImageContainers], [...rightSliderImageContainers]));
});

const showFullScreenImage = (image, leftSlider, rightSlider) => {
    if (!image.classList.contains('full-size')) {
        image.classList.add('full-size');
        rightSlider.classList.add('overlayed');
        leftSlider.classList.add('overlayed');

        const darkOverlay = createHTMLElement('div', 'overlay', null);
        document.body.prepend(darkOverlay);

        darkOverlay.addEventListener('click', closeFullScreenImage.bind(null, image, leftSlider, rightSlider, darkOverlay));
    }
};

const closeFullScreenImage = (image, leftSlider, rightSlider, darkOverlay) => {
    image.classList.remove('full-size');
    removeHTMLElement(darkOverlay);

    setTimeout(() => {
        rightSlider.classList.remove('overlayed');
        leftSlider.classList.remove('overlayed');
    }, 500);
};

const slideToTheRight = (leftSliderContainers, rightSliderContainers) => {
    const previousContainer = leftSliderContainers.find(container => container.classList.contains('previous-container'));
    const currentContainer = leftSliderContainers.find(container => container.classList.contains('current-container'));
    const nextContainer = leftSliderContainers.find(container => container.classList.contains('next-container'));
    const previousRightSliderContainer = rightSliderContainers.find(container => container.classList.contains('previous'));
    const currentRightSliderContainer = rightSliderContainers.find(container => container.classList.contains('current'));
    const nextRightSliderContainer = rightSliderContainers.find(container => container.classList.contains('next'));

    changeClass(previousContainer, 'previous-container', 'next-container');
    changeClass(previousRightSliderContainer, 'previous', 'next');

    changeClass(currentContainer, 'current-container', 'previous-container');
    changeClass(currentRightSliderContainer, 'current', 'previous');

    changeClass(nextContainer, 'next-container', 'current-container');
    changeClass(nextRightSliderContainer, 'next', 'current');
};

const slideToTheLeft = (leftSliderContainers, rightSliderContainers) => {
    const previousContainer = leftSliderContainers.find(container => container.classList.contains('previous-container'));
    const currentContainer = leftSliderContainers.find(container => container.classList.contains('current-container'));
    const nextContainer = leftSliderContainers.find(container => container.classList.contains('next-container'));
    const previousRightSliderContainer = rightSliderContainers.find(container => container.classList.contains('previous'));
    const currentRightSliderContainer = rightSliderContainers.find(container => container.classList.contains('current'));
    const nextRightSliderContainer = rightSliderContainers.find(container => container.classList.contains('next'));

    changeClass(previousContainer, 'previous-container', 'current-container');
    changeClass(previousRightSliderContainer, 'previous', 'current');

    changeClass(currentContainer, 'current-container', 'next-container');
    changeClass(currentRightSliderContainer, 'current', 'next');

    changeClass(nextContainer, 'next-container', 'previous-container');
    changeClass(nextRightSliderContainer, 'next', 'previous');
};

const changeClass = (element, oldClass, newClass) => {
    element.classList.remove(oldClass);
    element.classList.add(newClass);
};
