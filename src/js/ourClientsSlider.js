import { Swiper, Autoplay, Navigation } from 'swiper';

Swiper.use([Autoplay, Navigation]);

export default function ourClientsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-our-clients-slider'));

    elements.forEach((element, elementIndex) => {
        const container = element.querySelector('.swiper-container');

        const slides = Array.from(element.querySelectorAll('.swiper-slide'));
        const wrapper = element.querySelector('.swiper-wrapper');

        for (let i = 0; i < 2; i++) {
            slides.forEach(slide => wrapper.appendChild(slide.cloneNode(true)));
        }

        new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 30,
            watchOverflow: true,
            centeredSlides: true,
            loop: true,
            loopedSlides: 5,
            speed: 3500,
            allowTouchMove: false,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: elementIndex % 2 == 0 ? true : false
            },
            breakpoints: {
                1024: {
                    spaceBetween: 60
                },
                1400: {
                    spaceBetween: 85
                }
            }
        });
    });
}
