document.addEventListener('DOMContentLoaded', () => {
    const blogCards = document.querySelectorAll('.blog-card');

    blogCards.forEach((blogCard) => {
        blogCard.addEventListener('click', redirectToBlogPost.bind(null, blogCard));
    });
});

const redirectToBlogPost = (blogCard) => {
    const postId = blogCard.dataset.id;
    this.location.href = './post.html';
};