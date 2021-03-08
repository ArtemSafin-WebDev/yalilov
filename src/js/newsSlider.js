
import CardSlider from './mwSlider';


export default function newsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-news-slider'));

    elements.forEach(element => {
        new CardSlider(element)
    })
}
