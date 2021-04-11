const months = ['януари', 'февруари', 'март', 'април', 'май', 'юни', 'юли', 'август', 'септември', 'октомври', 'ноември', 'декември'];

document.addEventListener('DOMContentLoaded', () => {
    const subscriberForm = document.querySelector('.subscriber-warning form');
    const commentForm = document.querySelector('.comment-form form');
    const selectedPosts = document.querySelectorAll('.selected-post');
    
    if (subscriberForm) {
        subscriberForm.addEventListener('submit', submitSubscriberForm.bind(null, subscriberForm));
    }

    commentForm.addEventListener('submit', submitCommentForm.bind(null, commentForm));

    [...commentForm.children].forEach((child, index) => {
        if (index !== 3) {
            child.children[0].addEventListener('focusout', styleElementLabel.bind(null, child.children[0]));
        }
    });

    selectedPosts.forEach((post) => {
        post.addEventListener('click', redirectToBlogPost.bind(null, post));
    });
});

const submitSubscriberForm = (form) => {
    this.event.preventDefault();

    if (form.checkValidity()) {
        sendFormData(form)
            .then((response) => {
                if (!response.ok) {
                    throw new Error();
                }

                document.querySelector('.blurred').classList.remove('blurred');
                removeHTMLElement(form.parentElement);
            })
            .catch(() => {
                populateFormMessage(form, false);
            });
    }
};

const submitCommentForm = (form) => {
    this.event.preventDefault();

    let container = document.querySelector('.comment-container');
    const currentDate = new Date();

    if (form.checkValidity()) {
        sendFormData(form, currentDate)
            .then((response) => {
                if (!response.ok) {
                    throw new Error();
                }


                if (!container) {
                    container = createCommentContainer();
                } 
                
                createCommentCard(container, response.data);
                upgradeCommentContainerTitle(container);

                [...form.elements].forEach((element) => {
                    if (element.type !== 'submit') {
                        element.value = '';
                        element.labels[0].classList.remove('top-positioned');
                    }
                });

                populateFormMessage(form, true);
            })
            .catch(() => {
                populateFormMessage(form, false);
            });
    }
};

const redirectToBlogPost = (post) => {
    const postId = post.dataset.id;
    this.location.href = './post.html';
};

const createCommentContainer = () => {
    const container = createHTMLElement('div', 'comment-container', null);
    const title = createHTMLElement('h5', null, 'За този материал има 1 коментар');
    container.appendChild(title);

    document.querySelector('.post-wrapper article').insertBefore(container, document.querySelector('.comment-form-container'));

    return container;
}

const createCommentCard = (container, data) => {
    const commentCard = createHTMLElement('div', 'comment-card', null);
    const commenter = createHTMLElement('span', 'commenter', data.name);

    const heading = document.createElement('h6');
    heading.appendChild(commenter);
    heading.innerHTML += ' написа:';

    const date = createHTMLElement('time', null, convertDate(data.date));
    const comment = createHTMLElement('p', null, data.comment);

    commentCard.appendChild(heading);
    commentCard.appendChild(date);
    commentCard.appendChild(comment);

    container.appendChild(commentCard);
};

const upgradeCommentContainerTitle = (container) => {
    container.children[0].innerText = `За този материал има ${container.children.length - 1} ${container.children.length === 2 ? 'коментар' : 'коментара'}`;
};

const convertDate = (date) => {
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} г. в ${date.getHours()}:${date.getMinutes()} часа`;
};

const styleElementLabel = (element) => {
    if (element.value) {
        element.labels[0].classList.add('top-positioned');
    } else if (element.labels[0].classList.contains('top-positioned')) {
        element.labels[0].classList.remove('top-positioned');
    }
};

const populateFormMessage = (form, isSuccess) => {
    const messageContainer = isSuccess ?
        createHTMLElement('div', 'success-message', null) :
        createHTMLElement('div', 'error-message', null);
    const message = isSuccess ?
        createHTMLElement('p', null, 'Коментарът ти е изпратен успешно и очаква одобрение от модератор.') :
        createHTMLElement('p', null, 'Нещо се обърка. Моля, опитай отново!');
    const exitBtn = createHTMLElement('span', 'exit-btn', '&#10005;');

    messageContainer.appendChild(message);
    messageContainer.appendChild(exitBtn);

    form.prepend(messageContainer);

    exitBtn.addEventListener('click', () => removeHTMLElement(messageContainer));
};
