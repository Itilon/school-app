document.addEventListener('DOMContentLoaded', () => {
    const showcaseForm = document.querySelector('.showcase-form form');

    showcaseForm.addEventListener('submit', submitSubscriberForm.bind(null, showcaseForm));
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
    } else {
        
    }
};
