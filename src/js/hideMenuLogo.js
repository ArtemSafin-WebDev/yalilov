export default function hideMenuLogo() {
    if (!window.matchMedia('(max-width: 640px)').matches) return;

    const menu = document.querySelector('.page-header__mobile-menu');
    const logo = document.querySelector('.page-header__mobile-logo');

    if (!menu || !logo) return;

    const checkScroll = () => {
        if (menu.scrollTop > 80) {
            logo.classList.add('hidden');
        } else {
            logo.classList.remove('hidden');
        }
        requestAnimationFrame(checkScroll);
    };

    requestAnimationFrame(checkScroll);
}
