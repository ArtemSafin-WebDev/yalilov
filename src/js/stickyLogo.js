import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function stickyLogo() {
    const stickyLogo = document.querySelector('.js-sticky-logo');
    const pageHeader = document.querySelector('.page-header');

    if (!stickyLogo) return;

    
    ScrollTrigger.matchMedia({
        '(min-width: 641px)': () => {
            ScrollTrigger.create({
                trigger: stickyLogo,
                start: () => `top top+=${parseInt(window.getComputedStyle(pageHeader).top, 10)}px`,
                endTrigger: 'html',
                end: 'bottom bottom',
                pin: true
            });
        }
    })
   

   
}
