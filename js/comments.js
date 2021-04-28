document.addEventListener('DOMContentLoaded', () => {
    const feedbackBtnContainer = document.querySelector('.feedback-btn-container');
    const feedbackBtn = feedbackBtnContainer.querySelector('button');
    const feedbackForm = document.querySelector('.feedback-form');
    const exitBtn = feedbackForm.querySelector('.exit-btn')

    feedbackBtn.addEventListener('click', toggleFeedbackForm.bind(null, feedbackBtnContainer, feedbackForm));
    exitBtn.addEventListener('click', toggleFeedbackForm.bind(null, feedbackBtnContainer, feedbackForm));
});

const toggleFeedbackForm = (feedbackBtnContainer, feedbackForm) => {
    feedbackBtnContainer.classList.toggle('hidden');
    feedbackForm.classList.toggle('hidden');
};
