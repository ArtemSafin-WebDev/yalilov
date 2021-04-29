
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



gsap.registerPlugin(ScrollTrigger);

export default function secondaryLanguages() {
    const secondaryLanguages = document.querySelector('.secondary-languages')
  
    if (!secondaryLanguages) return;

    ScrollTrigger.matchMedia({
        
        '(min-width: 641px)': () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: document.querySelector('.page-footer'),
                    start: 'top bottom',
                    toggleActions: 'play reverse play reverse',
                    markers: false
                }
            });

            tl.to(secondaryLanguages, {
                autoAlpha: 0,
                duration: 0.2
            })

        }
    });
}