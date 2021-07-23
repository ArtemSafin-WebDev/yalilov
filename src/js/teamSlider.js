import CardSlider from './mwSlider';

export default function teamSlider() {
    const elements = Array.from(document.querySelectorAll('.js-team-slider'));

    elements.forEach(element => {
        const cards = Array.from(element.querySelectorAll('.team__card'));
        const controls = element.querySelector('.team__slider-controls')
        if (window.matchMedia('(min-width: 641px)').matches && cards.length < 4) {
            controls.style.display = 'none';
            return;
        }
        if (window.matchMedia('(max-width: 640px)').matches && cards.length < 3) {
            controls.style.display = 'none';
            return;
        }
        new CardSlider(element);
    });
}
