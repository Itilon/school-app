let signupFormTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
    const signupBtn = document.querySelector('.single-course-wrapper .btn');
    const signupFormContainer = document.querySelector('.signup-form-container');
    const signupForm = signupFormContainer.querySelector('form');
    const inputs = signupForm.querySelectorAll('input');
    const priceContainer = document.querySelector('.single-course-wrapper .price-container');
    const priceOverlay = priceContainer.querySelector('.price-overlay');

    signupBtn.addEventListener('click', openSignupForm.bind(null, signupBtn, signupFormContainer, inputs));
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        submitForm(signupForm, signupFormContainer, inputs);
    });
    inputs.forEach((input) => {
        input.addEventListener('keyup', checkForInvalidBorderAndErrorMessage.bind(null, input));
        input.addEventListener('focusout', checkElementValidity.bind(null, input));
    });

    priceOverlay.addEventListener('click', togglePriceOverlay.bind(null, priceOverlay, priceContainer));
});

const submitForm = (form, signupFormContainer, inputs) => {
    if (form.checkValidity()) {
        sendFormData(form)
            .then((response) => {
                if (!response.ok) {
                    throw new Error();
                }

                populateSuccessMessage(form, 'Записването е успешно.');
                clearForm(form);
                signupFormTimeout = setTimeout(() => closeSignupForm(signupFormContainer, inputs), 4000);
            })
            .catch(() => {
                if (!form.children[0].classList.contains('error-message')) {
                    populateErrorMessage(form, false);
                }
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

const checkForInvalidBorderAndErrorMessage = (input) => {
    if (input.checkValidity()) {
        removeInvalidBorderAndErrorMessage(input);
    }
};

const togglePriceOverlay = (priceOverlay, priceContainer) => {
    priceOverlay.classList.toggle('opaque');
    priceContainer.classList.toggle('opaque');
};
