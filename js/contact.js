document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach((tab) => tab.addEventListener('click', onTabClick.bind(null, tab, [...tabs])));
});

const onTabClick = (clickedTab, tabs) => {
    if (clickedTab.classList.contains('closed')) {
        const openTab = tabs.find(tab => tab.classList.contains('open'));
        openTab.classList.remove('open');
        openTab.classList.add('closed');

        clickedTab.classList.remove('closed');
        clickedTab.classList.add('open');
    }
};
