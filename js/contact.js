document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const formContainers = document.querySelectorAll('.contact-form [class*=-form]');
    
    tabs.forEach((tab) => tab.addEventListener('click', onTabClick.bind(null, tab, [...tabs], [...formContainers])));
});

const onTabClick = (clickedTab, tabs, formContainers) => {
    if (clickedTab.classList.contains('closed')) {
        const openTab = tabs.find(tab => tab.classList.contains('open'));
        const visibleFormContainer = formContainers.find(container => container.classList.contains('visible'));
        const hiddenFormContainer = formContainers.find(container => !container.classList.contains('visible'));

        openTab.classList.remove('open');
        openTab.classList.add('closed');

        clickedTab.classList.remove('closed');
        clickedTab.classList.add('open');

        visibleFormContainer.classList.remove('visible');
        hiddenFormContainer.classList.add('visible');
    }
};
