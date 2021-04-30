document.addEventListener('DOMContentLoaded', () => {
    const feedbackBtnContainer = document.querySelector('.feedback-btn-container');
    const feedbackBtn = feedbackBtnContainer.querySelector('button');
    const feedbackFormContainer = document.querySelector('.feedback-form');
    const closingBtn = feedbackFormContainer.querySelector('.closing-btn');
    const feedbackForm = feedbackFormContainer.querySelector('form');
    const textarea = feedbackForm.querySelector('textarea');

    feedbackBtn.addEventListener('click', toggleFeedbackFormContainer.bind(null, feedbackBtnContainer, feedbackFormContainer));
    closingBtn.addEventListener('click', toggleFeedbackFormContainer.bind(null, feedbackBtnContainer, feedbackFormContainer));
    feedbackForm.addEventListener('submit', submitFeedbackForm.bind(null, feedbackForm, feedbackBtnContainer, feedbackFormContainer));

    [...feedbackForm.children].forEach((child, index) => {
        if (index !== 3) {
            child.children[0].addEventListener('keyup', checkForErrorMessage.bind(null, child.children[0]));
            child.children[0].addEventListener('focusout', styleElementLabel.bind(null, child.children[0]));
        }
    });

    textarea.addEventListener('keydown', resizeTextarea.bind(null, textarea));
});

const toggleFeedbackFormContainer = (feedbackBtnContainer, formContainer) => {
    feedbackBtnContainer.classList.toggle('hidden');
    formContainer.classList.toggle('hidden');

    if (formContainer.classList.contains('hidden')) {
        clearForm(formContainer);
    }
};

const submitFeedbackForm = (form, feedbackBtnContainer, feedbackFormContainer) => {
    this.event.preventDefault();

    if (form.checkValidity()) {
        sendFormData(form)
            .then((response) => {
                if (!response.ok) {
                    throw new Error();
                }

                toggleFeedbackFormContainer(feedbackBtnContainer, feedbackFormContainer);
            })
            .catch(() => {
                populateErrorMessage(form);
            });
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
        case 'textarea':
            messageContainer = createErrorMessage('Моля, остави ни отзив!');
            break;
        default:
            messageContainer = createErrorMessage('Нещо се обърка. Моля, опитай отново!');
    }

    field.type ? field.parentNode.appendChild(messageContainer) : field.insertBefore(messageContainer, field.firstChild);;
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

const clearForm = (container) => {
    const formControls = [...container.querySelectorAll('.form-control')];
    formControls.pop();

    formControls.forEach((formControl) => {
        const errorMessage = formControl.querySelector('.error-message');
        const topPositionedLabel = formControl.querySelector('.top-positioned');

        if (errorMessage) {
            removeHTMLElement(errorMessage);
        }

        if (topPositionedLabel) {
            topPositionedLabel.classList.remove('top-positioned');
        }

        if (formControl.children[0].value) {
            formControl.children[0].value = '';
        }
    });
};

const checkForErrorMessage = (field) => {
    const errorMessage = field.parentElement.querySelector('.error-message');

    if (field.checkValidity() && errorMessage) {
        removeHTMLElement(errorMessage);
    }
};

const resizeTextarea = (textarea) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
};
