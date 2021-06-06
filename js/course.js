document.addEventListener('DOMContentLoaded', () => {
    const signupBtn = document.querySelector('.single-course-wrapper .btn');
    const signupFormContainer = document.querySelector('.signup-form-container');
    const inputs = signupFormContainer.querySelectorAll('input');

    signupBtn.addEventListener('click', openSignupForm.bind(null, signupBtn, signupFormContainer, inputs));
    inputs.forEach((input) => {
        input.addEventListener('keyup', checkForInvalidBorderAndErrorMessage.bind(null, input));
        input.addEventListener('focusout', checkElementValidity.bind(null, input));
    });
});

const openSignupForm = (button, signupFormContainer, inputs) => {
    const darkOverlay = createHTMLElement('div', 'overlay', null);
    const closingBtn = createHTMLElement('span', 'closing-btn', '&#10005');
    darkOverlay.appendChild(closingBtn);
    document.body.prepend(darkOverlay);

    const select = signupFormContainer.querySelector('select');
    const options = signupFormContainer.querySelectorAll('option');

    select.disabled = true;
    [...options].find((option) => option.value === button.dataset.event).selected = 'selected';

    signupFormContainer.classList.add('visible');

    darkOverlay.addEventListener('click', closeSignupForm.bind(null, darkOverlay, signupFormContainer, inputs));
};

const closeSignupForm = (darkOverlay, signupFormContainer, inputs) => {
    removeHTMLElement(darkOverlay);
    signupFormContainer.classList.remove('visible');

    inputs.forEach((input) => {
        input.value = '';
        removeInvalidBorderAndErrorMessage(input);
    });
};
