document.addEventListener('DOMContentLoaded', () => {
    const signupBtn = document.querySelector('.single-course-wrapper .btn');

    signupBtn.addEventListener('click', openSignupForm);
});

const openSignupForm = () => {
    const darkOverlay = createHTMLElement('div', 'overlay', null);
    const closingBtn = createHTMLElement('span', 'closing-btn', '&#10005');
    darkOverlay.appendChild(closingBtn);
    document.body.prepend(darkOverlay);

    darkOverlay.addEventListener('click', closeSignupForm.bind(null, darkOverlay));
};

const closeSignupForm = (darkOverlay) => {
    removeHTMLElement(darkOverlay);
};
