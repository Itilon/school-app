document.addEventListener('DOMContentLoaded', () => {
    const leftSlider = document.querySelector('.left-slider');
    const leftSliderImageContainers = leftSlider.querySelectorAll('.image-container');
    const leftSliderImages = leftSlider.querySelectorAll('.gallery-img');
    const rightSlider = document.querySelector('.right-slider');
    const rightSliderImageContainers = rightSlider.querySelectorAll('.right-container');
    const rightArrow = leftSlider.querySelector('.fa-angle-right');
    const leftArrow = leftSlider.querySelector('.fa-angle-left');
    const videoBtn = document.querySelector('.btn');
    const eventVideoContainer = document.querySelector('.event-video-container');
    const videos = eventVideoContainer.querySelectorAll('iframe');

    leftSliderImages.forEach((image) => {
        image.addEventListener('click', showFullScreenImage.bind(null, image, leftSlider, rightSlider))
    });
    rightSliderImageContainers.forEach((container) => {
        container.addEventListener('click', () => {
            if (container.classList.contains('previous')) {
                slideDown([...leftSliderImageContainers], [...rightSliderImageContainers]);
            } else if (container.classList.contains('next')) {
                slideUp([...leftSliderImageContainers], [...rightSliderImageContainers]);
            }
        });
    });
    rightArrow.addEventListener('click', slideRight.bind(null, [...leftSliderImageContainers], [...rightSliderImageContainers]));
    leftArrow.addEventListener('click', slideLeft.bind(null, [...leftSliderImageContainers], [...rightSliderImageContainers]));

    videoBtn.addEventListener('click', openVideoContainer.bind(null, eventVideoContainer, videos));
});

const showFullScreenImage = (image, leftSlider, rightSlider) => {
    if (!image.classList.contains('full-size')) {
        image.classList.add('full-size');
        rightSlider.classList.add('overlayed');
        leftSlider.classList.add('overlayed');

        const darkOverlay = createHTMLElement('div', 'overlay', null);
        const closingBtn = createHTMLElement('span', 'closing-btn', '&#10005');
        darkOverlay.appendChild(closingBtn);
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

const slideRight = (leftSliderContainers, rightSliderContainers) => {
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

const slideLeft = (leftSliderContainers, rightSliderContainers) => {
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

const slideDown = (leftSliderContainers, rightSlidercontainers) => {

};

const slideUp = (leftSliderContainers, rightSlidercontainers) => {

};

const openVideoContainer = (eventVideoContainer, videos) => {
    const darkOverlay = createHTMLElement('div', 'overlay', null);
    const closingBtn = createHTMLElement('span', 'closing-btn', '&#10005');
    darkOverlay.appendChild(closingBtn);
    document.body.prepend(darkOverlay);

    eventVideoContainer.classList.add('visible');

    darkOverlay.addEventListener('click', closeVideoContainer.bind(null,  darkOverlay, eventVideoContainer, videos));
};

const closeVideoContainer = (darkOverlay, eventVideoContainer, videos) => {
    eventVideoContainer.classList.remove('visible');
    videos.forEach(video => {
        const videoSrc = video.src;
        video.src = videoSrc
    });
    removeHTMLElement(darkOverlay);
};

const changeClass = (element, oldClass, newClass) => {
    element.classList.remove(oldClass);
    element.classList.add(newClass);
};
