document.addEventListener('DOMContentLoaded', () => {
    const selectedPosts = document.querySelectorAll('.selected-post');

    selectedPosts.forEach((post) => {
        post.addEventListener('click', redirectToBlogPost.bind(null, post));
    });
});

const redirectToBlogPost = (post) => {
    const postId = post.dataset.id;
    this.location.href = './post.html';
};