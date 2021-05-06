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

const populateErrorMessage = (field, isShowcaseFormField) => {
    const fieldParent = field.parentNode;
    let messageContainer;
    
    switch(field.type) {
        case 'text':
            messageContainer = createErrorMessage('Моля, попълни името си!');
            break;
        case 'email':
            messageContainer = createErrorMessage('Моля, попълни електронната си поща!');
            break;
        case 'textarea':
            messageContainer = createErrorMessage('Моля, остави ни отзив!');
            break;
        case 'tel':
            messageContainer = createErrorMessage('Моля, въведи телефонния си номер!');
            break;
        case 'checkbox':
            messageContainer = createErrorMessage('Моля, приеми условията на сайта!');
            break;
        default:
            messageContainer = createErrorMessage('Нещо се обърка. Моля, опитай отново!');
    }

    isShowcaseFormField ?
        fieldParent.parentNode.insertBefore(messageContainer, fieldParent.nextElementSibling) :
        field.type ?
            fieldParent.appendChild(messageContainer) : field.insertBefore(messageContainer, field.firstChild);
};

const createErrorMessage = (text) => {
    const messageContainer = createHTMLElement('div', 'error-message', null);
    const message = createHTMLElement('p', null, text);
    const exitBtn = createHTMLElement('span', 'exit-btn', '&#10005;');

    messageContainer.appendChild(message);
    messageContainer.appendChild(exitBtn);

    exitBtn.addEventListener('click', () => removeHTMLElement(messageContainer));

    return messageContainer;
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

const styleElementLabel = (element) => {
    if (element.value) {
        element.labels[0].classList.add('top-positioned');
    } else if (element.labels[0].classList.contains('top-positioned')) {
        element.labels[0].classList.remove('top-positioned');
    }
};

const checkElementValidity = (element) => {
    if (!element.checkValidity()) {
        if (element.type === 'checkbox') {
            element.nextElementSibling.classList.add('invalid');
        } else {
            element.classList.add('invalid');
        }
    }
};
