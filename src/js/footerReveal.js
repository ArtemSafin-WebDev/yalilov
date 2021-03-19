import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function footerReveal() {
    const pageFooter = document.querySelector('.page-footer');
    const backplate = document.querySelector('.home-video__green-backplate');
    const whiteLogo = document.querySelector('.intro__white-logo-image');
    const normalLogo = document.querySelector('.intro__logo-image');

    if (!pageFooter || !backplate) return;

    ScrollTrigger.matchMedia({
        '(min-width: 769px)': () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: pageFooter,
                    start: 'top bottom-=20%',
                    end: 'bottom bottom',
                    scrub: false,
                    toggleActions: 'play pause play reverse'
                }
            });

            tl.to(backplate, {
                autoAlpha: 1,
                duration: 0.3
            });

            if (whiteLogo && normalLogo) {
                console.log(whiteLogo, normalLogo)
                tl.to(
                    whiteLogo,
                    {
                        autoAlpha: 1,
                        duration: 0.3
                    },
                    0
                ).to(
                    normalLogo,
                    {
                        autoAlpha: 0,
                        duration: 0.3
                    },
                    0
                );
            }
        },
        '(max-width: 640px)': () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: pageFooter,
                    start: 'top bottom-=20%',
                    end: 'bottom bottom',
                    scrub: false,
                    toggleActions: 'play pause play reverse'
                }
            });

            tl.to(backplate, {
                autoAlpha: 1,
                duration: 0.3
            });

            if (whiteLogo && normalLogo) {
                tl.to(
                    whiteLogo,
                    {
                        autoAlpha: 1,
                        duration: 0.3
                    },
                    0
                ).to(
                    normalLogo,
                    {
                        autoAlpha: 0,
                        duration: 0.3
                    },
                    0
                );
            }
        }
    });
}
