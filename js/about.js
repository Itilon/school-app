document.addEventListener('DOMContentLoaded', () => {
    const messageWrapper = document.querySelector('.message-wrapper');
    const messageTitle = document.querySelector('.message-wrapper h3');
    const message = document.querySelector('.message-wrapper iframe');

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

        const intersectionOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        };
        
        const observer = new IntersectionObserver(onIntersection, intersectionOptions);
        observer.observe(messageWrapper);  
    } else {
        messageTitle.classList.add('top-slide');
        message.classList.add('bottom-slide');
    }
});
