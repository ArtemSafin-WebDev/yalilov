import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function stickyLogo() {
    const stickyLogo = document.querySelector('.js-sticky-logo');
    const pageFooterContent = document.querySelector('.page-footer__content');

    if (!stickyLogo) return;

    

   

    ScrollTrigger.create({
        trigger: stickyLogo,
        start: () => `top top+=${parseInt(window.getComputedStyle(pageFooterContent).paddingTop, 10)}px`,
        endTrigger: 'html',
        end: 'bottom bottom',
        pin: true
    });
}
