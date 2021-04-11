document.addEventListener('DOMContentLoaded', () => {
    const navigation = document.querySelector('.navigation')
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    
    hamburgerMenu.addEventListener('click', toggleHamburgerMenu.bind(null, navigation));
});

const toggleHamburgerMenu = (navigation) => {
    navigation.classList.toggle('block');
};

const sendFormData = (form, currentDate) => {
    const endpoint = form.action;
    const method = form.method;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => data[key] = value);
    data['date'] = currentDate;

    return Promise.resolve({ ok: true, data });
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
