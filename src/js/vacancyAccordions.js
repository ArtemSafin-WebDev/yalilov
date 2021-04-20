import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function vacancyAccordions() {
    const SPEED = 0.8;

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

    const elements = Array.from(document.querySelectorAll('.js-vacancy-accordion'));

    elements.forEach(element => {
        const btn = element.querySelector('.career__vancancy-clickable-area');
        const content = element.querySelector('.career__vacancies-accordion-content');

        btn.addEventListener('click', event => {
            event.preventDefault();

            elements.forEach(otherElement => {
                if (otherElement !== element) {
                    if (otherElement.classList.contains('active')) {
                        const content = otherElement.querySelector('.career__vacancies-accordion-content');
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
