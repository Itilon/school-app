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

    signupFormContainer.classList.add('visible');

    darkOverlay.addEventListener('click', () => {
        signupFormContainer.classList.remove('visible');
        removeHTMLElement(darkOverlay);
    });
};
