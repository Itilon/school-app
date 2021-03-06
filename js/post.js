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

    if (form.checkValidity()) {
        sendFormData(form)
            .then((response) => {
                if (!response.ok) {
                    throw new Error();
                }

                if (container) {
                    const formData = new FormData(form);
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

const sendFormData = (form) => {
    const endpoint = form.action;
    const method = form.method;
    const formData = new FormData(form);

    return Promise.resolve({ ok: true });
};