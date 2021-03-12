import CardSlider from './mwSlider';
import Hammer from 'hammerjs';
import { Swiper, Navigation, EffectFade } from 'swiper';

Swiper.use([Navigation, EffectFade]);

export default function clientsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-clients-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');
        const quotes = element.querySelector('.about__clients-slider-quotes')
        const quotesSlider = new Swiper(container, {
            effect: 'fade',
            loop: true,
            watchOverflow: true,
            touchStartPreventDefault: false,
            allowTouchMove: false,
            fadeEffect: {
                crossFade: true
            },
            autoHeight: window.matchMedia(`(max-width: 640px)`).matches ? true : false,

            speed: 500
        });

        const cardSlider = new CardSlider(element, {
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

        if (window.matchMedia('(max-width: 640px)').matches) {
            

            const hammertime = new Hammer(quotes);

            hammertime.on('swipeleft', () => {
                cardSlider.slideNext();
            });
            hammertime.on('swiperight', () => {
                cardSlider.slidePrev();
            });
        }
    });
}
