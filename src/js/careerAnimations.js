import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function careerAnimations() {
    const values = document.querySelector('.career');
    if (!values || window.matchMedia(`(max-width: 640px)`).matches) return;

    const intro = document.querySelector('.career__intro');
    const invite = document.querySelector('.career__invite');
    const culture = document.querySelector('.career__culture');
    const vacancies = document.querySelector('.career__vacancies');

    const blocksToReveal = [intro, invite, culture, vacancies];

  

    blocksToReveal.forEach(block => {
        if (block) {
            ScrollTrigger.matchMedia({
                '(min-width: 641px)': () => {
                    const timeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: block,
                            start: 'top bottom-=25%',
                            end: 'bottom top'
                        }
                    });
                    timeline.from(block, {
                        autoAlpha: 0,
                        duration: 0.7
                    });
                }
            });
        }
    });
}
