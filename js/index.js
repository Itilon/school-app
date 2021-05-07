document.addEventListener('DOMContentLoaded', () => {
    const showcaseForm = document.querySelector('.showcase-form form');
    const showcaseInputFields = showcaseForm.querySelectorAll('input');

    const contactForm = document.querySelector('.contacts form');
    const contactInputFields = contactForm.querySelectorAll('input');

    showcaseForm.addEventListener('submit', submitForm.bind(null, showcaseForm));
    showcaseInputFields.forEach((field) => {
        field.addEventListener('focusout', checkElementValidity.bind(null, field));

        if (field.type === 'checkbox') {
            field.addEventListener('click', checkForInvalidBorderAndErrorMessage.bind(null, field));
        } else {
            field.addEventListener('keyup', checkForInvalidBorderAndErrorMessage.bind(null, field));
        }
    });

    contactForm.addEventListener('submit', submitForm.bind(null, contactForm));
    contactInputFields.forEach((field) => {
        field.addEventListener('focusout', checkElementValidity.bind(null, field));
        field.addEventListener('keyup', checkForInvalidBorderAndErrorMessage.bind(null, field));
    });
});

const submitForm = (form) => {
    this.event.preventDefault();

    if (form.checkValidity()) {
        sendFormData(form)
            .then((response) => {
                if (!response.ok) {
                    throw new Error();
                }

                populateSuccessMessage(form, 'Записването е успешно.');
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
