document.addEventListener('DOMContentLoaded', () => {
    const signupButtons = document.querySelectorAll('button');
    signupButtons.forEach((button) => button.addEventListener('click', openSignupForm.bind(null, button)));
});

const openSignupForm = (button) => {
    const darkOverlay = createHTMLElement('div', 'overlay', null);
    document.body.prepend(darkOverlay);
    
    const signupFormContainer = document.querySelector('.signup-form-container');

    const options = signupFormContainer.querySelectorAll('option');
    [...options].find((option) => option.value === button.dataset.event).selected = 'selected';

    const select = signupFormContainer.querySelector('select');
    select.disabled = true;

    const inputs = signupFormContainer.querySelectorAll('input');
    inputs.forEach((input) => {
        input.addEventListener('keyup', checkForInvalidBorderAndErrorMessage.bind(null, input));
        input.addEventListener('focusout', checkElementValidity.bind(null, input));
    })

    signupFormContainer.classList.add('visible');

    darkOverlay.addEventListener('click', closeSignupForm.bind(null, signupFormContainer, darkOverlay, inputs));
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
