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

    if (aboutClientsTopRow) {
        ScrollTrigger.matchMedia({
            '(min-width: 641px)': () => {
                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: aboutClientsTopRow,
                        start: 'top center',
                        end: 'bottom top'
                    }
                });
                timeline.from(aboutClientsTopRow, {
                    autoAlpha: 0,
                    duration: 0.7
                })
            }
        });
    }
    if (clientsSliderBlock) {
        ScrollTrigger.matchMedia({
            '(min-width: 641px)': () => {
                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: clientsSliderBlock,
                        start: 'top center',
                        end: 'bottom top'
                    }
                });
                timeline.from(clientsSliderBlock, {
                    autoAlpha: 0,
                    duration: 0.7
                })
            }
        });
    }
    if (principles) {
        ScrollTrigger.matchMedia({
            '(min-width: 641px)': () => {
                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: principles,
                        start: 'top center',
                        end: 'bottom top'
                    }
                });
                timeline.from(principles, {
                    autoAlpha: 0,
                    duration: 0.7
                })
            }
        });
    }
    if (functions) {
        ScrollTrigger.matchMedia({
            '(min-width: 641px)': () => {
                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: functions,
                        start: 'top center',
                        end: 'bottom top'
                    }
                });
                timeline.from(functions, {
                    autoAlpha: 0,
                    duration: 0.7
                })
            }
        });

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
            yPercent: 30
        }, 0)

    }
}
