export default function practicNav() {
    if (!window.matchMedia('(max-width: 640px)').matches) return;
    const elements = Array.from(document.querySelectorAll('.js-practic-nav'));

    elements.forEach(element => {
        const scrollContainer = element.querySelector('.practic__nav-links');
        const links = Array.from(element.querySelectorAll('.practic__nav-link'));

        const activeLink = links.find(link => link.classList.contains('active'));

        if (!activeLink) return;
        const mlLeft = parseInt(window.getComputedStyle(links[0]).marginRight, 10);

        scrollContainer.scrollLeft = activeLink.offsetLeft - mlLeft;
    });
}
