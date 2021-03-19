import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



gsap.registerPlugin(ScrollTrigger);

export default function expertForm() {
    const expertForm = document.querySelector('.expert-form');
    const logo = document.querySelector('.page-header__logo')
    if (!expertForm) return;

   

    ScrollTrigger.matchMedia({
        
        '(min-width: 641px)': () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: expertForm,
                    start: 'center bottom',
                   
                    scrub: false,
                    toggleActions: 'play pause play reverse',
                    markers: false,
                    onEnter: () => console.log('Enter')
                }
            });

            tl.to(logo, {
                autoAlpha: 0,
                duration: 0.2
            })

            

        }
    });
}