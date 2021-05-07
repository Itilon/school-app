document.addEventListener('DOMContentLoaded', () => {
    const signupButtons = document.querySelectorAll('.signup-btn');
    signupButtons.forEach((button) => button.addEventListener('click', openSignupForm.bind(null, button)));
});

const openSignupForm = (button) => {
    const darkOverlay = createHTMLElement('div', 'overlay', null);
    document.body.prepend(darkOverlay);
    
    const signupFormContainer = document.querySelector('.signup-form-container');
    const form = signupFormContainer.querySelector('form');
    const inputs = signupFormContainer.querySelectorAll('input');
    const select = signupFormContainer.querySelector('select');
    const options = signupFormContainer.querySelectorAll('option');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        submitForm(form, { signupFormContainer, darkOverlay, inputs });
    });
    inputs.forEach((input) => {
        input.addEventListener('keyup', checkForInvalidBorderAndErrorMessage.bind(null, input));
        input.addEventListener('focusout', checkElementValidity.bind(null, input));
    });
    select.disabled = true;
    [...options].find((option) => option.value === button.dataset.event).selected = 'selected';

    signupFormContainer.classList.add('visible');

    darkOverlay.addEventListener('click', closeSignupForm.bind(null, signupFormContainer, darkOverlay, inputs));
};

const submitForm = (form, { signupFormContainer, darkOverlay, inputs }) => {
    if (form.checkValidity()) {
        sendFormData(form)
            .then((response) => {
                if (!response.ok) {
                    throw new Error();
                }

                populateSuccessMessage(form, 'Записването е успешно.');
                clearForm(form);
                setTimeout(() => closeSignupForm(signupFormContainer, darkOverlay, inputs), 4000);
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
        input.classList.remove('invalid');
    }
};

const closeSignupForm = (signupFormContainer, darkOverlay, inputs) => {
    signupFormContainer.classList.remove('visible');
    removeHTMLElement(darkOverlay);

    inputs.forEach((input) => {
        input.value = '';
        input.classList.remove('invalid');
    });
};
