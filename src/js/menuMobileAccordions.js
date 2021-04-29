import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function menuMobileAccordions() {

    if (!window.matchMedia("(max-width: 640px)").matches) return;
    const SPEED = 0.5;

    const openAccordion = element => {
        gsap.to(element, {
            height: 'auto',
            duration: SPEED,
            onComplete: () => ScrollTrigger.refresh()
        });
    };
    const closeAccordion = element => {
        gsap.to(element, {
            height: 0,
            duration: SPEED,
            onComplete: () => ScrollTrigger.refresh()
        });
    };

    const elements = Array.from(document.querySelectorAll('.js-mobile-menu-accordion'));

    elements.forEach(element => {
        const btn = element.querySelector('.js-mobile-menu-accordion-btn');
        const content = element.querySelector('.js-mobile-menu-accordion-content');

        btn.addEventListener('click', event => {
            event.preventDefault();

            elements.forEach(otherElement => {
                if (otherElement !== element) {
                    if (otherElement.classList.contains('active')) {
                        const content = otherElement.querySelector('.js-mobile-menu-accordion-content');
                        closeAccordion(content);
                        otherElement.classList.remove('active');
                    }
                }
            });

            if (element.classList.contains('active')) {
                closeAccordion(content);
            } else {
                openAccordion(content);
            }
            element.classList.toggle('active');
        });
    });
}
