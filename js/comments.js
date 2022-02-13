document.addEventListener('DOMContentLoaded', () => {
    const feedbackBtnContainer = document.querySelector('.feedback-btn-container');
    const feedbackBtn = feedbackBtnContainer.querySelector('button');
    const feedbackFormContainer = document.querySelector('.feedback-form');
    const closingBtn = feedbackFormContainer.querySelector('.closing-btn');
    const feedbackForm = feedbackFormContainer.querySelector('form');
    const textarea = feedbackForm.querySelector('textarea');
    const paginationContainers = document.querySelectorAll('.pagination');
    const feedbackCards = document.querySelectorAll('.feedback-card');
    const practiceCards = document.querySelectorAll('.practice-card');

    feedbackBtn.addEventListener('click', toggleFeedbackFormContainer.bind(null, feedbackBtnContainer, feedbackFormContainer));
    closingBtn.addEventListener('click', toggleFeedbackFormContainer.bind(null, feedbackBtnContainer, feedbackFormContainer));
    feedbackForm.addEventListener('submit', submitFeedbackForm.bind(null, feedbackForm, feedbackBtnContainer, feedbackFormContainer));

    [...feedbackForm.children].forEach((child, index) => {
        if (index !== 4) {
            child.children[0].addEventListener('keyup', checkForInvalidBorderAndErrorMessage.bind(null, child.children[0]));
            child.children[0].addEventListener('focusout', styleElementLabel.bind(null, child.children[0]));
            child.children[0].addEventListener('focusout', checkElementValidity.bind(null, child.children[0]));
        }
    });

    textarea.addEventListener('keydown', resizeTextarea.bind(null, textarea));

    if (paginationContainers.length) {
        paginationContainers.forEach((container, i) => {
            const pageLinks = [...container.querySelectorAll('span')];
            const cards = i === 0 ? [...feedbackCards] : [...practiceCards];
            pageLinks.forEach((link) => link.addEventListener('click', handlePagination.bind(null, link, pageLinks, cards)));
        });
    }
});

const toggleFeedbackFormContainer = (feedbackBtnContainer, formContainer) => {
    feedbackBtnContainer.classList.toggle('hidden');
    formContainer.classList.toggle('hidden');

    if (formContainer.classList.contains('hidden')) {
        clearFeedbackForm(formContainer);
    }
};

const submitFeedbackForm = (form, feedbackBtnContainer, feedbackFormContainer) => {
    this.event.preventDefault();

    if (form.checkValidity()) {
        sendFormData(form)
            .then((response) => {
                if (!response.ok) {
                    throw new Error();
                }

                toggleFeedbackFormContainer(feedbackBtnContainer, feedbackFormContainer);
                populateSuccessMessage(feedbackBtnContainer, 'Отзивът е изпратен успешно.');
            })
            .catch(() => {
                if (!form.children[0].classList.contains('error-message')) {
                    populateErrorMessage(form, false);
                }
            });
    } else {
        const invalidFields = form.querySelectorAll(':invalid');
        invalidFields.forEach((field) => {
            if (!field.nextElementSibling.nextElementSibling) {
                populateErrorMessage(field, false);
            }
        });
    }
};

const clearFeedbackForm = (container) => {
    const formControls = [...container.querySelectorAll('.form-control')];
    formControls.pop();

    formControls.forEach((formControl) => {
        const errorMessage = formControl.querySelector('.error-message');
        const topPositionedLabel = formControl.querySelector('.top-positioned');
        const invalidField = formControl.querySelector('.invalid');

        if (errorMessage) {
            removeHTMLElement(errorMessage);
        }

        if (topPositionedLabel) {
            topPositionedLabel.classList.remove('top-positioned');
        }

        if (invalidField) {
            invalidField.classList.remove('invalid');
        }

        if (formControl.children[0].value) {
            formControl.children[0].value = '';
        }

        if (formControl.children[0].type === 'textarea') {
            formControl.children[0].style.height = 'auto';
        }
    });
};

const checkForInvalidBorderAndErrorMessage = (field) => {
    if (field.checkValidity()) {
        const errorMessage = field.parentElement.querySelector('.error-message');

        if (errorMessage) {
            removeHTMLElement(errorMessage);
        }

        field.classList.remove('invalid');
    }
};

const resizeTextarea = (textarea) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
};

const handlePagination = (link, pageLinks, cards) => {
    const linksLength = pageLinks.length;
    const linkPosition = pageLinks.findIndex(pageLink => pageLink === link);

    if (!link.classList.contains('current') && !link.classList.contains('disabled')) {
        const currentLink = pageLinks.find((link) => link.classList.contains('current'));
        let idx;

        if (linkPosition === 0) {
            idx = pageLinks.findIndex(pageLink => pageLink === currentLink) - 1;
        } else if (linkPosition === linksLength - 1) {
            idx = pageLinks.findIndex(pageLink => pageLink === currentLink) + 1;
        } else {
            idx = linkPosition;;
        }
        currentLink.classList.remove('current');
        pageLinks[idx].classList.add('current');
        handleDisabledLink(pageLinks[0], 1, idx);
        handleDisabledLink(pageLinks[linksLength - 1], linksLength - 2, idx);
        switchPage(idx, cards);
    }
};

const handleDisabledLink = (link, pos, linkPosition) => {
    if (linkPosition === pos) {
        link.classList.add('disabled');
    } else {
        link.classList.remove('disabled');
    }
};

const switchPage = (pageNumber, cards) => {
    startIndex = (pageNumber - 1) * 4;

    cards.forEach((card) => {
        if (!card.classList.contains('hidden')) {
            card.classList.add('hidden');
        }
    });

    cards.slice(startIndex, startIndex + 4).forEach((card) => card.classList.remove('hidden'));
};
