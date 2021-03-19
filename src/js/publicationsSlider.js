import CardSlider from './mwSlider';


export default function publicationsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-publications-slider'));

    elements.forEach(element => {
        window.pressSlider = new CardSlider(element)
    })
}
