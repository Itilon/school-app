document.addEventListener('DOMContentLoaded', () => {
    const navigation = document.querySelector('.navigation')
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    
    hamburgerMenu.addEventListener('click', toggleHamburgerMenu.bind(null, navigation));
});

const toggleHamburgerMenu = (navigation) => {
    navigation.classList.toggle('block');
};

const createHTMLElement = (tagName, className, innerText) => {
    const element = document.createElement(tagName);
    if (className) {
        element.classList.add(className);
    }
    if (innerText) {
        element.innerHTML = innerText;
    }
    return element;
};

const removeHTMLElement = (element) => {
    element.remove();
};
