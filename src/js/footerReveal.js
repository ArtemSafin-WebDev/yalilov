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
        '(min-width: 641px)': () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: pageFooter,
                    start: 'top bottom',
                    end: 'bottom bottom',
                    scrub: true
                }
            });

            tl.to(backplate, {
                autoAlpha: 1
            })
                .to(
                    whiteLogo,
                    {
                        autoAlpha: 1
                    },
                    0
                )
                .to(
                    normalLogo,
                    {
                        autoAlpha: 0
                    },
                    0
                );
        }
    });
}
