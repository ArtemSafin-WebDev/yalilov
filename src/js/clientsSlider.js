import CardSlider from './mwSlider';

import { Swiper, Navigation, EffectFade } from 'swiper';

Swiper.use([Navigation, EffectFade]);

export default function clientsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-clients-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        const quotesSlider = new Swiper(container, {
            effect: 'fade',
            loop: true,
            watchOverflow: true,
            touchStartPreventDefault: false,
            allowTouchMove: window.matchMedia(`(max-width: 640px)`).matches ? true : false,
            fadeEffect: {
                crossFade: true
            },
            autoHeight: window.matchMedia(`(max-width: 640px)`).matches ? true : false,
            navigation: {
                nextEl: window.matchMedia(`(max-width: 640px)`).matches ? element.querySelector('.js-slider-arrow-next') : null,
                prevEl: window.matchMedia(`(max-width: 640px)`).matches ? element.querySelector('.js-slider-arrow-prev') : null
            },
            speed: 500
        });

        if (!window.matchMedia('(max-width: 640px)').matches) {
            new CardSlider(element, {
                scaleMultiplier: 1.2,
                onSlideChange: (prevIndex, nextIndex) => {
                    if (nextIndex > prevIndex) {
                        quotesSlider.slideNext();
                    }
                    if (nextIndex < prevIndex) {
                        quotesSlider.slidePrev();
                    }
                    console.log({
                        prevIndex,
                        nextIndex
                    });
                }
            });
        }
    });
}
