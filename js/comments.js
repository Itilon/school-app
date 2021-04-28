document.addEventListener('DOMContentLoaded', () => {
    const feedbackBtnContainer = document.querySelector('.feedback-btn-container');
    const feedbackBtn = feedbackBtnContainer.querySelector('button');
    const feedbackFormContainer = document.querySelector('.feedback-form');
    const closingBtn = feedbackFormContainer.querySelector('.closing-btn');
    const feedbackForm = feedbackFormContainer.querySelector('form');

    feedbackBtn.addEventListener('click', toggleFeedbackFormContainer.bind(null, feedbackBtnContainer, feedbackFormContainer));
    closingBtn.addEventListener('click', toggleFeedbackFormContainer.bind(null, feedbackBtnContainer, feedbackFormContainer));
    feedbackForm.addEventListener('submit', submitFeedbackForm.bind(null, feedbackForm));
});

const toggleFeedbackFormContainer = (feedbackBtnContainer, formContainer) => {
    feedbackBtnContainer.classList.toggle('hidden');
    formContainer.classList.toggle('hidden');
};

const submitFeedbackForm = (form) => {
    this.event.preventDefault();

    if (form.checkValidity()) {

    } else {
        const invalidFields = form.querySelectorAll(':invalid');
        invalidFields.forEach((field) => populateErrorMessage(field));
    }
};

const populateErrorMessage = (field) => {
    let messageContainer;
    
    switch(field.type) {
        case 'text':
            messageContainer = createErrorMessage('Моля, попълни името си!');
            break;
        case 'email':
            messageContainer = createErrorMessage('Моля, попълни електронната си поща!');
            break;
        default:
            messageContainer = createErrorMessage('Моля, остави ни отзив!');
            break;
    }

    field.parentNode.appendChild(messageContainer);
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
