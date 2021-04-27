document.addEventListener('DOMContentLoaded', () => {
    const feedbackBtnContainer = document.querySelector('.feedback-btn-container');
    const feedbackBtn = feedbackBtnContainer.querySelector('button');
    const feedbackForm = document.querySelector('.feedback-form');

    feedbackBtn.addEventListener('click', onFeedbackButtonClick.bind(null, feedbackBtnContainer, feedbackForm));
});

const onFeedbackButtonClick = (feedbackBtnContainer, feedbackForm) => {
    feedbackBtnContainer.classList.add('hidden');
    feedbackForm.classList.remove('hidden');
};
