import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



gsap.registerPlugin(ScrollTrigger);

export default function expertForm() {
    const expertForm = document.querySelector('.expert-form-trigger');
    const logo = document.querySelector('.page-header__logo')
    if (!expertForm) return;

   

    ScrollTrigger.matchMedia({
        
        '(min-width: 641px)': () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: expertForm,
                    start: () => `top top+=${logo.getBoundingClientRect().top + logo.offsetHeight}`,
                    end: `bottom top+=${logo.getBoundingClientRect().top + logo.offsetHeight}`,
                    
                    toggleActions: 'play reverse play reverse',
                    markers: false
                }
            });

            tl.to(logo, {
                autoAlpha: 0,
                duration: 0.2
            })

            

        }
    });
}