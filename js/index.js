document.addEventListener('DOMContentLoaded', () => {
    const showcaseForm = document.querySelector('.showcase-form form');
    const inputFields = showcaseForm.querySelectorAll('input');

    showcaseForm.addEventListener('submit', submitSubscriberForm.bind(null, showcaseForm));
    inputFields.forEach((field) => field.addEventListener('focusout', checkFieldValidity.bind(null, field)));
});

const submitSubscriberForm = (form) => {
    this.event.preventDefault();
    if (form.checkValidity()) {
        sendFormData(form)
            .then((response) => {
                if (!response.ok) {
                    throw new Error();
                }
            })
            .catch(() => {
                
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
    if (field.checkValidity()) {
        field.classList.remove('invalid');
    } else {
        field.classList.add('invalid');
    }
};
