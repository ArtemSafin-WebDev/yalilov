import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function aboutAnimations() {
    const about = document.querySelector('.about');
    if (!about || window.matchMedia(`(max-width: 640px)`).matches) return;

    const experienceInfo = document.querySelector('.about__experience-info');
    const experience = document.querySelector('.about__experience');
    const aboutClientsTopRow = document.querySelector('.about__clients-top-row');
    const clientsSliderBlock = document.querySelector('.about__clients-slider-block');
    const principles = document.querySelector('.about__principles');
    const functions = document.querySelector('.about__functions');
    const functionsSideImage = document.querySelector('.about__functions-side-image-container');
    const functionsImage = document.querySelector('.about__functions-image-container');
    const blocksToReveal = [aboutClientsTopRow, clientsSliderBlock, principles, functions];

    if (experienceInfo) {
        ScrollTrigger.matchMedia({
            '(min-width: 641px)': () => {
                ScrollTrigger.create({
                    trigger: experienceInfo,
                    start: 'top top+=20%',

                    end: () => `+=${experience.offsetHeight - experienceInfo.offsetHeight}`,
                    pin: experienceInfo,
                    pinSpacing: false,
                    markers: false
                });
            }
        });
    }


    blocksToReveal.forEach(block => {
        if (block) {
            ScrollTrigger.matchMedia({
                '(min-width: 641px)': () => {
                    const timeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: block,
                            start: 'top bottom-=40%',
                            end: 'bottom top'
                        }
                    });
                    timeline.from(block, {
                        autoAlpha: 0,
                        duration: 0.7
                    })
                }
            });
        }
    })

   
    if (functions) {
    
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: functions,
                start: 'top bottom',
                scrub: true,
                end: 'bottom top'
            }
        });

        tl.from(functionsSideImage, {
            yPercent: 200
        }).from(functionsImage, {
            yPercent: 8
        }, 0)

    }
}
