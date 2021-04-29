import { lockScroll, unlockScroll } from './scrollBlocker';

export default function menuForm() {
    const menuForm = document.querySelector('.expert-form-menu');
    if (!menuForm) return;
    let menuOpen = false;

    const openFormBtn = document.querySelector('.js-open-form');
    const closeMenuFormBtn = document.querySelector('.js-close-form')
   
    const openMenu = () => {
        if (menuOpen) return;

        document.body.classList.add('menu-form-shown');

        if (typeof window.closeMenu === 'function') {
            window.closeMenu();
        }
        menuOpen = true;
        lockScroll(menuForm)
    };

    const closeMenu = () => {
        if (!menuOpen) return;
        document.body.classList.remove('menu-form-shown');
        menuOpen = false;
        unlockScroll();
    };

    if (openFormBtn) {
        openFormBtn.addEventListener('click', event => {
            event.preventDefault();
            openMenu();
        })
    }

    if (closeMenuFormBtn) {
        closeMenuFormBtn.addEventListener('click', event => {
            event.preventDefault();
            closeMenu();
        })
    }

    window.closeMenuForm = closeMenu;
    window.openMenuForm = openMenu;
}
