document.addEventListener('DOMContentLoaded', () => {
    const messageWrapper = document.querySelector('.message-wrapper');
    const messageTitle = document.querySelector('.message-wrapper h3');
    const message = document.querySelector('.message-wrapper iframe');
    const valueCards = document.querySelectorAll('.value-card');

    if ('IntersectionObserver' in window) {
        let firstIntersection = false;

        const onIntersection = (entries) => {
            if (!firstIntersection) {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        messageTitle.classList.add('top-slide');
                        message.classList.add('bottom-slide');
                        firstIntersection = true;
                    }
                });
            }
        };

        const intersectionOptions = { rootMargin: '0px', threshold: .75 };
        const observer = new IntersectionObserver(onIntersection, intersectionOptions);
        observer.observe(messageWrapper);  
    } else {
        messageTitle.classList.add('top-slide');
        message.classList.add('bottom-slide');
    }

    valueCards.forEach((valueCard) => valueCard.addEventListener('click', flipValueCard.bind(null, valueCard)));
});

const flipValueCard = (card) => {
    card.classList.toggle('flipped');
};
