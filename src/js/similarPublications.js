import CardSlider from "./mwSlider";

export default function similarPublications() {
    const elements = Array.from(document.querySelectorAll('.js-similar-publications'));

    elements.forEach(element => {
        new CardSlider(element);
    })
}