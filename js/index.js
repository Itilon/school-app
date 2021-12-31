document.addEventListener('DOMContentLoaded', () => {
    const showcaseForm = document.querySelector('.showcase-form form');
    const showcaseInputFields = showcaseForm.querySelectorAll('input');

    const contactForm = document.querySelector('.contacts form');
    const contactInputFields = contactForm.querySelectorAll('input');

    const quotes = [...document.querySelectorAll('.quote')];

    showcaseForm.addEventListener('submit', submitForm.bind(null, showcaseForm));
    showcaseInputFields.forEach((field) => {
        field.addEventListener('focusout', checkElementValidity.bind(null, field));

        if (field.type === 'checkbox') {
            field.addEventListener('click', checkForInvalidBorderAndErrorMessage.bind(null, field));
        } else {
            field.addEventListener('keyup', checkForInvalidBorderAndErrorMessage.bind(null, field));
        }
    });

    contactForm.addEventListener('submit', submitForm.bind(null, contactForm));
    contactInputFields.forEach((field) => {
        field.addEventListener('focusout', checkElementValidity.bind(null, field));
        field.addEventListener('keyup', checkForInvalidBorderAndErrorMessage.bind(null, field));
    });

    if (quotes.length > 1) {
        setInterval(switchQuotes.bind(null, quotes), 10000);
    }
});

const submitForm = (form) => {
    this.event.preventDefault();

    if (form.checkValidity()) {
        sendFormData(form)
            .then((response) => {
                if (!response.ok) {
                    throw new Error();
                }

                populateSuccessMessage(form, 'Записването е успешно.');
                clearForm(form);
            })
            .catch(() => {
                populateErrorMessage(form, false);
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

const checkForInvalidBorderAndErrorMessage = (field) => {
    if (field.checkValidity()) {
        const nextSibling = field.parentNode.nextElementSibling;

        if (field.type === 'checkbox') {
            field.nextElementSibling.classList.remove('invalid');
        } else {
            field.classList.remove('invalid');
        }

        if (nextSibling.classList.contains('error-message')) {
            removeHTMLElement(nextSibling);
        }
    }
};

switchQuotes = (quotes) => {
    const currentQuoteIndex = quotes.findIndex(quote => quote.classList.contains('shown'));
    quotes[currentQuoteIndex].classList.remove('shown');
    quotes[currentQuoteIndex].classList.add('exiting');
    setTimeout(() => {
        switchCSSClasses(quotes[currentQuoteIndex], 'exiting', 'hidden');
    }, 800);

    if (quotes[currentQuoteIndex + 1]) {
        setTimeout(() => {
            switchCSSClasses(quotes[currentQuoteIndex + 1], 'hidden', 'shown');
        }, 800);
    } else {
        setTimeout(() => {
            switchCSSClasses(quotes[0], 'hidden', 'shown');
        }, 800);
    }
};


switchCSSClasses = (element, classToRemove, classToAdd) => {
    element.classList.remove(classToRemove);
    element.classList.add(classToAdd);
};
