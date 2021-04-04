import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function socialSlider() {
    const elements = Array.from(document.querySelectorAll('.js-social-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 16,
            watchOverflow: true,
            speed: 800,
            navigation: {
                nextEl: element.querySelector('.js-slider-arrow-next'),
                prevEl: element.querySelector('.js-slider-arrow-prev')
            },
            breakpoints: {
                768: {
                    spaceBetween: 32
                },
                1200: {
                    spaceBetween: 64
                }
            }
        });
    });
}
