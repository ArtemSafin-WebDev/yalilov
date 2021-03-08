
import CardSlider from './mwSlider';


export default function pressCenterSlider() {
    const elements = Array.from(document.querySelectorAll('.js-press-center-slider'));

    elements.forEach(element => {
        window.pressSlider = new CardSlider(element)
    })
}
