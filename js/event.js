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
    const videoWrappers = eventVideoContainer.querySelectorAll('.video');
    const videos = eventVideoContainer.querySelectorAll('iframe');
    const dots = eventVideoContainer.querySelectorAll('.dot');

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
    
    if (dots) {
        dots.forEach((dot) => dot.addEventListener('click', onDotClicked.bind(null, dot, [...dots], [...videoWrappers])));
    }
});

const showFullScreenImage = (image, leftSlider, rightSlider) => {
    if (!image.classList.contains('full-size')) {
        image.parentElement.classList.add('full-size');
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
    image.parentElement.classList.remove('full-size');
    image.classList.remove('full-size');
    removeHTMLElement(darkOverlay);

    setTimeout(() => {
        rightSlider.classList.remove('overlayed');
        leftSlider.classList.remove('overlayed');
    }, 500);
};

const slideRight = (leftSliderContainers, rightSliderContainers) => {
    const { previousContainerIndex, currentContainerIndex, nextContainerIndex } = getContainerIndices(leftSliderContainers, rightSliderContainers);
    removeContainers(leftSliderContainers, rightSliderContainers, previousContainerIndex, currentContainerIndex, nextContainerIndex);
    moveImagesRightAndUp(leftSliderContainers, rightSliderContainers, currentContainerIndex, nextContainerIndex);
};

const slideLeft = (leftSliderContainers, rightSliderContainers) => {
    const { previousContainerIndex, currentContainerIndex, nextContainerIndex } = getContainerIndices(leftSliderContainers, rightSliderContainers);
    removeContainers(leftSliderContainers, rightSliderContainers, previousContainerIndex, currentContainerIndex, nextContainerIndex);
    moveImagesLeftAndDown(leftSliderContainers, rightSliderContainers, previousContainerIndex, currentContainerIndex);
};

const slideDown = (leftSliderContainers, rightSliderContainers) => {
    const { previousContainerIndex, currentContainerIndex, nextContainerIndex } = getContainerIndices(leftSliderContainers, rightSliderContainers);
    removeContainers(leftSliderContainers, rightSliderContainers, previousContainerIndex, currentContainerIndex, nextContainerIndex);
    moveImagesLeftAndDown(leftSliderContainers, rightSliderContainers, previousContainerIndex, currentContainerIndex);
};

const slideUp = (leftSliderContainers, rightSliderContainers) => {
    const { previousContainerIndex, currentContainerIndex, nextContainerIndex } = getContainerIndices(leftSliderContainers, rightSliderContainers);
    removeContainers(leftSliderContainers, rightSliderContainers, previousContainerIndex, currentContainerIndex, nextContainerIndex);
    moveImagesRightAndUp(leftSliderContainers, rightSliderContainers, currentContainerIndex, nextContainerIndex);
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

const getContainerIndices = (leftSliderContainers) => {
    const previousContainerIndex = leftSliderContainers.findIndex(container => container.classList.contains('previous-container'));
    const currentContainerIndex = leftSliderContainers.findIndex(container => container.classList.contains('current-container'));
    const nextContainerIndex = leftSliderContainers.findIndex(container => container.classList.contains('next-container'));

    return { previousContainerIndex, currentContainerIndex, nextContainerIndex };
};

const removeContainers = (leftSliderContainers, rightSliderContainers, previousContainerIndex, currentContainerIndex, nextContainerIndex) => {
    leftSliderContainers[currentContainerIndex].classList.remove('current-container');
    leftSliderContainers[previousContainerIndex].classList.remove('previous-container');
    leftSliderContainers[nextContainerIndex].classList.remove('next-container');
    rightSliderContainers[currentContainerIndex].classList.remove('current');
    rightSliderContainers[previousContainerIndex].classList.remove('previous');
    rightSliderContainers[nextContainerIndex].classList.remove('next');
};

const moveImagesLeftAndDown = (leftSliderContainers, rightSliderContainers, previousContainerIndex, currentContainerIndex) => {
    if (leftSliderContainers[currentContainerIndex - 1]) {
        leftSliderContainers[currentContainerIndex - 1].classList.add('current-container');
        rightSliderContainers[currentContainerIndex - 1].classList.add('current');
    } else {
        leftSliderContainers[leftSliderContainers.length - 1].classList.add('current-container');
        rightSliderContainers[rightSliderContainers.length - 1].classList.add('current');
    }

    if (leftSliderContainers[previousContainerIndex - 1]) {
        leftSliderContainers[previousContainerIndex - 1].classList.add('previous-container');
        rightSliderContainers[previousContainerIndex - 1].classList.add('previous');
    } else {
        leftSliderContainers[leftSliderContainers.length - 1].classList.add('previous-container');
        rightSliderContainers[rightSliderContainers.length - 1].classList.add('previous');
    }

    leftSliderContainers[currentContainerIndex].classList.add('next-container');
    rightSliderContainers[currentContainerIndex].classList.add('next');
};

const moveImagesRightAndUp = (leftSliderContainers, rightSliderContainers, currentContainerIndex, nextContainerIndex) => {
    if (leftSliderContainers[currentContainerIndex + 1]) {
        leftSliderContainers[currentContainerIndex + 1].classList.add('current-container');
        rightSliderContainers[currentContainerIndex + 1].classList.add('current');
    } else {
        leftSliderContainers[0].classList.add('current-container');
        rightSliderContainers[0].classList.add('current');
    }

    if (leftSliderContainers[nextContainerIndex + 1]) {
        leftSliderContainers[nextContainerIndex + 1].classList.add('next-container');
        rightSliderContainers[nextContainerIndex + 1].classList.add('next');
    } else {
        leftSliderContainers[0].classList.add('next-container');
        rightSliderContainers[0].classList.add('next');
    }

    leftSliderContainers[currentContainerIndex].classList.add('previous-container');
    rightSliderContainers[currentContainerIndex].classList.add('previous');
};

const onDotClicked = (dot, dots, videoWrappers) => {
    if (!dot.classList.contains('selected')) {
        dots.find(dot => dot.classList.contains('selected')).classList.remove('selected');
        dot.classList.add('selected');
        
        const videoId = dot.dataset.id;
        videoWrappers.find(wrapper => wrapper.classList.contains('shown')).classList.remove('shown');
        videoWrappers.find(wrapper => wrapper.dataset.id === videoId).classList.add('shown');
    }
};
