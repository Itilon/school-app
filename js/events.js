let signupFormTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
    const signupButtons = document.querySelectorAll('.signup-btn');
    const signupFormContainer = document.querySelector('.signup-form-container');
    const form = signupFormContainer.querySelector('form');
    const inputs = signupFormContainer.querySelectorAll('input');

    signupButtons.forEach((button) => button.addEventListener('click', openSignupForm.bind(null, button, signupFormContainer, inputs)));
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        submitForm(form, signupFormContainer, inputs);
    });
    inputs.forEach((input) => {
        input.addEventListener('keyup', checkForInvalidBorderAndErrorMessage.bind(null, input));
        input.addEventListener('focusout', checkElementValidity.bind(null, input));
    });
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
