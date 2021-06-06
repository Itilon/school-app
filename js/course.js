document.addEventListener('DOMContentLoaded', () => {
    const signupBtn = document.querySelector('.single-course-wrapper .btn');
    const signupFormContainer = document.querySelector('.signup-form-container');

    signupBtn.addEventListener('click', openSignupForm.bind(null, signupFormContainer));
});

const openSignupForm = (signupFormContainer) => {
    const darkOverlay = createHTMLElement('div', 'overlay', null);
    const closingBtn = createHTMLElement('span', 'closing-btn', '&#10005');
    darkOverlay.appendChild(closingBtn);
    document.body.prepend(darkOverlay);

    signupFormContainer.classList.add('visible');

    darkOverlay.addEventListener('click', closeSignupForm.bind(null, darkOverlay, signupFormContainer));
};

const closeSignupForm = (darkOverlay, signupFormContainer) => {
    signupFormContainer.classList.remove('visible');
    removeHTMLElement(darkOverlay);
};
