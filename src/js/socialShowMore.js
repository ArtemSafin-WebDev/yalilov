import axios from 'axios';
import gsap from 'gsap';

export default function socialShowMore() {
    let loadPageCounter = 1;
    document.addEventListener('click', event => {
        if (event.target.matches('.social__show-more') || event.target.closest('.social__show-more')) {
            event.preventDefault();
            const showMoreList = document.querySelector('.social__list');
          

            if (!showMoreList) return;


         
            axios
                .get(window.location.href, {
                    params: {
                        PAGEN_1: ++loadPageCounter
                    }
                })
                .then(response => {
                    const parser = new DOMParser();
                    const nextPageHtml = parser.parseFromString(response.data, 'text/html');

                    const nextPageItems = Array.from(nextPageHtml.querySelectorAll('.social__list-item'));
                    const nextPageShowMore = nextPageHtml.querySelector('.social__show-more');

                    showMoreList.append(...nextPageItems);

                    gsap.fromTo(
                        nextPageItems,
                        {
                            autoAlpha: 0
                        },
                        {
                            autoAlpha: 1,
                            duration: 0.3,
                            stagger: 0.15
                        }
                    );

                    if (!nextPageShowMore) {
                        const showMoreWrapper = document.querySelector('.social__show-more-wrapper');
                        showMoreWrapper.remove();
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
    });
}
