document.addEventListener('DOMContentLoaded', () => {
    const subscriberForm = document.querySelector('.subscriber-warning form');
    const commentForm = document.querySelector('.comment-form form');
    const commentContainer = document.querySelector('.comment-container');
    const selectedPosts = document.querySelectorAll('.selected-post');

    if (subscriberForm) {
        subscriberForm.addEventListener('submit', submitSubscriberForm.bind(null, subscriberForm));
    }
    commentForm.addEventListener('submit', submitCommentForm.bind(null, commentForm, commentContainer))

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
            })
            .catch(() => {

            });
    }
};

const submitCommentForm = (form, container) => {
    this.event.preventDefault();

    const currentDate = new Date();

    if (form.checkValidity()) {
        sendFormData(form, currentDate)
            .then((response) => {
                if (!response.ok) {
                    throw new Error();
                }


                if (container) {
                    createCommentCard(container, response.data);
                }
            })
            .catch(() => {

            });
    }
};

const redirectToBlogPost = (post) => {
    const postId = post.dataset.id;
    this.location.href = './post.html';
};

const sendFormData = (form, currentDate) => {
    const endpoint = form.action;
    const method = form.method;
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => data[key] = value);
    data['date'] = currentDate;

    return Promise.resolve({ ok: true, data });
};

const createCommentCard = (container, data) => {
    const commentCard = document.createElement('div');
    commentCard.classList.add('comment-card');

    const commenter = document.createElement('span');
    commenter.classList.add('commenter');
    commenter.innerText = data.name;

    const heading = document.createElement('h6');
    heading.appendChild(commenter);
    heading.innerHTML += ' написа:';

    const date = document.createElement('time');
    date.innerText = data.date;

    const comment = document.createElement('p');
    comment.innerText = data.comment;

    commentCard.appendChild(heading);
    commentCard.appendChild(date);
    commentCard.appendChild(comment);

    container.appendChild(commentCard);
};
