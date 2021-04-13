import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function valuesAnimations() {
    const values = document.querySelector('.values');
    if (!values || window.matchMedia(`(max-width: 640px)`).matches) return;


    const valuesIntro = document.querySelector('.values__intro')
    const picturesBlock = document.querySelector('.values__picture-block')
    const stickyImage = document.querySelector('.values__picture-block-sidebar-image')
    const policyBlock = document.querySelector('.values__policy-block');
    const opinionBlock = document.querySelector('.values__opinion-block');
    const missionBlock = document.querySelector('.values__mission');
    const prioritiesBlock = document.querySelector('.values__priorities')

    const blocksToReveal = [valuesIntro, picturesBlock, policyBlock, opinionBlock, missionBlock, prioritiesBlock];

    if (stickyImage) {
        ScrollTrigger.matchMedia({
            '(min-width: 641px)': () => {
                ScrollTrigger.create({
                    trigger: stickyImage,
                    start: 'top top+=20%',
                    end: () => `+=${picturesBlock.offsetHeight - stickyImage.offsetHeight}`,
                    pin: stickyImage,
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

   
    
}
