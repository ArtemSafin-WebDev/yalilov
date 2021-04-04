export default function socialNav() {
    if (!window.matchMedia('(max-width: 640px)').matches) return;
    const elements = Array.from(document.querySelectorAll('.js-social-nav'));

    elements.forEach(element => {
        const scrollContainer = element.querySelector('.social__sidebar-nav');
        const links = Array.from(element.querySelectorAll('.social__sidebar-nav-link'));

        const activeLink = links.find(link => link.classList.contains('active'));

        if (!activeLink) return;
        const mlLeft = parseInt(window.getComputedStyle(links[0]).marginRight, 10);

        scrollContainer.scrollLeft = activeLink.offsetLeft - mlLeft;
    });
}
