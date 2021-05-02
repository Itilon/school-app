document.addEventListener('DOMContentLoaded', () => {
    const showcaseForm = document.querySelector('.showcase-form form');
    const inputFields = showcaseForm.querySelectorAll('input');

    showcaseForm.addEventListener('submit', submitSubscriberForm.bind(null, showcaseForm));
    inputFields.forEach((field) => {
        field.addEventListener('focusout', checkFieldValidity.bind(null, field));

        if (field.type === 'checkbox') {
            field.addEventListener('click', checkForInvalidBorderAndErrorMessage.bind(null, field));
        } else {
            field.addEventListener('keyup', checkForInvalidBorderAndErrorMessage.bind(null, field));
        }
    });
});

const submitSubscriberForm = (form) => {
    this.event.preventDefault();

    if (form.checkValidity()) {
        sendFormData(form)
            .then((response) => {
                if (!response.ok) {
                    throw new Error();
                }

                populateSuccessMessage(form);
                clearForm(form);
            })
            .catch(() => {
                populateErrorMessage(form, false);
            });
    } else {
        const invalidFields = form.querySelectorAll(':invalid');
        invalidFields.forEach((field) => {
            if (!field.parentNode.nextElementSibling.classList.contains('error-message')) {
                populateErrorMessage(field, true);
            }
        });
    }
};

const checkFieldValidity = (field) => {
    if (!field.checkValidity()) {
        if (field.type === 'checkbox') {
            field.nextElementSibling.classList.add('invalid');
        } else {
            field.classList.add('invalid');
        }
    }
};

const checkForInvalidBorderAndErrorMessage = (field) => {
    if (field.checkValidity()) {
        const nextSibling = field.parentNode.nextElementSibling;

        if (field.type === 'checkbox') {
            field.nextElementSibling.classList.remove('invalid');
        } else {
            field.classList.remove('invalid');
        }

        if (nextSibling.classList.contains('error-message')) {
            removeHTMLElement(nextSibling);
        }
    }
};

const populateSuccessMessage = (form) => {
    const messageContainer = createHTMLElement('div', 'success-message', null);
    const message = createHTMLElement('p', null, 'Записването е успешно.');
    const exitBtn = createHTMLElement('span', 'exit-btn', '&#10005;');

    messageContainer.appendChild(message);
    messageContainer.appendChild(exitBtn);

    form.prepend(messageContainer);

    exitBtn.addEventListener('click', () => removeHTMLElement(messageContainer));
};

const clearForm = (form) => {
    const inputFields = form.querySelectorAll('input');

    inputFields.forEach((field) => {
        if (field.type === 'checkbox') {
            field.checked = false;
        } else {
            field.value = '';
        }
    });
};
