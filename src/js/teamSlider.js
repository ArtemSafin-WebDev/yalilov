import CardSlider from "./mwSlider";

export default function teamSlider() {
    const elements = Array.from(document.querySelectorAll('.js-team-slider'));

    elements.forEach(element => {
        new CardSlider(element);
    })
}