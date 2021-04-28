import { lockScroll, unlockScroll } from './scrollBlocker';
import gsap from 'gsap';

export default function mobileMenu() {
    const btn = document.querySelector('.js-menu-burger');
    const menu = document.querySelector('.page-header__mobile-menu');
    const yalilov = document.querySelector('.page-header__mobile-menu-bg-yalilov');
    const partners = document.querySelector('.page-header__mobile-menu-bg-partners');
    let menuOpen = false;

    const openMenu = () => {
        menuOpen = true;
        document.body.classList.add('mobile-menu-open');
        lockScroll(menu);

        if (window.matchMedia("(max-width: 640px)").matches) return;

        const tl = gsap.timeline();

        tl.fromTo(
            yalilov,
            { xPercent: 30 },
            {
                xPercent: 0,
                duration: window.matchMedia("(max-width: 640px)").matches ? 3 : 6,
                ease: 'power2.out'
            }
        ).fromTo(
            partners,
            { xPercent: -30 },
            {
                xPercent: 0,
                duration: window.matchMedia("(max-width: 640px)").matches ? 3 : 6,
                ease: 'power2.out'
            },
            0
        );
    };
    const closeMenu = () => {
        menuOpen = false;
        document.body.classList.remove('mobile-menu-open');
        document.querySelector('.expert-form-menu').setAttribute("style", "opacity: 0; height: 0; z-index: -1; visibility: hidden;");
        unlockScroll();
    };

    if (btn) {
        btn.addEventListener('click', event => {
            event.preventDefault();
            if (!menuOpen) {
                openMenu();
            } else {
                closeMenu();
            }
        });
    }
}
