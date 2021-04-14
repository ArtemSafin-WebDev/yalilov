import { Swiper, Thumbs, Navigation } from 'swiper';

Swiper.use([Thumbs, Navigation]);

export default function textPageGallery() {
    const elements = Array.from(document.querySelectorAll('.js-text-page-gallery'));

    elements.forEach(element => {
        const mainContainer = element.querySelector('.text__gallery-main .swiper-container');
        const thumbsContainer = element.querySelector('.text__gallery-thumbs .swiper-container');
        const mainSliderOptions = {
            watchOverflow: true,
            spaceBetween: 0,
            thumbs: {},

            navigation: {
                nextEl: element.querySelector('.text__gallery-arrow--next'),
                prevEl: element.querySelector('.text__gallery-arrow--prev')
            }
        };

        mainSliderOptions.thumbs.swiper = new Swiper(thumbsContainer, {
            watchOverflow: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            slidesPerView: 'auto',
            threshold: 10,
            spaceBetween: 14,
            centerInsufficientSlides: true,
            breakpoints: {
                641: {
                    spaceBetween: 16
                }
            }
        });

        new Swiper(mainContainer, mainSliderOptions);
    });
}
